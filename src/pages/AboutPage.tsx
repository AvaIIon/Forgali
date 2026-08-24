import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GuaranteeStrip } from "@/components/GuaranteeStrip";
import { Seo } from "@/components/Seo";
import { seoProps } from "@/lib/staticPageSeo";
import {
  TreePine,
  ShieldCheck,
  Weight,
  Bolt,
  Ruler,
  Leaf,
  Truck,
  PackageCheck,
  Wrench,
  RotateCcw,
  BadgeCheck,
  Mail,
  ArrowRight,
} from "lucide-react";

// The About page is where both shoppers and AI answer engines go to decide what
// this company actually is — it was three short paragraphs and linked nowhere.
// Every number and claim below is grounded in the live catalog
// (src/data/product-meta.json) or in the policy pages it links to; nothing here
// invents a founding date, a team size, or a certification we can't point at.

const WHAT_WE_CARRY = [
  {
    title: "Kids' & Family Beds",
    body:
      "Roughly 100 bunk and loft configurations — twin over twin right up to queen over queen, L-shaped, with stairs, trundles, desks, slides or under-bed drawers — plus platform beds in twin, full and queen.",
    href: "/category/bunk-beds",
    cta: "Shop bunk beds",
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/4cd2a236-190201-182__1.jpg?v=1773961974",
    alt: "Solid wood Modern Farmhouse twin over twin bunk bed",
  },
  {
    title: "Plank & Beam Dining & Living",
    body:
      "164 pieces from the Plank & Beam collection — dining tables, chairs, benches, bar and counter stools, coffee and console tables, sideboards and TV stands — priced in CAD with no border charges.",
    href: "/plank-and-beam",
    cta: "Explore Plank & Beam",
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/3400388400-155__1.jpg?v=1783608444",
    alt: "Plank & Beam solid wood dining table and chairs",
  },
  {
    title: "Storage & Finishing Pieces",
    body:
      "Dressers and night stands in matching finishes, under-bed storage drawers, add-on guard rails, desks and low-profile mattresses sized for bunk and loft clearances — so a room gets finished properly instead of assembled from four different stores.",
    href: "/category/accessories",
    cta: "Shop storage & accessories",
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/d46c26e8-max-and-lily-full-over-full-bunk-bed-with-storage-in-white.jpg?v=1773961859",
    alt: "Solid wood full over full bunk bed with under-bed storage drawers",
  },
];

const BUILD_SPECS = [
  {
    icon: TreePine,
    title: "Solid New Zealand Pine",
    body:
      "Knot-free solid pine frames, not particleboard or veneer over MDF. It's the reason the boxes are heavy and the reason the bed is still standing when it gets handed down.",
  },
  {
    icon: Leaf,
    title: "Low-VOC, GREENGUARD Gold Finishes",
    body:
      "Durable, non-toxic finishes. Many of the beds we carry are GREENGUARD Gold certified — independently tested for low chemical emissions in indoor air.",
  },
  {
    icon: Weight,
    title: "400 lb Per Bed",
    body:
      "Most of our bunks and lofts are rated to 400 lb per sleeping surface, on solid pine slats with a metal centre support bar. They hold toddlers, teenagers, and the parent reading at bedtime.",
  },
  {
    icon: Bolt,
    title: "Metal-on-Metal Connections",
    body:
      "Structural joints are metal into metal rather than screws biting into wood, so they don't work loose and start creaking after a year of climbing.",
  },
  {
    icon: ShieldCheck,
    title: "Guardrails & Safety Standards",
    body:
      "Children's beds are manufactured and tested to applicable children's furniture safety standards, and elevated beds ship with guardrails designed to standard spacing.",
  },
  {
    icon: Ruler,
    title: "Beds That Change With the Room",
    body:
      "Most bunks separate into two standalone beds, and many lofts take a desk, a curtain or drawers underneath — one purchase that survives more than one phase of childhood.",
  },
];

