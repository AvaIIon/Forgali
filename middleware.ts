// Edge middleware, two jobs (DEV_CHANGES item 19, shape "c"):
//
// 1. Serve each page's REAL head in the initial HTML. Every route serves one
//    generic shell (the SPA sets title/meta/JSON-LD only after JS runs), so
//    social scrapers never see per-page tags, stale titles sit in the SERPs
//    until Google re-renders each URL, and — the expensive one — Google has
//    filed 164 Plank & Beam products under "Discovered – currently not
//    indexed" rather than spend render budget on a low-authority domain.
//    This fetches the built shell once, then splices the per-URL
//    title/description/canonical/OG/JSON-LD between the routehead markers in
//    index.html for /product/*, /category/* and /plank-and-beam. Values mirror
//    what the SPA's <Seo> renders (same data modules / generated catalog data),
//    and injected tags carry data-rh="true" so react-helmet-async adopts and
//    replaces them on hydration instead of duplicating them.
//
// 2. Answer a real HTTP 404 for URLs that don't exist. Deleted product handles
//    (41 soft-404s as of 2026-08-03, all deleted Maxtrix beds) and junk
//    /category/<slug> URLs otherwise return a 200 shell that only
//    client-renders a not-found screen — Google files those as Soft 404 and
//    keeps re-crawling them. Product handles come from the generated
//    Storefront list; category slugs are a closed set that lives in the same
//    repo as the SPA's own routing, so neither can drift.
//
// Fail-open by design, everywhere. Generated data missing or implausibly
// small, markers absent from the shell, shell fetch failing, ANY exception:
// the request passes through and serves exactly what it serves today. A
// degraded build must never 404 the live catalogue or corrupt a page.

import handles from "./src/data/product-handles.json";
import productMeta from "./src/data/product-meta.json";
import categoryProducts from "./src/data/category-products.json";
import { categoryInfoMap } from "./src/lib/categoryInfo";
import { faqPageJsonLd, getBedSeo } from "./src/lib/categorySeo";
import { categorySubcategories } from "./src/lib/subcategories";
import { PLANK_AND_BEAM_SEO } from "./src/lib/plankAndBeamSeo";
import { SITE_FAQS } from "./src/lib/siteFaqs";
import {
  STATIC_PAGE_SEO,
  type StaticPagePath,
} from "./src/lib/staticPageSeo";

// "/" is deliberately NOT matched: the shell fetch below requests the origin
// root, so matching it would recurse. Homepage keeps its static head.
export const config = {
  matcher: [
    "/product/:path*",
    "/category/:path*",
    "/plank-and-beam",
    // Static routes. They were left out of the original matcher and so kept
    // serving the generic shell title to every non-JS crawler — see
    // src/lib/staticPageSeo.ts for what that costs in the SERPs.
    "/shipping",
    "/returns",
    "/contact",
    "/faqs",
    "/about",
    "/warranty",
    "/safety-standards",
    "/assembly",
    "/smart-deals",
    "/privacy",
    "/terms",
  ],
};

const SITE = "https://www.forgali.com";
const DEFAULT_IMAGE =
  "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/forgali-logo-dark.png?v=1783621771";

const START_MARK = "<!-- routehead:start -->";
const END_MARK = "<!-- routehead:end -->";

// Body SSR splices into the empty SPA mount point. React 18's createRoot()
// (src/main.tsx) REPLACES the container's children on first render, so
// hydration simply swaps this static content for the live app — no mismatch
// warnings, no duplicate UI. If the shell ever stops containing this exact
// string, body injection silently skips (head injection still runs).
const ROOT_MARK = '<div id="root"></div>';

type ProductMeta = {
  t: string; // title
  d: string; // description, whitespace-collapsed, <=260 chars
  i: string | null; // featured image URL
  p: string | null; // first-variant price, "1234.00"
  c: string; // currency code
  a: boolean; // availableForSale (product level)
  // Card/list price fields (optional: absent in older committed fallbacks —
  // category lists just omit the price then). l = cheapest buyable variant,
  // f = prices vary so the card renders a "From" prefix. Mirrors
  // convertShopifyProduct in shopifyService.ts.
  l?: string | null;
  f?: boolean;
};

