import { Link } from "react-router-dom";
import { ProductCard } from "./ProductCard";
import { getMattresses } from "@/data/products";

export const MattressesSection = () => {
  const mattresses = getMattresses().slice(0, 4); // Show top 4 mattresses

  if (mattresses.length === 0) {
    return null;
  }

  return (
    <section className="py-12 px-4 bg-gradient-to-b from-[#F8F9FA] to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Mattresses</h2>
            <p className="text-muted-foreground">Complete your bed setup with our premium foam mattresses</p>
          </div>
          <Link
            to="/category/accessories?subcategory=mattresses"
            className="text-[#4A647C] font-medium hover:underline"
          >
            View All Mattresses →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {mattresses.map((mattress) => (
            <Link key={mattress.id} to={`/product/${mattress.id}`}>
              <ProductCard
                name={mattress.name}
                rating={mattress.rating}
                reviews={mattress.reviews}
                price={mattress.price}
                originalPrice={mattress.originalPrice}
                savings={mattress.originalPrice ? Math.round(mattress.originalPrice - mattress.price) : 0}
                image={mattress.image}
                badge={mattress.badge}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
