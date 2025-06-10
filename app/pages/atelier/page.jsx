import { Wrench, Award, Clock, Shield } from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";

const services = [
  "Entretien périodique et révisions",
  "Réparation mécanique et électronique",
  "Diagnostic informatique",
  "Pneumatiques et géométrie",
  "Climatisation et chauffage",
  "Freinage et suspension",
  "Carrosserie et peinture",
  "Contrôle technique",
];

const certifications = [
  {
    icon: Award,
    title: "Techniciens Certifiés",
    description: "Formation continue et certification constructeur",
  },
  {
    icon: Shield,
    title: "Garantie Qualité",
    description: "Garantie sur toutes nos interventions",
  },
  {
    icon: Clock,
    title: "Service Rapide",
    description: "Intervention dans les meilleurs délais",
  },
];

export default function AtelierPage() {
  return (
    <ServiceLayout
      title="Atelier de Réparation"
      description="Service après-vente professionnel avec des techniciens certifiés pour l'entretien et la réparation de votre véhicule."
      icon={Wrench}
    >
      {/* Services Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Nos Services d'Atelier
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center"
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

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            Notre Expertise
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="text-center shadow-md rounded-lg p-6 bg-white"
              >
                <div className="bg-[#E71609] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="h-8 w-8 text-white" />
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
      <section
        className="py-16  text-white"
        style={{
          backgroundImage: "url('/images/bgbanner.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Prenez Rendez-vous</h2>
          <p className="text-xl mb-8 opacity-90">
            Réservez votre créneau en ligne ou contactez-nous directement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#E71609] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Réserver en ligne
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#E71609] transition-colors">
              Appeler l'atelier
            </button>
          </div>
        </div>
      </section>

      {/* Workshop Image */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Atelier Moderne et Équipé
            </h2>
            <p className="text-xl text-gray-600">
              Équipements de pointe pour un service de qualité
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Atelier moderne"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