// Module scope runs OUTSIDE the handler's try/catch — a wrong-shape (but
// valid-JSON) data file would crash isolate init and 500 every matched
// request. Guard the construction itself; empty fallbacks fail open below.
const KNOWN: Set<string> = (() => {
  try {
    return new Set(Array.isArray(handles) ? (handles as string[]) : []);
  } catch {
    return new Set<string>();
  }
})();
const META: Record<string, ProductMeta> = (() => {
  try {
    return productMeta && typeof productMeta === "object" && !Array.isArray(productMeta)
      ? (productMeta as Record<string, ProductMeta>)
      : {};
  } catch {
    return {};
  }
})();

// Plain-object lookups walk the prototype chain — categoryInfoMap["constructor"]
// is truthy — so every by-key check on catalog data goes through this.
const hasOwn = (obj: object, key: string) =>
  Object.prototype.hasOwnProperty.call(obj, key);

// The catalogue sits at ~315 products. Far below that means the build-time
// Storefront fetch degraded — do nothing rather than risk 404ing real pages
// (handles) or serving heads for a sliver of the catalogue (meta).
const MIN_PLAUSIBLE_HANDLES = 200;
const HANDLES_OK = KNOWN.size >= MIN_PLAUSIBLE_HANDLES;
const META_OK = Object.keys(META).length >= MIN_PLAUSIBLE_HANDLES;

// Category -> ordered product handles, for the crawlable link lists. Same
// module-scope guard rationale as KNOWN/META above.
const CATS: Record<string, string[]> = (() => {
  try {
    return categoryProducts &&
      typeof categoryProducts === "object" &&
      !Array.isArray(categoryProducts)
      ? (categoryProducts as Record<string, string[]>)
      : {};
  } catch {
    return {};
  }
})();
const CATS_OK = (() => {
  try {
    const entries = Object.entries(CATS);
    // bedroom re-lists bunk/loft/single members, and "cat|sub" keys re-list
    // their parent's — exclude both so neither can pad a degraded build past
    // the plausibility bar. The bar is about the base catalogue being present.
    const total = entries.reduce(
      (n, [slug, l]) =>
        slug === "bedroom" || slug.includes("|") || !Array.isArray(l)
          ? n
          : n + l.length,
      0
    );
    return entries.length >= 5 && total >= MIN_PLAUSIBLE_HANDLES;
  } catch {
    return false;
  }
})();

// Reverse lookup so product bodies can link back to their own category page
// (crawl path both directions). bedroom is an aggregate — skip it so a bed
// links to its specific category.
const HANDLE_CATEGORY: Map<string, string> = (() => {
  const m = new Map<string, string>();
  try {
    for (const [slug, list] of Object.entries(CATS)) {
      // bedroom is an aggregate and "cat|sub" keys are subsets — both would
      // give a product a breadcrumb that isn't its own category page.
      if (slug === "bedroom" || slug.includes("|") || !Array.isArray(list)) continue;
      for (const h of list) if (!m.has(h)) m.set(h, slug);
    }
  } catch {
    /* empty map fails open below */
  }
  return m;
})();

// Fail-open needs failures to actually FAIL: an origin fetch that hangs would
// otherwise pin every matched request until the platform timeout. AbortSignal
// rejection lands in the caller's catch → pass-through.
const timeoutSignal = (ms: number): AbortSignal | undefined => {
  try {
    return AbortSignal.timeout(ms);
  } catch {
    return undefined;
  }
};

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

interface Head {
  title: string;
  description: string;
  /** Path (may include query), e.g. "/category/dining?subcategory=dining-tables". */
  path: string;
  image?: string;
  type?: "website" | "product";
  jsonLd?: Record<string, unknown>[];
}

