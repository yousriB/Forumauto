"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Heart, Clock, Calendar, Fuel, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PremiumCarCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const carouselRef = useRef(null)

  // Using internet images for premium cars
  const cars = [
    {
      id: 1,
      name: "PORSCHE MACAN ELECTRIC",
      image: "https://images.unsplash.com/photo-1682687219800-bba120d709c5?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 295 000 DT",
      year: "2024",
      fuel: "Electric",
      power: "408 ch",
      isNew: true,
      isHot: true
    },
    {
      id: 2,
      name: "SUZUKI SWIFT",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 55 900 DT",
      year: "2023",
      fuel: "Essence",
      power: "82 ch",
      isNew: true,
      isHot: false
    },
    {
      id: 3,
      name: "CHERY TIGGO 4 PRO",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 88 490 DT",
      year: "2024",
      fuel: "Essence",
      power: "145 ch",
      isNew: true,
      isHot: false
    },
    {
      id: 4,
      name: "MINI ACEMAN",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 139 900 DT",
      year: "2023",
      fuel: "Electric",
      power: "184 ch",
      isNew: true,
      isHot: true
    },
    {
      id: 5,
      name: "ISUZU D-MAX",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 120 000 DT",
      year: "2023",
      fuel: "Diesel",
      power: "163 ch",
      isNew: false,
      isHot: false
    },
    {
      id: 6,
      name: "TOYOTA HILUX",
      image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=1000&auto=format&fit=crop",
      price: "à partir de 140 000 DT",
      year: "2023",
      fuel: "Diesel",
      power: "204 ch",
      isNew: false,
      isHot: false
    },
  ]

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === cars.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? cars.length - 1 : prevIndex - 1))
  }

  // Get visible cars for the 3D carousel effect
  const getVisibleCars = () => {
    const result = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + cars.length) % cars.length;
      result.push({ ...cars[index], position: i });
    }
    return result;
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold mb-3">Nouveautés</span>
          <h2 className="text-4xl font-bold text-gray-900">PRIX DU NEUF</h2>
          <div className="mt-2 text-gray-600">DERNIERS MODÈLES</div>
          <div className="w-24 h-1 bg-red-600 mx-auto mt-4 relative rounded-full">
            <div className="absolute w-3 h-3 bg-red-600 rounded-full -top-1 left-1/2 transform -translate-x-1/2"></div>
          </div>
        </div>

        <div className="relative max-w-5xl mx-auto h-96 mb-12">
          {/* Main 3D carousel */}
          <div className="h-full relative">
            {getVisibleCars().map((car) => (
              <div 
                key={car.id}
                className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out flex ${
                  car.position === 0 
                    ? 'opacity-100 z-20 translate-x-0 scale-100' 
                    : car.position === -1 
                      ? 'opacity-40 z-10 -translate-x-[60%] scale-90' 
                      : 'opacity-40 z-10 translate-x-[60%] scale-90'
                }`}
              >
                <div className="flex-1 bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row">
                  {/* Car image side */}
                  <div className="md:w-3/5 relative bg-gray-100 p-4">
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex space-x-2 z-10">
                      {car.isNew && (
                        <span className="bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                          Nouveau
                        </span>
                      )}
                      {car.isHot && (
                        <span className="bg-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center">
                          <Clock className="w-3 h-3 mr-1" /> Populaire
                        </span>
                      )}
                    </div>
                    
                    {/* Favorite button */}
                    <button className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors">
                      <Heart className="w-5 h-5 text-gray-400 hover:text-red-500" />
                    </button>
                    
                    {/* Car image */}
                    <div className="h-56 rounded-lg overflow-hidden">
                      <Image 
                        src={car.image} 
                        alt={car.name}
                        className="w-full h-full object-cover"
                        width={600}
                        height={400}
                        unoptimized={true}
                      />
                    </div>
                    
                    {/* Price tag */}
                    <div className="absolute bottom-6 left-6 bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-lg">
                      {car.price}
                    </div>
                  </div>
                  
                  {/* Car details side */}
                  <div className="md:w-2/5 p-8 flex flex-col">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{car.name}</h3>
                    
                    {/* Specifications */}
                    <div className="grid grid-cols-1 gap-y-4 mb-8">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Année</span>
                          <span className="font-medium text-gray-800">{car.year}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Fuel className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Carburant</span>
                          <span className="font-medium text-gray-800">{car.fuel}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <Info className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="flex flex-col">
                          <span className="text-sm text-gray-500">Puissance</span>
                          <span className="font-medium text-gray-800">{car.power}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* CTA button */}
                    <Button 
                      className="mt-auto bg-gray-900 hover:bg-black text-white shadow-md group"
                    >
                      Voir les détails
                      <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Navigation arrows */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -left-6 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl rounded-full h-12 w-12 z-30"
            onClick={prevSlide}
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-6 top-1/2 transform -translate-y-1/2 bg-white shadow-lg hover:shadow-xl rounded-full h-12 w-12 z-30"
            onClick={nextSlide}
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </Button>
        </div>
        
        {/* Pagination indicators */}
        <div className="flex justify-center gap-2">
          {cars.map((_, index) => (
            <button 
              key={index}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index ? 'w-10 bg-red-600' : 'w-2 bg-gray-300'
              }`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
