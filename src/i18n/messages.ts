import type { Locale } from "./locale";

// UI dictionary for the storefront chrome: header, footer, cart, product page,
// checkout, static pages and homepage sections. Keys are flat, dotted by
// surface ("cart.subtotal"). English values are the strings the English pages
// rendered before the dictionary existed, byte for byte; the `fr` type is
// derived from `en`, so a key missing in French fails typecheck.
//
// Strings with variables carry `{name}` placeholders filled by t(key, vars)
// (see interpolate() below). Plurals are separate keys chosen at the call site.
//
// Editorial data modules (src/lib/categorySeo.ts, guides.ts, staticPageSeo.ts,
// subcategories.ts, siteFaqs.ts, categoryInfo.ts) are NOT in here; they are
// Phase 4. The small slug-keyed maps at the bottom only translate what those
// modules feed into the UI (subcategory tab names, category names) until then.
//
// Québec French conventions: lit simple / lit double / grand lit (queen),
// lit mezzanine, lit superposé, lit gigogne, "fini" for finish, "magasiner"
// for shop, "courriel" for email, "caisse" for checkout, a space before ":" and
// before "$"/"%" (U+00A0), none before "?" or "!".
const en = {
  // --- shared -------------------------------------------------------------
  from: "From ",
  country: "Country:",
  language: "Language",
  searchPlaceholder: "Search our store",
  checkoutWithShopify: "Checkout with Shopify",
  processing: "Processing...",
  "common.continueShopping": "Continue Shopping",
  "common.freeShipping": "Free Canada-Wide Shipping",
  "common.returns30": "30-Day Returns",
  "common.secureCheckout": "Secure Checkout",
  "common.loadingError": "Error loading products",
  "common.faq": "Frequently Asked Questions",
  "common.shopDining": "Shop Dining",
  "common.shopLiving": "Shop Living",
  "common.shopBedroom": "Shop Bedroom",
  "common.somethingWrong": "Something went wrong — please try again.",
  "common.checkoutUnavailable": "Checkout temporarily unavailable",
  "common.checkoutUnavailableBody1":
    "We can't start the secure checkout right now. Please try again shortly, or email ",
  "common.checkoutUnavailableBody2": " and we'll complete your order by email. Your cart is saved.",
  "common.tagline": "SOLID WOOD FURNITURE",

  // --- header + nav -------------------------------------------------------
  "header.openMenu": "Open menu",
  "header.menu": "Menu",
  "header.expand": "Expand {label}",
  "header.home": "Forgali home",
  "header.yourAccount": "Your account",
  "header.yourAccountTitle": "Your Account",
  "header.signOut": "Sign Out",
  "header.signIn": "Sign in to your account",
  "header.openCart": "Open cart",
  "header.openCartOne": "Open cart, {count} item",
  "header.openCartMany": "Open cart, {count} items",
  "nav.dining": "Dining",
  "nav.dining.shopAll": "Shop All Dining →",
  "nav.dining.shop": "Shop Dining →",
  "nav.dining.alt": "Shop Dining",
  "nav.living": "Living",
  "nav.living.shopAll": "Shop All Living →",
  "nav.living.shop": "Shop Living →",
  "nav.living.alt": "Shop Living",
  "nav.bedroom": "Bedroom",
  "nav.bedroom.shopAll": "Shop All Bedroom →",
  "nav.bedroom.shop": "Shop Bedroom →",
  "nav.bedroom.alt": "Shop Bedroom",
  "nav.storage": "Storage & Accessories",
  "nav.storage.shopAll": "Shop All Storage & Accessories →",
  "nav.storage.shop": "Shop Storage & Accessories →",
  "nav.storage.alt": "Shop Storage & Accessories",
  "nav.smartDeals": "Smart Deals",
  "nav.diningTables": "Dining Tables",
  "nav.diningChairs": "Dining Chairs",
  "nav.diningBenches": "Dining Benches",
  "nav.barCounterChairs": "Bar & Counter Chairs",
  "nav.diningSets": "Dining Sets",
  "nav.coffeeTables": "Coffee Tables",
  "nav.consoleTables": "Console Tables",
  "nav.sideTables": "Side Tables",
  "nav.sideboards": "Sideboards",
  "nav.tvStands": "TV Stands",
  "nav.shelves": "Shelves",
  "nav.bunkBeds": "Bunk Beds",
  "nav.loftBeds": "Loft Beds",
  "nav.singleBeds": "Single Beds",
  "nav.bedsWithSlide": "Beds with Slide",
  "nav.bedsWithStairs": "Beds with Stairs",
  "nav.toddlerFloorBeds": "Toddler & Floor Beds",
  "nav.mattresses": "Mattresses",
  "nav.dressersStorage": "Dressers & Storage",
  "nav.nightstands": "Nightstands",
  "nav.desks": "Desks",
  "nav.bookcasesShelves": "Bookcases & Shelves",

  // --- footer -------------------------------------------------------------
  "footer.shop": "Shop",
  "footer.support": "Support",
  "footer.company": "Company",
  "footer.followUs": "Follow Us",
  "footer.accessories": "Accessories",
  "footer.contactUs": "Contact Us",
  "footer.faqs": "FAQs",
  "footer.shippingInfo": "Shipping Info",
  "footer.returns": "Returns",
  "footer.assemblyGuide": "Assembly Guide",
  "footer.buyingGuides": "Buying Guides",
  "footer.aboutForgali": "About Forgali",
  "footer.warranty": "Warranty",
  "footer.safetyStandards": "Safety Standards",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms of Service",
  "footer.copyright": "© 2026 Forgali. All rights reserved.",
  "footer.poweredBy": "Powered by Avallon",

  // --- cart drawer --------------------------------------------------------
  "cart.title": "Shopping Cart",
  "cart.empty": "Your cart is empty",
  "cart.unavailableRemove": "No longer available — please remove",
  "cart.decrease": "Decrease quantity of {name}",
  "cart.increase": "Increase quantity of {name}",
  "cart.remove": "Remove {name} from cart",
  "cart.completeRoom": "Complete the room",
  "cart.subtotal": "Subtotal",
  "cart.shippingNote": "Free shipping · arrives in 12-18 business days · taxes calculated at checkout",
  "cart.afterpay": "Or pay in 4 interest-free payments with Afterpay.",
  "cart.checkout": "Checkout",

  // --- product cards ------------------------------------------------------
  "product.saveBadge": "save ${amount}",
  "product.new": "NEW",
  "product.bestSeller": "BEST SELLER",
  "product.sale": "SALE",

  // --- homepage sections --------------------------------------------------
  "home.seoTitle": "Forgali — Solid Wood Furniture for Every Room",
  "home.seoDescription":
    "Solid wood furniture families trust — kids' bunk and loft beds, dining tables and chairs, and living-room pieces. Free Canada-wide shipping.",
  "home.featured": "Featured Furniture",
  "home.loadError": "We couldn't load products right now.",
  "home.browseDining": "Browse the Dining collection",
  "home.loadErrorTail": " instead.",
  "home.shopAll": "Shop All →",
  "home.shopByCategory": "Shop By Category",
  "hero.alt": "Solid wood dining room with Plank & Beam oval table and upholstered chairs",
  "hero.kicker": "SOLID WOOD FOR EVERY ROOM",
  "hero.title": "Solid Wood Furniture Families Trust, from Bedroom to Dining Room",
  "hero.lead": "Solid-wood dining, living, and kids’ bedroom pieces — free shipping across Canada.",
  "hero.ctaDining": "Shop Dining & Living",
  "hero.ctaBeds": "Shop Kids’ Beds",
  "brand.title": "Furniture Built to Live With",
  "brand.body1":
    "We design solid wood pieces for real life — the kind that looks great in your space, holds up to everyday use, and skips the “how is it ",
  "brand.bodyEm": "that",
  "brand.body2":
    " expensive?” price tag. Good design and real quality shouldn’t feel out of reach, so ours are designed smart, priced fair, and made to last.",
  "brand.cta": "Shop the Collection",
  "brand.learnMore": "Learn more about Forgali →",
  "brand.alt": "Plank & Beam Arcata solid wood console table",
  "strip.warranty": "Warranty Coverage",
  "strip.safety": "Built to Safety Standards",
  "promo.alt":
    "Plank & Beam solid wood dining set — natural oak table with walnut chairs in a sunlit dining room",
  "promo.kicker": "Dining Event",
  "promo.titleEm": "Every",
  "promo.titleRest": " Dining Piece Is On Sale",
  "promo.body":
    "Solid wood tables, chairs and benches from $169 — built to stand up to Sunday dinners for generations. Free Canada-wide shipping.",
  "promo.cta": "Shop Dining Deals",
  "promo.browse": "Browse all dining →",
  "look.shopItem": "Shop {title}",
  "look.shopNow": "Shop Now →",
  "look.aria": "Shop the Look",
  "look.title": "Made for Real Gatherings",
  "look.lead": "Shop the look — tap a number to shop the piece",
  "look.alt":
    "Plank & Beam dining room — Lido oval dining table with Sereno dining chairs and an Arcata console table",
  "look.adding": "Adding the look…",
  "look.added": "Look added to cart ✓",
  "look.partial": "Added {added} of {total} pieces",
  "look.addAll": "Add the Whole Look to Cart · {total}",
  "look.note": "Adds the table, one chair, and the console in the finishes shown.",
  "look.partialNote": "Currently unavailable: {pieces} — the rest of the look is in your cart.",
  "look.error": "Couldn’t add the look — try the pieces individually.",
  "newsletter.invalidEmail": "Please enter a valid email address.",
  "newsletter.aria": "Email signup",
  "newsletter.title": "Join the Forgali List",
  "newsletter.lead": "News, offers, and early access to new arrivals — straight to your inbox.",
  "newsletter.done": "You're in! Watch your inbox for news and offers.",
  "newsletter.already": "This email already has a Forgali account — you're on the list.",
  "newsletter.emailLabel": "Email address",
  "newsletter.placeholder": "Your email address",
  "newsletter.subscribe": "Subscribe",

  // --- category page, tabs, filters ----------------------------------------
  "category.notFoundSeoTitle": "Category Not Found | Forgali",
  "category.notFoundSeoDescription": "This category could not be found.",
  "category.notFoundTitle": "We couldn't find that category",
  "category.loading": "Loading products...",
  "category.empty": "No products found in this category.",
  "category.about": "About {name}",
  "tabs.shopAllBedroom": "Shop All Bedroom",
  "tabs.shopAllMattresses": "Shop All Mattresses",
  "tabs.shopAll": "Shop All",
  "filter.under500": "Under $500",
  "filter.500to1000": "$500 - $1,000",
  "filter.1000to2000": "$1,000 - $2,000",
  "filter.over2000": "Over $2,000",
  "filter.price": "Price",
  "filter.bedSize": "Bed Size",
  "filter.finish": "Finish",
  "filter.clear": "Clear",
  "filter.sortBy": "Sort by",
  "filter.sizeTwin": "Twin",
  "filter.sizeFull": "Full",
  "filter.sizeQueen": "Queen",
  "filter.sizeTwinXl": "Twin XL",
  "sort.featured": "Featured",
  "sort.priceLow": "Price: Low to High",
  "sort.priceHigh": "Price: High to Low",

  // --- product page -------------------------------------------------------
  "pdp.loading": "Loading product...",
  "pdp.notFoundSeoTitle": "Product Not Found | Forgali",
  "pdp.errorSeoTitle": "Something Went Wrong | Forgali",
  "pdp.notFoundSeoDescription": "This product could not be found.",
  "pdp.notFoundTitle": "We couldn't find that product",
  "pdp.errorTitle": "Something went wrong",
  "pdp.notFoundBody":
    "It may have been renamed or is no longer available — but the rest of the collection is right here.",
  "pdp.errorBody": "Please try again in a moment.",
  "pdp.seoDescriptionFallback": "{name} — solid wood furniture with free Canada-wide shipping from Forgali.",
  "pdp.home": "Home",
  "pdp.prevImage": "Previous image",
  "pdp.nextImage": "Next image",
  "pdp.viewImage": "View image {index} of {total}",
  "pdp.thumbAlt": "{name} {finish} view {index}",
  "pdp.percentOff": "{percent}% OFF",
  "pdp.optionColon": ":",
  "pdp.decrease": "Decrease quantity",
  "pdp.increase": "Increase quantity",
  "pdp.addToCart": "Add to Cart",
  "pdp.outOfStock": "Out of Stock",
  "pdp.unavailable": "Unavailable",
  "pdp.returnsLower": "30-day returns",
  "pdp.secureCheckoutLower": "Secure checkout",
  "pdp.solidWood": "Solid wood",
  "pdp.fastShipping": "Fast Shipping",
  "pdp.solidWood100": "100% Solid Wood",
  "pdp.completeRoom": "Complete the Room",
  "pdp.completeRoomLead": "Pieces from the same family, made to match.",
  "pdp.youMayAlsoLike": "You May Also Like",
  "pdp.deliveryWindow": "12-18 business days",
  "pdp.material": "Material",
  "pdp.weightCapacity": "Weight capacity",
  "pdp.recommendedMattress": "Recommended mattress",
  "pdp.assembly": "Assembly",
  "pdp.tabDetails": "Details",
  "pdp.tabDescription": "Description",
  "pdp.tabShipping": "Shipping",
  "pdp.tabShippingLong": "Shipping Information",
  "pdp.freeShippingTitle": "Free Canada-wide shipping",
  "pdp.freeShippingBody": "Standard delivery is {window} from the day your order is placed.",
  "pdp.returnsBody": "Return an unused item in its original packaging within 30 days of delivery.",
  "pdp.flatPackTitle": "Flat-packed for assembly",
  "pdp.flatPackBody": "Hardware, tools and step-by-step instructions are included in the box.",
  "pdp.shippingDetails": "Shipping details",
  "pdp.returnsPolicy": "Returns policy",
  "pdp.assemblyGuide": "Assembly guide",

  // --- search -------------------------------------------------------------
  "search.seoTitleQuery": "Search: {query} | Forgali",
  "search.seoTitle": "Search | Forgali",
  "search.resultsFor": "Search results for ",
  "search.title": "Search",
  "search.foundOne": "{count} product found",
  "search.foundMany": "{count} products found",
  "search.searching": "Searching...",
  "search.noMatch": "No products matched your search.",
  "search.typeAbove": "Type in the search box above to find products.",
  "search.tryOther": "Try a different word, or browse a category:",

  // --- smart deals --------------------------------------------------------
  "deals.title": "Smart Deals",
  "deals.lead":
    "Save on solid wood furniture for every room — dining, living, and bedroom. Sale prices with free Canada-wide shipping.",
  "deals.loading": "Loading deals...",
  "deals.all": "All Deals",
  "deals.countOne": "{count} deal",
  "deals.countMany": "{count} deals",
  "deals.none": "No products on sale at the moment.",
  "deals.dining.seeAll": "See all {count} Dining deals →",
  "deals.dining.shopAll": "Shop all Dining →",
  "deals.living.seeAll": "See all {count} Living deals →",
  "deals.living.shopAll": "Shop all Living →",
  "deals.bedroom.seeAll": "See all {count} Bedroom deals →",
  "deals.bedroom.shopAll": "Shop all Bedroom →",

  // --- checkout page ------------------------------------------------------
  "checkout.seoTitle": "Checkout | Forgali",
  "checkout.emptyTitle": "Your cart is empty",
  "checkout.emptyBody": "Add some products to your cart to checkout.",
  "checkout.back": "Back to shopping",
  "checkout.title": "Checkout",
  "checkout.howItWorks": "How it works",
  "checkout.step1": "Review your order summary on this page.",
  "checkout.step2": "Continue to our secure checkout to enter your contact details and shipping address.",
  "checkout.step3":
    "Pay by credit card, PayPal, Apple Pay, or Google Pay — taxes are calculated there from your address.",
  "checkout.step4":
    "Want to spread it out? Choose Afterpay at the payment step to split your total into 4 interest-free payments.",
  "checkout.pci": "Payments are processed on our encrypted, PCI-compliant checkout.",
  "checkout.continue": "Continue to Secure Checkout",
  "checkout.orderSummary": "Order Summary",
  "checkout.unavailable": "No longer available — ",
  "checkout.remove": "remove",
  "checkout.shipping": "Shipping",
  "checkout.free": "FREE",
  "checkout.arrives": "Arrives in 12-18 business days",
  "checkout.tax": "Tax",
  "checkout.taxCalculated": "Calculated at checkout",
  "checkout.totalBeforeTax": "Total before tax",

  // --- login dialog -------------------------------------------------------
  "login.enterBoth": "Please enter both email and password.",
  "login.incorrect": "Incorrect email or password.",
  "login.fillAll": "Please fill in every field.",
  "login.passwordMin": "Password must be at least 5 characters.",
  "login.couldNotCreate": "Could not create your account.",
  "login.description": "Sign in to your Forgali account, or create one in seconds.",
  "login.signIn": "Sign In",
  "login.createAccount": "Create Account",
  "login.email": "Email",
  "login.password": "Password",
  "login.emailPlaceholder": "you@example.com",
  "login.passwordPlaceholder": "Your password",
  "login.signingIn": "Signing in...",
  "login.firstName": "First name",
  "login.lastName": "Last name",
  "login.passwordHint": "At least 5 characters",
  "login.creating": "Creating account...",

  // --- 404 ----------------------------------------------------------------
  "notFound.seoTitle": "Page Not Found | Forgali",
  "notFound.title": "We couldn't find that page",
  "notFound.body": "The link may be broken or the page may have moved — but there's plenty more to explore.",
  "notFound.home": "Back to Home",

  // --- guides -------------------------------------------------------------
  "guide.shopPieces": "Shop the pieces in this guide",
  "guide.trust": "Free Canada-wide shipping · 30-day returns · 5-year limited warranty",
  "guide.more": "More buying guides",
  "guide.lastUpdated": "Last updated {date}.",

  // --- contact page -------------------------------------------------------
  "contact.subject": "Website enquiry from {name}",
  "contact.aCustomer": "a customer",
  "contact.bodyName": "Name: ",
  "contact.bodyEmail": "Email: ",
  "contact.copyTo": "To: ",
  "contact.copySubject": "Subject: ",
  "contact.title": "Contact Us",
  "contact.lead": "Our friendly team is here to help you find the perfect bed for your family.",
  "contact.email": "Email",
  "contact.respond24": "We'll respond within 24 hours",
  "contact.phone": "Phone",
  "contact.hoursLine": "Monday to Friday, 9:00 AM to 5:00 PM EST",
  "contact.supportHours": "Support Hours",
  "contact.monFri": "Monday - Friday",
  "contact.hours": "9:00 AM - 5:00 PM EST",
  "contact.onlineOnly": "Online Only",
  "contact.onlineBody": "100% online store with no retail showroom",
  "contact.servingCanada": "Serving all of Canada with free shipping",
  "contact.formTitle": "Send us a message",
  "contact.sentTitle": "Thanks — your message is on its way",
  "contact.sentBody1": "It's landed in our inbox and we'll reply to ",
  "contact.sentBody2": " within 24 hours, Monday to Friday.",
  "contact.sendAnother": "Send another message",
  "contact.errorTitle": "We couldn't send that automatically",
  "contact.errorBody1":
    "Sorry — something went wrong on our end. Your message is safe and still written out below; here are three ways to get it to ",
  "contact.errorBody2": ".",
  "contact.readyTitle": "Your message is ready to send",
  "contact.readyBody1": "We've opened your email app with this message addressed to ",
  "contact.readyBody2": ". Press send there and we'll reply within 24 hours.",
  "contact.sendYourself": "Send it yourself",
  "contact.nothingOpened": "Nothing opened?",
  "contact.pickEasiest": "Pick whichever is easiest — your message is already written.",
  "contact.normalBrowser":
    "That's normal if you read your mail in a browser. Use one of these instead — your message is already written.",
  "contact.copied": "Copied",
  "contact.copyMessage": "Copy message",
  "contact.openGmail": "Open in Gmail",
  "contact.openOutlook": "Open in Outlook",
  "contact.writeDirectly": "Or write to us directly at",
  "contact.backEdit": "Back to edit my message",
  "contact.name": "Name",
  "contact.message": "Message",
  "contact.sending": "Sending…",
  "contact.send": "Send Message",
  "contact.replyNote": "We'll reply within 24 hours, Monday to Friday.",
  "contact.opensMailApp": "This opens your email app with the message ready to send.",
  "contact.preferDirect": "Prefer to reach us directly? Email",
  "contact.orCall": "or call",

  // --- FAQs page ----------------------------------------------------------
  "faqs.title": "Frequently Asked Questions",
  "faqs.lead": "Find answers to common questions about our products, shipping, and policies.",

  // --- warranty page ------------------------------------------------------
  "warranty.title": "Warranty Information",
  "warranty.lead": "Your investment is protected with our comprehensive warranty coverage.",
  "warranty.limited": "Limited Warranty",
  "warranty.body":
    "Forgali warrants that all products are free from defects in materials and workmanship under normal use for a period of 5 years from the date of purchase. This warranty covers structural defects and manufacturing flaws.",
  "warranty.covered": "What's Covered",
  "warranty.covered1": "Structural defects in solid wood components",
  "warranty.covered2": "Manufacturing defects in hardware and assembly",
  "warranty.covered3": "Premature wear of finish under normal use",
  "warranty.notCovered": "What's Not Covered",
  "warranty.notCovered1": "Damage from misuse, abuse, or accidents",
  "warranty.notCovered2": "Normal wear and tear",
  "warranty.notCovered3": "Damage from improper assembly",
  "warranty.notCovered4": "Modifications made to the product",
  "warranty.claim": "How to Make a Claim",
  "warranty.claimBody":
    "To make a warranty claim, please contact our customer service team with your order number, photos of the issue, and a description of the problem. We'll review your claim and provide a resolution within 5-7 business days.",

  // --- terms page ---------------------------------------------------------
  "terms.title": "Terms of Service",
  "terms.lead": "The terms that apply when you shop with us. Effective July 2026.",
  "terms.ordersTitle": "Orders & Acceptance",
  "terms.ordersBody":
    "Placing an order is an offer to purchase. We confirm orders by email, and we reserve the right to decline or cancel an order — for example, if an item is unavailable or a pricing error occurs. Where we cancel an order you have paid for, we issue a full refund.",
  "terms.pricingTitle": "Pricing & Payment",
  "terms.pricingBody":
    "All prices are shown in Canadian dollars (CAD). Applicable taxes are calculated at checkout based on your shipping address. We make every effort to display accurate prices and product information; in the rare event of an error, we'll contact you before processing the affected order.",
  "terms.shippingTitle": "Shipping, Returns & Warranty",
  "terms.shippingBody1": "Delivery, returns, and warranty coverage are governed by our",
  "terms.shippingLink": "Shipping",
  "terms.returnsLink": "Returns",
  "terms.warrantyLink": "Warranty",
  "terms.and": ", and",
  "terms.shippingBody2": " pages, which form part of these terms.",
  "terms.useTitle": "Use of This Site",
  "terms.useBody":
    "You agree to use this site lawfully and not to interfere with its operation or security. Product images and content are provided for your personal, non-commercial use.",
  "terms.contactTitle": "Contact",
  "terms.contactBody": "Questions about these terms? Email",
  "terms.seeAlso": "See also our",

  // --- privacy page -------------------------------------------------------
  "privacy.title": "Privacy Policy",
  "privacy.lead": "How we handle your information. Effective July 2026.",
  "privacy.collectTitle": "Information We Collect",
  "privacy.collect1":
    "When you place an order, our checkout is handled by Shopify, which collects the information needed to process and ship your order — your name, email address, shipping and billing address, and payment details. Payment card information is processed by Shopify's PCI-compliant payment system; we never see or store your full card number.",
  "privacy.collect2":
    "If you subscribe to our emails or create an account, we collect your email address (and name, if you provide it) so we can send order updates and, with your consent, marketing messages.",
  "privacy.useTitle": "How We Use Your Information",
  "privacy.use1": "To process, fulfil, and deliver your orders and provide customer support.",
  "privacy.use2": "To send transactional messages such as order and shipping confirmations.",
  "privacy.use3":
    "To send marketing emails where you have given consent — you can unsubscribe at any time using the link in every email.",
  "privacy.use4": "To operate, maintain, and improve our store.",
  "privacy.sharingTitle": "Sharing",
  "privacy.sharingBody":
    "We share personal information only with the service providers who help us run the store — our e-commerce platform (Shopify), payment processors, and shipping carriers — and only as needed to serve you. We do not sell your personal information.",
  "privacy.choicesTitle": "Your Choices",
  "privacy.choicesBody":
    "You can unsubscribe from marketing emails at any time, and you may request access to, correction of, or deletion of your personal information by emailing us. We respond to privacy requests within a reasonable time.",
  "privacy.contactTitle": "Contact",
  "privacy.contactBody": "Questions about your privacy? Email",

  // --- shipping page ------------------------------------------------------
  "shipping.title": "Shipping Information",
  "shipping.lead": "Solid wood furniture, shipped straight to your door — free, anywhere in Canada.",
  "shipping.card1Body": "Every order ships free to any Canadian address — no minimums, no surprises at checkout.",
  "shipping.card2Title": "Tracking on Every Order",
  "shipping.card2Body":
    "As soon as your order ships you'll receive a tracking number by email, so you can follow your delivery every step of the way.",
  "shipping.card3Title": "Check Your Boxes on Arrival",
  "shipping.card3Body":
    "When your furniture arrives, inspect all boxes and note any visible damage at delivery — it makes resolving carrier issues much faster.",
  "shipping.card4Title": "Heavy Boxes — Grab a Helper",
  "shipping.card4Body":
    "Solid wood means large, heavy packages. Having two adults available makes moving boxes into your home much easier.",
  "shipping.timesTitle": "Processing & Delivery Times",
  "shipping.times1":
    "Most orders are processed and prepared for shipment within about one week, with standard delivery typically taking 12–18 business days in total. Transit times vary by destination.",
  "shipping.times2":
    "All orders are subject to stock availability — if anything changes with your order, we'll email you right away.",
  "shipping.questionsTitle": "Questions About a Delivery?",
  "shipping.questions1": "Email",
  "shipping.questions2":
    " with your order number and we'll respond within 24 hours. For returns and order changes, see our",
  "shipping.returnsPolicyLink": "Returns & Cancellations policy",

  // --- returns page -------------------------------------------------------
  "returns.title": "Returns, Changes & Cancellations",
  "returns.lead": "Straightforward policies, no fine-print games. Effective July 16, 2026.",
  "returns.changesTitle": "Order Changes & Cancellations",
  "returns.changes1a":
    "Need to change a colour or size, or cancel altogether? Email us as soon as possible — we can accommodate changes and cancellations any time",
  "returns.changes1b": " before your order ships",
  "returns.changes1c":
    ". Once an order has shipped, it can no longer be changed or cancelled (but it can be returned, below).",
  "returns.changes2":
    "Address changes while an order is in transit may incur the carrier's administrative or rerouting fees.",
  "returns.thirtyTitle": "30-Day Returns",
  "returns.thirty1a": "Returns of ",
  "returns.thirtyStrong1": "new, unused, unassembled, and undamaged",
  "returns.thirty1b": " items are accepted within ",
  "returns.thirtyStrong2": "30 days of delivery",
  "returns.thirty1c": ". Here's how it works:",
  "returns.step1a": "Email",
  "returns.step1b":
    " for a return authorization. Include a quick photo of the item — a phone picture is perfect. We just need a \"before\" image in case anything is damaged on the way back.",
  "returns.step2":
    "We'll reply with your return authorization number and the return address. Write the authorization number on the shipping label.",
  "returns.step3":
    "Ship the item back at your expense via the same carrier and service it arrived with. Original packaging is preferred; if it's gone, please pack the item well enough to survive the trip.",
  "returns.refund":
    "Your refund is issued once the return arrives in undamaged, re-sellable condition. A 20% restocking fee may apply.",
  "returns.damagedTitle": "Damaged, Defective, or Incorrect Items",
  "returns.damaged1":
    "If your item arrives damaged or defective, or you received the wrong item, contact us with photos. In these cases ",
  "returns.damagedStrong": "we cover the return shipping, the restocking fee is waived",
  "returns.damaged2": ", and we'll arrange a replacement or a full refund — whichever you prefer.",
  "returns.missingTitle": "Missing Parts",
  "returns.missingBody":
    "Missing a bolt bag or a panel? Email us with your order number and we'll get replacement parts moving. All claims for missing or damaged parts must be submitted within 30 days of delivery.",
  "returns.contactTitle": "Contact",
  "returns.contact1": "Email",
  "returns.contact2": " — we respond within 24 hours. See also our",
  "returns.shippingLink": "Shipping Information",
  "returns.and": " and",
  "returns.warrantyLink": "Warranty",
  "returns.pages": " pages.",

  // --- assembly page ------------------------------------------------------
  "assembly.title": "Assembly Guide",
  "assembly.lead":
    "Every Forgali piece arrives flat-packed with illustrated instructions and all the hardware you need. Here's how to make build day easy.",
  "assembly.tip1Title": "Bring a Second Pair of Hands",
  "assembly.tip1Text":
    "Solid pine makes our furniture beautiful — and the boxes large and heavy. Two adults make moving and building far easier.",
  "assembly.tip2Title": "Charge the Power Drill",
  "assembly.tip2Text":
    "Everything can be built with the included hand tools, but a power drill makes assembly noticeably faster.",
  "assembly.tip3Title": "Clear the Room First",
  "assembly.tip3Text":
    "Give yourself plenty of floor space to lay out panels and hardware before you start building.",
  "assembly.tip4Title": "Read Before You Build",
  "assembly.tip4Text":
    "Skim the illustrated instructions first to understand the design — it prevents the classic backwards-headboard restart.",
  "assembly.tip5Title": "Set Aside 2–3 Hours",
  "assembly.tip5Text":
    "From nightstands to staircase bunks, assembly time varies. Most beds take a relaxed afternoon.",
  "assembly.instructionsTitle": "Need Your Instructions Again?",
  "assembly.instructions1":
    "Printed step-by-step instructions are included in every box. If yours have gone missing, email",
  "assembly.instructions2":
    "with your order number and the product name, and we'll send you the PDF for your exact model — usually within 24 hours.",
  "assembly.missing1": "Missing hardware or a damaged part? See",
  "assembly.returnsLink": "Returns & Missing Parts",
  "assembly.missing2": " — we'll ship replacements.",
  "assembly.safeTitle": "Build It Safe",
  "assembly.safe1":
    "Follow the guardrail, mattress-height, and age recommendations in your instructions — they matter, especially for bunk and loft beds. Read more on our",
  "assembly.safe2": " page.",

  // --- safety page --------------------------------------------------------
  "safety.title": "Safety Standards",
  "safety.lead": "Your child's safety is our top priority.",
  "safety.certTitle": "Certifications & Compliance",
  "safety.certBody":
    "The children's beds we carry are manufactured and tested to applicable children's furniture safety standards. We're committed to offering safe, well-built products for your family.",
  "safety.hcTitle": "Built to Health Canada Guidance",
  "safety.hcBody": "Our children's beds are designed to align with Health Canada guidance for children's furniture.",
  "safety.vocTitle": "Low-VOC Finishes",
  "safety.vocBody": "Beds are finished with durable, low-VOC finishes.",
  "safety.structTitle": "Structural Integrity",
  "safety.structBody": "Beds are tested for weight capacity and structural stability to support long-term use.",
  "safety.guardTitle": "Guardrails on Elevated Beds",
  "safety.guardBody": "Elevated beds include guardrails designed to meet standard safety spacing requirements.",
  "safety.tipsTitle": "Safety Tips",
  "safety.tip1": "Always follow assembly instructions carefully",
  "safety.tip2": "Ensure all hardware is properly tightened",
  "safety.tip3": "Regularly inspect beds for loose parts or damage",
  "safety.tip4": "Use appropriate mattress sizes as specified",
  "safety.tip5": "Keep beds away from windows and heating sources",

  // --- about page ---------------------------------------------------------
  "about.title": "About Forgali",
  "about.lead":
    "An online-only Canadian furniture store. Solid wood beds, dining and living pieces — over 300 of them — shipped free to your door, from Victoria to St. John's.",
  "about.storyTitle": "Our Story",
  "about.story1a": "Forgali started in furniture the long way around — as",
  "about.story1b":
    ", a custom-furniture showroom in the Greater Toronto Area. Years of building rooms for families taught us the same lesson over and over: the pieces people regret are almost never the ones made of real wood.",
  "about.story2":
    "So we closed the showroom and rebuilt the business online. No floor space to pay for, no commissioned salesperson steering you toward this week's overstock — just a catalogue we've curated ourselves and delivered free anywhere in the country.",
  "about.story3":
    "That last part matters more than it should. A lot of the solid wood furniture Canadians want is easy to find and painful to actually buy here — cross-border shipping fees, brokerage surprises, and return policies that quietly exclude Canada. We carry those pieces domestically so the price you see is the price you pay, and so a return is an email rather than an international shipping problem.",
  "about.storyAlt": "Solid wood twin high loft bed with desk in a child's room",
  "about.carryTitle": "What We Carry",
  "about.carryLead":
    "Two rooms, done properly, instead of a little of everything. Beds that grow with a child, and dining and living furniture built to the same standard.",
  "about.carry1Title": "Kids' & Family Beds",
  "about.carry1Body":
    "Roughly 100 bunk and loft configurations — twin over twin right up to queen over queen, L-shaped, with stairs, trundles, desks, slides or under-bed drawers — plus platform beds in twin, full and queen.",
  "about.carry1Cta": "Shop bunk beds",
  "about.carry1Alt": "Solid wood Modern Farmhouse twin over twin bunk bed",
  "about.carry2Title": "Plank & Beam Dining & Living",
  "about.carry2Body":
    "164 pieces from the Plank & Beam collection — dining tables, chairs, benches, bar and counter stools, coffee and console tables, sideboards and TV stands — with no border charges.",
  "about.carry2Cta": "Shop dining & living",
  "about.carry2Alt": "Plank & Beam solid wood dining table and chairs",
  "about.carry3Title": "Storage & Finishing Pieces",
  "about.carry3Body":
    "Dressers and night stands in matching finishes, under-bed storage drawers, add-on guard rails, desks and low-profile mattresses sized for bunk and loft clearances — so a room gets finished properly instead of assembled from four different stores.",
  "about.carry3Cta": "Shop storage & accessories",
  "about.carry3Alt": "Solid wood full over full bunk bed with under-bed storage drawers",
  "about.buildTitle": "What “Solid Wood” Means Here",
  "about.buildLead":
    "Plenty of furniture is described as solid wood. These are the specifications behind ours — the things you'd want to know before putting a child on the top bunk.",
  "about.spec1Title": "Solid New Zealand Pine",
  "about.spec1Body":
    "Knot-free solid pine frames, not particleboard or veneer over MDF. It's the reason the boxes are heavy and the reason the bed is still standing when it gets handed down.",
  "about.spec2Title": "Low-VOC, GREENGUARD Gold Finishes",
  "about.spec2Body":
    "Durable, non-toxic finishes. Many of the beds we carry are GREENGUARD Gold certified — independently tested for low chemical emissions in indoor air.",
  "about.spec3Title": "400 lb Per Bed",
  "about.spec3Body":
    "Most of our bunks and lofts are rated to 400 lb per sleeping surface, on solid pine slats with a metal centre support bar. They hold toddlers, teenagers, and the parent reading at bedtime.",
  "about.spec4Title": "Metal-on-Metal Connections",
  "about.spec4Body":
    "Structural joints are metal into metal rather than screws biting into wood, so they don't work loose and start creaking after a year of climbing.",
  "about.spec5Title": "Guardrails & Safety Standards",
  "about.spec5Body":
    "Children's beds are manufactured and tested to applicable children's furniture safety standards, and elevated beds ship with guardrails designed to standard spacing.",
  "about.spec6Title": "Beds That Change With the Room",
  "about.spec6Body":
    "Most bunks separate into two standalone beds, and many lofts take a desk, a curtain or drawers underneath — one purchase that survives more than one phase of childhood.",
  "about.safetyMore1": "More on guardrails, mattress sizing and safe setup on our",
  "about.safetyMore2": " page.",
  "about.howTitle": "How Buying From Us Works",
  "about.howLead":
    "No memberships, no delivery surcharges, no fine-print games. Here's the whole thing, start to finish.",
  "about.how1Title": "Free shipping, anywhere in Canada",
  "about.how1Body":
    "Every order ships free to any Canadian address — no minimum, no surprise total at checkout, no duties or brokerage fees.",
  "about.how1Link": "Shipping details",
  "about.how2Title": "Tracked from our door to yours",
  "about.how2Body":
    "Most orders are prepared within about a week, with delivery typically 12–18 business days in total. You get a tracking number by email the moment it ships.",
  "about.how2Link": "Processing & delivery times",
  "about.how3Title": "Assembly you can actually finish",
  "about.how3Body":
    "Beds arrive flat-packed with step-by-step instructions and all hardware included. Most go together in one to two hours with basic tools and a second pair of hands.",
  "about.how3Link": "Assembly guide",
  "about.how4Title": "30 days to change your mind",
  "about.how4Body":
    "Return new, unused, unassembled items within 30 days. If something arrives damaged, defective or wrong, we cover the return shipping and waive the restocking fee.",
  "about.how4Link": "Returns & cancellations",
  "about.how5Title": "Five years of warranty behind it",
  "about.how5Body":
    "A 5-year limited warranty against defects in materials and workmanship, and replacement parts — a bolt bag, a slat, a panel — sent out on request.",
  "about.how5Link": "Warranty coverage",
  "about.findTitle": "Where to Find Us",
  "about.findBody":
    "Forgali is a 100% online store. We don't run a retail showroom, and that's a deliberate choice: it's part of why the shipping is free and the prices are what they are. Call us at (647) 527-2110 or write to the inbox below, and a person answers either way.",
  "about.respond":
    "We respond within 24 hours, Monday to Friday, 9:00 AM – 5:00 PM ET. Include your order number if you have one.",
  "about.sendMessage": "Send us a message →",
  "about.noteTitle": "A note about older listings",
  "about.noteBody":
    "Forgali's earlier chapter as Forgali Design Centre — a custom-furniture showroom in Mississauga — is permanently closed, as is the former Concord location. Directory entries that still show a showroom at 2111 Dunwin Dr., a Concord address, or phone numbers such as (905) 820-2020 or (905) 820-9461 are out of date: those locations are closed and the numbers are no longer in service. Forgali operates entirely online today. Our current phone number is (647) 527-2110, and you can also reach us by email:",
  "about.ctaBody":
    "Real solid wood, priced fairly, shipped free across Canada. Have a look — and if you're stuck between two finishes or not sure a loft will clear your ceiling, just email us.",
  "about.shopBeds": "Shop Beds",
} as const;