// Mirrors src/components/Seo.tsx tag-for-tag. data-rh="true" hands ownership
// to react-helmet-async on hydration. twitter:site is unmanaged (Seo.tsx never
// sets it), so it keeps today's static value and no data-rh.
function renderHead(h: Head): string {
  const url = SITE + h.path;
  const image = h.image ?? DEFAULT_IMAGE;
  const lines = [
    `<title>${esc(h.title)}</title>`,
    `<meta name="description" content="${esc(h.description)}" data-rh="true"/>`,
    `<link rel="canonical" href="${esc(url)}" data-rh="true"/>`,
    `<meta property="og:title" content="${esc(h.title)}" data-rh="true"/>`,
    `<meta property="og:description" content="${esc(h.description)}" data-rh="true"/>`,
    `<meta property="og:type" content="${h.type ?? "website"}" data-rh="true"/>`,
    `<meta property="og:url" content="${esc(url)}" data-rh="true"/>`,
    `<meta property="og:image" content="${esc(image)}" data-rh="true"/>`,
    `<meta name="twitter:card" content="summary_large_image" data-rh="true"/>`,
    `<meta name="twitter:site" content="@Forgali"/>`,
    `<meta name="twitter:title" content="${esc(h.title)}" data-rh="true"/>`,
    `<meta name="twitter:description" content="${esc(h.description)}" data-rh="true"/>`,
    `<meta name="twitter:image" content="${esc(image)}" data-rh="true"/>`,
  ];
  for (const block of h.jsonLd ?? []) {
    // "<" escaped so content containing "</script>" can't break out of the tag
    // — same rule as Seo.tsx.
    lines.push(
      `<script type="application/ld+json" data-rh="true">${JSON.stringify(block).replace(/</g, "\\u003c")}</script>`
    );
  }
  return lines.join("\n    ");
}

// Mirrors ProductPage.tsx: title/description fallback, Product JSON-LD with
// brand Forgali, first-variant price, NO review/rating data (owner rule — the
// visible review counts are generated and must never reach structured data).
function productHead(handle: string, m: ProductMeta): Head {
  const description = m.d
    ? m.d.slice(0, 160)
    : `${m.t} — solid wood furniture with free Canada-wide shipping from Forgali.`;
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: m.t,
    ...(m.i ? { image: [m.i] } : {}),
    // The page's own JSON-LD uses the raw description with no fallback —
    // mirror that (an empty description stays empty, never the title).
    description: m.d,
    brand: { "@type": "Brand", name: "Forgali" },
    ...(m.p
      ? {
          offers: {
            "@type": "Offer",
            url: `${SITE}/product/${handle}`,
            priceCurrency: m.c,
            price: m.p,
            availability: m.a
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
          },
        }
      : {}),
  };
  return {
    title: `${m.t} | Forgali`,
    description,
    path: `/product/${handle}`,
    image: m.i ?? undefined,
    type: "product",
    jsonLd: [jsonLd],
  };
}

// Mirrors CategoryPage.tsx: rich per-page SEO with graceful fallback to the
// generic category info; self-canonical subcategory URL ONLY when that
// subcategory has dedicated SEO, else canonical to the parent.
function categoryHead(category: string, subcategory: string | null): Head {
  const info = categoryInfoMap[category]; // caller has hasOwn-gated `category`
  const bedSeo = getBedSeo(category, subcategory);
  const path =
    subcategory && bedSeo
      ? `/category/${category}?subcategory=${subcategory}`
      : `/category/${category}`;
  // Mirrors CategoryPage's own <Seo jsonLd>: FAQPage only where the page
  // actually renders that Q&A, so the markup never describes absent content.
  const faqs = bedSeo?.faqs;
  return {
    title: bedSeo?.seoTitle ?? `${info.title} | Forgali`,
    description: bedSeo?.seoDescription ?? info.description,
    path,
    jsonLd: faqs?.length ? [faqPageJsonLd(faqs)] : undefined,
  };
}

// ---------------------------------------------------------------------------
// Body SSR (DEV_CHANGES item 19, body half). Crawlers see real content and a
// real link graph instead of an empty shell — the fix for the 164 P&B products
// filed under "Discovered – currently not indexed". Content mirrors what the
// hydrated page renders (same titles, same prices, same copy modules); markup
// is deliberately plain inline-styled HTML because the app's utility CSS can't
// be relied on for markup it never generated. Visible only until React mounts.
// ---------------------------------------------------------------------------

const money = (p: string): string => {
  const n = Number(p);
  return Number.isFinite(n)
    ? `$${n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} CAD`
    : "";
};

const TRUST_LINE =
  "Free Canada-wide shipping · 30-day returns · 5-year limited warranty";

