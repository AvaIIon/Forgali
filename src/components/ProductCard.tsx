import { Star, Heart } from "lucide-react";

interface ProductCardProps {
  name: string;
  rating: number;
  reviews: number;
  price: number;
  originalPrice: number;
  savings?: number;
  image: string;
  badge?: "new" | "bestseller";
}

export const ProductCard = ({
  name,
  rating,
  reviews,
  price,
  originalPrice,
  savings,
  image,
  badge,
}: ProductCardProps) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3 bg-secondary">
        {savings && (
          <span className="absolute top-3 left-3 save-badge">
            save ${savings}
          </span>
        )}
        {badge === "new" && (
          <span className="absolute top-3 left-3 new-badge">NEW</span>
        )}
        {badge === "bestseller" && (
          <span className="absolute top-3 left-3 bestseller-badge">BEST SELLER</span>
        )}
        <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Heart className="w-4 h-4 text-foreground" />
        </button>
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <h3 className="font-medium text-sm mb-1 line-clamp-2">{name}</h3>
      
      <div className="flex items-center gap-1 mb-1">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={`w-3.5 h-3.5 ${
              i < fullStars 
                ? 'fill-primary text-primary' 
                : i === fullStars && hasHalfStar
                  ? 'fill-primary/50 text-primary'
                  : 'fill-muted text-muted'
            }`}
          />
        ))}
        <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
      </div>
      
      <div className="flex items-center gap-2">
        <span className="text-primary font-bold">${price.toLocaleString()}</span>
        <span className="text-muted-foreground line-through text-sm">
          ${originalPrice.toLocaleString()}
        </span>
      </div>
    </div>
  );
};
