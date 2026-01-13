import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import type { Product } from "@/data/products";

interface CategoryProductCardProps {
  product: Product;
}

export const CategoryProductCard = ({ product }: CategoryProductCardProps) => {
  const displayColors = product.colors.slice(0, 4);
  const remainingColors = product.colors.length - 4;

  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3 bg-secondary">
        {product.badge === "new" && (
          <span className="absolute top-3 left-3 bg-[#4A90A4] text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10">
            NEW
          </span>
        )}
        {product.badge === "bestseller" && (
          <span className="absolute top-3 left-3 bg-[#4A90A4] text-white text-xs font-semibold px-3 py-1.5 rounded-full z-10">
            BEST SELLER
          </span>
        )}
        {product.badge === "sale" && (
          <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-3 py-1.5 rounded-full z-10">
            SALE
          </span>
        )}
        <button 
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          <Heart className="w-4 h-4 text-foreground" />
        </button>
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {product.name}
      </h3>
      
      {/* Color swatches */}
      <div className="flex items-center gap-1.5 mb-2">
        {displayColors.map((color, index) => (
          <div
            key={index}
            className="w-6 h-6 rounded-full border border-border"
            style={{ backgroundColor: color }}
          />
        ))}
        {remainingColors > 0 && (
          <span className="text-xs text-muted-foreground">+{remainingColors}</span>
        )}
      </div>
      
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