const HOW_IT_WORKS = [
  {
    icon: Truck,
    title: "Free shipping, anywhere in Canada",
    body:
      "Every order ships free to any Canadian address — no minimum, no surprise total at checkout, prices in CAD with no duties or brokerage fees.",
    link: { to: "/shipping", label: "Shipping details" },
  },
  {
    icon: PackageCheck,
    title: "Tracked from our door to yours",
    body:
      "Most orders are prepared within about a week, with delivery typically 12–18 business days in total. You get a tracking number by email the moment it ships.",
    link: { to: "/shipping", label: "Processing & delivery times" },
  },
  {
    icon: Wrench,
    title: "Assembly you can actually finish",
    body:
      "Beds arrive flat-packed with step-by-step instructions and all hardware included. Most go together in one to two hours with basic tools and a second pair of hands.",
    link: { to: "/assembly", label: "Assembly guide" },
  },
  {
    icon: RotateCcw,
    title: "30 days to change your mind",
    body:
      "Return new, unused, unassembled items within 30 days. If something arrives damaged, defective or wrong, we cover the return shipping and waive the restocking fee.",
    link: { to: "/returns", label: "Returns & cancellations" },
  },
  {
    icon: BadgeCheck,
    title: "Five years of warranty behind it",
    body:
      "A 5-year limited warranty against defects in materials and workmanship, and replacement parts — a bolt bag, a slat, a panel — sent out on request.",
    link: { to: "/warranty", label: "Warranty coverage" },
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Seo
        {...seoProps("/about")}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          "@id": "https://www.forgali.com/about#webpage",
          url: "https://www.forgali.com/about",
          name: "About Forgali",
          description:
            "Forgali is an online-only Canadian retailer of solid wood kids' beds and Plank & Beam dining and living furniture, shipping free across Canada.",
          isPartOf: { "@id": "https://www.forgali.com/#website" },
          // References the Organization declared once in index.html rather than
          // redeclaring it — same @id, so the graph merges instead of conflicting.
          about: { "@id": "https://www.forgali.com/#organization" },
        }}
      />
      <Header />

      <div className="bg-gradient-to-b from-[#f2f4f6] to-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About Forgali
          </h1>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto">
            An online-only Canadian furniture store. Solid wood beds, dining and
            living pieces — over 300 of them — shipped free to your door, from
            Victoria to St. John's.
          </p>
        </div>
      </div>

      <GuaranteeStrip />

      {/* Our Story */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Forgali started in furniture the long way around — as{" "}
                <strong className="text-foreground font-semibold">
                  Forgali Design Centre
                </strong>
                , a custom-furniture showroom in the Greater Toronto Area. Years
                of building rooms for families taught us the same lesson over and
                over: the pieces people regret are almost never the ones made of
                real wood.
              </p>
              <p>
                So we closed the showroom and rebuilt the business online. No
                floor space to pay for, no commissioned salesperson steering you
                toward this week's overstock — just a catalogue we've curated
                ourselves, priced in Canadian dollars, delivered free anywhere in
                the country.
              </p>
              <p>
                That last part matters more than it should. A lot of the solid
                wood furniture Canadians want is easy to find and painful to
                actually buy here — cross-border shipping fees, brokerage
                surprises, and return policies that quietly exclude Canada. We
                carry those pieces domestically so the price you see is the price
                you pay, and so a return is an email rather than an international
                shipping problem.
              </p>
            </div>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-[#f2f4f6]">
            <img
              src="https://cdn.shopify.com/s/files/1/0972/6492/6995/files/62468465-180427-002__1.jpg?v=1773962209"
              alt="Solid wood twin high loft bed with desk in a child's room"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* What We Carry */}
      <section className="border-y border-border bg-[#f2f4f6]/60 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl font-bold mb-3">What We Carry</h2>
            <p className="text-muted-foreground leading-relaxed">
              Two rooms, done properly, instead of a little of everything. Beds
              that grow with a child, and dining and living furniture built to the
              same standard.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {WHAT_WE_CARRY.map((c) => (
              <div
                key={c.title}
                className="flex flex-col overflow-hidden rounded-xl bg-background border border-border"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#f2f4f6]">
                  <img
                    src={c.image}
                    alt={c.alt}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-bold mb-2">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                    {c.body}
                  </p>
                  <Link
                    to={c.href}
                    className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#4A647C] hover:underline"
                  >
                    {c.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Build quality */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl font-bold mb-3">
              What &ldquo;Solid Wood&rdquo; Means Here
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Plenty of furniture is described as solid wood. These are the
              specifications behind ours — the things you'd want to know before
              putting a child on the top bunk.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {BUILD_SPECS.map((s) => (
              <div key={s.title} className="rounded-lg bg-[#f2f4f6] p-6">
                <s.icon className="w-8 h-8 text-[#4A647C] mb-3" />
                <h3 className="font-bold mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            More on guardrails, mattress sizing and safe setup on our{" "}
            <Link
              to="/safety-standards"
              className="text-primary hover:underline font-medium"
            >
              Safety Standards
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      {/* How buying from us works */}
      <section className="border-t border-border bg-secondary/20 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-3">How Buying From Us Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              No memberships, no delivery surcharges, no fine-print games. Here's
              the whole thing, start to finish.
            </p>
          </div>
          <ol className="space-y-6">
            {HOW_IT_WORKS.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#4A647C]/10">
                  <step.icon className="h-6 w-6 text-[#4A647C]" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">
                    <span className="text-muted-foreground/60 mr-2">
                      {i + 1}.
                    </span>
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.body}
                  </p>
                  <Link
                    to={step.link.to}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#4A647C] hover:underline"
                  >
                    {step.link.label}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Where we are / how to reach us */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-3">Where to Find Us</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Forgali is a 100% online store. We don't run a retail showroom or a
            phone line — that's a deliberate choice, and it's part of why the
            shipping is free and the prices are what they are. Everything goes
            through one inbox, and a person answers it.
          </p>

          <div className="rounded-lg bg-[#f2f4f6] p-6 mb-6">
            <Mail className="w-8 h-8 text-[#4A647C] mb-3" />
            <h3 className="font-bold text-lg mb-1">
              <a
                href="mailto:daniel@forgali.com"
                className="text-primary hover:underline"
              >
                daniel@forgali.com
              </a>
            </h3>
            <p className="text-sm text-muted-foreground">
              We respond within 24 hours, Monday to Friday, 9:00 AM – 5:00 PM ET.
              Include your order number if you have one.{" "}
              <Link to="/contact" className="text-primary hover:underline">
                Send us a message →
              </Link>
            </p>
          </div>

          {/* Legacy directory listings still surface the closed Design Centre
              showroom and dead phone numbers in AI answers and local search.
              Stating it plainly here, on the page those systems read first,
              matches /contact, /faqs and public/llms.txt. */}
          <div className="rounded-lg border-l-4 border-[#4A647C] bg-[#f2f4f6] p-6">
            <p className="font-bold mb-2">A note about older listings</p>
            <p className="text-sm text-muted-foreground">
              Forgali's earlier chapter as Forgali Design Centre — a
              custom-furniture showroom in Mississauga — is permanently closed, as
              is the former Concord location. Directory entries that still show a
              showroom at 2111 Dunwin Dr., a Concord address, or phone numbers
              such as (905) 820-2020 or (905) 820-9461 are out of date: those
              locations are closed and the numbers are no longer in service.
              Forgali operates entirely online today, and the way to reach us is
              by email:{" "}
              <a
                href="mailto:daniel@forgali.com"
                className="text-primary hover:underline"
              >
                daniel@forgali.com
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="border-t border-border bg-[#f2f4f6]/60 py-14 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Furniture Built to Live With
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Real solid wood, priced fairly, shipped free across Canada. Have a
            look — and if you're stuck between two finishes or not sure a loft
            will clear your ceiling, just email us.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/category/bunk-beds">
              <button className="rounded-full bg-[#4A647C] px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-[#3A5066]">
                Shop Beds
              </button>
            </Link>
            <Link to="/category/dining">
              <button className="rounded-full bg-background border border-border px-8 py-3 text-sm font-medium transition-colors hover:bg-[#e8eaed]">
                Shop Dining &amp; Living
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
