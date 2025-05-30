"use client"

import { useState } from "react"
import Image from "next/image"
import { Heart, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TrendingCars() {
  const [activeTab, setActiveTab] = useState("all")

  const cars = [
    {
      id: 1,
      name: "Porsche Macan Electric",
      image: "https://images.unsplash.com/photo-1682687219800-bba120d709c5?q=80&w=1500&auto=format&fit=crop",
      price: "295 000 DT",
      rating: 4.9,
      category: "electric",
      badge: "Nouveau"
    },
    {
      id: 2,
      name: "Suzuki Swift",
      image: "https://images.unsplash.com/photo-1609521263047-f8f205293f24?q=80&w=1500&auto=format&fit=crop",
      price: "55 900 DT",
      rating: 4.7,
      category: "compact",
      badge: "Populaire"
    },
    {
      id: 3,
      name: "Chery Tiggo 4 Pro",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1500&auto=format&fit=crop",
      price: "88 490 DT",
      rating: 4.5,
      category: "suv",
      badge: "Nouveau"
    },
    {
      id: 4,
      name: "Mini Aceman",
      image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=1500&auto=format&fit=crop",
      price: "139 900 DT",
      rating: 4.8,
      category: "electric",
      badge: "Nouveau"
    },
    {
      id: 5,
      name: "Isuzu D-Max",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=1500&auto=format&fit=crop",
      price: "120 000 DT",
      rating: 4.6,
      category: "pickup",
      badge: null
    },
    {
      id: 6,
      name: "Toyota Hilux",
      image: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?q=80&w=1500&auto=format&fit=crop",
      price: "140 000 DT",
      rating: 4.9,
      category: "pickup",
      badge: null
    },
    {
      id: 7,
      name: "BMW i4",
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1500&auto=format&fit=crop",
      price: "225 000 DT",
      rating: 4.8,
      category: "electric",
      badge: "Avant-garde"
    },
    {
      id: 8,
      name: "Hyundai Tucson",
      image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d22f?q=80&w=1500&auto=format&fit=crop",
      price: "110 000 DT",
      rating: 4.7,
      category: "suv",
      badge: "Offre"
    }
  ]

  // Filter cars by active tab
  const filteredCars = activeTab === "all" 
    ? cars 
    : cars.filter(car => car.category === activeTab)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold mb-3">
              Sélection
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Voitures Tendance</h2>
            <p className="text-gray-600 mt-2">Découvrez les modèles les plus recherchés du moment</p>
          </div>
          
          {/* Category tabs */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mt-6 md:mt-0">
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "all" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("all")}
            >
              Toutes
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "electric" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("electric")}
            >
              Électriques
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "suv" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("suv")}
            >
              SUV
            </button>
            <button 
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === "pickup" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("pickup")}
            >
              Pick-up
            </button>
          </div>
        </div>
        
        {/* Cars grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div key={car.id} className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
              {/* Image container */}
              <div className="relative h-48 overflow-hidden">
                {car.badge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full uppercase tracking-wider shadow-md ${
                      car.badge === "Nouveau" ? "bg-red-600 text-white" :
                      car.badge === "Populaire" ? "bg-amber-500 text-white" :
                      car.badge === "Offre" ? "bg-green-600 text-white" :
                      "bg-blue-600 text-white"
                    }`}>
                      {car.badge}
                    </span>
                  </div>
                )}
                
                <button className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white p-1.5 rounded-full shadow-md transition-colors">
                  <Heart className="w-4 h-4 text-gray-500 hover:text-red-500" />
                </button>
                
                <Image 
                  src={car.image} 
                  alt={car.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  width={400}
                  height={225}
                  unoptimized={true}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Car details */}
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">{car.name}</h3>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-500 mr-1 fill-amber-500" />
                    <span className="text-sm font-medium">{car.rating}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <p className="font-semibold text-red-600">{car.price}</p>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-gray-600 hover:text-red-600 p-0 group-hover:translate-x-1 transition-transform"
                  >
                    <span className="mr-1 text-sm">Détails</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* View all button */}
        <div className="flex justify-center mt-12">
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium">
            Voir toutes les voitures
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
