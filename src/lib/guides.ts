// Buying guides — the site's one editorial section. Content lives here so the
// hydrated GuidePage, the GuidesIndexPage and middleware.ts (initial HTML) all
// render the same copy and emit the same structured data from one source.
//
// Why: Search Console (2026-10-22) shows Forgali earning impressions almost
// only on bed queries it cannot win against bedsmart.ca, and almost none on
// the dining & living range where it is the Canadian Plank & Beam stockist.
// These guides target the sizing and how-to questions behind those searches
// ("what size dining table", "counter vs bar height", "coffee table size") and
// link into the subcategory pages, which had no editorial inbound links.
//
// Every number is either a published product fact (sizes, prices, finishes
// verified against the live Storefront on 2026-10-22) or standard furniture
// sizing guidance stated as guidance — no fabricated specs.

import { faqPageJsonLd } from "./categorySeo";

export interface GuideSection {
  h2: string;
  paragraphs: string[];
  bullets?: string[];
  links?: Array<{ label: string; href: string }>;
}

export interface Guide {
  slug: string;
  /** <title> + OG. */
  title: string;
  /** Meta description. */
  description: string;
  h1: string;
  lead: string;
  /** ISO date; feeds Article dateModified. Bump when the copy changes. */
  updated: string;
  sections: GuideSection[];
  faqs: Array<{ q: string; a: string }>;
  /** Subcategory keys from RELATED_LINKS, rendered as "Shop" links. */
  related: string[];
}

