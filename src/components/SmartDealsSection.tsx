import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { getProducts, Product } from "@/data/products";

export const SmartDealsSection = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const updateProducts = () => {
      setProducts(getProducts());
    };
    updateProducts();
    window.addEventListener("productsUpdated", updateProducts);
    return () => window.removeEventListener("productsUpdated", updateProducts);
  }, []);

  // Get products on sale (with originalPrice) sorted by discount percentage
  const deals = products
    .filter(product => product.originalPrice && product.originalPrice > product.price)
    .sort((a, b) => {
      const discountA = ((a.originalPrice! - a.price) / a.originalPrice!) * 100;
      const discountB = ((b.originalPrice! - b.price) / b.originalPrice!) * 100;
      return discountB - discountA; // Sort by highest discount first
    })
    .slice(0, 4); // Show top 4 deals

  if (deals.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-[#F8F9FA] to-[#f2f4f6]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Smart Deals</h2>
            <p className="text-muted-foreground">Save big on select beds and accessories</p>
          </div>
          <Link
            to="/"
            className="text-[#4A647C] font-medium hover:underline"
          >
            View All Deals →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {deals.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard
                name={product.name}
                rating={product.rating}
                reviews={product.reviews}
                price={product.price}
                originalPrice={product.originalPrice}
                savings={product.originalPrice ? Math.round(product.originalPrice - product.price) : 0}
                image={product.image}
                badge="sale"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
