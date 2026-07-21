import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

export const ProductGrid = () => {
  const { products, loading } = useShopifyProducts();

  // Best Sellers close for the landing page — in-stock only, so we never
  // spotlight an unbuyable "best seller" (dev change list item 9). Sort a COPY
  // ([...products]) — the old TestimonialSection sorted the shared cache in
  // place, which made two homepage sections show the same product.
  const featuredProducts = [...products]
    .filter(p => p.availableForSale)
    .sort((a, b) => b.rating * b.reviews - a.rating * a.reviews)
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
    }));

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
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-baseline justify-between gap-2 mb-10">
          <h2 className="text-3xl font-bold">Best Sellers</h2>
          <Link to="/category/dining" className="text-sm font-medium text-primary hover:underline whitespace-nowrap">
            Shop All →
          </Link>
        </div>
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
