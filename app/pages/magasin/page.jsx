import {
  Building2,
  Users,
  MapPin,
  Clock,
  Phone,
  Mail,
  Camera,
} from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";
import Contact from "@/components/contact";

const showroomFeatures = [
  {
    icon: Building2,
    title: "Showroom Spacieux",
    description:
      "Un espace de 2500m² dédié aux dernières nouveautés automobiles avec une ambiance lumineuse et moderne.",
  },
  {
    icon: Users,
    title: "Experts Certifiés",
    description:
      "Une équipe de conseillers expérimentés pour un accompagnement personnalisé et professionnel.",
  },
  {
    icon: MapPin,
    title: "Accès Facile",
    description:
      "Situé en centre-ville avec un parking gratuit de 75 places et proximité des transports publics.",
  },
  {
    icon: Clock,
    title: "Horaires Flexibles",
    description:
      "Ouvert 7j/7 avec des créneaux adaptés à vos besoins, y compris le dimanche matin.",
  },
];

export default function MagasinPage() {
  return (
    <ServiceLayout
      title="Notre Magasin"
      description="Plongez dans l'univers de l'automobile avec notre showroom d'exception, offrant une expérience unique et des services premium."
      icon={Building2}
    >
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-full bg-[#E71609] px-4 py-2 text-sm font-medium text-white mb-4">
              Nos Services
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl mb-4 text-[#E71609]">
              Pourquoi Nous Choisir ?
            </h2>
            <p className="text-lg text-gray-600">
              Des services et des avantages pensés pour une expérience client
              exceptionnelle.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {showroomFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="bg-red-100 p-3 rounded-full">
                    <feature.icon className="h-6 w-6 text-[#E71609]" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 ml-4">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className=" bg-white">
        <Contact />
      </section>
    </ServiceLayout>
  );
}
