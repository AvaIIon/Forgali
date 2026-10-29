// Google Ads click-ID handoff to the Shopify checkout.
//
// Checkout runs on kjrq9s-yp.myshopify.com, a different domain from
// forgali.com. The gclid Google appends to an ad landing URL (and the
// _gcl_aw cookie gtag sets from it) therefore never reaches the checkout
// page, and the Shopify custom pixel that fires the Purchase conversion on
// checkout_completed had no click to attribute the order to. Google Ads
// counted 1 of the 5 orders placed Oct 22–27, 2026, and the campaign bids on
// the sales it can see.
//
// This module keeps the click IDs on this side for 90 days (Google's click
// window) and hands them to cartCreate as cart attributes. They land on the
// order as note attributes and reach the pixel as
// event.data.checkout.attributes, where the pixel replays them into the
// cookies gtag reads before sending the conversion.

const STORAGE_KEY = 'forgali_ad_click';
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;
const CLICK_PARAMS = ['gclid', 'gbraid', 'wbraid'] as const;
type ClickParam = (typeof CLICK_PARAMS)[number];
type StoredClick = { ids: Partial<Record<ClickParam, string>>; ts: number };

// Click IDs are URL-safe tokens; anything else is not one and is dropped.
const CLICK_ID = /^[A-Za-z0-9_-]{1,200}$/;

const readStoredClick = (): StoredClick | null => {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredClick;
    if (!parsed || typeof parsed.ts !== 'number' || !parsed.ids) return null;
    if (Date.now() - parsed.ts > MAX_AGE_MS) return null;
    return parsed;
  } catch {
    return null;
  }
};

/**
 * Call once on the initial page load (main.tsx). Every ad click is a full
 * page load with the IDs in the query string, so SPA navigations never carry
 * new ones. A fresh click replaces whatever was stored; a visit without one
 * leaves the stored click alone — which click gets the credit is Google's
 * call, not ours.
 */
export const captureAdClick = (): void => {
  if (typeof window === 'undefined') return;
  try {
    const params = new URLSearchParams(window.location.search);
    const ids: StoredClick['ids'] = {};
    for (const param of CLICK_PARAMS) {
      const value = params.get(param);
      if (value && CLICK_ID.test(value)) ids[param] = value;
    }
    if (Object.keys(ids).length === 0) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ids, ts: Date.now() }));
  } catch {
    /* storage unavailable — attribution is best-effort, checkout must not care */
  }
};

/** Cart attributes for cartCreate; empty when the visit had no ad click. */
export const adClickCartAttributes = (): Array<{ key: string; value: string }> => {
  if (typeof window === 'undefined') return [];
  const stored = readStoredClick();
  if (!stored) return [];
  return CLICK_PARAMS.filter(param => stored.ids[param]).map(param => ({
    key: param,
    value: stored.ids[param] as string,
  }));
};
