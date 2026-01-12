import { ProductCard } from "./ProductCard";
import { CategoryTabs } from "./CategoryTabs";

// BedSmart Canada products
const products = [
  {
    name: "Max and Lily Twin Low Loft Bed with Curtain",
    rating: 4.5,
    reviews: 89,
    price: 455.00,
    originalPrice: 700.00,
    savings: 245,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
  },
  {
    name: "Mid-Century Modern Twin Over Full L-Shaped Bunk Bed",
    rating: 4.8,
    reviews: 156,
    price: 1090.90,
    originalPrice: 1375.00,
    savings: 284,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
  },
  {
    name: "Max and Lily Mid-Century Modern Full Bed",
    rating: 4.6,
    reviews: 72,
    price: 398.18,
    originalPrice: 558.98,
    savings: 161,
    image: "https://images.unsplash.com/photo-1540518614846-7eded433c457?w=400&h=400&fit=crop",
  },
  {
    name: "Max and Lily Solid Wood Play and Store Low Loft",
    rating: 4.7,
    reviews: 134,
    price: 780.00,
    originalPrice: 950.00,
    savings: 170,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
  },
];

export const ProductGrid = () => {
  return (
    <section className="py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <CategoryTabs />
        <div className="grid grid-cols-4 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};
