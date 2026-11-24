// Rich, per-page SEO for the highest-value bed pages — targets the exact
// queries Search Console shows Forgali already ranking (page 2) for, so each
// category AND subcategory speaks directly to its own term instead of every
// loft view rendering the generic "Loft Beds | Forgali".
//
// Keyed by `${category}` and by `${category}|${subcategory}`. Copy is grounded
// in real catalog data (counts/prices/sizes/finishes verified against the live
// store — no fabrication) and fact-checked in an adversarial pass. Pages not in
// this map fall back to the generic categoryInfoMap in CategoryPage.

export interface CategorySeo {
  seoTitle: string;       // <title> + OG (<=60 chars incl. "| Forgali")
  seoDescription: string; // meta description (120-160 chars)
  h1: string;             // page H1 (the keyword phrase)
  lead: string;           // short supporting line under the H1
  intro?: string;         // buying-guide body below the grid; omit to drop the whole "About" section
  /**
   * H2 sections rendered after `intro`. Each H2 is a real query this page
   * already gets impressions for, so the page answers the sub-intent under a
   * heading instead of burying it mid-paragraph. `links` become in-copy
   * internal links — the subcategory pages previously had NO editorial inbound
   * link anywhere on the site, only the filter tabs.
   */
  sections?: Array<{
    h2: string;
    body: string;
    links?: Array<{ label: string; href: string }>;
  }>;
  /**
   * Q&A rendered below the sections and emitted as FAQPage structured data.
   * Answers must be facts already stated elsewhere on the site — this feeds
   * both People-Also-Ask and AI answers, where a wrong claim is worse than
   * no claim. No competitor in this niche runs FAQ schema.
   */
  faqs?: Array<{ q: string; a: string }>;
}

