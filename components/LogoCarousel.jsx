"use client";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const brands = [
  { name: "ISUZU", image: "/newmarque/Isuzu.png" },
  { name: "CHEVROLET", image: "/newmarque/chevrolet.png" },
  { name: "CHERY", image: "/newmarque/chery.png" },
  { name: "GREAT WALL", image: "/newmarque/gwm.png" },
  { name: "HAVAL", image: "/newmarque/haval.png" },
  { name: "GAC", image: "/newmarque/gac.png" },
  { name: "TOYOTA", image: "/newmarque/toyota.png" },
  { name: "SUZUKI", image: "/newmarque/suzuki.png" },
  { name: "MG", image: "/newmarque/mg.png" },
  { name: "FORD", image: "/newmarque/ford.png" },
  { name: "DFSK", image: "/newmarque/dfsk.png" },
  { name: "DONGFENG", image: "/newmarque/dongfeng.png" },
  { name: "DACIA", image: "/newmarque/dacia.png" },
  { name: "RENAULT", image: "/newmarque/renault.png" },
];

export default function LogoCarousel() {
  const router = useRouter();
  const [position1, setPosition1] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [velocity, setVelocity] = useState(0);
  const animationRef = useRef(null);
  const lastTouchTime = useRef(0);

  const speed = 0.5; // Auto-scroll speed
  const resetPoint = brands.length * 192; // 192px = w-48

  // Auto-scroll effect
  useEffect(() => {
    if (isDragging) return;

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

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setTouchStartX(e.touches[0].clientX);
    setVelocity(0);
    lastTouchTime.current = Date.now();
    cancelAnimationFrame(animationRef.current);
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const deltaX = touchStartX - currentX;

    setPosition1((prev) => {
      let newPos = prev + deltaX;
      if (newPos < 0) newPos += resetPoint;
      if (newPos >= resetPoint) newPos -= resetPoint;
      return newPos;
    });

    const now = Date.now();
    const timeDelta = now - lastTouchTime.current;
    if (timeDelta > 0) {
      setVelocity(deltaX / timeDelta);
    }
    lastTouchTime.current = now;
    setTouchStartX(currentX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);

    setPosition1((prev) => {
      let newPos = prev + velocity * 100;
      if (newPos < 0) newPos += resetPoint;
      if (newPos >= resetPoint) newPos -= resetPoint;
      return newPos;
    });

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

  const extendedFirstRow = [...brands, ...brands, ...brands];

  return (
    <div className="h-auto p-4 md:p-8 overflow-hidden mb-4 bg-white">
      <div className="relative w-full overflow-hidden">
        <div
          className="flex mb-8 gap-5 touch-none select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <motion.div
            className="flex gap-12"
            style={{ x: `-${position1}px` }}
            transition={{ ease: "linear" }}
          >
            {extendedFirstRow.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-40 bg-white flex items-center justify-center rounded-xl cursor-pointer transition"
                onClick={() => router.push(`/pages/cars?brand=${brand.name}`)}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full max-w-12 h-full object-contain p-4 grayscale hover:grayscale-0 transition duration-300"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
