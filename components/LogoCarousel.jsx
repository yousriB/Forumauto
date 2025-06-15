"use client";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    const speed = 0.5; // Adjust speed (pixels per frame)
    let animationFrame;

    const animate = () => {
      setPosition1((prev) => {
        const newPos = prev + speed;
        const resetPoint = brands.length * 180; // 128px width + 52px total gap (2 * 26px)
        return newPos >= resetPoint ? newPos - resetPoint : newPos;
      });
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // Duplicate brands for seamless looping
  const extendedFirstRow = [...brands, ...brands, ...brands, ...brands];

  return (
    <div className="h-auto bg-background p-4 md:p-8 overflow-hidden mb-4">
      <div className="relative w-full overflow-hidden">
        {/* First Row - Moving Left */}
        <div className="flex mb-8 gap-5">
          <motion.div
            className="flex gap-12"
            style={{ x: `-${position1}px` }}
            transition={{ ease: "linear" }}
          >
            {extendedFirstRow.map((brand, index) => (
              <div
                key={`${brand.name}-${index}`}
                className="flex-shrink-0 w-32 h-32 cursor-pointer mx-[26px] border-1 border-gray-200 rounded-md shadow-xl"
                onClick={() => router.push(`/pages/cars?brand=${brand.name}`)}
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  width={128}
                  height={128}
                  className="w-32 h-32 object-contain transition-transform duration-300 grayscale"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
