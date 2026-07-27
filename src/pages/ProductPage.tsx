import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Seo } from "@/components/Seo";
import { Check, Truck, Shield, Lock, Minus, Plus, Loader2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useShopifyProduct, useShopifyProducts, getRelatedProducts } from "@/hooks/useShopifyProducts";
import { getVariantImages, ConvertedProduct } from "@/services/shopifyService";
import { getFinishColor } from "@/lib/finishColors";

const MAX_QUANTITY = 10;

const FINISH_OPTION_NAMES = ["finish", "color", "wood finish"];
const isFinishLike = (name: string) => FINISH_OPTION_NAMES.includes(name.toLowerCase());

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error, detailLoaded, notFound } = useShopifyProduct(id);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex flex-col items-center justify-center py-32 gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-[#4A647C]" />
          <p className="text-muted-foreground">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  // Error or not found state. The Seo noindex matters: dead product URLs
  // otherwise serve a 200 shell that keeps the PREVIOUS route's title,
  // canonical, and product JSON-LD — indexable ghost pages.
  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Seo
          title={notFound ? "Product Not Found | Forgali" : "Something Went Wrong | Forgali"}
          description="This product could not be found."
          path={`/product/${id ?? ""}`}
          noindex
        />
        <Header />
        <div className="flex flex-col items-center justify-center py-32 gap-4 px-4 text-center">
          <h1 className="text-2xl font-bold">
            {notFound ? "We couldn't find that product" : "Something went wrong"}
          </h1>
          <p className="text-muted-foreground text-lg max-w-md">
            {notFound
              ? "It may have been renamed or is no longer available — but the rest of the collection is right here."
              : "Please try again in a moment."}
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <Link to="/category/dining" className="text-[#4A647C] hover:underline">
              Shop Dining
            </Link>
            <Link to="/category/living" className="text-[#4A647C] hover:underline">
              Shop Living
            </Link>
            <Link to="/category/bedroom" className="text-[#4A647C] hover:underline">
              Shop Bedroom
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Keyed by product id so ALL local state (quantity, selections, image index,
  // image errors) resets when navigating between products — reused state let a
  // stale quantity of 3 carry over onto the next PDP.
  return <ProductView key={product.id} product={product} detailLoaded={detailLoaded} />;
};

const ProductView = ({ product, detailLoaded }: { product: ConvertedProduct; detailLoaded: boolean }) => {
  const { products: allProducts } = useShopifyProducts();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  // Every real product option gets a selector (finish swatches, size/quantity/
  // feature pills). The old page recognized only a "finish" axis and silently
  // added variants[0] for anything else — 42 products' variants were
  // unreachable and could ship the wrong item.
  const options = useMemo(
    () => (product.options ?? []).filter(o => o.values.length > 0 && !o.values.includes("Default Title")),
    [product]
  );

  const [selections, setSelections] = useState<Record<string, string>>(() => {
    const first = product.variants.find(v => v.availableForSale) ?? product.variants[0];
    const init: Record<string, string> = {};
    first?.options.forEach(o => {
      if (o.value !== "Default Title") init[o.name] = o.value;
    });
    return init;
  });

  const variantMatches = (variant: ConvertedProduct["variants"][number], sel: Record<string, string>) =>
    Object.entries(sel).every(([name, value]) =>
      variant.options.some(o => o.name === name && o.value === value)
    );

  const resolvedVariant = useMemo(() => {
    if (options.length === 0) return product.variants[0];
    return product.variants.find(v => variantMatches(v, selections));
  }, [product, options, selections]);

  // Selecting a value keeps the other axes when that combination exists;
  // otherwise snap to a variant carrying the clicked value — preferring an
  // IN-STOCK one so a click never lands on a sold-out variant when an
  // available sibling with the same value exists.
  const handleSelect = (optionName: string, value: string) => {
    const next = { ...selections, [optionName]: value };
    if (!product.variants.some(v => variantMatches(v, next))) {
      const hasValue = (v: ConvertedProduct["variants"][number]) =>
        v.options.some(o => o.name === optionName && o.value === value);
      const carrier =
        product.variants.find(v => v.availableForSale && hasValue(v)) ||
        product.variants.find(hasValue);
      if (carrier) {
        const snapped: Record<string, string> = {};
        carrier.options.forEach(o => {
          if (o.value !== "Default Title") snapped[o.name] = o.value;
        });
        setSelections(snapped);
      } else {
        setSelections(next);
      }
    } else {
      setSelections(next);
    }
  };

  const finishAxis = options.find(o => isFinishLike(o.name));
  const selectedFinishName = finishAxis ? selections[finishAxis.name] ?? "" : "";

  // Reset the gallery whenever the RESOLVED finish changes — including when a
  // non-finish click snaps to a different finish (which the old per-click reset
  // missed, leaving a stale "6 / 3" counter and wrong image).
  useEffect(() => {
    setSelectedImage(0);
    setImageErrors(new Set());
  }, [selectedFinishName]);

  // Gallery for the selected finish; the resolved variant's SKU picks the
  // cleanest angle set when filenames are SKU-encoded (Plank & Beam)
  const finishImages = useMemo(() => {
    if (!product) return [];
    const imgs = getVariantImages(product, selectedFinishName || undefined, resolvedVariant?.sku);
    return imgs.length > 0 ? imgs : [product.image];
  }, [product, selectedFinishName, resolvedVariant]);

  // Generic same-category fallback ("You May Also Like")
  const relatedProducts = useMemo(() => {
    if (!product || allProducts.length === 0) return [];
    return getRelatedProducts(allProducts, product, 4);
  }, [product, allProducts]);

  // Curated same-style cross-sells (custom.related_products metafield);
  // when present these replace the generic category-based fallback below
  const completeTheRoom = (product?.relatedProducts ?? []).filter(
    r => r.availableForSale && r.image
  );

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set([...prev, index]));
  };

  const getImageSrc = (index: number) => {
    if (!product || finishImages.length === 0) return "";
    if (imageErrors.has(index) && finishImages.length > index + 1) {
      return finishImages[index + 1] || finishImages[0] || product.image;
    }
    return finishImages[index] || finishImages[0] || product.image;
  };

  const canPurchase = !!resolvedVariant && resolvedVariant.availableForSale;

  const handleAddToCart = () => {
    if (product && resolvedVariant && canPurchase) {
      // Label the cart line with the FULL variant (e.g. "Blonde / Set of 4"),
      // not just the finish — otherwise a size/set/config choice is invisible
      // in the cart and two lines look identical.
      const label =
        resolvedVariant.title && resolvedVariant.title !== "Default Title"
          ? resolvedVariant.title
          : selectedFinishName || undefined;
      addToCart(product, quantity, label, resolvedVariant.id);
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  const displayPrice = resolvedVariant?.price ?? product.price;
  const displayCompareAt = resolvedVariant ? resolvedVariant.compareAtPrice : product.originalPrice;

  const discountPercent = displayCompareAt && displayCompareAt > displayPrice
    ? Math.round((1 - displayPrice / displayCompareAt) * 100)
    : 0;

  const specs = product.specs || {};
  const isBed = ["bunk-beds", "loft-beds", "single-beds"].includes(product.category);
  const isMattress = product.category === "mattresses";

  // Product JSON-LD for rich results (no reviews/aggregateRating — the site
  // has no review system).
  const productJsonLd = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images.length ? product.images.slice(0, 8) : [product.image],
    description: product.description,
    brand: { "@type": "Brand", name: "Forgali" },
    offers: {
      "@type": "Offer",
      url: `https://www.forgali.com/product/${product.handle}`,
      priceCurrency: "CAD",
      // Match the price the page actually shows for the resolved variant, so
      // structured data can't disagree with the visible price.
      price: displayPrice.toFixed(2),
      availability: product.availableForSale
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo
        title={`${product.name} | Forgali`}
        description={
          product.description
            ? product.description.slice(0, 160)
            : `${product.name} — solid wood furniture with free Canada-wide shipping from Forgali.`
        }
        path={`/product/${product.handle}`}
        image={product.image}
        type="product"
        jsonLd={productJsonLd}
      />
      <Header />

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-foreground capitalize">
            {product.category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-secondary group">
              <img
                src={getImageSrc(selectedImage)}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={() => handleImageError(selectedImage)}
                loading="eager"
              />
              {finishImages.length > 1 && (
                <>
                  <button
                    aria-label="Previous image"
                    onClick={() => setSelectedImage(i => (i - 1 + finishImages.length) % finishImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-foreground" />
                  </button>
                  <button
                    aria-label="Next image"
                    onClick={() => setSelectedImage(i => (i + 1) % finishImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-foreground" />
                  </button>
                  <span className="absolute bottom-3 right-3 bg-black/50 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                    {selectedImage + 1} / {finishImages.length}
                  </span>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {finishImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {finishImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    aria-label={`View image ${index + 1} of ${finishImages.length}`}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-[#4A647C]" : "border-transparent"
                    }`}
                  >
                    <img
                      src={imageErrors.has(index) ? finishImages[index + 1] || finishImages[0] || product.image : img}
                      alt={`${product.name} ${selectedFinishName} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={() => handleImageError(index)}
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>

            {/* Price Section (selected variant's real price) */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold text-[#2D8B6F]">
                ${displayPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {displayCompareAt && displayCompareAt > displayPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${displayCompareAt.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Option Selectors — one per real variant axis */}
            {options.map(option => {
              const selectedValue = selections[option.name];
              if (isFinishLike(option.name)) {
                return (
                  <div key={option.name} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.name}:</span>
                      <span className="text-muted-foreground">{selectedValue}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {option.values.map(value => (
                        <button
                          key={value}
                          onClick={() => handleSelect(option.name, value)}
                          aria-label={`${option.name}: ${value}`}
                          aria-pressed={selectedValue === value}
                          className={`w-10 h-10 rounded-full border-2 transition-all ${
                            selectedValue === value
                              ? "border-[#4A647C] ring-2 ring-[#4A647C] ring-offset-2"
                              : "border-border hover:border-muted-foreground"
                          }`}
                          style={{ backgroundColor: getFinishColor(value) }}
                          title={value}
                        />
                      ))}
                    </div>
                  </div>
                );
              }
              return (
                <div key={option.name} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option.name}:</span>
                    <span className="text-muted-foreground">{selectedValue}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {option.values.map(value => (
                      <button
                        key={value}
                        onClick={() => handleSelect(option.name, value)}
                        aria-pressed={selectedValue === value}
                        className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                          selectedValue === value
                            ? "border-[#4A647C] bg-[#4A647C] text-white"
                            : "border-border hover:border-muted-foreground"
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 font-medium" aria-live="polite">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(MAX_QUANTITY, quantity + 1))}
                  aria-label="Increase quantity"
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={!canPurchase}
                className={`flex-1 py-6 text-lg font-semibold rounded-lg ${
                  canPurchase
                    ? "bg-[#2D8B6F] hover:bg-[#247558] text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed backdrop-blur-sm"
                }`}
              >
                {canPurchase ? (
                  "Add to Cart"
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <X className="w-5 h-5" />
                    <span>{resolvedVariant ? "Out of Stock" : "Unavailable"}</span>
                  </span>
                )}
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-3 p-4 bg-[#E8F5E9] rounded-lg">
              <Truck className="w-5 h-5 text-[#2D8B6F]" />
              <div>
                <p className="font-medium text-[#2D8B6F]">Free Shipping</p>
                <p className="text-sm text-muted-foreground">Arrives in 5-10 business days</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-secondary rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#4A647C]" />
                </div>
                <p className="text-xs font-medium">Fast Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-secondary rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#4A647C]" />
                </div>
                <p className="text-xs font-medium">{isMattress ? "30-Day Returns" : "100% Solid Wood"}</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-secondary rounded-full flex items-center justify-center">
                  <Lock className="w-6 h-6 text-[#4A647C]" />
                </div>
                <p className="text-xs font-medium">Secure Checkout</p>
              </div>
            </div>

            {/* Product Details Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger className="text-base font-semibold">Product Details</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  {product.description && (
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  )}
                  {(specs.material || specs.weightCapacity) && (
                    <div className={`grid gap-4 ${specs.material && specs.weightCapacity ? "grid-cols-2" : "grid-cols-1"}`}>
                      {specs.weightCapacity && (
                        <div className="bg-secondary/50 p-4 rounded-lg text-center">
                          <p className="text-2xl font-bold text-[#4A647C]">{specs.weightCapacity}</p>
                          <p className="text-sm text-muted-foreground">Weight Capacity</p>
                        </div>
                      )}
                      {specs.material && (
                        <div className="bg-secondary/50 p-4 rounded-lg text-center">
                          <p className="text-2xl font-bold text-[#4A647C]">{specs.material}</p>
                          <p className="text-sm text-muted-foreground">Material</p>
                        </div>
                      )}
                    </div>
                  )}
                  {(specs.recommendedMattress || specs.assembly) && (
                    <ul className="space-y-2">
                      {specs.recommendedMattress && (
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-[#2D8B6F] flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Recommended mattress: {specs.recommendedMattress}</span>
                        </li>
                      )}
                      {specs.assembly && (
                        <li className="flex items-start gap-2">
                          <Check className="w-5 h-5 text-[#2D8B6F] flex-shrink-0 mt-0.5" />
                          <span className="text-sm">Assembly: {specs.assembly}</span>
                        </li>
                      )}
                    </ul>
                  )}
                  <ul className="space-y-2">
                    {!isMattress && (
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#2D8B6F] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Superior quality: solid wood frame with a durable, low-VOC finish</span>
                      </li>
                    )}
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#2D8B6F] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Sturdy &amp; stable: built to last with tight, reinforced structural connections</span>
                    </li>
                    {isBed && (
                      <li className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-[#2D8B6F] flex-shrink-0 mt-0.5" />
                        <span className="text-sm">Manufacturer-tested to applicable children's furniture safety standards</span>
                      </li>
                    )}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              {specs.dimensions && (
                <AccordionItem value="dimensions">
                  <AccordionTrigger className="text-base font-semibold">Dimensions</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{specs.dimensions}</p>
                  </AccordionContent>
                </AccordionItem>
              )}

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-base font-semibold">Shipping Information</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="text-sm">Free Canada-Wide Shipping on all orders!</p>
                  <p className="text-sm">Standard delivery: 5-10 business days</p>
                  <p className="text-sm">
                    <Link to="/shipping" className="text-primary hover:underline">Shipping details</Link>
                    {" · "}
                    <Link to="/returns" className="text-primary hover:underline">30-day returns</Link>
                    {" · "}
                    <Link to="/assembly" className="text-primary hover:underline">Assembly guide</Link>
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Complete the Room — curated same-style pieces (bed↔dresser↔
          nightstand, table↔chairs↔console per family) */}
      {completeTheRoom.length > 0 && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-2">Complete the Room</h2>
            <p className="text-muted-foreground text-sm mb-8">
              Pieces from the same family, made to match.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {completeTheRoom.slice(0, 4).map((ref) => (
                <Link key={ref.handle} to={`/product/${ref.handle}`} className="group">
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#f2f4f6] mb-3">
                    <img
                      src={ref.image}
                      alt={ref.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#4A647C] transition-colors">
                    {ref.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-[#2D8B6F] font-bold">
                      {ref.fromPrice ? "From " : ""}${ref.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                    {ref.compareAtPrice && (
                      <p className="text-muted-foreground line-through text-sm">
                        ${ref.compareAtPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Products (generic category fallback). Waits for the detail
          fetch — rendering it early flashed this section, then swapped it for
          Complete the Room once the metafield arrived. */}
      {detailLoaded && completeTheRoom.length === 0 && relatedProducts.length > 0 && (
        <section className="bg-secondary/30 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.handle}`}
                  className="group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-[#f2f4f6] mb-3">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#4A647C] transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-[#2D8B6F] font-bold mt-1">
                    {relatedProduct.fromPrice ? "From " : ""}${relatedProduct.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
