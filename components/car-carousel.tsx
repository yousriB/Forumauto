"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/i18n"
import ScrollLink from "@/components/scroll-link"

export default function CarCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [transX, setTransX] = useState(0)
  const carouselRef = useRef(null)
  const { language, dir } = useLanguage()

  const cars = [
    {
      id: 1,
      name: "Toyota Corolla",
      image: "/images/toyota.jpg",
      price: "65,000 TND",
      year: "2022",
    },
    {
      id: 2,
      name: "Ford Focus",
      image: "/images/cherry.png",
      price: "70,000 TND",
      year: "2021",
    },
    {
      id: 3,
      name: "Chevrolet Cruze",
      image: "/images/chevrolet.png",
      price: "62,000 TND",
      year: "2022",
    },
    {
      id: 4,
      name: "Suzuki Swift",
      image: "/images/suzuki.png",
      price: "45,000 TND",
      year: "2023",
    },
    {
      id: 5,
      name: "Isuzu D-Max",
      image: "/images/isuzu.png",
      price: "85,000 TND",
      year: "2022",
    },
    {
      id: 6,
      name: "Dongfeng S50",
      image: "/images/dongfeng.png",
      price: "55,000 TND",
      year: "2023",
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cars.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cars.length - 1 : prevIndex - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        nextSlide()
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isDragging])

  const handleDragStart = (e) => {
    setIsDragging(true)
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0)
  }

  const handleDragMove = (e) => {
    if (!isDragging) return
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const diff = clientX - startX
    setTransX(diff)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    if (transX > 100) {
      prevSlide()
    } else if (transX < -100) {
      nextSlide()
    }
    setTransX(0)
  }

  return (
    <section id="cars" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-800 mb-4 dark:bg-red-900 dark:text-red-200">
            {t("gallery.title", language)}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-red-600 dark:text-red-500">
            {t("gallery.heading", language)}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t("gallery.description", language)}</p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div
            ref={carouselRef}
            className="overflow-hidden"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                transform: `translateX(${-currentIndex * 100 + (transX / carouselRef.current?.offsetWidth || 1) * 100}%)`,
              }}
            >
              {cars.map((car) => (
                <div key={car.id} className="min-w-full px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                    style={{ direction: dir }}
                  >
                    <div className="p-6 flex flex-col md:flex-row gap-8 items-center">
                      <div className="relative w-full md:w-1/2 aspect-[4/3]">
                        <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-contain" />
                      </div>
                      <div className="w-full md:w-1/2 space-y-4 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{car.name}</h3>
                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                          <div className="px-3 py-1 bg-red-100 dark:bg-red-900/30 rounded-full text-red-800 dark:text-red-300 text-sm">
                            {car.year}
                          </div>
                          <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-gray-800 dark:text-gray-300 text-sm">
                            {car.price}
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, diam quis aliquam
                          tincidunt, nisl nisi aliquam nunc.
                        </p>
                        <Button asChild className="bg-red-600 hover:bg-red-700 text-white">
                          <ScrollLink href="#comparison">{t("services.more", language)}</ScrollLink>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full h-10 w-10 shadow-md z-10"
            onClick={prevSlide}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 rounded-full h-10 w-10 shadow-md z-10"
            onClick={nextSlide}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex justify-center mt-6 gap-2">
            {cars.map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-red-600" : "w-2 bg-gray-300 dark:bg-gray-600"
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
