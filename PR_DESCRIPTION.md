# Forgali dev change list — implementation

Implements the frontend/infra items from `DEV_CHANGES.md`. Branch: `dev-changes`.
Verified with `tsc --noEmit` (clean) and `npm run build` (succeeds). Needs a Vercel
preview deploy against the live catalog for final QA.

## Security / correctness
- **#1 Storefront token header.** `shopifyService.ts` now auto-detects the header:
  a private `shpat_` token still uses `Shopify-Storefront-Private-Token`, anything
  else (a public 32-hex token) uses `X-Shopify-Storefront-Access-Token`. The same
  build therefore works before, during, or after the token swap — no downtime.
  **Still required (not code):** mint a PUBLIC Storefront token, set it as
  `VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN` in Vercel, redeploy, then rotate the old
  private token on the Avallon channel.
- **#10 Ratings.** Rating/review counts are now a deterministic hash of the product
  id instead of `Math.random()`, so they stop flickering between loads and match
  between cards and the PDP. (Owner chose to keep generated reviews — this only
  stabilises them; they are not included in JSON-LD.)
- **#3 / #9 Out-of-stock.** OOS items stable-sort to the end of every category
  listing regardless of the chosen sort, and are filtered out of the homepage
  "best seller" grid.

## Catalog reach & brand
- **#2 Dining & Living.** New top-level categories mapped from Shopify `productType`
  (Dining Table/Chair/Set/Bench, Counter/Bar Chair → Dining; Coffee/Console/Side
  Table, Sideboard, TV Stand, Shelf, Entryway/Outdoor Bench → Living). Wired into
  the header nav, `/category/*` routes, homepage "Shop By Category" tiles and the
  footer. Makes the Plank & Beam furniture reachable on the storefront.
- **#8 Whole-home copy.** Header subtitle → "SOLID WOOD FURNITURE", hero headline/CTA,
  promo band and document `<head>` broadened from beds-only.
- **#12 Logo + favicon.** Real Forgali logo (navy in header, white in footer) and the
  full favicon set added to `public/` and referenced in `index.html`.

## Product pages
- **#18 Gallery.** `getVariantImages` now returns the full finish photo set. For P&B
  it matches the SKU-encoded filenames (`{SKU}__{angle}.jpg`); for beds it shows the
  finish hero first, then the rest. The by-handle query fetches variant `sku` and up
  to 100 images, and the PDP now always runs that detail fetch even when a cached
  list item exists (the list query has neither).
- **#14 Real specs.** Replaced the hardcoded placeholder specs (every product showed
  "400 lbs / Solid Pine / 65\"…") with the real `specs.*` metafields, hidden when
  absent. Bed-specific safety bullets only render for bed categories.

## SEO
- **#4 Head + JSON-LD.** Per-route `<title>`, meta description, canonical and OG tags
  via `react-helmet-async` (`src/components/Seo.tsx`), plus Product JSON-LD on PDPs
  (no generated reviews in schema).
- **#5 Sitemap / 404.** Committed `public/sitemap.xml` (315 products + routes) plus a
  defensive build-time regenerator (`scripts/generate-sitemap.mjs`, wired as
  `prebuild`; failures never break the build). `robots.txt` references the sitemap.
  404 route is `noindex`. **Note:** true per-URL HTTP 404 + full crawler HTML still
  needs prerender/SSR — see "Not included" below.
- **#6 / #7 Redirects.** `vercel.json` adds an apex→www **308** redirect and 301s for
  the known legacy URLs; `og:image` is self-hosted (was hotlinking a bedsmart.ca
  photo through weserv.nl).

## Not included (flagged for follow-up)
- **Prerender/SSR (#4 "the big one").** The head manager sets real per-route metadata,
  but the initial HTML is still the SPA shell. For guaranteed crawlability + real 404
  status, add prerendering (e.g. `react-snap`/`vite-plugin-ssr` or Vercel prerender).
- **#11 Floating yellow widget.** Not in this repo — it is injected by a Shopify app
  at the store level (Shop channel / reviews / rewards). Remove/restyle it in Shopify
  admin, not here.
- **#15 / #16 Complete-the-Room + style/colour collections.** Data exists in Shopify;
  rendering not yet added (current PDP still uses category-based "You May Also Like").
- **#17 Clean `max-and-lily` product handles.** Handle migration + redirects — deferred.
