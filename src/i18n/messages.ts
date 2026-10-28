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
