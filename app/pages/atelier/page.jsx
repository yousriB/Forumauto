import { Wrench, Award, Clock, Shield, Star, ArrowUpRight } from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";
import Appointment from "@/components/appointment";
import { cn } from "@/lib/utils";

const services = [
  "Entretien périodique et révisions",
  "Réparation mécanique et électronique",
  "Diagnostic informatique avancé",
  "Pneumatiques et géométrie 3D",
  "Climatisation et recharge écologique",
  "Freinage et suspension optimisée",
  "Carrosserie et peinture haut de gamme",
  "Contrôle technique avec certification",
  "Remplacement de vitres et pare-brise",
  "Reconditionnement moteur",
];

const certifications = [
  {
    icon: Award,
    title: "Techniciens Certifiés",
    description: "Formation continue par les constructeurs leaders",
  },
  {
    icon: Shield,
    title: "Garantie Qualité",
    description: "Garantie 12 mois sur toutes nos interventions",
  },
  {
    icon: Clock,
    title: "Service Rapide",
    description: "Délais optimisés avec prise en charge immédiate",
  },
  {
    icon: Star,
    title: "Satisfaction Client",
    description: "Évaluations 5 étoiles par nos clients réguliers",
  },
];

export default function AtelierPage() {
  return (
    <ServiceLayout
      title="Atelier Réparation"
      description="L'excellence technique au service de votre performance. Un diagnostic de précision pour un véhicule d'exception."
      icon={Wrench}
    >
      {/* SECTION 01: SERVICES GRID (Minimalist & Sharp) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#E71609] font-bold mb-4 block">
                Expertise Technique
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black uppercase leading-none">
                Services <br />
                <span className="italic font-light text-gray-400">sur mesure</span>
              </h2>
            </div>
            <p className="text-gray-500 font-light max-w-sm leading-relaxed">
              De la maintenance préventive aux interventions complexes, chaque geste est guidé par la précision et le respect des normes constructeurs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-t border-l border-black/5">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 border-r border-b border-black/5 bg-white hover:bg-black transition-colors duration-500 min-h-[200px] flex flex-col justify-between"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono text-gray-300 group-hover:text-[#E71609] transition-colors">
                    0{index + 1}
                  </span>
                  <Wrench size={14} className="text-gray-200 group-hover:text-white/20 transition-colors" />
                </div>
                <h3 className="text-[11px] uppercase tracking-widest font-bold text-black group-hover:text-white leading-tight">
                  {service}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 02: EXPERTISE (Architectural Layout) */}
      <section className="relative py-24 bg-black overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E71609]/10 skew-x-12 translate-x-20" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-4">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#E71609] font-bold mb-4 block">
                Engagement
              </span>
              <h2 className="text-4xl font-bold text-white uppercase tracking-tighter mb-8">
                Pourquoi choisir <br /> notre <span className="italic font-light text-gray-500">studio ?</span>
              </h2>
              <p className="text-gray-400 font-light leading-relaxed mb-8">
                Nous ne nous contentons pas de réparer ; nous préservons l'intégrité et la valeur de votre patrimoine automobile.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/10 border border-white/10">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-black p-10 group hover:bg-white transition-all duration-700">
                  <div className="mb-6 flex justify-between items-center">
                    <cert.icon className="h-8 w-8 text-[#E71609] stroke-[1px]" />
                    <ArrowUpRight className="text-white/20 group-hover:text-black transition-colors" size={20} />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-black uppercase tracking-tighter mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-gray-500 font-light leading-relaxed">
                    {cert.description}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>


      {/* SECTION 04: BRAND STRIP */}
      <div className="py-12 border-t border-black/5 bg-white overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
            {[1,2,3,4,5].map((i) => (
                <span key={i} className="text-[40px] font-bold text-black/5 uppercase tracking-[0.5em] mx-8">
                    Precision • Excellence • Performance • Studio
                </span>
            ))}
        </div>
      </div>
    </ServiceLayout>
  );
}