// Head + minimal body copy for the site's static routes, shared by the pages
// themselves and by middleware.ts.
//
// Why this exists: /product/* and /category/* have had their real head injected
// into the initial HTML since 2026-08-04, but the static routes were never in
// the middleware matcher. They therefore served the generic shell title
// ("Forgali — Solid Wood Furniture for Every Room") and an empty <div id="root">
// to anything that doesn't run JavaScript. Search Console on 2026-08-11 showed
// exactly what that costs: /about ranking position 3.1 with 45 impressions and
// ZERO clicks, /shipping position 4.8 with 28 and zero, /contact position 10.2
// with 48 and zero — page-one placements advertised under a title that says
// nothing about the page.
//
// The strings are the single source of truth: each page spreads seoProps() into
// its <Seo>, and the middleware renders the same values. Change copy here.
//
// `h1` / `lead` / `facts` drive the pre-hydration body only. React replaces the
// container on mount, so this is what crawlers and AI fetchers read, never what
// a visitor sees. Every line must be a fact the rendered page also states.

export interface StaticPageSeo {
  title: string;
  description: string;
  path: string;
  h1: string;
  lead: string;
  /** Short factual bullets for the pre-hydration body. */
  facts?: string[];
}

export const STATIC_PAGE_SEO = {
  "/shipping": {
    title: "Shipping Information – Free Canada-Wide | Forgali",
    description:
      "How Forgali shipping works: free Canada-wide delivery, processing times, tracking, and what to check when your furniture arrives.",
    path: "/shipping",
    h1: "Shipping Information",
    lead: "Free shipping across Canada on every order, with tracking on every shipment.",
    facts: [
      "Shipping is free Canada-wide on all orders.",
      "Standard delivery takes 12-18 business days.",
      "Prices are in Canadian dollars — no duties or brokerage fees.",
      "Inspect your delivery on arrival and report any damage to daniel@forgali.com.",
    ],
  },
  "/returns": {
    title: "Returns & Cancellations – 30-Day Policy | Forgali",
    description:
      "Forgali's return policy: 30-day returns on unused items, order changes and cancellations, and how we handle damaged or incorrect deliveries.",
    path: "/returns",
    h1: "Returns & Cancellations",
    lead: "30-day returns on new, unused, unassembled items — handled here in Canada.",
    facts: [
      "Returns are accepted on new, unused, unassembled items within 30 days of delivery.",
      "Return shipping is the customer's responsibility and a restocking fee of up to 20% may apply.",
      "If an item arrives damaged, defective or incorrect, we cover return shipping and waive the restocking fee.",
      "Request a return authorization by emailing daniel@forgali.com.",
    ],
  },
  "/contact": {
    title: "Contact Forgali – Support for Orders & Delivery",
    description:
      "Reach Forgali at (647) 527-2110 or daniel@forgali.com. A 100% online Canadian furniture store — no showroom. We respond within 24 hours.",
    path: "/contact",
    h1: "Contact Forgali",
    lead: "Call (647) 527-2110 or email daniel@forgali.com. We respond within 24 hours, Monday to Friday.",
    facts: [
      "Forgali's phone number is (647) 527-2110, answered Monday to Friday, 9:00 AM to 5:00 PM EST.",
      "Forgali is an online-only store: there is no retail showroom.",
      "Email daniel@forgali.com for orders, delivery and product questions.",
    ],
  },
  "/faqs": {
    title: "FAQs – Shipping, Assembly, Returns & Warranty | Forgali",
    description:
      "Answers to common questions about Forgali furniture: materials, shipping times, assembly, returns, warranty coverage, and child safety.",
    path: "/faqs",
    h1: "Frequently Asked Questions",
    lead: "Common questions about our products, shipping, and policies.",
    // Body comes from SITE_FAQS — the real Q&A, not a summary of it.
  },
  "/about": {
    title: "About Forgali – Canadian Solid Wood Furniture, Online Only",
    description:
      "Forgali is an online-only Canadian furniture store: solid wood bunk beds, loft beds and Plank & Beam dining and living furniture, shipped free across Canada with 30-day returns and a 5-year warranty.",
    path: "/about",
    h1: "About Forgali",
    lead: "A Canadian online store for solid wood furniture — kids' beds and Plank & Beam dining and living.",
    facts: [
      "Forgali sells solid wood furniture online across Canada, priced in Canadian dollars.",
      "The bedroom range covers bunk beds, loft beds and single beds, including a wide selection of Max & Lily.",
      "We also carry the Plank & Beam collection of dining and living room furniture.",
      "Shipping is free Canada-wide, returns are handled locally within 30 days, and orders carry a 5-year limited warranty.",
      "Forgali operates entirely online — there is no retail showroom. The phone number is (647) 527-2110.",
    ],
  },
  "/warranty": {
    title: "Warranty – Coverage & Claims | Forgali",
    description:
      "What Forgali's limited warranty covers, what it doesn't, and how to make a claim on your solid wood furniture — backed by Canadian support.",
    path: "/warranty",
    h1: "Warranty",
    lead: "A 5-year limited warranty covering manufacturing defects, supported from Canada.",
    facts: [
      "Forgali furniture carries a 5-year limited warranty against manufacturing defects.",
      "Claims are handled by email at daniel@forgali.com with your order number.",
    ],
  },
  "/safety-standards": {
    title: "Bunk & Loft Bed Safety Standards | Forgali",
    description:
      "How Forgali beds address Health Canada guidance: guardrails, low-VOC finishes, and structural integrity — plus safety tips for parents.",
    path: "/safety-standards",
    h1: "Bunk & Loft Bed Safety Standards",
    lead: "Guardrails, low-VOC finishes and solid wood construction — plus safety guidance for parents.",
    facts: [
      "Our children's beds are manufactured and tested to applicable children's furniture safety standards.",
      "Finishes are low-VOC.",
      "As a general guideline, the raised level of a loft or bunk bed is not recommended for children under six.",
    ],
  },
  "/assembly": {
    title: "Assembly Guide – Tips & Instructions | Forgali",
    description:
      "Get ready to build: assembly tips for solid wood furniture, typical build times, and how to get replacement instructions for your model.",
    path: "/assembly",
    h1: "Assembly Guide",
    lead: "What to expect when you build: tools, typical times, and replacement instructions.",
    facts: [
      "All beds require assembly and ship with step-by-step instructions and the necessary hardware.",
      "Most beds can be assembled in 1-2 hours with basic tools.",
      "Replacement instructions and parts are available by emailing daniel@forgali.com.",
    ],
  },
  "/smart-deals": {
    title: "Smart Deals – Solid Wood Furniture on Sale | Forgali",
    description:
      "Save on solid wood bunk beds, loft beds, and furniture for every room. Sale prices with free Canada-wide shipping.",
    path: "/smart-deals",
    h1: "Smart Deals",
    lead: "Current sale prices on solid wood beds and furniture, with free Canada-wide shipping.",
  },
  "/privacy": {
    title: "Privacy Policy | Forgali",
    description:
      "How Forgali collects, uses, and protects your personal information when you shop with us or subscribe to our emails.",
    path: "/privacy",
    h1: "Privacy Policy",
    lead: "How Forgali collects, uses and protects your personal information.",
  },
  "/terms": {
    title: "Terms of Service | Forgali",
    description:
      "The terms that apply when you browse or buy from Forgali, including orders, pricing, and returns.",
    path: "/terms",
    h1: "Terms of Service",
    lead: "The terms that apply when you browse or buy from Forgali.",
  },
} satisfies Record<string, StaticPageSeo>;

export type StaticPagePath = keyof typeof STATIC_PAGE_SEO;

/** The subset <Seo> accepts — pages spread this so the two can't drift. */
export const seoProps = (path: StaticPagePath) => {
  const p = STATIC_PAGE_SEO[path];
  return { title: p.title, description: p.description, path: p.path };
};
