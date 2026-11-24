// "Spend $1,000, claim $50 off". The $50 is a Shopify discount CODE (minimum
// subtotal $1,000), not an automatic discount: a shopper only gets it by
// pressing Claim in the cart drawer, which makes checkout send the code.
// Keep these numbers and the code in step with the discount in Shopify admin.
export const SPEND_THRESHOLD = 1000;
export const SPEND_REWARD = 50;
// The cart card appears from this subtotal up
export const SPEND_NUDGE_FROM = 750;
export const SPEND_REWARD_CODE = "CLAIM50";

// "$50", not "$50.00" ("50 $" in French). Only the trailing cents go: an
// unanchored match turned "$1,000.00" into "$10.00".
export const wholeDollars = (formatted: string): string =>
  formatted.replace(/[.,]00(?=\D*$)/, "");

const CLAIMED_KEY = "forgali_spend_reward_claimed";

export const isSpendRewardClaimed = (): boolean => {
  try {
    return window.localStorage.getItem(CLAIMED_KEY) === "1";
  } catch {
    return false;
  }
};

export const setSpendRewardClaimed = (claimed: boolean) => {
  try {
    if (claimed) window.localStorage.setItem(CLAIMED_KEY, "1");
    else window.localStorage.removeItem(CLAIMED_KEY);
  } catch {
    /* storage unavailable: the claim lasts for this page view only */
  }
};

/** Discount codes checkout should send for a cart of this subtotal. */
export const spendRewardCodes = (subtotal: number, claimed = isSpendRewardClaimed()): string[] =>
  claimed && subtotal >= SPEND_THRESHOLD ? [SPEND_REWARD_CODE] : [];
