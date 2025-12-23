"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CarBadge from "@/components/ui/car-badge";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";

export default function VersionSelectionPage() {
  const router = useRouter();
  const { brand, model } = useParams();
  
  // Data Fetching
  const cars = require("../../../../../../data/cars.json");
  const decodedBrand = decodeURIComponent(brand as string);
  const decodedModel = decodeURIComponent(model as string);

  const versions = cars.filter(
    (car: any) => car.brand === decodedBrand && car.model.trim() === decodedModel
  );

  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container px-6 mx-auto max-w-7xl">       

        {/* Luxury Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-[#e71810]"></span>
            <span className="text-[#e71810] font-bold uppercase tracking-[0.3em] text-[10px]">Configurations</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900 leading-tight">
            {decodedBrand} <span className="font-bold">{decodedModel}</span>
          </h2>
          <p className="text-slate-700 mt-4 font-light italic">Sélectionnez la version qui correspond à vos besoins.</p>
        </div>

        {versions.length === 0 ? (
          <div className="text-center py-32 bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-200">
            <p className="text-slate-700 font-light">Aucune version disponible pour ce modèle.</p>
            <Button
              variant="link"
              onClick={() => router.push("/pages/cars")}
              className="mt-4 text-[#e71810] font-bold uppercase tracking-widest text-xs"
            >
              Voir d'autres modèles
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {versions.map((car: any, index: number) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(`/pages/cars/${car.id}`)}
                className="group cursor-pointer"
              >
                {/* Image Container - Studio Style */}
                <div className="relative aspect-[4/3] w-full bg-white rounded-[2rem] overflow-hidden mb-6 group-hover:bg-white transition-colors duration-500">
                  <div className="absolute top-5 left-5 z-10">
                    <CarBadge isNew={car.new} isPromotion={car.promotion} />
                  </div>
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-contain p-10 transition-transform duration-700 group-hover:scale-105"
                    unoptimized
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/5 transition-colors duration-500" />
                  
                  {/* CTA Button that appears on hover */}
                  <div className="absolute bottom-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-xl text-[#e71810]">
                      <ChevronRight size={20} />
                    </div>
                  </div>
                </div>

                {/* Info Section */}
                <div className="px-2 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-slate-900 font-bold uppercase tracking-wider text-sm">
                        {car.version}
                      </h3>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] uppercase font-bold text-slate-700">{car.fuel}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span className="text-[10px] uppercase font-bold text-slate-700">{car.gearbox}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-50 mt-4">
                    <span className="text-2xl font-bold text-[#e71810]">
                      {formatPrice(car.price)} <span className="text-xs font-medium text-slate-700">DT</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}