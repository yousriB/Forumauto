"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/i18n"

export default function Gallery() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filteredBrands, setFilteredBrands] = useState([])

  const { language, dir } = useLanguage()

  const carBrands = [
    { name: "Isuzu", src: "/images/isuzu.png", alt: "Isuzu", category: "asian" },
    { name: "Dongfeng", src: "/images/dongfeng.png", alt: "Dongfeng", category: "asian" },
    { name: "Chevrolet", src: "/images/chevrolet.png", alt: "Chevrolet", category: "american" },
    { name: "Chery", src: "/images/chery.png", alt: "Chery", category: "asian" },
    { name: "GWM", src: "/images/gwm.png", alt: "GWM", category: "asian" },
    { name: "Haval", src: "/images/haval.png", alt: "Haval", category: "asian" },
    { name: "GAC", src: "/images/gac.png", alt: "GAC", category: "asian" },
    { name: "Toyota", src: "/images/toyota.png", alt: "Toyota", category: "asian" },
    { name: "Suzuki", src: "/images/suzuki.png", alt: "Suzuki", category: "asian" },
    { name: "MG Motors", src: "/images/mg-motors.png", alt: "MG Motors", category: "european" },
    { name: "Ford", src: "/images/ford.png", alt: "Ford", category: "american" },
    { name: "DFSK", src: "/images/dfsk.png", alt: "DFSK", category: "asian" },
    { name: "Shell", src: "/images/shell-logo.png", alt: "Shell", category: "other" },
  ]

  useEffect(() => {
    const filtered = carBrands.filter((brand) => {
      const matchesSearch = brand.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = filterCategory === "all" || brand.category === filterCategory
      return matchesSearch && matchesCategory
    })
    setFilteredBrands(filtered)
  }, [searchTerm, filterCategory])

  const openLightbox = (index) => {
    setCurrentImage(index)
    setLightboxOpen(true)
    document.body.style.overflow = "hidden"
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = "auto"
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev === filteredBrands.length - 1 ? 0 : prev + 1))
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? filteredBrands.length - 1 : prev - 1))
  }

  return (
    <section id="gallery" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-800 mb-4 dark:bg-red-900 dark:text-red-200">
            {t("gallery.title", language)}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-red-600 dark:text-red-500">
            {t("gallery.heading", language)}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{t("gallery.description", language)}</p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder={t("gallery.search", language)}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="relative w-full sm:w-48">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="pl-10">
                  <SelectValue placeholder={t("gallery.filter", language)} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t("gallery.all", language)}</SelectItem>
                  <SelectItem value="asian">{t("gallery.asian", language)}</SelectItem>
                  <SelectItem value="american">{t("gallery.american", language)}</SelectItem>
                  <SelectItem value="european">{t("gallery.european", language)}</SelectItem>
                  <SelectItem value="other">{t("gallery.other", language)}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredBrands.map((brand, index) => (
              <motion.div
                key={brand.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-[4/3] overflow-hidden rounded-xl cursor-pointer group bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={brand.src || "/placeholder.svg"}
                  alt={brand.alt}
                  fill
                  className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 dark:group-hover:bg-white/10"></div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-white font-bold text-xl">{brand.name}</h3>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredBrands.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">{t("gallery.no.results", language)}</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/10"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 text-white hover:bg-white/10 h-12 w-12"
              onClick={prevImage}
            >
              <span className="text-3xl">&lsaquo;</span>
            </Button>

            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative h-[80vh] w-[80vw] max-w-5xl"
            >
              <Image
                src={filteredBrands[currentImage].src || "/placeholder.svg"}
                alt={filteredBrands[currentImage].alt}
                fill
                className="object-contain"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <h3 className="text-white font-bold text-2xl">{filteredBrands[currentImage].name}</h3>
              </div>
            </motion.div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 text-white hover:bg-white/10 h-12 w-12"
              onClick={nextImage}
            >
              <span className="text-3xl">&rsaquo;</span>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
