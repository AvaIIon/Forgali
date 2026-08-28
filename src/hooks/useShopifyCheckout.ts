import { useState } from "react";
import { useCart, CHECKOUT_CART_KEY } from "@/context/CartContext";
import { createShopifyCartWithLines } from "@/services/shopifyService";

/**
 * Starts the Shopify handoff from wherever the shopper asked to check out.
 *
 * The cart drawer's Checkout button and the /checkout page both call this, so
 * the guards below (unavailable lines, unresolvable variants, a cart Shopify
 * silently trimmed) apply no matter which surface the shopper used. Keeping
 * one implementation is the point: a second copy in the drawer would have
 * drifted away from these checks the first time either side changed.
 */
export const useShopifyCheckout = () => {
  const { items } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const startCheckout = async () => {
    if (items.length === 0 || isLoading) return;

    if (items.some(i => i.unavailable)) {
      alert("An item in your cart is no longer available. Please remove it and try again.");
      return;
    }

    try {
      setIsLoading(true);

      // Build every line up front — a cart item with no resolvable variant id
      // must block checkout, not silently vanish from the order.
      const lines = items.map(item => {
        const variantId = item.variantId || item.product.variants?.[0]?.id;
        if (!variantId) {
          throw new Error(
            `"${item.product.name}" can't be checked out — please remove it from your cart and add it again.`
          );
        }
        return { merchandiseId: variantId, quantity: item.quantity };
      });

      // One atomic cartCreate with all lines (sequential per-line adds could
      // drop an item and check out a subset without the customer noticing).
      const cart = await createShopifyCartWithLines(lines);

      const expectedQuantity = items.reduce((n, i) => n + i.quantity, 0);
      if (cart.totalQuantity !== expectedQuantity) {
        throw new Error(
          'Some items in your cart are no longer available. Please review your cart and try again.'
        );
      }

      // Redirect to Shopify checkout
      if (cart.checkoutUrl) {
        // Remember the cart id + a timestamp: next visit we ask Shopify whether
        // it completed and, only if the handoff was recent, clear the local
        // cart (a null cart could also just be expired — see CartContext).
        try {
          window.localStorage.setItem(CHECKOUT_CART_KEY, JSON.stringify({ id: cart.id, ts: Date.now() }));
        } catch {
          /* storage unavailable — checkout still proceeds */
        }
        window.location.href = cart.checkoutUrl;
        // Deliberately stay in the loading state: re-enabling the button
        // during the redirect invites a second cart creation.
        return;
      }
      throw new Error('Checkout could not be started. Please try again.');
    } catch (error) {
      console.error('Error creating Shopify checkout:', error);
      const errorMessage = error instanceof Error ? error.message : '';
      // User-facing copy only — configuration detail belongs in the console,
      // not in a shopper's alert box.
      if (/no longer available|can't be checked out/.test(errorMessage)) {
        alert(errorMessage);
      } else {
        alert(
          "We couldn't start the secure checkout. Please try again in a moment — " +
          "if it keeps happening, email daniel@forgali.com and we'll take care of you."
        );
      }
      setIsLoading(false);
    }
  };

  return { startCheckout, isLoading, isEmpty: items.length === 0 };
};
