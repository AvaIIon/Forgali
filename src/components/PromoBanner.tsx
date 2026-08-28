import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Every active dining piece carries a compare-at price (verified Aug 4 via the
// Admin API: 100/100 on sale), so "every dining piece is on sale" is a claim
// the catalog actually backs. Deepest dining markdown is ~11% — don't quote
// "up to 30%" here; that figure comes from the bed lines.
const BANNER_IMG =
  "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2872mc1008-150__1.jpg";

export const PromoBanner = () => {
  return (
    <section className="relative h-[440px] md:h-[500px] overflow-hidden">
      <picture>
        {/* Square source for phones; server-side wide crop for desktop so we
            don't ship a 2000x2000 image into a 500px-tall strip */}
        <source media="(max-width: 767px)" srcSet={`${BANNER_IMG}?width=900`} />
        <img
          src={`${BANNER_IMG}?width=2400&height=1000&crop=center`}
          alt="Plank & Beam solid wood dining set — natural oak table with walnut chairs in a sunlit dining room"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </picture>
      {/* Warm walnut gradient (not black) keeps the sunlit room vibrant while
          carrying white text on the left */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#33210f]/85 via-[#33210f]/45 to-transparent" />
      <div className="relative h-full max-w-rail mx-auto px-4 flex items-center">
        <div className="max-w-lg text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.45)]">
          <span className="text-sm font-semibold uppercase tracking-wider text-[#33210f] bg-amber-400 px-3 py-1 rounded-full [text-shadow:none]">
            Dining Event
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
            <span className="text-amber-300">Every</span> Dining Piece Is On
            Sale
          </h2>
          <p className="text-lg mt-4 text-white/90">
            Solid wood tables, chairs and benches from $169 — built to stand up
            to Sunday dinners for generations. Free Canada-wide shipping.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              asChild
              className="bg-amber-400 text-[#33210f] font-semibold hover:bg-amber-300"
            >
              <Link to="/smart-deals?room=dining">Shop Dining Deals</Link>
            </Button>
            <Link
              to="/category/dining"
              className="text-sm font-medium text-white underline underline-offset-4 hover:text-amber-200"
            >
              Browse all dining &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
