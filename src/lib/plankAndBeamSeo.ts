// /plank-and-beam head data, shared by PlankAndBeamPage (react-helmet-async)
// and middleware.ts (per-URL head injection) so the initial HTML always says
// exactly what the rendered page says.
export const PLANK_AND_BEAM_SEO = {
  title: "Plank & Beam Furniture Canada – Solid Wood | Forgali",
  description:
    "Shop Plank & Beam solid wood dining and living furniture in Canada — 164 pieces, from $140, with free Canada-wide shipping, CAD pricing and 30-day returns.",
  jsonLd: {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Plank & Beam Furniture Canada",
    description:
      "Shop the Plank & Beam collection of solid wood dining and living furniture in Canada — free Canada-wide shipping, CAD pricing and local 30-day returns.",
    url: "https://www.forgali.com/plank-and-beam",
  },
};
