import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryProductCard } from "@/components/CategoryProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";
import { Seo } from "@/components/Seo";
import type { ProductCategory } from "@/services/shopifyService";

// Section order mirrors the top nav: Dining · Living · Bedroom · Storage & Accessories.
const DEAL_SECTIONS: { id: string; label: string; href: string; categories: ProductCategory[] }[] = [
  { id: "dining", label: "Dining", href: "/category/dining", categories: ["dining"] },
  { id: "living", label: "Living", href: "/category/living", categories: ["living"] },
  { id: "bedroom", label: "Bedroom", href: "/category/bedroom", categories: ["bunk-beds", "loft-beds", "single-beds"] },
  {
    id: "storage-accessories",
    label: "Storage & Accessories",
    href: "/category/accessories",
    categories: ["accessories", "mattresses"],
  },
];

const discountPct = (p: { price: number; originalPrice?: number }) =>
  p.originalPrice ? ((p.originalPrice - p.price) / p.originalPrice) * 100 : 0;

const SmartDealsPage = () => {
  const { products: allProducts, loading, error } = useShopifyProducts();

  const sections = useMemo(() => {
    const onSale = allProducts.filter(p => p.originalPrice && p.originalPrice > p.price);
    return DEAL_SECTIONS.map(section => ({
      ...section,
      products: onSale
        .filter(p => section.categories.includes(p.category))
        // In-stock deals first (matching category pages), best discount first within each group
        .sort((a, b) => {
          if (a.availableForSale !== b.availableForSale) return a.availableForSale ? -1 : 1;
          return discountPct(b) - discountPct(a);
        }),
    })).filter(section => section.products.length > 0);
  }, [allProducts]);

  const totalDeals = sections.reduce((n, s) => n + s.products.length, 0);

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Smart Deals – Solid Wood Furniture on Sale | Forgali"
        description="Save on solid wood bunk beds, loft beds, and furniture for every room. Current markdowns with free Canada-wide shipping."
        path="/smart-deals"
      />
      <Header />

      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Smart Deals
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Save on solid wood furniture for every room — dining, living, bedroom, and storage.
            Limited-time markdowns with free Canada-wide shipping.
          </p>
        </div>
      </div>

      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader2 className="w-8 h-8 animate-spin text-[#4A647C]" />
              <p className="text-muted-foreground">Loading deals...</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-16">
              <p className="text-red-500 text-lg mb-2">Error loading products</p>
              <p className="text-muted-foreground">{error}</p>
            </div>
          )}

          {!loading && !error && sections.length > 0 && (
            <>
              {/* Quick jump to each room's deals */}
              {sections.length > 1 && (
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {sections.map(section => (
                    <a
                      key={section.id}
                      href={`#deals-${section.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium hover:border-[#4A647C] hover:text-[#4A647C] transition-colors"
                    >
                      {section.label}
                      <span className="text-xs text-muted-foreground">({section.products.length})</span>
                    </a>
                  ))}
                </div>
              )}

              <div className="space-y-14">
                {sections.map(section => (
                  <div key={section.id} id={`deals-${section.id}`} className="scroll-mt-24">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6 border-b border-border pb-3">
                      <h2 className="text-2xl font-bold text-foreground">
                        {section.label}
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          {section.products.length} {section.products.length === 1 ? "deal" : "deals"}
                        </span>
                      </h2>
                      <Link
                        to={section.href}
                        className="text-sm font-medium text-primary hover:underline whitespace-nowrap"
                      >
                        Shop all {section.label} →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {section.products.map(product => (
                        <CategoryProductCard key={product.id} product={product} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {!loading && !error && totalDeals === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products on sale at the moment.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SmartDealsPage;
