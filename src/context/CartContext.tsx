import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from "react";
import { ConvertedProduct, fetchVariantStates, fetchCartStatus, isShopifyConfigured } from "@/services/shopifyService";

const CART_STORAGE_KEY = "forgali_cart";
// Cart id recorded at checkout handoff; on the next visit we ask Shopify
// whether that cart completed — the only signal the SPA gets that the
// customer actually paid — and clear the local cart so they can't
// accidentally re-order everything.
export const CHECKOUT_CART_KEY = "forgali_checkout_cart_id";

export interface CartItem {
  product: ConvertedProduct;
  quantity: number;
  selectedFinish?: string;
  variantId: string; // Shopify variant ID for checkout
  // Price of the ADDED variant — product.price is the cheapest variant's
  // price, which can differ from the one being bought.
  unitPrice: number;
  // Set by revalidation when Shopify reports the variant gone/unsellable;
  // the drawer flags the line and checkout blocks until it is removed.
  unavailable?: boolean;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: ConvertedProduct, quantity?: number, selectedFinish?: string, variantId?: string) => void;
  removeFromCart: (productId: string, variantId?: string) => void;
  updateQuantity: (productId: string, quantity: number, variantId?: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  getItemKey: (item: CartItem) => string;
  // Refresh price/availability of every line from Shopify (one batched query)
  refreshCartLines: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Generate unique key for cart items (product + variant combination)
const getItemKey = (item: CartItem): string => {
  return item.variantId || `${item.product.id}-${item.selectedFinish || 'default'}`;
};

// Rehydrate the cart from localStorage so it survives page reloads, closed
// tabs, and return visits (furniture shoppers deliberate across sessions).
// Stored shape is versioned ({ v, items }); every line is shape-validated —
// one malformed persisted item used to white-screen the whole app, and lines
// without a variantId could check out the wrong finish.
const CART_SCHEMA_VERSION = 3;
const isValidStoredItem = (it: unknown): it is CartItem => {
  if (!it || typeof it !== "object") return false;
  const item = it as Record<string, unknown>;
  const product = item.product as Record<string, unknown> | undefined;
  return (
    !!product &&
    typeof product.id === "string" &&
    typeof product.name === "string" &&
    typeof product.handle === "string" &&
    typeof item.quantity === "number" &&
    Number.isFinite(item.quantity) &&
    item.quantity >= 1 &&
    typeof item.variantId === "string" &&
    item.variantId.length > 0 &&
    typeof item.unitPrice === "number" &&
    Number.isFinite(item.unitPrice)
  );
};
const loadStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    const candidate = Array.isArray(parsed)
      ? parsed // legacy unversioned shape
      : parsed && typeof parsed.v === "number" && Array.isArray(parsed.items)
        ? parsed.items
        : [];
    return candidate.filter(isValidStoredItem);
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const refreshInFlight = useRef(false);

  // Persist on every change; ignore quota / private-mode write failures.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify({ v: CART_SCHEMA_VERSION, items })
      );
    } catch {
      /* storage unavailable — cart still works in-memory this session */
    }
  }, [items]);

  // If a checkout was handed off last visit, ask Shopify whether that cart is
  // gone; a purchased customer shouldn't be re-offered what they bought.
  // IMPORTANT: Shopify returns a null cart for BOTH a completed checkout AND an
  // expired/invalid cart id (carts lapse after ~10 idle days). So a null cart
  // is only treated as "purchased → clear" when the handoff was RECENT; an old
  // handoff that now returns null is assumed expired, and we just drop the
  // stale key WITHOUT wiping the cart of a shopper who deliberated for weeks.
  useEffect(() => {
    if (typeof window === "undefined" || !isShopifyConfigured()) return;
    const raw = window.localStorage.getItem(CHECKOUT_CART_KEY);
    if (!raw) return;
    let cartId: string | null = null;
    let ts = 0;
    try {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed.id === "string") { cartId = parsed.id; ts = Number(parsed.ts) || 0; }
    } catch {
      cartId = raw; // legacy plain-string value → treat as old (ts=0)
    }
    if (!cartId) return;
    const RECENT_MS = 3 * 24 * 60 * 60 * 1000; // 3 days
    const wasRecent = ts > 0 && Date.now() - ts < RECENT_MS;
    fetchCartStatus(cartId)
      .then(status => {
        if (status === "completed") {
          if (wasRecent) setItems([]); // recent handoff + gone cart ⇒ paid
          window.localStorage.removeItem(CHECKOUT_CART_KEY);
        }
      })
      .catch(() => {
        /* network hiccup — keep the key, retry next load */
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = (product: ConvertedProduct, quantity = 1, selectedFinish?: string, variantId?: string) => {
    // Price the line from the variant actually being added, not the product's
    // headline price (they differ across finishes/set sizes).
    const resolvedVariantId = variantId || product.variants?.[0]?.id;
    if (!resolvedVariantId) return; // nothing purchasable to add
    const unitPrice =
      product.variants.find(v => v.id === resolvedVariantId)?.price ?? product.price;
    setItems((prev) => {
      const existingItem = prev.find((item) => item.variantId === resolvedVariantId);

      if (existingItem) {
        return prev.map((item) =>
          item.variantId === resolvedVariantId
            // refresh unitPrice too — re-adding after a price change must not
            // keep charging the display at the stale price
            ? { ...item, quantity: item.quantity + quantity, unitPrice, unavailable: undefined }
            : item
        );
      }

      return [...prev, { product, quantity, selectedFinish, variantId: resolvedVariantId, unitPrice }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setItems((prev) => prev.filter((item) => {
      if (variantId) {
        return item.variantId !== variantId;
      }
      return item.product.id !== productId;
    }));
  };

  const updateQuantity = (productId: string, quantity: number, variantId?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => {
        const isMatch = variantId
          ? item.variantId === variantId
          : item.product.id === productId;

        return isMatch ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // One batched Storefront query refreshes every line's live price and
  // availability — persisted carts can be weeks old, and the hosted checkout
  // always charges the LIVE price, so the displayed totals must match it.
  const refreshCartLines = useCallback(async () => {
    if (refreshInFlight.current || !isShopifyConfigured()) return;
    const ids = items.map(i => i.variantId);
    if (ids.length === 0) return;
    refreshInFlight.current = true;
    try {
      const states = await fetchVariantStates(ids);
      setItems(prev =>
        prev.map(item => {
          const live = states.get(item.variantId);
          if (!live) return { ...item, unavailable: true };
          if (live.price !== item.unitPrice || item.unavailable !== !live.availableForSale) {
            return { ...item, unitPrice: live.price, unavailable: live.availableForSale ? undefined : true };
          }
          return item;
        })
      );
    } catch {
      /* revalidation is best-effort; stale display beats a broken drawer */
    } finally {
      refreshInFlight.current = false;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items]);

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    // Exclude lines flagged unavailable — their per-line price is hidden in the
    // drawer/checkout, so counting them would make the subtotal disagree with
    // the visible line items (and overstate what's actually purchasable).
    return items.reduce(
      (total, item) => item.unavailable ? total : total + (item.unitPrice ?? item.product.price) * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        isCartOpen,
        setIsCartOpen,
        getItemKey,
        refreshCartLines,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
