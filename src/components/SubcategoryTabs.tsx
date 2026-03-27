import { Link, useParams, useSearchParams } from "react-router-dom";

// Predefined subcategories per category
const categorySubcategories: Record<string, Array<{ slug: string; name: string }>> = {
  'bunk-beds': [
    { slug: 'twin-over-twin', name: 'Twin Over Twin' },
    { slug: 'twin-over-full', name: 'Twin Over Full' },
    { slug: 'full-over-full', name: 'Full Over Full' },
    { slug: 'twin-xl-over-queen', name: 'Twin XL Over Queen' },
    { slug: 'l-shaped', name: 'L-Shaped' },
    { slug: 'multi-bunk', name: 'Quad & Triple' },
    { slug: 'low-bunk', name: 'Low Bunk' },
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
    { slug: 'house-bed', name: 'House Beds' },
    { slug: 'floor-bed', name: 'Floor Beds' },
    { slug: 'traditional', name: 'Traditional' },
    { slug: 'trundle-bed', name: 'Trundle' },
  ],
  'accessories': [
    { slug: 'storage', name: 'Storage' },
    { slug: 'desks', name: 'Desks' },
    { slug: 'bookcases-shelves', name: 'Bookcases' },
    { slug: 'nightstands', name: 'Nightstands' },
  ],
};

export const SubcategoryTabs = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const selectedSubcategory = searchParams.get('subcategory');
  
  if (!category) return null;
  
  // Special handling for mattresses
  if (category === 'mattresses') {
    return (
      <div className="border-b border-border bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4">
            <Link
              to={`/category/${category}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                !selectedSubcategory
                  ? 'bg-[#4A647C] text-white'
                  : 'bg-[#f2f4f6] text-foreground hover:bg-[#e8eaed]'
              }`}
            >
              Shop All Mattresses
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const subcategories = categorySubcategories[category] || [];
  
  return (
    <div className="border-b border-border bg-background sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          <Link
            to={`/category/${category}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              !selectedSubcategory
                ? 'bg-[#4A647C] text-white'
                : 'bg-[#f2f4f6] text-foreground hover:bg-[#e8eaed]'
            }`}
          >
            Shop All
          </Link>
          {subcategories.map((sub) => (
            <Link
              key={sub.slug}
              to={`/category/${category}?subcategory=${sub.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedSubcategory === sub.slug
                  ? 'bg-[#4A647C] text-white'
                  : 'bg-[#f2f4f6] text-foreground hover:bg-[#e8eaed]'
              }`}
            >
              {sub.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
