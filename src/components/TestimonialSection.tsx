import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Star, Loader2 } from "lucide-react";
import { useShopifyProducts } from "@/hooks/useShopifyProducts";

export const TestimonialSection = () => {
  const { products, loading } = useShopifyProducts();

  // Find a bestseller product, or use the first product with highest rating
  const bestseller = useMemo(() => {
    if (products.length === 0) return null;
    const best = products.find(p => p.badge === "bestseller") || 
                 products.sort((a, b) => (b.rating * b.reviews) - (a.rating * a.reviews))[0];
    return best || null;
  }, [products]);

  if (loading) {
    return (
      <section className="bg-[#f2f4f6] py-16 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-[#4A647C]" />
        </div>
      </section>
    );
  }

  if (!bestseller) return null;

  return (
    <section className="bg-[#f2f4f6] py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-12">Best Selling Products</h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Testimonial card */}
          <div className="flex-1 bg-background rounded-xl p-8 shadow-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-primary text-primary" />
              ))}
            </div>
            <h3 className="text-lg font-bold mb-3">Amazing quality bunk bed!</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              "We purchased this bed for our kids and it exceeded all expectations! 
              The solid wood construction is incredibly sturdy and the assembly was straightforward. 
              Our kids absolutely love it. Highly recommend!"
            </p>
            <p className="text-sm text-muted-foreground mb-6">- Sarah M.</p>
            
            <div className="border-t pt-6">
              <p className="font-medium text-sm mb-1">
                {bestseller.name}
              </p>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#4A647C] font-bold">${bestseller.price.toLocaleString()}</span>
                {bestseller.originalPrice && (
                  <span className="text-muted-foreground line-through text-sm">${bestseller.originalPrice.toLocaleString()}</span>
                )}
              </div>
              <Link to={`/product/${bestseller.handle}`}>
                <button className="border border-foreground rounded-full px-6 py-2 text-sm font-medium hover:bg-foreground hover:text-background transition-colors">
                  shop now
                </button>
              </Link>
            </div>
          </div>
          
          {/* Product image */}
          <div className="flex-1">
            <img 
              src={bestseller.image} 
              alt={bestseller.name} 
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
