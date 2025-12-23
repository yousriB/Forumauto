"use client";

import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const testimonials = [
    {
      name: "Ahmed Ben Ali",
      position: "Client fidèle",
      rating: 5,
      text: "Service exceptionnel ! J'ai acheté ma voiture chez Forum Auto Gabès et je suis très satisfait. L'équipe est professionnelle et attentionnée. Le processus d'achat a été simple et transparent. Je recommande vivement.",
    },
    {
      name: "Sonia Mansour",
      position: "Entrepreneuse",
      rating: 5,
      text: "Je recommande vivement ce garage pour l'entretien de votre véhicule. J'y ai fait réparer ma Toyota plusieurs fois, et le travail est toujours soigné, les prix sont raisonnables et le personnel est très compétent et honnête.",
    },
    {
      name: "Mohamed Karim",
      position: "Nouveau client",
      rating: 5,
      text: "J'ai fait réparer ma voiture chez Forum Auto et je suis très satisfait du résultat. Le service était rapide et efficace. Le diagnostic était précis et les mécaniciens ont identifié le problème immédiatement.",
    },
  ];

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [autoplay, testimonials.length]);

  const handleManualChange = (index: number) => {
    setAutoplay(false);
    setCurrentIndex(index);
  };

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Luxury Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-[#e71810]"></span>
              <span className="text-[#e71810] font-bold uppercase tracking-widest text-xs">Avis Clients</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-slate-900 leading-none">
              Ils nous font <span className="font-bold text-slate-900">Confiance</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-xs text-sm md:text-base border-l-2 border-slate-100 pl-4 italic">
            "Le prestige ne se raconte pas, il se vit à travers l'expérience de nos clients."
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center"
            >
              {/* Decorative Quote Icon */}
              <div className="flex justify-center mb-10 text-[#e71810]/10">
                <Quote size={80} fill="#e71810" />
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-2xl md:text-3xl lg:text-3xl font-light leading-snug text-slate-800 mb-12 tracking-tight">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < testimonials[currentIndex].rating ? "text-[#e71810] fill-[#e71810]" : "text-slate-200"}
                  />
                ))}
              </div>

              {/* Author Details */}
              <div className="flex flex-col items-center">
                <h3 className="text-base font-bold text-slate-900 uppercase tracking-wider">
                  {testimonials[currentIndex].name}
                </h3>
                <p className="text-[#e71810] text-xs font-bold uppercase tracking-[0.2em] mt-1">
                  {testimonials[currentIndex].position}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Minimalist Navigation Buttons */}
          <div className="absolute top-1/2 -left-12 -right-12 hidden lg:flex justify-between items-center pointer-events-none">
            <button
              onClick={() => handleManualChange(currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1)}
              className="p-4 rounded-full border border-slate-100 text-slate-400 hover:text-[#e71810] hover:border-[#e71810] transition-all duration-300 pointer-events-auto bg-white/50 backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => handleManualChange(currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1)}
              className="p-4 rounded-full border border-slate-100 text-slate-400 hover:text-[#e71810] hover:border-[#e71810] transition-all duration-300 pointer-events-auto bg-white/50 backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center mt-16 gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-1 transition-all duration-500 rounded-full ${
                  currentIndex === index
                    ? "w-12 bg-[#e71810]"
                    : "w-4 bg-slate-200 hover:bg-slate-300"
                }`}
                onClick={() => handleManualChange(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}