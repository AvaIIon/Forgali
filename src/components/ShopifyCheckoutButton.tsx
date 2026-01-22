import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { createShopifyCart, addToShopifyCart } from "@/services/shopifyService";
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
      
      // Create a new cart
      let cart = await createShopifyCart();
      let checkoutUrl = cart.checkoutUrl;
      
      // Add all items to Shopify cart
      for (const item of items) {
        // You'll need to map your product IDs to Shopify variant IDs
        // The product should have a shopifyVariantId property when synced from Shopify
        const variantId = (item.product as any).shopifyVariantId || item.product.id;
        
        try {
          cart = await addToShopifyCart(cart.id, variantId, item.quantity);
          checkoutUrl = cart.checkoutUrl;
        } catch (error) {
          console.error(`Error adding ${item.product.name} to cart:`, error);
          // Continue with other items
        }
      }
      
      // Redirect to Shopify checkout
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error('No checkout URL available');
      }
    } catch (error) {
      console.error('Error creating Shopify checkout:', error);
      alert('There was an error processing your checkout. Please make sure your products are synced with Shopify and try again.');
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
      {isLoading ? 'Processing...' : (children || `Checkout with Shopify - $${getTotalPrice().toLocaleString(undefined, { minimumFractionDigits: 2 })}`)}
    </Button>
  );
};
