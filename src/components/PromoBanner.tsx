import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const PromoBanner = () => {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <img
        src="https://cdn.shopify.com/s/files/1/0972/6492/6995/files/c299f4ad-solid-wood-max-and-lily-twin-over-full-bunk-bed-with-trundle-in-white.webp?v=1773961851"
        alt="Solid wood bunk bed in a styled bedroom"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
      <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
        <div className="max-w-lg text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary bg-white/90 px-3 py-1 rounded-full [text-shadow:none]">
            Solid Wood Savings
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            Up to 30% Off Select Furniture
          </h2>
          <p className="text-lg mt-4 text-white/90">
            From bunk beds to dining tables — solid wood craftsmanship for every
            room, built to last for generations.
          </p>
          <div className="mt-6">
            <Button size="lg" asChild className="bg-[#f2f4f6] text-foreground hover:bg-[#e8eaed]">
              <Link to="/smart-deals">Shop Sale</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
