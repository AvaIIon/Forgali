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
    lead: "Solid wood loft beds in low, mid and high styles — free up the floor for a desk, storage or play.",
    intro:
      "A loft bed lifts the sleeping surface up onto sturdy posts, leaving the whole area underneath open — space you can turn into a desk nook, reading corner, dresser zone or extra room to play. That makes them a smart choice for smaller bedrooms where every square foot counts. In our loft bed collection you'll find 29 styles across three heights: low loft beds sit close to the floor and suit younger children, mid loft beds add a little more clearance below, and high loft beds free up the most space for a full workstation or storage. We carry them in Twin and Full sizes, so they can grow with your child through the school years.\n\nEvery loft bed is built from solid wood and comes in ten finishes — from White, Grey and Driftwood to warmer Pecan, Walnut and Espresso — to match any room. Some models add practical extras like a built-in bookcase and desk, an angled ladder for easier climbing, a privacy curtain, or a staircase with a slide. Prices start from $544.\n\nWhen choosing, look for full guardrails on the raised bed and keep in mind the widely published guideline that children under six shouldn't sleep on a raised loft or bunk. Every order ships free across Canada and is backed by 30-day returns.",
    sections: [
      {
        h2: "Low, Mid or High: Which Loft Bed Height?",
        body:
          "Height is the first decision, and it comes down to your child's age and your ceiling. A low loft bed sits closest to the floor, so younger children can climb in and out on their own and the space below still fits bins, a play mat or a reading nook. A mid loft bed raises the mattress enough for a compact desk or dresser underneath while keeping the top within easy reach for tucking in and changing sheets. A high loft bed lifts the sleeping surface to its tallest, turning the whole footprint below into a proper workstation or storage zone — the reason high loft beds (also sold as high sleeper beds) are the usual pick for tweens and teens.",
        links: [
          { label: "Low loft beds", href: "/category/loft-beds?subcategory=low-loft" },
          { label: "Mid loft beds", href: "/category/loft-beds?subcategory=mid-loft" },
          { label: "High loft beds", href: "/category/loft-beds?subcategory=high-loft" },
        ],
      },
      {
        h2: "Loft Beds With a Desk Underneath",
        body:
          "If the room has to be a bedroom and a study, a loft bed with a built-in desk does both jobs in one footprint. These designs pair the raised bed with a desk and bookcase below, so there's no separate desk to find floor space for — genuinely useful in a shared room or a small bedroom. They come in Twin and Full sizes, from $662.",
        links: [
          { label: "Loft beds with desk", href: "/category/loft-beds?subcategory=loft-with-desk" },
        ],
      },
      {
        h2: "Twin and Full Size Loft Beds",
        body:
          "Most loft beds are Twin, which suits younger children and the tightest rooms. A full size loft bed gives an older child or teen more sleeping room and still frees the same floor area underneath — worth the extra width if the room can take it. Both sizes appear across the collection, so you can filter by height first and check the size on each model.",
      },
      {
        h2: "Loft Bed Safety and Ceiling Height",
        body:
          "Measure your ceiling before you choose a height: your child should be able to sit up comfortably on the top without ducking. Look for full guardrails on every open side of the raised bed and a secure ladder or staircase. As a general guideline, the raised level of a loft or bunk bed isn't recommended for children under six. Every loft bed here is solid wood rather than particleboard, which is what keeps a raised frame rigid over years of climbing.",
      },
    ],
    faqs: [
      {
        q: "What age is a loft bed suitable for?",
        a: "As a general guideline, children under six shouldn't sleep on the raised level of a loft or bunk bed. Low loft beds sit closest to the floor and are the usual starting point for younger children, while high loft beds suit tweens and teens. Whatever the height, look for full guardrails on every open side.",
      },
      {
        q: "What's the difference between a low, mid and high loft bed?",
        a: "It's the height of the sleeping surface. A low loft sits close to the floor, leaving room underneath for play or storage and keeping the mattress within easy reach. A mid loft adds enough clearance for a compact desk or dresser. A high loft lifts the bed to its tallest, freeing the full space below for a desk, dresser or reading nook.",
      },
      {
        q: "Do loft beds come in a full size?",
        a: "Yes. We carry loft beds in both Twin and Full sizes. Twin suits younger children and smaller rooms; Full gives an older child or teen more sleeping room while freeing the same floor space underneath.",
      },
      {
        q: "How much do loft beds cost?",
        a: "Loft beds start from $544 CAD. High loft beds and models with a built-in desk and bookcase start from $662 CAD. All prices are in Canadian dollars, and shipping is free anywhere in Canada.",
      },
      {
        q: "How much ceiling height do I need for a loft bed?",
        a: "Measure from the floor to your ceiling before choosing a height, and leave enough headroom that your child can sit up comfortably on the top bunk without ducking. If the ceiling is low, a low or mid loft is the safer choice.",
      },
      {
        q: "Do you ship loft beds across Canada?",
        a: "Yes. Every loft bed ships free anywhere in Canada, is priced in Canadian dollars with no duties or brokerage to sort out, and is backed by 30-day returns handled locally.",
      },
    ],
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
  "dining": {
    seoTitle: "Plank & Beam Dining Furniture - Canada | Forgali",
    seoDescription: "Shop 86 Plank & Beam dining pieces in solid wood, from $169. Free shipping across Canada in CAD with easy 30-day returns. Explore the collection.",
    h1: "Plank & Beam Dining Furniture",
    lead: "Shop 86 Plank & Beam dining pieces in solid wood, from $169. Free shipping across Canada in CAD with easy 30-day returns.",
    intro: "Bringing Plank & Beam's dining range to Canada has never been simpler. Ordering direct from the brand's US site means paying FedEx to cross the border and living with a returns policy that excludes Canada entirely. We carry the full collection here in CAD, with free shipping Canada-wide and 30-day returns handled locally—no duties or brokerage to sort out. Our dining assortment spans 86 solid-wood pieces, from $169: dining tables, chairs and armchairs, benches, counter and bar stools, and complete sets that furnish a room in one order.\n\nStart with the table. Rectangular styles like the Camden Dining Table 72in seat larger gatherings, while a softer silhouette such as the Verso Oval Dining Table 62in eases traffic in tighter rooms. Match seating to suit—pull-up chairs, upholstered options, or an armchair like the Ernesto Dining Armchair at the heads—or skip the guesswork with a ready-made pairing such as the Classic Dining Set with Bench + 4 Chairs.\n\nFinishes range from crisp Coastal White and pale Blonde to warm Pecan and deep Walnut, plus Black, Rustic Barnwood, and textured Black Wirebrush. Choose a tone that grounds your space, then layer in benches or stools as your table grows.",
  },
  "living": {
    seoTitle: "Plank & Beam Living Room Furniture - Canada | Forgali",
    seoDescription: "Shop Plank & Beam living room furniture in solid wood — coffee tables, consoles and sideboards. Free shipping across Canada, priced in CAD. From $140.",
    h1: "Plank & Beam Living Room Furniture in Canada",
    lead: "Shop Plank & Beam living room furniture in solid wood — coffee tables, consoles and sideboards. Free shipping across Canada, priced in CAD. From $140.",
    intro: "Bringing Plank & Beam into a Canadian living room from the brand's US site means FedEx charges on top of the sticker price — and no returns, because their policy excludes Canada. We carry the full solid-wood living collection in CAD, with free shipping across Canada and easy 30-day returns, no duties or brokerage. Our 78 pieces cover the whole room: coffee tables, console and side tables, and sideboards, so you can furnish in one coherent look. Start with an anchor like the Arcata Coffee Table 45in, then layer in a Verso Round Side Table 24in beside the sofa. For storage and display, the Modern 3-Door Sideboard 59in and the Grande Console Table with Shelf 56in add function without bulk. Solid wood means these pieces wear in, not out. Choose a finish that suits your palette — warm tones like Hazelnut, Pecan, and Cashew, crisp neutrals in Coastal White or Cerused White, or a grounded look in Black, Noir, or Blonde. Mix a light table with a darker sideboard, or keep everything in one family for a calm, cohesive space. Prices start from $140, so it's easy to add a single accent or outfit the entire room. Not sure where to begin? Reach out and we'll help you pair shapes and finishes.",
  },
  "dining|dining-tables": {
    seoTitle: "Solid Wood Dining Table Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood Plank & Beam dining tables in Canada. Free Canada-wide shipping, priced in CAD, 30-day returns. Round, oval and rectangular styles from $317.",
    h1: "Solid Wood Dining Table Canada",
    lead: "Shop solid wood Plank & Beam dining tables in Canada. Free Canada-wide shipping, priced in CAD, 30-day returns. Round, oval and rectangular styles from $317.",
    intro: "Looking for a Plank & Beam dining table in Canada? Buying from the brand's US site means FedEx shipping on a table-sized parcel and no option to send it back, since their returns policy excludes Canada. We carry the range in CAD, ship free across Canada, and handle returns locally within 30 days, with no duties or brokerage fees to worry about.\n\nOur collection spans 28 solid wood dining tables from $317, in shapes to suit any room. Round tables like the Lido Round Dining Table 47in work beautifully in smaller kitchens and nooks, encouraging easy conversation. Oval tables such as the Verso Oval Dining Table 62in soften a room while seating more guests. Rectangular tables like the Camden Dining Table 72in are the classic choice for family dinners and dinner parties, with room to spare.\n\nTo choose, start with your space and seating needs, then pick a finish that fits your palette. Options range from light and airy tones like Blonde and Coastal White to warm mid-tones like Pecan and Rustic Honey, through to deeper looks in Walnut, Black, Rustic Barnwood and Rustic Char, plus the textured Seashell Wirebrush. Pair your table with benches for a relaxed feel or upholstered chairs for a more formal setting.",
  },
  "dining|dining-chairs": {
    seoTitle: "Solid Wood Dining Chairs Canada - Free Shipping | Forgali",
    seoDescription: "Shop 19 solid wood Plank & Beam dining chairs, from $169 CAD. Upholstered and wood-seat styles with free shipping across Canada and easy 30-day returns.",
    h1: "Solid Wood Dining Chairs in Canada",
    lead: "Shop 19 solid wood Plank & Beam dining chairs, from $169 CAD. Upholstered and wood-seat styles with free shipping across Canada and easy 30-day returns.",
    intro: "Solid wood dining chairs bring warmth and lasting structure to a table setting, and our collection of 19 Plank & Beam chairs gives Canadian homes a range that's genuinely hard to find here. Prices start from $169 CAD, and the line spans dining armchairs and side chairs in both upholstered and wood-seat designs, so you can match the comfort level your table calls for. Start with the seat: an upholstered chair like the Ernesto Dining Armchair adds cushioned support for long dinners, while a wood-seat style such as the Elio Dining Chair or Brio Dining Chair stays easy to wipe down and simple to pair. Finish is the next choice, with options including Black, Blonde, Pecan, and Antique White and Ivory to suit rooms from modern to traditional. Whether you're rounding out an existing table or seating a full one, there's a style to match. The Plank & Beam site does ship to Canada, but at FedEx rates and with no Canadian returns accepted. We carry the range in CAD with free shipping across the country and local 30-day returns, and no duties or brokerage. The Chesnee Dining Chair is another favourite worth a look.",
  },
  "dining|dining-benches": {
    seoTitle: "Solid Wood Dining Bench Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood dining benches in Canada, from $211 in CAD. Free Canada-wide shipping and easy 30-day returns. Find your seat today.",
    h1: "Solid Wood Dining Benches in Canada",
    lead: "Shop solid wood dining benches in Canada, from $211 in CAD. Free Canada-wide shipping and easy 30-day returns.",
    intro: "A dining bench earns its keep. Slide it under the table when it is not in use, seat two or three where a pair of chairs would go, and open up a tight dining room without crowding the walkway. Our collection of solid wood Plank & Beam dining benches spans 12 pieces in Canada, from $211 in CAD, so you can match the look and length of your table with room to spare. Start with length: a backless bench like the Camden Dining Bench 58in or the Verso Dining Bench 60in tucks flush against a table edge and works along a wall or an island. Prefer a snug, built-in feel? A banquette such as the Risa Banquette anchors a corner or breakfast nook and pairs nicely with chairs on the opposite side. Finish ties it to your room: choose warm Pecan or Walnut for a traditional table, Blonde or Coastal White to keep a space bright and airy, Black for contrast, or Rustic Barnwood for a lived-in, farmhouse note. Order from the Plank & Beam site and you pay FedEx to get it here and cannot return it — their policy excludes Canada. Forgali brings the range to you in CAD with free shipping across Canada and 30-day returns handled locally, no duties or brokerage.",
  },
  "dining|bar-counter-chairs": {
    seoTitle: "Counter & Bar Stools Canada - Solid Wood | Forgali",
    seoDescription: "Shop 13 solid-wood counter and bar stools in CAD, from $186. Free shipping across Canada and easy 30-day returns. Find your perfect island seat.",
    h1: "Counter & Bar Stools Canada",
    lead: "Shop 13 solid-wood counter and bar stools in CAD, from $186. Free shipping across Canada and easy 30-day returns.",
    intro: "Choosing between counter and bar stools comes down to one measurement: the height of your surface. Counter-height seats, like the Beryl Counter Stool 24in or the Elio Counter Chair 24in, suit a standard kitchen island, while a taller pub table or raised bar calls for a bar-height seat such as the Beryl Bar Stool 31in. As a rule, measure from the floor to the underside of your counter and leave room for legs. Our collection of 13 solid-wood counter and bar stools, priced from $186, spans clean-lined stools and backed chairs like the Brio Counter Chair 25in for extra support at mealtime. Finishes range from crisp Black and warm Blonde to rich Pecan and a soft Antique White and Ivory, so you can match an existing dining set or make the island a focal point. Backless stools tuck neatly away and keep sightlines open in smaller kitchens, while chairs with backs invite longer conversations. Every piece is genuine Plank & Beam. Their US site will ship here, but only at FedEx rates and with Canadian returns excluded — we carry the full range in CAD, ship free across the country, and handle 30-day returns locally, with no duties or brokerage fees.",
  },
  "dining|dining-sets": {
    seoTitle: "Solid Wood Dining Sets Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood dining sets in Canada — table plus bench or chairs, from $1,238. Free Canada-wide shipping and 30-day returns in CAD. Explore the collection.",
    h1: "Solid Wood Dining Sets Canada",
    lead: "Shop solid wood dining sets in Canada — table plus bench or chairs, from $1,238. Free Canada-wide shipping and 30-day returns in CAD.",
    intro: "A complete dining set takes the guesswork out of furnishing your dining room — the table, seating and finish are matched for you. Our collection brings together 14 solid wood Plank & Beam dining sets, starting from $1,238, so you can seat the whole family in one purchase. Choose the configuration that fits your space: a table paired with a bench and chairs for a relaxed, flexible look, or a table with four or six chairs for a more traditional setup. Benches slide neatly under the table when not in use, making them a smart pick for smaller rooms or growing households. Finishes run from crisp Coastal White and pale Blonde to warm Pecan Wirebrush, rich Walnut and bold Black, so it's easy to match your floors and cabinetry. Sizes span cozy four-seaters up to a roomy 72-inch table for larger gatherings. A dining set is exactly where cross-border ordering hurts most: the brand's US site charges FedEx freight on every carton and accepts no Canadian returns. Buying the full set here means one price in CAD, free shipping across Canada and local 30-day returns — no duties or brokerage fees to sort out. Shop our matched dining sets and set the table with confidence.",
  },
  "living|coffee-tables": {
    seoTitle: "Solid Wood Coffee Tables Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood Plank & Beam coffee tables in Canada, from $229 CAD. Round and rectangular styles with free Canada-wide shipping and easy 30-day returns.",
    h1: "Solid Wood Coffee Tables in Canada",
    lead: "Shop solid wood Plank & Beam coffee tables in Canada, from $229 CAD. Round and rectangular styles with free Canada-wide shipping and easy 30-day returns.",
    intro: "A coffee table anchors the living room, tying together your sofa, chairs and rug while giving you a surface for books, trays and everyday life. We carry 26 solid wood Plank & Beam coffee tables in Canada, starting from $229, in shapes to suit how you gather. A round top like the Forma Round Coffee Table 34in keeps traffic flowing in tighter seating areas and softens a room full of straight lines. Rectangular styles such as the Arcata Coffee Table 45in and the longer Classic Coffee Table 54in give you more room to spread out in front of a sofa. To choose, measure your seating: leave enough walking space around the table, and aim for a height close to your sofa cushions. Finishes range from light, natural tones like Blonde, Coastal White and Cerused White to warmer Hazelnut and Pecan, plus deep Black and Noir for contrast. The Plank & Beam US site does ship to Canada, but you pay FedEx for it and they accept no Canadian returns. Forgali carries the range in CAD, ships free across the country, and handles 30-day returns locally — no duties or brokerage.",
  },
  "living|console-tables": {
    seoTitle: "Solid Wood Console Tables Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood Plank & Beam console tables in Canada, from $158 CAD. Free Canada-wide shipping and easy 30-day returns. Browse widths and finishes today.",
    h1: "Solid Wood Console Tables in Canada",
    lead: "Shop solid wood Plank & Beam console tables in Canada, from $158 CAD. Free Canada-wide shipping and easy 30-day returns.",
    intro: "A console table is the hardest-working slim surface in your home — perfect behind a sofa, along an entryway, or under a hallway mirror. We carry 23 solid wood Plank & Beam console tables, starting from $158, in widths that suit everything from a compact foyer to a long living-room wall. Narrower designs around 56 inches, like the Arcata Console Table and the Grande Console Table with Shelf, tuck neatly into tighter spaces, while wider pieces such as the 66-inch Camden Console Table anchor larger rooms and hold more display or storage. Choose an open silhouette to keep sightlines airy, or a version with a lower shelf when you need a spot for baskets, books, or bins. Finishes range across Blonde, Hazelnut, Pecan and Coastal White for a lighter, natural look, plus Black, Cerused White and Rustic Barnwood when you want more contrast or character — easy to pair with existing wood tones. Ordering from the Plank & Beam US site adds FedEx freight and leaves you with no way to return it, since their policy excludes Canada. Forgali makes the range simple to buy: every table is priced in CAD, ships free across Canada, and comes with local 30-day returns and no duties or brokerage. Not sure on width? Measure your wall first, then leave a little breathing room on each side.",
  },
  "living|side-tables": {
    seoTitle: "Solid Wood Side Table Canada - Free Shipping | Forgali",
    seoDescription: "Shop 13 solid wood side and end tables in CAD, from $193. Free shipping across Canada plus easy 30-day returns. Browse round and clean-lined styles today.",
    h1: "Solid Wood Side & End Tables in Canada",
    lead: "Shop 13 solid wood side and end tables in CAD, from $193. Free shipping across Canada plus easy 30-day returns.",
    intro: "A side table earns its keep in every room, and our solid wood collection gives you 13 styles to place beside a sofa, frame a bed, or anchor a reading nook. Shop round silhouettes like the Verso Round Side Table 24in for softer corners, or clean-lined tops like the Classic Side Table 25in and Mid-Century Modern Side Table 24in when you want more room for a lamp and a stack of books. Heights vary, so match the top to your seat: a table roughly level with the sofa arm keeps drinks and remotes within easy reach. Finishes range from warm to crisp, with Walnut, Pecan and Blonde for grain-forward warmth and Black, Coastal White and White and Pecan for a cleaner or two-tone look. Because these are Plank & Beam pieces made from solid wood, they pair naturally with a matching coffee table or console and stand up to daily use. The brand's US site will ship to Canada, but at FedEx rates and with Canadian returns excluded, so Forgali carries the range in CAD, ships free across the country, and handles returns locally within 30 days. Prices start from $193, with no cross-border duties or brokerage to sort out. Browse the full collection and find the end table that fits your space.",
  },
  "living|sideboards": {
    seoTitle: "Solid Wood Sideboards Canada - Free Shipping | Forgali",
    seoDescription: "Shop solid wood sideboards and buffets in Canada from $671. Free Canada-wide shipping, priced in CAD with 30-day returns. Browse our 2 and 3-door storage.",
    h1: "Solid Wood Sideboards & Buffets in Canada",
    lead: "Shop solid wood sideboards and buffets in Canada from $671. Free Canada-wide shipping, priced in CAD with 30-day returns.",
    intro: "A sideboard is the workhorse of a dining room or living space, adding closed storage for linens, serveware and everyday clutter while giving you a surface to style. Our collection brings the Plank & Beam brand to Canada with seven solid wood sideboards and buffets, starting from $671 in CAD. Choose between compact 2-door designs and roomier 3-door pieces such as the Contour 2-Door Sideboard 59in, the Modern 3-Door Sideboard 59in and the Mid-Century Modern 3-Door Sideboard 59in, all built to anchor a room for years. Finishes span Black, Blonde, Pecan and Walnut, so you can match a warm, woody tone to your existing furniture or go graphic with a darker frame. When choosing, think about scale first: a 59in width suits most dining walls and doubles as a media console or entryway catch-all. Weigh door count against what you plan to store, then let the finish tie back to your table or flooring. A sideboard is heavy freight, which is exactly where the brand's US site stings: FedEx charges to cross the border, and no Canadian returns. Buying here means CAD pricing, free shipping across Canada and local 30-day returns, with no duties or brokerage fees. Browse the full range and find the storage piece that fits your space.",
  },
  "living|tv-stands": {
    seoTitle: "Solid Wood TV Stands Canada - Free Shipping | Forgali",
    seoDescription: "Shop 3 Plank & Beam TV stands in solid pine, from $654 CAD. Free Canada-wide shipping and easy 30-day returns. Fits screens up to 65 inches.",
    h1: "Solid Wood TV Stands in Canada",
    lead: "Media consoles in solid pine — built to hold the screen and hide the cable mess.",
    intro: "A TV stand has to do two jobs at once: carry the weight of a large screen without flexing, and swallow the boxes, consoles and cables that come with it. Our three Plank & Beam media consoles are built from knot-free solid pine with engineered-wood back panels, starting from $654 in CAD, and are sized for screens up to 65 inches.\n\nThe Modern TV Stand hides everything behind two soft-close doors, which is the right call if your living room doubles as a family space and you would rather not look at a router. The Contour TV Stand keeps a slimmer, lower profile for rooms where the television sits under a window or a mounted screen. The Mid-Century Modern TV Stand splits the difference with legs that lift it off the floor and make the room read larger.\n\nFinishes cover Blonde and Pecan for lighter rooms, and Walnut or Black when you want the console to recede behind the screen. Measure your screen's full width, not the diagonal, and allow a few inches on each side. Every stand ships free across Canada, is priced in CAD, and comes with 30-day returns handled locally.",
  },
  "living|shelves": {
    seoTitle: "Fireplace Mantel Shelf Canada - Solid Pine | Forgali",
    seoDescription: "Shop solid pine floating mantel shelves in Canada, from $317 CAD. Sizes 48, 60 and 72 inches, with free shipping and easy 30-day returns.",
    h1: "Fireplace Mantel Shelves in Canada",
    lead: "Floating mantels in 100% solid pine — over the fireplace, or anywhere a blank wall needs one good line.",
    intro: "A mantel shelf is one of the few pieces of furniture that changes a room without taking up any floor. The Camden Mantel is made from 100% solid pine, which means the knots and grain stay visible instead of being sanded into anonymity, and it mounts flush to the wall as a floating shelf.\n\nSize is the decision. The 48-inch suits a standard firebox or a narrow stretch of wall; the 60-inch is the middle ground most fireplaces want; the 72-inch is for a wide masonry surround or a long feature wall where a shorter shelf would look stranded. Prices start at $317 in CAD. Two finishes: Rustic Honey for a warmer, lighter grain, and Rustic Barnwood for a weathered, greyed look.\n\nIt does not have to sit above a fire. The same shelf works over a bed, along an entry hall, or above a desk — anywhere you want display space without a bracket-and-board look. Every mantel ships free across Canada with 30-day returns handled locally.",
  },
  "living|entryway": {
    seoTitle: "Entryway Bench Canada - Solid Wood | Forgali",
    seoDescription: "Shop solid wood entryway benches in Canada, from $140 CAD. Two lengths and eight finishes, with free Canada-wide shipping and 30-day returns.",
    h1: "Entryway Benches in Canada",
    lead: "A place to sit and pull your boots off — in solid pine and birch, from $140.",
    intro: "An entryway bench solves a small problem that happens every single day: somewhere to sit while you deal with boots. The Mid-Century Modern Entryway Bench is built from solid pine and birch, starting at $140 in CAD, and comes in two lengths.\n\nThe 41-inch fits a typical front hall or the end of a bed without crowding the walkway. The 56-inch seats two comfortably and suits a wider mudroom or a long blank wall. Both sit on tapered legs, so a boot tray or a pair of baskets slides underneath and the floor stays visible — which keeps a narrow entry feeling wider than it is.\n\nFinishes run further than most of the range: Natural, White, Black, Pecan and Walnut for something quiet, or Teal, Clay and Yellow if the entry is where you would rather have some colour. The bench is equally at home at the foot of a bed or on a covered porch. Ships free across Canada, priced in CAD, 30-day returns handled locally.",
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
