

## French version (`/fr`)

French lives under the `/fr` prefix on the same host with the same English slugs
(`/fr/product/<handle>`, `/fr/category/dining`). The prefix is the only locale
signal; `src/i18n/locale.ts` holds the rules and `src/i18n/LocaleContext.tsx`
exposes them (`useLocale()` → `locale`, `lp()` for paths, `t()` for UI strings,
`money()` for prices in `fr-CA`/`en-CA` format).

- Components and pages import `Link`/`useNavigate` from `@/i18n/router`, which
  prefixes internal paths automatically. Keep writing locale-free paths.
- Every shopper-visible UI string (header, footer, cart, product page, checkout,
  static pages, homepage sections, `aria-label`/`alt`/`placeholder` text and the
  inline `<Seo>` titles) is a key in `src/i18n/messages.ts`, rendered through
  `t(key)`; `t(key, { count })` fills `{count}`-style placeholders and plurals
  are separate keys picked at the call site. English values are the strings the
  English pages always rendered; the `fr` object is typed from `en`, so a key
  missing in French fails `tsc`. The same file carries the small slug-keyed
  French maps for subcategory tabs, category names and the product dimension
  table, plus the option-label overrides. Editorial copy in `src/lib/*` (category
  SEO, guides, static-page SEO, subcategory names, site FAQs) is still
  English-only and renders as such under `/fr` until Phase 4.
- `shopifyService.ts` adds `@inContext(language: …)` to every Storefront
  operation from the URL prefix, so Shopify returns its French translations
  and `cartCreate` hands back a French checkout.
- `middleware.ts` serves the same server-rendered head/body for `/fr/*`.
- **Staging switch:** `FR_INDEXABLE` in `src/i18n/locale.ts` is `false` until
  the UI dictionary (`src/i18n/messages.ts`), the editorial copy and the French
  product-meta/sitemap/feed exist. While false, every `/fr` URL is `noindex`
  (meta + the `/fr/:path*` X-Robots-Tag rule in `vercel.json`) and no hreflang
  is emitted. Flip it and delete that header rule to go live.

