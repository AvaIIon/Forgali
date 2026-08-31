// Rich, per-page SEO for the highest-value bed pages — targets the exact
// queries Search Console shows Forgali already ranking (page 2) for, so each
// category AND subcategory speaks directly to its own term instead of every
// loft view rendering the generic "Loft Beds | Forgali".
//
// Keyed by `${category}` and by `${category}|${subcategory}`. Copy is grounded
// in real catalog data (counts/prices/sizes/finishes verified against the live
// store — no fabrication) and fact-checked in an adversarial pass. Pages not in
// this map fall back to the generic categoryInfoMap in CategoryPage.

export interface CategorySeo {
  seoTitle: string;       // <title> + OG (<=60 chars incl. "| Forgali")
  seoDescription: string; // meta description (120-160 chars)
  h1: string;             // page H1 (the keyword phrase)
  lead: string;           // short supporting line under the H1
  intro?: string;         // buying-guide body below the grid; omit to drop the whole "About" section
  /**
   * H2 sections rendered after `intro`. Each H2 is a real query this page
   * already gets impressions for, so the page answers the sub-intent under a
   * heading instead of burying it mid-paragraph. `links` become in-copy
   * internal links — the subcategory pages previously had NO editorial inbound
   * link anywhere on the site, only the filter tabs.
   */
  sections?: Array<{
    h2: string;
    body: string;
    links?: Array<{ label: string; href: string }>;
  }>;
  /**
   * Q&A rendered below the sections and emitted as FAQPage structured data.
   * Answers must be facts already stated elsewhere on the site — this feeds
   * both People-Also-Ask and AI answers, where a wrong claim is worse than
   * no claim. No competitor in this niche runs FAQ schema.
   */
  faqs?: Array<{ q: string; a: string }>;
}

