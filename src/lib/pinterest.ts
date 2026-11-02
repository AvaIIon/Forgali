// Pinterest tag (pintrk) for forgali.com.
//
// PINTEREST_TAG_ID is the tag of the "Forgali" Pinterest business account
// (daniel@forgali.com), ad account 549770956733 → Conversions → Pinterest tag.
// Setting it to "" switches the tag off completely: nothing loads,
// window.pintrk never exists, and every helper below is a no-op.
//
// Product ids sent with events are Shopify handles — the same value as <g:id>
// in public/google-feed.xml, which is also the Pinterest catalog's data
// source. They must match or catalog ads can't tie a visit to a product.
//
// Purchase does NOT live here: checkout runs on Shopify's domain, so the
// 'checkout' event fires from a Shopify custom pixel (admin → Settings →
// Customer events). The ?epik= click ID Pinterest appends to ad clicks gets
// there through the cart attributes set in src/lib/adClick.ts.
//
// CSP: vercel.json must allowlist s.pinimg.com + ct.pinterest.com in
// script-src, and ct.pinterest.com in connect-src and frame-src (img-src
// already allows https:). Without them core.js loads nothing or every event
// is blocked, and nothing reports an error — the same way the Meta pixel
// silently failed here in August 2026.

type Pintrk = ((...args: unknown[]) => void) & { queue?: unknown[][]; version?: string };

declare global {
  interface Window {
    pintrk?: Pintrk;
  }
}

export const PINTEREST_TAG_ID = "2613022509697";

export type PinterestLineItem = {
  product_id: string;
  product_name?: string;
  product_price?: number;
  product_quantity?: number;
  product_category?: string;
  product_variant_id?: string;
};

/**
 * Call once on the initial page load (main.tsx). Pinterest's own base snippet,
 * ported: a queueing stub that core.js replaces once it loads, then 'load' and
 * the first 'page'. SPA route changes after this are src/components/PinterestTag.tsx.
 */
export const initPinterestTag = (): void => {
  if (!PINTEREST_TAG_ID || typeof window === "undefined" || window.pintrk) return;
  const stub: Pintrk = function (...args: unknown[]) {
    window.pintrk?.queue?.push(args);
  };
  stub.queue = [];
  stub.version = "3.0";
  window.pintrk = stub;
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://s.pinimg.com/ct/core.js";
  document.head.appendChild(script);
  window.pintrk("load", PINTEREST_TAG_ID);
  window.pintrk("page");
};

export const pinterestPage = (): void => {
  window.pintrk?.("page");
};

/** Standard event names: pagevisit, viewcategory, search, addtocart (checkout is Shopify's). */
export const trackPinterest = (event: string, data?: Record<string, unknown>): void => {
  window.pintrk?.("track", event, data);
};
