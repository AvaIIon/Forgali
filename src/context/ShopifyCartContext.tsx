import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { createShopifyCart, addToShopifyCart, getShopifyCart, isShopifyConfigured } from "@/services/shopifyService";

interface ShopifyCartItem {
  id: string;
  variantId: string;
  quantity: number;
  title: string;
  price: number;
  image?: string;
}

interface ShopifyCartContextType {
  cartId: string | null;
  checkoutUrl: string | null;
  items: ShopifyCartItem[];
  isLoading: boolean;
  addToCart: (variantId: string, quantity: number) => Promise<void>;
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  removeFromCart: (lineId: string) => Promise<void>;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  goToCheckout: () => void;
}

const ShopifyCartContext = createContext<ShopifyCartContextType | undefined>(undefined);

export const ShopifyCartProvider = ({ children }: { children: ReactNode }) => {
  const [cartId, setCartId] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [items, setItems] = useState<ShopifyCartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize cart on mount
  useEffect(() => {
    if (isShopifyConfigured()) {
      const storedCartId = localStorage.getItem('shopify_cart_id');
      if (storedCartId) {
        setCartId(storedCartId);
        loadCart(storedCartId);
      }
    }
  }, []);

  const loadCart = async (id: string) => {
    try {
      setIsLoading(true);
      const cart = await getShopifyCart(id);
      setCheckoutUrl(cart.checkoutUrl);
      setItems(
        cart.lines.edges.map((edge: any) => ({
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          quantity: edge.node.quantity,
          title: edge.node.merchandise.product.title,
          price: parseFloat(edge.node.merchandise.price.amount),
          image: edge.node.merchandise.image?.url,
        }))
      );
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (variantId: string, quantity: number) => {
    try {
      setIsLoading(true);
      let currentCartId = cartId;

      // Create cart if it doesn't exist
      if (!currentCartId) {
        const newCart = await createShopifyCart();
        currentCartId = newCart.id;
        setCartId(currentCartId);
        localStorage.setItem('shopify_cart_id', currentCartId);
      }

      // Add item to cart
      const cart = await addToShopifyCart(currentCartId, variantId, quantity);
      setCheckoutUrl(cart.checkoutUrl);
      setItems(
        cart.lines.edges.map((edge: any) => ({
          id: edge.node.id,
          variantId: edge.node.merchandise.id,
          quantity: edge.node.quantity,
          title: edge.node.merchandise.product.title,
          price: parseFloat(edge.node.merchandise.price.amount),
          image: edge.node.merchandise.image?.url,
        }))
      );
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (lineId: string, quantity: number) => {
    // This would require a cartLinesUpdate mutation
    // For now, we'll reload the cart
    if (cartId) {
      await loadCart(cartId);
    }
  };

  const removeFromCart = async (lineId: string) => {
    // This would require a cartLinesRemove mutation
    // For now, we'll reload the cart
    if (cartId) {
      await loadCart(cartId);
    }
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const goToCheckout = () => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  };

  return (
    <ShopifyCartContext.Provider
      value={{
        cartId,
        checkoutUrl,
        items,
        isLoading,
        addToCart,
        updateQuantity,
        removeFromCart,
        getTotalPrice,
        getTotalItems,
        goToCheckout,
      }}
    >
      {children}
    </ShopifyCartContext.Provider>
  );
};

export const useShopifyCart = () => {
  const context = useContext(ShopifyCartContext);
  if (!context) {
    throw new Error('useShopifyCart must be used within a ShopifyCartProvider');
  }
  return context;
};
