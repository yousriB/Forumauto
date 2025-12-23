"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import { ArrowUpRight } from "lucide-react";

export default function Showroom() {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const brands = [
    { name: "ISUZU", image: "/carlogos/isuzu.png" },
    { name: "CHEVROLET", image: "/carlogos/chevrolet.png" },
    { name: "CHERY", image: "/carlogos/chery.png" },
    { name: "GREAT WALL", image: "/carlogos/gwm.png" },
    { name: "HAVAL", image: "/carlogos/haval.png" },
    { name: "GAC", image: "/carlogos/gac.png" },
    { name: "TOYOTA", image: "/carlogos/toyota.png" },
    { name: "SUZUKI", image: "/carlogos/suzuki.png" },
    { name: "MG", image: "/carlogos/mg.png" },
    { name: "FORD", image: "/carlogos/ford.png" },
    { name: "DFSK", image: "/carlogos/dfsk.png" },
    { name: "DONGFENG", image: "/carlogos/dongfeng.png" },
    { name: "BYD", image: "/carlogos/byd.png" },
    { name: "RENAULT", image: "/carlogos/renault.png" },
    { name: "DACIA", image: "/carlogos/dacia.png" },
    { name: "NISSAN", image: "/carlogos/nissan.png" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <section className="py-20 md:py-32 bg-white" id="gallery" ref={ref}>
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Minimalist Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-red-600"></span>
              <span className="text-red-600 font-bold uppercase tracking-widest text-xs">Partenaires</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight">
              Nos <span className="font-bold text-slate-900">Marques</span>
            </h2>
          </div>
          <p className="text-slate-500 max-w-xs text-sm md:text-base border-l-2 border-slate-100 pl-4">
            Découvrez une sélection rigoureuse des meilleurs constructeurs mondiaux.
          </p>
        </div>

        {/* Brand Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-px bg-slate-100 border border-slate-100 rounded-3xl overflow-hidden"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.name}
              variants={itemVariants}
              whileHover={{ backgroundColor: "#f8fafc" }} // slate-50
              className="group relative aspect-square bg-white flex items-center justify-center p-6 transition-all duration-300 cursor-pointer"
              onClick={() => router.push(`/pages/cars?brand=${brand.name}`)}
            >
              <div className="relative w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 ease-in-out">
                <Image
                  src={brand.image}
                  alt={brand.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              
              {/* Subtle hover label */}
              <div className="absolute bottom-3 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                  {brand.name}
                </span>
              </div>

              {/* Minimalist Arrow */}
              <ArrowUpRight 
                size={14} 
                className="absolute top-4 right-4 text-slate-200 group-hover:text-red-600 opacity-0 group-hover:opacity-100 transition-all" 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Link */}
        <div className="mt-12 text-center">
            <button onClick={() => router.push("/pages/cars")}    className="text-slate-400 hover:text-red-600 text-sm font-medium transition-colors tracking-wide underline underline-offset-8">
                VOIR TOUS LES MODÈLES DISPONIBLES
            </button>
        </div>
      </div>
    </section>
  );
}