"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import CarBadge from "@/components/ui/car-badge";

export default function AutomobileCarousel() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Default value
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const carouselRef = useRef(null);

  // Car data
  const cars = require("../data/cars.json");

  // Function to get a random subset of cars
  const getRandomCars = (cars: any, numberOfCars: number | undefined) => {
    const shuffledCars = [...cars].sort(() => 0.5 - Math.random()); // Shuffle the cars array
    return shuffledCars.slice(0, numberOfCars); // Get the first 'numberOfCars' cars
  };

  // Generate a list of 10 random cars
  const randomCars = getRandomCars(cars, 20);

  // Create infinite array by duplicating cars
  const infiniteCars = [...randomCars, ...randomCars];

  // Function to determine items per page based on screen size
  const updateItemsPerPage = () => {
    const width = window.innerWidth;
    if (width < 640) {
      // sm
      setItemsPerPage(1);
    } else if (width < 768) {
      // md
      setItemsPerPage(2);
    } else if (width < 1024) {
      // lg
      setItemsPerPage(3);
    } else {
      // xl and above
      setItemsPerPage(4);
    }
  };

  // Update itemsPerPage on mount and resize
  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  // Calculate total groups based on itemsPerPage
  const totalGroups = Math.ceil(randomCars.length / itemsPerPage);

  // Format price with spaces
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Handle navigation
  const handlePrev = () => {
    if (isAnimating) return;
    setDirection(-1);
    setIsAnimating(true);
    setActiveIndex((prev) => {
      const newIndex = prev - 1;
      return newIndex < 0 ? totalGroups - 1 : newIndex;
    });
  };

  const handleNext = () => {
    if (isAnimating) return;
    setDirection(1);
    setIsAnimating(true);
    setActiveIndex((prev) => {
      const newIndex = prev + 1;
      return newIndex >= totalGroups ? 0 : newIndex;
    });
  };

  // Reset animation state
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => setIsAnimating(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isAnimating]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: { key: string }) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating]);

  // Calculate the visible cars based on activeIndex and itemsPerPage
  const getVisibleCars = () => {
    const startIndex = activeIndex * itemsPerPage;
    return infiniteCars.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <section className="py-12 bg-white overflow-hidden">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Nos Voitures Disponibles
            </h2>
            <p className="text-slate-600">
              Découvrez notre sélection de véhicules de qualité
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <Button
              onClick={handlePrev}
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={isAnimating}
              aria-label="Précédent"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleNext}
              variant="outline"
              size="icon"
              className="rounded-full"
              disabled={isAnimating}
              aria-label="Suivant"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="relative" ref={ref}>
          <div className="overflow-hidden" ref={carouselRef}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeIndex}
                className="flex"
                initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: direction > 0 ? -100 : 100, opacity: 0 }}
                transition={{ ease: "easeInOut", duration: 0.8 }}
                style={{ width: "100%", justifyContent: "center" }}
              >
                {getVisibleCars().map((car, index) => (
                  <motion.div
                    key={`${car.id}-${activeIndex}-${index}`}
                    className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 flex-shrink-0 px-3 py-4"
                    initial={{ x: direction > 0 ? 100 : -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card
                      key={car.id}
                      className="overflow-hidden border-none duration-300 cursor-pointer"
                      onClick={() => router.push(`/pages/cars/${car.id}`)}
                    >
                      <div className="relative h-52 w-full overflow-hidden bg-white flex justify-center items-center">
                        <CarBadge isNew={car.new} isPromotion={car.promotion} />
                        <Image
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          width={300}
                          height={300}
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          unoptimized={true}
                        />
                      </div>
                      <CardContent className="pt-0 pb-6">
                        <div className="flex flex-col mb-4">
                          <h3 className="text-black font-medium uppercase text-base">
                            {" "}
                            {car.brand} {car.model}
                          </h3>
                          <span className="font-bold text-xl text-[#E71609]">
                            {formatPrice(car.price)} DT
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="px-2 py-1 bg-gray-100 rounded-md">
                            {car.fuel}
                          </div>
                          <div className="px-2 py-1 bg-gray-100 rounded-md">
                            {car.gearbox}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center mt-8 gap-1">
          {Array.from({ length: totalGroups }).map((_, index) => (
            <button
              key={index}
              className={`h-2 rounded-full transition-all ${
                activeIndex === index
                  ? "w-8 bg-red-600"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => {
                if (isAnimating) return;
                setDirection(index > activeIndex ? 1 : -1);
                setIsAnimating(true);
                setActiveIndex(index);
              }}
              disabled={isAnimating}
              aria-label={`Aller au groupe ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
