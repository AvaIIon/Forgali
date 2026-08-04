// Answers /product/<handle> with a real HTTP 404 when that handle no longer
// exists in Shopify.
//
// Why: vercel.json rewrites /product/:path* to /index.html, so EVERY product
// path returns 200 — including deleted ones, which then client-render the
// "We couldn't find that product" screen. Google files those as Soft 404 (41 of
// them as of 2026-08-03, all deleted Maxtrix beds, e.g.
// /product/maxtrix-full-low-basic-bed) and keeps re-crawling them, spending
// crawl budget this site does not have. The noindex in ProductPage.tsx doesn't
// help: it only exists after the render, and a soft 404 is already logged.
//
// Fail-open by design. If the generated handle list is missing, stale, or
// implausibly small, every request passes straight through. A degraded build
// must never be able to 404 the live catalogue.

import handles from "./src/data/product-handles.json";

export const config = { matcher: "/product/:path*" };

const KNOWN = new Set(handles as string[]);

// The catalogue sits at ~315 products. Far below that means the build-time
// Storefront fetch degraded — do nothing rather than risk 404ing real pages.
const MIN_PLAUSIBLE_HANDLES = 200;

export default async function middleware(request: Request) {
  if (KNOWN.size < MIN_PLAUSIBLE_HANDLES) return;

  const { pathname, origin } = new URL(request.url);

  let handle: string;
  try {
    handle = decodeURIComponent(pathname.slice("/product/".length).replace(/\/+$/, ""));
  } catch {
    return; // malformed percent-encoding — let the app deal with it
  }

  // Empty handle (/product/) and anything with a further path segment aren't
  // product pages; leave the existing behaviour alone.
  if (!handle || handle.includes("/") || KNOWN.has(handle)) return;

  // Serve the site's own 404 page, but with the status code Google needs.
  // public/404.html is a static asset, so this can't recurse through middleware.
  const page = await fetch(`${origin}/404.html`);
  return new Response(page.body, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "x-robots-tag": "noindex",
      "cache-control": "public, max-age=0, s-maxage=3600",
    },
  });
}
