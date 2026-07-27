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
