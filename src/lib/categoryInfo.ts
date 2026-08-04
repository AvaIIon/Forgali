// Generic per-category header + SEO fallback copy, keyed by URL slug.
//
// Shared by CategoryPage (H1/lead + <Seo> fallback) AND middleware.ts (per-URL
// head injection into the initial HTML). One map so the two can never disagree
// about which categories exist: a slug missing here renders the client 404 in
// the SPA and answers a real HTTP 404 at the edge.
export const categoryInfoMap: Record<string, { title: string; description: string }> = {
  "bunk-beds": {
    title: "Bunk Beds",
    description: "Premium solid wood bunk beds built to last. From twin over twin to quad bunks, find the perfect space-saving solution for your family."
  },
  "loft-beds": {
    title: "Loft Beds",
    description: "Maximize your space with our sturdy loft beds. Perfect for bedrooms, dorms, or any space that needs smart vertical storage."
  },
  "single-beds": {
    title: "Single Beds",
    description: "Classic single beds in timeless designs in twin, full, and queen sizes. Solid wood construction for lasting quality."
  },
  "mattresses": {
    title: "Mattresses",
    description: "Premium mattresses designed for comfort and support. Find the perfect fit for your bunk bed, loft bed, or single bed."
  },
  "accessories": {
    title: "Storage & Accessories",
    description: "Complete your room with our storage solutions and accessories. Dressers, shelving, and more."
  },
  "bedroom": {
    title: "Bedroom",
    description: "Solid wood beds for every sleeper — bunk beds, loft beds, and single beds built to last from childhood through the teenage years."
  },
  "dining": {
    title: "Dining",
    description: "Solid wood dining tables, chairs, benches, and complete sets. Timeless craftsmanship for the heart of your home."
  },
  "living": {
    title: "Living",
    description: "Coffee tables, console and side tables, sideboards, TV stands, and shelving — solid wood pieces that bring warmth to every living space."
  }
};
