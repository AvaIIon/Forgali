import { Link, useParams, useSearchParams } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import { subcategoryName, type MessageKey } from "@/i18n/messages";
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
  const { t, locale } = useLocale();
  const selectedSubcategory = searchParams.get('subcategory');

  if (!category) return null;

  // "bedroom" aggregates the bed categories — its tabs link to real category
  // pages instead of ?subcategory filters.
  if (category === 'bedroom') {
    const bedCategories: Array<{ href: string; name: MessageKey }> = [
      { href: '/category/bunk-beds', name: 'nav.bunkBeds' },
      { href: '/category/loft-beds', name: 'nav.loftBeds' },
      { href: '/category/single-beds', name: 'nav.singleBeds' },
    ];
    return (
      <div className="border-b border-border bg-background sticky top-0 z-30">
        <div className="max-w-rail mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            <Link
              to="/category/bedroom"
              className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-brand text-white"
            >
              {t("tabs.shopAllBedroom")}
            </Link>
            {bedCategories.map((sub) => (
              <Link
                key={sub.href}
                to={sub.href}
                className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors bg-brand-tint text-foreground hover:bg-brand-tint-hover"
              >
                {t(sub.name)}
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
              {t("tabs.shopAllMattresses")}
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
            {t("tabs.shopAll")}
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
              {subcategoryName(locale, sub.slug, sub.name)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