const fr: Record<keyof typeof en, string> = {
  // --- shared -------------------------------------------------------------
  from: "À partir de ",
  country: "Pays :",
  language: "Langue",
  searchPlaceholder: "Rechercher dans la boutique",
  checkoutWithShopify: "Passer au paiement avec Shopify",
  processing: "Traitement en cours...",
  "common.continueShopping": "Continuer à magasiner",
  "common.freeShipping": "Livraison gratuite partout au Canada",
  "common.returns30": "Retours sous 30 jours",
  "common.secureCheckout": "Paiement sécurisé",
  "common.loadingError": "Erreur lors du chargement des produits",
  "common.faq": "Foire aux questions",
  "common.shopDining": "Magasiner la salle à manger",
  "common.shopLiving": "Magasiner le salon",
  "common.shopBedroom": "Magasiner la chambre",
  "common.somethingWrong": "Une erreur s'est produite. Veuillez réessayer.",
  "common.checkoutUnavailable": "Paiement temporairement indisponible",
  "common.checkoutUnavailableBody1":
    "Impossible de lancer le paiement sécurisé pour le moment. Réessayez sous peu ou écrivez à ",
  "common.checkoutUnavailableBody2": " et nous finaliserons votre commande par courriel. Votre panier est sauvegardé.",
  "common.tagline": "MEUBLES EN BOIS MASSIF",

  // --- header + nav -------------------------------------------------------
  "header.openMenu": "Ouvrir le menu",
  "header.menu": "Menu",
  "header.expand": "Déplier {label}",
  "header.home": "Accueil Forgali",
  "header.yourAccount": "Votre compte",
  "header.yourAccountTitle": "Votre compte",
  "header.signOut": "Se déconnecter",
  "header.signIn": "Se connecter à votre compte",
  "header.openCart": "Ouvrir le panier",
  "header.openCartOne": "Ouvrir le panier, {count} article",
  "header.openCartMany": "Ouvrir le panier, {count} articles",
  "nav.dining": "Salle à manger",
  "nav.dining.shopAll": "Voir toute la salle à manger →",
  "nav.dining.shop": "Magasiner la salle à manger →",
  "nav.dining.alt": "Magasiner la salle à manger",
  "nav.living": "Salon",
  "nav.living.shopAll": "Voir tout le salon →",
  "nav.living.shop": "Magasiner le salon →",
  "nav.living.alt": "Magasiner le salon",
  "nav.bedroom": "Chambre",
  "nav.bedroom.shopAll": "Voir toute la chambre →",
  "nav.bedroom.shop": "Magasiner la chambre →",
  "nav.bedroom.alt": "Magasiner la chambre",
  "nav.storage": "Rangement et accessoires",
  "nav.storage.shopAll": "Voir tout le rangement et les accessoires →",
  "nav.storage.shop": "Magasiner le rangement et les accessoires →",
  "nav.storage.alt": "Magasiner le rangement et les accessoires",
  "nav.smartDeals": "Aubaines",
  "nav.diningTables": "Tables de salle à manger",
  "nav.diningChairs": "Chaises de salle à manger",
  "nav.diningBenches": "Bancs de salle à manger",
  "nav.barCounterChairs": "Chaises de bar et de comptoir",
  "nav.diningSets": "Ensembles de salle à manger",
  "nav.coffeeTables": "Tables basses",
  "nav.consoleTables": "Consoles",
  "nav.sideTables": "Tables d'appoint",
  "nav.sideboards": "Buffets",
  "nav.tvStands": "Meubles TV",
  "nav.shelves": "Étagères",
  "nav.bunkBeds": "Lits superposés",
  "nav.loftBeds": "Lits mezzanine",
  "nav.singleBeds": "Lits classiques",
  "nav.bedsWithSlide": "Lits avec glissoire",
  "nav.bedsWithStairs": "Lits avec escalier",
  "nav.toddlerFloorBeds": "Lits pour tout-petits et lits au sol",
  "nav.mattresses": "Matelas",
  "nav.dressersStorage": "Commodes et rangement",
  "nav.nightstands": "Tables de chevet",
  "nav.desks": "Bureaux",
  "nav.bookcasesShelves": "Bibliothèques et étagères",

  // --- footer -------------------------------------------------------------
  "footer.shop": "Magasiner",
  "footer.support": "Soutien",
  "footer.company": "Entreprise",
  "footer.followUs": "Suivez-nous",
  "footer.accessories": "Accessoires",
  "footer.contactUs": "Nous joindre",
  "footer.faqs": "FAQ",
  "footer.shippingInfo": "Livraison",
  "footer.returns": "Retours",
  "footer.assemblyGuide": "Guide d'assemblage",
  "footer.buyingGuides": "Guides d'achat",
  "footer.aboutForgali": "À propos de Forgali",
  "footer.warranty": "Garantie",
  "footer.safetyStandards": "Normes de sécurité",
  "footer.privacy": "Politique de confidentialité",
  "footer.terms": "Conditions d'utilisation",
  "footer.copyright": "© 2026 Forgali. Tous droits réservés.",
  "footer.poweredBy": "Propulsé par Avallon",

  // --- cart drawer --------------------------------------------------------
  "cart.title": "Panier",
  "cart.empty": "Votre panier est vide",
  "cart.unavailableRemove": "N'est plus disponible : veuillez le retirer",
  "cart.decrease": "Réduire la quantité de {name}",
  "cart.increase": "Augmenter la quantité de {name}",
  "cart.remove": "Retirer {name} du panier",
  "cart.completeRoom": "Complétez la pièce",
  "cart.subtotal": "Sous-total",
  "cart.shippingNote": "Livraison gratuite · arrive en 12 à 18 jours ouvrables · taxes calculées à la caisse",
  "cart.afterpay": "Ou payez en 4 versements sans intérêts avec Afterpay.",
  "cart.checkout": "Passer à la caisse",

  // --- product cards ------------------------------------------------------
  "product.saveBadge": "économisez {amount}\u00a0$",
  "product.new": "NOUVEAU",
  "product.bestSeller": "MEILLEUR VENDEUR",
  "product.sale": "SOLDE",

  // --- homepage sections --------------------------------------------------
  "home.seoTitle": "Forgali — Meubles en bois massif pour chaque pièce",
  "home.seoDescription":
    "Des meubles en bois massif auxquels les familles font confiance : lits superposés et lits mezzanine pour enfants, tables et chaises de salle à manger, meubles de salon. Livraison gratuite partout au Canada.",
  "home.featured": "Meubles en vedette",
  "home.loadError": "Impossible de charger les produits pour le moment.",
  "home.browseDining": "Parcourez plutôt la collection Salle à manger",
  "home.loadErrorTail": ".",
  "home.shopAll": "Tout voir →",
  "home.shopByCategory": "Magasiner par catégorie",
  "hero.alt": "Salle à manger en bois massif avec table ovale Plank & Beam et chaises rembourrées",
  "hero.kicker": "DU BOIS MASSIF POUR CHAQUE PIÈCE",
  "hero.title": "Des meubles en bois massif auxquels les familles font confiance, de la chambre à la salle à manger",
  "hero.lead":
    "Des meubles de salle à manger, de salon et de chambre d'enfant en bois massif, livrés gratuitement partout au Canada.",
  "hero.ctaDining": "Magasiner la salle à manger et le salon",
  "hero.ctaBeds": "Magasiner les lits pour enfants",
  "brand.title": "Des meubles faits pour durer",
  "brand.body1":
    "Nous concevons des meubles en bois massif pour la vraie vie : ceux qui sont beaux dans votre espace, qui résistent à l'usage quotidien et qui n'ont pas l'étiquette de prix qui fait dire « c'est ",
  "brand.bodyEm": "si",
  "brand.body2":
    " cher que ça? ». Le beau design et la vraie qualité ne devraient pas être hors de portée; les nôtres sont conçus intelligemment, vendus à prix juste et faits pour durer.",
  "brand.cta": "Magasiner la collection",
  "brand.learnMore": "En savoir plus sur Forgali →",
  "brand.alt": "Console Arcata en bois massif Plank & Beam",
  "strip.warranty": "Couverture de garantie",
  "strip.safety": "Conçus selon les normes de sécurité",
  "promo.alt":
    "Ensemble de salle à manger en bois massif Plank & Beam : table en chêne naturel et chaises en noyer dans une salle à manger ensoleillée",
  "promo.kicker": "Événement salle à manger",
  "promo.titleEm": "Chaque",
  "promo.titleRest": " pièce de salle à manger est en solde",
  "promo.body":
    "Tables, chaises et bancs en bois massif à partir de 169\u00a0$, faits pour résister aux soupers du dimanche pendant des générations. Livraison gratuite partout au Canada.",
  "promo.cta": "Voir les aubaines salle à manger",
  "promo.browse": "Parcourir toute la salle à manger →",
  "look.shopItem": "Magasiner {title}",
  "look.shopNow": "Magasiner →",
  "look.aria": "Magasiner le look",
  "look.title": "Faits pour les vrais rassemblements",
  "look.lead": "Magasinez le look : touchez un numéro pour voir la pièce",
  "look.alt": "Salle à manger Plank & Beam : table ovale Lido, chaises Sereno et console Arcata",
  "look.adding": "Ajout du look…",
  "look.added": "Look ajouté au panier ✓",
  "look.partial": "{added} pièces sur {total} ajoutées",
  "look.addAll": "Ajouter tout le look au panier · {total}",
  "look.note": "Ajoute la table, une chaise et la console dans les finis présentés.",
  "look.partialNote": "Non disponible pour le moment : {pieces}. Le reste du look est dans votre panier.",
  "look.error": "Impossible d'ajouter le look. Essayez les pièces une à une.",
  "newsletter.invalidEmail": "Veuillez entrer une adresse courriel valide.",
  "newsletter.aria": "Inscription à l'infolettre",
  "newsletter.title": "Abonnez-vous à l'infolettre Forgali",
  "newsletter.lead":
    "Nouveautés, offres et accès en primeur aux nouveaux arrivages, directement dans votre boîte de réception.",
  "newsletter.done": "C'est fait! Surveillez votre boîte de réception pour les nouveautés et les offres.",
  "newsletter.already": "Ce courriel a déjà un compte Forgali : vous êtes sur la liste.",
  "newsletter.emailLabel": "Adresse courriel",
  "newsletter.placeholder": "Votre adresse courriel",
  "newsletter.subscribe": "S'abonner",

  // --- category page, tabs, filters ----------------------------------------
  "category.notFoundSeoTitle": "Catégorie introuvable | Forgali",
  "category.notFoundSeoDescription": "Cette catégorie est introuvable.",
  "category.notFoundTitle": "Nous n'avons pas trouvé cette catégorie",
  "category.loading": "Chargement des produits...",
  "category.empty": "Aucun produit trouvé dans cette catégorie.",
  "category.about": "À propos : {name}",
  "tabs.shopAllBedroom": "Toute la chambre",
  "tabs.shopAllMattresses": "Tous les matelas",
  "tabs.shopAll": "Tout voir",
  "filter.under500": "Moins de 500\u00a0$",
  "filter.500to1000": "500\u00a0$ - 1\u00a0000\u00a0$",
  "filter.1000to2000": "1\u00a0000\u00a0$ - 2\u00a0000\u00a0$",
  "filter.over2000": "Plus de 2\u00a0000\u00a0$",
  "filter.price": "Prix",
  "filter.bedSize": "Taille du lit",
  "filter.finish": "Fini",
  "filter.clear": "Effacer",
  "filter.sortBy": "Trier par",
  "filter.sizeTwin": "Simple",
  "filter.sizeFull": "Double",
  "filter.sizeQueen": "Grand (queen)",
  "filter.sizeTwinXl": "Simple XL",
  "sort.featured": "En vedette",
  "sort.priceLow": "Prix : croissant",
  "sort.priceHigh": "Prix : décroissant",

  // --- product page -------------------------------------------------------
  "pdp.loading": "Chargement du produit...",
  "pdp.notFoundSeoTitle": "Produit introuvable | Forgali",
  "pdp.errorSeoTitle": "Une erreur s'est produite | Forgali",
  "pdp.notFoundSeoDescription": "Ce produit est introuvable.",
  "pdp.notFoundTitle": "Nous n'avons pas trouvé ce produit",
  "pdp.errorTitle": "Une erreur s'est produite",
  "pdp.notFoundBody":
    "Il a peut-être été renommé ou n'est plus offert, mais le reste de la collection est juste ici.",
  "pdp.errorBody": "Veuillez réessayer dans un instant.",
  "pdp.seoDescriptionFallback": "{name} : meuble en bois massif avec livraison gratuite partout au Canada, par Forgali.",
  "pdp.home": "Accueil",
  "pdp.prevImage": "Image précédente",
  "pdp.nextImage": "Image suivante",
  "pdp.viewImage": "Voir l'image {index} sur {total}",
  "pdp.thumbAlt": "{name} {finish} vue {index}",
  "pdp.percentOff": "{percent}\u00a0% DE RABAIS",
  "pdp.optionColon": "\u00a0:",
  "pdp.decrease": "Réduire la quantité",
  "pdp.increase": "Augmenter la quantité",
  "pdp.addToCart": "Ajouter au panier",
  "pdp.outOfStock": "En rupture de stock",
  "pdp.unavailable": "Non disponible",
  "pdp.returnsLower": "Retours sous 30 jours",
  "pdp.secureCheckoutLower": "Paiement sécurisé",
  "pdp.solidWood": "Bois massif",
  "pdp.fastShipping": "Livraison rapide",
  "pdp.solidWood100": "Bois massif à 100\u00a0%",
  "pdp.completeRoom": "Complétez la pièce",
  "pdp.completeRoomLead": "Des pièces de la même famille, faites pour s'agencer.",
  "pdp.youMayAlsoLike": "Vous aimerez aussi",
  "pdp.deliveryWindow": "12 à 18 jours ouvrables",
  "pdp.material": "Matériau",
  "pdp.weightCapacity": "Capacité de poids",
  "pdp.recommendedMattress": "Matelas recommandé",
  "pdp.assembly": "Assemblage",
  "pdp.tabDetails": "Détails",
  "pdp.tabDescription": "Description",
  "pdp.tabShipping": "Livraison",
  "pdp.tabShippingLong": "Information sur la livraison",
  "pdp.freeShippingTitle": "Livraison gratuite partout au Canada",
  "pdp.freeShippingBody": "La livraison standard prend {window} à partir du jour de la commande.",
  "pdp.returnsBody": "Retournez un article inutilisé dans son emballage d'origine dans les 30 jours suivant la livraison.",
  "pdp.flatPackTitle": "Livré à plat, à assembler",
  "pdp.flatPackBody": "La quincaillerie, les outils et les instructions étape par étape sont inclus dans la boîte.",
  "pdp.shippingDetails": "Détails de livraison",
  "pdp.returnsPolicy": "Politique de retour",
  "pdp.assemblyGuide": "Guide d'assemblage",

  // --- search -------------------------------------------------------------
  "search.seoTitleQuery": "Recherche : {query} | Forgali",
  "search.seoTitle": "Recherche | Forgali",
  "search.resultsFor": "Résultats de recherche pour ",
  "search.title": "Recherche",
  "search.foundOne": "{count} produit trouvé",
  "search.foundMany": "{count} produits trouvés",
  "search.searching": "Recherche en cours...",
  "search.noMatch": "Aucun produit ne correspond à votre recherche.",
  "search.typeAbove": "Tapez dans la barre de recherche ci-dessus pour trouver des produits.",
  "search.tryOther": "Essayez un autre mot ou parcourez une catégorie :",

  // --- smart deals --------------------------------------------------------
  "deals.title": "Aubaines",
  "deals.lead":
    "Économisez sur des meubles en bois massif pour chaque pièce : salle à manger, salon et chambre. Prix réduits et livraison gratuite partout au Canada.",
  "deals.loading": "Chargement des aubaines...",
  "deals.all": "Toutes les aubaines",
  "deals.countOne": "{count} aubaine",
  "deals.countMany": "{count} aubaines",
  "deals.none": "Aucun produit en solde pour le moment.",
  "deals.dining.seeAll": "Voir les {count} aubaines salle à manger →",
  "deals.dining.shopAll": "Voir toute la salle à manger →",
  "deals.living.seeAll": "Voir les {count} aubaines salon →",
  "deals.living.shopAll": "Voir tout le salon →",
  "deals.bedroom.seeAll": "Voir les {count} aubaines chambre →",
  "deals.bedroom.shopAll": "Voir toute la chambre →",

  // --- checkout page ------------------------------------------------------
  "checkout.seoTitle": "Paiement | Forgali",
  "checkout.emptyTitle": "Votre panier est vide",
  "checkout.emptyBody": "Ajoutez des produits à votre panier pour passer à la caisse.",
  "checkout.back": "Retour au magasinage",
  "checkout.title": "Paiement",
  "checkout.howItWorks": "Comment ça fonctionne",
  "checkout.step1": "Vérifiez le récapitulatif de votre commande sur cette page.",
  "checkout.step2": "Passez à notre caisse sécurisée pour entrer vos coordonnées et votre adresse de livraison.",
  "checkout.step3":
    "Payez par carte de crédit, PayPal, Apple Pay ou Google Pay; les taxes y sont calculées selon votre adresse.",
  "checkout.step4":
    "Vous voulez étaler le paiement? Choisissez Afterpay à l'étape du paiement pour diviser le total en 4 versements sans intérêts.",
  "checkout.pci": "Les paiements sont traités sur notre caisse chiffrée et conforme à la norme PCI.",
  "checkout.continue": "Passer à la caisse sécurisée",
  "checkout.orderSummary": "Récapitulatif de la commande",
  "checkout.unavailable": "N'est plus disponible : ",
  "checkout.remove": "retirer",
  "checkout.shipping": "Livraison",
  "checkout.free": "GRATUITE",
  "checkout.arrives": "Arrive en 12 à 18 jours ouvrables",
  "checkout.tax": "Taxes",
  "checkout.taxCalculated": "Calculées à la caisse",
  "checkout.totalBeforeTax": "Total avant taxes",

  // --- login dialog -------------------------------------------------------
  "login.enterBoth": "Veuillez entrer votre courriel et votre mot de passe.",
  "login.incorrect": "Courriel ou mot de passe incorrect.",
  "login.fillAll": "Veuillez remplir tous les champs.",
  "login.passwordMin": "Le mot de passe doit contenir au moins 5 caractères.",
  "login.couldNotCreate": "Impossible de créer votre compte.",
  "login.description": "Connectez-vous à votre compte Forgali ou créez-en un en quelques secondes.",
  "login.signIn": "Se connecter",
  "login.createAccount": "Créer un compte",
  "login.email": "Courriel",
  "login.password": "Mot de passe",
  "login.emailPlaceholder": "vous@exemple.com",
  "login.passwordPlaceholder": "Votre mot de passe",
  "login.signingIn": "Connexion en cours...",
  "login.firstName": "Prénom",
  "login.lastName": "Nom",
  "login.passwordHint": "Au moins 5 caractères",
  "login.creating": "Création du compte...",

  // --- 404 ----------------------------------------------------------------
  "notFound.seoTitle": "Page introuvable | Forgali",
  "notFound.title": "Nous n'avons pas trouvé cette page",
  "notFound.body": "Le lien est peut-être brisé ou la page a été déplacée, mais il reste plein de choses à découvrir.",
  "notFound.home": "Retour à l'accueil",

  // --- guides -------------------------------------------------------------
  "guide.shopPieces": "Magasiner les pièces de ce guide",
  "guide.trust": "Livraison gratuite partout au Canada · Retours sous 30 jours · Garantie limitée de 5 ans",
  "guide.more": "Autres guides d'achat",
  "guide.lastUpdated": "Dernière mise à jour : {date}.",

  // --- contact page -------------------------------------------------------
  "contact.subject": "Demande du site Web de {name}",
  "contact.aCustomer": "un client",
  "contact.bodyName": "Nom : ",
  "contact.bodyEmail": "Courriel : ",
  "contact.copyTo": "À : ",
  "contact.copySubject": "Objet : ",
  "contact.title": "Nous joindre",
  "contact.lead": "Notre équipe est là pour vous aider à trouver le lit parfait pour votre famille.",
  "contact.email": "Courriel",
  "contact.respond24": "Nous répondons dans les 24 heures",
  "contact.phone": "Téléphone",
  "contact.hoursLine": "Du lundi au vendredi, de 9\u00a0h à 17\u00a0h (HNE)",
  "contact.supportHours": "Heures de service",
  "contact.monFri": "Lundi - vendredi",
  "contact.hours": "9\u00a0h - 17\u00a0h (HNE)",
  "contact.onlineOnly": "En ligne seulement",
  "contact.onlineBody": "Boutique 100\u00a0% en ligne, sans salle de montre",
  "contact.servingCanada": "Livraison gratuite partout au Canada",
  "contact.formTitle": "Écrivez-nous",
  "contact.sentTitle": "Merci, votre message est en route",
  "contact.sentBody1": "Il est arrivé dans notre boîte de réception et nous répondrons à ",
  "contact.sentBody2": " dans les 24 heures, du lundi au vendredi.",
  "contact.sendAnother": "Envoyer un autre message",
  "contact.errorTitle": "Nous n'avons pas pu l'envoyer automatiquement",
  "contact.errorBody1":
    "Désolé, une erreur s'est produite de notre côté. Votre message est intact et toujours affiché ci-dessous; voici trois façons de nous le faire parvenir à ",
  "contact.errorBody2": ".",
  "contact.readyTitle": "Votre message est prêt à envoyer",
  "contact.readyBody1": "Nous avons ouvert votre application de courriel avec ce message adressé à ",
  "contact.readyBody2": ". Appuyez sur Envoyer et nous répondrons dans les 24 heures.",
  "contact.sendYourself": "Envoyez-le vous-même",
  "contact.nothingOpened": "Rien ne s'est ouvert?",
  "contact.pickEasiest": "Choisissez l'option la plus simple : votre message est déjà rédigé.",
  "contact.normalBrowser":
    "C'est normal si vous lisez vos courriels dans un navigateur. Utilisez plutôt l'une de ces options : votre message est déjà rédigé.",
  "contact.copied": "Copié",
  "contact.copyMessage": "Copier le message",
  "contact.openGmail": "Ouvrir dans Gmail",
  "contact.openOutlook": "Ouvrir dans Outlook",
  "contact.writeDirectly": "Ou écrivez-nous directement à",
  "contact.backEdit": "Revenir modifier mon message",
  "contact.name": "Nom",
  "contact.message": "Message",
  "contact.sending": "Envoi en cours…",
  "contact.send": "Envoyer le message",
  "contact.replyNote": "Nous répondons dans les 24 heures, du lundi au vendredi.",
  "contact.opensMailApp": "Ceci ouvre votre application de courriel avec le message prêt à envoyer.",
  "contact.preferDirect": "Vous préférez nous joindre directement? Écrivez à",
  "contact.orCall": "ou appelez au",

  // --- FAQs page ----------------------------------------------------------
  "faqs.title": "Foire aux questions",
  "faqs.lead": "Trouvez des réponses aux questions courantes sur nos produits, la livraison et nos politiques.",

  // --- warranty page ------------------------------------------------------
  "warranty.title": "Information sur la garantie",
  "warranty.lead": "Votre achat est protégé par notre couverture de garantie complète.",
  "warranty.limited": "Garantie limitée",
  "warranty.body":
    "Forgali garantit que tous ses produits sont exempts de défauts de matériaux et de fabrication, dans des conditions normales d'utilisation, pendant une période de 5 ans à compter de la date d'achat. Cette garantie couvre les défauts structurels et les défauts de fabrication.",
  "warranty.covered": "Ce qui est couvert",
  "warranty.covered1": "Défauts structurels des composantes en bois massif",
  "warranty.covered2": "Défauts de fabrication de la quincaillerie et de l'assemblage",
  "warranty.covered3": "Usure prématurée du fini dans des conditions normales d'utilisation",
  "warranty.notCovered": "Ce qui n'est pas couvert",
  "warranty.notCovered1": "Dommages causés par une mauvaise utilisation, un usage abusif ou un accident",
  "warranty.notCovered2": "Usure normale",
  "warranty.notCovered3": "Dommages causés par un assemblage incorrect",
  "warranty.notCovered4": "Modifications apportées au produit",
  "warranty.claim": "Comment faire une réclamation",
  "warranty.claimBody":
    "Pour faire une réclamation au titre de la garantie, communiquez avec notre service à la clientèle en indiquant votre numéro de commande, des photos du problème et une description. Nous examinerons votre réclamation et vous proposerons une solution dans un délai de 5 à 7 jours ouvrables.",

  // --- terms page ---------------------------------------------------------
  "terms.title": "Conditions d'utilisation",
  "terms.lead": "Les conditions qui s'appliquent lorsque vous magasinez chez nous. En vigueur depuis juillet 2026.",
  "terms.ordersTitle": "Commandes et acceptation",
  "terms.ordersBody":
    "Passer une commande constitue une offre d'achat. Nous confirmons les commandes par courriel et nous nous réservons le droit de refuser ou d'annuler une commande, par exemple si un article n'est pas disponible ou en cas d'erreur de prix. Si nous annulons une commande que vous avez payée, nous vous remboursons intégralement.",
  "terms.pricingTitle": "Prix et paiement",
  "terms.pricingBody":
    "Tous les prix sont affichés en dollars canadiens (CAD). Les taxes applicables sont calculées à la caisse selon votre adresse de livraison. Nous faisons tout notre possible pour afficher des prix et des renseignements exacts; dans le rare cas d'une erreur, nous communiquerons avec vous avant de traiter la commande concernée.",
  "terms.shippingTitle": "Livraison, retours et garantie",
  "terms.shippingBody1": "La livraison, les retours et la couverture de garantie sont régis par nos pages",
  "terms.shippingLink": "Livraison",
  "terms.returnsLink": "Retours",
  "terms.warrantyLink": "Garantie",
  "terms.and": " et",
  "terms.shippingBody2": ", qui font partie des présentes conditions.",
  "terms.useTitle": "Utilisation du site",
  "terms.useBody":
    "Vous acceptez d'utiliser ce site de façon légale et de ne pas nuire à son fonctionnement ni à sa sécurité. Les images et le contenu des produits sont fournis pour votre usage personnel et non commercial.",
  "terms.contactTitle": "Contact",
  "terms.contactBody": "Des questions sur ces conditions? Écrivez à",
  "terms.seeAlso": "Consultez aussi notre",

  // --- privacy page -------------------------------------------------------
  "privacy.title": "Politique de confidentialité",
  "privacy.lead": "Comment nous traitons vos renseignements. En vigueur depuis juillet 2026.",
  "privacy.collectTitle": "Renseignements que nous recueillons",
  "privacy.collect1":
    "Lorsque vous passez une commande, la caisse est gérée par Shopify, qui recueille les renseignements nécessaires pour traiter et expédier votre commande : votre nom, votre adresse courriel, vos adresses de livraison et de facturation et vos renseignements de paiement. Les données de carte de paiement sont traitées par le système de paiement de Shopify, conforme à la norme PCI; nous ne voyons ni ne conservons jamais votre numéro de carte complet.",
  "privacy.collect2":
    "Si vous vous abonnez à nos courriels ou créez un compte, nous recueillons votre adresse courriel (et votre nom, si vous le fournissez) afin de vous envoyer des mises à jour de commande et, avec votre consentement, des messages promotionnels.",
  "privacy.useTitle": "Comment nous utilisons vos renseignements",
  "privacy.use1": "Pour traiter, préparer et livrer vos commandes et offrir le service à la clientèle.",
  "privacy.use2": "Pour envoyer des messages transactionnels, comme les confirmations de commande et d'expédition.",
  "privacy.use3":
    "Pour envoyer des courriels promotionnels lorsque vous y avez consenti; vous pouvez vous désabonner en tout temps grâce au lien présent dans chaque courriel.",
  "privacy.use4": "Pour exploiter, maintenir et améliorer notre boutique.",
  "privacy.sharingTitle": "Partage",
  "privacy.sharingBody":
    "Nous partageons vos renseignements personnels uniquement avec les fournisseurs de services qui nous aident à exploiter la boutique (notre plateforme de commerce électronique Shopify, les processeurs de paiement et les transporteurs), et seulement dans la mesure nécessaire pour vous servir. Nous ne vendons pas vos renseignements personnels.",
  "privacy.choicesTitle": "Vos choix",
  "privacy.choicesBody":
    "Vous pouvez vous désabonner des courriels promotionnels en tout temps et demander l'accès à vos renseignements personnels, leur correction ou leur suppression en nous écrivant. Nous répondons aux demandes relatives à la vie privée dans un délai raisonnable.",
  "privacy.contactTitle": "Contact",
  "privacy.contactBody": "Des questions sur la protection de vos renseignements? Écrivez à",

  // --- shipping page ------------------------------------------------------
  "shipping.title": "Information sur la livraison",
  "shipping.lead": "Des meubles en bois massif livrés directement à votre porte, gratuitement, partout au Canada.",
  "shipping.card1Body":
    "Chaque commande est livrée gratuitement à toute adresse au Canada : aucun minimum, aucune surprise à la caisse.",
  "shipping.card2Title": "Suivi pour chaque commande",
  "shipping.card2Body":
    "Dès l'expédition de votre commande, vous recevez un numéro de suivi par courriel pour suivre votre livraison à chaque étape.",
  "shipping.card3Title": "Vérifiez vos boîtes à la réception",
  "shipping.card3Body":
    "À l'arrivée de vos meubles, inspectez toutes les boîtes et notez tout dommage visible au moment de la livraison : cela accélère beaucoup le règlement des problèmes avec le transporteur.",
  "shipping.card4Title": "Boîtes lourdes : trouvez un coup de main",
  "shipping.card4Body":
    "Qui dit bois massif dit colis gros et lourds. Avec deux adultes, il est beaucoup plus facile de rentrer les boîtes chez vous.",
  "shipping.timesTitle": "Délais de traitement et de livraison",
  "shipping.times1":
    "La plupart des commandes sont traitées et préparées pour l'expédition en une semaine environ, et la livraison standard prend généralement de 12 à 18 jours ouvrables au total. Les délais de transport varient selon la destination.",
  "shipping.times2":
    "Toutes les commandes sont sous réserve de la disponibilité des stocks; si quelque chose change pour votre commande, nous vous écrirons sans tarder.",
  "shipping.questionsTitle": "Des questions sur une livraison?",
  "shipping.questions1": "Écrivez à",
  "shipping.questions2":
    " en indiquant votre numéro de commande et nous répondrons dans les 24 heures. Pour les retours et les changements de commande, consultez notre",
  "shipping.returnsPolicyLink": "politique de retours et d'annulations",

  // --- returns page -------------------------------------------------------
  "returns.title": "Retours, changements et annulations",
  "returns.lead": "Des politiques simples, sans petits caractères. En vigueur depuis le 16 juillet 2026.",
  "returns.changesTitle": "Changements et annulations de commande",
  "returns.changes1a":
    "Vous voulez changer de couleur ou de taille, ou annuler complètement? Écrivez-nous le plus tôt possible : nous pouvons accepter les changements et les annulations en tout temps",
  "returns.changes1b": " avant l'expédition de votre commande",
  "returns.changes1c":
    ". Une fois la commande expédiée, elle ne peut plus être modifiée ni annulée (mais elle peut être retournée, voir ci-dessous).",
  "returns.changes2":
    "Un changement d'adresse pendant que la commande est en transit peut entraîner des frais administratifs ou de réacheminement du transporteur.",
  "returns.thirtyTitle": "Retours sous 30 jours",
  "returns.thirty1a": "Les retours d'articles ",
  "returns.thirtyStrong1": "neufs, inutilisés, non assemblés et non endommagés",
  "returns.thirty1b": " sont acceptés dans les ",
  "returns.thirtyStrong2": "30 jours suivant la livraison",
  "returns.thirty1c": ". Voici comment ça fonctionne :",
  "returns.step1a": "Écrivez à",
  "returns.step1b":
    " pour obtenir une autorisation de retour. Joignez une photo rapide de l'article; une photo prise avec un téléphone suffit. Nous avons simplement besoin d'une image « avant » au cas où quelque chose serait endommagé pendant le retour.",
  "returns.step2":
    "Nous vous répondrons avec votre numéro d'autorisation de retour et l'adresse de retour. Inscrivez le numéro d'autorisation sur l'étiquette d'expédition.",
  "returns.step3":
    "Réexpédiez l'article à vos frais, par le même transporteur et le même service que ceux utilisés pour la livraison. L'emballage d'origine est préférable; s'il n'est plus disponible, emballez l'article assez bien pour qu'il survive au trajet.",
  "returns.refund":
    "Votre remboursement est émis une fois le retour reçu en état non endommagé et revendable. Des frais de remise en stock de 20\u00a0% peuvent s'appliquer.",
  "returns.damagedTitle": "Articles endommagés, défectueux ou incorrects",
  "returns.damaged1":
    "Si votre article arrive endommagé ou défectueux, ou si vous avez reçu le mauvais article, communiquez avec nous en joignant des photos. Dans ces cas, ",
  "returns.damagedStrong": "nous payons les frais de retour et les frais de remise en stock sont annulés",
  "returns.damaged2": ", et nous organisons un remplacement ou un remboursement complet, selon votre préférence.",
  "returns.missingTitle": "Pièces manquantes",
  "returns.missingBody":
    "Il vous manque un sac de boulons ou un panneau? Écrivez-nous avec votre numéro de commande et nous ferons partir les pièces de remplacement. Toute réclamation pour pièces manquantes ou endommagées doit être soumise dans les 30 jours suivant la livraison.",
  "returns.contactTitle": "Contact",
  "returns.contact1": "Écrivez à",
  "returns.contact2": " : nous répondons dans les 24 heures. Consultez aussi nos pages",
  "returns.shippingLink": "Information sur la livraison",
  "returns.and": " et",
  "returns.warrantyLink": "Garantie",
  "returns.pages": ".",

  // --- assembly page ------------------------------------------------------
  "assembly.title": "Guide d'assemblage",
  "assembly.lead":
    "Chaque meuble Forgali arrive à plat avec des instructions illustrées et toute la quincaillerie nécessaire. Voici comment faciliter la journée de montage.",
  "assembly.tip1Title": "Prévoyez une deuxième paire de bras",
  "assembly.tip1Text":
    "Le pin massif rend nos meubles magnifiques, et les boîtes grosses et lourdes. À deux adultes, le transport et le montage sont beaucoup plus faciles.",
  "assembly.tip2Title": "Chargez la perceuse",
  "assembly.tip2Text":
    "Tout peut se monter avec les outils manuels inclus, mais une perceuse accélère nettement l'assemblage.",
  "assembly.tip3Title": "Dégagez d'abord la pièce",
  "assembly.tip3Text":
    "Prévoyez beaucoup d'espace au sol pour étaler les panneaux et la quincaillerie avant de commencer.",
  "assembly.tip4Title": "Lisez avant de monter",
  "assembly.tip4Text":
    "Parcourez d'abord les instructions illustrées pour comprendre la conception : ça évite le classique recommencement pour une tête de lit à l'envers.",
  "assembly.tip5Title": "Prévoyez de 2 à 3 heures",
  "assembly.tip5Text":
    "De la table de chevet au lit superposé avec escalier, le temps d'assemblage varie. La plupart des lits se montent en un après-midi tranquille.",
  "assembly.instructionsTitle": "Besoin de vos instructions à nouveau?",
  "assembly.instructions1":
    "Des instructions imprimées étape par étape sont incluses dans chaque boîte. Si vous avez perdu les vôtres, écrivez à",
  "assembly.instructions2":
    "en indiquant votre numéro de commande et le nom du produit, et nous vous enverrons le PDF de votre modèle exact, habituellement dans les 24 heures.",
  "assembly.missing1": "Quincaillerie manquante ou pièce endommagée? Consultez",
  "assembly.returnsLink": "Retours et pièces manquantes",
  "assembly.missing2": " : nous expédions des pièces de remplacement.",
  "assembly.safeTitle": "Montez-le en toute sécurité",
  "assembly.safe1":
    "Suivez les recommandations de vos instructions concernant les garde-corps, la hauteur du matelas et l'âge : elles comptent, surtout pour les lits superposés et les lits mezzanine. Pour en savoir plus, consultez notre page",
  "assembly.safe2": ".",

  // --- safety page --------------------------------------------------------
  "safety.title": "Normes de sécurité",
  "safety.lead": "La sécurité de votre enfant est notre priorité absolue.",
  "safety.certTitle": "Certifications et conformité",
  "safety.certBody":
    "Les lits pour enfants que nous offrons sont fabriqués et testés selon les normes de sécurité applicables aux meubles pour enfants. Nous tenons à offrir des produits sécuritaires et bien construits pour votre famille.",
  "safety.hcTitle": "Conçus selon les directives de Santé Canada",
  "safety.hcBody":
    "Nos lits pour enfants sont conçus pour respecter les directives de Santé Canada concernant les meubles pour enfants.",
  "safety.vocTitle": "Finis à faible teneur en COV",
  "safety.vocBody": "Les lits sont recouverts de finis durables à faible teneur en COV.",
  "safety.structTitle": "Intégrité structurelle",
  "safety.structBody":
    "Les lits sont testés pour leur capacité de poids et leur stabilité structurelle afin de durer dans le temps.",
  "safety.guardTitle": "Garde-corps sur les lits surélevés",
  "safety.guardBody":
    "Les lits surélevés sont munis de garde-corps conçus pour respecter les exigences d'espacement sécuritaire standard.",
  "safety.tipsTitle": "Conseils de sécurité",
  "safety.tip1": "Suivez toujours attentivement les instructions d'assemblage",
  "safety.tip2": "Assurez-vous que toute la quincaillerie est bien serrée",
  "safety.tip3": "Inspectez régulièrement les lits pour repérer les pièces desserrées ou les dommages",
  "safety.tip4": "Utilisez les tailles de matelas appropriées, telles que spécifiées",
  "safety.tip5": "Gardez les lits loin des fenêtres et des sources de chaleur",

  // --- about page ---------------------------------------------------------
  "about.title": "À propos de Forgali",
  "about.lead":
    "Une boutique de meubles canadienne, en ligne seulement. Des lits, des meubles de salle à manger et de salon en bois massif (plus de 300) livrés gratuitement à votre porte, de Victoria à St. John's.",
  "about.storyTitle": "Notre histoire",
  "about.story1a": "Forgali est arrivée au meuble par le chemin le plus long : d'abord sous le nom de",
  "about.story1b":
    ", une salle de montre de meubles sur mesure dans la région du Grand Toronto. Des années à aménager des pièces pour des familles nous ont appris la même leçon encore et encore : les meubles que les gens regrettent ne sont presque jamais ceux en vrai bois.",
  "about.story2":
    "Nous avons donc fermé la salle de montre et rebâti l'entreprise en ligne. Pas de surface à payer, pas de vendeur à commission qui vous pousse vers le surplus de la semaine : seulement un catalogue que nous avons choisi nous-mêmes, livré gratuitement partout au pays.",
  "about.story3":
    "Ce dernier point compte plus qu'il ne le devrait. Beaucoup des meubles en bois massif que les Canadiens veulent sont faciles à trouver et pénibles à acheter ici : frais d'expédition transfrontaliers, surprises de courtage et politiques de retour qui excluent discrètement le Canada. Nous offrons ces pièces au pays pour que le prix affiché soit le prix payé, et pour qu'un retour soit un courriel plutôt qu'un problème d'expédition internationale.",
  "about.storyAlt": "Lit mezzanine haut simple en bois massif avec bureau dans une chambre d'enfant",
  "about.carryTitle": "Ce que nous offrons",
  "about.carryLead":
    "Deux pièces, faites comme il faut, plutôt qu'un peu de tout. Des lits qui grandissent avec l'enfant, et des meubles de salle à manger et de salon construits selon la même norme.",
  "about.carry1Title": "Lits pour enfants et pour la famille",
  "about.carry1Body":
    "Une centaine de configurations de lits superposés et de lits mezzanine (simple sur simple jusqu'à grand lit sur grand lit, en L, avec escalier, lit gigogne, bureau, glissoire ou tiroirs sous le lit), plus des lits plateforme en format simple, double et grand lit (queen).",
  "about.carry1Cta": "Magasiner les lits superposés",
  "about.carry1Alt": "Lit superposé simple sur simple Modern Farmhouse en bois massif",
  "about.carry2Title": "Salle à manger et salon Plank & Beam",
  "about.carry2Body":
    "164 pièces de la collection Plank & Beam (tables de salle à manger, chaises, bancs, tabourets de bar et de comptoir, tables basses et consoles, buffets et meubles TV), sans frais de douane.",
  "about.carry2Cta": "Magasiner la salle à manger et le salon",
  "about.carry2Alt": "Table et chaises de salle à manger en bois massif Plank & Beam",
  "about.carry3Title": "Rangement et pièces de finition",
  "about.carry3Body":
    "Commodes et tables de chevet aux finis assortis, tiroirs de rangement sous le lit, garde-corps supplémentaires, bureaux et matelas minces adaptés aux dégagements des lits superposés et mezzanine, pour finir une chambre comme il faut au lieu de l'assembler à partir de quatre magasins différents.",
  "about.carry3Cta": "Magasiner le rangement et les accessoires",
  "about.carry3Alt": "Lit superposé double sur double en bois massif avec tiroirs de rangement sous le lit",
  "about.buildTitle": "Ce que « bois massif » veut dire ici",
  "about.buildLead":
    "Beaucoup de meubles sont décrits comme étant en bois massif. Voici les spécifications derrière les nôtres : ce qu'on veut savoir avant d'installer un enfant dans le lit du haut.",
  "about.spec1Title": "Pin massif de Nouvelle-Zélande",
  "about.spec1Body":
    "Des structures en pin massif sans nœuds, pas des panneaux de particules ni du placage sur MDF. C'est pour ça que les boîtes sont lourdes, et c'est pour ça que le lit tient encore debout quand il passe au suivant.",
  "about.spec2Title": "Finis à faible teneur en COV, certifiés GREENGUARD Gold",
  "about.spec2Body":
    "Des finis durables et non toxiques. Plusieurs des lits que nous offrons sont certifiés GREENGUARD Gold : testés de façon indépendante pour leurs faibles émissions chimiques dans l'air intérieur.",
  "about.spec3Title": "400 lb par lit",
  "about.spec3Body":
    "La plupart de nos lits superposés et mezzanine supportent 400 lb par surface de couchage, sur des lattes de pin massif avec une barre de soutien centrale en métal. Ils tiennent les tout-petits, les ados et le parent qui lit l'histoire du soir.",
  "about.spec4Title": "Assemblages métal sur métal",
  "about.spec4Body":
    "Les joints structurels sont métal dans métal plutôt que des vis dans le bois : ils ne se desserrent pas et ne se mettent pas à craquer après un an d'escalade.",
  "about.spec5Title": "Garde-corps et normes de sécurité",
  "about.spec5Body":
    "Les lits pour enfants sont fabriqués et testés selon les normes de sécurité applicables aux meubles pour enfants, et les lits surélevés sont livrés avec des garde-corps conçus selon l'espacement standard.",
  "about.spec6Title": "Des lits qui évoluent avec la chambre",
  "about.spec6Body":
    "La plupart des lits superposés se séparent en deux lits indépendants, et bien des lits mezzanine accueillent un bureau, un rideau ou des tiroirs en dessous : un seul achat qui traverse plus d'une étape de l'enfance.",
  "about.safetyMore1":
    "Pour en savoir plus sur les garde-corps, la taille des matelas et l'installation sécuritaire, consultez notre page",
  "about.safetyMore2": ".",
  "about.howTitle": "Comment ça se passe quand vous achetez chez nous",
  "about.howLead":
    "Pas d'abonnement, pas de supplément de livraison, pas de petits caractères. Voici tout le processus, du début à la fin.",
  "about.how1Title": "Livraison gratuite, partout au Canada",
  "about.how1Body":
    "Chaque commande est livrée gratuitement à toute adresse au Canada : aucun minimum, aucune surprise à la caisse, aucuns droits de douane ni frais de courtage.",
  "about.how1Link": "Détails de livraison",
  "about.how2Title": "Suivie de notre porte à la vôtre",
  "about.how2Body":
    "La plupart des commandes sont préparées en une semaine environ, et la livraison prend généralement de 12 à 18 jours ouvrables au total. Vous recevez un numéro de suivi par courriel dès l'expédition.",
  "about.how2Link": "Délais de traitement et de livraison",
  "about.how3Title": "Un assemblage qu'on peut vraiment terminer",
  "about.how3Body":
    "Les lits arrivent à plat avec des instructions étape par étape et toute la quincaillerie. La plupart se montent en une à deux heures avec des outils de base et une deuxième paire de bras.",
  "about.how3Link": "Guide d'assemblage",
  "about.how4Title": "30 jours pour changer d'idée",
  "about.how4Body":
    "Retournez les articles neufs, inutilisés et non assemblés dans les 30 jours. Si un article arrive endommagé, défectueux ou erroné, nous payons les frais de retour et annulons les frais de remise en stock.",
  "about.how4Link": "Retours et annulations",
  "about.how5Title": "Cinq ans de garantie derrière chaque pièce",
  "about.how5Body":
    "Une garantie limitée de 5 ans contre les défauts de matériaux et de fabrication, et des pièces de remplacement (un sac de boulons, une latte, un panneau) envoyées sur demande.",
  "about.how5Link": "Couverture de garantie",
  "about.findTitle": "Où nous trouver",
  "about.findBody":
    "Forgali est une boutique 100\u00a0% en ligne. Nous n'avons pas de salle de montre, et c'est un choix délibéré : c'est en partie pourquoi la livraison est gratuite et les prix sont ce qu'ils sont. Appelez-nous au (647) 527-2110 ou écrivez à l'adresse ci-dessous; dans les deux cas, une vraie personne vous répond.",
  "about.respond":
    "Nous répondons dans les 24 heures, du lundi au vendredi, de 9\u00a0h à 17\u00a0h (HE). Indiquez votre numéro de commande si vous en avez un.",
  "about.sendMessage": "Écrivez-nous →",
  "about.noteTitle": "Une note sur les anciennes fiches",
  "about.noteBody":
    "L'ancien chapitre de Forgali sous le nom de Forgali Design Centre, une salle de montre de meubles sur mesure à Mississauga, est fermé définitivement, tout comme l'ancien emplacement de Concord. Les fiches d'annuaire qui affichent encore une salle de montre au 2111 Dunwin Dr., une adresse à Concord ou des numéros de téléphone comme le (905) 820-2020 ou le (905) 820-9461 sont périmées : ces emplacements sont fermés et les numéros ne sont plus en service. Forgali fonctionne aujourd'hui entièrement en ligne. Notre numéro de téléphone actuel est le (647) 527-2110, et vous pouvez aussi nous joindre par courriel :",
  "about.ctaBody":
    "Du vrai bois massif, à prix juste, livré gratuitement partout au Canada. Jetez un coup d'œil, et si vous hésitez entre deux finis ou si vous n'êtes pas certain qu'un lit mezzanine passera sous votre plafond, écrivez-nous simplement.",
  "about.shopBeds": "Magasiner les lits",
};

