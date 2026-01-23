"use client";

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
import { User, ArrowRight, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React, { FormEvent, useState } from "react";
import SuccessMessage from "@/components/SuccessMessage";

const regions = [
  "Ariana", "Béja", "Ben Arous", "Bizerte", "Gabès", "Gafsa", "Jendouba",
  "Kairouan", "Kasserine", "Kébili", "Le Kef", "Mahdia", "Manouba",
  "Medenine", "Monastir", "Nabeul", "Sfax", "Sidi Bouzid", "Siliana",
  "Sousse", "Tataouine", "Tozeur", "Tunis", "Zaghouan",
];

const DevisForm = () => {
  // Assuming cars data is handled via a prop or fetch in a real scenario, 
  // but keeping your require logic for compatibility.
  const cars = require("../../../data/cars.json");

  const brandModelsMap = cars.reduce((acc: any, car: any) => {
    if (!acc[car.brand]) acc[car.brand] = { models: [], versions: {} };
    if (!acc[car.brand].models.includes(car.model)) acc[car.brand].models.push(car.model);
    if (!acc[car.brand].versions[car.model]) acc[car.brand].versions[car.model] = [];
    if (!acc[car.brand].versions[car.model].includes(car.version)) acc[car.brand].versions[car.model].push(car.version);
    return acc;
  }, {});

  const brands = Object.keys(brandModelsMap);

  const [formData, setFormData] = useState({
    firstName: "", lastName: "", phoneNumber: "", cinOrNf: "",
    email: "", marque: "", model: "", version: "", region: "",
    paymentMode: "",
  });

  const [filteredModels, setFilteredModels] = useState<string[]>([]);
  const [filteredVersions, setFilteredVersions] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const isFormValid = () => Object.values(formData).every(val => val.trim() !== "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/custom-devis-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowSuccess(true);
        setFormData({
          firstName: "", lastName: "", phoneNumber: "", cinOrNf: "",
          email: "", marque: "", model: "", version: "", region: "",
          paymentMode: "",
        });
      }
    } catch (error) {
      console.error("Submit error", error);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* HEADER AREA */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-black/5 pb-12 gap-8">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E71609] font-bold mb-4 block">
              Configuration
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black uppercase leading-none">
              Demande de <br />
              <span className="italic font-light text-gray-400">devis personnalisé</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">
              Ref: STUDIO-QUOT-2025
            </p>
          </div>
        </div>

        <AnimatePresence>
          {showSuccess ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <SuccessMessage message="Votre demande a été enregistrée. Notre équipe vous contactera sous 24h." />
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-16">
              
              {/* SECTION 01: VÉHICULE */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-[#E71609]" />
                  <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-black">
                    01. Sélection du Véhicule
                  </h4>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase tracking-widest text-gray-400">Marque</Label>
                    <Select value={formData.marque} onValueChange={(v) => {
                        setFormData(prev => ({ ...prev, marque: v, model: "", version: "" }));
                        setFilteredModels(brandModelsMap[v]?.models || []);
                        setFilteredVersions([]);
                    }}>
                      <SelectTrigger className="border-0 border-b border-black/10 rounded-none px-0 focus:ring-0 italic text-base">
                        <SelectValue placeholder="Choisir marque" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-black">
                        {brands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase tracking-widest text-gray-400">Modèle</Label>
                    <Select value={formData.model} disabled={!formData.marque} onValueChange={(v) => {
                        setFormData(prev => ({ ...prev, model: v, version: "" }));
                        setFilteredVersions(brandModelsMap[formData.marque]?.versions[v] || []);
                    }}>
                      <SelectTrigger className="border-0 border-b border-black/10 rounded-none px-0 focus:ring-0 italic text-base">
                        <SelectValue placeholder="Choisir modèle" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-black">
                        {filteredModels.map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase tracking-widest text-gray-400">Version</Label>
                    <Select value={formData.version} disabled={!formData.model} onValueChange={(v) => setFormData(p => ({ ...p, version: v }))}>
                      <SelectTrigger className="border-0 border-b border-black/10 rounded-none px-0 focus:ring-0 italic text-base">
                        <SelectValue placeholder="Choisir version" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-black">
                        {filteredVersions.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* SECTION 02: COORDONNÉES */}
              <div className="space-y-8">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 bg-[#E71609]" />
                  <h4 className="text-[11px] uppercase tracking-[0.3em] font-bold text-black">
                    02. Informations Client
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                  {[
                    { id: "firstName", label: "Prénom", name: "firstName", type: "text" },
                    { id: "lastName", label: "Nom", name: "lastName", type: "text" },
                    { id: "phoneNumber", label: "Téléphone", name: "phoneNumber", type: "tel" },
                    { id: "email", label: "Email", name: "email", type: "email" },
                    { id: "cinOrNf", label: "CIN / N° Fiscal", name: "cinOrNf", type: "text" },
                  ].map((field) => (
                    <div key={field.id} className="space-y-2 group">
                      <Label htmlFor={field.id} className="text-[10px] uppercase tracking-widest text-gray-400 group-focus-within:text-[#E71609] transition-colors">
                        {field.label}
                      </Label>
                      <Input
                        id={field.id}
                        name={field.name}
                        type={field.type}
                        value={(formData as any)[field.name]}
                        onChange={handleChange}
                        required
                        className="border-0 border-b border-black/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-black transition-all bg-transparent placeholder:text-gray-200 italic"
                      />
                    </div>
                  ))}

                  <div className="space-y-3">
                    <Label className="text-[10px] uppercase tracking-widest text-gray-400">Région</Label>
                    <Select value={formData.region} onValueChange={(v) => setFormData(p => ({ ...p, region: v }))}>
                      <SelectTrigger className="border-0 border-b border-black/10 rounded-none px-0 focus:ring-0 italic text-base">
                        <SelectValue placeholder="Sélectionner région" />
                      </SelectTrigger>
                      <SelectContent className="rounded-none border-black">
                        {regions.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 ">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-700 ml-1">Mode de paiement</Label>
                  <Select value={formData.paymentMode}  onValueChange={(v) => setFormData(p => ({ ...p, paymentMode: v }))} required>
                      <SelectTrigger className="border-0 border-b border-black/10 rounded-none px-0 focus:ring-0 italic text-base">
                      <SelectValue placeholder="Sélectionner un mode de paiement" />
                    </SelectTrigger>
                    <SelectContent  className="rounded-none border-black">
                      <SelectItem value="comptant">Comptant</SelectItem>
                      <SelectItem value="leasing">Leasing</SelectItem>
                      <SelectItem value="bank">Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="pt-12 flex justify-center md:justify-end">
                <Button
                  type="submit"
                  disabled={!isFormValid()}
                  className="group relative bg-black hover:bg-[#E71609] text-white rounded-none px-12 py-8 text-[11px] uppercase tracking-[0.3em] font-bold transition-all duration-500 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Soumettre la demande <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Button>
              </div>
            </form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default DevisForm;