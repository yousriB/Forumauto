import React from "react";

interface CarBadgeProps {
  isNew?: boolean;
  isPromotion?: boolean;
  className?: string;
}

export default function CarBadge({
  isNew,
  isPromotion,
  className = "",
}: CarBadgeProps) {
  if (!isNew && !isPromotion) return null;

  return (
    <div
      className={`absolute top-0 flex flex-row px-1 z-10 w-full justify-between ${className}`}
    >
      {isNew && (
        <span className="relative bg-green-800 text-white text-xs font-semibold px-3 py-1 rounded-xl shadow-md uppercase tracking-wider">
          Nouveau
          {/* Triangle bottom-left */}
          <div className="absolute -bottom-1 left-2 w-0 h-0 border-l-8 border-l-transparent border-t-8 border-t-green-800"></div>
        </span>
      )}

      {isPromotion && (
        <span className="relative bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-xl shadow-md uppercase tracking-wider">
          Promo
          {/* Triangle bottom-right */}
          <div className="absolute -bottom-1 right-2 w-0 h-0 border-r-8 border-r-transparent border-t-8 border-t-red-600"></div>
        </span>
      )}
    </div>
  );
}