// `subcategory` renders the filtered subset under that subcategory's own copy —
// never the parent's list, which is why the subcategory views shipped body-less
// in the first place. The caller only passes one through when it has dedicated
// SEO (so the page self-canonicals) AND the generator emitted its members.
function categoryBody(category: string, subcategory: string | null): string | null {
  const key = subcategory ? `${category}|${subcategory}` : category;
  if (!CATS_OK || !META_OK || !hasOwn(CATS, key)) return null;
  const list = CATS[key];
  if (!Array.isArray(list) || !list.length) return null;
  const info = categoryInfoMap[category]; // caller has hasOwn-gated `category`
  const seo = getBedSeo(category, subcategory);
  // A subcategory body without its own copy would inherit the parent's H1 and
  // lead — the exact title/content contradiction this guard exists to prevent.
  if (subcategory && !seo) return null;

  const items = list
    .filter((h) => hasOwn(META, h))
    .map((h) => {
      const m = META[h];
      // Card price (cheapest buyable, "From" when prices vary) — NOT m.p, which
      // is the PDP's auto-selected variant and disagrees with the hydrated grid
      // on ~30% of products.
      const price = m.l ? ` — ${m.f ? "From " : ""}${money(m.l)}` : "";
      return `<li style="margin:6px 0;"><a href="/product/${esc(h)}" style="text-decoration:underline;">${esc(m.t)}</a>${esc(price)}</li>`;
    });
  if (!items.length) return null;

  const intro = (seo?.intro ?? "")
    .split("\n\n")
    .filter(Boolean)
    .map((p) => `<p style="margin:12px 0;line-height:1.6;">${esc(p)}</p>`)
    .join("");

  // Editorial internal links, in the copy rather than in a filter widget. The
  // subcategory pages rank worst on the site and had no in-content inbound link
  // anywhere — the tabs are rendered by JS, so a crawler never saw one.
  const sections = (seo?.sections ?? [])
    .map((s) => {
      const links = s.links?.length
        ? `<p style="margin:12px 0;">${s.links
            .map(
              (l) =>
                `<a href="${esc(l.href)}" style="text-decoration:underline;">${esc(l.label)}</a>`
            )
            .join(" · ")}</p>`
        : "";
      return [
        `<h2 style="font-size:1.35rem;font-weight:700;margin:28px 0 8px;">${esc(s.h2)}</h2>`,
        `<p style="margin:0 0 8px;line-height:1.6;">${esc(s.body)}</p>`,
        links,
      ].join("\n");
    })
    .join("\n");

  const faqs = seo?.faqs?.length
    ? [
        `<h2 style="font-size:1.35rem;font-weight:700;margin:32px 0 8px;">Frequently Asked Questions</h2>`,
        ...seo.faqs.map(
          (f) =>
            `<h3 style="font-size:1.05rem;font-weight:700;margin:20px 0 4px;">${esc(f.q)}</h3>\n<p style="margin:0;line-height:1.6;">${esc(f.a)}</p>`
        ),
      ].join("\n")
    : "";

  // Crawl paths between the parent and its filtered views, both directions.
  // Subcategory pages get their siblings plus a link up; the parent gets the
  // full set of children it otherwise only exposes through JS-rendered tabs.
  const siblings = hasOwn(categorySubcategories, category)
    ? categorySubcategories[category]
        .filter((s) => s.slug !== subcategory && hasOwn(CATS, `${category}|${s.slug}`))
        .map(
          (s) =>
            `<a href="/category/${esc(category)}?subcategory=${esc(s.slug)}" style="text-decoration:underline;">${esc(s.name)}</a>`
        )
    : [];
  const nav = siblings.length
    ? `<p style="margin:24px 0 0;">Browse by type: ${siblings.join(" · ")}</p>`
    : "";

  const parentInfo = categoryInfoMap[category];
  const crumb = subcategory
    ? ` › <a href="/category/${esc(category)}" style="text-decoration:underline;">${esc(parentInfo.title)}</a>`
    : "";

  return [
    `<div style="max-width:1100px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;">`,
    `<p style="margin:0 0 16px;"><a href="/" style="text-decoration:underline;">Forgali</a>${crumb} · ${esc(TRUST_LINE)}</p>`,
    `<h1 style="font-size:2rem;font-weight:700;margin:0 0 8px;">${esc(seo?.h1 ?? info.title)}</h1>`,
    `<p style="margin:0 0 20px;line-height:1.6;">${esc(seo?.lead ?? info.description)}</p>`,
    `<ul style="list-style:disc;padding-left:20px;margin:0 0 24px;">`,
    ...items,
    `</ul>`,
    intro,
    sections,
    faqs,
    nav,
    `</div>`,
  ].join("\n");
}

