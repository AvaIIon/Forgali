import { Link, useParams, useSearchParams } from "react-router-dom";
import { ConvertedProduct } from "@/services/shopifyService";
import { categorySubcategories, productMatchesSubcategory } from "@/lib/subcategories";

interface SubcategoryTabsProps {
  // When provided, tabs matching zero products are hidden — several matchers
  // used to render permanently-empty tabs ("Quad & Triple", bunk "With Slide")
  // that stranded shoppers on "No products found".
  products?: ConvertedProduct[];
}

export const SubcategoryTabs = ({ products }: SubcategoryTabsProps) => {
  const { category } = useParams<{ category: string }>();
  const [searchParams] = useSearchParams();
  const selectedSubcategory = searchParams.get('subcategory');

  if (!category) return null;

  // "bedroom" aggregates the bed categories — its tabs link to real category
  // pages instead of ?subcategory filters.
  if (category === 'bedroom') {
    const bedCategories = [
      { href: '/category/bunk-beds', name: 'Bunk Beds' },
      { href: '/category/loft-beds', name: 'Loft Beds' },
      { href: '/category/single-beds', name: 'Single Beds' },
    ];
    return (
      <div className="border-b border-border bg-background sticky top-0 z-30">
        <div className="max-w-rail mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Link
              to="/category/bedroom"
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-brand text-white"
            >
              Shop All Bedroom
            </Link>
            {bedCategories.map((sub) => (
              <Link
                key={sub.href}
                to={sub.href}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-brand-tint text-foreground hover:bg-brand-tint-hover"
              >
                {sub.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Special handling for mattresses
  if (category === 'mattresses') {
    return (
      <div className="border-b border-border bg-background">
        <div className="max-w-rail mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4">
            <Link
              to={`/category/${category}`}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                !selectedSubcategory
                  ? 'bg-brand text-white'
                  : 'bg-brand-tint text-foreground hover:bg-brand-tint-hover'
              }`}
            >
              Shop All Mattresses
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  const subcategories = (categorySubcategories[category] || []).filter(sub =>
    !products || products.length === 0 || products.some(p => productMatchesSubcategory(p, sub.slug))
  );

  return (
    <div className="border-b border-border bg-background sticky top-0 z-30">
      <div className="max-w-rail mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
          <Link
            to={`/category/${category}`}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              !selectedSubcategory
                ? 'bg-brand text-white'
                : 'bg-brand-tint text-foreground hover:bg-brand-tint-hover'
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
                  ? 'bg-brand text-white'
                  : 'bg-brand-tint text-foreground hover:bg-brand-tint-hover'
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
