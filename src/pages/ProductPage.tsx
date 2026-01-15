import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Star, Check, Truck, Shield, CreditCard, ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";
import { products, getProductById, getRelatedProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || "");
  const relatedProducts = getRelatedProducts(product?.category || "bunk-beds", id || "");
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedFinish, setSelectedFinish] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    if (product) {
      const finishName = product.finishes?.[selectedFinish];
      addToCart(product, quantity, finishName);
      toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="flex items-center justify-center py-32">
          <p className="text-muted-foreground text-lg">Product not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  const discountPercent = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const finishColors: Record<string, string> = {
    "White": "#FFFFFF",
    "Grey": "#808080",
    "Natural": "#D4A574",
    "Espresso": "#3C1414",
    "Blue": "#4A90A4",
    "Pecan": "#C19A6B",
    "Walnut": "#5C4033",
    "Clay": "#C9B8A8",
    "Chestnut": "#8B4513",
    "Driftwood": "#B8A590",
    "White Wash": "#F5F5F5",
    "Barnwood Brown": "#8B7355",
    "White/Pecan": "#F5E6D3",
    "White/Walnut": "#E8DED0",
    "Grey/Pink": "#D4A5A5",
    "Blue/Grey": "#7A9BA8",
    "Pink/Grey": "#D4A5B5",
    "Purple/Grey": "#A89BC9",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground">Home</Link>
          <span>/</span>
          <Link to={`/category/${product.category}`} className="hover:text-foreground capitalize">
            {product.category.replace("-", " ")}
          </Link>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square rounded-lg overflow-hidden bg-secondary">
              <img 
                src={product.images[selectedImage] || product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImage === index ? "border-[#4A90A4]" : "border-transparent"
                    }`}
                  >
                    <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold text-foreground leading-tight">
              {product.name}
            </h1>

            {/* Price Section */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-3xl font-bold text-[#2D8B6F]">
                ${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="bg-primary text-primary-foreground text-sm font-semibold px-3 py-1 rounded-full">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Financing Options */}
            <div className="bg-secondary/50 rounded-lg p-4 space-y-2">
              <p className="text-sm">
                <span className="font-semibold">4 interest-free payments</span> of ${(product.price / 4).toFixed(2)} with{" "}
                <span className="text-[#5A31F4] font-semibold">Shop Pay</span>
              </p>
              <p className="text-sm text-muted-foreground">
                Starting at $83/mo with <span className="font-semibold">Affirm</span>. Check your purchasing power.
              </p>
            </div>

            {/* Finish Selector */}
            {product.finishes && product.finishes.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Finish:</span>
                  <span className="text-muted-foreground">{product.finishes[selectedFinish]}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.finishes.map((finish, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedFinish(index)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedFinish === index 
                          ? "border-[#4A90A4] ring-2 ring-[#4A90A4] ring-offset-2" 
                          : "border-border hover:border-muted-foreground"
                      }`}
                      style={{ backgroundColor: finishColors[finish] || "#CCCCCC" }}
                      title={finish}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-border rounded-lg">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-6 py-3 font-medium">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-secondary transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <Button 
                onClick={handleAddToCart}
                className="flex-1 bg-[#2D8B6F] hover:bg-[#247558] text-white py-6 text-lg font-semibold rounded-lg"
              >
                Add to Cart
              </Button>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-3 p-4 bg-[#E8F5E9] rounded-lg">
              <Truck className="w-5 h-5 text-[#2D8B6F]" />
              <div>
                <p className="font-medium text-[#2D8B6F]">Free Shipping</p>
                <p className="text-sm text-muted-foreground">Arrives Jan 21 - Jan 24</p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-secondary rounded-full flex items-center justify-center">
                  <Truck className="w-6 h-6 text-[#4A90A4]" />
                </div>
                <p className="text-xs font-medium">Fast Shipping</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-secondary rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-[#4A90A4]" />
                </div>
                <p className="text-xs font-medium">100% Solid Wood</p>
              </div>
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto bg-secondary rounded-full flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-[#4A90A4]" />
                </div>
                <p className="text-xs font-medium">Easy Financing</p>
              </div>
            </div>

            {/* Product Details Accordion */}
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details">
                <AccordionTrigger className="text-base font-semibold">Product Details</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary/50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-[#4A90A4]">400 lbs</p>
                      <p className="text-sm text-muted-foreground">Weight Capacity</p>
                    </div>
                    <div className="bg-secondary/50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-[#4A90A4]">Solid Pine</p>
                      <p className="text-sm text-muted-foreground">Wood Type</p>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#2D8B6F] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Superior Quality: Solid New Zealand Pine wood frame with durable, non-toxic, low VOC finish</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#2D8B6F] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Sturdy & Stable: Metal-on-metal structural connections won't loosen over time</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#2D8B6F] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Tall 14" guardrails safely fit standard mattress sizes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-[#2D8B6F] flex-shrink-0 mt-0.5" />
                      <span className="text-sm">Meets or exceeds federal safety standards for children's furniture</span>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              
              <AccordionItem value="dimensions">
                <AccordionTrigger className="text-base font-semibold">Dimensions</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-4 gap-3">
                    <div className="bg-secondary/50 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold">65"</p>
                      <p className="text-xs text-muted-foreground">Height (H)</p>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold">78"</p>
                      <p className="text-xs text-muted-foreground">Length (L)</p>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold">42"</p>
                      <p className="text-xs text-muted-foreground">Width (W)</p>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg text-center">
                      <p className="text-lg font-bold">130 lbs</p>
                      <p className="text-xs text-muted-foreground">Weight</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-base font-semibold">Shipping Information</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="text-sm">Free Canada-Wide Shipping on all orders!</p>
                  <p className="text-sm">Standard delivery: 5-10 business days</p>
                  <p className="text-sm">Ships in 2 boxes for easier handling and delivery.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-secondary/30 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.slice(0, 4).map((relatedProduct) => (
                <Link 
                  key={relatedProduct.id} 
                  to={`/product/${relatedProduct.id}`}
                  className="group"
                >
                  <div className="aspect-square rounded-lg overflow-hidden bg-white mb-3">
                    <img 
                      src={relatedProduct.image} 
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-medium text-sm line-clamp-2 group-hover:text-[#4A90A4] transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <p className="text-[#2D8B6F] font-bold mt-1">
                    ${relatedProduct.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
