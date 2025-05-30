"use client"

import { useState } from "react"
import Image from "next/image"
import { Check, X, ChevronDown, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FeatureComparison() {
  const [isOpen, setIsOpen] = useState(false)
  
  const cars = [
    {
      id: 1,
      name: "Porsche Macan Electric",
      image: "https://images.unsplash.com/photo-1682687219800-bba120d709c5?q=80&w=1000&auto=format&fit=crop",
      price: "295 000 DT",
      engine: "Electric",
      power: "408 ch",
      acceleration: "4.3s",
      topSpeed: "220 km/h",
      range: "516 km",
      airbags: 8,
      navigation: true,
      camera: true,
      assistedDriving: true,
      climateControl: true,
      electricSeats: true
    },
    {
      id: 2,
      name: "BMW iX3",
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1000&auto=format&fit=crop",
      price: "240 000 DT",
      engine: "Electric",
      power: "286 ch",
      acceleration: "6.8s",
      topSpeed: "180 km/h",
      range: "460 km",
      airbags: 6,
      navigation: true,
      camera: true,
      assistedDriving: true,
      climateControl: true,
      electricSeats: true
    },
    {
      id: 3,
      name: "Chery Tiggo 4 Pro",
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1000&auto=format&fit=crop",
      price: "88 490 DT",
      engine: "1.5L Turbo",
      power: "145 ch",
      acceleration: "9.8s",
      topSpeed: "185 km/h",
      range: "780 km",
      airbags: 4,
      navigation: true,
      camera: true,
      assistedDriving: false,
      climateControl: true,
      electricSeats: false
    }
  ]
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold mb-3">
            Comparatif
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Comparez les modèles</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Trouvez le véhicule qui correspond parfaitement à vos besoins en comparant les caractéristiques et les prix
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Car model headers */}
          <div className="grid grid-cols-4 border-b">
            <div className="p-6 font-medium text-gray-500">
              <span className="block text-lg text-gray-900 mb-1">Caractéristiques</span>
              <span className="text-sm">Comparez jusqu'à 3 véhicules</span>
            </div>
            
            {cars.map((car) => (
              <div key={car.id} className="p-6 border-l flex flex-col items-center text-center">
                <div className="relative w-40 h-24 mb-4">
                  <Image 
                    src={car.image}
                    alt={car.name}
                    className="object-cover rounded-lg"
                    width={160}
                    height={96}
                    unoptimized={true}
                  />
                </div>
                <h3 className="font-bold text-gray-900">{car.name}</h3>
                <span className="text-red-600 font-semibold mt-1">{car.price}</span>
              </div>
            ))}
          </div>
          
          {/* Basic specs */}
          <div className="grid grid-cols-4 border-b bg-gray-50">
            <div className="p-6 font-medium text-gray-900">
              Motorisation
            </div>
            
            {cars.map((car) => (
              <div key={car.id} className="p-6 border-l bg-white text-center">
                <span className="font-medium text-gray-800">{car.engine}</span>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-4 border-b">
            <div className="p-6 font-medium text-gray-900">
              Puissance
            </div>
            
            {cars.map((car) => (
              <div key={car.id} className="p-6 border-l text-center">
                <span className="font-medium text-gray-800">{car.power}</span>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-4 border-b bg-gray-50">
            <div className="p-6 font-medium text-gray-900">
              0-100 km/h
            </div>
            
            {cars.map((car) => (
              <div key={car.id} className="p-6 border-l bg-white text-center">
                <span className="font-medium text-gray-800">{car.acceleration}</span>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-4 border-b">
            <div className="p-6 font-medium text-gray-900">
              Vitesse max
            </div>
            
            {cars.map((car) => (
              <div key={car.id} className="p-6 border-l text-center">
                <span className="font-medium text-gray-800">{car.topSpeed}</span>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-4 border-b bg-gray-50">
            <div className="p-6 font-medium text-gray-900">
              Autonomie
            </div>
            
            {cars.map((car) => (
              <div key={car.id} className="p-6 border-l bg-white text-center">
                <span className="font-medium text-gray-800">{car.range}</span>
              </div>
            ))}
          </div>
          
          {/* Advanced features (collapsible) */}
          <div className={`border-b ${isOpen ? "" : "border-none"}`}>
            <button 
              className="w-full flex items-center justify-between p-6 font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <span>Équipements et sécurité</span>
              <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            
            {isOpen && (
              <>
                <div className="grid grid-cols-4 border-t">
                  <div className="p-6 font-medium text-gray-900 flex items-center">
                    <span>Airbags</span>
                    <Info className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                  
                  {cars.map((car) => (
                    <div key={car.id} className="p-6 border-l text-center">
                      <span className="font-medium text-gray-800">{car.airbags}</span>
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-4 border-t bg-gray-50">
                  <div className="p-6 font-medium text-gray-900 flex items-center">
                    <span>Système de navigation</span>
                    <Info className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                  
                  {cars.map((car) => (
                    <div key={car.id} className="p-6 border-l bg-white text-center">
                      {car.navigation ? (
                        <Check className="mx-auto w-5 h-5 text-green-500" />
                      ) : (
                        <X className="mx-auto w-5 h-5 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-4 border-t">
                  <div className="p-6 font-medium text-gray-900 flex items-center">
                    <span>Caméra de recul</span>
                    <Info className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                  
                  {cars.map((car) => (
                    <div key={car.id} className="p-6 border-l text-center">
                      {car.camera ? (
                        <Check className="mx-auto w-5 h-5 text-green-500" />
                      ) : (
                        <X className="mx-auto w-5 h-5 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-4 border-t bg-gray-50">
                  <div className="p-6 font-medium text-gray-900 flex items-center">
                    <span>Conduite assistée</span>
                    <Info className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                  
                  {cars.map((car) => (
                    <div key={car.id} className="p-6 border-l bg-white text-center">
                      {car.assistedDriving ? (
                        <Check className="mx-auto w-5 h-5 text-green-500" />
                      ) : (
                        <X className="mx-auto w-5 h-5 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-4 border-t">
                  <div className="p-6 font-medium text-gray-900 flex items-center">
                    <span>Climatisation automatique</span>
                    <Info className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                  
                  {cars.map((car) => (
                    <div key={car.id} className="p-6 border-l text-center">
                      {car.climateControl ? (
                        <Check className="mx-auto w-5 h-5 text-green-500" />
                      ) : (
                        <X className="mx-auto w-5 h-5 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-4 border-t bg-gray-50">
                  <div className="p-6 font-medium text-gray-900 flex items-center">
                    <span>Sièges électriques</span>
                    <Info className="w-4 h-4 text-gray-400 ml-2" />
                  </div>
                  
                  {cars.map((car) => (
                    <div key={car.id} className="p-6 border-l bg-white text-center">
                      {car.electricSeats ? (
                        <Check className="mx-auto w-5 h-5 text-green-500" />
                      ) : (
                        <X className="mx-auto w-5 h-5 text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="grid grid-cols-4">
            <div className="p-6">
              <span className="block text-sm text-gray-500">
                Besoin de plus d'informations?
              </span>
            </div>
            
            {cars.map((car) => (
              <div key={car.id} className="p-6 border-l flex justify-center">
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  Voir les détails
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Add more cars button */}
        <div className="mt-8 text-center">
          <Button variant="outline" className="border-gray-300">
            Comparer d'autres véhicules
          </Button>
        </div>
      </div>
    </section>
  )
}
