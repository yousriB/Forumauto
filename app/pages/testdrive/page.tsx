"use client";

import { useState } from "react";
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
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { User } from "lucide-react";

const carOptions = [
  { brand: "FORD", model: "Ranger" },
  { brand: "FORD", model: "Ranger Wildtrak" },
  { brand: "FORD", model: "Ranger Raptor" },
  { brand: "DFSK", model: "Glory 500" },
  { brand: "DONGFENG", model: "Forthing T5 EVO" },
  { brand: "GAC", model: "Emzoom" },
  { brand: "SUZUKI", model: "Jimny" },
];

export default function TestDrivePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carModel: "",
  });

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Demande de test drive envoyée!\nNom: ${formData.name}\nEmail: ${formData.email}\nTéléphone: ${formData.phone}\nModèle: ${formData.carModel}`
    );
    setFormData({ name: "", email: "", phone: "", carModel: "" });
  };

  return (
    <section id="testdrive" className="py-12 md:py-28 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-[#E71609] px-3 py-1 text-sm text-white mb-4">
            Test Drive
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-[#E71609]">
            Demander un test drive
          </h2>
          <p className="text-lg text-gray-600">
            Remplissez le formulaire pour réserver un essai de véhicule.
          </p>
        </div>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-8 text-start">
              Formulaire de test drive
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <User className="mr-2 h-5 w-5 text-[#E71609]" />
                Vos informations
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom complet</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Votre email"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="phone">Téléphone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Votre numéro de téléphone"
                    required
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="carModel">Modèle de voiture</Label>
                  <Select
                    value={formData.carModel}
                    onValueChange={handleCarModelChange}
                  >
                    <SelectTrigger id="carModel">
                      <SelectValue placeholder="Sélectionner un modèle" />
                    </SelectTrigger>
                    <SelectContent>
                      {carOptions.map((car, idx) => (
                        <SelectItem
                          key={idx}
                          value={`${car.brand} ${car.model}`}
                        >
                          {car.brand} {car.model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700"
                  disabled={
                    !formData.name ||
                    !formData.email ||
                    !formData.phone ||
                    !formData.carModel
                  }
                >
                  Envoyer la demande
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
