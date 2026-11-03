import { useState } from "react";
import { useLocale } from "@/i18n/LocaleContext";
import { Link } from "@/i18n/router";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useShopifyProducts, getProductByHandle } from "@/hooks/useShopifyProducts";
import { useCart } from "@/context/CartContext";
import { fetchShopifyProductByHandle, convertShopifyProduct } from "@/services/shopifyService";
import { cdnImage, getProxiedImage } from "@/lib/imageProxy";
// The look photo is cropped by Shopify's CDN (crop=region) straight from the
// Risa Banquette's own product image, so no copy lives in src/assets.
// Hotspot positions are percentages of these exact crops — if either crop
// changes, the coordinates must be redone.
const LOOK_PHOTO =
  "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2700336007-p05__2.jpg?v=1783708283";
const lookDesktop = `${LOOK_PHOTO}&crop=region&crop_left=0&crop_top=1020&crop_width=2000&crop_height=625`;
const lookMobile = `${LOOK_PHOTO}&width=1000&height=1500&crop=region&crop_left=145&crop_top=0&crop_width=1333&crop_height=2000`;

// The static title/price/image values are fallbacks so the section renders
// even if the Storefront fetch fails; live catalog data replaces them once
// the shared products cache loads. `options` + `lookPrice` describe the exact
// variant in the photo, which is what "Add the Whole Look" puts in the cart.
const HOTSPOTS = [
  {
    number: 1,
    handle: "risa-banquette",
    title: "Plank & Beam Risa Banquette",
    price: 794.9,
    originalPrice: 880,
    fromPrice: true, // four finishes, with or without cushions
    sku: "2700336007-P05", // the exact variant in the photo (Pecan / Cream cushions)
    options: { Finish: "Pecan", "Cushion Addition": "Cream" } as Record<string, string>,
    lookPrice: 1024.9,
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2700336000-007__1.jpg?v=1783608427",
    desktop: { top: "56%", left: "22%" },
    mobile: { top: "68%", left: "21%" },
  },
  {
    number: 2,
    handle: "verso-round-dining-table-47",
    title: 'Plank & Beam Verso Round Dining Table - 47"',
    price: 440.9,
    originalPrice: 490,
    fromPrice: true, // Black is priced below Pecan and Blonde
    sku: "2900306000-007", // Pecan — the finish in the photo
    options: { Finish: "Pecan" } as Record<string, string>,
    lookPrice: 670.9,
    image:
      "https://cdn.shopify.com/s/files/1/0972/6492/6995/files/2900306000-007__1_eba921e7-237e-49aa-b44e-63af1dc7b0f9.jpg?v=1783608513",
    desktop: { top: "27%", left: "52%" },
    mobile: { top: "60%", left: "66%" },
  },
];

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
}) => {
  const { t, money } = useLocale();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label={t("look.shopItem", { title })}
          style={{ top: coords.top, left: coords.left }}
          // after:-inset-2.5 expands the tap target to ~48px (mobile guideline)
          // while the visible dot stays 28px
          className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-[13px] font-semibold text-foreground shadow-md ring-2 ring-black/5 transition-all duration-200 after:absolute after:-inset-2.5 after:rounded-full after:content-[''] hover:scale-110 data-[state=open]:bg-brand data-[state=open]:text-white"
        >
          {spot.number}
        </button>
      </PopoverTrigger>
      <PopoverContent side="top" className="w-64 p-3">
        <div className="flex gap-3">
          <Link to={`/product/${spot.handle}`} className="shrink-0">
            <img
              src={cdnImage(getProxiedImage(image), 200)}
              alt={title}
              loading="lazy"
              className="h-20 w-20 rounded-lg bg-brand-tint object-cover"
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
              <span className="font-bold text-brand-accent">
                {spot.fromPrice ? t("from") : ""}{money(price)}
              </span>
              {originalPrice && (
                <span className="text-xs text-muted-foreground line-through">
                  {money(originalPrice)}
                </span>
              )}
            </div>
            <Link
              to={`/product/${spot.handle}`}
              className="mt-2 inline-block text-sm font-semibold text-brand-accent hover:underline"
            >
              {t("look.shopNow")}
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export const ShopTheLook = () => {
  const { t, money } = useLocale();
  const { products } = useShopifyProducts();
  const { addToCart } = useCart();
  const [lookState, setLookState] = useState<"idle" | "adding" | "added" | "partial" | "error">("idle");
  const [missingPieces, setMissingPieces] = useState<string[]>([]);

  const resolved = HOTSPOTS.map((spot) => {
    const live = getProductByHandle(products, spot.handle);
    // The whole-look total charges the photographed variant, not the "From"
    // price. The list cache has no SKUs, so match the variant by its options.
    const liveVariant = live?.variants.find((v) =>
      Object.entries(spot.options).every(([name, value]) =>
        v.options.some((o) => o.name === name && o.value === value)
      )
    );
    // Resolve as a UNIT: once live data has loaded it wins for EVERY field,
    // including its absences. Field-by-field nullish fallback would re-apply
    // the hardcoded compare-at after a sale ends (live.originalPrice
    // undefined), showing a strikethrough that no longer exists.
    return live
      ? {
          spot,
          title: live.name,
          price: live.price,
          originalPrice: live.originalPrice,
          image: live.image || spot.image,
          lookPrice: liveVariant?.price ?? spot.lookPrice,
        }
      : {
          spot,
          title: spot.title,
          price: spot.price,
          originalPrice: spot.originalPrice,
          image: spot.image,
          lookPrice: spot.lookPrice,
        };
  });

  const lookTotal = resolved.reduce((sum, r) => sum + r.lookPrice, 0);

  // Add the photographed variants to the cart. Fetches each product by
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
    <section aria-label={t("look.aria")} className="py-16">
      <div className="mx-auto mb-10 max-w-rail px-4 text-center">
        <h2 className="text-3xl font-bold">{t("look.title")}</h2>
      </div>

      <div className="relative w-full overflow-hidden aspect-[2/3] md:aspect-[16/5]">
        <picture>
          <source media="(max-width: 767px)" srcSet={lookMobile} />
          <img
            src={lookDesktop}
            alt={t("look.alt")}
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

      <div className="mx-auto mt-6 flex max-w-rail flex-wrap justify-center gap-x-8 gap-y-2 px-4">
        {resolved.map(({ spot, title, price }) => (
          <Link
            key={spot.handle}
            to={`/product/${spot.handle}`}
            className="group inline-flex items-center gap-2 text-sm"
          >
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-white">
              {spot.number}
            </span>
            <span className="text-muted-foreground group-hover:text-foreground group-hover:underline">
              {title} · {spot.fromPrice ? t("from") : ""}{money(price)}
            </span>
          </Link>
        ))}
      </div>

      <div className="mx-auto mt-6 max-w-rail px-4 text-center">
        <button
          type="button"
          onClick={addTheLook}
          disabled={lookState !== "idle" && lookState !== "error"}
          className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-hover disabled:opacity-70"
        >
          {lookState === "adding"
            ? t("look.adding")
            : lookState === "added"
              ? t("look.added")
              : lookState === "partial"
                ? t("look.partial", { added: HOTSPOTS.length - missingPieces.length, total: HOTSPOTS.length })
                : t("look.addAll", { total: money(lookTotal) })}
        </button>
        <p className="mt-2 text-xs text-muted-foreground">
          {t("look.note")}
        </p>
        {lookState === "partial" && (
          <p role="status" className="mt-2 text-sm text-muted-foreground">
            {t("look.partialNote", { pieces: missingPieces.join(", ") })}
          </p>
        )}
        {lookState === "error" && (
          <p role="alert" className="mt-2 text-sm text-red-500">
            {t("look.error")}
          </p>
        )}
      </div>
    </section>
  );
};

export default ShopTheLook;
