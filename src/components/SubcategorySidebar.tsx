import { Link, useParams, useSearchParams } from "react-router-dom";
import { getSubcategories } from "@/data/products";

export const SubcategorySidebar = () => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const selectedSubcategory = searchParams.get('subcategory');
  
  if (!category) return null;
  
  // Special handling for mattresses - they don't have subcategories in the normal sense
  // They're already filtered by subcategory in getProductsByCategory
  if (category === 'mattresses') {
    return (
      <div className="w-64 flex-shrink-0 border-r border-border pr-6">
        <h3 className="font-bold text-lg mb-4 uppercase tracking-wide">MATTRESSES</h3>
        <nav className="space-y-1">
          <Link
            to={`/category/${category}`}
            className="block px-3 py-2 rounded-md text-sm transition-colors bg-[#4A647C] text-white font-medium"
          >
            Shop All Mattresses
          </Link>
        </nav>
      </div>
    );
  }
  
  const subcategories = getSubcategories(category);
  
  // Map subcategory slugs to display names
  const subcategoryNames: Record<string, string> = {
    'twin-over-twin': 'Twin Over Twin Bunk Beds',
    'twin-over-full': 'Twin Over Full Bunk Beds',
    'full-over-full': 'Full Over Full Bunk Beds',
    'twin-xl-over-queen': 'Twin XL Over Queen Bunk Beds',
    'twin-xl-over-full': 'Twin XL Over Full Bunk Beds',
    'l-shaped': 'L-Shaped Bunk Beds',
    'multi-bunk': 'Quad & Triple Bunk Beds',
    'low-bunk': 'Low Bunk Beds',
    'other-bunk': 'Shop All Bunk Beds',
    'low-loft': 'Low Loft Beds',
    'high-loft': 'High Loft Beds',
    'mid-loft': 'Mid Loft Beds',
    'loft-with-desk': 'Loft Beds With Desk',
    'loft-with-bookcase': 'Loft Beds With Bookcase',
    'loft-with-slide': 'Loft Beds With Slide',
    'corner-loft': 'Corner Loft Beds',
    'standard-loft': 'Shop All Loft Beds',
    'platform': 'Platform Beds',
    'house-bed': 'House Beds',
    'floor-bed': 'Floor Beds',
    'traditional': 'Traditional Beds',
    'trundle-bed': 'Trundle Beds',
    'standard-single': 'Shop All Single Beds',
    'mattresses': 'Mattresses',
    'safety-accessories': 'Safety Accessories',
    'storage': 'Storage & Drawers',
    'desks': 'Desks',
    'bookcases-shelves': 'Bookcases & Shelves',
    'nightstands': 'Nightstands',
    'trundle-accessories': 'Trundle Accessories',
    'other-accessories': 'Shop All Accessories',
  };
  
  return (
    <div className="w-64 flex-shrink-0 border-r border-border pr-6">
      <h3 className="font-bold text-lg mb-4 uppercase tracking-wide">
        {category === 'bunk-beds' ? 'BUNK BEDS' : 
         category === 'loft-beds' ? 'LOFT BEDS' : 
         category === 'single-beds' ? 'SINGLE BEDS' : 
         category === 'mattresses' ? 'MATTRESSES' : 
         'ACCESSORIES'}
      </h3>
      <nav className="space-y-1">
        <Link
          to={`/category/${category}`}
          className={`block px-3 py-2 rounded-md text-sm transition-colors ${
            !selectedSubcategory
              ? 'bg-[#4A647C] text-white font-medium'
              : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
          }`}
        >
          Shop All
        </Link>
        {subcategories.map((sub) => (
          <Link
            key={sub.slug}
            to={`/category/${category}?subcategory=${sub.slug}`}
            className={`block px-3 py-2 rounded-md text-sm transition-colors ${
              selectedSubcategory === sub.slug
                ? 'bg-[#4A647C] text-white font-medium'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            }`}
          >
            {subcategoryNames[sub.slug] || sub.name} ({sub.count})
          </Link>
        ))}
      </nav>
    </div>
  );
};
