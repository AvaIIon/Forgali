import type { Locale } from "./locale";

// UI dictionary. Phase 2 (plumbing) only holds the strings the locale code
// itself touches; the full UI translation (Phase 3) extends this object. The
// `fr` type is derived from `en`, so a key missing in French fails typecheck.
const en = {
  from: "From ",
  country: "Country:",
  language: "Language",
  searchPlaceholder: "Search our store",
  checkoutWithShopify: "Checkout with Shopify",
  processing: "Processing...",
} as const;

const fr: Record<keyof typeof en, string> = {
  from: "À partir de ",
  country: "Pays :",
  language: "Langue",
  searchPlaceholder: "Rechercher dans la boutique",
  checkoutWithShopify: "Passer au paiement avec Shopify",
  processing: "Traitement en cours...",
};

export type MessageKey = keyof typeof en;
export const MESSAGES: Record<Locale, Record<MessageKey, string>> = { en, fr };

// ---------------------------------------------------------------------------
// Product option labels. Shopify's auto-translation (Translate & Adapt, run
// 2026-10-19) rendered the option name "Finish" as "Terminer" (the verb "to
// finish") on all 275 finish-bearing products and the value "Espresso" as
// "Expresso". Those translations live per product in Shopify, so until they are
// corrected there (Admin API translationsRegister, or one by one in Translate &
// Adapt) the storefront overrides them here. Keys are the ENGLISH option
// name/value, which the product page has thanks to the English-shape overlay in
// shopifyService.ts; anything not listed falls back to Shopify's translation.
// ---------------------------------------------------------------------------
const OPTION_NAME_OVERRIDES: Record<Locale, Record<string, string>> = {
  en: {},
  fr: {
    Finish: "Fini",
    "Chair Finish": "Fini de la chaise",
    "Table Finish": "Fini de la table",
    "Table and Bench Finish": "Fini de la table et du banc",
    "Curtain/Finish": "Rideau/Fini",
  },
};

const OPTION_VALUE_OVERRIDES: Record<Locale, Record<string, string>> = {
  en: {},
  fr: { Espresso: "Espresso" },
};

/** Display label for an option name: override → Shopify translation → English. */
export const optionNameLabel = (locale: Locale, name: string, translated?: string): string =>
  OPTION_NAME_OVERRIDES[locale][name] ?? translated ?? name;

/** Display label for an option value: override → Shopify translation → English. */
export const optionValueLabel = (locale: Locale, value: string, translated?: string): string =>
  OPTION_VALUE_OVERRIDES[locale][value] ?? translated ?? value;