export const GUIDES: Guide[] = [
  {
    slug: "dining-table-size",
    title: "What Size Dining Table Do You Need? A Canadian Sizing Guide | Forgali",
    description: "How to pick a dining table size for your room and your household: seats per length, round vs rectangular, clearance to walls, and which solid wood tables fit a condo, a kitchen or a full dining room.",
    h1: "What Size Dining Table Do You Need?",
    lead: "Measure the room, count the people you feed most weeks, and the right table length follows. This guide covers seats per size, round versus rectangular, and how much clearance to leave.",
    updated: "2026-10-22",
    sections: [
      {
        h2: "Start with the room, not the table",
        paragraphs: [
          "Measure the floor space you can give the table, then subtract 36 inches on every side where someone needs to pull out a chair and walk behind it. That 36 inches is the minimum; 42 to 48 inches is comfortable. Whatever is left is the largest table footprint the room can take.",
          "In a condo or an eat-in kitchen that usually leaves room for a 48-inch table or a 38 to 47 inch round. A dedicated dining room in a detached house typically takes a 72 to 84 inch table, and a 94-inch table needs a room at least 12 feet long.",
        ],
      },
      {
        h2: "How many people each table length seats",
        paragraphs: [
          "Allow 24 inches of table edge per person for everyday meals, or 20 inches if you use benches and don't mind elbows touching at a holiday dinner. On a rectangular table that gives you these counts.",
        ],
        bullets: [
          "48-inch table: four people, one on each side or two per long side.",
          "60-inch table: four comfortably, six with a bench on each side.",
          "72-inch table: six, three per side. The most common size in the range.",
          "84-inch table: six to eight.",
          "94-inch table: eight, four per side.",
          "38-inch round: two to four. 47-inch round: four. 62-inch oval: four to six. 72-inch oval: six.",
        ],
        links: [
          { label: "All solid wood dining tables", href: "/category/dining?subcategory=dining-tables" },
          { label: "48-inch kitchen tables", href: "/category/dining?subcategory=kitchen-tables" },
        ],
      },
      {
        h2: "Round or rectangular?",
        paragraphs: [
          "A round table seats four in less floor space than a rectangle, has no corners to walk around, and keeps everyone in one conversation. It is the better choice for a square room, a kitchen nook or a small condo dining area. Past four people, round tables get wide fast: a round table for six is 60 inches across and needs more room than a 72-inch rectangle.",
          "A rectangular table fits a long, narrow room, sits against a wall when you need the floor, and seats more people per square foot once you pass four. Oval tables are the middle option: the softer shape of a round with the capacity of a rectangle.",
        ],
        links: [{ label: "Round and oval dining tables", href: "/category/dining?subcategory=round-dining-tables" }],
      },
      {
        h2: "Plan for the biggest dinner you host regularly",
        paragraphs: [
          "None of the Plank & Beam tables have extension leaves, so the table you buy is the table you host on. If Thanksgiving means eight people, buy for eight and accept that four people at an 84-inch table look a little spread out the rest of the year. Benches help here: a bench seats three adults or four children on one side without adding chairs you have to store.",
          "If the room genuinely cannot take the bigger table, a 72-inch table with two benches seats six every day and eight when everyone squeezes in, which is the most seating the 72-inch footprint will give you.",
        ],
        links: [
          { label: "Dining benches", href: "/category/dining?subcategory=dining-benches" },
          { label: "Dining sets with benches included", href: "/category/dining?subcategory=dining-sets" },
        ],
      },
      {
        h2: "Table height",
        paragraphs: [
          "Standard dining tables are about 30 inches high and take chairs with an 18-inch seat. Counter height tables are 36 inches high and take 24 to 26 inch stools. Counter height works in an open kitchen where the table doubles as prep space or a breakfast bar, and it keeps sight lines level with the kitchen counter. For long dinners and for young children, standard height is more comfortable.",
        ],
        links: [{ label: "Counter stools", href: "/category/dining?subcategory=counter-stools" }],
      },
    ],
    faqs: [
      { q: "What size dining table fits a 10 by 12 foot room?", a: "A 72-inch table with chairs fits a 10 by 12 room with the recommended 36 inches of clearance on all sides. An 84-inch table fits if you place one long side against a wall and only pull chairs out on the other three sides." },
      { q: "How much space do you need around a dining table?", a: "36 inches from the table edge to the wall or the next piece of furniture is the minimum for pulling out a chair and walking behind it. 42 to 48 inches is comfortable." },
      { q: "Is a round or rectangular table better for a small space?", a: "Round, up to four people. A 47-inch round seats four in a smaller footprint than a 60-inch rectangle and has no corners in the walkway. Past four people, rectangular tables use space more efficiently." },
      { q: "How many people fit at a 72-inch table?", a: "Six at 24 inches each, or up to eight with benches on both sides." },
    ],
    related: ["dining-tables", "round-dining-tables", "kitchen-tables", "dining-sets"],
  },
  {
    slug: "dining-bench-vs-chairs",
    title: "Dining Bench vs Chairs: Which Should You Buy? | Forgali",
    description: "Benches seat more people, cost less and hide under the table. Chairs are easier to get in and out of and more comfortable for long dinners. How to decide, and how to mix both.",
    h1: "Dining Bench vs Chairs: Which Should You Buy?",
    lead: "A bench seats more people in the same length, costs less than the chairs it replaces and disappears under the table. Chairs win on comfort and on getting in and out. Most dining rooms do best with one of each.",
    updated: "2026-10-22",
    sections: [
      {
        h2: "What a bench does better",
        paragraphs: [
          "Seating. A 60-inch bench takes three adults or four children on one side of a 72-inch table, where chairs give you three at most. When nobody is sitting on it, the bench slides fully under the table, which in a small room means the floor is clear and nobody trips over chair legs.",
          "Price. A 60-inch solid wood bench starts at $211 CAD. Two chairs in the same finish start at $317 each. Over a table that seats six, two benches instead of six chairs saves a meaningful amount and a lot of storage.",
          "Kids. Children slide onto a bench without help, there is nothing to tip over backwards, and a wood bench wipes clean.",
        ],
        links: [{ label: "Solid wood dining benches", href: "/category/dining?subcategory=dining-benches" }],
      },
      {
        h2: "What chairs do better",
        paragraphs: [
          "Comfort. A chair has a back. For dinners that run two hours, for older guests and for anyone with a bad back, a chair is simply more comfortable, and an upholstered seat more so.",
          "Access. The person in the middle of a bench has to ask the people on either end to move. With chairs everyone comes and goes on their own.",
          "Formality. Six matching chairs read as a dining room. Benches read as a kitchen or a farmhouse table, which is a look many people want, but not every room.",
        ],
        links: [{ label: "Solid wood dining chairs", href: "/category/dining?subcategory=dining-chairs" }],
      },
      {
        h2: "The usual answer: one bench, chairs on the rest",
        paragraphs: [
          "Put the bench on the side against the wall, where chairs would be hard to pull out anyway, and chairs on the open side and the ends. That gives you the seating and the clear floor of a bench where it matters, and the comfort of chairs where people sit longest. The Plank & Beam dining sets with a bench plus four chairs are built around exactly this layout.",
          "If you want a bench with a back, the Risa corner banquette is the one option in the range, designed for a breakfast nook rather than a long dining table.",
        ],
        links: [
          { label: "Dining sets with a bench and four chairs", href: "/category/dining?subcategory=dining-sets" },
          { label: "Banquette seating guide", href: "/guides/banquette-breakfast-nook" },
        ],
      },
      {
        h2: "Matching a bench to your table",
        paragraphs: [
          "A bench should be 12 to 14 inches shorter than the table so it slides underneath with the legs clear. The 46 to 49 inch benches fit 60-inch tables, the 58 to 61 inch benches fit 72-inch tables and the 83 and 85 inch benches fit the 94-inch tables. Every Plank & Beam table collection has a bench in the same finish, so a Modern table takes a Modern bench in Pecan, Walnut, Blonde, Black or Coastal White.",
        ],
        links: [{ label: "Dining table size guide", href: "/guides/dining-table-size" }],
      },
    ],
    faqs: [
      { q: "How many people can sit on a dining bench?", a: "Two on a 46 to 49 inch bench, three on a 58 to 61 inch bench and four on an 83 or 85 inch bench. Children fit one more than adults." },
      { q: "Is a dining bench comfortable?", a: "For a normal meal, yes. For a two-hour dinner, a chair with a back is more comfortable, which is why most people put the bench on the wall side and chairs on the open side." },
      { q: "Are benches cheaper than chairs?", a: "Yes. A 60-inch bench from $211 CAD replaces three chairs that start at $317 each." },
      { q: "Do any dining benches have a back?", a: "The Risa corner banquette has a backrest and an optional cushion. The straight benches are backless so they tuck under the table." },
    ],
    related: ["dining-benches", "dining-chairs", "dining-sets"],
  },
  {
    slug: "banquette-breakfast-nook",
    title: "Banquette Seating for a Breakfast Nook: Sizes and Layouts | Forgali",
    description: "How a corner banquette fits a kitchen nook, which table shape to pair it with, how many people it seats, and what to look for in a solid wood banquette bench shipped in Canada.",
    h1: "Banquette Seating for a Breakfast Nook",
    lead: "A corner banquette turns the dead corner of a kitchen into seating for three or four, with a backrest, in a footprint that chairs could never use. Here is how to size one and what to put in front of it.",
    updated: "2026-10-22",
    sections: [
      {
        h2: "Why a banquette works in a kitchen corner",
        paragraphs: [
          "Chairs need clearance behind them. A banquette sits against two walls, so the space that chairs would waste pulling in and out becomes seating. In a kitchen nook of 6 by 6 feet, a corner banquette plus a small table seats four, where four chairs around the same table would not fit.",
          "The other reason people choose a banquette is the backrest. Benches save space but most have no back; a banquette gives you the compact footprint and somewhere to lean.",
        ],
      },
      {
        h2: "Sizing the Risa banquette",
        paragraphs: [
          "The Plank & Beam Risa banquette is 63 inches along each wall, with a 17.75-inch seat and a low back panel that rises to 24.75 inches. It weighs 72.75 pounds and is built from knot-free solid pine and hardwood. It works in a left or right corner, so it fits either side of a kitchen. Three adults sit comfortably, four if two are children, and the optional Cream or Onyx cushion adds the padding of an upholstered seat without covering the wood.",
          "You need a clear corner of at least 63 by 63 inches, plus the table in front. Measure from the corner along both walls, and check that a window sill, a radiator or a baseboard heater does not sit in the way at seat height.",
        ],
        links: [{ label: "Plank & Beam Risa Banquette", href: "/product/risa-banquette" }],
      },
      {
        h2: "Which table goes with a banquette?",
        paragraphs: [
          "A round or a small square table. Round is the classic nook choice: a 38 or 47 inch round table in front of a corner banquette lets people slide in and out without catching a corner, and one or two chairs on the open side bring the total to four or five. A 48-inch kitchen table also works if the nook is deeper than it is wide.",
          "Keep the table top about 10 to 12 inches above the seat, and let it overlap the bench by a few inches so nobody is reaching for their plate.",
        ],
        links: [
          { label: "Round dining tables", href: "/category/dining?subcategory=round-dining-tables" },
          { label: "48-inch kitchen tables", href: "/category/dining?subcategory=kitchen-tables" },
          { label: "Dining chairs for the open side", href: "/category/dining?subcategory=dining-chairs" },
        ],
      },
      {
        h2: "Banquette or straight bench?",
        paragraphs: [
          "If the nook has only one wall, a straight bench along it with chairs opposite does the same job without the corner piece. The straight benches have no back, so put the bench against the wall and let the wall do the work. If you have the corner, the banquette seats more and gives everyone a backrest.",
        ],
        links: [
          { label: "Dining benches", href: "/category/dining?subcategory=dining-benches" },
          { label: "Bench vs chairs guide", href: "/guides/dining-bench-vs-chairs" },
        ],
      },
    ],
    faqs: [
      { q: "How many people does a corner banquette seat?", a: "The 63 by 63 inch Risa banquette seats three adults comfortably, or four with children, before you add chairs on the open side of the table." },
      { q: "What size table fits a corner banquette?", a: "A 38 or 47 inch round table, or a 48-inch kitchen table. Round tables are easier to slide in and out around." },
      { q: "Does the banquette come with a cushion?", a: "The cushion is optional, in Cream or Onyx. The bench is a finished solid wood seat on its own." },
      { q: "Does it ship assembled?", a: "No. It ships flat in one box with all hardware and instructions, free to any address in Canada." },
    ],
    related: ["dining-benches", "round-dining-tables", "kitchen-tables"],
  },
  {
    slug: "counter-vs-bar-height-stools",
    title: "Counter Height vs Bar Height Stools: Measure Before You Buy | Forgali",
    description: "The one measurement that decides whether you need a 24-inch counter stool or a 30-inch bar stool, how many stools fit an island, and backless versus stools with backs.",
    h1: "Counter Height vs Bar Height Stools",
    lead: "Measure from the floor to the underside of your counter. If it is 36 inches you need counter stools; if it is 42 inches you need bar stools. Everything else follows from that number.",
    updated: "2026-10-22",
    sections: [
      {
        h2: "The measurement",
        paragraphs: [
          "Kitchen counters and most islands are 36 inches high, and take a counter stool with a seat 24 to 26 inches off the floor. A raised bar, a pub table or a bar-height island is 42 inches high, and takes a bar stool with a 30 to 31 inch seat. The rule is 10 to 12 inches between the top of the seat and the underside of the counter, which is the space your thighs need.",
          "Get it wrong in either direction and the stools are unusable: a bar stool at a 36-inch counter pins your knees, and a counter stool at a 42-inch bar leaves you with your chin on the counter. Every Plank & Beam stool is sold in both heights, so measure first and then choose the style.",
        ],
        links: [
          { label: "Counter stools, 24 to 26 inch seat", href: "/category/dining?subcategory=counter-stools" },
          { label: "Bar stools, 30 to 31 inch seat", href: "/category/dining?subcategory=bar-stools" },
        ],
      },
      {
        h2: "How many stools fit",
        paragraphs: [
          "Allow 24 inches of counter per stool, measured centre to centre, and 6 inches between the edge of one seat and the next. A 6-foot island takes three stools, an 8-foot island takes four. If the stools have arms or a wide back, allow 28 inches.",
        ],
      },
      {
        h2: "Backless or with a back?",
        paragraphs: [
          "Backless stools like the Smythe and Beryl slide completely under the counter, which keeps a small kitchen looking open and keeps the walkway clear. They are also the least expensive, from $186 CAD, and the lightest to move. They suit an island people perch at for breakfast or a drink.",
          "Stools with a back, like the Solid Wood counter chair, the Elio, Sereno and Brio, and the Loar upholstered counter chair, are for an island that is the real table: homework, long breakfasts, guests who sit while you cook. An upholstered seat adds comfort for the same reason.",
        ],
      },
      {
        h2: "Matching stools to the kitchen",
        paragraphs: [
          "All of the stools come in Pecan, Walnut, Blonde and Black, which are the same finishes as the dining tables and chairs, so stools at the island and chairs at the table can match. With a white or grey kitchen, Walnut and Pecan add warmth; Black suits a darker or more modern kitchen; Blonde keeps a small kitchen light.",
        ],
        links: [
          { label: "All counter and bar stools", href: "/category/dining?subcategory=bar-counter-chairs" },
          { label: "Counter height tables", href: "/category/dining?subcategory=kitchen-tables" },
        ],
      },
    ],
    faqs: [
      { q: "What height stool for a 36-inch counter?", a: "A counter stool with a 24 to 26 inch seat. That leaves 10 to 12 inches of legroom under the counter." },
      { q: "What height stool for a 42-inch bar?", a: "A bar stool with a 30 to 31 inch seat." },
      { q: "How much space between bar stools?", a: "24 inches centre to centre for stools without arms, 28 inches with arms. A 6-foot island takes three stools." },
      { q: "Are backless stools comfortable?", a: "For short sits, yes, and the contoured seat on the Smythe and Beryl helps. For sitting longer than a meal, choose a stool with a back." },
    ],
    related: ["counter-stools", "bar-stools", "bar-counter-chairs"],
  },
  {
    slug: "coffee-table-size",
    title: "Coffee Table Size Guide: Length, Height and Distance from the Sofa | Forgali",
    description: "How long a coffee table should be for your sofa, how high it should sit, how far from the seat, and when a round table beats a rectangular one.",
    h1: "Coffee Table Size Guide",
    lead: "The right coffee table is about two-thirds the length of your sofa, level with the seat cushion, and 14 to 18 inches in front of it. This guide turns those rules into a size you can order.",
    updated: "2026-10-22",
    sections: [
      {
        h2: "Length: two-thirds of the sofa",
        paragraphs: [
          "Measure your sofa from arm to arm and take two-thirds. A standard three-seat sofa is 84 to 90 inches, which calls for a 54 to 60 inch coffee table; the 54-inch Classic, Contour and Forma tables are the fit. A 72 to 78 inch sofa takes a 48-inch table, and a loveseat or an apartment sofa takes a 40-inch table.",
          "If the table is much shorter than two-thirds, the sofa looks like it has lost something. If it is longer than the sofa, people have to walk around it to sit down.",
        ],
        links: [{ label: "All solid wood coffee tables", href: "/category/living?subcategory=coffee-tables" }],
      },
      {
        h2: "Height: level with the seat",
        paragraphs: [
          "A coffee table should be within an inch or two of the height of your sofa seat cushion, which is usually 16 to 18 inches. Level is easiest for setting down a drink; a touch lower looks lighter. Check the Details tab on each product for the exact height before you order, and measure your sofa seat with the cushions compressed.",
        ],
      },
      {
        h2: "Distance: 14 to 18 inches from the sofa",
        paragraphs: [
          "Leave 14 to 18 inches between the sofa seat and the table edge. Closer and you cannot get your legs past; further and you lean to reach. Leave at least 30 inches between the table and any other furniture or the TV stand so people can walk through.",
          "Add up the sofa depth, the 14 to 18 inch gap, the table depth and the 30-inch walkway, and you have the room depth the arrangement needs. In a narrow room, a 40-inch table or a round table saves the inches.",
        ],
      },
      {
        h2: "Round, square or rectangular?",
        paragraphs: [
          "Rectangular is the default for a straight sofa. Round is better with a sectional or an L-shaped arrangement, because people reach it from two directions and there is no corner pointed at the walkway, and it is the safer shape with toddlers. The 30-inch rounds suit a loveseat, the 34 to 36 inch rounds a full sofa. A 36-inch square, like the Forma square, suits a deep sofa or two sofas facing each other.",
        ],
        links: [
          { label: "Round coffee tables", href: "/category/living?subcategory=round-coffee-tables" },
          { label: "Side tables to match", href: "/category/living?subcategory=side-tables" },
        ],
      },
      {
        h2: "Storage underneath",
        paragraphs: [
          "If remotes, books and a laptop live on the coffee table, choose one with a lower shelf: the Modern coffee table with shelf in 40 and 48 inches, or any of the Forma tables. An open shelf keeps the top clear and still looks light from across the room.",
        ],
        links: [{ label: "Console table and sofa table guide", href: "/guides/console-table-behind-sofa" }],
      },
    ],
    faqs: [
      { q: "What size coffee table for an 84-inch sofa?", a: "About 54 inches long. Two-thirds of the sofa length is the rule, so a 48-inch table is fine with a 72-inch sofa and a 40-inch table with a loveseat." },
      { q: "How high should a coffee table be?", a: "Within an inch or two of your sofa seat height, which is usually 16 to 18 inches. Check the exact height in each product's Details tab." },
      { q: "How far should a coffee table be from the sofa?", a: "14 to 18 inches from the front of the seat cushion to the edge of the table." },
      { q: "Round or rectangular coffee table with a sectional?", a: "Round. A 34 or 36 inch round sits inside the corner of a sectional and is reachable from both sides." },
    ],
    related: ["coffee-tables", "round-coffee-tables", "side-tables"],
  },
  {
    slug: "console-table-behind-sofa",
    title: "Console Table Sizing: Behind a Sofa or in an Entryway | Forgali",
    description: "How wide and how tall a console table should be behind a sofa or in a hallway, the clearance to leave in an entryway, and when to choose a console with a shelf or cabinet.",
    h1: "Console Table Sizing: Behind a Sofa or in an Entryway",
    lead: "A console table is a narrow table for a wall or the back of a sofa. The width and height depend entirely on what it sits against, so measure that first.",
    updated: "2026-10-22",
    sections: [
      {
        h2: "Behind a sofa",
        paragraphs: [
          "A sofa table should be a few inches shorter than the sofa and no taller than the sofa back, so it reads as part of the sofa rather than a separate piece. Most three-seat sofas are 84 to 90 inches long with a 32 to 36 inch back, which takes a 56 or 66 inch console. A 72-inch sofa or a loveseat takes a 46 or 47 inch console.",
          "Use it for lamps when the sofa floats in the middle of the room and there is no wall for a side table, or as the divider between a living area and a dining area in an open plan.",
        ],
        links: [{ label: "All solid wood console tables", href: "/category/living?subcategory=console-tables" }],
      },
      {
        h2: "In an entryway or hallway",
        paragraphs: [
          "The constraint in an entryway is the walkway. Leave at least 36 inches clear in front of the table, which in a typical 42 to 48 inch wide hallway means a console no deeper than about 12 to 14 inches, and in a narrow condo entry means a 36-inch console or nothing. Check the depth in the Details tab; the Classic and Verso consoles are the slimmest.",
          "Width is then about the wall: a 36-inch console fits beside most front doors, a 46-inch console suits a standard entry wall, and 56 or 66 inches fills a long hallway or a mudroom wall.",
        ],
        links: [
          { label: "Console tables with storage", href: "/category/living?subcategory=console-tables-with-storage" },
          { label: "Entryway benches", href: "/category/living?subcategory=entryway" },
        ],
      },
      {
        h2: "Open base, shelf or cabinet?",
        paragraphs: [
          "An open base is the lightest look and the right choice behind a sofa. A lower shelf, like the Classic console with shelf or the Grande console with shelf, takes baskets and everyday shoes in an entryway. A cabinet, like the Mid-Century Modern console with storage, hides the clutter completely in a hallway you see from the living room.",
        ],
      },
      {
        h2: "Height",
        paragraphs: [
          "Console tables are around 30 inches high, roughly the same as a dining table, which is right for an entryway and for most sofa backs. If your sofa has a very low back, under 30 inches, measure before you buy so the table does not stand proud of it.",
        ],
        links: [{ label: "Coffee table size guide", href: "/guides/coffee-table-size" }],
      },
    ],
    faqs: [
      { q: "How long should a console table be behind a sofa?", a: "A few inches shorter than the sofa. A 56 or 66 inch console suits a standard 84 to 90 inch sofa, and a 46-inch console suits a loveseat." },
      { q: "How much space do you need in front of an entryway console?", a: "At least 36 inches of clear walkway, which rules out deep consoles in a narrow hallway." },
      { q: "Should a sofa table be taller than the sofa?", a: "No. Keep it level with or just below the sofa back." },
      { q: "Which console tables have storage?", a: "The Classic console with shelf in 36 and 46 inches, the Grande console with shelf, and the Mid-Century Modern console with storage, which has cabinets with pull-down doors." },
    ],
    related: ["console-tables", "console-tables-with-storage", "entryway"],
  },
  {
    slug: "solid-pine-furniture-care",
    title: "How to Care for Solid Pine Furniture in a Canadian Home | Forgali",
    description: "Cleaning, humidity, heat marks, scratches and sun fading: how to keep solid pine dining and living furniture looking right through Canadian winters and summers.",
    h1: "How to Care for Solid Pine Furniture",
    lead: "Solid pine is forgiving. It cleans with a damp cloth, it wears in rather than out, and the only thing it really dislikes is a Canadian winter with the humidity at ten percent. Here is what to do and what to skip.",
    updated: "2026-10-22",
    sections: [
      {
        h2: "Everyday cleaning",
        paragraphs: [
          "Wipe with a soft cloth that is damp, not wet, and dry it after. For sticky spots, a drop of dish soap in warm water. Skip furniture polish, silicone sprays and anything with ammonia or bleach: the finishes on Plank & Beam pieces are low-VOC coatings that do not need polish and can be dulled by solvents. Crumbs and grit on a dining table act like sandpaper under plates, so a quick wipe after meals matters more than any product.",
        ],
      },
      {
        h2: "Humidity, which is the Canadian problem",
        paragraphs: [
          "Wood takes on and gives up moisture with the air. In July a house in Toronto or Montreal can sit at 60 percent humidity and in January, with the furnace on, at 15 percent. Pine moves with that swing: tabletops can show a hairline gap at a panel join in winter and close up in summer. That is normal and not a defect.",
          "Keep the house between 35 and 50 percent humidity year round and the movement is minimal. A humidifier in winter does more for solid wood furniture than any care product. Keep tables away from heat registers, radiators and the direct blast of a wood stove, which dry one side of the wood faster than the other.",
        ],
      },
      {
        h2: "Heat, water and sun",
        paragraphs: [
          "Use trivets under hot pots and coasters under cold glasses. Heat and standing water are the two things that mark a finished wood top. Wipe spills when they happen rather than later. Direct sun through a south window will slowly lighten a Walnut or Pecan finish and yellow a Blonde one; rotate what sits on the table and consider a sheer if the table lives in the sun.",
        ],
      },
      {
        h2: "Scratches and dents",
        paragraphs: [
          "Pine is softer than oak or maple, which is why it is affordable and why it will show a dent from a dropped mug. Most owners treat that as character. For a scratch that shows the raw wood, a wax touch-up stick in a matching tone hides it; for a dent, a damp cloth and a warm iron held over the spot for a few seconds will often raise the fibres. Felt pads under everything that sits on the table, and under the legs of chairs and benches, prevent most of it.",
        ],
      },
      {
        h2: "Assembly and moving",
        paragraphs: [
          "Tighten the bolts a few weeks after assembly, once the joints have settled, and again if a table starts to wobble after a move. The Classic and Modern tables have a three-panel top that comes apart for moving: take it apart rather than carrying a 72-inch table assembled through a doorway. Lift, never drag, and carry tables by the apron or the legs, not by the top.",
        ],
        links: [
          { label: "Assembly guide", href: "/assembly" },
          { label: "Warranty", href: "/warranty" },
          { label: "Dining tables", href: "/category/dining?subcategory=dining-tables" },
        ],
      },
    ],
    faqs: [
      { q: "Can I use furniture polish on Plank & Beam furniture?", a: "No need, and better not. The low-VOC finish just needs a damp cloth. Polish and silicone sprays build up and can dull it." },
      { q: "Why is there a small gap in my tabletop in winter?", a: "Pine shrinks slightly when indoor humidity drops with the furnace on. The gap closes again in summer. Keeping the house at 35 to 50 percent humidity minimises it." },
      { q: "Does solid pine scratch easily?", a: "It is softer than oak, so it will show dents and scratches sooner. Felt pads, coasters and trivets prevent most of it, and small marks can be touched up with a wax stick." },
      { q: "Is the finish safe for a dining table?", a: "Yes. Plank & Beam uses hand-applied, low-VOC finishes. Wipe spills promptly and use trivets under hot dishes." },
    ],
    related: ["dining-tables", "coffee-tables", "sideboards"],
  },
  {
    slug: "plank-and-beam-finishes",
    title: "Plank & Beam Finishes Compared: Pecan, Walnut, Blonde, Black and More | Forgali",
    description: "What each Plank & Beam finish looks like, which collections carry it, and how to match a table, bench, coffee table and sideboard across the dining and living range.",
    h1: "Plank & Beam Finishes Compared",
    lead: "Four core finishes run across almost the whole range, and a few collections add their own. This is what each one looks like, where you can get it, and how to keep a room consistent.",
    updated: "2026-10-22",
    sections: [
      {
        h2: "The four core finishes",
        paragraphs: [
          "Pecan is a warm medium brown with the pine grain showing through, the most popular finish and the safest with a white or grey kitchen. Walnut is darker and cooler, the classic mid-century tone, and reads richer in a room with a lot of light. Blonde is a pale natural pine, the Scandinavian look, and the best choice for keeping a small or dark room bright. Black is a solid painted finish with the grain texture still visible, for a modern or contrasting look.",
          "All four are hand-applied, low-VOC finishes, and all four are available on the Classic, Modern, Mid-Century Modern, Verso, Contour, Forma and Lido collections, which is what makes it possible to match a dining table, chairs, a coffee table and a sideboard across the house.",
        ],
        links: [
          { label: "Dining tables", href: "/category/dining?subcategory=dining-tables" },
          { label: "Coffee tables", href: "/category/living?subcategory=coffee-tables" },
          { label: "Sideboards", href: "/category/living?subcategory=sideboards" },
        ],
      },
      {
        h2: "Wirebrush and Coastal White on the Classic and Modern tables",
        paragraphs: [
          "The Classic and Modern dining tables, benches and sets come in wirebrushed versions of Pecan, Walnut, Blonde and Black. Wirebrushing pulls the softer grain out of the pine before the finish goes on, so the surface has a visible, slightly open texture that looks and feels like reclaimed wood. Seashell Wirebrush is a pale grey-white, and Coastal White is a solid off-white that suits a farmhouse or coastal room. The Grande consoles come in wirebrushed finishes only.",
        ],
        links: [{ label: "Dining sets", href: "/category/dining?subcategory=dining-sets" }],
      },
      {
        h2: "Rustic finishes on Camden",
        paragraphs: [
          "The Camden dining table, bench, console and mantel come in Rustic Barnwood, a weathered grey, Rustic Honey, a warm natural tone, and Rustic Char on the dining pieces. These are the only finishes in the range that leave the knots fully visible, which is the point of the Camden look.",
        ],
        links: [{ label: "Camden mantel shelves", href: "/category/living?subcategory=shelves" }],
      },
      {
        h2: "Oak veneer on Arcata",
        paragraphs: [
          "The Arcata coffee table and console tables are the one collection with a real oak veneer over a solid pine and engineered core, which is what allows the continuous waterfall edge. They come in Cashew, a light oak, Hazelnut, a mid brown, Cerused White, a whitewashed oak with the grain picked out, and Noir, a black oak. They do not share finishes with the pine collections, so treat Arcata as an accent rather than something to match.",
        ],
        links: [{ label: "Console tables", href: "/category/living?subcategory=console-tables" }],
      },
      {
        h2: "Fabric and colour on chairs, stools and the entryway bench",
        paragraphs: [
          "Upholstered chairs pair a wood finish with a seat colour: Ivory on the Brio, Elio and Sereno, Sesame or Toffee on the Loar, Terracotta on the Elio, Marine and Evergreen on the Brio, and Cream, Moss or Charcoal microsuede on the Ernesto armchair. The Chesnee chair takes a washable slipcover in Chocolate, Bone, Concrete, Ocean Blue or Sand. The Mid-Century Modern entryway bench adds White, Clay, Teal, Yellow and Natural to the core four.",
        ],
        links: [
          { label: "Dining chairs", href: "/category/dining?subcategory=dining-chairs" },
          { label: "Entryway benches", href: "/category/living?subcategory=entryway" },
        ],
      },
      {
        h2: "Matching across rooms",
        paragraphs: [
          "Pick one of the four core finishes and stay in it for the big pieces: dining table, sideboard, coffee table, TV stand. Then mix within the same tone family for chairs and stools. Walnut and Black go together, Pecan and Blonde go together, and Black works as an accent against any of the other three. Fabric seats in Ivory or Sesame soften a room that is otherwise all wood.",
        ],
        links: [{ label: "Mid-Century Modern living room furniture", href: "/category/living?subcategory=mid-century-modern" }],
      },
    ],
    faqs: [
      { q: "What is the most popular Plank & Beam finish?", a: "Pecan, a warm medium brown that works with most kitchens and flooring. Walnut is the choice for a darker, mid-century look." },
      { q: "Is Plank & Beam Black a paint or a stain?", a: "A solid painted finish with the wood grain texture still visible, applied the same low-VOC way as the stains." },
      { q: "What does wirebrush mean?", a: "The softer grain is brushed out of the pine before finishing, leaving a textured surface that looks like reclaimed wood. It is available on the Classic and Modern dining pieces and the Grande consoles." },
      { q: "Can I match a dining table and a coffee table?", a: "Yes. Pecan, Walnut, Blonde and Black run across the dining and living collections, so a Modern dining table in Walnut matches a Modern coffee table and sideboard in Walnut." },
    ],
    related: ["dining-tables", "coffee-tables", "sideboards", "mid-century-modern"],
  },
]

