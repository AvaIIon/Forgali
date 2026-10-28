import { Button } from "@/components/ui/button";
import { useLocale } from "@/i18n/LocaleContext";
import { useCart } from "@/context/CartContext";
import { useShopifyCheckout } from "@/hooks/useShopifyCheckout";

interface ShopifyCheckoutButtonProps {
  className?: string;
  children?: React.ReactNode;
}

export const ShopifyCheckoutButton = ({ className, children }: ShopifyCheckoutButtonProps) => {
  const { t, money } = useLocale();
  const { getTotalPrice } = useCart();
  const { startCheckout, isLoading, isEmpty } = useShopifyCheckout();

  return (
    <Button
      onClick={startCheckout}
      disabled={isLoading || isEmpty}
      className={className}
    >
      {isLoading ? t("processing") : (children || `${t("checkoutWithShopify")} - ${money(getTotalPrice())}`)}
    </Button>
  );
};
