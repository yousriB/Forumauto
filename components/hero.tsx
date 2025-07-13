"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/i18n";
import ScrollLink from "@/components/scroll-link";

export default function Hero() {
  const { language, dir } = useLanguage();

  return (
    <section
      id="hero"
      className="relative h-[90vh] min-h-[600px] w-full overflow-auto"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 object-cover object-center w-full h-full"
      >
        <source
          src="https://res.cloudinary.com/dnyturru8/video/upload/v1752399792/0514_hxsfcu.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div className="absolute inset-0 bg-black/50"></div>

      <div className="container relative h-full flex flex-col justify-center items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl space-y-6"
          style={{ direction: dir }}
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block rounded-lg bg-[#E71609] px-4 py-2 text-lg font-bold text-white shadow-lg"
          >
            Forum Auto Gabès
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl text-white drop-shadow-lg"
          >
            {t("hero.title1", language)}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-100"
          >
            {t("hero.subtitle1", language)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 pt-6"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#E71609] hover:bg-[#E71609] text-white font-bold shadow-lg transition-all duration-300 group"
            >
              <ScrollLink href="#appointment" className="flex items-center">
                {t("hero.cta.appointment", language)}
                <ChevronRight
                  className={`${
                    dir === "rtl" ? "mr-2 rotate-180" : "ml-2"
                  } h-4 w-4 transition-transform group-hover:${
                    dir === "rtl" ? "-translate-x-1" : "translate-x-1"
                  }`}
                />
              </ScrollLink>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20 font-bold shadow-lg transition-all duration-300"
            >
              <ScrollLink href="#services">
                {t("hero.cta.services", language)}
              </ScrollLink>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
