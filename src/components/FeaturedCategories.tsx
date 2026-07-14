import { Link } from "react-router-dom";
import { getProxiedImage } from "@/lib/imageProxy";

const categories = [
  {
    name: "Bunk Beds",
    href: "/category/bunk-beds",
    image: "https://bedsmart.ca/wp-content/uploads/2024/09/cool_20ws__4.jpg",
  },
  {
    name: "Loft Beds",
    href: "/category/loft-beds",
    image: "https://bedsmart.ca/wp-content/uploads/2025/01/loft-with-desk.jpg",
  },
  {
    name: "Single Beds",
    href: "/category/single-beds",
    image: "https://bedsmart.ca/wp-content/uploads/2016/11/2075_20001__3_900x.webp",
  },
  {
    name: "Storage & Accessories",
    href: "/category/accessories",
    image: "https://bedsmart.ca/wp-content/uploads/2025/11/200006-002__2.jpg",
  },
  {
    name: "Dining",
    href: "/category/dining",
    image: "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/3400388400-155__1.jpg?v=1783608444",
  },
  {
    name: "Living",
    href: "/category/living",
    image: "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2600567600-016__1.jpg?v=1783608423",
  },
];

export const FeaturedCategories = () => {
  return (
    <section className="py-16 px-4 bg-[#f2f4f6]/30">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.name} 
              to={category.href}
              className="group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#f2f4f6]">
                <img 
                  src={getProxiedImage(category.image)} 
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
