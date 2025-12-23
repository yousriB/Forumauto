"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  CalendarIcon,
  Clock,
  Car,
  User,
  ArrowRight,
  ArrowLeft,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Checkbox } from "@/components/ui/checkbox";
import SuccessMessage from "@/components/SuccessMessage";

export default function Appointment() {
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    carBrand: "",
    carModel: "",
    carYear: "",
    carChassis: "",
    serviceType: [] as string[],
    message: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const brands = [
    { name: "ISUZU", value: "isuzu" },
    { name: "CHEVROLET", value: "chevrolet" },
    { name: "CHERY", value: "chery" },
    { name: "GREAT WALL", value: "gwm" },
    { name: "HAVAL", value: "haval" },
    { name: "GAC", value: "gac" },
    { name: "TOYOTA", value: "toyota" },
    { name: "SUZUKI", value: "suzuki" },
    { name: "MG", value: "mg" },
    { name: "FORD", value: "ford" },
    { name: "DFSK", value: "dfsk" },
    { name: "DONGFENG", value: "dongfeng" },
    { name: "BYD", value: "byd" },
    { name: "RENAULT", value: "renault" },
    { name: "DACIA", value: "dacia" },
    { name: "NISSAN", value: "nissan" },
    { name: "AUTRE MARQUE", value: "autre marque" },
  ];

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceTypeChange = (value: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      serviceType: checked
        ? [...prev.serviceType, value]
        : prev.serviceType.filter((t) => t !== value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const appointmentData = {
      ...formData,
      date: date ? format(date, "yyyy-MM-dd") : null,
      time,
    };

    try {
      const response = await fetch("/api/appointment-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointmentData),
      });
      if (response.ok) {
        setShowSuccess(true);
        setStep(1);
        // Reset Logic...
      }
    } catch (error) {
      console.error(error);
    }
  };

  const serviceOptions = [
    { value: "maintenance", label: "Entretien régulier", id: "maintenance" },
    {
      value: "electrical-repair",
      label: "Réparation électrique",
      id: "electrical-repair",
    },
    { value: "ac-charge", label: "Charge climatiseur", id: "ac-charge" },
    {
      value: "mechanical-repair",
      label: "Réparation mécanique",
      id: "mechanical-repair",
    },
    { value: "diagnostic", label: "Diagnostic", id: "diagnostic" },
    { value: "body-repair", label: "Réparation tôlerie", id: "body-repair" },
  ];

  return (
    <section id="appointment" className="py-24 bg-[#fafafa] overflow-hidden">
      <div className="container max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.4em] text-[#E71609] font-bold mb-4 block">
              Service Atelier
            </span>
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black uppercase">
              Réserver votre <span className="italic font-light">passage</span>
            </h2>
          </div>
          <div className="text-right">
            <span className="text-5xl font-light tracking-tighter text-black/10">
              0{step} <span className="text-xl text-black/20">/ 03</span>
            </span>
          </div>
        </div>

        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <SuccessMessage message="Rendez-vous enregistré. Un conseiller vous rappellera sous 24h." />
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT SIDE: Visual/Info */}
          <div className="lg:col-span-4 space-y-8 hidden lg:block">
            <div className="aspect-[3/4]
             relative group overflow-hidden">
              <div className="absolute inset-0 bg-black/80" />
              <img
                src="https://images.unsplash.com/photo-1633526543814-9718c8922b7a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Workshop"
                className="object-cover w-full h-full opacity-60 grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                <p className="text-xs uppercase tracking-widest opacity-70 mb-2">
                  Expertise
                </p>
                <h3 className="text-xl font-bold uppercase tracking-tighter">
                  Forum Auto Excellence
                </h3>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: The Form */}
          <motion.div
            ref={ref}
            className="lg:col-span-8 bg-white border border-black/5 p-8 md:p-12"
          >
            <form
              onSubmit={handleSubmit}
              className="min-h-[450px] flex flex-col justify-between"
            >
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-[1px] bg-[#E71609]" />
                      <h4 className="text-xs uppercase tracking-[0.2em] font-bold">
                        Informations Personnelles
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      <div className="space-y-1 group">
                        <Label className="text-[10px] uppercase tracking-widest text-black/40 group-focus-within:text-[#E71609] transition-colors">
                          Nom Complet
                        </Label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="border-0 border-b border-black/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#E71609] transition-all bg-transparent italic"
                          placeholder="Ex: Jean Dupont"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase tracking-widest text-black/40">
                          Téléphone
                        </Label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          className="border-0 border-b border-black/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#E71609] transition-all bg-transparent italic"
                          placeholder="+216 -- --- ---"
                        />
                      </div>
                      <div className="space-y-1 md:col-span-2">
                        <Label className="text-[10px] uppercase tracking-widest text-black/40">
                          Email Professionnel
                        </Label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="border-0 border-b border-black/10 rounded-none px-0 focus-visible:ring-0 focus-visible:border-[#E71609] transition-all bg-transparent italic"
                          placeholder="email@example.com"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-[1px] bg-[#E71609]" />
                      <h4 className="text-xs uppercase tracking-[0.2em] font-bold">
                        Détails du Véhicule
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-black/40">
                          Marque
                        </Label>
                        <Select
                          onValueChange={(v) =>
                            setFormData((p) => ({ ...p, carBrand: v }))
                          }
                        >
                          <SelectTrigger className="border-0 border-b border-black/10 rounded-none px-0 ring-0 focus:ring-0 shadow-none italic uppercase text-xs">
                            <SelectValue placeholder="Sélectionner la marque" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none border-black">
                            {brands.map((b) => (
                              <SelectItem
                                key={b.value}
                                value={b.value}
                                className="text-xs uppercase tracking-tighter"
                              >
                                {b.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[10px] uppercase tracking-widest text-black/40">
                          Modèle
                        </Label>
                        <Input
                          name="carModel"
                          value={formData.carModel}
                          onChange={handleChange}
                          className="border-0 border-b border-black/10 rounded-none px-0 shadow-none focus-visible:ring-0 focus-visible:border-black italic"
                        />
                      </div>
                    </div>

                    <div className="space-y-4 pt-4">
                      <Label className="text-[10px] uppercase tracking-widest text-[#E71609] font-bold block mb-4">
                        Interventions Souhaitées
                      </Label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {serviceOptions.map((opt) => (
                          <div
                            key={opt.id}
                            className={cn(
                              "flex items-center space-x-3 p-3 border transition-all cursor-pointer",
                              formData.serviceType.includes(opt.value)
                                ? "border-[#E71609] bg-[#E71609]/5"
                                : "border-black/5 hover:border-black/20"
                            )}
                          >
                            <Checkbox
                              id={opt.id}
                              className="border-black/20 data-[state=checked]:bg-[#E71609] data-[state=checked]:border-[#E71609] rounded-none"
                              checked={formData.serviceType.includes(opt.value)}
                              onCheckedChange={(c) =>
                                handleServiceTypeChange(opt.value, c as boolean)
                              }
                            />
                            <Label
                              htmlFor={opt.id}
                              className="text-[11px] uppercase tracking-tight cursor-pointer font-medium"
                            >
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-10 h-[1px] bg-[#E71609]" />
                      <h4 className="text-xs uppercase tracking-[0.2em] font-bold">
                        Calendrier & Confirmation
                      </h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-black/40 block mb-2">
                          Date du rendez-vous
                        </Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-between rounded-none border-black/10 hover:bg-black hover:text-white transition-all py-6"
                            >
                              <span className="text-xs uppercase tracking-widest font-light">
                                {date
                                  ? format(date, "PPP", { locale: fr })
                                  : "Choisir une date"}
                              </span>
                              <CalendarIcon className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0 rounded-none border-black">
                            <Calendar
                              mode="single"
                              selected={date || undefined}
                              onSelect={(d) => d && setDate(d)}
                              locale={fr}
                              disabled={(d) =>
                                d < new Date() || d.getDay() === 0
                              }
                              className="rounded-none"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-[10px] uppercase tracking-widest text-black/40 block mb-2">
                          Heure
                        </Label>
                        <Select onValueChange={setTime}>
                          <SelectTrigger className="rounded-none border-black/10 py-6 ring-0 focus:ring-0 shadow-none italic uppercase text-xs">
                            <SelectValue placeholder="Choisir un créneau" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none border-black">
                            {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"].map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="p-6 bg-[#fafafa] border border-black/5 mt-8">
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-[10px] uppercase tracking-widest font-bold text-[#E71609] mb-2">
                            Récapitulatif
                          </h5>
                          <p className="text-sm font-medium uppercase tracking-tighter">
                            {formData.name || "---"}
                          </p>
                          <p className="text-xs text-black/60 italic">
                            {formData.carBrand} {formData.carModel}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold uppercase">
                            {date ? format(date, "dd MMM yyyy") : "-- -- --"}
                          </p>
                          <p className="text-xs text-black/40">
                            {time || "--:--"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ACTION BAR */}
              <div className="pt-12 flex justify-between items-center border-t border-black/5 mt-12">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep(step - 1)}
                    className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-[#E71609] transition-colors"
                  >
                    <ArrowLeft size={14} /> Précédent
                  </button>
                ) : (
                  <div />
                )}

                {step === 1 ? (
                  <Button
                    type="button"
                    onClick={() => {
                      if (formData.name && formData.phone && formData.email) {
                        setStep(2);
                      } else {
                        alert("Veuillez remplir tous les champs obligatoires");
                      }
                    }}
                    className="rounded-none bg-black hover:bg-[#E71609] text-white px-10 py-6 uppercase text-[10px] tracking-[0.3em] transition-all"
                  >
                    Continuer <ArrowRight size={14} className="ml-2" />
                  </Button>
                ) : step === 2 ? (
                  <Button
                    type="button"
                    onClick={() => {
                      if (
                        formData.carBrand &&
                        formData.carModel &&
                        formData.serviceType.length > 0
                      ) {
                        setStep(3);
                      } else {
                        alert(
                          "Veuillez sélectionner la marque, le modèle et au moins un type de service"
                        );
                      }
                    }}
                    className="rounded-none bg-black hover:bg-[#E71609] text-white px-10 py-6 uppercase text-[10px] tracking-[0.3em] transition-all"
                  >
                    Continuer <ArrowRight size={14} className="ml-2" />
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={!date || !time}
                    className={cn(
                      "rounded-none px-10 py-6 uppercase text-[10px] tracking-[0.3em] transition-all",
                      date && time
                        ? "bg-[#E71609] hover:bg-black text-white"
                        : "bg-black/30 cursor-not-allowed text-white"
                    )}
                  >
                    Confirmer <Check size={14} className="ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
