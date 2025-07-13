import { Wrench, Award, Clock, Shield, Phone, Mail, Star } from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";
import Contact from "@/components/contact";
import Appointment from "@/components/appointment";

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

const testimonials = [
  {
    name: "Jean Dupont",
    feedback: "Service exceptionnel et rapide, mon véhicule est comme neuf !",
    rating: 5,
  },
  {
    name: "Marie Leclerc",
    feedback: "Équipe professionnelle et tarifs compétitifs, je recommande !",
    rating: 5,
  },
];

export default function AtelierPage() {
  return (
    <ServiceLayout
      title="Atelier de Réparation"
      description="Service après-vente de pointe avec des techniciens certifiés pour l'entretien et la réparation de votre véhicule."
      icon={Wrench}
    >
      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-full bg-[#E71609] px-4 py-2 text-sm font-medium text-white mb-4">
              Nos Services
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl mb-4 text-[#E71609]">
              Services d'Atelier
            </h2>
            <p className="text-lg text-gray-600">
              Un éventail complet de services pour maintenir votre véhicule en
              parfait état.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-md transition-shadow"
              >
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wrench className="h-6 w-6 text-[#E71609]" />
                </div>
                <p className="text-gray-700 font-medium">{service}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section
        className="py-16"
        style={{
          backgroundImage: "url('/images/bgbanner.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-full text-[#E71609] px-4 py-2 text-sm font-medium bg-white mb-4">
              Notre Expertise
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl mb-4 text-white">
              Pourquoi Nous Choisir ?
            </h2>
            <p className="text-lg text-gray-100">
              Des standards élevés pour un service irréprochable.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="text-center shadow-sm rounded-xl p-6 bg-white hover:shadow-md transition-shadow"
              >
                <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="h-6 w-6 text-[#E71609]" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {cert.title}
                </h3>
                <p className="text-gray-600">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Booking Section */}
      <Appointment />
    </ServiceLayout>
  );
}
