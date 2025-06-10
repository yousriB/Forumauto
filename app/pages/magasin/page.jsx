import { Building2, MapPin, Clock, Users } from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";

const showroomFeatures = [
  {
    icon: Building2,
    title: "Showroom Moderne",
    description: "Espace d'exposition de 2000m² avec les derniers modèles",
  },
  {
    icon: Users,
    title: "Équipe Experte",
    description:
      "Conseillers spécialisés pour vous accompagner dans votre choix",
  },
  {
    icon: MapPin,
    title: "Localisation Idéale",
    description: "Facilement accessible avec parking gratuit de 50 places",
  },
  {
    icon: Clock,
    title: "Horaires Étendus",
    description: "Ouvert du lundi au samedi pour votre convenance",
  },
];

export default function MagasinPage() {
  return (
    <ServiceLayout
      title="Notre Magasin"
      description="Découvrez notre showroom moderne où vous pourrez explorer notre gamme complète de véhicules dans un cadre exceptionnel."
      icon={Building2}
    >
      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {showroomFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <feature.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Showroom Image */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Visitez Notre Showroom
            </h2>
            <p className="text-xl text-gray-600">
              Un espace moderne et accueillant pour découvrir nos véhicules
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img
              src="/placeholder.svg?height=400&width=800"
              alt="Showroom moderne"
              className="w-full h-96 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Hours and Location */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Hours */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Horaires d'Ouverture
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Lundi - Vendredi</span>
                  <span className="font-semibold">9h00 - 19h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Samedi</span>
                  <span className="font-semibold">9h00 - 18h00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dimanche</span>
                  <span className="font-semibold text-red-600">Fermé</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Nous Trouver
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-blue-600 mt-1" />
                  <div>
                    <p className="font-semibold">Adresse</p>
                    <p className="text-gray-600">
                      123 Avenue des Automobiles
                      <br />
                      75001 Paris, France
                    </p>
                  </div>
                </div>
                <div className="pt-4">
                  <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                    Voir sur Google Maps
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
