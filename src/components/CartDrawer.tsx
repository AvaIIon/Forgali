import { ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getTotalPrice, getItemKey } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsCartOpen(false);
    navigate("/checkout");
  };

  // "Complete the room" cross-sells: curated related products of what's in
  // the cart (custom.related_products), minus anything already added.
  const inCart = new Set(items.map(i => i.product.handle));
  const crossSells = items
    .flatMap(i => i.product.relatedProducts ?? [])
    .filter(r => r.availableForSale && r.image && !inCart.has(r.handle))
    .filter((r, idx, arr) => arr.findIndex(x => x.handle === r.handle) === idx)
    .slice(0, 3);

  const goToProduct = (handle: string) => {
    setIsCartOpen(false);
    navigate(`/product/${handle}`);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-lg bg-background">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-12">
              <p className="text-muted-foreground mb-4">Your cart is empty</p>
              <Button onClick={() => setIsCartOpen(false)} variant="outline">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {items.map((item) => (
                  <div key={getItemKey(item)} className="flex gap-4 p-4 bg-secondary/30 rounded-lg">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm line-clamp-2">{item.product.name}</h4>
                      {item.selectedFinish && (
                        <p className="text-xs text-muted-foreground mt-1">Finish: {item.selectedFinish}</p>
                      )}
                      <p className="text-[#2D8B6F] font-bold mt-1">
                        ${(item.unitPrice ?? item.product.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.variantId)}
                          className="p-1 hover:bg-secondary rounded"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.variantId)}
                          className="p-1 hover:bg-secondary rounded"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.variantId)}
                          className="ml-auto p-1 hover:bg-destructive/10 text-destructive rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Inside the scroll region so it can never push Checkout
                    below the fold on short viewports */}
                {crossSells.length > 0 && (
                  <div className="border-t border-border pt-3">
                    <h4 className="text-sm font-semibold mb-2">Complete the room</h4>
                    <div className="space-y-1">
                      {crossSells.map(ref => (
                        <button
                          key={ref.handle}
                          type="button"
                          onClick={() => goToProduct(ref.handle)}
                          className="flex w-full items-center gap-3 rounded-lg p-2 text-left hover:bg-secondary/50 transition-colors"
                        >
                          <img
                            src={ref.image}
                            alt={ref.title}
                            className="h-12 w-12 shrink-0 rounded object-cover bg-[#f2f4f6]"
                            loading="lazy"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm">{ref.title}</span>
                            <span className="text-sm font-semibold text-[#4A647C]">
                              {ref.fromPrice ? "From " : ""}${ref.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                          </span>
                          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-4 pb-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Subtotal</span>
                  <span className="text-xl font-bold">
                    ${getTotalPrice().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Shipping calculated at checkout</p>
                <Button 
                  onClick={handleCheckout}
                  className="w-full bg-[#2D8B6F] hover:bg-[#247558] text-white py-6 text-lg font-semibold"
                >
                  Checkout
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsCartOpen(false)}
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
