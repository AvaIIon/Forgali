import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { getProducts, getCategories } from "@/data/products";

// Helper to get proxied image URL
const getProxiedImage = (url: string): string => {
  if (!url || !url.startsWith('http')) return url;
  if (import.meta.env.DEV) {
    try {
      const urlObj = new URL(url);
      return `/api/images${urlObj.pathname}${urlObj.search}`;
    } catch {
      return url;
    }
  }
  return url;
};

export const SleepSolutions = () => {
  const [categories, setCategories] = useState<Array<{ name: string; count: number; image: string; href: string }>>([]);

  useEffect(() => {
    const updateCategories = () => {
      const cats = getCategories();
      const products = getProducts();
      
      const categoryData = cats
        .filter(cat => cat.slug !== "mattresses") // Remove mattresses
        .map(cat => {
          // Get a featured product image for each category
          let image = "";
          if (cat.slug === "bunk-beds") {
            const product = products.find(p => p.category === "bunk-beds");
            image = product?.image || "https://bedsmart.ca/wp-content/uploads/2022/06/2875.jpg";
          } else if (cat.slug === "loft-beds") {
            const product = products.find(p => p.category === "loft-beds");
            image = product?.image || "https://bedsmart.ca/wp-content/uploads/2024/05/uber-slam-ns__5-1024x1024.jpg";
          } else if (cat.slug === "single-beds") {
            const product = products.find(p => p.category === "single-beds");
            image = product?.image || "https://bedsmart.ca/wp-content/uploads/2016/11/2075_20001__3_900x.webp";
          } else if (cat.slug === "accessories") {
            const product = products.find(p => p.category === "accessories");
            image = product?.image || "https://bedsmart.ca/wp-content/uploads/2025/11/200006-002__2.jpg";
          }
          
          return {
            name: cat.name,
            count: cat.count,
            image,
            href: `/category/${cat.slug}`,
          };
        });
      
      setCategories(categoryData);
    };
    
    updateCategories();
    window.addEventListener("productsUpdated", updateCategories);
    return () => window.removeEventListener("productsUpdated", updateCategories);
  }, []);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-10">
          Sleep Solutions You've Been Searching For!
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.name} to={category.href} className="group cursor-pointer">
              <div className="aspect-[4/5] overflow-hidden rounded-lg mb-3">
                <img 
                  src={getProxiedImage(category.image)} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex items-center gap-2 justify-start">
                <span className="text-sm font-bold">{category.name}</span>
                <ArrowRight className="w-4 h-4 text-primary" />
              </div>
              <span className="text-xs text-muted-foreground">{category.count} Products</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
