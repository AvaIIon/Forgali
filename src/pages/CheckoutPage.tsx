import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lock, Truck, ChevronLeft, AlertTriangle } from "lucide-react";
import { Seo } from "@/components/Seo";
import { ShopifyCheckoutButton } from "@/components/ShopifyCheckoutButton";
import { isShopifyConfigured } from "@/services/shopifyService";
import { cdnImage } from "@/lib/imageProxy";

/**
 * Fallback checkout surface, no longer part of the normal path.
 *
 * The cart drawer's Checkout button hands straight off to Shopify now: this
 * page only ever restated the drawer's own summary and then asked for a second
 * click, which cost a step for nothing. It stays reachable so a bookmark, an
 * old link, or a shopper who backed out of Shopify still lands somewhere that
 * can complete the order, but nothing in the UI routes here.
 */
const CheckoutPage = () => {
  const { items, getTotalPrice, removeFromCart, getItemKey, refreshCartLines } = useCart();

  // Revalidate persisted lines against Shopify the moment the shopper reaches
  // checkout — prices may have changed since add time, and deleted variants
  // must be flagged here, not discovered as an opaque failure at handoff.
  useEffect(() => {
    refreshCartLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const subtotal = getTotalPrice();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Seo title="Checkout | Forgali" path="/checkout" noindex />
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <p className="text-muted-foreground mb-6">Add some products to your cart to checkout.</p>
          <Link to="/">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Checkout | Forgali" path="/checkout" noindex />
      <Header />

      {/* Checkout Header */}
      <div className="border-b border-border">
        <div className="max-w-rail mx-auto px-4 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-4 h-4" />
            Back to shopping
          </Link>
        </div>
      </div>

      <div className="max-w-rail mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - handoff explainer. Contact, shipping address, and payment
              are all collected on Shopify's PCI-compliant hosted checkout —
              duplicate fields here collected data that went nowhere and made
              shoppers type everything twice. */}
          <div className="space-y-8">
            <h1 className="text-3xl font-bold">Checkout</h1>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold">How it works</h2>
              <ol className="space-y-3 text-sm text-muted-foreground list-decimal list-inside">
                <li>Review your order summary on this page.</li>
                <li>Continue to our secure checkout to enter your contact details and shipping address.</li>
                <li>Pay by credit card, PayPal, Apple Pay, or Google Pay — taxes are calculated there from your address.</li>
                <li>Want to spread it out? Choose Afterpay at the payment step to split your total into 4 interest-free payments.</li>
              </ol>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="w-4 h-4" />
                Payments are processed on our encrypted, PCI-compliant checkout.
              </div>
            </div>

            {isShopifyConfigured() ? (
              <ShopifyCheckoutButton className="w-full bg-brand hover:bg-brand-hover text-white py-6 text-lg font-semibold">
                Continue to Secure Checkout
              </ShopifyCheckoutButton>
            ) : (
              <div className="space-y-3">
                <Button disabled className="w-full py-6 text-lg font-semibold">
                  Checkout temporarily unavailable
                </Button>
                <p className="text-sm text-muted-foreground">
                  We can't start the secure checkout right now. Please try again shortly, or
                  email <a href="mailto:daniel@forgali.com" className="underline">daniel@forgali.com</a> and
                  we'll complete your order by email. Your cart is saved.
                </p>
              </div>
            )}
          </div>

          {/* Right - Order Summary */}
          <div className="lg:pl-8 lg:border-l border-border">
            <div className="sticky top-8 space-y-6">
              <h2 className="text-lg font-semibold">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {items.map((item) => {
                  const lineImage =
                    item.product.variants.find(v => v.id === item.variantId)?.image ||
                    item.product.image;
                  return (
                    <div key={getItemKey(item)} className="flex gap-4">
                      <div className="relative">
                        <img
                          src={cdnImage(lineImage, 160)}
                          alt={item.product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                        {item.selectedFinish && (
                          <p className="text-xs text-muted-foreground">{item.selectedFinish}</p>
                        )}
                        {item.unavailable && (
                          <p className="text-xs text-destructive flex items-center gap-1 mt-1">
                            <AlertTriangle className="w-3 h-3" />
                            No longer available —{" "}
                            <button
                              className="underline"
                              onClick={() => removeFromCart(item.product.id, item.variantId)}
                            >
                              remove
                            </button>
                          </p>
                        )}
                      </div>
                      <p className="font-medium">
                        ${((item.unitPrice ?? item.product.price) * item.quantity).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                    </div>
                  );
                })}
              </div>

              <Separator />

              {/* Totals */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                {/* Delivery window lives here rather than on the product page:
                    the shopper has already chosen, and this is the last place
                    they can be surprised by it before paying. */}
                <div>
                  <div className="flex justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <Truck className="w-4 h-4" />
                      Shipping
                    </span>
                    <span className="text-brand-positive font-medium">FREE</span>
                  </div>
                  <p className="pl-6 text-xs text-muted-foreground">Arrives in 12-18 business days</p>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span className="text-muted-foreground">Calculated at checkout</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total before tax</span>
                  <span>${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-brand-positive/10 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-brand-positive">
                  <Truck className="w-4 h-4" />
                  Free Canada-Wide Shipping
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-positive">
                  <Lock className="w-4 h-4" />
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
