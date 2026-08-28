import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { PLANK_AND_BEAM_SEO } from "@/lib/plankAndBeamSeo";
import { Truck, RotateCcw, TreePine } from "lucide-react";

// Brand hub targeting the head term "plank and beam furniture canada" — the
// wide-open lane (no Canadian retailer ranks). NOTE: the US brand site DOES
// ship to Canada (FedEx, $50–$225 per plankandbeam.com/pages/shipping-policy);
// what it withholds is free shipping and Canadian returns ("unable to accept
// returns for Canada"). Never claim they don't ship here. Also acts as an
// internal-link hub so Google can discover the P&B dining/living pages.
// All facts grounded in the live catalog.

const DINING_LINKS = [
  { name: "Dining Tables", href: "/category/dining?subcategory=dining-tables" },
  { name: "Dining Chairs", href: "/category/dining?subcategory=dining-chairs" },
  { name: "Dining Benches", href: "/category/dining?subcategory=dining-benches" },
  { name: "Bar & Counter Stools", href: "/category/dining?subcategory=bar-counter-chairs" },
  { name: "Dining Sets", href: "/category/dining?subcategory=dining-sets" },
];
const LIVING_LINKS = [
  { name: "Coffee Tables", href: "/category/living?subcategory=coffee-tables" },
  { name: "Console Tables", href: "/category/living?subcategory=console-tables" },
  { name: "Side Tables", href: "/category/living?subcategory=side-tables" },
  { name: "Sideboards", href: "/category/living?subcategory=sideboards" },
  { name: "TV Stands", href: "/category/living?subcategory=tv-stands" },
  { name: "Mantel Shelves", href: "/category/living?subcategory=shelves" },
  { name: "Entryway Benches", href: "/category/living?subcategory=entryway" },
];

const PlankAndBeamPage = () => {
  // Title/description/JSON-LD live in @/lib/plankAndBeamSeo — shared with
  // middleware.ts so the initial-HTML head matches what this page renders.
  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={PLANK_AND_BEAM_SEO.title}
        description={PLANK_AND_BEAM_SEO.description}
        path="/plank-and-beam"
        jsonLd={PLANK_AND_BEAM_SEO.jsonLd}
      />
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <img
          src="https://cdn.shopify.com/s/files/1/0972/6492/6995/files/3400388400-155__1.jpg?v=1783608444"
          alt="Plank & Beam solid wood dining table and chairs"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent" />
        <div className="relative max-w-rail mx-auto px-4 py-24 md:py-32">
          <div className="max-w-xl text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.55)]">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Plank &amp; Beam Furniture, in Canada
            </h1>
            <p className="text-lg mt-4 text-white/90">
              Solid wood dining and living furniture — now easy to buy at home.
              Free Canada-wide shipping, prices in CAD, and returns handled
              right here.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/category/dining"
                className="bg-brand-tint text-foreground hover:bg-brand-tint-hover px-6 py-3 rounded-full text-sm font-semibold"
              >
                Shop Dining
              </Link>
              <Link
                to="/category/living"
                className="bg-white/15 text-white ring-1 ring-white/40 hover:bg-white/25 px-6 py-3 rounded-full text-sm font-semibold"
              >
                Shop Living
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why buy from Forgali */}
      <section className="max-w-rail mx-auto px-4 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: Truck, title: "Free Canada-Wide Shipping", body: "Every order ships free across Canada, with pricing in CAD and no surprise duties or brokerage." },
            { icon: RotateCcw, title: "Local 30-Day Returns", body: "Returns are handled here in Canada within 30 days — no cross-border hassle." },
            { icon: TreePine, title: "Solid Wood", body: "Real solid wood dining and living pieces built to live with for years, not particleboard." },
          ].map((f) => (
            <div key={f.title} className="bg-brand-tint rounded-lg p-6">
              <f.icon className="w-8 h-8 text-brand mb-3" />
              <h3 className="font-bold mb-1">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Intro copy */}
      <section className="border-t border-border bg-secondary/20 py-14 px-4">
        <div className="max-w-3xl mx-auto space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl font-bold text-brand">About Plank &amp; Beam</h2>
          <p>
            Plank &amp; Beam is a solid wood furniture brand known for clean,
            timeless dining and living pieces — the kind that anchor a room and
            hold up to everyday life. Buying it from the brand's own US site
            means FedEx charges of $50 to $225 to cross the border, and no way
            to send anything back: their returns policy excludes Canada. At
            Forgali we carry the collection for Canadian shoppers, with prices in
            CAD, free shipping nationwide, and returns handled locally.
          </p>
          <p>
            Our Plank &amp; Beam range spans 164 pieces across dining and living,
            starting from $140. On the dining side you'll find tables in round,
            oval and rectangular shapes, matching chairs and benches, counter and
            bar stools, and complete dining sets — across collections like Camden,
            Verso, Lido and Classic. For the living room, there are coffee tables,
            console and side tables, and sideboards from lines such as Arcata,
            Forma and Modern.
          </p>
          <p>
            Most pieces come in a wide range of finishes — from Black, Blonde and
            Coastal White to warm Pecan and Walnut, plus wirebrushed and rustic
            options — so it's easy to build a look that carries from the dining
            table through to the living room. Browse by room below, and every
            order ships free across Canada with 30-day returns.
          </p>
        </div>
      </section>

      {/* Shop by room — internal link hub */}
      <section className="max-w-rail mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-bold">Plank &amp; Beam Dining</h2>
              <Link to="/category/dining" className="text-sm font-medium text-brand-accent hover:underline">
                Shop all →
              </Link>
            </div>
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4">
              <img
                src="https://cdn.shopify.com/s/files/1/0972/6492/6995/files/3400388400-155__1.jpg?v=1783608444"
                alt="Plank & Beam dining furniture"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <ul className="flex flex-wrap gap-2">
              {DINING_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="inline-block text-sm px-3 py-1.5 rounded-full bg-brand-tint hover:bg-brand-tint-hover transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="text-2xl font-bold">Plank &amp; Beam Living</h2>
              <Link to="/category/living" className="text-sm font-medium text-brand-accent hover:underline">
                Shop all →
              </Link>
            </div>
            <div className="aspect-[16/9] rounded-xl overflow-hidden mb-4">
              <img
                src="https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2600567600-016__1.jpg?v=1783608423"
                alt="Plank & Beam living room furniture"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <ul className="flex flex-wrap gap-2">
              {LIVING_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="inline-block text-sm px-3 py-1.5 rounded-full bg-brand-tint hover:bg-brand-tint-hover transition-colors"
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlankAndBeamPage;
