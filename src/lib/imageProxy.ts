/**
 * Image URL passthrough.
 *
 * All imagery now lives on Forgali's own Shopify CDN (cdn.shopify.com), which
 * serves permissive CORS headers directly — so no proxy is needed. The old
 * implementation routed bedsmart.ca (the sister store) images through the free
 * images.weserv.nl proxy, coupling the storefront to a no-SLA third party and
 * to the sister brand; that branch is gone.
 */
export const getProxiedImage = (url: string): string => {
  return url && url.startsWith("http") || url?.startsWith("/") ? url : url || "/placeholder.svg";
};

export const getProxiedImages = (urls: string[]): string[] => {
  return urls.map(getProxiedImage);
};

/**
 * Shopify CDN resizing.
 *
 * The Storefront API hands back the ORIGINAL file — typically 1024-2400px and
 * 200-700KB — and nothing downstream narrowed it, so a 76px thumbnail was
 * downloading a 1024px JPEG. Appending ?width=N makes the CDN serve a resized
 * copy from its own cache; it is the single cheapest thing we do for LCP.
 *
 * Only cdn.shopify.com URLs are touched. Local bundle assets (/assets/*) are
 * already sized by Vite, and /placeholder.svg must pass through untouched or
 * the error fallback breaks. Shopify CDN URLs always carry ?v=<timestamp>, so
 * the separator has to be chosen rather than assumed.
 */
const SHOPIFY_CDN = "cdn.shopify.com";

export const cdnImage = (url: string, width: number): string => {
  if (!url || !url.includes(SHOPIFY_CDN)) return url;
  if (/[?&]width=/.test(url)) return url;
  return `${url}${url.includes("?") ? "&" : "?"}width=${width}`;
};

/**
 * Retina/responsive companion to cdnImage. Returns undefined for non-CDN URLs
 * so the attribute is omitted entirely rather than emitted empty — an empty
 * srcSet makes the browser ignore src in some engines.
 */
export const cdnSrcSet = (url: string, widths: number[]): string | undefined => {
  if (!url || !url.includes(SHOPIFY_CDN)) return undefined;
  return widths.map((w) => `${cdnImage(url, w)} ${w}w`).join(", ");
};

/** Grid cards: two per row on phones, three on tablets, four on desktop. */
export const CARD_SIZES = "(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw";
