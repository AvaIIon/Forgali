import { useState } from "react";
import { cdnImage, cdnSrcSet, CARD_SIZES } from "@/lib/imageProxy";

interface ProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  savings?: number;
  image: string;
  badge?: "new" | "bestseller";
  // price is the cheapest variant of a multi-price product
  fromPrice?: boolean;
}

export const ProductCard = ({
  name,
  price,
  originalPrice,
  savings,
  image,
  badge,
  fromPrice,
}: ProductCardProps) => {
  const [imageError, setImageError] = useState(false);
  const [imageSrc, setImageSrc] = useState(image);

  const handleImageError = () => {
    if (!imageError) {
      setImageSrc('/placeholder.svg');
      setImageError(true);
    }
  };

  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden rounded-lg mb-3 bg-secondary">
        {savings ? (
          <span className="absolute top-3 left-3 save-badge">
            save ${savings}
          </span>
        ) : null}
        {badge === "new" && (
          <span className="absolute top-3 left-3 new-badge">NEW</span>
        )}
        <img
          src={cdnImage(imageSrc, 600)}
          srcSet={cdnSrcSet(imageSrc, [300, 450, 600, 900])}
          sizes={CARD_SIZES}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      <h3 className="font-medium text-sm mb-1 line-clamp-2">{name}</h3>

      <div className="flex items-center gap-2">
        <span className="text-primary font-bold">
          {fromPrice ? "From " : ""}${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        {originalPrice && !fromPrice && (
          <span className="text-muted-foreground line-through text-sm">
            ${originalPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        )}
      </div>
    </div>
  );
};
