import { Shield, CheckCircle, Phone, Mail } from "lucide-react";
import ServiceLayout from "@/components/ServiceLayout";

const assuranceFeatures = [
  "Un accompagnement personnalisé",
  "Une prise en charge rapide",
  "Des réparations de qualité",
  "Des partenariats avec les plus grandes compagnies d'assurance",
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
      {/* Main Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose lg:prose-xl max-w-none">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl mb-8 text-[#E71609]">
              Notre Service d'Assurance
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              Notre société est spécialisée dans les services liés à l'assurance automobile et la réparation de véhicules. Grâce à notre expérience et à notre professionnalisme, nous avons su établir plusieurs conventions avec différentes compagnies d'assurance, afin de garantir à nos clients un service rapide, fiable et conforme aux normes du secteur.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Nous vous accompagnons tout au long du processus, de la déclaration du sinistre jusqu'à la réparation complète de votre véhicule. Que ce soit pour un accident, un bris de glace, ou tout autre dommage, notre équipe est là pour vous assister.
            </p>
            <p className="text-lg text-gray-700 mb-8">
              Nous proposons également un service complet de réparation de véhicules, assuré par des techniciens qualifiés et utilisant des équipements de dernière génération, afin de vous offrir un résultat optimal et sécurisé.
            </p>
            
            <h3 className="text-2xl font-semibold text-[#E71609] mb-4 flex items-center space-x-4">                   <CheckCircle className="h-7 w-7 text-[#E71609]" />
            <span>Nos engagements</span> </h3>
         
            
           
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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

          <div className="mt-10">
            <img src="/images/assurance.jpg" alt="" />
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
