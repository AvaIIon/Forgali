// Generates public/google-feed.xml — a Google Merchant Center product feed
// (RSS 2.0 with the g: namespace) from the Storefront API at build time.
//
// Same contract as generate-sitemap.mjs: runs in npm `prebuild`, best-effort —
// any failure exits 0 so a feed hiccup can NEVER break a deploy; the committed
// public/google-feed.xml stays as a fallback. (Deliberately fail-soft: unlike a
// prerender, a stale feed is harmless — GMC refetches on its own schedule.)
//
// Item shape: one item per product. Price = FIRST variant's price, because the
// PDP auto-selects the first variant on load and Google verifies that the feed
// price matches the landing page. Brand is "Forgali" across the board — the
// storefront is deliberately de-branded, and the feed must match what the
// landing page shows.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SITE = "https://www.forgali.com";

const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2025-01";

const esc = (s) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

async function fetchProducts() {
  const url = `https://${domain}/api/${API_VERSION}/graphql.json`;
  const header = token?.startsWith("shpat_")
    ? "Shopify-Storefront-Private-Token"
    : "X-Shopify-Storefront-Access-Token";
  const products = [];
  let cursor = null;
  let pages = 0;
  while (pages < 20) {
    pages++;
    const query = `{ products(first: 100${cursor ? `, after: "${cursor}"` : ""}, query: "status:active") {
      pageInfo { hasNextPage endCursor }
      nodes {
        id handle title productType
        description(truncateAt: 4900)
        featuredImage { url }
        variants(first: 1) { nodes { price { amount currencyCode } availableForSale } }
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

async function main() {
  if (!domain || !token) return;
  const products = await fetchProducts();
  if (!products.length) return;

  const items = products
    .filter((p) => p.featuredImage && p.variants.nodes.length)
    .map((p) => {
      const v = p.variants.nodes[0];
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
}

main().catch((e) => {
  console.warn("feed generation skipped:", e.message);
});
