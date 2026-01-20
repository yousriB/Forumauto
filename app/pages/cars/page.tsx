"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import CarBadge from "@/components/ui/car-badge";
import { motion, AnimatePresence } from "framer-motion";
import { SlidersHorizontal, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Luxury Loading State
const Fallback = () => (
  <div className="container px-6 mx-auto py-24 text-center">
    <div className="inline-block w-8 h-8 border-2 border-t-[#E71609] border-slate-100 rounded-full animate-spin mb-4" />
    <p className="text-slate-700 font-light tracking-widest uppercase text-xs">Chargement de la collection...</p>
  </div>
);

export default function Page() {
  return (
    <Suspense fallback={<Fallback />}>
      <CarFiltersAndList />
    </Suspense>
  );
}

function CarFiltersAndList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Raw data for version checking
  const carsData = require("../../../data/cars.json");
  
  // Unique cars for display - always pick the one with the lowest price
  const uniqueCars = Object.values(
    carsData.reduce((acc: any, car: any) => {
      const key = `${car.brand}-${car.model.trim()}`;
      if (!acc[key] || car.price < acc[key].price) {
        acc[key] = car;
      }
      return acc;
    }, {})
  ) as any[];

  const [filters, setFilters] = useState({
    brand: searchParams.get("brand") || "all",
    minPrice: 0,
    maxPrice: 600000,
    fuel: [] as string[],
    gearbox: [] as string[],
  });

  const [filteredCars, setFilteredCars] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const carsPerPage = 9;

  const brands = [...new Set(uniqueCars.map((car) => car.brand))];
  const fuelTypes = [...new Set(uniqueCars.map((car) => car.fuel))];
  const gearboxTypes = [...new Set(uniqueCars.map((car) => car.gearbox))];

  useEffect(() => {
    const filtered = uniqueCars
      .filter((car) => (
        (filters.brand === "all" || car.brand === filters.brand) &&
        car.price >= filters.minPrice &&
        car.price <= filters.maxPrice &&
        (filters.fuel.length === 0 || filters.fuel.includes(car.fuel)) &&
        (filters.gearbox.length === 0 || filters.gearbox.includes(car.gearbox))
      ))
      .sort((a, b) => a.price - b.price);

    setFilteredCars(filtered);
    setCurrentPage(1);
  }, [filters]);

  const currentCars = filteredCars.slice((currentPage - 1) * carsPerPage, currentPage * carsPerPage);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const formatPrice = (price: number) => price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");

  // Navigation Logic
  const handleCarClick = (car: any) => {
    const versions = carsData.filter(
      (c: any) => c.brand === car.brand && c.model.trim() === car.model.trim()
    );
    if (versions.length > 1) {
      router.push(`/pages/cars/versions/${encodeURIComponent(car.brand)}/${encodeURIComponent(car.model.trim())}`);
    } else {
      router.push(`/pages/cars/${car.id}`);
    }
  };

  return (
    <section className="py-20 bg-white min-h-screen">
      <div className="container px-6 mx-auto ">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-[#e71810]"></span>
              <span className="text-[#e71810] font-bold uppercase tracking-[0.3em] text-[10px]">Inventaire Premium</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900 leading-none">
              Nos <span className="font-bold">Véhicules</span>
            </h2>
          </div>
          <div className="text-slate-700 text-sm font-light tracking-widest uppercase">
            <span className="text-slate-900 font-bold">{filteredCars.length}</span> Modèles
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-10">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <h3 className="flex items-center gap-2 font-bold uppercase tracking-widest text-[10px] text-slate-900">
                  <SlidersHorizontal size={14} /> Filtrer par
                </h3>
                <button 
                  onClick={() => setFilters({ brand: "all", minPrice: 0, maxPrice: 600000, fuel: [], gearbox: [] })}
                  className="text-[10px] uppercase tracking-tighter text-[#E71609] font-bold hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Brand */}
              <div className="space-y-4">
                <Label className="text-[10px] uppercase tracking-widest text-slate-700 font-bold">Marque</Label>
                <Select value={filters.brand} onValueChange={(v) => setFilters(f => ({...f, brand: v}))}>
                  <SelectTrigger className="border-none bg-slate-50 rounded-xl h-12 focus:ring-0">
                    <SelectValue placeholder="Toutes" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les marques</SelectItem>
                    {brands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Slider */}
              <div className="space-y-6">
                <Label className="text-[10px] uppercase tracking-widest text-slate-700 font-bold">Prix Maximum</Label>
                <input 
                  type="range" min="0" max="600000" step="5000"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(f => ({...f, maxPrice: parseInt(e.target.value)}))}
                  className="w-full h-1 bg-slate-500 accent-slate-900 appearance-none cursor-pointer rounded-lg"
                />
                <div className="flex justify-between text-xs font-bold text-slate-900">
                  <span>0 DT</span>
                  <span className="text-[#e71810]">{formatPrice(filters.maxPrice)} DT</span>
                </div>
              </div>

              <FilterGroup 
                label="Carburant" 
                options={fuelTypes} 
                selected={filters.fuel} 
                onChange={(v:any) => setFilters(f => ({...f, fuel: f.fuel.includes(v) ? f.fuel.filter(i => i !== v) : [...f.fuel, v]}))} 
              />
            </div>
          </aside>

          {/* Car Grid */}
          <main className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-8 gap-y-12"
              >
                {currentCars.map((car) => (
                  <CarCard 
                    key={car.id} 
                    car={car} 
                    allCars={carsData}
                    formatPrice={formatPrice} 
                    onClick={() => handleCarClick(car)}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
               <div className="flex items-center justify-center gap-2 mt-20">
               <Button 
                 variant="ghost" 
                 disabled={currentPage === 1} 
                 onClick={() => { setCurrentPage(p => p - 1); window.scrollTo({top:0, behavior:'smooth'}) }}
                 className="rounded-xl"
               >
                 <ChevronLeft size={18} />
               </Button>
               {[...Array(totalPages)].map((_, i) => (
                 <button
                   key={i}
                   onClick={() => { setCurrentPage(i + 1); window.scrollTo({top:0, behavior:'smooth'}) }}
                   className={`w-10 h-10 rounded-xl text-xs font-bold transition-all ${currentPage === i + 1 ? 'bg-[#e71810] text-white shadow-lg shadow-red-500/20' : 'text-slate-700 hover:bg-slate-50'}`}
                 >
                   {i + 1}
                 </button>
               ))}
               <Button 
                 variant="ghost" 
                 disabled={currentPage === totalPages} 
                 onClick={() => { setCurrentPage(p => p + 1); window.scrollTo({top:0, behavior:'smooth'}) }}
                 className="rounded-xl"
               >
                 <ChevronRight size={18} />
               </Button>
             </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ label, options, selected, onChange }: any) {
  return (
    <div className="space-y-4">
      <Label className="text-[10px] uppercase tracking-widest text-slate-700 font-bold">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt: string) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all border ${
              selected.includes(opt) 
              ? 'bg-slate-900 border-slate-900 text-white' 
              : 'bg-white border-slate-100 text-slate-500 hover:border-slate-300'
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function CarCard({ car, allCars, formatPrice, onClick }: any) {
  // Logic to check for multiple versions
  const hasMultipleVersions = allCars.filter(
    (c: any) => c.brand === car.brand && c.model.trim() === car.model.trim()
  ).length > 1;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full bg-white rounded-[2rem] overflow-hidden mb-6 transition-colors group-hover:bg-white">
        <div className="absolute top-5 left-5 z-10">
          <CarBadge isNew={car.new} isPromotion={car.promotion} />
        </div>
        <Image
          src={car.image}
          alt={car.model}
          fill
          className="object-contain p-10 transition-transform duration-700 group-hover:scale-110"
          unoptimized
        />
      </div>
      
      {/* Content */}
      <div className="space-y-1 px-2">
        <h3 className="text-slate-900 font-bold uppercase tracking-wider text-sm group-hover:text-[#e71810] transition-colors flex items-center justify-between">
          {car.brand} {car.model}
          <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </h3>
        
        <div className="flex flex-col">
          <span className="text-[#e71810] font-bold text-xl tracking-tight">
            {hasMultipleVersions ? (
              <span className="text-xs uppercase tracking-widest font-light text-slate-700 block mb-0.5">À partir de</span>
            ) : null}
            {formatPrice(car.price)} <span className="text-[10px] font-medium text-slate-700">DT</span>
          </span>
        </div>

        <div className="pt-2 flex items-center gap-2">
           <span className="text-[9px] uppercase font-bold tracking-widest text-slate-700 bg-slate-50 px-2 py-1 rounded-md">
             {car.fuel}
           </span>
           <span className="text-[9px] uppercase font-bold tracking-widest text-slate-700 bg-slate-50 px-2 py-1 rounded-md">
             {car.gearbox}
           </span>
        </div>
      </div>
    </motion.div>
  );
}