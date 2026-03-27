import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { ConvertedProduct } from "@/services/shopifyService";

interface CategoryProductCardProps {
  product: ConvertedProduct;
}

// Finish name to color mapping
const finishColors: Record<string, string> = {
  "White": "#f2f4f6",
  "Grey": "#808080",
  "Natural": "#D4A574",
  "Espresso": "#3C1414",
  "Blue": "#4A647C",
  "Pecan": "#C19A6B",
  "Walnut": "#5C4033",
  "Clay": "#C9B8A8",
  "Chestnut": "#8B4513",
  "Driftwood": "#B8A590",
  "White Wash": "#F5F5F5",
  "Barnwood Brown": "#8B7355",
};

export const CategoryProductCard = ({ product }: CategoryProductCardProps) => {
  // Use finishes array for color swatches
  const finishes = product.finishes || [];
  const displayFinishes = finishes.slice(0, 4);
  const remainingFinishes = finishes.length - 4;
  
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(product.image);

  const handleImageError = () => {
    if (!imageError && product.images && product.images.length > 0 && product.images[0] !== product.image) {
      setImageSrc(product.images[0]);
      setImageError(true);
    } else if (imageSrc && !imageSrc.includes('placeholder')) {
      setImageSrc('/placeholder.svg');
    }
  };

  // Use handle for the product link
  const productUrl = `/product/${product.handle}`;

  return (
    <Link to={productUrl} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3 bg-secondary">
        {product.badge === "new" && (
          <span className="absolute top-3 left-3 bg-[#4A647C] text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10">
            NEW
          </span>
        )}
        {product.badge === "bestseller" && (
          <span className="absolute top-3 left-3 bg-[#4A647C] text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10">
            BEST SELLER
          </span>
        )}
        {product.badge === "sale" && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full z-10">
            SALE
          </span>
        )}
        <button 
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#f2f4f6] shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4 text-foreground" />
        </button>
        <img 
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
          loading="lazy"
        />
      </div>
      
      <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      
      {/* Finish swatches */}
      {displayFinishes.length > 0 && (
        <div className="flex items-center gap-1.5 mb-2">
          {displayFinishes.map((finish, index) => (
            <div
              key={index}
              className="w-6 h-6 rounded-full border border-border"
              style={{ backgroundColor: finishColors[finish] || "#CCCCCC" }}
              title={finish}
            />
          ))}
          {remainingFinishes > 0 && (
            <span className="text-xs text-muted-foreground">+{remainingFinishes}</span>
          )}
        </div>
      )}
      
      {/* Price */}
      <div className="flex items-center gap-2">
        <span className="text-primary font-bold">${product.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        {product.originalPrice && (
          <span className="text-muted-foreground line-through text-sm">
            ${product.originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        )}
      </div>
    </Link>
  );
};
