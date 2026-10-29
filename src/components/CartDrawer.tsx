import { AlertTriangle, ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import { useLocale } from "@/i18n/LocaleContext";
import { useEffect } from "react";
import { useNavigate } from "@/i18n/router";
import { useCart } from "@/context/CartContext";
import { useShopifyCheckout } from "@/hooks/useShopifyCheckout";
import { isShopifyConfigured } from "@/services/shopifyService";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cdnImage } from "@/lib/imageProxy";

export const CartDrawer = () => {
  const { t, money } = useLocale();
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getTotalPrice, getItemKey, refreshCartLines } = useCart();
  const navigate = useNavigate();
  const { startCheckout, isLoading: isCheckoutLoading } = useShopifyCheckout();

  // Refresh live prices/availability whenever the drawer opens — persisted
  // lines can be weeks old and checkout charges the live price.
  useEffect(() => {
    if (isCartOpen) refreshCartLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCartOpen]);

  // "Complete the room" cross-sells: curated related products of what's in
  // the cart (custom.related_products), minus anything already added.
  const inCart = new Set(items.map(i => i.product.handle));
  const crossSells = items
    .flatMap(i => i.product.relatedProducts ?? [])
    .filter(r => r.availableForSale && r.image && !inCart.has(r.handle))
    .filter((r, idx, arr) => arr.findIndex(x => x.handle === r.handle) === idx)
    .slice(0, 3);

  const goToProduct = (handle: string) => {
    setIsCartOpen(false);
    navigate(`/product/${handle}`);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-background">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">{t("cart.title")}</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">{t("cart.empty")}</p>
              <Button onClick={() => setIsCartOpen(false)} variant="outline">
                {t("common.continueShopping")}
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={getItemKey(item)} className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                    <img
                      src={cdnImage(item.product.variants.find(v => v.id === item.variantId)?.image || item.product.image, 200)}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                      {item.selectedFinish && (
                        <p className="text-xs text-muted-foreground mt-1">{item.selectedFinish}</p>
                      )}
                      {item.unavailable ? (
                        <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                          <AlertTriangle className="w-3 h-3" />
                          {t("cart.unavailableRemove")}
                        </p>
                      ) : (
                        <p className="text-brand-accent font-bold mt-1">
                          {money((item.unitPrice ?? item.product.price))}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variantId)}
                          aria-label={t("cart.decrease", { name: item.product.name })}
                          className="p-1 hover:bg-secondary rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variantId)}
                          aria-label={t("cart.increase", { name: item.product.name })}
                          className="p-1 hover:bg-secondary rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.variantId)}
                          aria-label={t("cart.remove", { name: item.product.name })}
                          className="ml-auto p-1 hover:bg-destructive/10 text-destructive rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Inside the scroll region so it can never push Checkout
                    below the fold on short viewports */}
                {crossSells.length > 0 && (
                  <div className="border-t border-border pt-3">
                    <h4 className="text-sm font-semibold mb-2">{t("cart.completeRoom")}</h4>
                    <div className="space-y-1">
                      {crossSells.map(ref => (
                        <button
                          key={ref.handle}
                          type="button"
                          onClick={() => goToProduct(ref.handle)}
                          className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-secondary/50 transition-colors"
                        >
                          <img
                            src={cdnImage(ref.image, 120)}
                            alt={ref.title}
                            className="h-12 w-12 shrink-0 rounded object-cover bg-brand-tint"
                            loading="lazy"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm">{ref.title}</span>
                            <span className="text-sm font-semibold text-brand-accent">
                              {ref.fromPrice ? t("from") : ""}{money(ref.price)}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 pb-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{t("cart.subtotal")}</span>
                  <span className="text-xl font-bold">
                    {money(getTotalPrice())}
                  </span>
                </div>
                {/* The delivery window and the Afterpay note used to live on
                    the /checkout interstitial. Checkout now hands straight off
                    to Shopify, so this drawer is the last thing the shopper
                    reads before the payment page and has to carry them. */}
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">
                    {t("cart.shippingNote")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t("cart.afterpay")}
                  </p>
                </div>
                {isShopifyConfigured() ? (
                  <Button
                    onClick={startCheckout}
                    disabled={isCheckoutLoading}
                    className="w-full bg-brand-positive hover:bg-brand-positive-hover text-white py-6 text-lg font-semibold"
                  >
                    {isCheckoutLoading ? t("processing") : t("cart.checkout")}
                  </Button>
                ) : (
                  <div className="space-y-2">
                    <Button disabled className="w-full py-6 text-lg font-semibold">
                      {t("common.checkoutUnavailable")}
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      {t("common.checkoutUnavailableBody1")}<a href="mailto:daniel@forgali.com" className="underline">daniel@forgali.com</a>{t("common.checkoutUnavailableBody2")}
                    </p>
                  </div>
                )}
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsCartOpen(false)}
                >
                  {t("common.continueShopping")}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