/** Shop links a guide can point at (dining & living subcategory pages). */
export const RELATED_LINKS: Record<string, { label: string; href: string }> = {
  "dining-tables": { label: "Dining tables", href: "/category/dining?subcategory=dining-tables" },
  "round-dining-tables": { label: "Round & oval dining tables", href: "/category/dining?subcategory=round-dining-tables" },
  "kitchen-tables": { label: "Kitchen tables", href: "/category/dining?subcategory=kitchen-tables" },
  "dining-chairs": { label: "Dining chairs", href: "/category/dining?subcategory=dining-chairs" },
  "dining-benches": { label: "Dining benches", href: "/category/dining?subcategory=dining-benches" },
  "bar-counter-chairs": { label: "Counter & bar stools", href: "/category/dining?subcategory=bar-counter-chairs" },
  "counter-stools": { label: "Counter stools", href: "/category/dining?subcategory=counter-stools" },
  "bar-stools": { label: "Bar stools", href: "/category/dining?subcategory=bar-stools" },
  "dining-sets": { label: "Dining sets", href: "/category/dining?subcategory=dining-sets" },
  "coffee-tables": { label: "Coffee tables", href: "/category/living?subcategory=coffee-tables" },
  "round-coffee-tables": { label: "Round coffee tables", href: "/category/living?subcategory=round-coffee-tables" },
  "console-tables": { label: "Console tables", href: "/category/living?subcategory=console-tables" },
  "console-tables-with-storage": { label: "Console tables with storage", href: "/category/living?subcategory=console-tables-with-storage" },
  "side-tables": { label: "Side tables", href: "/category/living?subcategory=side-tables" },
  "sideboards": { label: "Sideboards", href: "/category/living?subcategory=sideboards" },
  "tv-stands": { label: "TV stands", href: "/category/living?subcategory=tv-stands" },
  "shelves": { label: "Mantel shelves", href: "/category/living?subcategory=shelves" },
  "entryway": { label: "Entryway benches", href: "/category/living?subcategory=entryway" },
  "mid-century-modern": { label: "Mid-Century Modern living", href: "/category/living?subcategory=mid-century-modern" },
};

