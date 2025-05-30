"use client"

import { useState } from "react"
import Image from "next/image"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Check, X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/i18n"

export default function CarComparison() {
  const [car1, setCar1] = useState("toyota")
  const [car2, setCar2] = useState("ford")
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { language, dir } = useLanguage()

  const cars = {
    toyota: {
      name: "Toyota Corolla",
      image: "/images/toyota.png",
      price: "65,000 TND",
      engine: "1.6L 4-cylindres",
      power: "132 ch",
      transmission: "CVT",
      consumption: "5.8L/100km",
      warranty: "3 ans",
      features: ["Caméra de recul", "Bluetooth", "Climatisation", "Régulateur de vitesse"],
    },
    ford: {
      name: "Ford Focus",
      image: "/images/ford.png",
      price: "70,000 TND",
      engine: "1.5L EcoBoost",
      power: "150 ch",
      transmission: "Automatique 8 vitesses",
      consumption: "6.2L/100km",
      warranty: "2 ans",
      features: ["Caméra de recul", "Bluetooth", "Climatisation", "Régulateur de vitesse", "Système de navigation"],
    },
    chevrolet: {
      name: "Chevrolet Cruze",
      image: "/images/chevrolet.png",
      price: "62,000 TND",
      engine: "1.4L Turbo",
      power: "140 ch",
      transmission: "Automatique 6 vitesses",
      consumption: "6.5L/100km",
      warranty: "3 ans",
      features: ["Bluetooth", "Climatisation", "Régulateur de vitesse"],
    },
    suzuki: {
      name: "Suzuki Swift",
      image: "/images/suzuki.png",
      price: "45,000 TND",
      engine: "1.2L 4-cylindres",
      power: "90 ch",
      transmission: "Manuelle 5 vitesses",
      consumption: "4.9L/100km",
      warranty: "3 ans",
      features: ["Bluetooth", "Climatisation"],
    },
  }

  const allFeatures = [
    "Caméra de recul",
    "Bluetooth",
    "Climatisation",
    "Régulateur de vitesse",
    "Système de navigation",
    "Sièges chauffants",
    "Jantes en alliage",
    "Toit ouvrant",
  ]

  return (
    <section id="comparison" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-800 mb-4 dark:bg-red-900 dark:text-red-200">
            {t("comparison.title", language)}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-red-600 dark:text-red-500">
            {t("comparison.heading", language)}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t("comparison.description", language)}</p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
          style={{ direction: dir }}
        >
          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <Label htmlFor="car1" className="mb-2 block">
                {t("comparison.vehicle1", language)}
              </Label>
              <Select value={car1} onValueChange={setCar1}>
                <SelectTrigger id="car1">
                  <SelectValue placeholder={t("comparison.select.vehicle", language)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota Corolla</SelectItem>
                  <SelectItem value="ford">Ford Focus</SelectItem>
                  <SelectItem value="chevrolet">Chevrolet Cruze</SelectItem>
                  <SelectItem value="suzuki">Suzuki Swift</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="car2" className="mb-2 block">
                {t("comparison.vehicle2", language)}
              </Label>
              <Select value={car2} onValueChange={setCar2}>
                <SelectTrigger id="car2">
                  <SelectValue placeholder={t("comparison.select.vehicle", language)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="toyota">Toyota Corolla</SelectItem>
                  <SelectItem value="ford">Ford Focus</SelectItem>
                  <SelectItem value="chevrolet">Chevrolet Cruze</SelectItem>
                  <SelectItem value="suzuki">Suzuki Swift</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-2 gap-4 p-6">
              <div className="text-center">
                <div className="h-40 relative mb-4">
                  <Image
                    src={cars[car1].image || "/placeholder.svg"}
                    alt={cars[car1].name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{cars[car1].name}</h3>
              </div>
              <div className="text-center">
                <div className="h-40 relative mb-4">
                  <Image
                    src={cars[car2].image || "/placeholder.svg"}
                    alt={cars[car2].name}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{cars[car2].name}</h3>
              </div>
            </div>

            <div className="border-t dark:border-gray-700">
              <div className="grid grid-cols-3 border-b dark:border-gray-700">
                <div className="p-4 font-medium text-gray-900 dark:text-white">{t("comparison.price", language)}</div>
                <div className="p-4 text-center">{cars[car1].price}</div>
                <div className="p-4 text-center">{cars[car2].price}</div>
              </div>
              <div className="grid grid-cols-3 border-b dark:border-gray-700">
                <div className="p-4 font-medium text-gray-900 dark:text-white">{t("comparison.engine", language)}</div>
                <div className="p-4 text-center">{cars[car1].engine}</div>
                <div className="p-4 text-center">{cars[car2].engine}</div>
              </div>
              <div className="grid grid-cols-3 border-b dark:border-gray-700">
                <div className="p-4 font-medium text-gray-900 dark:text-white">{t("comparison.power", language)}</div>
                <div className="p-4 text-center">{cars[car1].power}</div>
                <div className="p-4 text-center">{cars[car2].power}</div>
              </div>
              <div className="grid grid-cols-3 border-b dark:border-gray-700">
                <div className="p-4 font-medium text-gray-900 dark:text-white">
                  {t("comparison.transmission", language)}
                </div>
                <div className="p-4 text-center">{cars[car1].transmission}</div>
                <div className="p-4 text-center">{cars[car2].transmission}</div>
              </div>
              <div className="grid grid-cols-3 border-b dark:border-gray-700">
                <div className="p-4 font-medium text-gray-900 dark:text-white">
                  {t("comparison.consumption", language)}
                </div>
                <div className="p-4 text-center">{cars[car1].consumption}</div>
                <div className="p-4 text-center">{cars[car2].consumption}</div>
              </div>
              <div className="grid grid-cols-3 border-b dark:border-gray-700">
                <div className="p-4 font-medium text-gray-900 dark:text-white">
                  {t("comparison.warranty", language)}
                </div>
                <div className="p-4 text-center">{cars[car1].warranty}</div>
                <div className="p-4 text-center">{cars[car2].warranty}</div>
              </div>
            </div>

            <div className="p-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-4">{t("comparison.features", language)}</h4>
              <div className="space-y-2">
                {allFeatures.map((feature) => (
                  <div key={feature} className="grid grid-cols-3 py-2 border-b dark:border-gray-700 last:border-0">
                    <div className="text-gray-700 dark:text-gray-300">{feature}</div>
                    <div className="text-center">
                      {cars[car1].features.includes(feature) ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div className="text-center">
                      {cars[car2].features.includes(feature) ? (
                        <Check className="mx-auto h-5 w-5 text-green-500" />
                      ) : (
                        <X className="mx-auto h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