function productBody(handle: string, m: ProductMeta): string | null {
  const cat = HANDLE_CATEGORY.get(handle);
  const crumb =
    cat && hasOwn(categoryInfoMap, cat)
      ? ` › <a href="/category/${esc(cat)}" style="text-decoration:underline;">${esc(categoryInfoMap[cat].title)}</a>`
      : "";
  const img = m.i
    ? `<img src="${esc(m.i)}" alt="${esc(m.t)}" style="max-width:100%;width:480px;height:auto;margin:0 0 16px;"/>`
    : "";
  const price = m.p
    ? `<p style="margin:0 0 8px;font-size:1.25rem;font-weight:700;">${esc(money(m.p))}</p>`
    : "";
  const stock = `<p style="margin:0 0 16px;">${m.a ? "In stock" : "Out of stock"} — ships free anywhere in Canada.</p>`;
  const desc = m.d
    ? `<p style="margin:0 0 16px;line-height:1.6;">${esc(m.d)}</p>`
    : "";
  return [
    `<div style="max-width:800px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;">`,
    `<p style="margin:0 0 16px;"><a href="/" style="text-decoration:underline;">Forgali</a>${crumb}</p>`,
    `<h1 style="font-size:1.75rem;font-weight:700;margin:0 0 8px;">${esc(m.t)}</h1>`,
    price,
    stock,
    img,
    desc,
    `<p style="margin:0;">${esc(TRUST_LINE)}</p>`,
    `</div>`,
  ].join("\n");
}

// Static routes: exact head from the shared table, plus a body of the page's
// own facts. /faqs gets the real Q&A and FAQPage schema rather than a summary —
// those answers (including the "no showroom, no phone" denial that exists to
// contradict the stale Design Centre citations) are what AI fetchers quote, and
// none of them ran the JavaScript that rendered it.
function staticHead(path: StaticPagePath): Head {
  const p = STATIC_PAGE_SEO[path];
  return {
    title: p.title,
    description: p.description,
    path: p.path,
    jsonLd:
      path === "/faqs"
        ? [faqPageJsonLd(SITE_FAQS.map((f) => ({ q: f.question, a: f.answer })))]
        : undefined,
  };
}

function staticBody(path: StaticPagePath): string | null {
  const p = STATIC_PAGE_SEO[path];
  const blocks: string[] = [];

  if (path === "/faqs") {
    for (const f of SITE_FAQS) {
      blocks.push(
        `<h2 style="font-size:1.15rem;font-weight:700;margin:24px 0 4px;">${esc(f.question)}</h2>`,
        `<p style="margin:0;line-height:1.6;">${esc(f.answer)}</p>`
      );
    }
  } else if (p.facts?.length) {
    blocks.push(`<ul style="list-style:disc;padding-left:20px;margin:0 0 24px;">`);
    for (const fact of p.facts) {
      blocks.push(`<li style="margin:8px 0;line-height:1.6;">${esc(fact)}</li>`);
    }
    blocks.push(`</ul>`);
  }
  // Nothing page-specific to say (policy prose lives in the component) — the
  // head fix alone is the win there; don't ship an empty-looking body.
  if (!blocks.length) return null;

  return [
    `<div style="max-width:800px;margin:0 auto;padding:32px 16px;font-family:system-ui,sans-serif;">`,
    `<p style="margin:0 0 16px;"><a href="/" style="text-decoration:underline;">Forgali</a> · ${esc(TRUST_LINE)}</p>`,
    `<h1 style="font-size:2rem;font-weight:700;margin:0 0 8px;">${esc(p.h1)}</h1>`,
    `<p style="margin:0 0 20px;line-height:1.6;">${esc(p.lead)}</p>`,
    ...blocks,
    `</div>`,
  ].join("\n");
}

function plankAndBeamHead(): Head {
  return {
    title: PLANK_AND_BEAM_SEO.title,
    description: PLANK_AND_BEAM_SEO.description,
    path: "/plank-and-beam",
    jsonLd: [PLANK_AND_BEAM_SEO.jsonLd as Record<string, unknown>],
  };
}