export type MessageKey = keyof typeof en;
export type MessageVars = Record<string, string | number>;
export const MESSAGES: Record<Locale, Record<MessageKey, string>> = { en, fr };

/** Fill `{name}` placeholders; unknown names are left as written. */
export const interpolate = (template: string, vars?: MessageVars): string =>
  vars ? template.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match)) : template;

// ---------------------------------------------------------------------------
// Product option labels. Shopify's auto-translation (Translate & Adapt, run
// 2026-10-19) rendered the option name "Finish" as "Terminer" (the verb "to
// finish") on all 275 finish-bearing products and the value "Espresso" as
// "Expresso". Those translations live per product in Shopify, so until they are
// corrected there (Admin API translationsRegister, or one by one in Translate &
// Adapt) the storefront overrides them here. Keys are the ENGLISH option
// name/value, which the product page has thanks to the English-shape overlay in
// shopifyService.ts; anything not listed falls back to Shopify's translation.
// ---------------------------------------------------------------------------
const OPTION_NAME_OVERRIDES: Record<Locale, Record<string, string>> = {
  en: {},
  fr: {
    Finish: "Fini",
    "Chair Finish": "Fini de la chaise",
    "Table Finish": "Fini de la table",
    "Table and Bench Finish": "Fini de la table et du banc",
    "Curtain/Finish": "Rideau/Fini",
  },
};

