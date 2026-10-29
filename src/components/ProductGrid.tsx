import { Link } from "@/i18n/router";
import { useLocale } from "@/i18n/LocaleContext";
import { Loader2 } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useFeaturedProducts } from "@/hooks/useShopifyProducts";

export const ProductGrid = () => {
  const { t } = useLocale();
  // Shopify's real BEST_SELLING ordering (in-stock only). The old grid ranked
  // by fabricated hash-derived ratings under a "Best Sellers" heading.
  const { products, loading, error } = useFeaturedProducts(8);

  if (loading) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-rail mx-auto flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-brand" />
        </div>
      </section>
    );
  }

  if (error || products.length === 0) {
    // Never render the heading over an empty grid — offer a way forward.
    return (
      <section className="py-16 px-4">
        <div className="max-w-rail mx-auto text-center space-y-3">
          <h2 className="text-3xl font-bold">{t("home.featured")}</h2>
          <p className="text-muted-foreground">
            {t("home.loadError")}{" "}
            <Link to="/category/dining" className="text-brand-accent hover:underline">
              {t("home.browseDining")}
            </Link>
            {t("home.loadErrorTail")}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-rail mx-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-10">
          <h2 className="text-3xl font-bold">{t("home.featured")}</h2>
          <Link to="/category/dining" className="text-sm font-medium text-brand-accent hover:underline whitespace-nowrap">
            {t("home.shopAll")}
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/product/${product.handle}`}>
              <ProductCard
                name={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                fromPrice={product.fromPrice}
                image={product.image}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
