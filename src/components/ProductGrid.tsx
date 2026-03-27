import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

export const ProductGrid = () => {
  const { products, loading } = useShopifyProducts();

  // Get featured products for landing page - first 4 products or those with sale badge
  const featuredProducts = products
    .slice(0, 8)
    .map(p => ({
      id: p.id,
      handle: p.handle,
      name: p.name,
      rating: p.rating,
      reviews: p.reviews,
      price: p.price,
      originalPrice: p.originalPrice,
      savings: p.originalPrice ? Math.round(p.originalPrice - p.price) : 0,
      image: p.image,
    }))
    .slice(0, 4);

  if (loading) {
    return (
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-[#4A647C]" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.handle}`}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
