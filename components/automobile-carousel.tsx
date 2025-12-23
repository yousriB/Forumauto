"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import CarBadge from "@/components/ui/car-badge";

// Assuming cars.json is in the data folder
import carData from "../data/cars.json";

export default function AutomobileCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  // Get random selection once on mount to prevent re-shuffling on every render
  const randomCars = useMemo(() => {
    return [...carData].sort(() => 0.5 - Math.random()).slice(0, 16);
  }, []);

  const infiniteCars = [...randomCars, ...randomCars];

  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) setItemsPerPage(1);
    else if (width < 768) setItemsPerPage(2);
    else if (width < 1024) setItemsPerPage(3);
    else setItemsPerPage(4);
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const totalGroups = Math.ceil(randomCars.length / itemsPerPage);

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleNav = (newDir: number) => {
    if (isAnimating) return;
    setDirection(newDir);
    setIsAnimating(true);
    setActiveIndex((prev) => {
      const next = prev + newDir;
      if (next < 0) return totalGroups - 1;
      if (next >= totalGroups) return 0;
      return next;
    });
  };

  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 600);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  const getVisibleCars = () => {
    const startIndex = activeIndex * itemsPerPage;
    return infiniteCars.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className="py-24 bg-white overflow-hidden" ref={ref}>
      <div className="container px-6 mx-auto max-w-7xl">
        
        {/* Luxury Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-red-600"></span>
              <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Showroom</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 leading-none">
              Nos Voitures <span className="font-bold text-slate-900">Disponibles</span>
            </h2>
          </div>
          
          {/* Minimalist Controls */}
          <div className="flex items-center gap-4">
             <button 
                onClick={() => handleNav(-1)} 
                disabled={isAnimating}
                className="p-4 border border-slate-200 rounded-full hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30"
              >
                <ChevronLeft size={20} />
             </button>
             <button 
                onClick={() => handleNav(1)} 
                disabled={isAnimating}
                className="p-4 border border-slate-200 rounded-full hover:bg-slate-900 hover:text-white transition-all disabled:opacity-30"
              >
                <ChevronRight size={20} />
             </button>
          </div>
        </div>

        {/* Carousel Content */}
        <div className="relative">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={activeIndex}
              initial={{ x: direction > 0 ? 50 : -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -50 : 50, opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {getVisibleCars().map((car, index) => (
                <motion.div
                  key={`${car.id}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => router.push(`/pages/cars/${car.id}`)}
                >
                  {/* Image Card */}
                  <div className="relative aspect-[4/3] bg-white rounded-2xl overflow-hidden mb-6 transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-slate-200">
                    <div className="absolute top-4 left-4 z-10">
                       <CarBadge isNew={car.new} isPromotion={car.promotion} />
                    </div>
                    
                    <Image
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-contain p-6 group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />

                    {/* Quick View Overlay */}
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors flex items-center justify-center">
                        <div className="p-3 bg-white rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-xl">
                            <ArrowUpRight size={20} className="text-red-600" />
                        </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 px-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-xs font-black text-red-600 uppercase tracking-widest mb-1">{car.brand}</h3>
                            <p className="text-xl font-bold text-slate-900 leading-tight">{car.model}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-lg font-black text-slate-900">{formatPrice(car.price)} <span className="text-[10px] font-medium text-slate-400">DT</span></p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                        <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded uppercase">{car.fuel}</span>
                        <span className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded uppercase">{car.gearbox}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimalist Progress Indicators */}
        <div className="flex justify-center mt-16 gap-3">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (isAnimating) return;
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`h-1 transition-all duration-500 rounded-full ${
                activeIndex === index ? "w-12 bg-red-600" : "w-4 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}