// Homepage hero photo, shared by Hero.tsx and middleware.ts. The middleware
// preloads these exact URLs and paints the same photo in the pre-hydration
// body, so the browser starts the LCP download from the HTML instead of
// waiting for the bundle to render <Hero>. Any change here must stay
// byte-identical across both, or the preload is wasted on a second image.
//
// Plank & Beam Risa breakfast nook — the same photo the Shop the Look section
// makes shoppable further down the page, cropped by Shopify's CDN
// (crop=region). The mobile crop is byte-identical to Shop the Look's, so the
// browser reuses it from cache.
export const HERO_PHOTO =
  "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2700336007-p05__2.jpg?v=1783708283";
export const HERO_DESKTOP = `${HERO_PHOTO}&crop=region&crop_left=0&crop_top=960&crop_width=2000&crop_height=900`;
export const HERO_MOBILE = `${HERO_PHOTO}&width=1000&height=1500&crop=region&crop_left=145&crop_top=0&crop_width=1333&crop_height=2000`;
// Tailwind's md breakpoint is 768px; the <picture> switches below it.
export const HERO_MOBILE_MEDIA = "(max-width: 767px)";
export const HERO_DESKTOP_MEDIA = "(min-width: 768px)";