const BED_SEO: Record<string, CategorySeo> = {
  "loft-beds": {
    seoTitle: "Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop our collection of solid wood loft beds in low, mid and high styles that free up floor space. Free Canada-wide shipping and 30-day returns. Shop today.",
    h1: "Loft Beds",
    lead: "Solid wood loft beds in low, mid and high styles — free up the floor for a desk, storage or play.",
  },
  "bunk-beds": {
    seoTitle: "Bunk Beds Canada – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop 69 solid-wood bunk beds for kids and teens — twin-over-twin to full-over-full, with stairs, storage or trundle. Free Canada-wide shipping. Browse today.",
    h1: "Bunk Beds Canada",
    lead: "69 solid-wood bunk beds — twin-over-twin to full-over-full, with stairs, storage and trundle options.",
  },
  "single-beds": {
    seoTitle: "Single Beds Canada – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop 24 solid-wood single beds in Twin, Full and Queen, from $265. Free Canada-wide shipping and 30-day returns. Find a platform, house or trundle bed today.",
    h1: "Single Beds Canada",
    lead: "24 solid-wood single beds — platform, house and trundle styles in Twin, Full and Queen, from $265.",
  },
  "bedroom": {
    seoTitle: "Kids Beds Canada – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop kids beds in Canada from $265 — solid-wood bunk, loft and single beds with free Canada-wide shipping and easy 30-day returns. Find the right fit today.",
    h1: "Kids Beds Canada",
    lead: "122 solid-wood bunk, loft and single beds — including a wide range of Max & Lily, shipped across Canada.",
  },
  "loft-beds|low-loft": {
    seoTitle: "Low Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Low loft beds sit close to the floor for younger kids, with room to play or store underneath. Solid wood, free Canada-wide shipping. Shop the collection.",
    h1: "Low Loft Beds",
    lead: "Loft beds that sit close to the floor — an easy first step up for younger children.",
  },
  "loft-beds|mid-loft": {
    seoTitle: "Mid Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop mid loft beds in solid wood — a middle-height design that frees up room for storage or a desk while staying easy to reach. Free Canada-wide shipping.",
    h1: "Mid Loft Beds",
    lead: "A middle-height loft — enough clearance for a desk or storage, still easy to reach.",
  },
  "loft-beds|high-loft": {
    seoTitle: "High Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "High loft beds lift the sleeping surface up high, freeing the floor below for a desk or dresser. Solid wood, free Canada-wide shipping. Shop finishes today.",
    h1: "High Loft Beds",
    lead: "Lift the bed to its tallest — a full desk, dresser or reading nook fits underneath.",
  },
  "loft-beds|loft-with-desk": {
    seoTitle: "Loft Beds With Desk – Solid Wood | Forgali",
    seoDescription:
      "Shop loft beds with a built-in desk and bookcase — a bed plus study space in one footprint. Solid wood, free Canada-wide shipping. Twin and Full sizes.",
    h1: "Loft Beds With Desk",
    lead: "Bed plus a built-in desk and bookcase in one footprint — ideal for small and shared rooms.",
  },
  "bunk-beds|low-bunk": {
    seoTitle: "Low Bunk Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop low bunk beds in Twin and Full — a lower height younger kids can climb more easily. Solid wood with free Canada-wide shipping. Browse the collection.",
    h1: "Low Bunk Beds",
    lead: "Bunks that sit closer to the floor — a reassuring first bunk for younger children.",
  },
  "dining": {
    seoTitle: "Plank & Beam Dining Furniture - Canada | Forgali",
    seoDescription: "Shop 86 Plank & Beam dining pieces in solid wood, from $169. Free shipping across Canada in CAD with easy 30-day returns. Explore the collection.",
    h1: "Plank & Beam Dining Furniture",
    lead: "Shop 86 Plank & Beam dining pieces in solid wood, from $169. Free shipping across Canada in CAD with easy 30-day returns.",
  },
  "living": {
    seoTitle: "Plank & Beam Living Room Furniture - Canada | Forgali",
    seoDescription: "Shop Plank & Beam living room furniture in solid wood — coffee tables, consoles and sideboards. Free shipping across Canada, priced in CAD. From $140.",
    h1: "Plank & Beam Living Room Furniture",
    lead: "Shop Plank & Beam living room furniture in solid wood — coffee tables, consoles and sideboards. Free shipping across Canada, priced in CAD. From $140.",
  },
  "dining|dining-tables": {
    seoTitle: "Solid Wood Dining Table Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood Plank & Beam dining tables in Canada. Free Canada-wide shipping, priced in CAD, 30-day returns. Round, oval and rectangular styles from $317.",
    h1: "Solid Wood Dining Table Canada",
    lead: "Shop solid wood Plank & Beam dining tables. Free Canada-wide shipping, priced in CAD, 30-day returns. Round, oval and rectangular styles from $317.",
  },
  "dining|dining-chairs": {
    seoTitle: "Solid Wood Dining Chairs Canada - Free Shipping | Forgali",
    seoDescription: "Shop 19 solid wood Plank & Beam dining chairs, from $169 CAD. Upholstered and wood-seat styles with free shipping across Canada and easy 30-day returns.",
    h1: "Solid Wood Dining Chairs",
    lead: "Shop 19 solid wood Plank & Beam dining chairs, from $169 CAD. Upholstered and wood-seat styles with free shipping across Canada and easy 30-day returns.",
  },
  "dining|dining-benches": {
    seoTitle: "Solid Wood Dining Bench Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood dining benches in Canada, from $211 in CAD. Free Canada-wide shipping and easy 30-day returns. Find your seat today.",
    h1: "Solid Wood Dining Benches",
    lead: "Shop solid wood dining benches, from $211 in CAD. Free Canada-wide shipping and easy 30-day returns.",
  },
  "dining|bar-counter-chairs": {
    seoTitle: "Counter & Bar Stools Canada - Solid Wood | Forgali",
    seoDescription: "Shop 13 solid-wood counter and bar stools in CAD, from $186. Free shipping across Canada and easy 30-day returns. Find your perfect island seat.",
    h1: "Counter & Bar Stools Canada",
    lead: "Shop 13 solid-wood counter and bar stools in CAD, from $186. Free shipping across Canada and easy 30-day returns.",
  },
  "dining|dining-sets": {
    seoTitle: "Solid Wood Dining Sets Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood dining sets in Canada — table plus bench or chairs, from $1,238. Free Canada-wide shipping and 30-day returns in CAD. Explore the collection.",
    h1: "Solid Wood Dining Sets Canada",
    lead: "Shop solid wood dining sets — table plus bench or chairs, from $1,238. Free Canada-wide shipping and 30-day returns in CAD.",
  },
  "living|coffee-tables": {
    seoTitle: "Solid Wood Coffee Tables Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood Plank & Beam coffee tables in Canada, from $229 CAD. Round and rectangular styles with free Canada-wide shipping and easy 30-day returns.",
    h1: "Solid Wood Coffee Tables",
    lead: "Shop solid wood Plank & Beam coffee tables, from $229 CAD. Round and rectangular styles with free Canada-wide shipping and easy 30-day returns.",
  },
  "living|console-tables": {
    seoTitle: "Solid Wood Console Tables Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood Plank & Beam console tables in Canada, from $158 CAD. Free Canada-wide shipping and easy 30-day returns. Browse widths and finishes today.",
    h1: "Solid Wood Console Tables",
    lead: "Shop solid wood Plank & Beam console tables, from $158 CAD. Free Canada-wide shipping and easy 30-day returns.",
  },
  "living|side-tables": {
    seoTitle: "Solid Wood Side Table Canada - Free Shipping | Forgali",
    seoDescription: "Shop 13 solid wood side and end tables in CAD, from $193. Free shipping across Canada plus easy 30-day returns. Browse round and clean-lined styles today.",
    h1: "Solid Wood Side & End Tables",
    lead: "Shop 13 solid wood side and end tables in CAD, from $193. Free shipping across Canada plus easy 30-day returns.",
  },
  "living|sideboards": {
    seoTitle: "Solid Wood Sideboards Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood sideboards and buffets in Canada from $671. Free Canada-wide shipping, priced in CAD with 30-day returns. Browse our 2 and 3-door storage.",
    h1: "Solid Wood Sideboards & Buffets",
    lead: "Shop solid wood sideboards and buffets from $671. Free Canada-wide shipping, priced in CAD with 30-day returns.",
  },
  "living|tv-stands": {
    seoTitle: "Solid Wood TV Stands Canada - Free Shipping | Forgali",
    seoDescription: "Shop 3 Plank & Beam TV stands in solid pine, from $654 CAD. Free Canada-wide shipping and easy 30-day returns. Fits screens up to 65 inches.",
    h1: "Solid Wood TV Stands",
    lead: "Media consoles in solid pine — built to hold the screen and hide the cable mess.",
  },
  "living|shelves": {
    seoTitle: "Fireplace Mantel Shelf Canada - Solid Pine | Forgali",
    seoDescription: "Shop solid pine floating mantel shelves in Canada, from $317 CAD. Sizes 48, 60 and 72 inches, with free shipping and easy 30-day returns.",
    h1: "Fireplace Mantel Shelves",
    lead: "Floating mantels in 100% solid pine — over the fireplace, or anywhere a blank wall needs one good line.",
  },
  "living|entryway": {
    seoTitle: "Entryway Bench Canada - Solid Wood | Forgali",
    seoDescription: "Shop solid wood entryway benches in Canada, from $140 CAD. Two lengths and eight finishes, with free Canada-wide shipping and 30-day returns.",
    h1: "Entryway Benches",
    lead: "A place to sit and pull your boots off — in solid pine and birch, from $140.",
  },
};

/**
 * FAQPage structured data. Shared by CategoryPage (hydrated) and middleware.ts
 * (initial HTML) so both emit byte-identical markup for the same Q&A — a page
 * whose injected and rendered schema disagree is worse than one with neither.
 */
export const faqPageJsonLd = (
  faqs: Array<{ q: string; a: string }>
): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

// Own-property lookups only: a plain index walks the prototype chain, so a
// URL-supplied key like "constructor" would return junk instead of null.
const own = (key: string): CategorySeo | null =>
  Object.prototype.hasOwnProperty.call(BED_SEO, key) ? BED_SEO[key] : null;

export const getBedSeo = (
  category: string | undefined,
  subcategory?: string | null
): CategorySeo | null => {
  if (!category) return null;
  if (subcategory) {
    const sub = own(`${category}|${subcategory}`);
    if (sub) return sub;
  }
  // Only fall back to the category-level entry when no subcategory is active —
  // an unmatched subcategory should keep the generic category page, not
  // mislabel itself with the parent's rich copy.
  if (!subcategory) return own(category);
  return null;
};
