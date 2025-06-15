"use client";

import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      name: "Ahmed Ben Ali",
      position: "Client depuis 2019",
      rating: 5,
      text: "Service exceptionnel ! J'ai acheté ma voiture chez Forum Auto Gabès et je suis très satisfait. L'équipe est professionnelle et attentionnée. Le processus d'achat a été simple et transparent. Je recommande vivement.",
      image: "/images/testimonial-1.jpg",
    },
    {
      name: "Sonia Mansour",
      position: "Cliente fidèle",
      rating: 5,
      text: "Je recommande vivement ce garage pour l'entretien de votre véhicule. J'y ai fait réparer ma Toyota plusieurs fois, et le travail est toujours soigné, les prix sont raisonnables et le personnel est très compétent et honnête. Merci pour votre excellent service !",
      image: "/images/testimonial-2.jpg",
    },
    {
      name: "Mohamed Karim",
      position: "Nouveau client",
      rating: 4,
      text: "J'ai fait réparer ma voiture chez Forum Auto et je suis très satisfait du résultat. Le service était rapide et efficace. Le diagnostic était précis et les mécaniciens ont identifié le problème immédiatement. Ma voiture fonctionne à nouveau parfaitement.",
      image: "/images/testimonial-3.jpg",
    },
  ];

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 8000);

    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-[#E71609] px-3 py-1 text-sm text-white mb-4">
            Témoignages
          </div>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4 text-[#E71609]">
            Ce que disent nos clients
          </h2>
          <p className="text-lg text-gray-600">
            Découvrez les expériences de nos clients satisfaits avec Forum Auto
            Gabès.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <Card className="border-none shadow-xl p-1 bg-white overflow-hidden">
                <div className="absolute top-10 left-10 text-red-100">
                  <Quote size={120} className="opacity-20" />
                </div>
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 h-60 md:h-auto relative bg-red-600">
                      <Image
                        src={
                          testimonials[currentIndex].image || "/placeholder.svg"
                        }
                        alt={testimonials[currentIndex].name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg?height=300&width=200";
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <h3 className="font-bold text-xl">
                          {testimonials[currentIndex].name}
                        </h3>
                        <p className="text-sm opacity-90">
                          {testimonials[currentIndex].position}
                        </p>
                        <div className="flex mt-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className={`${
                                i < testimonials[currentIndex].rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-white opacity-40"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                      <p className="text-gray-700 text-lg leading-relaxed relative z-10">
                        {testimonials[currentIndex].text}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Button
            variant="secondary"
            size="icon"
            className="absolute -left-6 md:-left-8 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full h-12 w-12 shadow-lg z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute -right-6 md:-right-8 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-100 rounded-full h-12 w-12 shadow-lg z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-3 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-10 bg-red-600"
                    : "w-3 bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
