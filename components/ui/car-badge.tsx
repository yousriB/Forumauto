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
      className={`absolute top-0  flex flex-row px-1 z-10  w-full justify-between  ${className}`}
    >
      {isNew && (
        <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
          Nouveau
        </span>
      )}
      {isPromotion && (
        <span className="bg-black text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
          Promotion
        </span>
      )}
    </div>
  );
}
