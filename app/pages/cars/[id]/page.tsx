"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { FormEvent, useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import Technicalinfo from "@/components/technicalinfo";
import SuccessMessage from "@/components/SuccessMessage";
import CarBadge from "@/components/ui/car-badge";

// Define the Car interface to match the JSON structure
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

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cinOrNf: "",
  });

  const router = useRouter();
  const params = useParams();
  const carIdParam = params.id;

  // Fetch car data
  useEffect(() => {
    const loadCarData = async () => {
      setLoading(true);
      try {
        const dataModule = await import("../../../../data/cars.json");
        const carsData = dataModule.default || dataModule;

        if (!Array.isArray(carsData) || carsData.length === 0) {
          throw new Error("Données des voitures non valides ou absentes.");
        }

        const carId = parseInt(carIdParam as string, 10);
        if (isNaN(carId)) {
          throw new Error("ID de voiture invalide.");
        }

        const foundCar = carsData.find((c: Car) => c.id === carId);
        if (foundCar) {
          setCar(foundCar);
        } else {
          setError("Voiture non trouvée.");
        }
      } catch (err) {
        console.error("Erreur lors du chargement des données:", err);
        setError("Impossible de charger les détails de la voiture.");
      } finally {
        setLoading(false);
      }
    };

    if (carIdParam) {
      loadCarData();
    } else {
      setError("ID de voiture manquant.");
      setLoading(false);
    }
  }, [carIdParam]);

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/devis-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ car, formData }),
      });

      if (response.ok) {
        setShowSuccess(true);
        setShowForm(false);
        setFormData({
          email: "",
          firstName: "",
          lastName: "",
          phoneNumber: "",
          cinOrNf: "",
        });
      } else {
        const errorData = await response.json();
        alert(`Erreur lors de l'envoi de la demande : ${errorData.message}`);
      }
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire :", error);
      alert("Une erreur est survenue. Veuillez réessayer plus tard.");
    }
  };

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  // Render loading state
  if (loading) {
    return (
      <section className="py-12 bg-gray-50 min-h-screen flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-[#E71609]" />
          <p className="text-xl text-gray-600">Chargement...</p>
        </div>
      </section>
    );
  }

  // Render error state
  if (error || !car) {
    return (
      <section className="py-12 bg-gray-50 min-h-screen">
        <div className="container px-4 mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            {error || "Voiture non trouvée"}
          </h2>
          <p className="text-gray-600 mb-8">
            Impossible d'afficher les détails pour cette voiture.
          </p>
          <Button
            onClick={() => router.push("/pages/cars")}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Retour aux voitures
          </Button>
        </div>
      </section>
    );
  }

  // Main content
  return (
    <section className="py-7 bg-white min-h-screen">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {/* Car Basic Info */}
          <div className="bg-white p-6 text-center uppercase">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              {car.brand} {car.model}
            </h2>
            <p className="text-3xl text-[#E71609] font-bold mb-4">
              {car.price
                ? `${car.price.toLocaleString()} TND`
                : "Prix non disponible"}
            </p>
          </div>
          {/* Car Image */}
          <div className="relative h-80 lg:h-[500px] w-full flex justify-center items-center">
            <CarBadge isNew={car.new} isPromotion={car.promotion} />
            {car.image && !imageError ? (
              <Image
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                width={900}
                height={900}
                className=" rounded-lg"
                priority
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
                <p className="text-gray-500">Image non disponible</p>
              </div>
            )}
          </div>
        </div>
        {/* Form Section */}
        <div className="bg-white p-6 rounded-lg  my-5 text-center">
          {showSuccess && (
            <SuccessMessage message="Votre demande de devis a été envoyée avec succès !" />
          )}
          {!showForm ? (
            <Button
              className="w-fit bg-[#E71609] hover:bg-[#E71609]/90 text-white py-3 px-6 text-base"
              onClick={() => setShowForm(true)}
            >
              Demander un devis
            </Button>
          ) : (
            <section className="bg-white shadow-md">
              <div className="sm:container p-1">
                <div className="text-center mb-10">
                  <div className="inline-block rounded-lg bg-[#E71609] px-3 py-1 text-sm text-white mb-4">
                    Demander un devis
                  </div>
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl mb-3 text-[#E71609]">
                    Vos Coordonnées
                  </h2>
                  <p className="text-base text-gray-600">
                    Remplissez vos informations pour continuer.
                  </p>
                </div>

                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5 }}
                  className="mx-auto bg-white rounded-xl overflow-hidden"
                >
                  <div className="p-4 md:p-6">
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-5 p-1 text-start">
                        <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                          <User className="mr-2 h-5 w-5 text-[#E71609]" />
                          Informations Personnelles
                        </h4>
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
                            <Label htmlFor="cinOrNf">CIN / N° Fiscal</Label>
                            <Input
                              id="cinOrNf"
                              name="cinOrNf"
                              type="text"
                              value={formData.cinOrNf}
                              onChange={handleChange}
                              placeholder="Votre N° CIN ou Fiscal"
                              required
                              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                            />
                          </div>
                          <div className="space-y-1.5 md:col-span-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="Votre adresse email"
                              required
                              className="border-gray-300 focus:border-red-500 focus:ring-red-500"
                            />
                          </div>
                        </div>
                        <div className="pt-4 flex justify-end space-x-4">
                          <Button
                            type="submit"
                            className="bg-[#E71609] hover:bg-[#E71609]/90 px-6 py-2.5"
                          >
                            Envoyer la demande
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setShowForm(false)}
                          >
                            Annuler
                          </Button>
                        </div>
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>
            </section>
          )}
        </div>

        {/* Technical Specifications */}
        {car.technicalSpecs && <Technicalinfo car={car} />}
      </div>
    </section>
  );
};

export default CarDetailsPage;
