import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CategoryProductCard } from "@/components/CategoryProductCard";
import { getProducts, Product } from "@/data/products";

const SmartDealsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const updateProducts = () => {
      const allProducts = getProducts();
      // Filter products that are on sale (have originalPrice and badge === "sale")
      const saleProducts = allProducts.filter(
        p => p.badge === "sale" && p.originalPrice && p.originalPrice > p.price
      );
      // Sort by discount percentage (highest first)
      saleProducts.sort((a, b) => {
        const discountA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
        const discountB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
        return discountB - discountA;
      });
      setProducts(saleProducts);
    };
    
    updateProducts();
    window.addEventListener("productsUpdated", updateProducts);
    return () => window.removeEventListener("productsUpdated", updateProducts);
  }, []);

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
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <CategoryProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
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
