// Meta pixel (1007312825634568, "forgali web") events beyond PageView.
//
// The base snippet in index.html loads fbq and fires the first PageView;
// src/components/MetaPixel.tsx fires PageView on SPA route changes (and
// declares window.fbq). This file is the shopping events: ViewContent on a
// product page, AddToCart, Search. Both Forgali sales campaigns optimize for
// Purchase, which a store this size reaches a few times a week — the steps
// before it are what Meta learns from in between.
//
// Product ids are Shopify handles, the same value as <g:id> in
// public/google-feed.xml and the product id the Pinterest tag and the
// "Meta Checkout" Shopify pixel send, so a future Meta catalog built from
// that feed matches these events.
//
// Purchase does NOT live here: checkout runs on Shopify's domain, so
// InitiateCheckout, AddPaymentInfo and Purchase fire from the "Meta Checkout"
// custom pixel (admin → Settings → Customer events). The ?fbclid= click and
// the _fbp browser ID get there through the cart attributes set in
// src/lib/adClick.ts.

/** Standard events only: ViewContent, AddToCart, Search. */
export const trackMeta = (event: string, data?: Record<string, unknown>): void => {
  window.fbq?.("track", event, data);
};
