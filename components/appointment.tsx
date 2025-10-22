// app/appointment/page.tsx (or similar path for your Appointment component)

"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Clock, Car, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns"; // Make sure format is imported
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
import { motion } from "framer-motion";
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
    serviceType: [] as string[], // Changed to array
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

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleServiceTypeChange = (value: string, checked: boolean) => {
    setFormData((prev) => {
      const newServiceTypes = checked
        ? [...prev.serviceType, value]
        : prev.serviceType.filter((type) => type !== value);
      return { ...prev, serviceType: newServiceTypes };
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Prepare form data - format date as YYYY-MM-DD to avoid timezone issues
    const appointmentData = {
      ...formData,
      // ===> THIS LINE HAS BEEN UPDATED <===
      date: date ? format(date, "yyyy-MM-dd") : null,
      // ===================================
      time,
    };

    try {
      const response = await fetch("/api/appointment-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setShowSuccess(true);
        setFormData({
          name: "",
          phone: "",
          email: "",
          carBrand: "",
          carModel: "",
          carYear: "",
          carChassis: "",
          serviceType: [],
          message: "",
        });
        setDate(null);
        setTime("");
        setStep(1);
      } else {
        alert(`Erreur: ${result.error || result.message}`);
      }
    } catch (error) {
      console.error("Error sending appointment request:", error);
      alert("Erreur lors de l'envoi de la demande de rendez-vous.");
    }
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const timeSlots = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
  ];

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

  // Map service values to labels for display in summary
  const getServiceLabel = (value: string) => {
    const service = serviceOptions.find((opt) => opt.value === value);
    return service ? service.label : value;
  };

  return (
    <section id="appointment" className="py-12 md:py-28 bg-white">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {showSuccess && (
            <SuccessMessage message="Rendez-vous pris avec succès! Nous vous contacterons bientôt pour confirmer." />
          )}
          <div className="inline-block rounded-lg bg-[#E71609] px-3 py-1 text-sm text-white mb-4">
            Rendez-vous
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-[#E71609]">
            Prendre un rendez-vous
          </h2>
          <p className="text-lg text-gray-600">
            Réservez facilement un créneau pour l'entretien de votre véhicule.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-semibold text-gray-900">
                Formulaire de rendez-vous
              </h3>
              <div className="flex items-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    step >= 1 ? "bg-red-600" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`w-12 h-1 ${
                    step >= 2 ? "bg-red-600" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    step >= 2 ? "bg-red-600" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`w-12 h-1 ${
                    step >= 3 ? "bg-red-600" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    step >= 3 ? "bg-red-600" : "bg-gray-300"
                  }`}
                ></div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              {step === 1 && (
                <div className="space-y-6">
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
                  </div>
                  <div className="pt-4 flex justify-end">
                    <Button
                      disabled={
                        formData.name === "" ||
                        formData.phone === "" ||
                        formData.email === ""
                      }
                      type="button"
                      onClick={nextStep}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Car className="mr-2 h-5 w-5 text-[#E71609]" />
                    Informations du véhicule
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="carBrand">Marque</Label>
                      <Select
                        value={formData.carBrand}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, carBrand: value }))
                        }
                      >
                        <SelectTrigger id="carBrand">
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          {brands.map((brand) => (
                            <SelectItem key={brand.value} value={brand.value}>
                              {brand.name}
                            </SelectItem>
                          ))}
                          {/* <SelectItem value="chery">CHERY</SelectItem>
                          <SelectItem value="gwm">GWM</SelectItem>
                          <SelectItem value="byd">BYD</SelectItem>
                          <SelectItem value="haval">HAVAL</SelectItem>
                          <SelectItem value="gac">GAC</SelectItem>
                          <SelectItem value="toyota">TOYOTA</SelectItem>
                          <SelectItem value="suzuki">SUZUKI</SelectItem>
                          <SelectItem value="mg">MG MOTORS</SelectItem>
                          <SelectItem value="ford">FORD</SelectItem>
                          <SelectItem value="dks">DFSK</SelectItem>
                          <SelectItem value="dofeng">DONGFENG</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carModel">Modèle</Label>
                      <Input
                        id="carModel"
                        name="carModel"
                        value={formData.carModel}
                        onChange={handleChange}
                        placeholder="Modèle du véhicule"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carChassis">Numéro de châssis</Label>
                      <Input
                        id="carChassis"
                        name="carChassis"
                        value={formData.carChassis}
                        onChange={handleChange}
                        placeholder="Numéro de chassis"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carYear">Année</Label>
                      <Input
                        id="carYear"
                        name="carYear"
                        value={formData.carYear}
                        onChange={handleChange}
                        placeholder="Première Mise en Circulation"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label>Type de service</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {serviceOptions.map((option) => (
                        <div
                          key={option.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={option.id}
                            checked={formData.serviceType.includes(
                              option.value
                            )}
                            onCheckedChange={(checked) =>
                              handleServiceTypeChange(
                                option.value,
                                checked as boolean
                              )
                            }
                          />
                          <Label htmlFor={option.id} className="cursor-pointer">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Description (optionnel)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Décrivez votre problème ou votre demande"
                      rows={3}
                    />
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Précédent
                    </Button>
                    <Button
                      disabled={
                        formData.carBrand === "" ||
                        formData.carModel === "" ||
                        formData.carYear === "" ||
                        formData.serviceType.length === 0
                      }
                      type="button"
                      onClick={nextStep}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      Suivant
                    </Button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <h4 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-[#E71609]" />
                    Date et heure
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label>Date du rendez-vous</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? (
                              format(date, "PPP", { locale: fr })
                            ) : (
                              <span>Sélectionner une date</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            {...(date ? { selected: date } : {})}
                            onSelect={(newDate) => {
                              if (newDate) {
                                setDate(newDate);
                              }
                            }}
                            initialFocus
                            disabled={(date) => {
                              const day = date.getDay();
                              const isPastDate =
                                date <
                                new Date(new Date().setHours(0, 0, 0, 0));
                              return day === 0 || day === 6 || isPastDate;
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="space-y-2">
                      <Label>Heure du rendez-vous</Label>
                      <Select
                        value={time}
                        onValueChange={setTime}
                        disabled={!date}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une heure" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t">
                    <h4 className="text-lg font-medium text-gray-900 mb-4">
                      Récapitulatif
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Nom:</p>
                        <p className="font-medium text-gray-900">
                          {formData.name}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Téléphone:</p>
                        <p className="font-medium text-gray-900">
                          {formData.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Email:</p>
                        <p className="font-medium text-gray-900">
                          {formData.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Véhicule:</p>
                        <p className="font-medium text-gray-900">
                          {formData.carBrand} {formData.carModel} (
                          {formData.carYear})
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Services:</p>
                        <p className="font-medium text-gray-900">
                          {formData.serviceType.length > 0
                            ? formData.serviceType
                                .map(getServiceLabel)
                                .join(", ")
                            : "Aucun sélectionné"}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date et heure:</p>
                        <p className="font-medium text-gray-900">
                          {date
                            ? `${format(date, "PPP", { locale: fr })} à ${time}`
                            : "Non sélectionné"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Précédent
                    </Button>
                    <Button
                      type="submit"
                      className="bg-red-600 hover:bg-red-700"
                      disabled={
                        !date || !time || formData.serviceType.length === 0
                      }
                    >
                      Confirmer le rendez-vous
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
