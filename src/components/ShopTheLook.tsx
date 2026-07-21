import { useState } from "react";
import { Link } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useShopifyProducts, getProductByHandle } from "@/hooks/useShopifyProducts";
import { useCart } from "@/context/CartContext";
import { fetchShopifyProductByHandle, convertShopifyProduct } from "@/services/shopifyService";
import { getProxiedImage } from "@/lib/imageProxy";
import lookDesktop from "@/assets/shop-the-look-dining.jpg";
import lookMobile from "@/assets/shop-the-look-dining-mobile.jpg";

// Hotspot positions are percentages of the exact image crops committed to
// src/assets — if either image is re-cropped, the coordinates must be redone.
// The static title/price/image values are fallbacks so the section renders
// even if the Storefront fetch fails; live catalog data replaces them once
// the shared products cache loads.
const HOTSPOTS = [
  {
    number: 1,
    handle: "sereno-dining-chair",
    title: "Plank+Beam Sereno Dining Chair",
    price: 352.9,
    originalPrice: 390,
    fromPrice: true, // sold as Individual / Set of 2 / Set of 4
    sku: "2800333000-412", // the exact variant in the photo (Antique White / Individual)
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2800333000-412__1_16c4c3ec-7f03-4a05-b47d-e4ace0f43fd7.jpg?v=1783608474",
    desktop: { top: "75%", left: "25%" },
    mobile: { top: "62%", left: "15%" },
  },
  {
    number: 2,
    handle: "lido-oval-dining-table-72",
    title: 'Plank+Beam Lido Oval Dining Table - 72"',
    price: 847.9,
    originalPrice: 930,
    fromPrice: false,
    sku: "3500331000-008", // Walnut — the finish in the photo
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/3500331000-008__1_db9af7f1-9e95-481c-82f1-76410c00573b.jpg?v=1783608485",
    desktop: { top: "41%", left: "38%" },
    mobile: { top: "49%", left: "38%" },
  },
  {
    number: 3,
    handle: "arcata-console-table-56",
    title: 'Plank+Beam Arcata Console Table - 56"',
    price: 600.9,
    originalPrice: 660,
    fromPrice: false,
    sku: "2600425900-014", // Cerused White — the finish in the photo
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2600425900-014__1_25f566d3-2d94-4b5f-a5dc-1a1fe4172f1b.jpg?v=1783608426",
    desktop: { top: "50%", left: "83%" },
    mobile: { top: "46%", left: "90%" },
  },
];

const formatPrice = (n: number) =>
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

type Hotspot = (typeof HOTSPOTS)[number];
type Coords = { top: string; left: string };

const HotspotPopover = ({
  spot,
  coords,
  title,
  price,
  originalPrice,
  image,
}: {
  spot: Hotspot;
  coords: Coords;
  title: string;
  price: number;
  originalPrice?: number;
  image: string;
}) => (
  <Popover>
    <PopoverTrigger asChild>
      <button
        aria-label={`Shop ${title}`}
        style={{ top: coords.top, left: coords.left }}
        // after:-inset-2.5 expands the tap target to ~48px (mobile guideline)
        // while the visible dot stays 28px
        className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-foreground shadow-md ring-2 ring-black/5 transition-all duration-200 after:absolute after:-inset-2.5 after:rounded-full after:content-[''] hover:scale-110 data-[state=open]:bg-[#4A647C] data-[state=open]:text-white"
      >
        {spot.number}
      </button>
    </PopoverTrigger>
    <PopoverContent side="top" className="w-64 p-3">
      <div className="flex gap-3">
        <Link to={`/product/${spot.handle}`} className="shrink-0">
          <img
            src={getProxiedImage(image)}
            alt={title}
            loading="lazy"
            className="h-20 w-20 rounded-lg bg-[#f2f4f6] object-cover"
          />
        </Link>
        <div className="min-w-0">
          <Link
            to={`/product/${spot.handle}`}
            className="line-clamp-2 text-sm font-medium leading-snug hover:underline"
          >
            {title}
          </Link>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-bold text-primary">
              {spot.fromPrice ? "From " : ""}${formatPrice(price)}
            </span>
            {originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${formatPrice(originalPrice)}
              </span>
            )}
          </div>
          <Link
            to={`/product/${spot.handle}`}
            className="mt-2 inline-block text-sm font-semibold text-[#4A647C] hover:underline"
          >
            Shop Now →
          </Link>
        </div>
      </div>
    </PopoverContent>
  </Popover>
);

