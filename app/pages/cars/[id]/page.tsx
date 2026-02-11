"use client";

import React, { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User, Loader2, ArrowLeft, Send, X, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Technicalinfo from "@/components/technicalinfo";
import SuccessMessage from "@/components/SuccessMessage";
import CarBadge from "@/components/ui/car-badge";

interface Car {
  id: number;
  brand: string;
  version: string;
  model: string;
  price: number;
  image: string;
  technicalSpecs: any;
  new?: boolean;
  promotion?: boolean;
}

const CarDetailsPage = () => {
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const router = useRouter();
  const params = useParams();
  const carIdParam = params.id;

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cinOrNf: "",
    paymentMode: "",
    bankName: "",
    leasingName: "",
    isFirstSale: null as boolean | null,
  });

  useEffect(() => {
    const loadCarData = async () => {
      setLoading(true);
      try {
        const dataModule = await import("../../../../data/cars.json");
        const carsData = dataModule.default || dataModule;
        const carId = parseInt(carIdParam as string, 10);
        const foundCar = carsData.find((c: Car) => c.id === carId);

        if (foundCar) setCar(foundCar);
        else setError("Véhicule introuvable");
      } catch (err) {
        setError("Erreur de chargement");
      } finally {
        setLoading(false);
      }
    };
    if (carIdParam) loadCarData();
  }, [carIdParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/devis-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ car, formData }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setShowForm(false);
        setFormData({ email: "", firstName: "", lastName: "", phoneNumber: "", cinOrNf: "", paymentMode: "", bankName: "", leasingName: "", isFirstSale: null as boolean | null });
      }
    } catch (error) {
      alert("Une erreur est survenue.");
    }
  };

  const isFormValid = () => {
    const { bankName, leasingName, paymentMode, isFirstSale, ...rest } = formData;
    const baseFieldsValid = Object.values(rest).every((val) => val.trim() !== "") && paymentMode !== "" && isFirstSale !== null;
    if (paymentMode === "bank") {
      return baseFieldsValid && bankName.trim() !== "";
    }
    if (paymentMode === "leasing") {
      return baseFieldsValid && leasingName.trim() !== "";
    }
    return baseFieldsValid;
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <Loader2 className="h-8 w-8 animate-spin text-[#E71609] mb-4" />
      <p className="text-[10px] uppercase tracking-[0.3em] text-slate-700 font-bold">Initialisation du Studio...</p>
    </div>
  );

  if (error || !car) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h2 className="text-2xl font-light mb-4">{error}</h2>
        <Button onClick={() => router.push("/pages/cars")} variant="outline" className="rounded-full px-8">Retour à l'inventaire</Button>
      </div>
    </div>
  );

  return (
    <section className="bg-white min-h-screen pb-20">

      <div className="container mx-auto px-6">
        {/* Main Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-center mb-24">

          {/* Left: Product Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-[#e71810]"></span>
              <span className="text-[#e71810] font-bold uppercase tracking-[0.3em] text-[10px]">Présentation Exclusive</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-light tracking-tighter text-slate-900 mb-4 leading-[0.9]">
              {car.brand} <br />
              <span className="font-bold">{car.model}</span>
            </h1>

            <p className="text-slate-700 text-lg font-light mb-8 max-w-md">
              Configuration <span className="text-slate-900 font-medium">{car.version}</span>.
              Une alliance parfaite entre ingénierie de pointe et confort absolu.
            </p>

            <div className="mb-10">
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-700 block mb-1">Prix de vente</span>
              <span className="text-4xl font-bold text-[#E71609] tracking-tight">
                {car.price.toLocaleString()} <span className="text-lg font-medium">TND</span>
              </span>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button
                onClick={() => setShowForm(true)}
                className="bg-slate-900 hover:bg-black text-white px-10 py-7 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all hover:shadow-2xl hover:shadow-slate-200"
              >
                Obtenir un devis personnalisé
              </Button>
            </div>
          </motion.div>

          {/* Right: Studio Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative order-1 lg:order-2 aspect-square lg:aspect-auto lg:h-[600px] bg-white rounded-[3rem] overflow-hidden flex items-center justify-center group"
          >
            <div className="absolute top-8 right-8 scale-150">
              <CarBadge isNew={car.new} isPromotion={car.promotion} />
            </div>

            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              width={1000}
              height={1000}
              className="object-contain p-12 transition-transform duration-1000 group-hover:scale-110"
              priority
              unoptimized
            />
          </motion.div>
        </div>

        {/* Success Message Positioning */}
        {showSuccess && (
          <div className="max-w-3xl mx-auto mb-12">
            <SuccessMessage message="Votre demande de devis a été transmise à notre équipe commerciale." />
          </div>
        )}

        {/* Form Modal/Section */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="max-w-4xl mx-auto mb-24 bg-slate-50 rounded-[2.5rem] p-8 md:p-12 border border-slate-300"
            >
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Demande de Devis</h2>
                  <p className="text-slate-500 font-light">Complétez vos informations pour recevoir une proposition détaillée.</p>
                </div>
                <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white rounded-full transition-colors">
                  <X size={20} className="text-slate-700" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-700 ml-1">Prénom</Label>
                  <Input name="firstName" value={formData.firstName} onChange={handleChange} required className="rounded-xl border-slate-300 h-12 focus:ring-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-700 ml-1">Nom</Label>
                  <Input name="lastName" value={formData.lastName} onChange={handleChange} required className="rounded-xl border-slate-300 h-12 focus:ring-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-700 ml-1">Téléphone</Label>
                  <Input name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange} required className="rounded-xl border-slate-300 h-12 focus:ring-slate-900" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-700 ml-1">CIN / N° Fiscal</Label>
                  <Input name="cinOrNf" value={formData.cinOrNf} onChange={handleChange} required className="rounded-xl border-slate-300 h-12 focus:ring-slate-900" />
                </div>
                <div className="space-y-2 ">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-700 ml-1">Email Professionnel</Label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} required className="rounded-xl border-slate-300 h-12 focus:ring-slate-900" />
                </div>
                <div className="space-y-2 ">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-700 ml-1">Mode de paiement</Label>
                  <Select value={formData.paymentMode} onValueChange={(v) => setFormData(p => ({ ...p, paymentMode: v }))} required>
                    <SelectTrigger className="rounded-xl border-slate-300 h-12 focus:ring-slate-900">
                      <SelectValue placeholder="Sélectionner un mode de paiement" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comptant">Comptant</SelectItem>
                      <SelectItem value="leasing">Leasing</SelectItem>
                      <SelectItem value="bank">Bank</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <AnimatePresence mode="wait">
                  {formData.paymentMode === "bank" && (
                    <motion.div
                      key="bank-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 group overflow-hidden md:col-span-2"
                    >
                      <Label htmlFor="bankName" className="text-[10px] uppercase font-bold tracking-widest text-slate-700 ml-1">
                        Nom de la banque
                      </Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        type="text"
                        value={formData.bankName}
                        onChange={handleChange}
                        required
                        className="rounded-xl border-slate-300 h-12 focus:ring-slate-900"
                      />
                    </motion.div>
                  )}
                  {formData.paymentMode === "leasing" && (
                    <motion.div
                      key="leasing-field"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="space-y-2 group overflow-hidden md:col-span-2"
                    >
                      <Label htmlFor="leasingName" className="text-[10px] uppercase font-bold tracking-widest text-slate-700 ml-1">
                        Nom du leasing
                      </Label>
                      <Input
                        id="leasingName"
                        name="leasingName"
                        type="text"
                        value={formData.leasingName}
                        onChange={handleChange}
                        required
                        className="rounded-xl border-slate-300 h-12 focus:ring-slate-900"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="md:col-span-2 space-y-2">
                  <Label className="text-[10px] uppercase font-bold tracking-widest text-slate-700 ml-1 mb-3 block">Type de voiture</Label>
                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isFirstCar"
                        name="isFirstCar"
                        checked={formData.isFirstSale === true}
                        onChange={() => setFormData(p => ({ ...p, isFirstSale: true }))}
                        className="w-4 h-4 text-[#E71609] border-slate-300 rounded focus:ring-slate-900"
                      />
                      <Label htmlFor="isFirstCar" className="text-sm text-slate-700 cursor-pointer font-normal">
                        Première voiture
                      </Label>
                    </div>
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="isSecondCar"
                        name="isSecondCar"
                        checked={formData.isFirstSale === false}
                        onChange={() => setFormData(p => ({ ...p, isFirstSale: false }))}
                        className="w-4 h-4 text-[#E71609] border-slate-300 rounded focus:ring-slate-900"
                      />
                      <Label htmlFor="isSecondCar" className="text-sm text-slate-700 cursor-pointer font-normal">
                        Deuxième voiture
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 pt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-700">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] font-medium">Vos données sont sécurisées et confidentielles</span>
                  </div>
                  <Button type="submit" disabled={!isFormValid()} className="bg-[#E71609] hover:bg-red-700 rounded-xl px-10 h-12 flex gap-2 items-center disabled:opacity-50 disabled:cursor-not-allowed">
                    <Send size={16} />
                    Confirmer la demande
                  </Button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Technical Section Container */}
        <div className="mt-12 pt-12 border-t border-slate-300">
          <div className="flex items-center gap-2 mb-12 justify-center">
            <span className="text-slate-900 font-bold uppercase tracking-[0.4em] text-[10px]">Spécifications Techniques</span>
          </div>
          {car.technicalSpecs && <Technicalinfo car={car} />}
        </div>
      </div>
    </section>
  );
};

export default CarDetailsPage;