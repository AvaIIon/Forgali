import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { createShopifyCartWithLines } from "@/services/shopifyService";
import { useState } from "react";

interface ShopifyCheckoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const ShopifyCheckoutButton = ({ className, children }: ShopifyCheckoutButtonProps) => {
  const { items, getTotalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleShopifyCheckout = async () => {
    if (items.length === 0) return;

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
        window.location.href = cart.checkoutUrl;
      } else {
        throw new Error('No checkout URL available');
      }
    } catch (error) {
      console.error('Error creating Shopify checkout:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      
      // Show more helpful error message based on error type
      if (errorMessage.includes('402') || errorMessage.includes('Unavailable Shop')) {
        alert('Your Shopify store is currently unavailable. Please:\n\n' +
          '1. Go to your Shopify Admin and complete store setup\n' +
          '2. If your trial expired, choose a Shopify plan\n' +
          '3. If your store is paused, reactivate it\n' +
          '4. Once active, try checkout again\n\n' +
          'Error: ' + errorMessage);
      } else if (errorMessage.includes('401') || errorMessage.includes('Authentication')) {
        alert('Shopify authentication failed. Please check your environment variables in Vercel:\n\n' +
          '1. Go to your Vercel project settings\n' +
          '2. Navigate to Environment Variables\n' +
          '3. Ensure VITE_SHOPIFY_STORE_DOMAIN and VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN are set\n' +
          '4. Redeploy your application\n\n' +
          'Error details: ' + errorMessage);
      } else {
        alert('There was an error processing your checkout:\n\n' + errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleShopifyCheckout}
      disabled={isLoading || items.length === 0}
      className={className}
    >
      {isLoading ? 'Processing...' : (children || `Checkout with Shopify - $${getTotalPrice().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)}
    </Button>
  );
};
