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
        id handle title productType availableForSale tags
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
      const brand = /plank\s*(?:\+|&|and)\s*beam/i.test(p.title) ? "Plank & Beam"
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
    // Card/list price — the SPA's convertShopifyProduct rule (cheapest variant
    // a shopper can actually buy, "From" prefix when prices vary), so the
    // injected category lists agree with the hydrated grid. Distinct from `p`,
    // which mirrors the PDP's auto-selected variant.
    const positive = p.variants.nodes.filter((x) => Number(x.price?.amount) > 0);
    const buyable = positive.filter((x) => x.availableForSale);
    const priceable = buyable.length ? buyable : positive.length ? positive : p.variants.nodes;
    const amounts = priceable
      .map((x) => Number(x.price?.amount))
      .filter((n) => Number.isFinite(n) && n > 0);
    meta[p.handle] = {
      t: p.title,
      // Cap at 500 chars on a word boundary — enough for the meta-description
      // slice and a sane JSON-LD description without bloating the edge bundle.
      d: rawD.length > 500 ? rawD.slice(0, 500).replace(/\s+\S*$/, "") : rawD,
      i: p.featuredImage?.url ?? null,
      p: v ? Number(v.price.amount).toFixed(2) : null,
      c: v?.price?.currencyCode || "CAD",
      a: p.availableForSale === true,
      l: amounts.length ? Math.min(...amounts).toFixed(2) : null,
      f: amounts.length ? Math.max(...amounts) > Math.min(...amounts) : false,
    };
  }
  const metaOut = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "product-meta.json");
  mkdirSync(dirname(metaOut), { recursive: true });
  writeFileSync(metaOut, `${JSON.stringify(meta)}\n`);
  console.log(`product-meta.json: ${Object.keys(meta).length} products`);

  // Same fetch, third consumer: src/data/category-products.json maps each
  // category slug to its product handles so middleware.ts can server-render a
  // crawlable product-link list into the category shells (DEV_CHANGES item 19,
  // body half). categorize() below is a line-for-line port of the SPA's
  // getCategoryFromProduct (src/services/shopifyService.ts) — keep the two in
  // sync or the injected list will disagree with what the page hydrates into.
  const cats = {};
  const sorted = products.filter((p) => p.handle !== "checkout-test-item");
  // Available-first mirrors the SPA's OOS-sink; Array.sort is stable so
  // catalog order is preserved within each group.
  sorted.sort((a, b) => (b.availableForSale === true) - (a.availableForSale === true));
  for (const p of sorted) {
    const c = categorize(p);
    (cats[c] ??= []).push(p.handle);
    // The /category/bedroom aggregate = bunk + loft + single, built in the SAME
    // globally-sorted pass so its order matches the SPA's single OOS-sink over
    // catalog order (concatenating the three lists would float OOS bunks above
    // in-stock lofts).
    if (c === "bunk-beds" || c === "loft-beds" || c === "single-beds") {
      (cats["bedroom"] ??= []).push(p.handle);
    }
  }
  const catsOut = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "category-products.json");
  writeFileSync(catsOut, `${JSON.stringify(cats)}\n`);
  console.log(
    `category-products.json: ${Object.keys(cats).length} categories, ` +
    Object.entries(cats).map(([k, v]) => `${k}=${v.length}`).join(" ")
  );
}

// Port of the SPA's getCategoryFromProduct — see the comment above its caller.
const DINING_TYPES = ['dining table', 'dining chair', 'dining set', 'dining bench', 'counter chair', 'bar chair', 'bar stool', 'counter stool', 'outdoor table'];
const LIVING_TYPES = ['coffee table', 'console table', 'side table', 'end table', 'sideboard', 'tv stand', 'media console', 'shelf', 'bookshelf', 'entryway bench', 'outdoor bench'];
function categorize(p) {
  const productType = (p.productType || "").toLowerCase();
  const handle = (p.handle || "").toLowerCase();
  const title = (p.title || "").toLowerCase();
  const tagText = (p.tags || []).join(" | ").toLowerCase();
  const text = `${productType} ${title} ${handle}`;
  if (DINING_TYPES.includes(productType)) return "dining";
  if (LIVING_TYPES.includes(productType)) return "living";
  const isBunk = tagText.includes("bunk") || text.includes("bunk");
  const isLoft = tagText.includes("loft") || text.includes("loft");
  if (isBunk) return "bunk-beds";
  if (isLoft) return "loft-beds";
  if (productType.includes("mattress") || tagText.includes("mattress") || text.includes("mattress")) {
    return "mattresses";
  }
  const accessoryWords = ["dresser", "desk", "bookcase", "shelf", "shelves", "nightstand", "storage", "drawer"];
  if (
    productType === "accessory" ||
    productType.includes("dresser") ||
    (accessoryWords.some((w) => text.includes(w)) && !text.includes("bed"))
  ) {
    return "accessories";
  }
  if (text.includes("bed") || tagText.includes("single beds") || tagText.includes("platform")) {
    return "single-beds";
  }
  if (tagText.includes("accessor") || tagText.includes("dresser") || tagText.includes("storage")) {
    return "accessories";
  }
  return "single-beds";
}

main().catch((e) => {
  console.warn("feed generation skipped:", e.message);
});
