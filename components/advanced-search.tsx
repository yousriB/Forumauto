"use client"

import { useState } from "react"
import { Search, ChevronDown, X, Filter, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function AdvancedSearch() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 300000])
  const [yearRange, setYearRange] = useState([2010, 2024])
  const [selectedBrand, setSelectedBrand] = useState("")
  
  const brands = [
    "Toutes les marques", "Toyota", "Suzuki", "Chery", "Mini", "Isuzu", 
    "Porsche", "BMW", "Mercedes", "Audi", "Volkswagen"
  ]
  
  const carTypes = [
    { name: "Citadine", icon: "🚗" },
    { name: "Berline", icon: "🚙" },
    { name: "SUV", icon: "🚜" },
    { name: "Pick-up", icon: "🛻" },
    { name: "Électrique", icon: "⚡" },
    { name: "Hybride", icon: "🔋" },
  ]
  
  const locations = ["Tunis", "Sfax", "Sousse", "Gabès", "Bizerte", "Nabeul", "Kairouan"]
  
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " DT"
  }
  
  return (
    <section className="bg-white py-4 sticky top-0 z-40 shadow-md border-b">
      <div className="container mx-auto">
        {/* Main search bar */}
        <div className="flex items-stretch rounded-xl overflow-hidden shadow-lg">
          {/* Brand selector */}
          <div className="relative bg-white border-r border-gray-200 p-3 flex-1">
            <label className="text-xs font-medium text-gray-500 mb-1 block">Marque</label>
            <div className="relative">
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full appearance-none bg-transparent pr-8 font-medium text-gray-900 focus:outline-none"
              >
                {brands.map((brand) => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-0 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </div>
          
          {/* Price range */}
          <div className="bg-white border-r border-gray-200 p-3 flex-1">
            <label className="text-xs font-medium text-gray-500 mb-1 block">Prix</label>
            <div className="flex items-center">
              <span className="font-medium text-gray-900">{formatPrice(priceRange[0])}</span>
              <span className="mx-2 text-gray-400">-</span>
              <span className="font-medium text-gray-900">{formatPrice(priceRange[1])}</span>
            </div>
          </div>
          
          {/* Location */}
          <div className="bg-white border-r border-gray-200 p-3 hidden md:block flex-1">
            <label className="text-xs font-medium text-gray-500 mb-1 block">Localisation</label>
            <div className="flex items-center">
              <MapPin className="w-4 h-4 text-gray-400 mr-2" />
              <select className="appearance-none bg-transparent pr-8 font-medium text-gray-900 focus:outline-none">
                <option value="">Toute la Tunisie</option>
                {locations.map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
              <ChevronDown className="text-gray-400 w-4 h-4 ml-2" />
            </div>
          </div>
          
          {/* Search button */}
          <Button className="bg-red-600 hover:bg-red-700 text-white rounded-r-none px-8 flex items-center">
            <Search className="w-5 h-5 mr-2" />
            <span>Rechercher</span>
          </Button>
          
          {/* Advanced search toggle */}
          <Button 
            variant="outline" 
            className="bg-white border-l border-gray-200 rounded-l-none px-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="ml-2 hidden md:inline">Filtres</span>
            <ChevronDown 
              className={`ml-1 w-4 h-4 text-gray-600 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
            />
          </Button>
        </div>
        
        {/* Advanced filters */}
        {isExpanded && (
          <div className="mt-4 p-6 bg-gray-50 rounded-xl shadow-inner animate-slideDown">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Type of car */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Type de véhicule</h3>
                <div className="grid grid-cols-3 gap-2">
                  {carTypes.map((type) => (
                    <button 
                      key={type.name} 
                      className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-200 hover:border-red-500 hover:bg-white transition-colors"
                    >
                      <span className="text-2xl mb-1">{type.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{type.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Price range slider */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Fourchette de prix</h3>
                <div className="px-4">
                  <div className="relative h-2 bg-gray-200 rounded-full">
                    <div 
                      className="absolute h-full bg-red-500 rounded-full"
                      style={{ 
                        left: `${(priceRange[0] / 300000) * 100}%`, 
                        width: `${((priceRange[1] - priceRange[0]) / 300000) * 100}%` 
                      }}
                    ></div>
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="5000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="absolute w-full h-2 opacity-0 cursor-pointer"
                    />
                    <input
                      type="range"
                      min="0"
                      max="300000"
                      step="5000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="absolute w-full h-2 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600">{formatPrice(priceRange[0])}</span>
                    <span className="text-sm text-gray-600">{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>
              
              {/* Year range */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Année</h3>
                <div className="px-4">
                  <div className="relative h-2 bg-gray-200 rounded-full">
                    <div 
                      className="absolute h-full bg-red-500 rounded-full"
                      style={{ 
                        left: `${((yearRange[0] - 2010) / (2024 - 2010)) * 100}%`, 
                        width: `${((yearRange[1] - yearRange[0]) / (2024 - 2010)) * 100}%` 
                      }}
                    ></div>
                    <input
                      type="range"
                      min="2010"
                      max="2024"
                      value={yearRange[0]}
                      onChange={(e) => setYearRange([parseInt(e.target.value), yearRange[1]])}
                      className="absolute w-full h-2 opacity-0 cursor-pointer"
                    />
                    <input
                      type="range"
                      min="2010"
                      max="2024"
                      value={yearRange[1]}
                      onChange={(e) => setYearRange([yearRange[0], parseInt(e.target.value)])}
                      className="absolute w-full h-2 opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600">{yearRange[0]}</span>
                    <span className="text-sm text-gray-600">{yearRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* More filters */}
              <div>
                <h3 className="font-medium text-gray-900 mb-3">Plus de filtres</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="new" className="rounded text-[#E71609] focus:ring-red-500" />
                    <label htmlFor="new" className="ml-2 text-sm text-gray-700">Seulement les nouveaux</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="electric" className="rounded text-[#E71609] focus:ring-red-500" />
                    <label htmlFor="electric" className="ml-2 text-sm text-gray-700">Véhicules électriques</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="offers" className="rounded text-[#E71609] focus:ring-red-500" />
                    <label htmlFor="offers" className="ml-2 text-sm text-gray-700">Offres spéciales</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="financing" className="rounded text-[#E71609] focus:ring-red-500" />
                    <label htmlFor="financing" className="ml-2 text-sm text-gray-700">Options de financement</label>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <Button variant="outline" className="border-gray-300 text-gray-700">
                <X className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
              <Button className="bg-red-600 hover:bg-red-700 text-white px-8">
                <Filter className="w-4 h-4 mr-2" />
                Appliquer les filtres
              </Button>
            </div>
          </div>
        )}
        
        {/* Quick filters (visible on mobile) */}
        <div className="flex items-center space-x-2 overflow-x-auto py-3 md:hidden">
          <span className="text-sm font-medium text-gray-500 whitespace-nowrap">Filtres rapides:</span>
          <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 whitespace-nowrap">
            SUV
          </button>
          <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 whitespace-nowrap">
            Électrique
          </button>
          <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 whitespace-nowrap">
            &lt; 100 000 DT
          </button>
          <button className="px-3 py-1 bg-gray-100 rounded-full text-sm font-medium text-gray-800 whitespace-nowrap">
            Nouveautés
          </button>
        </div>
      </div>
    </section>
  )
}
