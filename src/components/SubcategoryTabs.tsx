import { Link, useParams, useSearchParams } from "react-router-dom";
import { getSubcategories } from "@/data/products";

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
  
  const subcategories = getSubcategories(category);
  
  // Map subcategory slugs to display names
  const subcategoryNames: Record<string, string> = {
    'twin-over-twin': 'Twin Over Twin',
    'twin-over-full': 'Twin Over Full',
    'full-over-full': 'Full Over Full',
    'twin-xl-over-queen': 'Twin XL Over Queen',
    'twin-xl-over-full': 'Twin XL Over Full',
    'l-shaped': 'L-Shaped',
    'multi-bunk': 'Quad & Triple',
    'low-bunk': 'Low Bunk',
    'other-bunk': 'Shop All',
    'low-loft': 'Low Loft',
    'high-loft': 'High Loft',
    'mid-loft': 'Mid Loft',
    'loft-with-desk': 'With Desk',
    'loft-with-bookcase': 'With Bookcase',
    'loft-with-slide': 'With Slide',
    'corner-loft': 'Corner Loft',
    'standard-loft': 'Shop All',
    'platform': 'Platform',
    'house-bed': 'House Beds',
    'floor-bed': 'Floor Beds',
    'traditional': 'Traditional',
    'trundle-bed': 'Trundle',
    'standard-single': 'Shop All',
    'mattresses': 'Mattresses',
    'safety-accessories': 'Safety',
    'storage': 'Storage',
    'desks': 'Desks',
    'bookcases-shelves': 'Bookcases',
    'nightstands': 'Nightstands',
    'trundle-accessories': 'Trundle',
    'other-accessories': 'Shop All',
  };
  
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
              {subcategoryNames[sub.slug] || sub.name} ({sub.count})
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
