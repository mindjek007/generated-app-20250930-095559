import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
interface StarRatingProps {
  rating: number;
  totalStars?: number;
  size?: number;
  className?: string;
  readOnly?: boolean;
  onRate?: (rating: number) => void;
}
export function StarRating({
  rating,
  totalStars = 5,
  size = 20,
  className,
  readOnly = false,
  onRate,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [currentRating, setCurrentRating] = useState(rating);
  const handleRate = (rate: number) => {
    if (readOnly || !onRate) return;
    setCurrentRating(rate);
    onRate(rate);
  };
  const displayRating = hoverRating > 0 ? hoverRating : currentRating;
  return (
    <div
      className={cn("flex items-center gap-1", className)}
      onMouseLeave={() => !readOnly && setHoverRating(0)}
    >
      {[...Array(totalStars)].map((_, i) => {
        const starValue = i + 1;
        return (
          <Star
            key={i}
            size={size}
            className={cn(
              "transition-colors",
              !readOnly && "cursor-pointer",
              displayRating >= starValue
                ? "fill-yellow-400 text-yellow-500"
                : "fill-muted text-muted-foreground"
            )}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onClick={() => handleRate(starValue)}
          />
        );
      })}
    </div>
  );
}