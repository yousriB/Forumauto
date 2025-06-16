import { Shield, CheckCircle, Phone, Mail } from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";

const assuranceFeatures = [
  "Couverture tous risques complète",
  "Assistance dépannage 24h/24 et 7j/7",
  "Véhicule de remplacement inclus",
  "Protection juridique automobile",
  "Garantie valeur à neuf",
  "Couverture des accessoires et équipements",
];

const assuranceTypes = [
  {
    name: "Assurance Tiers",
    subtitle: "Protection Essentielle",
    description:
      "La couverture minimale obligatoire pour circuler en toute légalité",
    price: "25€",
    period: "/mois",
    popular: false,
    features: [
      "Responsabilité civile obligatoire",
      "Protection juridique de base",
      "Assistance dépannage 0 km",
      "Défense pénale et recours",
      "Couverture conducteur novice",
    ],
    notIncluded: ["Vol et incendie", "Bris de glace", "Tous risques collision"],
    color: "#E71609",
    icon: "🛡️",
  },
  {
    name: "Assurance Intermédiaire",
    subtitle: "Protection Équilibrée",
    description:
      "Le parfait équilibre entre protection et budget pour votre tranquillité",
    price: "45€",
    period: "/mois",
    popular: true,
    features: [
      "Toutes garanties Tiers incluses",
      "Vol et tentative de vol",
      "Incendie et explosion",
      "Bris de glace sans franchise",
      "Catastrophes naturelles",
      "Assistance 24h/24 - 7j/7",
      "Véhicule de remplacement 7 jours",
      "Protection des effets personnels",
    ],
    notIncluded: ["Tous risques collision", "Garantie valeur à neuf"],
    color: "#E71609",
    icon: "⭐",
  },
  {
    name: "Assurance Tous Risques",
    subtitle: "Protection Maximale",
    description:
      "La protection la plus complète pour votre véhicule et votre sérénité",
    price: "65€",
    period: "/mois",
    popular: false,
    features: [
      "Toutes garanties Intermédiaires",
      "Tous risques collision",
      "Garantie valeur à neuf (2 ans)",
      "Garantie contenu et accessoires",
      "Prêt de véhicule jusqu'à 30 jours",
      "Assistance voyage Europe",
      "Protection juridique étendue",
      "Franchise réduite",
      "Garantie panne mécanique",
      "Service de conciergerie",
    ],
    notIncluded: [],
    color: "#E71609",
    icon: "👑",
  },
];

export default function AssurancePage() {
  return (
    <ServiceLayout
      title="Assurance Automobile"
      description="Protégez votre véhicule avec nos solutions d'assurance complètes et adaptées à vos besoins."
      icon={Shield}
    >
      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block rounded-full bg-[#E71609] px-4 py-2 text-sm font-medium text-white mb-4">
              Nos Garanties
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl mb-4 text-[#E71609]">
              Protection Complète
            </h2>
            <p className="text-lg text-gray-600">
              Des garanties adaptées à tous les besoins et budgets
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {assuranceFeatures.map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="h-5 w-5 text-[#E71609]" />
                </div>
                <span className="text-gray-700 text-base">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-br from-gray-100 to-[#E71609]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block rounded-full bg-[#E71609] px-4 py-2 text-sm font-medium text-white mb-4">
              Nos Formules
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl mb-4 text-[#E71609]">
              Formules d'Assurance
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Choisissez la formule qui correspond le mieux à vos besoins et à
              votre budget
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {assuranceTypes.map((type, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                  type.popular ? "border-2 border-[#E71609]" : ""
                }`}
                style={{
                  background: `linear-gradient(135deg, ${type.color}/10 0%, white 100%)`,
                }}
              >
                {type.popular && (
                  <span className="absolute top-0 left-0 bg-[#E71609] text-white text-xs font-bold px-3 py-1 rounded-br-lg">
                    Populaire
                  </span>
                )}
                <div className="p-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-[#E71609] mb-2">
                      {type.name}
                    </h3>
                    <p className="text-lg font-medium text-gray-600 mb-2">
                      {type.subtitle}
                    </p>
                    <p className="text-gray-500 text-sm">{type.description}</p>
                  </div>
                  <div className="text-center mb-6">
                    <div className="inline-block bg-[#E71609] text-white rounded-lg px-5 py-3">
                      <span className="text-3xl font-bold">{type.price}</span>
                      <span className="text-base ml-1">{type.period}</span>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="w-2 h-2 bg-[#E71609] rounded-full mr-2"></span>
                      Garanties incluses
                    </h4>
                    <ul className="space-y-3">
                      {type.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <CheckCircle className="h-5 w-5 text-[#E71609] mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {type.notIncluded.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                        <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                        Non inclus
                      </h4>
                      <ul className="space-y-2">
                        {type.notIncluded.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center text-sm text-gray-500"
                          >
                            <span className="w-5 h-5 mr-3"></span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="space-y-3">
                    <button className="w-full bg-[#E71609] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#D11408] transition-colors">
                      Demander un devis gratuit
                    </button>
                    <button className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:border-[#E71609] hover:text-[#E71609] transition-colors">
                      En savoir plus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="rounded-xl p-8 text-white text-center"
            style={{
              backgroundImage: "url('/images/bgbanner.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <h2 className="text-3xl font-extrabold mb-4">
              Besoin d'un devis personnalisé ?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Contactez nos experts pour une étude gratuite de vos besoins
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+33123456789"
                className="inline-flex items-center bg-white text-[#E71609] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="mr-2 h-5 w-5" />
                216 29 378 089
              </a>
              <a
                href="mailto:assurance@showroom.com"
                className="inline-flex items-center border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#E71609] transition-colors"
              >
                <Mail className="mr-2 h-5 w-5" />
                contact@forumautogabes.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </ServiceLayout>
  );
}
