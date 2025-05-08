// components/ui/starRating.tsx
"use client";

import { Star } from "lucide-react";

import { cn } from "@/lib/utils"; // Importe seu utilitário de classes

interface StarRatingProps {
  rating: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
  size?: "sm" | "md" | "lg";
}

export function StarRating({
  rating,
  interactive = false,
  onRatingChange,
  size = "md"
}: StarRatingProps) {
  const sizeClasses = {
    sm: "size-3",
    md: "size-4",
    lg: "size-5"
  };

  const handleClick = (selectedRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(selectedRating);
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleClick(star)}
          disabled={!interactive}
          className={cn(
            "focus:outline-none",
            interactive ? "cursor-pointer hover:scale-110 transition-transform" : "cursor-default"
          )}
          aria-label={`Rate ${star} star${star !== 1 ? 's' : ''}`}
        >
          <Star
            className={cn(
              sizeClasses[size],
              star <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            )}
          />
        </button>
      ))}
    </div>
  );
}