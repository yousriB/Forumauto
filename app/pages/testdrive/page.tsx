"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User, Phone, Mail, Car, ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SuccessMessage from "@/components/SuccessMessage";

const carOptions = [
  { brand: "FORD", model: "Ranger XLT" },
  { brand: "FORD", model: "Ranger Wildtrak" },
  { brand: "FORD", model: "Ranger Raptor" },
  { brand: "DFSK", model: "Glory 500" },
  { brand: "DONGFENG", model: "Forthing T5 EVO" },
  { brand: "GAC", model: "Emzoom" },
  { brand: "SUZUKI", model: "Jimny" },
  { brand: "CHERY", model: " ARRIZO 8" },
  { brand: "CHERY", model: " ARRIZO 5" },
  { brand: "CHERY", model: "TIGGO 7 PRO" },
];

export default function TestDrivePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCarModelChange = (value: string) => {
    setFormData((prev) => ({ ...prev, carModel: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/test_drive_requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname: formData.name,
          email: formData.email,
          phone: formData.phone,
          model: formData.carModel,
        }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: "", email: "", phone: "", carModel: "" });
      } else {
        alert("Une erreur est survenue.");
      }
    } catch (error) {
      alert("Erreur réseau.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="testdrive" className="py-24 md:py-32 bg-white min-h-screen">
      <div className="container px-6 mx-auto max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="w-12 h-[1px] bg-[#e71810]"></span>
            <span className="text-[#e71810] font-bold uppercase tracking-[0.4em] text-[10px]">Expérience Premium</span>
            <span className="w-12 h-[1px] bg-[#e71810]"></span>
          </motion.div>
          
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter text-slate-900 mb-6">
            Réserver votre <span className="font-bold">Essai Privé</span>
          </h2>
          <p className="text-slate-700 font-light text-lg max-w-2xl leading-relaxed">
            Prenez le volant de l'excellence. Remplissez vos coordonnées pour organiser une rencontre privilégiée avec le modèle de votre choix.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: Visual/Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden p-12 flex flex-col justify-end group">
                <div className="absolute inset-0">
                  <Image
                    src="https://images.unsplash.com/photo-1579783655693-5b3d432cb286?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Luxury car for test drive"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
                <div className="relative z-20">
                    <h3 className="text-white text-2xl font-bold mb-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                        Sentez la Puissance
                    </h3>
                    <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500 delay-100">
                        Chaque courbe, chaque accélération, redéfinie.
                    </p>
                </div>
           
            </div>

            <div className="grid grid-cols-2 gap-8 px-4">
                <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-2">Durée</span>
                    <p className="text-slate-900 font-medium italic">45 Minutes d'essai</p>
                </div>
                <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-700 mb-2">Accompagnement</span>
                    <p className="text-slate-900 font-medium italic">Expert Produit dédié</p>
                </div>
            </div>
          </div>

          {/* Right Side: Form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            className="lg:col-span-7 bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-14 shadow-2xl shadow-slate-100"
          >
            <AnimatePresence mode="wait">
              {showSuccess ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-20 flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Demande Reçue</h3>
                  <p className="text-slate-700 font-light mb-8">Un conseiller vous contactera sous 24h pour confirmer votre créneau.</p>
                  <Button onClick={() => setShowSuccess(false)} variant="outline" className="rounded-full px-10">Faire une autre demande</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="space-y-8">
                    <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                      <User size={18} className="text-[#e71810]" />
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Identification</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-[10px] uppercase tracking-widest text-slate-700 ml-1">Nom Complet</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Ex: Jean Dupont"
                          className="h-14 rounded-2xl border-slate-300 bg-slate-50/50 focus:bg-white focus:ring-slate-900 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-[10px] uppercase tracking-widest text-slate-700 ml-1">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="votre@email.com"
                          className="h-14 rounded-2xl border-slate-300 bg-slate-50/50 focus:bg-white focus:ring-slate-900 transition-all"
                          required
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-slate-700 ml-1">Téléphone Mobile</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+216 -- --- ---"
                          className="h-14 rounded-2xl border-slate-300 bg-slate-50/50 focus:bg-white focus:ring-slate-900 transition-all"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-8 pt-4">
                    <div className="flex items-center gap-3 pb-2 border-b border-slate-50">
                      <Car size={18} className="text-[#e71810]" />
                      <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-900">Véhicule de Sélection</h4>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="carModel" className="text-[10px] uppercase tracking-widest text-slate-700 ml-1">Modèle souhaité</Label>
                      <Select value={formData.carModel} onValueChange={handleCarModelChange}>
                        <SelectTrigger className="h-14 rounded-2xl border-slate-300 bg-slate-50/50 focus:bg-white transition-all">
                          <SelectValue placeholder="Choisir un véhicule d'exception" />
                        </SelectTrigger>
                        <SelectContent className="rounded-2xl border-slate-300">
                          {carOptions.map((car, idx) => (
                            <SelectItem key={idx} value={`${car.brand} ${car.model}`} className="rounded-xl my-1">
                              <span className="font-bold">{car.brand}</span> {car.model}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col items-center gap-4">
                    <Button
                      type="submit"
                      disabled={isSubmitting || !formData.carModel}
                      className="w-full h-16 bg-slate-900 hover:bg-black text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all hover:shadow-xl group"
                    >
                      <span>Confirmer la réservation</span>
                      <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <p className="text-[10px] text-slate-700 text-center">
                        En confirmant, vous acceptez d'être contacté pour l'organisation de cet essai.
                    </p>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}