import { ProductCard } from "./ProductCard";
import { CategoryTabs } from "./CategoryTabs";

// Using placeholder images since we don't have the actual product images
const products = [
  {
    name: "Hamptons Mansion & Pool House Dollhouse",
    rating: 4.4,
    reviews: 186,
    price: 199.99,
    originalPrice: 229.99,
    savings: 30,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  },
  {
    name: "Adventure Bend Swing Set - Installation Available",
    rating: 4.0,
    reviews: 105,
    price: 1999.99,
    originalPrice: 2699.99,
    savings: 700,
    image: "https://images.unsplash.com/photo-1564429238533-0637432b3ae3?w=400&h=400&fit=crop",
  },
  {
    name: "Secret Reveal Wooden Mansion Dollhouse",
    rating: 4.0,
    reviews: 7,
    price: 239.99,
    originalPrice: 299.99,
    savings: 60,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
  },
  {
    name: "Ridgemoor Perch Swing Set - Installation Available",
    rating: 4.2,
    reviews: 117,
    price: 1299.99,
    originalPrice: 1599.99,
    savings: 300,
    image: "https://images.unsplash.com/photo-1564429238533-0637432b3ae3?w=400&h=400&fit=crop",
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