const SITE = "https://www.forgali.com";

// Own-property lookup so a URL slug like "constructor" can't hit the prototype.
export const getGuide = (slug: string | undefined): Guide | null => {
  if (!slug) return null;
  return GUIDES.find((g) => g.slug === slug) ?? null;
};

export const relatedLinks = (g: Guide) =>
  g.related
    .filter((k) => Object.prototype.hasOwnProperty.call(RELATED_LINKS, k))
    .map((k) => RELATED_LINKS[k]);

/**
 * Article + BreadcrumbList + FAQPage for one guide. Shared by GuidePage and
 * middleware.ts so the injected and hydrated schema are byte-identical.
 */
export const guideJsonLd = (g: Guide): Array<Record<string, unknown>> => [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.h1,
    description: g.description,
    dateModified: g.updated,
    datePublished: g.updated,
    mainEntityOfPage: `${SITE}/guides/${g.slug}`,
    author: { "@type": "Organization", name: "Forgali", url: SITE },
    publisher: { "@type": "Organization", name: "Forgali", url: SITE },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Forgali", item: SITE },
      { "@type": "ListItem", position: 2, name: "Buying Guides", item: `${SITE}/guides` },
      { "@type": "ListItem", position: 3, name: g.h1, item: `${SITE}/guides/${g.slug}` },
    ],
  },
  faqPageJsonLd(g.faqs),
];

export const GUIDES_INDEX_SEO = {
  title: "Furniture Buying Guides – Sizing, Seating & Care | Forgali",
  description:
    "Plain-language guides to choosing solid wood furniture in Canada: dining table size, bench vs chairs, banquette nooks, counter vs bar stools, coffee and console table sizing, pine care and finishes.",
  path: "/guides",
  h1: "Furniture Buying Guides",
  lead: "Short, practical answers to the sizing and layout questions people ask before buying solid wood furniture, with the measurements that matter.",
};
