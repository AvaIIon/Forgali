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
  intro: string;          // buying-guide body rendered below the product grid
}

const BED_SEO: Record<string, CategorySeo> = {
  "loft-beds": {
    seoTitle: "Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop our collection of solid wood loft beds in low, mid and high styles that free up floor space. Free Canada-wide shipping and 30-day returns. Shop today.",
    h1: "Loft Beds",
    lead: "Solid wood loft beds in low, mid and high styles — free up the floor for a desk, storage or play.",
    intro:
      "A loft bed lifts the sleeping surface up onto sturdy posts, leaving the whole area underneath open — space you can turn into a desk nook, reading corner, dresser zone or extra room to play. That makes them a smart choice for smaller bedrooms where every square foot counts. In our loft bed collection you'll find 29 styles across three heights: low loft beds sit close to the floor and suit younger children, mid loft beds add a little more clearance below, and high loft beds free up the most space for a full workstation or storage. We carry them in Twin and Full sizes, so they can grow with your child through the school years.\n\nEvery loft bed is built from solid wood and comes in ten finishes — from White, Grey and Driftwood to warmer Pecan, Walnut and Espresso — to match any room. Some models add practical extras like a built-in bookcase and desk, an angled ladder for easier climbing, a privacy curtain, or a staircase with a slide. Prices start from $544.\n\nWhen choosing, look for full guardrails on the raised bed and keep in mind the widely published guideline that children under six shouldn't sleep on a raised loft or bunk. Every order ships free across Canada and is backed by 30-day returns.",
  },
  "bunk-beds": {
    seoTitle: "Bunk Beds Canada – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop 69 solid-wood bunk beds for kids and teens — twin-over-twin to full-over-full, with stairs, storage or trundle. Free Canada-wide shipping. Browse today.",
    h1: "Bunk Beds Canada",
    lead: "69 solid-wood bunk beds — twin-over-twin to full-over-full, with stairs, storage and trundle options.",
    intro:
      "Bunk beds are one of the smartest ways to fit two sleepers into a shared room, and our collection brings together 69 solid-wood models built to last through years of childhood. You'll find every popular configuration here: twin-over-twin for evenly matched siblings, twin-over-full when one child needs a little more room, and full-over-full for teens or sleepovers. Many designs add built-in stairs, under-bed storage drawers, or a pull-out trundle for a third guest — genuinely handy in smaller Canadian homes where floor space is tight.\n\nSizes range across Twin, Twin XL, Full and Queen, so you can match the bunk to your child's age and your room's footprint. Finishes span White, Grey, Espresso, Natural and more, making it easy to suit any bedroom. If a lower profile matters — for younger children or a room with low ceilings — look for styles that sit closer to the floor, so the top bunk feels more reassuring.\n\nFor safety, guardrails on the upper bunk are essential, and the top bunk is generally recommended for children aged six and up. Every bunk is made from solid wood and ships free across Canada, with 30-day returns. Prices start from $656 CAD.",
  },
  "single-beds": {
    seoTitle: "Single Beds Canada – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop 24 solid-wood single beds in Twin, Full and Queen, from $265. Free Canada-wide shipping and 30-day returns. Find a platform, house or trundle bed today.",
    h1: "Single Beds Canada",
    lead: "24 solid-wood single beds — platform, house and trundle styles in Twin, Full and Queen, from $265.",
    intro:
      "Looking for a single bed that stands up to years of kids' use? Our collection of 24 solid-wood single beds is built for growing rooms across Canada, with Twin, Full and Queen sizes so you can match the frame to your space and your child's age. You'll find a range of styles here, including low platform beds, playful house beds, and space-saving trundle beds that tuck a second sleep surface out of sight for sleepovers.\n\nA kids' platform bed is a popular starting point: the low profile makes climbing in and out easy for younger children, and the built-in slat support means you can skip a box spring. If you want a cosier, imaginative feel, a house-frame design turns bedtime into part of the fun. For shared or guest rooms, a trundle adds flexibility without taking up more floor space.\n\nEvery bed comes in solid wood, and you can choose from finishes like White, Grey, Espresso, Natural, Navy and more to suit any room. Prices start from $265, all in CAD. Shipping is free Canada-wide, and every order is backed by our 30-day returns, so you can order with confidence.",
  },
  "bedroom": {
    seoTitle: "Kids Beds Canada – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop kids beds in Canada from $265 — solid-wood bunk, loft and single beds with free Canada-wide shipping and easy 30-day returns. Find the right fit today.",
    h1: "Kids Beds Canada",
    lead: "122 solid-wood bunk, loft and single beds — including a wide range of Max & Lily, shipped across Canada.",
    intro:
      "Choosing a kids bed comes down to the room, your child's age, and how much they'll grow into it. Our collection brings together 122 solid-wood bunk, loft and single beds built to take everyday jumping, climbing and years of use. You'll find sizes to suit every stage — Twin and Twin XL for younger kids and space-tight rooms, and Full and Queen for teens or shared sleepovers.\n\nBunk and loft beds are a smart way to reclaim floor space: a loft frees the area underneath for a desk or play zone, while bunks sleep two without crowding a smaller room. As a general safety guideline, guardrails are recommended on all raised sleeping surfaces, and the top bunk is best kept for children over six.\n\nWe carry a wide range of Max & Lily beds, shipped across Canada with pricing in CAD and returns handled locally — so there's no cross-border hassle or surprise duties. Every frame is solid wood rather than particleboard, which holds up to growing kids and can often be repositioned as their needs change.\n\nBrowse the full range from $265, compare sizes and finishes, and pick a bed that fits both the room and the years ahead. Free Canada-wide shipping and 30-day returns come standard.",
  },
  "loft-beds|low-loft": {
    seoTitle: "Low Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Low loft beds sit close to the floor for younger kids, with room to play or store underneath. Solid wood, free Canada-wide shipping. Shop the collection.",
    h1: "Low Loft Beds",
    lead: "Loft beds that sit close to the floor — an easy first step up for younger children.",
    intro:
      "A low loft bed lifts the sleeping surface just high enough to open up usable space below, while keeping the mattress within easy reach. That makes it an ideal first step up for younger children and a smart fit for rooms with lower ceilings. Because the frame sits closer to the floor, kids can climb in and out on their own, and the open area underneath becomes a reading nook, a play zone, or room for bins and storage. Our low loft beds come in the Twin size, with prices starting from $544, and we carry them in finishes to suit any room, including White, Grey, Espresso, Pecan, Driftwood, Clay, Barnwood Brown, White Wash and Blonde. Every bed is made from solid wood, so it stands up to years of daily use. When choosing, look for a model with full guardrails on the elevated side, and keep in mind the widely shared guideline that younger children do best on lower sleeping heights. Not sure where to start? Browse the collection to compare heights and finishes. Every order ships free across Canada and is backed by our 30-day returns, with all prices in CAD.",
  },
  "loft-beds|mid-loft": {
    seoTitle: "Mid Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop mid loft beds in solid wood — a middle-height design that frees up room for storage or a desk while staying easy to reach. Free Canada-wide shipping.",
    h1: "Mid Loft Beds",
    lead: "A middle-height loft — enough clearance for a desk or storage, still easy to reach.",
    intro:
      "A mid loft bed sits right between a low loft and a high loft — raised enough to open up usable space underneath, but low enough that most kids can still climb up and settle in without much fuss. That middle-height clearance is what makes it so practical: there's room for a compact desk, a reading nook, a dresser, or bins for toys and clothes, while the mattress stays within easy reach for tucking in and changing the sheets.\n\nThe mid loft beds in our collection are made of solid wood and come in a Twin size, with prices from $544 CAD. When you're choosing one, measure your ceiling height first and leave enough headroom for your child to sit up comfortably on top. Look for sturdy guardrails on the open sides, and as a general guideline, the upper level of any loft is best suited to children around six and older.\n\nEvery mid loft bed we carry ships free across Canada and is backed by a 30-day return policy, so you can see how it works in the room with real confidence. Browse the finishes below to find the one that suits your space.",
  },
  "loft-beds|high-loft": {
    seoTitle: "High Loft Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "High loft beds lift the sleeping surface up high, freeing the floor below for a desk or dresser. Solid wood, free Canada-wide shipping. Shop finishes today.",
    h1: "High Loft Beds",
    lead: "Lift the bed to its tallest — a full desk, dresser or reading nook fits underneath.",
    intro:
      "A high loft bed lifts the mattress to its tallest position, turning the space underneath into a room of its own — the perfect spot for a desk, a dresser, a reading nook, or extra storage. It's a smart way to add function to a small bedroom without giving up floor space, which is why high loft beds (also called high sleeper beds) are a favourite for tweens and teens.\n\nOur collection includes 11 solid-wood designs, starting from $662, in both Twin and Full sizes. Many pair the raised bunk with built-in storage: you'll find styles with a bookcase, with a bookcase and desk, and a mid-century modern option for older kids. Choose from finishes like White, Grey, Pecan, Walnut, Driftwood, Clay, Barnwood Brown, and White Wash to suit any room.\n\nBecause the sleeping surface sits high, look for sturdy guardrails on all sides and a secure ladder. As a general safety guideline, high loft and bunk beds aren't recommended for children under six on the top level. Every order ships free across Canada and is backed by our 30-day returns.",
  },
  "loft-beds|loft-with-desk": {
    seoTitle: "Loft Beds With Desk – Solid Wood | Forgali",
    seoDescription:
      "Shop loft beds with a built-in desk and bookcase — a bed plus study space in one footprint. Solid wood, free Canada-wide shipping. Twin and Full sizes.",
    h1: "Loft Beds With Desk",
    lead: "Bed plus a built-in desk and bookcase in one footprint — ideal for small and shared rooms.",
    intro:
      "A loft bed lifts the sleeping surface up high and frees the space underneath for a real desk and bookcase, so a single footprint does the work of a whole study nook. It's one of the smartest ways to fit a bed and a workspace into a shared room, a small bedroom, or a dorm. In our collection you'll find both high loft and low loft designs — including styles like the Twin High Loft Bed with Bookcase and Desk and the Twin Low Loft Bed in White with Desk and Bookcase — in Twin and Full sizes to suit growing kids and teens.\n\nWhen you're choosing, measure your ceiling height and leave enough clearance for your child to sit up comfortably at the desk underneath. Look for full-length guardrails on the top, and keep in mind the general guideline that loft and bunk tops aren't recommended for children under six. Every loft bed we carry is built from solid wood, ships free across Canada, and is backed by 30-day returns, with prices from $662 CAD.",
  },
  "bunk-beds|low-bunk": {
    seoTitle: "Low Bunk Beds – Solid Wood, Free Shipping | Forgali",
    seoDescription:
      "Shop low bunk beds in Twin and Full — a lower height younger kids can climb more easily. Solid wood with free Canada-wide shipping. Browse the collection.",
    h1: "Low Bunk Beds",
    lead: "Bunks that sit closer to the floor — a reassuring first bunk for younger children.",
    intro:
      "Low bunk beds sit closer to the floor than a standard bunk, which makes them a reassuring first bunk for younger children and a smart fit for rooms with lower ceilings. Because the top mattress isn't as high, there's less distance to the floor and the climb up is shorter and easier — a big part of why parents searching for a low bunk bed for toddlers and preschoolers gravitate to this style.\n\nOur collection includes 12 solid-wood low bunks, starting from $656, in Twin and Full sizes so you can match the bed to your child's age and room. You'll find finishes ranging from crisp White and soft Grey to warm Pecan, Walnut and Driftwood, plus configurations with a classic ladder or a fuller staircase for the steadiest climb.\n\nWhen choosing, look for full-length guardrails on the top bunk, and keep in mind the widely published guideline that children under six shouldn't sleep up top. Every bed ships free across Canada, prices are in CAD, and returns are welcome within 30 days.",
  },
};

export const getBedSeo = (
  category: string | undefined,
  subcategory?: string | null
): CategorySeo | null => {
  if (!category) return null;
  if (subcategory && BED_SEO[`${category}|${subcategory}`]) {
    return BED_SEO[`${category}|${subcategory}`];
  }
  // Only fall back to the category-level entry when no subcategory is active —
  // an unmatched subcategory should keep the generic category page, not
  // mislabel itself with the parent's rich copy.
  if (!subcategory && BED_SEO[category]) return BED_SEO[category];
  return null;
};