const BED_SEO: Record<string, CategorySeo> = {
  "loft-beds": {
    seoTitle: "Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop our collection of solid wood loft beds in low, mid and high styles that free up floor space. Free Canada-wide shipping and 30-day returns. Shop today.",
    h1: "Loft Beds",
    lead: "Solid wood loft beds in low, mid and high styles that free up the floor for a desk, storage or play.",
  },
  "bunk-beds": {
    seoTitle: "Bunk Beds Canada – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop 69 solid-wood bunk beds for kids and teens, twin-over-twin to full-over-full, with stairs, storage or trundle. Free Canada-wide shipping. Browse today.",
    h1: "Bunk Beds Canada",
    lead: "69 solid-wood bunk beds, twin-over-twin to full-over-full, with stairs, storage and trundle options.",
  },
  "single-beds": {
    seoTitle: "Single Beds Canada – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop 24 solid-wood single beds in Twin, Full and Queen, from $268. Free Canada-wide shipping and 30-day returns. Find a platform, house or trundle bed today.",
    h1: "Single Beds Canada",
    lead: "24 solid-wood single beds in Twin, Full and Queen: platform, house and trundle styles from $268.",
  },
  "bedroom": {
    seoTitle: "Solid Wood Beds Canada – Free Shipping | Forgali",
    seoDescription:
      "Shop solid-wood beds in Canada from $268: bunk, loft and single beds with free Canada-wide shipping and easy 30-day returns. Find the right fit today.",
    h1: "Solid Wood Beds",
    lead: "122 solid-wood bunk, loft and single beds, including a wide range of Max & Lily, shipped across Canada.",
  },
  "loft-beds|low-loft": {
    seoTitle: "Low Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Low loft beds sit close to the floor for younger kids, with room to play or store underneath. Solid wood, free Canada-wide shipping. Shop the collection.",
    h1: "Low Loft Beds",
    lead: "Loft beds that sit close to the floor, an easy first step up for younger children.",
  },
  "loft-beds|mid-loft": {
    seoTitle: "Mid Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop mid loft beds in solid wood, a middle-height design that frees up room for storage or a desk while staying easy to reach. Free Canada-wide shipping.",
    h1: "Mid Loft Beds",
    lead: "A middle-height loft with enough clearance for a desk or storage, still easy to reach.",
  },
  "loft-beds|high-loft": {
    seoTitle: "High Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "High loft beds lift the sleeping surface up high, freeing the floor below for a desk or dresser. Solid wood, free Canada-wide shipping. Shop finishes today.",
    h1: "High Loft Beds",
    lead: "Lift the bed to its tallest and a full desk, dresser or reading nook fits underneath.",
  },
  "loft-beds|loft-with-desk": {
    seoTitle: "Loft Beds With Desk – Solid Wood | Forgali",
    seoDescription:
      "Shop loft beds with a built-in desk and bookcase, a bed plus study space in one footprint. Solid wood, free Canada-wide shipping. Twin and Full sizes.",
    h1: "Loft Beds With Desk",
    lead: "Bed plus a built-in desk and bookcase in one footprint, ideal for small and shared rooms.",
  },
  "bunk-beds|low-bunk": {
    seoTitle: "Low Bunk Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop low bunk beds in Twin and Full, a lower height younger kids can climb more easily. Solid wood with free Canada-wide shipping. Browse the collection.",
    h1: "Low Bunk Beds",
    lead: "Bunks that sit closer to the floor, a reassuring first bunk for younger children.",
  },
  "dining": {
    seoTitle: "Plank & Beam Dining Furniture Canada | Forgali",
    seoDescription: "Shop Plank & Beam solid wood dining tables, chairs, benches, stools and sets in Canada. Free Canada-wide shipping and 30-day returns.",
    h1: "Plank & Beam Dining Furniture",
    lead: "Solid wood dining tables, chairs, benches, counter and bar stools and complete sets, with free shipping anywhere in Canada.",
    intro: "Forgali is an online Canadian stockist of Plank & Beam dining furniture. Every table, bench and set is built from knot-free solid wood with hand-applied, low-VOC finishes, and the chairs and stools use solid rubberwood or hardwood frames. Shipping is free to every province, and there are no duties or brokerage fees on delivery.\n\nThe range covers 28 dining and kitchen tables, 19 dining chairs, 13 benches including a corner banquette, 13 counter and bar stools, and 14 ready-made dining sets. Most pieces come in Pecan, Walnut, Blonde and Black, with Coastal White, wirebrushed and rustic finishes on selected collections.",
    sections: [
      {
        h2: "Shop by piece",
        body: "Start with the table, then match the seating. The Classic, Modern, Verso, Contour and Mid-Century Modern collections share finishes across tables, benches and chairs, so a mixed set from one collection looks like it was bought together.",
        links: [
          { label: "Dining tables", href: "/category/dining?subcategory=dining-tables" },
          { label: "Round and oval tables", href: "/category/dining?subcategory=round-dining-tables" },
          { label: "Kitchen tables", href: "/category/dining?subcategory=kitchen-tables" },
          { label: "Dining chairs", href: "/category/dining?subcategory=dining-chairs" },
          { label: "Dining benches", href: "/category/dining?subcategory=dining-benches" },
          { label: "Counter stools", href: "/category/dining?subcategory=counter-stools" },
          { label: "Bar stools", href: "/category/dining?subcategory=bar-stools" },
          { label: "Dining sets", href: "/category/dining?subcategory=dining-sets" },
        ],
      },
      {
        h2: "Solid wood dining furniture shipped across Canada",
        body: "Every order ships free to your door anywhere in Canada, from Victoria to St. John's. Items arrive boxed with all hardware and step-by-step instructions. Returns are accepted within 30 days on new, unused, unassembled items, and everything is covered by a 5-year limited warranty.",
        links: [
          { label: "Shipping information", href: "/shipping" },
          { label: "Returns", href: "/returns" },
          { label: "Warranty", href: "/warranty" },
          { label: "Finishes compared", href: "/guides/plank-and-beam-finishes" },
          { label: "Caring for solid pine", href: "/guides/solid-pine-furniture-care" },
        ],
      },
    ],
    faqs: [
      { q: "Is Plank & Beam furniture available in Canada?", a: "Yes. Forgali stocks the Plank & Beam dining and living range for Canadian customers, with free shipping to every province and no duties or brokerage fees." },
      { q: "Is Plank & Beam dining furniture solid wood?", a: "Tables, benches and dining sets are built from knot-free solid wood. Chairs and stools use solid rubberwood or hardwood frames, and the upholstered chairs have cushioned seats on those frames. Sideboards and TV stands in the living range use engineered wood only for the back panels." },
      { q: "Do the dining tables need assembly?", a: "Yes. Tables, benches and chairs arrive boxed with all hardware and step-by-step instructions, and the three-panel tops on the Classic and Modern tables can be taken apart again if you move." },
      { q: "How much does shipping cost in Canada?", a: "Shipping is free on every order, to every province and territory, with no duties or brokerage to pay at delivery. See the Shipping page for current delivery times." },
      { q: "What finishes do Plank & Beam dining pieces come in?", a: "The core finishes are Pecan, Walnut, Blonde and Black. The Classic and Modern tables add wirebrushed versions and Coastal White, Camden pieces come in Rustic Barnwood, Rustic Char and Rustic Honey, and upholstered chairs pair a wood finish with an Ivory, Sesame, Toffee or Terracotta seat." },
    ],
  },
  "dining|dining-tables": {
    seoTitle: "Solid Wood Dining Tables Canada - Free Shipping | Forgali",
    seoDescription: "28 solid wood dining tables from $426 CAD: 48 to 94 inch rectangular, 38 and 47 inch round, oval and counter height. Free Canada-wide shipping, 30-day returns.",
    h1: "Solid Wood Dining Tables Canada",
    lead: "28 Plank & Beam dining and kitchen tables in knot-free solid wood, from $426 CAD with free shipping across Canada.",
    intro: "Every table here is built from knot-free solid wood with hand-applied, low-VOC finishes, so you get real wood grain without the price of a custom maker. Rectangular tables run from 48 inches up to 94 inches, round tables come in 38 and 47 inch sizes, and there are two oval tables and two counter-height tables for smaller rooms.\n\nThe Classic collection is a farmhouse style with a textured wirebrush finish. Modern has clean square legs, Mid-Century Modern has tapered legs, Verso has crossed Scandinavian-style legs, Contour has rounded edges, Lido has a slatted pedestal base and Camden is a rustic plank look. All of them share Pecan, Walnut, Blonde and Black finishes, with Coastal White and wirebrushed options on Classic and Modern.",
    sections: [
      {
        h2: "What size dining table do I need?",
        body: "Allow about 24 inches of table edge per person. A 48-inch table seats four, a 60-inch table seats four to six, a 72-inch table seats six, an 84-inch table seats six to eight and the 94-inch Classic and Modern tables seat eight. Leave at least 36 inches between the table edge and the wall so chairs can be pulled out. None of these tables have extension leaves, so choose the size for your biggest regular dinner rather than your everyday one.",
        links: [
          { label: "Round and oval dining tables", href: "/category/dining?subcategory=round-dining-tables" },
          { label: "48-inch kitchen tables", href: "/category/dining?subcategory=kitchen-tables" },
          { label: "Dining table size guide", href: "/guides/dining-table-size" },
        ],
      },
      {
        h2: "Matching benches and chairs",
        body: "Each table collection has a matching bench in the same finish: a 60-inch bench fits the 72-inch tables and the 83 and 85-inch benches fit the 94-inch tables. Chairs start at $454 in both wood-seat and upholstered styles, the Smythe dining stool at $312, or choose a ready-made set with the table and seating priced together.",
        links: [
          { label: "Dining benches", href: "/category/dining?subcategory=dining-benches" },
          { label: "Dining chairs", href: "/category/dining?subcategory=dining-chairs" },
          { label: "Dining sets", href: "/category/dining?subcategory=dining-sets" },
        ],
      },
    ],
    faqs: [
      { q: "Are these dining tables solid wood?", a: "Yes. The Classic, Modern, Verso, Contour and Camden tables are knot-free solid pine and the Mid-Century Modern tables are knot-free solid wood. The Lido pedestal tables combine solid wood with rubberwood and an engineered core in the base." },
      { q: "How many people does a 72-inch dining table seat?", a: "Six comfortably, three on each side, or eight if you use benches and squeeze. A 60-inch table seats four to six and a 48-inch table seats four." },
      { q: "Do any of the tables extend?", a: "No. There are no leaves or extension mechanisms in the range. If you host large dinners, choose the 84 or 94-inch size, or pair a 72-inch table with benches, which seat more people per foot than chairs." },
      { q: "Is the table hard to assemble?", a: "No. Every table ships with all hardware and step-by-step instructions, and the three-panel tops on the Classic and Modern tables can be taken apart again to move them." },
      { q: "Does the price include shipping to Canada?", a: "Yes. Every table ships free to any address in Canada, with no duties or brokerage fees." },
    ],
  },
  "dining|round-dining-tables": {
    seoTitle: "Round Dining Tables Canada - Solid Wood & Oval | Forgali",
    seoDescription: "Solid wood round dining tables in 38 and 47 inch sizes and 62 and 72 inch ovals, from $426 CAD. Seats four to six. Free Canada-wide shipping, 30-day returns.",
    h1: "Round Dining Tables in Solid Wood",
    lead: "Six round tables in 38 and 47 inch sizes and two oval tables, all solid wood, from $426 CAD with free shipping across Canada.",
    intro: "A round table is the easiest way to seat four in a small dining area or kitchen. There are no corners to walk around, everyone faces each other, and a 47-inch round takes less floor space than a 60-inch rectangle while seating the same four people. The 38-inch Lido and Verso rounds suit breakfast nooks and condos where a table for two to four needs to fit.\n\nThe round tables come in the Classic, Verso, Contour and Lido collections, and the oval tables in Verso and Lido. Classic uses four legs, Verso has crossed legs, Contour has rounded edges and Lido sits on a slatted pedestal base so nobody gets a leg in the way. The Contour and Lido rounds and both ovals come in Pecan, Walnut, Blonde and Black, the Classic round in wirebrushed Pecan, Blonde, Seashell and Black or Coastal White, the 47-inch Verso round in Pecan, Blonde or Black and the 38-inch Verso round in Pecan or Blonde.",
    sections: [
      {
        h2: "Round wood dining tables, not veneer",
        body: "Every round table here has a solid wood top. The Classic, Verso and Contour rounds are knot-free solid pine, the Verso on rubberwood legs, and the Lido round and oval tables pair a solid pine top with a rubberwood and engineered-core pedestal. All eight stand 30 inches high, the standard dining height, and the finishes are hand-applied and low-VOC, so the table can go straight into a kitchen.",
        links: [
          { label: "Finishes compared", href: "/guides/plank-and-beam-finishes" },
          { label: "Caring for solid pine", href: "/guides/solid-pine-furniture-care" },
        ],
      },
      {
        h2: "Round or oval?",
        body: "Choose a 38-inch round for two to four people, a 47-inch round for four, a 62-inch oval for four with more elbow room, or a 72-inch oval to seat six. The oval tables fit a narrow dining room better than a round table of the same capacity because they keep the width down.",
        links: [
          { label: "All dining tables", href: "/category/dining?subcategory=dining-tables" },
          { label: "Dining table size guide", href: "/guides/dining-table-size" },
        ],
      },
      {
        h2: "Small round dinette tables",
        body: "For a breakfast nook or a condo kitchen, the 38-inch tables are the dinette size: the Verso round at $530 CAD and the Lido round at $653 CAD each seat two every day and four when needed, on under 8 square feet of floor. Step up to 47 inches when four people eat together most nights.",
        links: [{ label: "Kitchen tables for small spaces", href: "/category/dining?subcategory=kitchen-tables" }],
      },
      {
        h2: "Round dining table sets and chairs",
        body: "There is no boxed round set, so build your own: a 47-inch round seats four armless chairs, and the Lido spindle-back chair was designed for the Lido tables. The Windsor, Elio, Brio and Sereno chairs match the other collections in the same finishes, and most are sold in sets of two or four so the whole table arrives together.",
        links: [
          { label: "Dining chairs", href: "/category/dining?subcategory=dining-chairs" },
          { label: "Ready-made dining sets", href: "/category/dining?subcategory=dining-sets" },
        ],
      },
    ],
    faqs: [
      { q: "How many people fit around a 47-inch round table?", a: "Four comfortably. A 38-inch round seats two to four, and the 72-inch oval seats six." },
      { q: "How much room does a 47-inch round table need?", a: "Allow about 36 inches from the table edge to the wall or the next piece of furniture so chairs can pull out, which means a space roughly 10 feet across for a 47-inch round and about 9 feet across for a 38-inch round." },
      { q: "Are the round tables solid wood?", a: "Yes. The Classic, Verso and Contour rounds have knot-free solid pine tops, and the Lido round and oval tables combine a solid pine top with rubberwood and an engineered core in the pedestal." },
      { q: "Do the round tables have a pedestal base?", a: "The Lido tables do, with a slatted pedestal that leaves the legroom clear. The Classic and Contour round tables stand on legs, and the Verso rounds on a crossed-leg base." },
      { q: "Does shipping to Canada cost extra?", a: "No. Shipping is free to any address in Canada." },
    ],
  },
  "dining|kitchen-tables": {
    seoTitle: "Small Kitchen Tables Canada - Solid Wood, 48 Inch | Forgali",
    seoDescription: "Small 48-inch solid wood kitchen tables that seat four, from $426 CAD, in Classic, Modern, Mid-Century Modern and Verso styles. Free Canada-wide shipping.",
    h1: "Small Kitchen Tables for Two to Four",
    lead: "Four 48-inch kitchen tables in knot-free solid wood, each seating four, from $426 CAD with free shipping across Canada.",
    intro: "A 48-inch table is the standard size for an eat-in kitchen, a condo dining nook or an apartment. It seats four with everyday elbow room and still leaves space to walk past. These four tables are the 48-inch versions of the Classic, Modern, Mid-Century Modern and Verso dining collections, so the same finishes are available on the matching benches and chairs if you add seating later.\n\nAll four are knot-free solid wood with hand-applied, low-VOC finishes. The Classic table has a textured wirebrush finish and a farmhouse look, Modern has square legs, Mid-Century Modern has tapered legs and Verso has crossed legs. Finishes are Pecan, Walnut, Blonde, Black, Seashell and Coastal White depending on the collection.",
    sections: [
      {
        h2: "Small kitchen tables for two to four",
        body: "The Modern, Verso and Mid-Century Modern tables are 48 by 32 inches, which seats two along each long side, or two people with the ends free. The Mid-Century Modern table at $426 CAD is the lightest of the four at 45 pounds and comes in Black; the Verso from $454 CAD comes in Pecan, Walnut, Blonde or Black; and the Modern at $566 CAD and the Classic at $583 CAD add the wirebrushed finishes and Coastal White.",
        links: [{ label: "Dining table size guide", href: "/guides/dining-table-size" }],
      },
      {
        h2: "Fitting a table into a small kitchen",
        body: "Measure the floor space first. A 48-inch table needs roughly 48 by 32 inches of floor plus 30 to 36 inches on each side where chairs pull out. If that is too tight, a 38-inch round table seats two to three in less space, and a bench along a wall side saves another foot of clearance.",
        links: [
          { label: "Round dining tables", href: "/category/dining?subcategory=round-dining-tables" },
          { label: "48-inch dining benches", href: "/category/dining?subcategory=dining-benches" },
        ],
      },
      {
        h2: "Counter height kitchen tables",
        body: "The Classic counter height dining table is 41.5 inches square and 36 inches high, from $454 CAD, which works as a breakfast bar, a homework station or a standing-height workspace in an open kitchen, and the counter height dining set adds four chairs. Pair the table with 24 to 26 inch counter stools.",
        links: [
          { label: "All dining tables", href: "/category/dining?subcategory=dining-tables" },
          { label: "Counter stools", href: "/category/dining?subcategory=counter-stools" },
        ],
      },
    ],
    faqs: [
      { q: "How many people does a 48-inch kitchen table seat?", a: "Four, one on each side or two per long side. For six people, move up to a 60 or 72-inch dining table." },
      { q: "What is the smallest kitchen table you sell?", a: "The 38-inch round tables from the Verso and Lido collections, which seat two to four. The 48-inch tables here seat four." },
      { q: "Can I use a bench with a 48-inch table?", a: "Yes. A 46 to 49-inch bench seats two along one side of a 48-inch table. It sits flush with the table edge rather than tucking underneath." },
      { q: "Is the kitchen table solid wood?", a: "Yes. All four 48-inch tables are knot-free solid wood with low-VOC finishes." },
      { q: "Is shipping included?", a: "Yes. Every table ships free anywhere in Canada." },
    ],
  },
  "dining|dining-chairs": {
    seoTitle: "Solid Wood Dining Chairs Canada - Free Shipping | Forgali",
    seoDescription: "19 Plank & Beam dining chairs and stools from $312 CAD: Windsor, spindle-back, upholstered, slipcovered and armchairs, sold singly or in sets of 2 and 4. Free Canada-wide shipping.",
    h1: "Solid Wood Dining Chairs",
    lead: "19 dining chairs on solid rubberwood and hardwood frames, from $312 CAD for the Smythe dining stool and $454 for a chair, sold individually or in sets of two and four with free shipping across Canada.",
    intro: "Plank & Beam dining chairs are built on solid rubberwood or hardwood frames with low-VOC finishes, in the same Pecan, Walnut, Blonde and Black finishes as the tables. The Windsor and Lido chairs are all-wood spindle backs, the Lido rated to 400 pounds. The Elio, Brio, Loar and Sereno chairs add an upholstered seat in Ivory, Sesame, Toffee, Terracotta, Marine or Evergreen. The Chesnee chair wears a machine-washable twill slipcover in five colours, and the Ernesto armchair is fully upholstered in microsuede for the head of the table.\n\nMost chairs are sold individually, and the Windsor, Lido and Solid Wood chairs also come in sets of two and four at a lower per-chair price. The 18-inch Smythe stool is a backless option for a kitchen table or a kids' end of the table.",
    sections: [
      {
        h2: "Wood seat or upholstered?",
        body: "Wood-seat chairs such as the Windsor, Lido and Solid Wood chair are the easiest to keep clean and the most durable with children. Upholstered seats on the Elio, Brio, Loar and Sereno are more comfortable for long dinners. The Chesnee is the middle ground: a cushioned seat under a slipcover you can take off and wash.",
        links: [
          { label: "Dining sets with chairs included", href: "/category/dining?subcategory=dining-sets" },
          { label: "Dining benches", href: "/category/dining?subcategory=dining-benches" },
        ],
      },
      {
        h2: "How many chairs fit your table",
        body: "Plan on 24 inches of table edge per chair. A 48-inch table takes four chairs, a 72-inch table takes six, and a 94-inch table takes eight. Armless chairs fit closer together than the Ernesto armchair, which needs a little more room at the ends.",
        links: [
          { label: "Dining tables", href: "/category/dining?subcategory=dining-tables" },
          { label: "Counter and bar stools", href: "/category/dining?subcategory=bar-counter-chairs" },
        ],
      },
    ],
    faqs: [
      { q: "Are the dining chairs solid wood?", a: "The frames are solid rubberwood or hardwood. The Windsor chair is all hardwood, the Lido is solid rubberwood with a 400-pound weight rating, and the upholstered chairs have a cushioned seat on a rubberwood frame." },
      { q: "Do the chairs come in sets?", a: "Yes. The Windsor, Lido and Solid Wood chairs are sold in sets of two from $530 and sets of four from $909. Other chairs are sold individually, and the Ernesto armchair and Chesnee come in sets of two." },
      { q: "Can the Chesnee slipcover be washed?", a: "Yes. The twill slipcover slips off and is machine washable. Short and long slipcover versions are available in Chocolate, Bone, Concrete, Ocean Blue and Sand." },
      { q: "Do the chairs match the tables?", a: "Yes. Chairs come in the same Pecan, Walnut, Blonde and Black finishes as the dining tables, so a Lido chair matches a Lido table and a Windsor chair matches the Classic or Modern tables." },
      { q: "Is assembly required?", a: "Yes, with hardware and instructions included. Chairs go together quickly." },
    ],
  },
  "dining|dining-benches": {
    seoTitle: "Solid Wood Dining Benches Canada - Free Shipping | Forgali",
    seoDescription: "13 solid wood dining benches from 46 to 85 inches plus the Risa corner banquette, from $326 CAD. Free Canada-wide shipping and 30-day returns.",
    h1: "Solid Wood Dining Benches",
    lead: "13 dining benches in knot-free solid wood, from 46 to 85 inches long, plus the Risa corner banquette, from $326 CAD with free shipping across Canada.",
    intro: "A bench seats more people per foot than chairs, tucks fully under the table when nobody is sitting on it, and costs less than two chairs. These benches are the matching seating for the Classic, Modern, Mid-Century Modern, Verso, Contour and Camden dining tables, in the same Pecan, Walnut, Blonde, Black, Coastal White and wirebrushed finishes.\n\nLengths run from 46 inches for a 48-inch kitchen table, through 58 to 61 inches for the 72-inch tables, up to 83 and 85 inches for the 94-inch tables. The Risa banquette is the one piece with a back: a 63 by 63 inch solid pine and hardwood corner bench for a breakfast nook, with an optional Cream or Onyx cushion. There is also a Modern outdoor bench finished for a covered patio.",
    sections: [
      {
        h2: "Which bench length fits your table?",
        body: "A bench should be 12 to 14 inches shorter than the table so it slides underneath. The 46 to 49-inch benches fit 60-inch tables, the 58 to 61-inch benches fit 72-inch tables, and the 83 and 85-inch benches fit the 94-inch tables. Two people sit comfortably on a 48-inch bench, three on a 60-inch bench and four on an 85-inch bench.",
        links: [
          { label: "Dining tables", href: "/category/dining?subcategory=dining-tables" },
          { label: "Dining sets with two benches", href: "/category/dining?subcategory=dining-sets" },
          { label: "Bench vs chairs guide", href: "/guides/dining-bench-vs-chairs" },
        ],
      },
      {
        h2: "Banquette seating for a breakfast nook",
        body: "The Risa banquette fits a corner in a left or right configuration, seats three to four around a 47-inch round or a 48-inch kitchen table, and ships in one box with all hardware. It is the only bench in the range with a backrest, and the cushion is optional.",
        links: [
          { label: "Plank & Beam Risa Banquette", href: "/product/risa-banquette" },
          { label: "Round dining tables", href: "/category/dining?subcategory=round-dining-tables" },
          { label: "Banquette seating guide", href: "/guides/banquette-breakfast-nook" },
        ],
      },
    ],
    faqs: [
      { q: "Do any of the dining benches have a back?", a: "The Risa corner banquette has a low back panel and an optional cushion. All the other benches are backless so they slide under the table." },
      { q: "Are the benches solid wood?", a: "Yes. Seats are knot-free solid wood, and the Verso bench pairs the pine seat with solid hardwood legs." },
      { q: "How many people can sit on a dining bench?", a: "Two on a 46 to 49-inch bench, three on a 58 to 61-inch bench and four on an 83 or 85-inch bench." },
      { q: "Can a dining bench go outside?", a: "Only the Modern outdoor bench, which is finished for a covered patio or porch. Keep it out of direct rain and sun to avoid weathering. The indoor benches should stay indoors." },
      { q: "Is shipping free in Canada?", a: "Yes. Every bench ships free to any address in Canada." },
    ],
  },
  "dining|bar-counter-chairs": {
    seoTitle: "Counter & Bar Stools Canada - Solid Wood | Forgali",
    seoDescription: "13 solid wood counter and bar stools from $341 CAD: 24 to 26 inch counter height and 30 to 31 inch bar height, backless or with backs, upholstered options. Free Canada-wide shipping.",
    h1: "Counter & Bar Stools Canada",
    lead: "13 counter and bar stools on solid rubberwood and hardwood frames, from $341 CAD, with free shipping across Canada.",
    intro: "Counter stools are 24 to 26 inches to the seat and fit a standard 36-inch kitchen counter or island. Bar stools are 30 to 31 inches to the seat for a 42-inch bar. Plank & Beam makes both heights in the same designs, so you can match stools to a kitchen island and a home bar in one finish.\n\nThe Smythe and Beryl stools are backless with a contoured seat and tuck fully under the counter. The Solid Wood, Elio, Sereno, Brio and Loar chairs have backs, and the Elio, Sereno, Brio and Loar add an upholstered seat in Ivory, Sesame, Toffee, Terracotta, Marine or Evergreen. Finishes are Pecan, Walnut, Blonde and Black, with Antique White on the Sereno. Most are sold individually, and the Smythe, Beryl and Solid Wood stools come in sets of two and four.",
    sections: [
      {
        h2: "Counter height or bar height?",
        body: "Measure from the floor to the underside of your counter. If it is 36 inches, which is standard for kitchen counters and most islands, you need a counter stool with a 24 to 26 inch seat. If it is 42 inches, you need a bar stool with a 30 to 31 inch seat. Allow 10 to 12 inches between the seat and the counter for legroom, and 24 inches of counter width per stool.",
        links: [
          { label: "Counter stools, 24 to 26 inch", href: "/category/dining?subcategory=counter-stools" },
          { label: "Bar stools, 30 to 31 inch", href: "/category/dining?subcategory=bar-stools" },
          { label: "Counter vs bar height guide", href: "/guides/counter-vs-bar-height-stools" },
        ],
      },
      {
        h2: "Backless or with a back?",
        body: "Backless stools like the Smythe and Beryl cost less, from $341, and disappear under the counter when not in use, which keeps a small kitchen open. Stools with backs are better for longer sitting, homework at the island or a breakfast bar that doubles as the dining table. The Loar upholstered counter chair is the most comfortable in the range for that.",
        links: [
          { label: "Counter height dining tables", href: "/category/dining?subcategory=kitchen-tables" },
          { label: "Dining chairs", href: "/category/dining?subcategory=dining-chairs" },
        ],
      },
    ],
    faqs: [
      { q: "What height stool do I need for a kitchen island?", a: "Most kitchen islands and counters are 36 inches high, which takes a counter stool with a seat 24 to 26 inches off the floor. A 42-inch bar takes a 30 to 31 inch bar stool." },
      { q: "Are the stools solid wood?", a: "Yes. The Smythe, Beryl, Elio, Sereno, Brio and Loar stools are solid rubberwood, and the Solid Wood counter and bar chairs are knot-free solid wood. Upholstered versions have a cushioned seat on the wood frame." },
      { q: "Do the stools come in sets?", a: "Yes. The Smythe and Beryl stools are sold individually or in sets of two and four, and the Solid Wood counter and bar chairs come in sets of two." },
      { q: "Do the stools need assembly?", a: "Yes. Hardware and tools are included and each stool goes together quickly." },
      { q: "Is shipping free to Canada?", a: "Yes. Every stool ships free anywhere in Canada." },
    ],
  },
  "dining|counter-stools": {
    seoTitle: "Counter Height Stools Canada - Solid Wood | Forgali",
    seoDescription: "Eight counter height stools and chairs with 24 to 26 inch seats for 36-inch counters, backless or with backs, from $341 CAD. Free Canada-wide shipping.",
    h1: "Counter Height Stools and Chairs",
    lead: "Eight counter height stools with 24 to 26 inch seats, backless or with a back, from $341 CAD, with free shipping across Canada.",
    intro: "A counter stool seats you at a standard 36-inch kitchen counter or island with about 10 inches of legroom. These eight are the counter height versions of the Plank & Beam stool range: the backless Smythe and Beryl at 24 inches, the Solid Wood counter chair and Elio and Sereno chairs at 24 inches, the Brio at 25 inches and the Loar upholstered counter chair at 26 inches.\n\nAll are built on wood frames with low-VOC finishes in Pecan, Walnut, Blonde and Black. The Elio, Sereno, Brio and Loar add an upholstered seat, and the Smythe and Beryl are available in sets of two and four.",
    sections: [
      {
        h2: "How tall are counter height stools?",
        body: "A counter height stool has a seat 24 to 26 inches off the floor, which is right for a 35 to 37 inch counter, and almost every kitchen counter and island is 36 inches. That leaves 10 to 12 inches between the seat and the underside of the counter. If your surface measures 41 to 43 inches it is a bar, and you need the 30-inch bar stools instead.",
        links: [
          { label: "Counter vs bar height guide", href: "/guides/counter-vs-bar-height-stools" },
          { label: "Bar stools for 42-inch bars", href: "/category/dining?subcategory=bar-stools" },
        ],
      },
      {
        h2: "Backless counter stools",
        body: "The Smythe and Beryl counter stools have a contoured seat with no back, so they slide fully under the counter and keep a small kitchen looking open. They are the least expensive stools in the range, from $341 CAD each or less per stool in a set of four.",
        links: [{ label: "All counter and bar stools", href: "/category/dining?subcategory=bar-counter-chairs" }],
      },
      {
        h2: "Counter height chairs with backs",
        body: "The Solid Wood counter chair is an all-wood design with a back. The Elio, Sereno and Brio add a cushioned seat, and the Loar upholstered counter chair has the fullest padding for an island that doubles as the family table. Pair any of them with the Classic counter height table.",
        links: [{ label: "Counter height tables", href: "/category/dining?subcategory=kitchen-tables" }],
      },
      {
        h2: "Wood counter stools",
        body: "The Smythe is solid rubberwood through and through, with a contoured wood seat, and the Solid Wood counter chair is knot-free solid wood with a shaped back. The Beryl, Elio, Sereno and Brio put an upholstered seat on a rubberwood frame, in vegan leather or boucle, and the Loar pairs rubberwood legs with vegan leather. Frames are wood on every stool; the only metal is the Beryl's footrest.",
        links: [{ label: "Dining chairs in the same finishes", href: "/category/dining?subcategory=dining-chairs" }],
      },
    ],
    faqs: [
      { q: "What counter height do these stools fit?", a: "A 36-inch counter or island, which is the standard height. The seats are 24 to 26 inches off the floor, leaving about 10 to 12 inches of legroom." },
      { q: "What is the difference between a counter stool and a counter height chair?", a: "Only the back. Both have a 24 to 26 inch seat for a 36-inch counter; a counter height chair adds a backrest for longer sitting." },
      { q: "How many counter stools fit at an island?", a: "Allow 24 inches of counter per stool. A 6-foot island seats three, an 8-foot island seats four." },
      { q: "Are the counter stools solid wood?", a: "The Smythe is solid rubberwood and the Solid Wood counter chair is knot-free solid wood. The Beryl, Elio, Sereno and Brio have rubberwood frames under their upholstered seats, and the Loar has rubberwood legs on an engineered wood frame. All use low-VOC finishes." },
      { q: "Can I buy counter stools in a set?", a: "Yes. The Smythe and Beryl come in sets of two and four, and the Solid Wood, Elio, Sereno, Brio and Loar in sets of two." },
    ],
  },
  "dining|bar-stools": {
    seoTitle: "Wooden Bar Stools Canada - 30 Inch Seat | Forgali",
    seoDescription: "Five wooden bar stools with 30 to 31 inch seats for 42-inch bars, backless or with backs, from $363 CAD. Free Canada-wide shipping and 30-day returns.",
    h1: "Wooden Bar Stools, 30 to 31 Inch Seat",
    lead: "Five bar height stools with 30 to 31 inch seats for a 42-inch bar, from $363 CAD, with free shipping across Canada.",
    intro: "Bar stools are taller than counter stools: the seat sits 30 to 31 inches off the floor to fit a 42-inch home bar, a raised breakfast bar or a pub-height table. These five are the bar height versions of the Plank & Beam range, so each one has a counter height twin if you also have a 36-inch island to seat.\n\nThe Smythe and Beryl bar stools are backless with a contoured seat and sell from $363 CAD. The Solid Wood bar height chair has a back, and the Sereno bar chair adds an upholstered seat in Ivory. Finishes are low-VOC Pecan, Walnut, Blonde and Black, and the Smythe and Beryl are sold in sets of two and four, the Solid Wood chair and the Sereno in sets of two.",
    sections: [
      {
        h2: "30-inch bar stools",
        body: "The Smythe and Sereno bar stools and the Solid Wood bar height chair all have a 30-inch seat, and the Beryl sits at 31 inches. Any of them fits a 41 to 43 inch bar with 11 to 12 inches of legroom. The Beryl is the wood-and-metal option, with a solid rubberwood base, a vegan leather seat and a metal footrest; the Smythe is solid rubberwood, the Solid Wood chair is knot-free solid wood, and the Sereno puts an upholstered seat on a solid rubberwood frame.",
        links: [{ label: "All counter and bar stools", href: "/category/dining?subcategory=bar-counter-chairs" }],
      },
      {
        h2: "Check your bar height before you order",
        body: "Measure from the floor to the underside of the bar. A 30 to 31 inch seat is right for a 41 to 43 inch bar. If your surface is 36 inches, which is most kitchen counters, you need a counter stool instead, and a bar stool will leave your knees against the counter.",
        links: [
          { label: "Counter stools for 36-inch counters", href: "/category/dining?subcategory=counter-stools" },
          { label: "Counter vs bar height guide", href: "/guides/counter-vs-bar-height-stools" },
        ],
      },
      {
        h2: "Bar stools, counter stools or dining stools?",
        body: "Three heights, three uses. A 30 to 31 inch bar stool is for a 42-inch bar, a 24 to 26 inch counter stool is for a 36-inch kitchen counter or island, and an 18-inch dining stool like the Smythe dining stool is for a standard 30-inch table. The Smythe comes in all three heights and the Beryl in counter and bar height, so an island and a bar in the same kitchen can match.",
        links: [
          { label: "Counter stools", href: "/category/dining?subcategory=counter-stools" },
          { label: "Dining chairs and stools", href: "/category/dining?subcategory=dining-chairs" },
        ],
      },
    ],
    faqs: [
      { q: "What bar height do these stools fit?", a: "A 42-inch bar. The seats are 30 to 31 inches off the floor, which leaves 11 to 12 inches of legroom at that height." },
      { q: "Are the bar stools solid wood?", a: "The Smythe is solid rubberwood, the Solid Wood bar height chair is knot-free solid wood, and the Sereno has a solid rubberwood frame under its upholstered seat. The Beryl has a solid rubberwood base with a vegan leather seat and a metal footrest. All use low-VOC finishes." },
      { q: "Do you have wood and metal bar stools?", a: "The Beryl bar stool pairs a solid rubberwood base and vegan leather seat with a metal footrest. The other four are all wood apart from the Sereno's upholstered seat." },
      { q: "Do the bar stools come with backs?", a: "The Solid Wood bar height chair and the Sereno bar chair have backs. The Smythe and Beryl are backless so they tuck under the bar." },
      { q: "Is there a matching counter height version?", a: "Yes. Every bar stool here has a 24 to 26 inch counter height version in the same finishes." },
    ],
  },
  "dining|dining-sets": {
    seoTitle: "Solid Wood Dining Sets Canada - Table & Seating | Forgali",
    seoDescription: "14 solid wood dining sets for 4 to 8 people from $1,238 CAD: 72-inch tables with two benches, bench plus four chairs or six chairs, and a 94-inch set for eight. Free Canada-wide shipping.",
    h1: "Solid Wood Dining Sets Canada",
    lead: "14 ready-made dining sets in knot-free solid wood, seating four to eight, from $1,238 CAD with free shipping across Canada.",
    intro: "A dining set takes the guesswork out of matching: the table and seating arrive in the same finish, sized to fit each other. Most sets are built around the 72-inch Classic, Modern, Mid-Century Modern or Contour table, which seats six, and come with two benches, a bench plus four chairs, or six chairs. The 94-inch Classic set with two benches seats eight, and the counter height set with four chairs seats four at bar-table height.\n\nEvery set is knot-free solid wood with hand-applied, low-VOC finishes. Sets with benches start at $1,238, sets with a bench and four chairs from $1,503, and sets with six matching chairs from $1,698. Finishes are Pecan, Walnut, Blonde, Black and Coastal White, with wirebrushed versions on the Classic and Modern sets.",
    sections: [
      {
        h2: "Dining sets for 6",
        body: "All of the 72-inch sets seat six. Two benches give the cleanest look and the most flexible seating, since a bench takes three adults or four children. A bench plus four chairs puts chairs at the ends and sides and the bench along a wall. Six chairs is the most formal option and the easiest for guests to get in and out of.",
        links: [
          { label: "Dining chairs", href: "/category/dining?subcategory=dining-chairs" },
          { label: "Dining benches", href: "/category/dining?subcategory=dining-benches" },
        ],
      },
      {
        h2: "Dining sets for 4 and for 8",
        body: "For four, the Counter Height set pairs a Classic counter height table with four matching chairs. For eight, the 94-inch Classic set with two 85-inch benches seats four per side. If you need something in between, buy a 60 or 84-inch table separately and add the matching bench or chairs.",
        links: [
          { label: "Dining tables", href: "/category/dining?subcategory=dining-tables" },
          { label: "Counter stools", href: "/category/dining?subcategory=counter-stools" },
        ],
      },
    ],
    faqs: [
      { q: "How many people do the dining sets seat?", a: "The 72-inch sets seat six, the 94-inch Classic set with benches seats eight, and the counter height set seats four." },
      { q: "Are the dining sets solid wood?", a: "Yes. Tables and benches are knot-free solid pine, and the chair sets include six matching solid wood dining chairs." },
      { q: "Do the sets come assembled?", a: "No. The table and seating arrive boxed with all hardware and step-by-step instructions." },
      { q: "Does the set ship free in Canada?", a: "Yes. Every set ships free to any address in Canada, with no duties or brokerage fees." },
    ],
  },
  "living": {
    seoTitle: "Plank & Beam Living Room Furniture Canada | Forgali",
    seoDescription: "Shop Plank & Beam solid wood coffee tables, console tables, side tables, sideboards, TV stands and entryway benches in Canada. Free Canada-wide shipping and 30-day returns.",
    h1: "Plank & Beam Living Room Furniture",
    lead: "Solid pine coffee tables, console tables, side tables, sideboards, TV stands, mantels and entryway benches, with free shipping anywhere in Canada.",
    intro: "Forgali is an online Canadian stockist of Plank & Beam living room furniture. The tables are knot-free solid wood with hand-applied, low-VOC finishes, and the sideboards and TV stands are solid pine with engineered wood only on the back panels. Shipping is free to every province, and there are no duties or brokerage fees at the door.\n\nThe range covers 26 coffee tables, 23 console tables, 13 side tables, 7 sideboards, 3 TV stands, 3 floating mantels and 2 entryway benches. The Classic, Modern, Mid-Century Modern, Verso, Contour and Forma collections share Pecan, Walnut, Blonde and Black finishes, the Camden pieces come in rustic finishes and the Arcata pieces in an oak veneer, so a coffee table, console and side table from one collection match.",
    sections: [
      {
        h2: "Shop by piece",
        body: "Coffee tables and side tables are the quickest way to pull a living room together, and the console tables double as entryway tables or a sofa table. The sideboards and TV stands are the storage pieces, with adjustable shelves behind slatted doors.",
        links: [
          { label: "Coffee tables", href: "/category/living?subcategory=coffee-tables" },
          { label: "Round coffee tables", href: "/category/living?subcategory=round-coffee-tables" },
          { label: "Console tables", href: "/category/living?subcategory=console-tables" },
          { label: "Console tables with storage", href: "/category/living?subcategory=console-tables-with-storage" },
          { label: "Side tables", href: "/category/living?subcategory=side-tables" },
          { label: "Sideboards", href: "/category/living?subcategory=sideboards" },
          { label: "TV stands", href: "/category/living?subcategory=tv-stands" },
          { label: "Mantel shelves", href: "/category/living?subcategory=shelves" },
          { label: "Entryway benches", href: "/category/living?subcategory=entryway" },
          { label: "Mid-century modern pieces", href: "/category/living?subcategory=mid-century-modern" },
        ],
      },
      {
        h2: "Solid wood living room furniture shipped across Canada",
        body: "Every order ships free to your door anywhere in Canada. Pieces arrive boxed with hardware and step-by-step instructions. Returns are accepted within 30 days on new, unused, unassembled items, and everything carries a 5-year limited warranty.",
        links: [
          { label: "Shipping information", href: "/shipping" },
          { label: "Returns", href: "/returns" },
          { label: "Warranty", href: "/warranty" },
          { label: "Finishes compared", href: "/guides/plank-and-beam-finishes" },
          { label: "Caring for solid pine", href: "/guides/solid-pine-furniture-care" },
        ],
      },
    ],
    faqs: [
      { q: "Is Plank & Beam living room furniture available in Canada?", a: "Yes. Forgali stocks the Plank & Beam living range for Canadian customers, with free shipping to every province and no duties or brokerage fees." },
      { q: "Is the furniture solid wood?", a: "The coffee, console and side tables are knot-free solid wood, apart from one melamine side table. The sideboards and TV stands are solid pine with engineered wood back panels. The Arcata pieces have a real oak veneer over a solid wood and engineered core, and the mantels are 100 percent solid pine." },
      { q: "Do the pieces need assembly?", a: "Yes. Everything arrives boxed with hardware and step-by-step instructions, and the Arcata console is just three parts." },
      { q: "What finishes are available?", a: "Pecan, Walnut, Blonde and Black across most collections, Coastal White and wirebrushed finishes on Classic and Modern, Rustic Barnwood, Char and Honey on Camden, and Cashew, Cerused White, Hazelnut and Noir oak veneer on Arcata." },
      { q: "How much is shipping in Canada?", a: "Free, to every province and territory, on every order. See the Shipping page for current delivery times." },
    ],
  },
  "living|coffee-tables": {
    seoTitle: "Solid Wood Coffee Tables Canada - Free Shipping | Forgali",
    seoDescription: "26 solid wood coffee tables from $327 CAD: rectangular 40 to 54 inch, round 30 to 36 inch, square, and tables with a storage shelf. Free Canada-wide shipping, 30-day returns.",
    h1: "Solid Wood Coffee Tables",
    lead: "26 Plank & Beam coffee tables in knot-free solid wood, rectangular, round and square, from $327 CAD with free shipping across Canada.",
    intro: "A coffee table is the one piece every sofa needs, and these are built to take daily use: knot-free solid wood tops and legs with hand-applied, low-VOC finishes, assembled from a single-panel top that bolts straight to the legs. Rectangular tables come in 40, 45, 48 and 54 inch lengths, round tables in 30, 34 and 36 inches, and there is a 36-inch square Forma table.\n\nThe Classic collection is a traditional four-leg table, Modern has square legs and a version with a storage shelf, Mid-Century Modern has tapered legs, Verso has crossed legs, Contour has rounded edges, Forma has a rounded top with a lower shelf and Arcata is a waterfall design in oak veneer. Finishes are Pecan, Walnut, Blonde and Black, with Coastal White and wirebrushed options on Classic and Modern.",
    sections: [
      {
        h2: "What size coffee table fits your sofa?",
        body: "A coffee table should be about two-thirds the length of the sofa and sit 14 to 18 inches in front of it. For a standard 84 to 90 inch sofa that means a 48 or 54 inch table. A 40-inch table suits a loveseat or an apartment sofa, and a round table works best with a sectional or an L-shaped seating arrangement where people approach from more than one side.",
        links: [
          { label: "Round coffee tables", href: "/category/living?subcategory=round-coffee-tables" },
          { label: "Side tables to match", href: "/category/living?subcategory=side-tables" },
          { label: "Coffee table size guide", href: "/guides/coffee-table-size" },
        ],
      },
      {
        h2: "Coffee tables with storage",
        body: "The Modern coffee table with shelf, in 40 and 48 inch lengths, adds a full lower shelf for books, remotes and baskets. The Forma tables also have a lower shelf under a rounded top. If you need closed storage, pair a plain coffee table with a sideboard instead.",
        links: [
          { label: "Sideboards", href: "/category/living?subcategory=sideboards" },
          { label: "Console tables with storage", href: "/category/living?subcategory=console-tables-with-storage" },
        ],
      },
    ],
    faqs: [
      { q: "Are the coffee tables solid wood?", a: "Yes. The Classic, Modern, Mid-Century Modern, Verso, Contour and Forma coffee tables are knot-free solid wood. The Arcata coffee table has a real oak veneer over a solid wood and engineered wood core." },
      { q: "How high are the coffee tables?", a: "Standard coffee table height, which sits level with or just below a typical sofa seat. Check the Details tab on each product for the exact height, length and width." },
      { q: "Do any coffee tables have storage?", a: "Yes. The Modern coffee table with shelf in 40 and 48 inches and the Forma tables have a lower shelf. None have drawers." },
      { q: "Is assembly difficult?", a: "No. The single-panel top keeps assembly simple, and all hardware is included." },
      { q: "Is shipping free to Canada?", a: "Yes. Every coffee table ships free anywhere in Canada." },
    ],
  },
  "living|round-coffee-tables": {
    seoTitle: "Round Coffee Tables Canada - Solid Wood | Forgali",
    seoDescription: "Seven solid wood round coffee tables, 30 to 36 inches, from $341 CAD, in Classic, Mid-Century Modern, Verso, Contour and Forma styles. Free Canada-wide shipping.",
    h1: "Round Solid Wood Coffee Tables",
    lead: "Seven round coffee tables in knot-free solid wood, 30 to 36 inches across, from $341 CAD with free shipping across Canada.",
    intro: "A round coffee table has no corners to catch a shin, which matters with small children and in a room where people walk past the sofa. It also suits a sectional or an L-shaped seating arrangement, because everyone reaches it from the same distance. These seven are the round versions of the Classic, Mid-Century Modern, Verso, Contour and Forma collections.\n\nThe 30-inch Classic, Verso and Contour rounds fit a loveseat or a small living room. The 36-inch Classic, Mid-Century Modern and Verso rounds suit a full-size sofa, and the 34-inch Forma round has a lower shelf for storage. All are knot-free solid wood with low-VOC finishes in Pecan, Walnut, Blonde and Black, with Coastal White on the Verso rounds and wirebrushed Pecan, Blonde, Seashell and Black on the Classic.",
    sections: [
      {
        h2: "Which size round coffee table?",
        body: "Keep 14 to 18 inches between the table edge and the sofa. A 30-inch round sits well in front of a loveseat or a 72-inch sofa, and a 36-inch round in front of an 84 to 90 inch sofa or inside the corner of a sectional. If the room is long and narrow, a rectangular coffee table will fill the space better.",
        links: [
          { label: "All coffee tables", href: "/category/living?subcategory=coffee-tables" },
          { label: "Coffee table size guide", href: "/guides/coffee-table-size" },
        ],
      },
      {
        h2: "What the round coffee tables are made of",
        body: "Every top is knot-free solid pine. The Classic, Contour, Mid-Century Modern and Forma rounds are solid pine through the legs as well, and the Verso rounds put a solid pine top on solid hardwood legs. Heights run from 15 inches on the Contour to 17.75 inches on the Classic, Verso and Mid-Century Modern rounds and 18 inches on the Forma, which is level with most sofa seats. The finishes are hand-applied and low-VOC, and every table ships free anywhere in Canada.",
        links: [
          { label: "Finishes compared", href: "/guides/plank-and-beam-finishes" },
          { label: "Caring for solid pine", href: "/guides/solid-pine-furniture-care" },
        ],
      },
      {
        h2: "Round coffee table sets",
        body: "Pair a round coffee table with the side table from the same collection for a set that matches without buying a suite. The Classic, Contour, Forma and Mid-Century Modern side tables stand 24 inches high, and the Verso round side table is a 24-inch round at 17.75 inches high, the same height as the Verso coffee tables, so it doubles as a second small table beside the sofa. Side tables start at $298 CAD.",
        links: [{ label: "Side tables", href: "/category/living?subcategory=side-tables" }],
      },
    ],
    faqs: [
      { q: "Are the round coffee tables solid wood?", a: "Yes. All seven have knot-free solid pine tops, on solid pine or solid hardwood legs, with hand-applied, low-VOC finishes." },
      { q: "What sizes do the round coffee tables come in?", a: "30 inches in Classic, Verso and Contour, 34 inches in Forma, and 36 inches in Classic, Mid-Century Modern and Verso." },
      { q: "How tall are the round coffee tables?", a: "15 inches for the Contour, 17.75 inches for the Classic, Verso and Mid-Century Modern rounds, and 18 inches for the Forma." },
      { q: "Is there a round coffee table with storage?", a: "The 34-inch Forma round has a lower shelf. The other round tables are open underneath." },
      { q: "Does shipping cost extra in Canada?", a: "No. Shipping is free to any address in Canada." },
    ],
  },
  "living|console-tables": {
    seoTitle: "Solid Wood Console Tables Canada - Free Shipping | Forgali",
    seoDescription: "23 solid wood console tables from 36 to 66 inches wide, from $211 CAD, for entryways, hallways and behind the sofa. Free Canada-wide shipping and 30-day returns.",
    h1: "Solid Wood Console Tables",
    lead: "23 Plank & Beam console tables in knot-free solid wood, 36 to 66 inches wide, from $211 CAD with free shipping across Canada.",
    intro: "A console table is the narrow table that goes against a wall in an entryway, down a hallway or behind a sofa. These 23 run from 36 inches, which fits a condo entry, up to 66 inches for a wide hallway or the back of a sectional. Four of them add a lower shelf or closed storage for shoes, baskets and mail.\n\nThe Classic consoles start at $158, the lowest price in the range. Verso has crossed legs, Mid-Century Modern has tapered legs, Contour and Forma have rounded tops, Camden is a rustic plank style, Grande is a heavier wirebrushed design and Arcata is an arched waterfall console in oak veneer. Finishes are Pecan, Walnut, Blonde and Black, with Coastal White, Seashell and White on Classic and Modern, rustic finishes on Camden and Cashew, Cerused White, Hazelnut and Noir on Arcata.",
    sections: [
      {
        h2: "Console table sizes for an entryway or behind a sofa",
        body: "For an entryway, leave at least 36 inches of clear walkway in front of the table, which usually means a 36 or 46 inch console. Behind a sofa, choose a console a few inches shorter than the sofa and no taller than the sofa back: the 56 and 66 inch consoles fit most three-seat sofas.",
        links: [
          { label: "Console tables with storage", href: "/category/living?subcategory=console-tables-with-storage" },
          { label: "Entryway benches", href: "/category/living?subcategory=entryway" },
          { label: "Console table sizing guide", href: "/guides/console-table-behind-sofa" },
        ],
      },
      {
        h2: "Matching the rest of the room",
        body: "Each console collection has a matching coffee table and side table in the same finish. The Arcata console pairs with the Arcata coffee table, the Forma console with the Forma coffee and side tables, and the Classic and Modern consoles with the full Classic and Modern living range.",
        links: [
          { label: "Coffee tables", href: "/category/living?subcategory=coffee-tables" },
          { label: "Side tables", href: "/category/living?subcategory=side-tables" },
        ],
      },
    ],
    faqs: [
      { q: "Are the console tables solid wood?", a: "Yes. The Classic, Modern, Verso, Mid-Century Modern, Contour, Forma, Camden and Grande consoles are knot-free solid wood. The Arcata console has a real oak veneer over a solid wood and engineered core." },
      { q: "How wide are the console tables?", a: "36, 46, 47, 56 and 66 inches depending on the collection. Check the Details tab on each product for exact depth and height." },
      { q: "Which console tables have storage?", a: "The Classic console with shelf in 36 and 46 inches, the Mid-Century Modern console with storage and the Grande console with shelf. The rest have an open base." },
      { q: "Can a console table go behind a sofa?", a: "Yes. Choose one slightly shorter than the sofa and no taller than the sofa back. The 56 and 66 inch consoles suit most three-seat sofas." },
      { q: "Is shipping free in Canada?", a: "Yes. Every console table ships free to any address in Canada." },
    ],
  },
  "living|console-tables-with-storage": {
    seoTitle: "Console Tables with Storage Canada - Solid Wood | Forgali",
    seoDescription: "Four solid wood console tables with a shelf or closed storage, 36 to 56 inches wide, from $300 CAD, for entryways and hallways. Free Canada-wide shipping.",
    h1: "Console Tables with Storage",
    lead: "Four console tables with a lower shelf or closed storage, in knot-free solid wood, from $300 CAD with free shipping across Canada.",
    intro: "An entryway console with storage gives shoes, baskets and bags somewhere to go instead of the floor. These four add storage to the standard console table: the Classic console with shelf in 36 and 46 inch widths has a full solid wood lower shelf, the 46-inch Mid-Century Modern console with storage has closed cabinets behind pull-down doors, and the 56-inch Grande console with shelf is a wider wirebrushed design with an open lower shelf.\n\nAll four are knot-free solid wood with hand-applied, low-VOC finishes. The Classic consoles come in Pecan, Walnut, Seashell, Black and White, the Mid-Century Modern in Pecan, Walnut and Black, and the Grande in Pecan or Black wirebrush.",
    sections: [
      {
        h2: "Solid wood console tables",
        body: "All four are real wood rather than veneer over particleboard: the Classic consoles with shelf are knot-free solid pine, and the Mid-Century Modern and Grande consoles are knot-free solid wood with a solid top and legs. That matters more on a console than on most pieces, because an entryway table takes keys, wet gloves and bags every day, and solid wood can be touched up where a laminate cannot.",
        links: [
          { label: "Finishes compared", href: "/guides/plank-and-beam-finishes" },
          { label: "Caring for solid pine", href: "/guides/solid-pine-furniture-care" },
        ],
      },
      {
        h2: "Console table with drawers or doors?",
        body: "None of these four has a drawer. The 46-inch Mid-Century Modern console has two cabinets with pull-down doors that hide what is inside, and the Classic and Grande consoles have an open lower shelf for baskets and shoes. If a hallway needs more closed storage than that, the sideboards give you two or three doors with adjustable shelves at 49 and 59 inches wide.",
        links: [
          { label: "All console tables", href: "/category/living?subcategory=console-tables" },
          { label: "Sideboards", href: "/category/living?subcategory=sideboards" },
        ],
      },
      {
        h2: "Open shelf or closed storage?",
        body: "An open shelf is the right choice for baskets, a few pairs of everyday shoes and anything you want to grab on the way out. Closed storage, like the pull-down cabinets on the Mid-Century Modern console, hides the clutter in a hallway you see from the living room. If you need seating too, an entryway bench next to the console covers both.",
        links: [{ label: "Entryway benches", href: "/category/living?subcategory=entryway" }],
      },
      {
        h2: "Sizes: 36, 46 and 56 inches wide",
        body: "The Classic console with shelf comes in 36 and 46 inch widths, 12 inches deep and 32 inches high. The Mid-Century Modern console is 46 inches wide, 12.75 inches deep and 32 inches high, and the Grande is 56 inches wide, 12 inches deep and 30 inches high. At 12 to 13 inches deep they take less floor than most hall furniture, which is what keeps a walkway clear.",
        links: [{ label: "Console table sizing guide", href: "/guides/console-table-behind-sofa" }],
      },
    ],
    faqs: [
      { q: "Which console table has closed storage?", a: "The 46-inch Mid-Century Modern console with storage has cabinets with pull-down doors. The Classic consoles with shelf and the Grande console with shelf have an open lower shelf." },
      { q: "Do any of these console tables have drawers?", a: "No. The Mid-Century Modern console has closed cabinets behind pull-down doors, and the Classic and Grande consoles have an open shelf. For more closed storage, the sideboards have two or three doors with adjustable shelves." },
      { q: "Are these console tables solid wood?", a: "Yes. All four are knot-free solid wood with low-VOC finishes, and the Classic and Grande shelves are solid wood too." },
      { q: "What is the narrowest console table with storage?", a: "The 36-inch Classic console with shelf, which fits a condo or apartment entryway and starts at $300 CAD." },
      { q: "Is shipping included in Canada?", a: "Yes. Shipping is free to any address in Canada." },
    ],
  },
  "living|side-tables": {
    seoTitle: "Solid Wood Side Tables Canada - Free Shipping | Forgali",
    seoDescription: "13 solid wood side and end tables from $298 CAD: 18 to 25 inch round and square tables, tables with a shelf or storage, and a 32-inch corner table. Free Canada-wide shipping.",
    h1: "Solid Wood Side & End Tables",
    lead: "13 side and end tables in knot-free solid wood, 18 to 32 inches, from $298 CAD with free shipping across Canada.",
    intro: "A side table goes at the end of a sofa or beside an armchair and should sit level with the arm, which for most sofas means 22 to 26 inches high. These 13 are sized for that: round tables at 24 inches, square tables at 20 inches, rectangular tables at 23 to 25 inches, the 18-inch Mid-Century Modern side table with storage, which is the one melamine piece in the range, and the 32-inch Modern square corner table for the gap between two sofas in an L.\n\nEach one matches a coffee table from the same collection in the same finish: Classic, Modern, Mid-Century Modern, Verso, Contour and Forma, in Pecan, Walnut, Blonde and Black with Coastal White and wirebrushed options on Classic and Modern. All but the storage side table are solid wood with hand-applied, low-VOC finishes.",
    sections: [
      {
        h2: "Side tables with storage",
        body: "The Mid-Century Modern side table with storage, the Modern side table with shelf and the Forma side table each add a lower shelf or compartment for a book, a tablet or a remote. The plain Classic, Verso and Contour tables are the lighter choice to move around.",
        links: [
          { label: "Coffee tables to match", href: "/category/living?subcategory=coffee-tables" },
          { label: "Nightstands for the bedroom", href: "/category/accessories?subcategory=nightstands" },
        ],
      },
      {
        h2: "Corner tables for a sectional",
        body: "The 32-inch Modern square corner table fills the gap where two sofas or a sofa and a loveseat meet at a right angle, giving both seats a surface for a lamp and a drink.",
        links: [{ label: "Round coffee tables for sectionals", href: "/category/living?subcategory=round-coffee-tables" }],
      },
    ],
    faqs: [
      { q: "Are the side tables solid wood?", a: "Twelve of the 13 are solid wood with hand-applied, low-VOC finishes. The Mid-Century Modern side table with storage is melamine." },
      { q: "What height should a side table be?", a: "Level with or an inch or two below the arm of the sofa, usually 22 to 26 inches. Check the Details tab on each product for the exact height." },
      { q: "Do any side tables have a drawer?", a: "No drawers. The Mid-Century Modern side table with storage, the Modern side table with shelf and the Forma side table have an open lower shelf or compartment." },
      { q: "Can I buy two matching side tables?", a: "Yes. Order the quantity you need and both ship free in the same order, in the same finish." },
    ],
  },
  "living|sideboards": {
    seoTitle: "Solid Wood Sideboards Canada - Free Shipping | Forgali",
    seoDescription: "Seven solid pine sideboards and buffets in 49 and 59 inch widths with 2 or 3 doors and adjustable shelves, from $671 CAD. Free Canada-wide shipping.",
    h1: "Solid Wood Sideboards & Buffets",
    lead: "Seven sideboards in knot-free solid pine, 49 and 59 inches wide, with two or three doors and adjustable shelves, from $671 CAD with free shipping across Canada.",
    intro: "A sideboard is the storage piece that works in a dining room as a buffet, in a living room as a media cabinet or in a hallway as a credenza. These seven are built from knot-free solid pine with engineered wood only on the back panels, and come in 49 and 59 inch widths with two or three doors. Behind the doors, adjustable shelves have three height positions for platters, glassware, board games or a record collection.\n\nThe Mid-Century Modern sideboard has tapered legs and comes in 49 and 59 inch two-door and 59-inch three-door versions. The Modern sideboard has soft-close doors and the Contour sideboard has slatted doors with rounded edges, each in two and three-door versions at 59 inches. All are finished in low-VOC Pecan, Walnut, Blonde or Black and match the TV stands and coffee tables of the same collection.",
    sections: [
      {
        h2: "Two doors or three?",
        body: "The two-door sideboards have an open middle shelf between the doors for display or a bar setup, so you get closed storage on each side and a place for a lamp or decanter in the centre. The three-door sideboards close the middle section too, for the most hidden storage in the same width.",
        links: [
          { label: "TV stands in the same collections", href: "/category/living?subcategory=tv-stands" },
          { label: "Dining tables to pair with a buffet", href: "/category/dining?subcategory=dining-tables" },
        ],
      },
    ],
    faqs: [
      { q: "Are the sideboards solid wood?", a: "The frames, doors, tops and shelves are knot-free solid pine. The back panels are engineered wood, which keeps the cabinet square and the weight manageable." },
      { q: "Can a sideboard be used as a TV stand?", a: "Yes. The 59-inch sideboards are wide enough for a 55 or 65 inch television, though the dedicated TV stands add cord cutouts. The sideboards do not have cord cutouts." },
      { q: "Are the shelves adjustable?", a: "Yes. The shelves behind the doors have three height positions." },
      { q: "How long does assembly take?", a: "Sideboards are the largest assembly in the living range and take one to two hours with the included hardware and instructions." },
      { q: "Does the sideboard ship free in Canada?", a: "Yes. Every sideboard ships free to any address in Canada." },
    ],
  },
  "living|tv-stands": {
    seoTitle: "Solid Wood TV Stands Canada - Fits 65 Inch TV | Forgali",
    seoDescription: "Three solid pine TV stands for screens up to 65 inches, with two doors, adjustable shelves and cord cutouts, from $707 CAD. Free Canada-wide shipping.",
    h1: "Solid Wood TV Stands",
    lead: "Three media consoles in knot-free solid pine, sized for TVs up to 65 inches, from $707 CAD with free shipping across Canada.",
    intro: "Each of these TV stands is built from knot-free solid pine with engineered wood back panels, and is designed to hold a television up to 65 inches. Two doors hide a cable box, console or router on shelves that adjust to three heights, an open middle shelf holds a soundbar or a record player, and cord cutouts in the back keep the cables out of sight.\n\nThe Mid-Century Modern TV stand has tapered legs and slatted doors, the Modern TV stand has soft-close doors and the Contour TV stand has slatted doors with rounded corners. Each matches the sideboard and coffee table of the same collection, in low-VOC Pecan, Walnut, Blonde or Black.",
    sections: [
      {
        h2: "Which TV sizes fit?",
        body: "All three stands are sized for a 65-inch screen and will take anything smaller. A 55-inch TV leaves room on either side for speakers or a lamp. If your TV is larger than 65 inches, the 59-inch sideboards in the same collections are the same width but without cord cutouts, so a wall mount above a sideboard is the better arrangement.",
        links: [
          { label: "Sideboards", href: "/category/living?subcategory=sideboards" },
          { label: "Coffee tables to match", href: "/category/living?subcategory=coffee-tables" },
        ],
      },
    ],
    faqs: [
      { q: "What size TV fits these stands?", a: "Up to 65 inches. Smaller screens leave room on the top for speakers or decor." },
      { q: "Are the TV stands solid wood?", a: "The frame, doors, top and shelves are knot-free solid pine, with engineered wood back panels that carry the cord cutouts." },
      { q: "Do the TV stands have cable management?", a: "Yes. There are cord cutouts in the back panels, and the shelves behind the doors adjust to three heights for a cable box, game console or receiver." },
      { q: "How long does assembly take?", a: "About one to two hours with the included hardware and instructions." },
      { q: "Is shipping free in Canada?", a: "Yes. Every TV stand ships free to any address in Canada." },
    ],
  },
  "living|shelves": {
    seoTitle: "Fireplace Mantel Shelf Canada - Solid Pine | Forgali",
    seoDescription: "Camden floating mantel shelves in 100 percent solid pine, 48, 60 and 72 inches, in Rustic Barnwood or Rustic Honey, from $341 CAD. Free Canada-wide shipping.",
    h1: "Fireplace Mantel Shelves",
    lead: "Three Camden floating mantels in 100 percent solid pine, 48, 60 and 72 inches long, from $341 CAD with free shipping across Canada.",
    intro: "The Camden mantel is a solid pine beam that mounts to the wall on a wooden bracket with four screws, so it works as a fireplace mantel or as a floating shelf on any blank wall. The pine is left with its knots and grain showing and finished in Rustic Barnwood, a grey weathered look, or Rustic Honey, a warm natural tone.\n\nChoose the 48-inch mantel for a fireplace up to about 42 inches wide, the 60-inch for a standard fireplace opening, and the 72-inch for a wide fireplace or a feature wall. The Camden console table and dining pieces come in the same rustic finishes.",
    sections: [
      {
        h2: "Mounting a floating mantel",
        body: "The mantel comes with a wooden wall bracket that screws into the wall studs, and the mantel slides over the bracket. Check your fireplace manufacturer's clearance requirements for a wood mantel before mounting it above a wood-burning or gas fireplace.",
        links: [
          { label: "Camden console tables", href: "/category/living?subcategory=console-tables" },
          { label: "Camden dining tables", href: "/category/dining?subcategory=dining-tables" },
        ],
      },
    ],
    faqs: [
      { q: "Is the mantel solid wood?", a: "Yes. The Camden mantel is 100 percent solid pine with the natural knots and grain showing through the finish." },
      { q: "How does the mantel attach to the wall?", a: "With the included wooden wall bracket and four screws into the studs. The mantel slides over the bracket for a floating look." },
      { q: "Can it be used as a shelf, not a mantel?", a: "Yes. Mounted on any wall it works as a floating shelf for books, plants or photos." },
      { q: "Is shipping free in Canada?", a: "Yes. Shipping is free to any address in Canada." },
    ],
  },
  "living|entryway": {
    seoTitle: "Entryway Bench Canada - Solid Wood, 8 Finishes | Forgali",
    seoDescription: "Mid-Century Modern entryway benches in solid pine and birch, 41 and 56 inches, rated to 275 pounds, in eight finishes from $176 CAD. Free Canada-wide shipping.",
    h1: "Entryway Benches",
    lead: "Two Mid-Century Modern entryway benches in solid pine and birch, 41 and 56 inches long, in eight finishes from $176 CAD with free shipping across Canada.",
    intro: "An entryway bench is somewhere to sit and pull your boots off, and in a Canadian winter that matters more than it does anywhere else. The Mid-Century Modern bench has a slatted solid wood seat on tapered legs, a frame of solid pine and birch with metal-on-metal connections, and a 275-pound weight rating. The 41-inch bench fits a condo entry or the end of a bed, and the 56-inch bench suits a mudroom, a hallway or the foot of a queen bed.\n\nBoth lengths come in eight finishes: Pecan, Walnut, Natural and Black for a wood look, and White, Clay, Teal and Yellow if the entry needs some colour. Finishes are low-VOC. The same bench works at the end of a dining table, as extra seating in a living room or on a covered porch.",
    sections: [
      {
        h2: "Complete the entryway",
        body: "Pair the bench with a console table for keys and mail, or a console with a shelf for shoes. The 36 and 46 inch Classic consoles with shelf match the bench lengths and share the Pecan, Walnut and Black finishes.",
        links: [
          { label: "Console tables with storage", href: "/category/living?subcategory=console-tables-with-storage" },
          { label: "Dining benches", href: "/category/dining?subcategory=dining-benches" },
        ],
      },
    ],
    faqs: [
      { q: "How much weight can the entryway bench hold?", a: "275 pounds. The frame is solid pine and birch with metal-on-metal connections." },
      { q: "Does the entryway bench have storage?", a: "No. It is an open slatted bench. For shoe storage, pair it with the Classic console with shelf." },
      { q: "What finishes does it come in?", a: "Eight: Pecan, Walnut, Natural, Black, White, Clay, Teal and Yellow, all low-VOC." },
      { q: "Can the bench be used outdoors?", a: "On a covered porch, yes. Keep it out of direct rain and sun." },
      { q: "Is shipping free in Canada?", a: "Yes. Both benches ship free to any address in Canada." },
    ],
  },
  "living|mid-century-modern": {
    seoTitle: "Mid-Century Modern Furniture Canada - Solid Wood | Forgali",
    seoDescription: "Plank & Beam Mid-Century Modern living room furniture in solid wood: coffee tables, side tables, console, sideboards, TV stand and entryway bench, from $176 CAD. Free Canada-wide shipping.",
    h1: "Mid-Century Modern Living Room Furniture",
    lead: "The Plank & Beam Mid-Century Modern living collection in knot-free solid wood, from $176 CAD with free shipping across Canada.",
    intro: "The Mid-Century Modern collection is the tapered-leg, slatted-door range that gives a living room the 1950s and 60s look without vintage prices or particleboard. Every piece except the melamine side table with storage is knot-free solid wood with hand-applied, low-VOC finishes, and the cabinets use engineered wood only on the back panels.\n\nThe collection covers a 36-inch round coffee table and 40 and 48 inch rectangular coffee tables, 18 to 24 inch side tables including one with storage, a 46-inch console with storage, 49 and 59 inch sideboards with two or three doors, a TV stand for screens up to 65 inches, and the 41 and 56 inch entryway benches. Finishes are Walnut, Pecan, Blonde and Black, with the entryway bench also in White, Clay, Teal, Yellow and Natural.",
    sections: [
      {
        h2: "Building a matching room",
        body: "Start with the coffee table and a pair of side tables in one finish, then add the sideboard or TV stand in the same finish. Walnut gives the classic mid-century look, Blonde is the lighter Scandinavian version, and Black reads more contemporary. The Mid-Century Modern dining table, bench and kitchen table carry the same finishes into the dining room.",
        links: [
          { label: "Coffee tables", href: "/category/living?subcategory=coffee-tables" },
          { label: "Side tables", href: "/category/living?subcategory=side-tables" },
          { label: "Sideboards", href: "/category/living?subcategory=sideboards" },
          { label: "TV stands", href: "/category/living?subcategory=tv-stands" },
          { label: "Mid-century dining tables", href: "/category/dining?subcategory=dining-tables" },
        ],
      },
      {
        h2: "Mid-century modern bench",
        body: "The entryway bench comes in 41 and 56 inch lengths, 16.5 inches deep and 17.5 inches high, in solid pine and birch with the same tapered legs as the rest of the collection. It is the one piece in the range with colours beyond the wood tones: Clay, Teal, Natural and White on both sizes, and Yellow on the 56-inch. From $176 CAD for the 56-inch bench and $290 CAD for the 41-inch.",
        links: [{ label: "Entryway benches", href: "/category/living?subcategory=entryway" }],
      },
      {
        h2: "Mid-century modern console table",
        body: "The 46-inch console with storage is 12.75 inches deep and 32 inches high, with two cabinets behind pull-down doors, in Pecan, Walnut or Black from $398 CAD. It is sized for an entryway wall or the space behind a sofa.",
        links: [
          { label: "Console tables with storage", href: "/category/living?subcategory=console-tables-with-storage" },
          { label: "Console table sizing guide", href: "/guides/console-table-behind-sofa" },
        ],
      },
      {
        h2: "Mid-century modern side tables and coffee tables",
        body: "Four side tables: a 20-inch square, 23 and 24 inch rectangular tables and an 18-inch side table with a storage cabinet, 24 to 25.5 inches high, from $298 CAD. Three coffee tables: the 36-inch round in Black or Walnut and the 40 and 48 inch rectangular tables, all 17.75 inches high, from $327 CAD.",
        links: [
          { label: "Side tables", href: "/category/living?subcategory=side-tables" },
          { label: "Round coffee tables", href: "/category/living?subcategory=round-coffee-tables" },
          { label: "Coffee table size guide", href: "/guides/coffee-table-size" },
        ],
      },
    ],
    faqs: [
      { q: "Is the Mid-Century Modern collection solid wood?", a: "Yes, apart from the melamine side table with storage. Tables and benches are knot-free solid wood, and the sideboards and TV stand are solid pine with engineered wood back panels." },
      { q: "What finishes does the collection come in?", a: "Walnut, Pecan, Blonde and Black across the collection. The entryway bench adds White, Clay, Teal, Yellow and Natural." },
      { q: "Does the collection include dining furniture?", a: "Yes. The Mid-Century Modern dining table, kitchen table, dining bench and dining set with benches are in the dining range in the same finishes." },
      { q: "Is shipping free in Canada?", a: "Yes. Every piece ships free to any address in Canada." },
    ],
  },
};

/**
 * FAQPage structured data. Shared by CategoryPage (hydrated) and middleware.ts
 * (initial HTML) so both emit byte-identical markup for the same Q&A — a page
 * whose injected and rendered schema disagree is worse than one with neither.
 */
export const faqPageJsonLd = (
  faqs: Array<{ q: string; a: string }>
): Record<string, unknown> => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

// Own-property lookups only: a plain index walks the prototype chain, so a
// URL-supplied key like "constructor" would return junk instead of null.
const own = (key: string): CategorySeo | null =>
  Object.prototype.hasOwnProperty.call(BED_SEO, key) ? BED_SEO[key] : null;

export const getBedSeo = (
  category: string | undefined,
  subcategory?: string | null
): CategorySeo | null => {
  if (!category) return null;
  if (subcategory) {
    const sub = own(`${category}|${subcategory}`);
    if (sub) return sub;
  }
  // Only fall back to the category-level entry when no subcategory is active —
  // an unmatched subcategory should keep the generic category page, not
  // mislabel itself with the parent's rich copy.
  if (!subcategory) return own(category);
  return null;
};
