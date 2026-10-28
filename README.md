

## French version (`/fr`)

French lives under the `/fr` prefix on the same host with the same English slugs
(`/fr/product/<handle>`, `/fr/category/dining`). The prefix is the only locale
signal; `src/i18n/locale.ts` holds the rules and `src/i18n/LocaleContext.tsx`
exposes them (`useLocale()` → `locale`, `lp()` for paths, `t()` for UI strings,
`money()` for prices in `fr-CA`/`en-CA` format).

- Components and pages import `Link`/`useNavigate` from `@/i18n/router`, which
  prefixes internal paths automatically. Keep writing locale-free paths.
- `shopifyService.ts` adds `@inContext(language: …)` to every Storefront
  operation from the URL prefix, so Shopify returns its French translations
  and `cartCreate` hands back a French checkout.
- `middleware.ts` serves the same server-rendered head/body for `/fr/*`.
- **Staging switch:** `FR_INDEXABLE` in `src/i18n/locale.ts` is `false` until
  the UI dictionary (`src/i18n/messages.ts`), the editorial copy and the French
  product-meta/sitemap/feed exist. While false, every `/fr` URL is `noindex`
  (meta + the `/fr/:path*` X-Robots-Tag rule in `vercel.json`) and no hreflang
  is emitted. Flip it and delete that header rule to go live.

