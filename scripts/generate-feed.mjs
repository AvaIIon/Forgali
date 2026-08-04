// Generates public/google-feed.xml — a Google Merchant Center product feed
// (RSS 2.0 with the g: namespace) from the Storefront API at build time.
//
// Same contract as generate-sitemap.mjs: runs in npm `prebuild`, best-effort —
// any failure exits 0 so a feed hiccup can NEVER break a deploy; the committed
// public/google-feed.xml stays as a fallback. (Deliberately fail-soft: unlike a
// prerender, a stale feed is harmless — GMC refetches on its own schedule.)
//
// Item shape: one item per product. Price = the variant the PDP actually
// auto-selects on load — the first AVAILABLE variant, falling back to the
// first (ProductPage.tsx initializes selections with exactly that rule) —
// because Google verifies that the feed price matches the landing page.
// Brand is "Forgali" across the board — the storefront is deliberately
// de-branded, and the feed must match what the landing page shows.

import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SITE = "https://www.forgali.com";

// Public Storefront token — see src/services/shopifyService.ts for why this is
// committed rather than kept secret. Duplicated (not imported) because this is a
// plain-node prebuild script that never goes through the TypeScript pipeline.
// Keep the two in sync if the token is ever rotated.
const PUBLIC_STOREFRONT_TOKEN = "a657d35533c14d8ad23c908b75c56427";
const DEFAULT_STORE_DOMAIN = "kjrq9s-yp.myshopify.com";

const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN || DEFAULT_STORE_DOMAIN;
// Ignore a private token here too, so revoking the leaked one can't silently
// freeze the Google feed at its committed fallback.
const configuredToken = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const token =
  configuredToken && !configuredToken.startsWith("shpat_")
    ? configuredToken
    : PUBLIC_STOREFRONT_TOKEN;
const API_VERSION = "2025-01";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function fetchProducts() {
  const url = `https://${domain}/api/${API_VERSION}/graphql.json`;
  const header = "X-Shopify-Storefront-Access-Token";
  const products = [];
  let cursor = null;
  let pages = 0;
  while (pages < 20) {
    pages++;
    const query = `{ products(first: 50${cursor ? `, after: "${cursor}"` : ""}, query: "status:active") {
      pageInfo { hasNextPage endCursor }
      nodes {
        id handle title productType availableForSale
        description(truncateAt: 4900)
        featuredImage { url }
        variants(first: 25) { nodes { price { amount currencyCode } availableForSale } }
      } } }`;
    const controller = new AbortController();
    const t = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", [header]: token },
      body: JSON.stringify({ query }),
      signal: controller.signal,
    });
    clearTimeout(t);
    const json = await res.json();
    const data = json?.data?.products;
    if (!data) break;
    products.push(...data.nodes);
    if (!data.pageInfo.hasNextPage) break;
    cursor = data.pageInfo.endCursor;
  }
  return products;
}

// The variant whose price the PDP displays on load: first available, falling
// back to the first (same rule as ProductPage.tsx's initial selection). Feed
// price/availability and product-meta price both come from THIS variant so the
// initial-HTML JSON-LD, the hydrated page, and Merchant Center agree.
const selectedVariant = (p) =>
  p.variants.nodes.find((v) => v.availableForSale) ?? p.variants.nodes[0];

async function main() {
  if (!domain || !token) return;
  const products = await fetchProducts();
  if (!products.length) return;

  const items = products
    // checkout-test-item is a $2 payment-path fixture. It is currently excluded only
    // incidentally (no featured image) — name it explicitly so adding an image can
    // never push a test product into Merchant Center.
    .filter((p) => p.handle !== "checkout-test-item")
    .filter((p) => p.featuredImage && p.variants.nodes.length)
    .map((p) => {
      const v = selectedVariant(p);
      const price = `${Number(v.price.amount).toFixed(2)} ${v.price.currencyCode}`;
      // Brand must match what the landing page shows: titles that name the
      // manufacturer keep it; de-branded titles sell under the store brand.
      const brand = /plank\+beam/i.test(p.title) ? "Plank & Beam"
        : /maxtrix/i.test(p.title) ? "Maxtrix"
        : "Forgali";
      return `  <item>
    <g:id>${esc(p.handle)}</g:id>
    <g:title>${esc(p.title)}</g:title>
    <g:description>${esc((p.description || p.title).slice(0, 4900))}</g:description>
    <g:link>${SITE}/product/${esc(p.handle)}</g:link>
    <g:image_link>${esc(p.featuredImage.url)}</g:image_link>
    <g:price>${price}</g:price>
    <g:availability>${v.availableForSale ? "in stock" : "out of stock"}</g:availability>
    <g:condition>new</g:condition>
    <g:brand>${esc(brand)}</g:brand>
    <g:identifier_exists>false</g:identifier_exists>
    <g:product_type>${esc(p.productType || "Furniture")}</g:product_type>
    <g:shipping>
      <g:country>CA</g:country>
      <g:service>Standard</g:service>
      <g:price>0.00 CAD</g:price>
    </g:shipping>
  </item>`;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
<channel>
  <title>Forgali</title>
  <link>${SITE}</link>
  <description>Solid wood furniture for every room — free Canada-wide shipping.</description>
${items.join("\n")}
</channel>
</rss>
`;

  const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "google-feed.xml");
  writeFileSync(out, xml);
  console.log(`google-feed.xml: ${items.length} items`);

  // Same fetch, second consumer: src/data/product-meta.json feeds middleware.ts,
  // which injects each product's real head (title/description/OG/JSON-LD) into
  // the initial HTML. Price comes from the SAME selectedVariant() as the feed,
  // and availability is product-level exactly like ProductPage's own JSON-LD —
  // so the injected head, the hydrated page, and the feed agree (up to the
  // 25-variant fetch cap). Committed copy is the fallback when this doesn't run.
  // Keys are short on purpose — this file is bundled into the edge middleware,
  // which has a hard size budget. t=title, d=description (trimmed), i=image,
  // p=price, c=currency, a=availableForSale.
  const meta = {};
  for (const p of products) {
    if (p.handle === "checkout-test-item") continue;
    const v = selectedVariant(p);
    const rawD = String(p.description || "").replace(/\s+/g, " ").trim();
    meta[p.handle] = {
      t: p.title,
      // Cap at 500 chars on a word boundary — enough for the meta-description
      // slice and a sane JSON-LD description without bloating the edge bundle.
      d: rawD.length > 500 ? rawD.slice(0, 500).replace(/\s+\S*$/, "") : rawD,
      i: p.featuredImage?.url ?? null,
      p: v ? Number(v.price.amount).toFixed(2) : null,
      c: v?.price?.currencyCode || "CAD",
      a: p.availableForSale === true,
    };
  }
  const metaOut = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "product-meta.json");
  mkdirSync(dirname(metaOut), { recursive: true });
  writeFileSync(metaOut, `${JSON.stringify(meta)}\n`);
  console.log(`product-meta.json: ${Object.keys(meta).length} products`);
}

main().catch((e) => {
  console.warn("feed generation skipped:", e.message);
});
