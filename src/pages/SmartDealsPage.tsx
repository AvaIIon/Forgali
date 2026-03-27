import { useMemo } from "react";
import { Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryProductCard } from "@/components/CategoryProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

const SmartDealsPage = () => {
  const { products: allProducts, loading, error } = useShopifyProducts();

  // Filter and sort sale products
  const saleProducts = useMemo(() => {
    // Filter products that are on sale (have originalPrice)
    const onSale = allProducts.filter(
      p => p.originalPrice && p.originalPrice > p.price
    );
    // Sort by discount percentage (highest first)
    return onSale.sort((a, b) => {
      const discountA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
      const discountB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
      return discountB - discountA;
    });
  }, [allProducts]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Smart Deals
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            Save big on select beds and accessories. Limited time offers on our best-selling products.
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
          
          {!loading && !error && saleProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {saleProducts.map((product) => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          {!loading && !error && saleProducts.length === 0 && (
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
