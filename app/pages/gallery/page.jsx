"use client"

import React from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import clsx from "clsx"

const galleryItems = [
  {
    title: "Luxury Car",
    description: "Découvrez notre collection de voitures haut de gamme.",
    image: "/images/cars/luxury-car.jpg",
  },
  {
    title: "Atelier Moderne",
    description: "Un espace de travail professionnel équipé des dernières technologies.",
    image: "/images/locations/garage.jpg",
  },
  {
    title: "Événement Spécial",
    description: "Un moment inoubliable partagé avec nos clients fidèles.",
    image: "/images/events/event1.jpg",
  },
  {
    title: "Voiture Sport",
    description: "Performance et élégance réunies dans nos modèles sportifs.",
    image: "/images/cars/sport-car.jpg",
  },
  {
    title: "Garage de Nuit",
    description: "Vue nocturne impressionnante de notre site.",
    image: "/images/locations/night-garage.jpg",
  },
  {
    title: "Journée Portes Ouvertes",
    description: "Merci à tous d’avoir participé à notre événement spécial.",
    image: "/images/events/open-day.jpg",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    rotate: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const shapeVariants = [
  "rounded-xl ",
  "rounded-b-3xl ",
  "rounded-tl-[40px]",
  "rounded-br-[40px]",
  "rounded-3xl",
  "rounded-t-xl ",
]

const imageHeights = ["h-48", "h-52", "h-56", "h-60"]

const GalleryPage = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section className="py-20 md:py-28 bg-white dark:bg-gray-900">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-[#E71609] px-3 py-1 text-sm text-white mb-4">
            Galerie
          </div>
          <h2 className="text-4xl font-bold mb-4 text-[#E71609]">Nos Moments en Images</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Explorez nos réalisations, notre espace, et les événements qui font notre fierté.
          </p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {galleryItems.map((item, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card
                className={clsx(
                  "h-full border-none shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden",
                  shapeVariants[index % shapeVariants.length]
                )}
              >
                <CardHeader className="p-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={600}
                    height={400}
                    className={clsx(
                      "w-full object-cover transition-all duration-300 hover:scale-110",
                      imageHeights[index % imageHeights.length]
                    )}
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-[#E71609] mb-2">{item.title}</CardTitle>
                  <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                    {item.description}
                  </CardDescription>
                </CardContent>
                <CardFooter />
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default GalleryPage
