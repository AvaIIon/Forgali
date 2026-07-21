import { Link } from "react-router-dom";
import { getProxiedImage } from "@/lib/imageProxy";

// Using a high-quality bunk bed image from the product catalog
const heroImage = "https://bedsmart.ca/wp-content/uploads/2024/09/cool_20ws__4.jpg";

export const Hero = () => {
  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden">
      <img
        src={getProxiedImage(heroImage)}
        alt="Premium Solid Wood Bunk Beds"
        className="w-full h-full object-cover"
        // LCP image: hint the browser to fetch it first. Set via ref because
        // React 18 doesn't recognize the fetchPriority prop.
        ref={(el) => el?.setAttribute("fetchpriority", "high")}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
      <div className="absolute bottom-16 left-8 md:left-16 max-w-xl">
        <span className="inline-block bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded mb-2">
          SOLID WOOD FOR EVERY ROOM
        </span>
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
          Solid Wood Furniture Families Trust, from Bedroom to Dining Room
        </h2>
        <p className="text-white/90 text-base md:text-lg mb-6 [text-shadow:0_1px_8px_rgba(0,0,0,0.5)]">
          Solid-wood dining, living, and kids&rsquo; bedroom pieces — free
          shipping across Canada.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/category/dining"
            className="bg-foreground text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
          >
            Shop Dining &amp; Living
          </Link>
          <Link
            to="/category/bedroom"
            className="bg-[#f2f4f6] text-foreground px-6 py-2.5 rounded-full text-sm font-medium border border-foreground hover:bg-[#e8eaed] transition-colors"
          >
            Shop Kids&rsquo; Beds
          </Link>
        </div>
      </div>
    </section>
  );
};
