"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, MousePointer2 } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/i18n";
import ScrollLink from "@/components/scroll-link";
import { useRouter } from "next/navigation";

export default function Hero() {
  const { language, dir } = useLanguage();
  const router = useRouter();

  return (
    <section
      id="hero"
      className="relative h-screen min-h-[700px] w-full overflow-hidden bg-black"
    >
      {/* Background Video with refined overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 object-cover object-center w-full h-full scale-105" // Slight scale to prevent edge flickering
        >
          <source
            src="https://res.cloudinary.com/dnyturru8/video/upload/v1752399792/0514_hxsfcu.mp4"
            type="video/mp4"
          />
        </video>
        {/* Luxury Studio Gradient Overlay: Darker at bottom for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
      </div>

      <div className="container relative z-10 h-full flex flex-col justify-center items-center text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="max-w-4xl space-y-8"
          style={{ direction: dir }}
        >
          {/* Refined Badge Style */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <span className="w-12 h-[1px] bg-[#E71609]" />
            <span className="text-white font-bold uppercase tracking-[0.4em] text-[10px] sm:text-xs">
              Forum Auto Gabès
            </span>
            <span className="w-12 h-[1px] bg-[#E71609]" />
          </motion.div>

          {/* Elegant Serif-style Typography approach */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl font-light tracking-tighter text-white leading-[0.9]"
          >
            {t("hero.title1", language).split(' ').slice(0, -1).join(' ')} <br />
            <span className="font-bold italic">
               {t("hero.title1", language).split(' ').pop()}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-lg md:text-xl text-white/80 font-light max-w-2xl mx-auto leading-relaxed tracking-wide"
          >
            {t("hero.subtitle1", language)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-6 pt-8"
          >
            {/* Primary Action */}
            <Button
              size="lg"
              className="bg-[#E71609] hover:bg-red-700 text-white rounded-lg px-10 py-8 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 group"
              onClick={() => router.push("/pages/rendevouz")}
            >
              <span className="flex items-center">
                {t("hero.cta.appointment", language)}
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-500 ${
                    dir === "rtl" ? "mr-2 rotate-180 group-hover:-translate-x-2" : "ml-2 group-hover:translate-x-2"
                  }`}
                />
              </span>
            </Button>

            {/* Ghost Action */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-transparent text-white border-white/30 hover:bg-white hover:text-black rounded-lg px-10 py-8 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500"
            >
              <ScrollLink href="#services">
                {t("hero.cta.services", language)}
              </ScrollLink>
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Luxury Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[9px] uppercase tracking-[0.5em] text-white/40 rotate-90 mb-4 origin-left">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/60 to-transparent" />
      </motion.div>
    </section>
  );
}