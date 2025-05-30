"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function NewCarCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)
  const [dragStartX, setDragStartX] = useState(0)
  const [dragEndX, setDragEndX] = useState(0)
  const [showSwipeHint, setShowSwipeHint] = useState(true)

  // Using internet images for cars
  const cars = [
    {
      id: 1,
      name: "PORSCHE MACAN ELECTRIC",
      image: "https://images.unsplash.com/photo-1682687219800-bba120d709c5?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 295 000 DT",
      new: true,
    },
    {
      id: 2,
      name: "SUZUKI SWIFT",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 55 900 DT",
      new: true,
    },
    {
      id: 3,
      name: "CHERY TIGGO 4 PRO",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 88 490 DT",
      new: true,
    },
    {
      id: 4,
      name: "MINI ACEMAN",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 139 900 DT",
      new: true,
    },
    {
      id: 5,
      name: "ISUZU D-MAX",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 120 000 DT",
      new: false,
    },
    {
      id: 6,
      name: "TOYOTA HILUX",
      image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 140 000 DT",
      new: false,
    },
  ]

  const [direction, setDirection] = useState(0) // 0 for initial, -1 for left, 1 for right
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setDirection(1) // Right to left animation
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === Math.ceil(cars.length/4) - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    if (isAnimating) return
    setDirection(-1) // Left to right animation
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? Math.ceil(cars.length/4) - 1 : prevIndex - 1))
  }

  const visibleCars = () => {
    const startIdx = currentIndex * 4;
    return cars.slice(startIdx, startIdx + 4);
  }
  
  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [currentIndex])
  
  // Hide swipe hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])
  
  // Reset animation state when animation completes
  useEffect(() => {
    if (isAnimating) {
      const timer = setTimeout(() => {
        setIsAnimating(false)
      }, 500) // Match this to the animation duration
      return () => clearTimeout(timer)
    }
  }, [isAnimating])
  
  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide()
      } else if (e.key === 'ArrowRight') {
        nextSlide()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isAnimating])

  return (
    <section className="py-10 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold uppercase text-slate-800">PRIX DU NEUF</h2>
          <div className="flex justify-center items-center mt-2">
            <span className="text-lg text-slate-700">DERNIERS MODÈLES</span>
          </div>
          <div className="flex justify-center mt-2">
            <div className="w-32 h-0.5 bg-red-600 relative">
              <div className="absolute w-2 h-2 bg-red-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        <div className="relative max-w-6xl mx-auto mt-10">
          {/* Swipe indicator - only shown on mobile/touch devices */}
          {showSwipeHint && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-white/70 dark:bg-slate-800/70 px-4 py-2 rounded-full shadow-lg pointer-events-none flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-300"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Swipe</span>
              <ChevronRight className="h-4 w-4" />
            </motion.div>
          )}
          <div 
            ref={carouselRef}
            className="overflow-hidden"
            onTouchStart={(e) => setDragStartX(e.touches[0].clientX)}
            onTouchMove={(e) => setDragEndX(e.touches[0].clientX)}
            onTouchEnd={() => {
              if (dragStartX - dragEndX > 50) {
                nextSlide() // Swipe left
              } else if (dragStartX - dragEndX < -50) {
                prevSlide() // Swipe right
              }
            }}
          >
            <AnimatePresence mode="wait" initial={false} onExitComplete={() => setIsAnimating(false)}>
              <motion.div 
                key={currentIndex}
                className="flex gap-5 justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                {visibleCars().map((car, index) => (
                <motion.div 
                  key={car.id} 
                  className="w-1/4 px-2"
                  initial={{ 
                    x: index % 2 === 0 ? -100 : 100, // Alternate left and right
                    opacity: 0 
                  }}
                  animate={{ 
                    x: 0, 
                    opacity: 1 
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.1 // Staggered animation
                  }}
                >
                  <motion.div 
                    className="bg-white relative overflow-hidden group shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{ 
                      scale: 1.03,
                      transition: { duration: 0.2 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {car.new && (
                      <div className="absolute top-0 left-0 bg-slate-800 text-white px-3 py-1 z-10 uppercase text-sm">
                        Nouveau
                      </div>
                    )}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100 flex items-center justify-center">
                      <Image 
                        src={car.image} 
                        alt={car.name}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                        width={300}
                        height={225}
                        unoptimized={true}
                      />
                    </div>
                    <div className="pt-4 pb-3 text-center">
                      <h3 className="text-lg font-bold text-slate-800">{car.name}</h3>
                      <p className="text-sm text-slate-600 mt-1">{car.price}</p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute -left-10 top-1/2 transform -translate-y-1/2 bg-slate-200 hover:bg-slate-300 rounded-full h-10 w-10 shadow-md z-10 transition-transform hover:scale-110 active:scale-95 disabled:opacity-50"
            onClick={prevSlide}
            disabled={isAnimating}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute -right-10 top-1/2 transform -translate-y-1/2 bg-slate-200 hover:bg-slate-300 rounded-full h-10 w-10 shadow-md z-10 transition-transform hover:scale-110 active:scale-95 disabled:opacity-50"
            onClick={nextSlide}
            disabled={isAnimating}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
          
          <div className="absolute w-full -bottom-12 flex justify-between px-4">
            <Button
              variant="ghost"
              className="text-slate-700 hover:bg-slate-200 flex items-center gap-2"
              onClick={prevSlide}
              disabled={isAnimating}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Previous</span>
            </Button>
            
            <Button
              variant="ghost"
              className="text-slate-700 hover:bg-slate-200 flex items-center gap-2"
              onClick={nextSlide}
              disabled={isAnimating}
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center mt-6 gap-1">
            {Array.from({ length: Math.ceil(cars.length/4) }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === index ? "w-8 bg-red-600" : "w-2 bg-slate-300"
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