const OPTION_VALUE_OVERRIDES: Record<Locale, Record<string, string>> = {
  en: {},
  fr: { Espresso: "Espresso" },
};

/** Display label for an option name: override → Shopify translation → English. */
export const optionNameLabel = (locale: Locale, name: string, translated?: string): string =>
  OPTION_NAME_OVERRIDES[locale][name] ?? translated ?? name;

/** Display label for an option value: override → Shopify translation → English. */
export const optionValueLabel = (locale: Locale, value: string, translated?: string): string =>
  OPTION_VALUE_OVERRIDES[locale][value] ?? translated ?? value;

// ---------------------------------------------------------------------------
// Dimension table. The `specs.dimension_table` metafield is JSON whose labels
// and units Shopify's auto-translation never touched ("Length (L)", "IN" in
// both languages, checked across all 298 products on 2026-10-28), so the
// product page maps them here. Values ("Twin/Full") stay as Shopify sends them.
// ---------------------------------------------------------------------------
const DIMENSION_LABELS: Record<Locale, Record<string, string>> = {
  en: {},
  fr: {
    "Length (L)": "Longueur (L)",
    "Width (W)": "Largeur (l)",
    "Height (H)": "Hauteur (H)",
    "Weight (WT)": "Poids",
    Size: "Format",
    "Number of Drawers": "Nombre de tiroirs",
    Thickness: "Épaisseur",
    Diameter: "Diamètre",
  },
};

