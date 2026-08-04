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
import { categoryInfoMap } from "./src/lib/categoryInfo";
import { getBedSeo } from "./src/lib/categorySeo";
import { PLANK_AND_BEAM_SEO } from "./src/lib/plankAndBeamSeo";

// "/" is deliberately NOT matched: the shell fetch below requests the origin
// root, so matching it would recurse. Homepage keeps its static head.
export const config = {
  matcher: ["/product/:path*", "/category/:path*", "/plank-and-beam"],
};

const SITE = "https://www.forgali.com";
const DEFAULT_IMAGE =
  "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/forgali-logo-dark.png?v=1783621771";

const START_MARK = "<!-- routehead:start -->";
const END_MARK = "<!-- routehead:end -->";

type ProductMeta = {
  t: string; // title
  d: string; // description, whitespace-collapsed, <=260 chars
  i: string | null; // featured image URL
  p: string | null; // first-variant price, "1234.00"
  c: string; // currency code
  a: boolean; // availableForSale (product level)
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
  return {
    title: bedSeo?.seoTitle ?? `${info.title} | Forgali`,
    description: bedSeo?.seoDescription ?? info.description,
    path,
  };
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

    if (pathname === "/plank-and-beam") {
      head = plankAndBeamHead();
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
    } else if (pathname.startsWith("/category/")) {
      const category = segmentAfter("/category/", pathname);
      if (!category) return;
      if (!hasOwn(categoryInfoMap, category)) {
        // The SPA client-renders not-found for these; answer it as a real 404.
        // The slug set lives in this repo (src/lib/categoryInfo), so unlike
        // product handles it cannot go stale independently of the routes.
        return notFound(origin);
      }
      head = categoryHead(category, searchParams.get("subcategory"));
    }

    if (!head) return;

    const shell = await fetchShell(origin);
    if (!shell) return;

    const start = shell.indexOf(START_MARK);
    const end = shell.indexOf(END_MARK);
    if (start === -1 || end === -1 || end <= start) return;

    const html =
      shell.slice(0, start) + renderHead(head) + shell.slice(end + END_MARK.length);

    return new Response(html, {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=0, s-maxage=3600",
        "x-routehead": "1", // deploy canary: proves this response was rewritten
      },
    });
  } catch {
    // Never let head injection take a page down — serve the plain shell.
    return;
  }
}
