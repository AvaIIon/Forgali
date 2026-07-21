import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { ConvertedProduct } from "@/services/shopifyService";

const CART_STORAGE_KEY = "forgali_cart";

export interface CartItem {
  product: ConvertedProduct;
  quantity: number;
  selectedFinish?: string;
  variantId?: string; // Shopify variant ID for checkout
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Generate unique key for cart items (product + variant combination)
const getItemKey = (item: CartItem): string => {
  return item.variantId || `${item.product.id}-${item.selectedFinish || 'default'}`;
};

// Rehydrate the cart from localStorage so it survives page reloads, closed
// tabs, and return visits (furniture shoppers deliberate across sessions).
const loadStoredCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(loadStoredCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist on every change; ignore quota / private-mode write failures.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* storage unavailable — cart still works in-memory this session */
    }
  }, [items]);

  const addToCart = (product: ConvertedProduct, quantity = 1, selectedFinish?: string, variantId?: string) => {
    setItems((prev) => {
      // Find existing item by variant ID or product ID + finish
      const existingItem = prev.find((item) => {
        if (variantId && item.variantId) {
          return item.variantId === variantId;
        }
        return item.product.id === product.id && item.selectedFinish === selectedFinish;
      });

      if (existingItem) {
        return prev.map((item) => {
          const isMatch = variantId && item.variantId 
            ? item.variantId === variantId
            : item.product.id === product.id && item.selectedFinish === selectedFinish;
          
          return isMatch ? { ...item, quantity: item.quantity + quantity } : item;
        });
      }
      
      return [...prev, { product, quantity, selectedFinish, variantId }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, variantId?: string) => {
    setItems((prev) => prev.filter((item) => {
      if (variantId && item.variantId) {
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
        const isMatch = variantId && item.variantId 
          ? item.variantId === variantId
          : item.product.id === productId;
        
        return isMatch ? { ...item, quantity } : item;
      })
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.product.price * item.quantity, 0);
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