export const ShopTheLook = () => {
  const { products } = useShopifyProducts();
  const { addToCart } = useCart();
  const [lookState, setLookState] = useState<"idle" | "adding" | "added" | "partial" | "error">("idle");
  const [missingPieces, setMissingPieces] = useState<string[]>([]);

  const resolved = HOTSPOTS.map((spot) => {
    const live = getProductByHandle(products, spot.handle);
    return {
      spot,
      title: live?.name ?? spot.title,
      price: live?.price ?? spot.price,
      originalPrice: live?.originalPrice ?? spot.originalPrice,
      image: live?.image || spot.image,
    };
  });

  const lookTotal = resolved.reduce((sum, r) => sum + r.price, 0);

  // Add the three photographed variants to the cart. Fetches each product by
  // handle (the list cache has no SKUs) and matches the EXACT variant in the
  // photo by SKU. No silent substitution: if the photographed piece is
  // missing or sold out we skip it and say so, rather than adding a
  // different finish or set size under a success message.
  const addTheLook = async () => {
    if (lookState === "adding" || lookState === "added" || lookState === "partial") return;
    setLookState("adding");
    const missing: string[] = [];
    for (const spot of HOTSPOTS) {
      try {
        const shopifyProduct = await fetchShopifyProductByHandle(spot.handle);
        const converted = shopifyProduct ? convertShopifyProduct(shopifyProduct) : null;
        const variant = converted?.variants.find(
          v => v.sku === spot.sku && v.availableForSale
        );
        if (!converted || !variant) {
          missing.push(spot.title.replace(/^Plank\+Beam /, ""));
          continue;
        }
        const finish = variant.options.find(o => /finish|colou?r/i.test(o.name))?.value;
        addToCart(converted, 1, finish, variant.id);
      } catch {
        missing.push(spot.title.replace(/^Plank\+Beam /, ""));
      }
    }
    setMissingPieces(missing);
    setLookState(
      missing.length === 0 ? "added" : missing.length < HOTSPOTS.length ? "partial" : "error"
    );
  };

  return (
    <section aria-label="Shop the Look" className="py-16">
      <div className="mx-auto mb-10 max-w-7xl px-4 text-center">
        <h2 className="text-3xl font-bold">Made for Real Gatherings</h2>
        <p className="mt-2 text-lg text-muted-foreground">
          Shop the look — tap a number to shop the piece
        </p>
      </div>

      <div className="relative w-full overflow-hidden aspect-[2/3] md:aspect-[16/5]">
        <picture>
          <source media="(max-width: 767px)" srcSet={lookMobile} />
          <img
            src={lookDesktop}
            alt="Plank+Beam dining room — Lido oval dining table with Sereno dining chairs and an Arcata console table"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>

        <div className="hidden md:block">
          {resolved.map(({ spot, ...p }) => (
            <HotspotPopover key={spot.handle} spot={spot} coords={spot.desktop} {...p} />
          ))}
        </div>
        <div className="md:hidden">
          {resolved.map(({ spot, ...p }) => (
            <HotspotPopover key={spot.handle} spot={spot} coords={spot.mobile} {...p} />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-2 px-4">
        {resolved.map(({ spot, title, price }) => (
          <Link
            key={spot.handle}
            to={`/product/${spot.handle}`}
            className="group inline-flex items-center gap-2 text-sm"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4A647C] text-[11px] font-semibold text-white">
              {spot.number}
            </span>
            <span className="text-muted-foreground group-hover:text-foreground group-hover:underline">
              {title} · {spot.fromPrice ? "From " : ""}${formatPrice(price)}
            </span>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-7xl px-4 text-center">
        <button
          type="button"
          onClick={addTheLook}
          disabled={lookState !== "idle" && lookState !== "error"}
          className="rounded-full bg-[#4A647C] px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3A5066] disabled:opacity-70"
        >
          {lookState === "adding"
            ? "Adding the look…"
            : lookState === "added"
              ? "Look added to cart ✓"
              : lookState === "partial"
                ? `Added ${HOTSPOTS.length - missingPieces.length} of ${HOTSPOTS.length} pieces`
                : `Add the Whole Look to Cart · $${formatPrice(lookTotal)}`}
        </button>
        <p className="mt-2 text-xs text-muted-foreground">
          Adds the table, one chair, and the console in the finishes shown.
        </p>
        {lookState === "partial" && (
          <p role="status" className="mt-2 text-sm text-muted-foreground">
            Currently unavailable: {missingPieces.join(", ")} — the rest of the
            look is in your cart.
          </p>
        )}
        {lookState === "error" && (
          <p role="alert" className="mt-2 text-sm text-red-500">
            Couldn&rsquo;t add the look — try the pieces individually.
          </p>
        )}
      </div>
    </section>
  );
};

export default ShopTheLook;
