import { Shield, CheckCircle, Phone, Mail, ArrowRight } from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";
import { cn } from "@/lib/utils";

const assuranceFeatures = [
  "Accompagnement personnalisé",
  "Prise en charge ultra-rapide",
  "Réparations certifiées constructeur",
  "Partenariats assurances premium",
];

// Luxury-focused data structure
const assuranceTypes = [
  {
    name: "Essentiel",
    subtitle: "Protection Tiers",
    description: "La rigueur réglementaire alliée à l'expertise Studio.",
    features: ["Responsabilité civile", "Protection juridique", "Assistance 0km"],
  },
  {
    name: "Sérénité",
    subtitle: "Protection Intermédiaire",
    description: "L'équilibre parfait pour votre tranquillité d'esprit.",
    features: ["Vol & Incendie", "Bris de glace premium", "Véhicule de courtoisie"],
    popular: true,
  },
  {
    name: "Excellence",
    subtitle: "Tous Risques",
    description: "Une protection sans compromis pour votre patrimoine automobile.",
    features: ["Tous risques collision", "Valeur à neuf 24 mois", "Conciergerie dédiée"],
  },
];

export default function AssurancePage() {
  return (
    <ServiceLayout
      title="Assurance Automobile"
      description="L'élégance de la protection. Des solutions sur mesure pour votre sérénité."
      icon={Shield}
    >
      {/* SECTION 01: HERITAGE & EXPERTISE */}
      <section className="py-24 bg-white border-b border-black/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#E71609] font-bold mb-4 block">
                Expertise & Conventions
              </span>
              <h2 className="text-4xl md:text-6xl font-bold tracking-tighter text-black uppercase mb-8 leading-none">
                Au-delà de <br />
                <span className="italic font-light text-gray-400">la protection</span>
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed font-light text-lg">
                <p>
                  Notre studio collabore avec les plus prestigieuses compagnies d'assurance pour garantir un service 
                  fluide et des standards de réparation d'exception.
                </p>
                <p>
                  De la déclaration du sinistre à la restitution de votre véhicule, nous orchestrons chaque détail 
                  pour que l'imprévu ne soit qu'une parenthèse rapidement refermée.
                </p>
              </div>

              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {assuranceFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3 group">
                    <div className="h-[1px] w-4 bg-[#E71609] group-hover:w-8 transition-all" />
                    <span className="text-[11px] uppercase tracking-widest font-medium text-black">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden bg-white">
              <img
                src="/images/assurance.jpg"
                alt="Luxury Auto Insurance"
                className="object-contain w-full h-full   transition-all duration-1000"
              />
              <div className="absolute inset-0 border-[20px] border-white/10 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02: LES OFFRES (Minimalist Grid) */}
      <section className="py-24 bg-[#fafafa]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 text-center">
            <h3 className="text-xs uppercase tracking-[0.5em] text-black font-bold mb-2">Nos Formules</h3>
            <div className="h-1 w-12 bg-[#E71609] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-black/5">
            {assuranceTypes.map((type, index) => (
              <div
                key={index}
                className={cn(
                  "p-12 bg-white flex flex-col justify-between transition-all duration-500",
                  index !== 2 && "border-r border-black/5",
                  type.popular ? "relative z-10 shadow-[0_0_50px_rgba(0,0,0,0.05)]" : ""
                )}
              >
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 block mb-1">
                    {type.subtitle}
                  </span>
                  <h4 className="text-2xl font-bold uppercase tracking-tighter mb-4">{type.name}</h4>
                  <p className="text-sm text-gray-500 font-light mb-8 leading-relaxed">
                    {type.description}
                  </p>
                  <ul className="space-y-4 mb-12">
                    {type.features.map((f, i) => (
                      <li key={i} className="flex items-center text-[10px] uppercase tracking-widest font-bold">
                        <CheckCircle className="h-3 w-3 mr-3 text-[#E71609]" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button className="w-full py-4 border border-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-black hover:text-white transition-all">
                  Découvrir
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 03: CONTACT (High Impact) */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative bg-black p-12 md:p-24 overflow-hidden group">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
               <img 
                src="/images/bgbanner.jpg" 
                className="w-full h-full object-cover opacity-40 scale-105 group-hover:scale-100 transition-transform duration-1000" 
                alt="" 
              />
               <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter mb-6 leading-none">
                Besoin d'un devis <br /> 
                <span className="text-[#E71609]">sur mesure ?</span>
              </h2>
              <p className="text-gray-400 font-light text-lg mb-10 leading-relaxed">
                Nos experts sont à votre disposition pour définir la couverture 
                parfaitement adaptée à votre profil de conducteur.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6">
                <a
                  href="tel:+21629421277"
                  className="flex items-center justify-between bg-[#E71609] text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all min-w-[240px]"
                >
                  <span>Appeler maintenant</span>
                  <Phone size={14} />
                </a>
                <a
                  href="mailto:contact@forumautogabes.com"
                  className="flex items-center justify-between border border-white/20 text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-black transition-all min-w-[240px]"
                >
                  <span>Nous écrire</span>
                  <Mail size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}