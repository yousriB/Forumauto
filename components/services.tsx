"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Gauge, FileText, Wrench } from "lucide-react";

export default function Services() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carImages = [
    "/testdrive/7.png",
    "/testdrive/1.png",
    "/testdrive/2.png",
    "https://catalogue.automobile.tn/big/2025/07/47408.webp?t=1758275146",
    "/testdrive/arrizo5.png",
  ];

  const nextImage = () => setCurrentImageIndex((p) => (p === carImages.length - 1 ? 0 : p + 1));
  const prevImage = () => setCurrentImageIndex((p) => (p === 0 ? carImages.length - 1 : p - 1));

  return (
    <section id="services" className="py-16 md:py-24 bg-white text-slate-900">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-20 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-red-600"></span>
              <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Excellence</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight leading-none">
              Services <span className="font-bold">Premium</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-xs text-sm md:text-base leading-relaxed">
            Une approche minimaliste de l'automobile. La performance rencontre le design pur.
          </p>
        </div>

        {/* Responsive Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          
          {/* Card 1: Test Drive (Hero Card) */}
          <div className="md:col-span-12 lg:col-span-8 group relative rounded-2xl bg-slate-50 border border-slate-300 p-8 md:p-12 overflow-hidden flex flex-col justify-between min-h-[400px]">
            <div className="relative z-10">
              <div className="flex items-center gap-3 text-red-600 mb-6">
                <Gauge size={20} />
                <span className="font-bold text-sm tracking-widest uppercase">Expérience</span>
              </div>
              <h3 className="text-3xl md:text-5xl font-bold mb-4 max-w-md">Envie de prendre le volant ?</h3>
              <button 
                onClick={() => router.push("/pages/testdrive")}
                className="flex items-center gap-2 group/btn text-slate-900 font-bold text-lg hover:text-red-600 transition-colors"
              >
                Réserver un essai <ArrowUpRight className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
              </button>
            </div>

            {/* Slider Component */}
            <div className="relative mt-8 md:mt-0 flex items-center justify-center lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:w-1/2 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full h-full flex items-center justify-center p-6"
                >
                  <Image
                    src={carImages[currentImageIndex]}
                    alt="Car"
                    width={600}
                    height={300}
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
              
              <div className="absolute bottom-4 right-8 flex gap-2">
                <button onClick={prevImage} className="p-3 bg-white border border-slate-300 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                  <ChevronLeft size={18} />
                </button>
                <button onClick={nextImage} className="p-3 bg-white border border-slate-300 rounded-full hover:bg-slate-900 hover:text-white transition-all shadow-sm">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Marques (Clean/White) */}
          <div 
            className="md:col-span-6 lg:col-span-4 rounded-2xl border border-slate-200 bg-[#e71609] p-8 md:p-10 flex flex-col justify-between cursor-pointer  transition-colors"
            onClick={() => router.push("/pages/logos")}
          >
            <div>
              <h3 className="text-2xl text-white font-bold mb-2">Nos Marques</h3>
              <p className="text-white text-sm">Le meilleur de l'ingénierie automobile.</p>
            </div>
            <div className="flex flex-col gap-8 items-center py-8">
              <Image src="/images/supercar.png" alt="Brand" width={400} height={80} className=" grayscale  transition-all" />
            </div>
            <span className="text-sm font-bold text-white uppercase tracking-tighter inline-flex items-center gap-1">Découvrir <ArrowUpRight size={14} /></span>
          </div>

          {/* Card 3: Devis (Minimalist Red Accent) */}
          <div 
            className="md:col-span-6 lg:col-span-6 rounded-2xl bg-white border border-slate-300 p-8 flex items-start justify-between group cursor-pointer hover:shadow-2xl hover:shadow-slate-100 transition-all"
            onClick={() => router.push("/pages/demanderdevis")}
          >
            <div className="flex gap-6">
              <div className="p-4 bg-slate-50 rounded-xl group-hover:bg-red-50 group-hover:text-red-600 transition-colors">
                <FileText size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-1">Devis Personnalisé</h3>
                <p className="text-slate-500 text-sm">Réponse rapide sous 24h.</p>
              </div>
            </div>
            <ArrowUpRight className="text-slate-300 group-hover:text-red-600 transition-colors" />
          </div>

          {/* Card 4: Entretien (Minimalist Dark) */}
          <div 
            className="md:col-span-12 lg:col-span-6 rounded-2xl bg-[#0a0a0a] p-8 flex items-center justify-between group cursor-pointer hover:bg-black transition-all"
            onClick={() => router.push("/pages/rendevouz")}
          >
            <div className="flex items-center gap-6">
              <div className="p-4 bg-white/10 rounded-xl text-white group-hover:bg-red-600 transition-colors">
                <Wrench size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Service Entretien</h3>
                <p className="text-slate-400 text-sm">Prenez rendez-vous en ligne.</p>
              </div>
            </div>
            <div className="hidden sm:block text-white font-bold border-b border-white/20 pb-1 group-hover:border-red-600">Réserver</div>
          </div>

        </div>
      </div>
    </section>
  );
}