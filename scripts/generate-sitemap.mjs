// Regenerates public/sitemap.xml from the Storefront API at build time.
//
// Runs as an npm `prebuild` step. It is intentionally best-effort: any failure
// (missing env vars, network error, timeout) is caught and the process exits 0,
// so a sitemap hiccup can NEVER break a deploy. The committed public/sitemap.xml
// stays as a fallback if this doesn't run.

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const SITE = "https://www.forgali.com";
const STATIC_ROUTES = [
  ["/", "1.0"],
  ["/category/bedroom", "0.8"],
  ["/category/bunk-beds", "0.8"],
  ["/category/loft-beds", "0.8"],
  ["/category/single-beds", "0.8"],
  ["/category/dining", "0.8"],
  ["/category/living", "0.8"],
  ["/category/accessories", "0.8"],
  ["/category/mattresses", "0.8"],
  ["/smart-deals", "0.8"],
  ["/about", "0.6"],
  ["/contact", "0.6"],
  ["/faqs", "0.6"],
  ["/warranty", "0.6"],
  ["/safety-standards", "0.6"],
];

const domain = process.env.VITE_SHOPIFY_STORE_DOMAIN;
const token = process.env.VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN;
const API_VERSION = "2025-01";

async function fetchHandles() {
  const url = `https://${domain}/api/${API_VERSION}/graphql.json`;
  const header = token?.startsWith("shpat_")
    ? "Shopify-Storefront-Private-Token"
    : "X-Shopify-Storefront-Access-Token";

  const handles = [];
  let cursor = null;
  let pages = 0;
  while (pages < 20) {
    pages++;
    const query = `{ products(first: 250${cursor ? `, after: "${cursor}"` : ""}) {
      pageInfo { hasNextPage endCursor } edges { node { handle } } } }`;
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
    for (const e of data.edges) if (e?.node?.handle) handles.push(e.node.handle);
    if (data.pageInfo?.hasNextPage) cursor = data.pageInfo.endCursor;
    else break;
  }
  return [...new Set(handles)].sort();
}

function buildXml(handles) {
  const rows = [
    ...STATIC_ROUTES.map(([loc, pri]) => ({ loc, pri })),
    ...handles.map((h) => ({ loc: `/product/${h}`, pri: "0.6" })),
  ];
  const body = rows
    .map(
      ({ loc, pri }) =>
        `  <url><loc>${SITE}${loc}</loc><changefreq>weekly</changefreq><priority>${pri}</priority></url>`
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

async function main() {
  const out = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "sitemap.xml");
  if (!domain || !token) {
    console.warn("[sitemap] Shopify env vars not set — keeping committed sitemap.xml");
    return;
  }
  const handles = await fetchHandles();
  if (!handles.length) {
    console.warn("[sitemap] no product handles returned — keeping committed sitemap.xml");
    return;
  }
  writeFileSync(out, buildXml(handles), "utf-8");
  console.log(`[sitemap] wrote ${handles.length} products + ${STATIC_ROUTES.length} routes`);
}

main().catch((err) => {
  console.warn("[sitemap] generation skipped:", err?.message || err);
  process.exit(0);
});
