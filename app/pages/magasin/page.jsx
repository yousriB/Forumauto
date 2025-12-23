import { Building2, Users, MapPin, Clock, ArrowRight } from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";
import Contact from "@/components/contact";

const showroomFeatures = [
  {
    icon: Building2,
    title: "Volume & Espace",
    label: "2500m² d'exposition",
    description: "Une galerie monumentale dédiée aux dernières innovations automobiles, baignée de lumière naturelle.",
  },
  {
    icon: Users,
    title: "Composants d'Origine",
    label: "Certification Constructeur",
    description: "Un département dédié aux pièces de rechange authentiques, garantissant l'intégrité de votre véhicule.",
  },
  {
    icon: MapPin,
    title: "Localisation",
    label: "Centre-Ville",
    description: "Un emplacement stratégique avec 75 places de parking privatives pour une visite en toute sérénité.",
  },
  {
    icon: Clock,
    title: "Disponibilité",
    label: "Service 6j/7",
    description: "Des plages horaires étendues conçues pour s'adapter à l'agenda de notre clientèle exigeante.",
  },
];

export default function MagasinPage() {
  return (
    <ServiceLayout
      title="Notre Magasin"
      description="L'immersion totale dans l'excellence automobile. Un espace conçu pour sublimer la performance et le design."
      icon={Building2}
    >
      {/* SECTION 01: THE PHILOSOPHY (Asymmetrical Intro) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#E71609] font-bold mb-4 block">
                L'Espace Studio
              </span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-black uppercase leading-[0.9] mb-8">
                Plus qu'un magasin, <br />
                <span className="italic font-light text-gray-400">une expérience.</span>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 pt-4">
              <p className="text-xl text-gray-600 font-light leading-relaxed mb-6">
                Notre showroom redéfinit les standards de l'exposition automobile. Chaque mètre carré est pensé pour offrir une perspective unique sur l'ingénierie moderne.
              </p>
              <div className="h-[1px] w-24 bg-[#E71609]" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: FEATURES GRID (Studio Exhibition Style) */}
      <section className="py-24 bg-[#fafafa] border-y border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-black/5 border border-black/5">
            {showroomFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-12 md:p-20 flex flex-col justify-between group hover:bg-black transition-all duration-700"
              >
                <div>
                  <div className="flex items-center justify-between mb-12">
                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-[#E71609]">
                      PRTF_0{index + 1}
                    </span>
                    <feature.icon size={24} className="text-black group-hover:text-white stroke-[1px]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-[#E71609] font-bold mb-2 block">
                    {feature.label}
                  </span>
                  <h3 className="text-2xl font-bold text-black uppercase tracking-tighter mb-6 group-hover:text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 font-light leading-relaxed group-hover:text-gray-400">
                    {feature.description}
                  </p>
                </div>
                
                <div className="mt-12 flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-black group-hover:text-white opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                  En savoir plus <ArrowRight size={14} className="text-[#E71609]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03: GALLERY / VISUAL (Atmospheric) */}
      <section className="h-32 relative overflow-hidden bg-black">
    
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
             <h2 className="text-white text-5xl md:text-8xl font-bold uppercase tracking-[0.2em] opacity-20">
               FORUM AUTO GABES
             </h2>
          </div>
        </div>
      </section>

  
    </ServiceLayout>
  );
}