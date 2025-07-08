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
import { User } from "lucide-react";
import { motion } from "framer-motion";
import React, { FormEvent, useState } from "react";

// 24 governorates of Tunisia
const regions = [
  "Ariana",
  "Béja",
  "Ben Arous",
  "Bizerte",
  "Gabès",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "Kébili",
  "Le Kef",
  "Mahdia",
  "Manouba",
  "Medenine",
  "Monastir",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Siliana",
  "Sousse",
  "Tataouine",
  "Tozeur",
  "Tunis",
  "Zaghouan",
];

const page = () => {
  const cars = require("../../../data/cars.json");

  // Create a map of brands to their unique models and versions
  const brandModelsMap = cars.reduce(
    (
      acc: {
        [key: string]: {
          models: string[];
          versions: { [key: string]: string[] };
        };
      },
      car: { brand: string; model: string; version: string }
    ) => {
      if (!acc[car.brand]) {
        acc[car.brand] = { models: [], versions: {} };
      }
      if (!acc[car.brand].models.includes(car.model)) {
        acc[car.brand].models.push(car.model);
      }
      if (!acc[car.brand].versions[car.model]) {
        acc[car.brand].versions[car.model] = [];
      }
      if (!acc[car.brand].versions[car.model].includes(car.version)) {
        acc[car.brand].versions[car.model].push(car.version);
      }
      return acc;
    },
    {}
  );

  const brands = Object.keys(brandModelsMap);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cinOrNf: "",
    email: "",
    marque: "",
    model: "",
    version: "",
    region: "",
  });

  const [filteredModels, setFilteredModels] = useState<string[]>([]);
  const [filteredVersions, setFilteredVersions] = useState<string[]>([]);

  // Function to check if all required fields are filled
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== "" &&
      formData.lastName.trim() !== "" &&
      formData.phoneNumber.trim() !== "" &&
      formData.cinOrNf.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.marque !== "" &&
      formData.model !== "" &&
      formData.version !== "" &&
      formData.region !== ""
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "marque") {
      // Update models when marque is changed
      setFilteredModels(brandModelsMap[value]?.models || []);
      setFilteredVersions([]);
      setFormData((prev) => ({
        ...prev,
        model: "",
        version: "",
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/custom-devis-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Success: show a message or reset the form
        alert("Votre demande a été envoyée avec succès !");
        setFormData({
          firstName: "",
          lastName: "",
          phoneNumber: "",
          cinOrNf: "",
          email: "",
          marque: "",
          model: "",
          version: "",
          region: "",
        });
        setFilteredModels([]);
        setFilteredVersions([]);
      } else {
        // Error: show error message
        alert(data.error || "Une erreur est survenue lors de l'envoi.");
      }
    } catch (error) {
      alert("Erreur réseau ou serveur.");
    }
  };

  return (
    <section className="bg-white shadow-md">
      <div className="sm:container p-1">
        <div className="text-center mb-10">
          <div className="inline-block rounded-lg bg-[#E71609] px-3 py-1 text-sm text-white mb-4">
            Demande de devis
          </div>
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-3 text-[#E71609]">
            Vos Coordonnées
          </h2>
          <p className="text-base text-gray-600">
            Remplissez vos informations pour continuer.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto bg-white rounded-xl overflow-hidden p-6"
        >
          <form onSubmit={handleSubmit}>
            <div className="space-y-5 p-1 text-start">
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="mr-2 h-5 w-5 text-[#E71609]" />
                Informations Personnelles
              </h4>

              {/* Marque, Model and Version */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="marque">Marque</Label>
                  <Select
                    value={formData.marque}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        marque: value,
                        model: "",
                        version: "",
                      }));
                      setFilteredModels(brandModelsMap[value]?.models || []);
                      setFilteredVersions([]);
                    }}
                  >
                    <SelectTrigger id="marque">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map((brand: string) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model">Modèle</Label>
                  <Select
                    value={formData.model}
                    onValueChange={(value) => {
                      setFormData((prev) => ({
                        ...prev,
                        model: value,
                        version: "",
                      }));
                      setFilteredVersions(
                        brandModelsMap[formData.marque]?.versions[value] || []
                      );
                    }}
                    disabled={!filteredModels.length}
                  >
                    <SelectTrigger id="model">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredModels.map((model) => (
                        <SelectItem key={model} value={model}>
                          {model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Select
                    value={formData.version}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, version: value }));
                    }}
                    disabled={!filteredVersions.length}
                  >
                    <SelectTrigger id="version">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {filteredVersions.map((version) => (
                        <SelectItem key={version} value={version}>
                          {version}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Personal info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName">Prénom</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Votre prénom"
                    required
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="lastName">Nom</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Votre nom de famille"
                    required
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="phoneNumber">Téléphone</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="Votre numéro de téléphone"
                    required
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Votre email"
                    required
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="region">Région de Tunisie</Label>
                  <Select
                    value={formData.region}
                    onValueChange={(value) => {
                      setFormData((prev) => ({ ...prev, region: value }));
                    }}
                  >
                    <SelectTrigger id="region">
                      <SelectValue placeholder="Sélectionner" />
                    </SelectTrigger>
                    <SelectContent>
                      {regions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="cinOrNf">CIN / N°Fiscal</Label>
                  <Input
                    id="cinOrNf"
                    name="cinOrNf"
                    value={formData.cinOrNf}
                    onChange={handleChange}
                    placeholder="Votre CIN ou N°Fiscal"
                    required
                    className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Submit button */}
              <div className="pt-4 flex justify-end space-x-4">
                <Button
                  type="submit"
                  className="bg-[#E71609] hover:bg-[#E71609]/90 px-6 py-2.5"
                  disabled={!isFormValid()}
                >
                  Envoyer la demande
                </Button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default page;
