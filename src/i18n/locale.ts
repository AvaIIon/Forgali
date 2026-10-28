// Locale plumbing shared by the SPA (src/i18n/LocaleContext.tsx), <Seo> and
// the edge middleware (middleware.ts imports this file directly, so keep it
// free of React and of anything that touches `window`).
//
// URL model: French lives under the /fr prefix on the same host with the same
// English slugs (/fr/product/<handle>, /fr/category/dining); English has no
// prefix. The prefix is the ONLY locale signal — no cookies, no Accept-Language
// sniffing — so a given URL renders the same for every visitor and crawler.

export type Locale = "en" | "fr";
export const LOCALES: readonly Locale[] = ["en", "fr"] as const;
export const DEFAULT_LOCALE: Locale = "en";
const FR_PREFIX = "/fr";

/**
 * Staging switch for the French build-out. While false:
 *  - every /fr URL carries <meta name="robots" content="noindex, follow"> and
 *    no canonical (middleware.ts + Seo.tsx), and vercel.json sends the same
 *    as an X-Robots-Tag header, so a half-translated site is never indexed;
 *  - no hreflang alternates are emitted on either language.
 * Flip to true (and drop the "/fr/:path*" X-Robots-Tag rule in vercel.json)
 * once the UI dictionary, the editorial copy and the French product-meta,
 * sitemap and feed are in place.
 */
export const FR_INDEXABLE = false;

/** Storefront API LanguageCode per locale (the store publishes EN and FR). */
export const SHOPIFY_LANGUAGE: Record<Locale, "EN" | "FR"> = { en: "EN", fr: "FR" };
export const HTML_LANG: Record<Locale, string> = { en: "en", fr: "fr" };
export const OG_LOCALE: Record<Locale, string> = { en: "en_CA", fr: "fr_CA" };
export const HREFLANG: Record<Locale, string> = { en: "en-CA", fr: "fr-CA" };
export const INTL_LOCALE: Record<Locale, string> = { en: "en-CA", fr: "fr-CA" };

/** Split a pathname into its locale and the locale-free path ("/fr/about" → fr + "/about"). */
export function stripLocale(pathname: string): { locale: Locale; path: string } {
  if (pathname === FR_PREFIX || pathname === `${FR_PREFIX}/`) return { locale: "fr", path: "/" };
  if (pathname.startsWith(`${FR_PREFIX}/`)) return { locale: "fr", path: pathname.slice(FR_PREFIX.length) };
  return { locale: "en", path: pathname };
}

export function localeFromPathname(pathname: string): Locale {
  return stripLocale(pathname).locale;
}

/**
 * Prefix an internal, locale-free path for `locale`. External URLs, relative
 * paths, bare hashes and already-prefixed paths pass through unchanged, so it
 * is safe to apply to every <Link to>.
 */
export function localizePath(path: string, locale: Locale): string {
  if (locale === "en") return path;
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  if (
    path === FR_PREFIX ||
    path.startsWith(`${FR_PREFIX}/`) ||
    path.startsWith(`${FR_PREFIX}?`) ||
    path.startsWith(`${FR_PREFIX}#`)
  ) {
    return path;
  }
  if (path === "/") return FR_PREFIX;
  if (path.startsWith("/?") || path.startsWith("/#")) return FR_PREFIX + path.slice(1);
  return FR_PREFIX + path;
}

/** The same page in another language: "/fr/about?x#y" ↔ "/about?x#y". */
export function switchLocalePath(pathname: string, locale: Locale, search = "", hash = ""): string {
  const { path } = stripLocale(pathname);
  return localizePath(path, locale) + search + hash;
}

/** "$1,299.00" in English, "1 299,00 $" in French (fr-CA). CAD-only store. */
export function formatMoney(amount: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    style: "currency",
    currency: "CAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}