// One decoded, slash-free segment after the prefix, or null when the URL isn't
// shaped like a page this middleware should touch (deeper paths, empty, bad
// percent-encoding — all pass through).
function segmentAfter(prefix: string, pathname: string): string | null {
  let seg: string;
  try {
    seg = decodeURIComponent(pathname.slice(prefix.length).replace(/\/+$/, ""));
  } catch {
    return null;
  }
  if (!seg || seg.includes("/")) return null;
  return seg;
}

// The shell is identical for every route and changes only per deployment
// (hashed asset URLs), so cache it per isolate. Only cache a shell that
// carries both markers — anything else would make every later request fail.
let shellCache: string | null = null;
async function fetchShell(origin: string): Promise<string | null> {
  if (shellCache) return shellCache;
  const res = await fetch(`${origin}/`, { signal: timeoutSignal(3000) });
  if (!res.ok) return null;
  const text = await res.text();
  if (!text.includes(START_MARK) || !text.includes(END_MARK)) return null;
  shellCache = text;
  return text;
}

async function notFound(origin: string): Promise<Response> {
  // Serve the site's own 404 page, but with the status code Google needs.
  // public/404.html is a static asset, so this can't recurse through middleware.
  const page = await fetch(`${origin}/404.html`, { signal: timeoutSignal(3000) });
  return new Response(page.body, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}

export default async function middleware(request: Request) {
  try {
    if (request.method !== "GET" && request.method !== "HEAD") return;

    const { pathname, origin, searchParams } = new URL(request.url);

    let head: Head | null = null;
    let body: string | null = null;

    if (pathname === "/plank-and-beam") {
      head = plankAndBeamHead();
    } else if (hasOwn(STATIC_PAGE_SEO, pathname)) {
      const key = pathname as StaticPagePath;
      head = staticHead(key);
      body = staticBody(key);
    } else if (pathname.startsWith("/product/")) {
      const handle = segmentAfter("/product/", pathname);
      if (!handle) return;
      if (!KNOWN.has(handle)) {
        // Deleted/unknown product → real 404 (unless the handle list looks
        // degraded, in which case do nothing rather than 404 real pages).
        return HANDLES_OK ? notFound(origin) : undefined;
      }
      const m = META_OK && hasOwn(META, handle) ? META[handle] : undefined;
      if (!m) return; // known product, no meta (or degraded meta) → today's shell
      head = productHead(handle, m);
      body = productBody(handle, m);
    } else if (pathname.startsWith("/category/")) {
      const category = segmentAfter("/category/", pathname);
      if (!category) return;
      if (!hasOwn(categoryInfoMap, category)) {
        // The SPA client-renders not-found for these; answer it as a real 404.
        // The slug set lives in this repo (src/lib/categoryInfo), so unlike
        // product handles it cannot go stale independently of the routes.
        return notFound(origin);
      }
      const subcategory = searchParams.get("subcategory");
      head = categoryHead(category, subcategory);
      // Subcategory views get the FILTERED list under their own copy (see
      // categoryBody) — they used to get no body at all, which is why they sit
      // deepest in the SERPs of every indexed route shape.
      body = categoryBody(category, subcategory);
    }

    if (!head) return;

    const shell = await fetchShell(origin);
    if (!shell) return;

    const start = shell.indexOf(START_MARK);
    const end = shell.indexOf(END_MARK);
    if (start === -1 || end === -1 || end <= start) return;

    let html =
      shell.slice(0, start) + renderHead(head) + shell.slice(end + END_MARK.length);

    // Body SSR is additive: if the mount point isn't the exact empty div (or
    // this route has no body), the head-injected shell ships as before.
    let bodyInjected = false;
    if (body) {
      const rootAt = html.indexOf(ROOT_MARK);
      if (rootAt !== -1) {
        html =
          html.slice(0, rootAt) +
          `<div id="root">` +
          body +
          `</div>` +
          html.slice(rootAt + ROOT_MARK.length);
        bodyInjected = true;
      }
    }

    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=0, s-maxage=3600",
        "x-routehead": "1", // deploy canary: proves this response was rewritten
        ...(bodyInjected ? { "x-routebody": "1" } : {}), // canary: body SSR ran
      },
    });
  } catch {
    // Never let head injection take a page down — serve the plain shell.
    return;
  }
}
