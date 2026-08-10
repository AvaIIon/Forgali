import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires a Meta Pixel PageView on every client-side route change.
 *
 * The base snippet in index.html runs once, on the initial HTML load. Every
 * navigation after that is a JS route change that Meta never sees on its own, so
 * without this the pixel reports a single PageView per session and website-visitor
 * Custom Audiences can only ever contain landing pages — no "viewed bunk beds"
 * audience is possible.
 *
 * The first render is skipped deliberately: index.html has already tracked that
 * pageview, and firing again here would double-count every entry page.
 *
 * Keyed on pathname only. Query-string changes (the Smart Deals ?room= tabs,
 * category filters) are not navigations and would just inflate the event count.
 *
 * Purchase is NOT tracked in this repo and cannot be. Checkout runs on Shopify's
 * domain (kjrq9s-yp.myshopify.com), so fbq can never observe it from forgali.com —
 * purchases are sent server-side from meta-bot instead. Same split as the Google
 * Ads tag above it in index.html.
 */
export const MetaPixel = () => {
  const { pathname } = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    window.fbq?.("track", "PageView");
  }, [pathname]);

  return null;
};

export default MetaPixel;
