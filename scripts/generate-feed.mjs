// Generates public/google-feed.xml — a Google Merchant Center product feed
// (RSS 2.0 with the g: namespace) from the Storefront API at build time.
// The same URL is the Pinterest catalog's data source: Pinterest reads the
// Google RSS format, and its tag events send product_id = handle, which is
// <g:id> here — keep the two equal or catalog ads can't match a visit to a
// product.
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

// Cut at a word boundary, never mid-word; "" stays "".
const clampText = (s, max) => (s.length > max ? s.slice(0, max).replace(/\s+\S*$/, "") : s);
// specs.highlights is a JSON string list — same rule as parseStringList in
// src/services/shopifyService.ts.
const parseList = (raw) => {
  try {
    const v = JSON.parse(raw || "[]");
    return Array.isArray(v) ? v.filter((s) => typeof s === "string").map((s) => s.trim()).filter(Boolean) : [];
  } catch {
    return [];
  }
};
// specs.dimension_table rows → [label, "value unit"] pairs: parseDimensionTable
// plus the value/unit join ProductInfoTabs renders.
const parseDims = (raw) => {
  try {
    const v = JSON.parse(raw || "[]");
    if (!Array.isArray(v)) return [];
    return v
      .filter((r) => r && typeof r.label === "string" && typeof r.value === "string")
      .map((r) => [r.label.trim(), r.unit ? `${r.value.trim()} ${String(r.unit).trim()}` : r.value.trim()])
      .filter((r) => r[0] && r[1]);
  } catch {
    return [];
  }
};

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
        seo { title description }
        featuredImage { url }
        images(first: 11) { nodes { url } }
        variants(first: 25) { nodes { price { amount currencyCode } availableForSale } }
        specs: metafields(identifiers: [{namespace: "specs", key: "overview"}, {namespace: "specs", key: "highlights"}, {namespace: "specs", key: "dimension_table"}, {namespace: "specs", key: "material"}]) { key value }
        related: metafield(namespace: "custom", key: "related_products") { references(first: 4) { nodes { ... on Product { handle } } } }
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
      // Up to 10 extra photos (both Google and Pinterest cap it there);
      // Pinterest turns each one into its own product Pin.
      const extraImages = (p.images?.nodes ?? [])
        .map((img) => img.url)
        .filter((url) => url && url !== p.featuredImage.url)
        .slice(0, 10)
        .map((url) => `\n    <g:additional_image_link>${esc(url)}</g:additional_image_link>`)
        .join("");
      const googleCategory = GOOGLE_CATEGORY[(p.productType || "").toLowerCase()];
      return `  <item>
    <g:id>${esc(p.handle)}</g:id>
    <g:title>${esc(p.title)}</g:title>
    <g:description>${esc((p.description || p.title).slice(0, 4900))}</g:description>
    <g:link>${SITE}/product/${esc(p.handle)}</g:link>
    <g:image_link>${esc(p.featuredImage.url)}</g:image_link>${extraImages}
    <g:price>${price}</g:price>
    <g:availability>${v.availableForSale ? "in stock" : "out of stock"}</g:availability>
    <g:condition>new</g:condition>
    <g:brand>${esc(brand)}</g:brand>
    <g:identifier_exists>false</g:identifier_exists>
    <g:product_type>${esc(p.productType || "Furniture")}</g:product_type>${googleCategory ? `
    <g:google_product_category>${googleCategory}</g:google_product_category>` : ""}
    <g:custom_label_0>${feedRoom(p)}</g:custom_label_0>
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
  // p=price, c=currency, a=availableForSale. Body-SSR extras (productBody in
  // middleware.ts, mirroring ProductPage + ProductInfoTabs): o=specs.overview
  // when it differs from the description, h=first highlights, x=dimension
  // rows, m=material, s=subcategory slug (breadcrumb), r=curated
  // custom.related_products handles ("Complete the Room").
  const meta = {};
  for (const p of products) {
    if (p.handle === "checkout-test-item") continue;
    const v = selectedVariant(p);
    const rawD = String(p.description || "").replace(/\s+/g, " ").trim();
    const mfs = Object.fromEntries((p.specs || []).filter(Boolean).map((m) => [m.key, m.value]));
    // Single newlines kept: the Description tab renders them as line breaks.
    const rawO = String(mfs.overview || "").replace(/[ \t]+/g, " ").replace(/\s*\n\s*/g, "\n").trim();
    // The dining & living products carry the same text in both fields; the
    // beds carry two different texts. Store one copy when they match (d is
    // then the full text and o is omitted), both when they don't — with d
    // capped at 500 as before, since only the body shows the whole thing.
    const sameText = rawO && rawO.replace(/\s+/g, " ").startsWith(rawD.slice(0, 200));
    const d = sameText ? clampText(rawD, 1600) : clampText(rawD, 500);
    const overview = sameText ? "" : clampText(rawO, 1600);
    const highlights = parseList(mfs.highlights).slice(0, 3).map((s) => clampText(s, 160));
    const dims = parseDims(mfs.dimension_table);
    const material = String(mfs.material || "").trim();
    const category = categorize(p);
    // First matching tab in the category's own order — breadcrumbSub in
    // ProductPage.tsx resolves it the same way.
    const sub = (SUBCATEGORIES[category] || []).find((s) => matchesSubcategory(p, s)) || null;
    const related = (p.related?.references?.nodes || []).map((n) => n?.handle).filter(Boolean);
    // Authored Shopify SEO fields (st/sd) ride along only when non-empty —
    // middleware falls back to the derived strings exactly like ProductPage,
    // so a product without them renders precisely what it does today.
    const st = String(p.seo?.title || "").trim();
    const sd = String(p.seo?.description || "").trim();
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
      // Word-boundary capped (see sameText above): the pre-hydration body shows
      // the whole text, the meta description slices the first 160.
      d,
      i: p.featuredImage?.url ?? null,
      p: v ? Number(v.price.amount).toFixed(2) : null,
      c: v?.price?.currencyCode || "CAD",
      a: p.availableForSale === true,
      l: amounts.length ? Math.min(...amounts).toFixed(2) : null,
      f: amounts.length ? Math.max(...amounts) > Math.min(...amounts) : false,
      ...(st ? { st } : {}),
      ...(sd ? { sd } : {}),
      ...(overview ? { o: overview } : {}),
      ...(highlights.length ? { h: highlights } : {}),
      ...(dims.length ? { x: dims } : {}),
      ...(material ? { m: material } : {}),
      ...(sub ? { s: sub } : {}),
      ...(related.length ? { r: related } : {}),
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
  const byHandle = new Map(sorted.map((p) => [p.handle, p]));
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
  // Subcategory lists, same file, keyed "<category>|<subcategory>". The
  // subcategory views are the site's worst-ranking indexed pages (GSC 2026-08-11:
  // dining|dining-chairs pos 50.7, living|tv-stands pos 30.1) because they were
  // the one route shape that got an injected head but an EMPTY body — the parent
  // list was deliberately withheld to avoid contradicting a subcategory title.
  // The fix is the right subset, not the parent's. Only these keys are emitted;
  // middleware gates injection further on having dedicated SEO copy.
  for (const [category, subs] of Object.entries(SUBCATEGORIES)) {
    const list = cats[category];
    if (!Array.isArray(list)) continue;
    for (const sub of subs) {
      const members = list.filter((h) => {
        const p = byHandle.get(h);
        return p ? matchesSubcategory(p, sub) : false;
      });
      if (members.length) cats[`${category}|${sub}`] = members;
    }
  }

  const catsOut = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "data", "category-products.json");
  writeFileSync(catsOut, `${JSON.stringify(cats)}\n`);
  console.log(
    `category-products.json: ${Object.keys(cats).length} keys, ` +
    Object.entries(cats).map(([k, v]) => `${k}=${v.length}`).join(" ")
  );
}

// Google product taxonomy IDs by Shopify productType (lowercased), checked
// against taxonomy-with-ids.en-US.txt (version 2021-09-21). Types missing here
// ("Accessory" covers desks, drawers and guard rails alike) get no category
// rather than a wrong one — Merchant Center and Pinterest then infer it.
const GOOGLE_CATEGORY = {
  "dining table": 4355, // Furniture > Tables > Kitchen & Dining Room Tables
  "outdoor table": 2684, // Furniture > Outdoor Furniture > Outdoor Tables
  "dining chair": 5886, // Furniture > Chairs > Kitchen & Dining Room Chairs
  "counter chair": 1463, // Furniture > Chairs > Table & Bar Stools
  "bar chair": 1463,
  "bar stool": 1463,
  "counter stool": 1463,
  "dining bench": 6850, // Furniture > Benches > Kitchen & Dining Benches
  "dining set": 6347, // Furniture > Furniture Sets > Kitchen & Dining Furniture Sets
  "coffee table": 1395, // Furniture > Tables > Accent Tables > Coffee Tables
  "console table": 1602, // Furniture > Tables > Accent Tables > Sofa Tables
  "side table": 1549, // Furniture > Tables > Accent Tables > End Tables
  "end table": 1549,
  "sideboard": 447, // Furniture > Cabinets & Storage > Buffets & Sideboards
  "tv stand": 457, // Furniture > Entertainment Centers & TV Stands
  "media console": 457,
  "shelf": 6372, // Furniture > Shelving > Wall Shelves & Ledges (the Camden mantels)
  "bookshelf": 465, // Furniture > Shelving > Bookcases & Standing Shelves
  "entryway bench": 6851, // Furniture > Benches > Storage & Entryway Benches
  "outdoor bench": 5044, // Furniture > Outdoor Furniture > Outdoor Seating > Outdoor Benches
  "bunk bed": 505764, // Furniture > Beds & Accessories > Beds & Bed Frames
  "loft bed": 505764,
  "bed": 505764,
  "mattress": 2696, // Furniture > Beds & Accessories > Mattresses
  "dresser": 4195, // Furniture > Cabinets & Storage > Dressers
  "nightstand": 462, // Furniture > Tables > Nightstands
};

// custom_label_0: the room a product sells into. Pinterest and Google can both
// build product groups on it, so a campaign can be "dining + living only"
// without listing every productType.
const feedRoom = (p) => {
  const category = categorize(p);
  return category === "dining" || category === "living" || category === "mattresses"
    ? category
    : "bedroom";
};

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

// Port of src/lib/subcategories.ts — categorySubcategories + the two pattern
// maps + productMatchesSubcategory. Same standing hazard as categorize() above:
// this is a COPY, so a subcategory added or a pattern changed in the TS module
// must be mirrored here or the injected list stops matching what the tab
// hydrates into. (A plain-node prebuild script can't import the TS module.)
const SUBCATEGORIES = {
  "bunk-beds": ["twin-over-twin", "twin-over-full", "full-over-full", "queen-bunk", "l-shaped", "multi-bunk", "low-bunk", "with-slide", "with-stairs"],
  "loft-beds": ["low-loft", "mid-loft", "high-loft", "loft-with-desk", "loft-with-slide", "corner-loft"],
  "single-beds": ["platform", "house-bed", "floor-bed", "traditional", "trundle-bed"],
  "accessories": ["storage", "desks", "bookcases-shelves", "nightstands"],
  "dining": ["dining-tables", "dining-chairs", "dining-benches", "bar-counter-chairs", "dining-sets", "round-dining-tables", "kitchen-tables", "counter-stools", "bar-stools"],
  "living": ["coffee-tables", "console-tables", "side-tables", "sideboards", "tv-stands", "shelves", "entryway", "round-coffee-tables", "console-tables-with-storage", "mid-century-modern"],
};

const SUB_TAG_PATTERNS = {
  "twin-over-twin": ["twin over twin", "twin over twin bunk"],
  "twin-over-full": ["twin over full"],
  "full-over-full": ["full over full"],
  "queen-bunk": ["queen"],
  "l-shaped": ["l-shaped", "corner loft bunk"],
  "multi-bunk": ["trio", "quad", "triple"],
  "low-bunk": ["low bunk"],
  "with-slide": ["slide", "with slide", "bunk bed with slide"],
  "with-stairs": ["stairs", "with stairs", "bunk bed with stairs"],
  "low-loft": ["low loft"],
  "mid-loft": ["mid loft"],
  "high-loft": ["high loft", "ultra high"],
  "loft-with-desk": ["desk", "all in one"],
  "loft-with-slide": ["slide"],
  "corner-loft": ["corner loft"],
  "platform": ["platform"],
  "house-bed": ["castle", "house"],
  "floor-bed": ["toddler", "floor"],
  "traditional": ["traditional"],
  "trundle-bed": ["trundle"],
  "storage": ["dresser", "storage", "drawer"],
  "desks": ["desk"],
  "bookcases-shelves": ["bookcase", "shelf"],
  "nightstands": ["nightstand", "night stand"],
  // Dining & living demand views (keep in sync with src/lib/subcategories.ts).
  "round-dining-tables": ["round dining table", "oval dining table"],
  "kitchen-tables": ["kitchen table"],
  "counter-stools": ["counter chair", "counter stool"],
  "bar-stools": ["bar chair", "bar stool", "bar height"],
  "round-coffee-tables": ["round coffee table"],
  "console-tables-with-storage": ["console table with"],
  "mid-century-modern": ["mid-century modern"],
};

const SUB_TYPE_PATTERNS = {
  "dining-tables": ["dining table", "outdoor table"],
  "dining-chairs": ["dining chair"],
  "dining-benches": ["dining bench", "outdoor bench"],
  "bar-counter-chairs": ["counter chair", "bar chair", "counter stool", "bar stool"],
  "dining-sets": ["dining set"],
  "coffee-tables": ["coffee table"],
  "console-tables": ["console table"],
  "side-tables": ["side table", "end table"],
  "sideboards": ["sideboard"],
  "tv-stands": ["tv stand", "media console"],
  "shelves": ["shelf", "bookshelf"],
  "entryway": ["entryway bench"],
};

function matchesSubcategory(p, subcategory) {
  const typePatterns = SUB_TYPE_PATTERNS[subcategory];
  if (typePatterns) return typePatterns.includes((p.productType || "").toLowerCase());
  const patterns = SUB_TAG_PATTERNS[subcategory];
  // The TS original falls back to `product.subcategory === subcategory`, a field
  // the Storefront payload has no equivalent of — every listed subcategory has
  // patterns, so an unpatterned key means the maps drifted: match nothing.
  if (!patterns) return false;
  const haystack = `${(p.tags || []).join(" ")} ${p.title || ""}`.toLowerCase();
  return patterns.some((pattern) => haystack.includes(pattern));
}

main().catch((e) => {
  console.warn("feed generation skipped:", e.message);
});
