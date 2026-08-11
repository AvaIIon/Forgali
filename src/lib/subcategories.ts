// Type-only: middleware.ts imports categorySubcategories for its crawlable
// subcategory link lists, and a value import here would drag the whole Shopify
// service into the edge bundle.
import type { ConvertedProduct } from "@/services/shopifyService";

// Predefined subcategories per category (matched to Shopify tags/productType).
// Tabs with zero matching products are hidden by SubcategoryTabs at render
// time, so a dead tab can never strand shoppers on "No products found".
export const categorySubcategories: Record<string, Array<{ slug: string; name: string }>> = {
  'bunk-beds': [
    { slug: 'twin-over-twin', name: 'Twin Over Twin' },
    { slug: 'twin-over-full', name: 'Twin Over Full' },
    { slug: 'full-over-full', name: 'Full Over Full' },
    { slug: 'queen-bunk', name: 'Queen' },
    { slug: 'l-shaped', name: 'L-Shaped' },
    { slug: 'multi-bunk', name: 'Quad & Triple' },
    { slug: 'low-bunk', name: 'Low Bunk' },
    { slug: 'with-slide', name: 'With Slide' },
    { slug: 'with-stairs', name: 'With Stairs' },
  ],
  'loft-beds': [
    { slug: 'low-loft', name: 'Low Loft' },
    { slug: 'mid-loft', name: 'Mid Loft' },
    { slug: 'high-loft', name: 'High Loft' },
    { slug: 'loft-with-desk', name: 'With Desk' },
    { slug: 'loft-with-slide', name: 'With Slide' },
    { slug: 'corner-loft', name: 'Corner Loft' },
  ],
  'single-beds': [
    { slug: 'platform', name: 'Platform' },
    { slug: 'house-bed', name: 'Castle & House' },
    { slug: 'floor-bed', name: 'Toddler & Floor' },
    { slug: 'traditional', name: 'Traditional' },
    { slug: 'trundle-bed', name: 'Trundle' },
  ],
  'accessories': [
    { slug: 'storage', name: 'Dressers & Storage' },
    { slug: 'desks', name: 'Desks' },
    { slug: 'bookcases-shelves', name: 'Bookcases' },
    { slug: 'nightstands', name: 'Nightstands' },
  ],
  'dining': [
    { slug: 'dining-tables', name: 'Dining Tables' },
    { slug: 'dining-chairs', name: 'Dining Chairs' },
    { slug: 'dining-benches', name: 'Benches' },
    { slug: 'bar-counter-chairs', name: 'Bar & Counter Chairs' },
    { slug: 'dining-sets', name: 'Dining Sets' },
  ],
  'living': [
    { slug: 'coffee-tables', name: 'Coffee Tables' },
    { slug: 'console-tables', name: 'Console Tables' },
    { slug: 'side-tables', name: 'Side Tables' },
    { slug: 'sideboards', name: 'Sideboards' },
    { slug: 'tv-stands', name: 'TV Stands' },
    { slug: 'shelves', name: 'Shelves' },
    { slug: 'entryway', name: 'Entryway Benches' },
  ],
};

// Subcategory to tag matching patterns
const subcategoryTagPatterns: Record<string, string[]> = {
  // Bunk beds
  'twin-over-twin': ['twin over twin', 'twin over twin bunk'],
  'twin-over-full': ['twin over full'],
  'full-over-full': ['full over full'],
  'queen-bunk': ['queen'],
  'l-shaped': ['l-shaped', 'corner loft bunk'],
  'multi-bunk': ['trio', 'quad', 'triple'],
  'low-bunk': ['low bunk'],
  'with-slide': ['slide', 'with slide', 'bunk bed with slide'],
  'with-stairs': ['stairs', 'with stairs', 'bunk bed with stairs'],
  // Loft beds. 'loft-with-slide' must ONLY match slide beds — the broader
  // 'play bed' tag also covers desk-only and curtain-only lofts.
  'low-loft': ['low loft'],
  'mid-loft': ['mid loft'],
  'high-loft': ['high loft', 'ultra high'],
  'loft-with-desk': ['desk', 'all in one'],
  'loft-with-slide': ['slide'],
  'corner-loft': ['corner loft'],
  // Single beds
  'platform': ['platform'],
  'house-bed': ['castle', 'house'],
  'floor-bed': ['toddler', 'floor'],
  'traditional': ['traditional'],
  'trundle-bed': ['trundle'],
  // Accessories
  'storage': ['dresser', 'storage', 'drawer'],
  'desks': ['desk'],
  'bookcases-shelves': ['bookcase', 'shelf'],
  'nightstands': ['nightstand', 'night stand'],
};

// Furniture subcategories match on Shopify productType (authoritative for the
// Plank & Beam range) — tag patterns above are for the bed categories.
const subcategoryTypePatterns: Record<string, string[]> = {
  // Dining
  'dining-tables': ['dining table', 'outdoor table'],
  'dining-chairs': ['dining chair'],
  'dining-benches': ['dining bench', 'outdoor bench'],
  'bar-counter-chairs': ['counter chair', 'bar chair', 'counter stool', 'bar stool'],
  'dining-sets': ['dining set'],
  // Living
  'coffee-tables': ['coffee table'],
  'console-tables': ['console table'],
  'side-tables': ['side table', 'end table'],
  'sideboards': ['sideboard'],
  'tv-stands': ['tv stand', 'media console'],
  'shelves': ['shelf', 'bookshelf'],
  'entryway': ['entryway bench'],
};

// Check if product matches a subcategory based on productType, tags, or title
// (some ranges — platform/traditional singles — carry the signal only in the
// product title, never as a tag).
export const productMatchesSubcategory = (product: ConvertedProduct, subcategory: string): boolean => {
  const typePatterns = subcategoryTypePatterns[subcategory];
  if (typePatterns) {
    return typePatterns.includes((product.productType || '').toLowerCase());
  }

  const patterns = subcategoryTagPatterns[subcategory];
  if (!patterns) return product.subcategory === subcategory;

  const haystack = `${product.tags.join(' ')} ${product.name}`.toLowerCase();
  return patterns.some(pattern => haystack.includes(pattern));
};