const DIMENSION_UNITS: Record<Locale, Record<string, string>> = {
  en: {},
  fr: { IN: "po", LB: "lb" },
};

export const dimensionLabel = (locale: Locale, label: string): string =>
  DIMENSION_LABELS[locale][label] ?? label;

export const dimensionUnit = (locale: Locale, unit: string): string =>
  DIMENSION_UNITS[locale][unit] ?? unit;

// ---------------------------------------------------------------------------
// Category and subcategory names keyed by slug. The English names live in
// src/lib/categoryInfo.ts and src/lib/subcategories.ts (Phase 4 data modules);
// these maps only give the French the tab strip, the product breadcrumb and
// the category 404 need today. Anything not listed falls back to the English.
// ---------------------------------------------------------------------------
const CATEGORY_NAMES_FR: Record<string, string> = {
  "bunk-beds": "Lits superposés",
  "loft-beds": "Lits mezzanine",
  "single-beds": "Lits classiques",
  mattresses: "Matelas",
  accessories: "Rangement et accessoires",
  bedroom: "Chambre",
  dining: "Salle à manger",
  living: "Salon",
};

const SUBCATEGORY_NAMES_FR: Record<string, string> = {
  "twin-over-twin": "Simple sur simple",
  "twin-over-full": "Simple sur double",
  "full-over-full": "Double sur double",
  "queen-bunk": "Grand lit (queen)",
  "l-shaped": "En L",
  "multi-bunk": "Triples et quadruples",
  "low-bunk": "Superposés bas",
  "with-slide": "Avec glissoire",
  "with-stairs": "Avec escalier",
  "low-loft": "Mezzanine basse",
  "mid-loft": "Mezzanine mi-hauteur",
  "high-loft": "Mezzanine haute",
  "loft-with-desk": "Avec bureau",
  "loft-with-slide": "Avec glissoire",
  "corner-loft": "Mezzanine en coin",
  platform: "Plateforme",
  "house-bed": "Château et maisonnette",
  "floor-bed": "Tout-petits et au sol",
  traditional: "Classique",
  "trundle-bed": "Gigogne",
  storage: "Commodes et rangement",
  desks: "Bureaux",
  "bookcases-shelves": "Bibliothèques",
  nightstands: "Tables de chevet",
  "dining-tables": "Tables de salle à manger",
  "dining-chairs": "Chaises de salle à manger",
  "dining-benches": "Bancs",
  "bar-counter-chairs": "Chaises de bar et de comptoir",
  "dining-sets": "Ensembles de salle à manger",
  "round-dining-tables": "Rondes et ovales",
  "kitchen-tables": "Tables de cuisine",
  "counter-stools": "Tabourets de comptoir",
  "bar-stools": "Tabourets de bar",
  "coffee-tables": "Tables basses",
  "console-tables": "Consoles",
  "side-tables": "Tables d'appoint",
  sideboards: "Buffets",
  "tv-stands": "Meubles TV",
  shelves: "Étagères",
  entryway: "Bancs d'entrée",
  "round-coffee-tables": "Tables basses rondes",
  "console-tables-with-storage": "Consoles avec rangement",
  "mid-century-modern": "Mid-century moderne",
};

/** Category name for a slug: French map in French, else the English `fallback`. */
export const categoryName = (locale: Locale, slug: string, fallback: string): string =>
  locale === "fr" ? CATEGORY_NAMES_FR[slug] ?? fallback : fallback;

/** Subcategory tab name for a slug: French map in French, else the English `fallback`. */
export const subcategoryName = (locale: Locale, slug: string, fallback: string): string =>
  locale === "fr" ? SUBCATEGORY_NAMES_FR[slug] ?? fallback : fallback;
