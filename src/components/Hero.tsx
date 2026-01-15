import { Link } from "react-router-dom";

// Using a high-quality bunk bed image from the product catalog
const heroImage = "https://bedsmart.ca/wp-content/uploads/2024/09/cool_20ws__4.jpg";

export const Hero = () => {
  return (
    <section className="relative w-full h-[500px] overflow-hidden">
      <img 
        src={heroImage} 
        alt="Premium Solid Wood Bunk Beds" 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      <div className="absolute bottom-16 left-8 md:left-16 max-w-xl">
        <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded mb-2">
          TRANSFORM THEIR ROOM
        </span>
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-6">
          Solid Wood Beds Parents Trust, and Kids Love
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link 
            to="/category/bunk-beds" 
            className="bg-white text-foreground px-6 py-2.5 rounded-full text-sm font-medium border border-foreground hover:bg-gray-100 transition-colors"
          >
            Shop Bunk Beds
          </Link>
          <Link 
            to="/category/loft-beds" 
            className="bg-foreground text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Shop Loft Beds
          </Link>
        </div>
      </div>
    </section>
  );
};
