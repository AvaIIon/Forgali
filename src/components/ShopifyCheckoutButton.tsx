import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useShopifyCheckout } from "@/hooks/useShopifyCheckout";

interface ShopifyCheckoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const ShopifyCheckoutButton = ({ className, children }: ShopifyCheckoutButtonProps) => {
  const { getTotalPrice } = useCart();
  const { startCheckout, isLoading, isEmpty } = useShopifyCheckout();

  return (
    <Button
      onClick={startCheckout}
      disabled={isLoading || isEmpty}
      className={className}
    >
      {isLoading ? 'Processing...' : (children || `Checkout with Shopify - $${getTotalPrice().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`)}
    </Button>
  );
};
