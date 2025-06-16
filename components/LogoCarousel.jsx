"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const brands = [
  { name: "ISUZU", image: "/marque/secondsuzu.png" },
  { name: "CHEVROLET", image: "/marque/chevrolet.webp" },
  { name: "CHERY", image: "/marque/chery.webp" },
  { name: "GREAT WALL", image: "/marque/gwm.webp" },
  { name: "HAVAL", image: "/marque/haval.webp" },
  { name: "GAC", image: "/marque/gac.webp" },
  { name: "TOYOTA", image: "/marque/toyota.webp" },
  { name: "SUZUKI", image: "/marque/suzuki.webp" },
  { name: "MG", image: "/marque/mg.webp" },
  { name: "FORD", image: "/marque/ford.webp" },
  { name: "DFSK", image: "/marque/dfsk.webp" },
  { name: "DONGFENG", image: "/marque/dongfong.webp" },
];

export default function LogoCarousel() {
  const router = useRouter();
  const [position1, setPosition1] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchDeltaX, setTouchDeltaX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const animationRef = useRef(null);
  const lastTouchTime = useRef(0);

  const speed = 0.5; // Auto-scroll speed (pixels per frame)
  const resetPoint = brands.length * 180; // 128px width + 52px total gap (2 * 26px)

  // Auto-scroll animation
  useEffect(() => {
    if (isDragging) return; // Skip auto-scroll if user is dragging

    const animate = () => {
      setPosition1((prev) => {
        let newPos = prev + speed;
        if (newPos >= resetPoint) newPos -= resetPoint;
        return newPos;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [isDragging]);

  // Handle touch start
  const handleTouchStart = (e) => {
    setIsDragging(true);
    setTouchStartX(e.touches[0].clientX);
    setTouchDeltaX(0);
    setVelocity(0);
    lastTouchTime.current = Date.now();
    cancelAnimationFrame(animationRef.current); // Pause auto-scroll
  };

  // Handle touch move
  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const deltaX = touchStartX - currentX; // Positive deltaX means scrolling left
    setTouchDeltaX(deltaX);

    setPosition1((prev) => {
      let newPos = prev + deltaX;
      if (newPos < 0) newPos += resetPoint;
      if (newPos >= resetPoint) newPos -= resetPoint;
      return newPos;
    });

    // Update velocity for momentum
    const now = Date.now();
    const timeDelta = now - lastTouchTime.current;
    if (timeDelta > 0) {
      setVelocity(deltaX / timeDelta);
    }
    lastTouchTime.current = now;
    setTouchStartX(currentX); // Update start position for next move
  };

  // Handle touch end
  const handleTouchEnd = () => {
    setIsDragging(false);

    // Apply momentum
    setPosition1((prev) => {
      let newPos = prev + velocity * 100; // Adjust multiplier for momentum strength
      if (newPos < 0) newPos += resetPoint;
      if (newPos >= resetPoint) newPos -= resetPoint;
      return newPos;
    });

    // Resume auto-scroll after a short delay
    setTimeout(() => {
      if (!isDragging) {
        animationRef.current = requestAnimationFrame(() => {
          setPosition1((prev) => {
            let newPos = prev + speed;
            if (newPos >= resetPoint) newPos -= resetPoint;
            return newPos;
          });
        });
      }
    }, 100);
  };

  // Duplicate brands for seamless looping
  const extendedFirstRow = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="h-auto p-4 md:p-8 overflow-hidden mb-4 ">
      <div className="relative w-full overflow-hidden">
        {/* First Row - Moving Left */}
        <div
          className="flex mb-8 gap-5 touch-none select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex gap-12 "
            style={{ x: `-${position1}px` }}
            transition={{ ease: "linear" }}
          >
            {extendedFirstRow.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-48  h-48 cursor-pointer mx-[26px] border-1 border-gray-200"
                onClick={() => router.push(`/pages/cars?brand=${brand.name}`)}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  width={192}
                  height={192}
                  className="w-48 h-48 object-contain grayscale hover:grayscale-0"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
