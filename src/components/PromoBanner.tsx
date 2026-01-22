import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getProxiedImage } from "@/lib/imageProxy";

export const PromoBanner = () => {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <img 
        src={getProxiedImage("https://bedsmart.ca/wp-content/uploads/2022/06/max-and-lily-twin-over-twin-bunk-bed-with-trundle-in-natural.jpg")}
        alt="Sale Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="max-w-lg text-white">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary bg-white/90 px-3 py-1 rounded-full">
            Limited Time Offer
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            Up to 30% Off Select Beds
          </h2>
          <p className="text-lg mt-4 text-white/90">
            Make their room dreams come true with our solid wood beds. 
            Quality craftsmanship that lasts for generations.
          </p>
          <div className="flex gap-4 mt-6">
            <Link to="/category/bunk-beds">
              <Button size="lg" className="bg-[#f2f4f6] text-foreground hover:bg-[#f2f4f6]/90">
                Shop Sale
              </Button>
            </Link>
            <Link to="/category/bunk-beds">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Shop Best Sellers
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
