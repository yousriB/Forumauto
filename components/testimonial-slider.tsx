"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const testimonials = [
    {
      id: 1,
      name: "Sophie Bernard",
      role: "Propriétaire d'une Suzuki Swift",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=250&auto=format&fit=crop",
      rating: 5,
      text: "J'ai été impressionnée par la qualité du service et les conseils que j'ai reçus. La Swift que j'ai achetée est parfaite pour mes déplacements quotidiens en ville. L'équipe a été très à l'écoute de mes besoins."
    },
    {
      id: 2,
      name: "Ahmed Khalil",
      role: "Propriétaire d'un Chery Tiggo 4 Pro",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop",
      rating: 4,
      text: "Le processus d'achat a été très fluide, de la première visite à la livraison. Le Tiggo 4 Pro offre un excellent rapport qualité-prix et les fonctionnalités sont nombreuses. Je recommande Forum Auto Gabès sans hésitation."
    },
    {
      id: 3,
      name: "Emna Trabelsi",
      role: "Propriétaire d'une Mini Aceman",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=250&auto=format&fit=crop",
      rating: 5,
      text: "Un service exceptionnel! J'ai craqué pour la Mini Aceman et je ne le regrette pas. L'équipe m'a guidée tout au long du processus et a même arrangé un financement avantageux. Merci pour cette expérience positive."
    },
    {
      id: 4,
      name: "Karim Bouzidi",
      role: "Propriétaire d'un Toyota Hilux",
      image: "https://images.unsplash.com/photo-1531891437562-4301cf35b7e4?q=80&w=250&auto=format&fit=crop",
      rating: 5,
      text: "Je cherchais un pick-up robuste pour mon activité professionnelle, et le Hilux s'est imposé comme une évidence. L'équipe de Forum Auto Gabès a su répondre à toutes mes questions et m'a proposé une solution adaptée à mes besoins."
    }
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 6000)
    return () => clearInterval(interval)
  }, [testimonials.length])
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }
  
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-red-100 text-red-800 text-sm font-semibold mb-3">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Ce que disent nos clients</h2>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Découvrez les expériences de nos clients satisfaits qui ont trouvé leur voiture idéale chez Forum Auto Gabès
          </p>
        </div>
        
        <div className="max-w-5xl mx-auto relative">
          <div className="relative bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-red-600"></div>
            
            <div className="relative z-10 p-8 pt-20">
              {/* Testimonial cards */}
              <div className="flex items-stretch">
                <div className="w-1/3 pr-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mx-auto">
                      <Image 
                        src={testimonials[currentIndex].image} 
                        alt={testimonials[currentIndex].name}
                        className="object-cover w-full h-full"
                        width={96}
                        height={96}
                        unoptimized={true}
                      />
                    </div>
                    
                    <div className="text-center mt-4">
                      <h3 className="font-bold text-gray-900">{testimonials[currentIndex].name}</h3>
                      <p className="text-sm text-gray-600">{testimonials[currentIndex].role}</p>
                      
                      <div className="flex justify-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < testimonials[currentIndex].rating 
                                ? "text-amber-400 fill-amber-400" 
                                : "text-gray-300"
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="w-2/3 flex flex-col justify-center">
                  <div className="relative">
                    <div className="absolute -left-8 top-0 text-red-600 text-8xl opacity-20">"</div>
                    <p className="text-lg text-gray-700 italic relative z-10 mb-6">
                      {testimonials[currentIndex].text}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-1">
                        {testimonials.map((_, index) => (
                          <button 
                            key={index}
                            className={`h-2 rounded-full transition-all ${
                              currentIndex === index ? 'w-8 bg-red-600' : 'w-2 bg-gray-300'
                            }`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                          />
                        ))}
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-full border-gray-300"
                          onClick={prevSlide}
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button 
                          variant="outline"
                          size="icon"
                          className="h-10 w-10 rounded-full border-gray-300"
                          onClick={nextSlide}
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12">
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl font-bold text-red-600 mb-2">500+</div>
              <div className="text-gray-700 font-medium">Clients satisfaits</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl font-bold text-red-600 mb-2">20+</div>
              <div className="text-gray-700 font-medium">Marques disponibles</div>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:-translate-y-1 transition-transform duration-300">
              <div className="text-4xl font-bold text-red-600 mb-2">98%</div>
              <div className="text-gray-700 font-medium">Taux de satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
