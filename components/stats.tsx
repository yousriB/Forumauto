"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Car, Users, Calendar, Award } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/i18n";

export default function Stats() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { language } = useLanguage();

  const stats = [
    { icon: Car, value: 500, labelKey: "stats.vehicles", suffix: "+" },
    { icon: Users, value: 1200, labelKey: "stats.clients", suffix: "+" },
    { icon: Calendar, value: 5, labelKey: "stats.experience", suffix: "+" },
    { icon: Award, value: 16, labelKey: "stats.brands", suffix: "" },
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-[#e71810]">
      {/* Background with fixed parallax and subtle red tint overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-20 grayscale"
        style={{
          backgroundImage: "url('/images/bgbanner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#e71810] via-transparent to-[#e71810] z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-4">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} inView={inView} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({ stat, inView, index, language }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = stat.value;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [inView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col items-center"
    >
      {/* Red Icon Accent */}
      <div className="mb-4 text-white group-hover:text-white transition-colors duration-500">
        <stat.icon size={28} strokeWidth={1.5} />
      </div>

      <div className="text-center">
        <div className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-2">
          {count}
          <span className="text-white">{stat.suffix}</span>
        </div>
        
        {/* Minimalist Label with Primary Red Line */}
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-4 bg-white" />
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-white">
             {t(stat.labelKey, language)}
          </span>
          <div className="h-[1px] w-4 bg-white" />
        </div>
      </div>
    </motion.div>
  );
}