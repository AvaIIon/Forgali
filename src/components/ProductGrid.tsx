import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { getProducts, Product } from "@/data/products";

export const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const updateProducts = () => {
      setProducts(getProducts());
    };
    updateProducts();
    window.addEventListener("productsUpdated", updateProducts);
    return () => window.removeEventListener("productsUpdated", updateProducts);
  }, []);

  // Get featured products for landing page - mix of bestsellers and sale items
  const featuredProducts = products
    .filter(p => p.badge === "bestseller" || p.badge === "sale")
    .slice(0, 4)
    .map(p => ({
      id: p.id,
      name: p.name,
      rating: p.rating,
      reviews: p.reviews,
      price: p.price,
      originalPrice: p.originalPrice,
      savings: p.originalPrice ? Math.round(p.originalPrice - p.price) : 0,
      image: p.image,
    }));
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
