import { useEffect, useRef } from "react";
import { Gift } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { useLocale } from "@/i18n/LocaleContext";
import {
  SPEND_NUDGE_FROM,
  SPEND_REWARD,
  SPEND_THRESHOLD,
  isSpendRewardClaimed,
  wholeDollars,
} from "@/lib/spendReward";

// Pops a notification the moment the cart subtotal climbs past a spend-reward
// mark, so the offer is seen without reading the card at the foot of the cart
// drawer: past SPEND_NUDGE_FROM it says how much is left, past SPEND_THRESHOLD
// it says the reward is ready to claim. Only an upward crossing fires it; a
// cart restored from storage on page load does not.
export const SpendRewardToast = () => {
  const { t, money } = useLocale();
  const { getTotalPrice } = useCart();
  const subtotal = getTotalPrice();
  const previous = useRef(subtotal);

  useEffect(() => {
    const before = previous.current;
    previous.current = subtotal;
    if (subtotal <= before) return;

    const reward = wholeDollars(money(SPEND_REWARD));
    let message: string | null = null;
    if (before < SPEND_THRESHOLD && subtotal >= SPEND_THRESHOLD) {
      if (!isSpendRewardClaimed()) {
        message = t("cart.spendReached", { goal: wholeDollars(money(SPEND_THRESHOLD)), reward });
      }
    } else if (before < SPEND_NUDGE_FROM && subtotal >= SPEND_NUDGE_FROM) {
      message = t("cart.spendNudge", { remaining: money(SPEND_THRESHOLD - subtotal), reward });
    }
    if (!message) return;

    toast(message, {
      id: "spend-reward", // a second crossing replaces the first toast
      icon: <Gift className="h-5 w-5 text-brand-positive" />,
      position: "top-center",
      duration: 7000,
      classNames: { title: "font-semibold" },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subtotal]);

  return null;
};
