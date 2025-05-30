// Simple i18n implementation
export type Language = "fr" | "ar" | "en"

export type Translations = {
  [key: string]: {
    fr: string
    ar: string
    en: string
  }
}

export const translations: Translations = {
  // Navbar
  home: {
    fr: "Accueil",
    ar: "الرئيسية",
    en: "Home",
  },
  about: {
    fr: "À propos",
    ar: "من نحن",
    en: "About",
  },
  services: {
    fr: "Services",
    ar: "خدماتنا",
    en: "Services",
  },
  comparison: {
    fr: "Comparaison",
    ar: "مقارنة",
    en: "Comparison",
  },
  gallery: {
    fr: "Galerie",
    ar: " معرض",
    en: "Gallery",
  },
  nosreferences: {
    fr: "Nos Références",
    ar: "مراجعاتنا",
    en: "Nos Références",
  },
  appointment: {
    fr: "Rendez-vous",
    ar: "موعد",
    en: "Appointment",
  },
  testimonials: {
    fr: "Avis",
    ar: "آراء العملاء",
    en: "Testimonials",
  },
  faq: {
    fr: "FAQ",
    ar: "أسئلة شائعة",
    en: "FAQ",
  },
  contact: {
    fr: "Contact",
    ar: "اتصل بنا",
    en: "Contact",
  },
  language: {
    fr: "Langue",
    ar: "اللغة",
    en: "Language",
  },

  // Hero
  "hero.title1": {
    fr: "L'Excellence Automobile à Gabès",
    ar: "تميّز السيارات في قابس",
    en: "Automotive Excellence in Gabes",
  },
  "hero.subtitle1": {
    fr: "Vente, réparation et entretien de haute qualité par des experts passionnés",
    ar: "بيع وإصلاح وصيانة بجودة عالية من قبل خبراء شغوفين ",
    en: "Superior sales, repair, and maintenance by passionate experts ",
  },
  "hero.title2": {
    fr: "Réparations & Diagnostics Experts",
    ar: "إصلاحات وتشخيصات احترافية",
    en: "Expert Repairs & Diagnostics",
  },
  "hero.subtitle2": {
    fr: "Technologies avancées et techniciens qualifiés pour résoudre tous vos problèmes automobiles rapidement.",
    ar: "تقنيات متقدمة وفنيون مهرة لحل جميع مشاكل سيارتك بسرعة.",
    en: "Advanced technology and skilled technicians to solve all your automotive problems quickly.",
  },
  "hero.title3": {
    fr: "Véhicules Sélectionnés avec Soin",
    ar: "سيارات مختارة بعناية",
    en: "Carefully Selected Vehicles",
  },
  "hero.subtitle3": {
    fr: "Découvrez notre collection de voitures d'occasion de qualité, inspectées et garanties pour votre tranquillité d'esprit.",
    ar: "اكتشف مجموعتنا من السيارات المستعملة عالية الجودة، المفحوصة والمضمونة لراحة بالك.",
    en: "Discover our collection of quality used cars, inspected and guaranteed for your peace of mind.",
  },
  "hero.cta.appointment": {
    fr: "Prendre rendez-vous maintenant",
    ar: "حجز موعد الآن",
    en: "Book an appointment now",
  },
  "hero.cta.services": {
    fr: "Découvrir nos services",
    ar: "اكتشف خدماتنا",
    en: "Discover our services",
  },

  // Stats
  "stats.vehicles": {
    fr: "Véhicules vendus",
    ar: "سيارات تم بيعها",
    en: "Vehicles sold",
  },
  "stats.clients": {
    fr: "Clients satisfaits",
    ar: "عملاء راضون",
    en: "Satisfied clients",
  },
  "stats.experience": {
    fr: "Années d'expérience",
    ar: "سنوات الخبرة",
    en: "Years of experience",
  },
  "stats.brands": {
    fr: "Marques disponibles",
    ar: "علامات تجارية متوفرة",
    en: "Available brands",
  },

  // About
  "about.title": {
    fr: "À propos",
    ar: "من نحن",
    en: "About",
  },
  "about.heading": {
    fr: "Qui sommes-nous ?",
    ar: "من نحن؟",
    en: "Who are we?",
  },
  "about.since": {
    fr: "Depuis 2013",
    ar: "منذ 2013",
    en: "Since 2013",
  },
  "about.trust": {
    fr: "Votre garage de confiance à Gabès",
    ar: "مرآبك الموثوق في قابس",
    en: "Your trusted garage in Gabes",
  },
  "about.paragraph1": {
    fr: "Small garage auto fondé à Gabès, spécialisé dans l'entretien automobile, la vente de voitures d'occasion, et le service client de qualité.",
    ar: "مرآب سيارات صغير تأسس في قابس، متخصص في صيانة السيارات، بيع السيارات المستعملة، وخدمة العملاء ذات الجودة.",
    en: "Small auto garage founded in Gabes, specialized in car maintenance, used car sales, and quality customer service.",
  },
  "about.paragraph2": {
    fr: "Notre équipe de mécaniciens qualifiés s'engage à fournir un service exceptionnel et des solutions adaptées à tous vos besoins automobiles.",
    ar: "يلتزم فريقنا من الميكانيكيين المؤهلين بتقديم خدمة استثنائية وحلول مخصصة لجميع احتياجات سيارتك.",
    en: "Our team of qualified mechanics is committed to providing exceptional service and tailored solutions for all your automotive needs.",
  },
  "about.feature1.title": {
    fr: "Service professionnel",
    ar: "خدمة احترافية",
    en: "Professional service",
  },
  "about.feature1.desc": {
    fr: "Mécaniciens certifiés et expérimentés",
    ar: "ميكانيكيون معتمدون وذوو خبرة",
    en: "Certified and experienced mechanics",
  },
  "about.feature2.title": {
    fr: "Équipement moderne",
    ar: "معدات حديثة",
    en: "Modern equipment",
  },
  "about.feature2.desc": {
    fr: "Diagnostic électronique avancé",
    ar: "تشخيص إلكتروني متقدم",
    en: "Advanced electronic diagnostics",
  },
  "about.feature3.title": {
    fr: "Prix transparents",
    ar: "أسعار شفافة",
    en: "Transparent pricing",
  },
  "about.feature3.desc": {
    fr: "Devis détaillés sans surprises",
    ar: "عروض أسعار مفصلة بدون مفاجآت",
    en: "Detailed quotes with no surprises",
  },
  "about.feature4.title": {
    fr: "Garantie de satisfaction",
    ar: "ضمان الرضا",
    en: "Satisfaction guarantee",
  },
  "about.feature4.desc": {
    fr: "Service après-vente réactif",
    ar: "خدمة ما بعد البيع سريعة الاستجابة",
    en: "Responsive after-sales service",
  },
  "about.cta": {
    fr: "Découvrir nos services",
    ar: "اكتشف خدماتنا",
    en: "Discover our services",
  },

  // Services
  "services.title": {
    fr: "Services",
    ar: "خدماتنا",
    en: "Services",
  },
  "services.heading": {
    fr: "Nos Services",
    ar: "خدماتنا",
    en: "Our Services",
  },
  "services.description": {
    fr: "Découvrez notre gamme complète de services automobiles conçus pour répondre à tous vos besoins, avec une qualité professionnelle et des prix compétitifs.",
    ar: "اكتشف مجموعتنا الكاملة من خدمات السيارات المصممة لتلبية جميع احتياجاتك، بجودة احترافية وأسعار تنافسية.",
    en: "Discover our complete range of automotive services designed to meet all your needs, with professional quality and competitive prices.",
  },
  "services.maintenance.title": {
    fr: "Entretien automobile",
    ar: "صيانة السيارات",
    en: "Car maintenance",
  },
  "services.maintenance.desc": {
    fr: "Service complet d'entretien pour tous types de véhicules, incluant vidange, filtres, et révisions périodiques.",
    ar: "خدمة صيانة كاملة لجميع أنواع السيارات، بما في ذلك تغيير الزيت والفلاتر والفحوصات الدورية.",
    en: "Complete maintenance service for all types of vehicles, including oil changes, filters, and periodic inspections.",
  },
  "services.diagnostic.title": {
    fr: "Diagnostic électronique",
    ar: "تشخيص إلكتروني",
    en: "Electronic diagnostics",
  },
  "services.diagnostic.desc": {
    fr: "Analyse complète des systèmes électroniques de votre véhicule avec équipement de pointe et techniciens spécialisés.",
    ar: "تحليل شامل للأنظمة الإلكترونية لسيارتك باستخدام معدات متطورة وفنيين متخصصين.",
    en: "Complete analysis of your vehicle's electronic systems with cutting-edge equipment and specialized technicians.",
  },
  "services.repair.title": {
    fr: "Réparation automobile",
    ar: "إصلاح السيارات",
    en: "Car repair",
  },
  "services.repair.desc": {
    fr: "Service de réparation professionnel pour tous types de pannes mécaniques et électriques de votre véhicule.",
    ar: "خدمة إصلاح احترافية لجميع أنواع الأعطال الميكانيكية والكهربائية لسيارتك.",
    en: "Professional repair service for all types of mechanical and electrical failures of your vehicle.",
  },
  "services.sales.title": {
    fr: "Vente de véhicules neufs",
    ar: "بيع السيارات الجديدة",
    en: "New vehicle sales",
  },
  "services.sales.desc": {
    fr: "Large sélection de véhicules neufs vérifiés et garantis pour tous les budgets, avec financement disponible.",
    ar: "مجموعة واسعة من السيارات الجديدة التي تم فحصها وضمانها لجميع الميزانيات، مع توفر التمويل.",
    en: "Wide selection of verified and guaranteed new vehicles for all budgets, with financing available.",
  },
  "services.cleaning.title": {
    fr: "Lavage & nettoyage auto",
    ar: "غسيل وتنظيف السيارات",
    en: "Car washing & cleaning",
  },
  "services.cleaning.desc": {
    fr: "Services de nettoyage intérieur et extérieur pour redonner l'éclat du neuf à votre véhicule, avec produits professionnels.",
    ar: "خدمات التنظيف الداخلي والخارجي لإعادة بريق الجديد لسيارتك، باستخدام منتجات احترافية.",
    en: "Interior and exterior cleaning services to restore the shine of your vehicle, with professional products.",
  },
  "services.more": {
    fr: "En savoir plus",
    ar: "معرفة المزيد",
    en: "Learn more",
  },

  // Gallery
  "gallery.title": {
    fr: "Galerie",
    ar: "معرض",
    en: "Gallery",
  },
  "gallery.heading": {
    fr: "Nos Marques",
    ar: "علاماتنا التجارية",
    en: "Our Brands",
  },
  "gallery.description": {
    fr: "Découvrez notre sélection de marques automobiles disponibles chez Forum Auto Gabès.",
    ar: "اكتشف مجموعتنا من العلامات التجارية للسيارات المتوفرة في منتدى السيارات قابس.",
    en: "Discover our selection of automotive brands available at Forum Auto Gabes.",
  },
  "gallery.search": {
    fr: "Rechercher une marque...",
    ar: "البحث عن علامة تجارية...",
    en: "Search for a brand...",
  },
  "gallery.filter": {
    fr: "Filtrer par",
    ar: "تصفية حسب",
    en: "Filter by",
  },
  "gallery.all": {
    fr: "Toutes les marques",
    ar: "جميع العلامات التجارية",
    en: "All brands",
  },
  "gallery.asian": {
    fr: "Asiatiques",
    ar: "آسيوية",
    en: "Asian",
  },
  "gallery.american": {
    fr: "Américaines",
    ar: "أمريكية",
    en: "American",
  },
  "gallery.european": {
    fr: "Européennes",
    ar: "أوروبية",
    en: "European",
  },
  "gallery.other": {
    fr: "Autres",
    ar: "أخرى",
    en: "Other",
  },
  "gallery.no.results": {
    fr: "Aucune marque ne correspond à votre recherche.",
    ar: "لا توجد علامات تجارية تطابق بحثك.",
    en: "No brands match your search.",
  },

  // Footer
  "footer.rights": {
    fr: "Tous droits réservés.",
    ar: "جميع الحقوق محفوظة.",
    en: "All rights reserved.",
  },
  "footer.privacy": {
    fr: "Politique de confidentialité",
    ar: "سياسة الخصوصية",
    en: "Privacy Policy",
  },
  "footer.terms": {
    fr: "Conditions d'utilisation",
    ar: "شروط الاستخدام",
    en: "Terms of Use",
  },
  "footer.quick.links": {
    fr: "Liens rapides",
    ar: "روابط سريعة",
    en: "Quick Links",
  },
  "footer.tagline": {
    fr: "Service professionnel, véhicules de qualité, clients satisfaits.",
    ar: "خدمة احترافية، سيارات ذات جودة، عملاء راضون.",
    en: "Professional service, quality vehicles, satisfied customers.",
  },

  // Contact
  "contact.us": {
    fr: "Contactez-nous",
    ar: "اتصل بنا",
    en: "Contact us",
  },
  "contact.name": {
    fr: "Nom",
    ar: "الاسم",
    en: "Name",
  },
  "contact.email": {
    fr: "Email",
    ar: "البريد الإلكتروني",
    en: "Email",
  },
  "contact.message": {
    fr: "Message",
    ar: "الرسالة",
    en: "Message",
  },
  "contact.send": {
    fr: "Envoyer",
    ar: "إرسال",
    en: "Send",
  },
  "contact.address": {
    fr: "Adresse",
    ar: "العنوان",
    en: "Address",
  },
  "contact.phone": {
    fr: "Téléphone",
    ar: "الهاتف",
    en: "Phone",
  },

  // Appointment
  "appointment.title": {
    fr: "Rendez-vous",
    ar: "موعد",
    en: "Appointment",
  },
  "appointment.heading": {
    fr: "Prendre un rendez-vous",
    ar: "حجز موعد",
    en: "Book an appointment",
  },
  "appointment.description": {
    fr: "Réservez facilement un créneau pour l'entretien de votre véhicule ou pour discuter d'un achat.",
    ar: "احجز بسهولة موعدًا لصيانة سيارتك أو لمناقشة عملية شراء.",
    en: "Easily book a slot for your vehicle maintenance or to discuss a purchase.",
  },
  "appointment.form": {
    fr: "Formulaire de rendez-vous",
    ar: "نموذج الموعد",
    en: "Appointment form",
  },
  "appointment.personal": {
    fr: "Vos informations",
    ar: "معلوماتك",
    en: "Your information",
  },
  "appointment.fullname": {
    fr: "Nom complet",
    ar: "الاسم الكامل",
    en: "Full name",
  },
  "appointment.phone": {
    fr: "Téléphone",
    ar: "الهاتف",
    en: "Phone",
  },
  "appointment.next": {
    fr: "Suivant",
    ar: "التالي",
    en: "Next",
  },
  "appointment.previous": {
    fr: "Précédent",
    ar: "السابق",
    en: "Previous",
  },
  "appointment.vehicle": {
    fr: "Informations du véhicule",
    ar: "معلومات السيارة",
    en: "Vehicle information",
  },
  "appointment.brand": {
    fr: "Marque",
    ar: "العلامة التجارية",
    en: "Brand",
  },
  "appointment.model": {
    fr: "Modèle",
    ar: "الطراز",
    en: "Model",
  },
  "appointment.year": {
    fr: "Année",
    ar: "السنة",
    en: "Year",
  },
  "appointment.service.type": {
    fr: "Type de service",
    ar: "نوع الخدمة",
    en: "Service type",
  },
  "appointment.maintenance": {
    fr: "Entretien régulier",
    ar: "صيانة منتظمة",
    en: "Regular maintenance",
  },
  "appointment.repair": {
    fr: "Réparation",
    ar: "إصلاح",
    en: "Repair",
  },
  "appointment.diagnostic": {
    fr: "Diagnostic",
    ar: "تشخيص",
    en: "Diagnostic",
  },
  "appointment.purchase": {
    fr: "Achat de véhicule",
    ar: "شراء سيارة",
    en: "Vehicle purchase",
  },
  // "appointment.description": {
  //   fr: "Description (optionnel)",
  //   ar: "الوصف (اختياري)",
  //   en: "Description (optional)",
  // },
  "appointment.date.time": {
    fr: "Date et heure",
    ar: "التاريخ والوقت",
    en: "Date and time",
  },
  "appointment.date": {
    fr: "Date du rendez-vous",
    ar: "تاريخ الموعد",
    en: "Appointment date",
  },
  "appointment.time": {
    fr: "Heure du rendez-vous",
    ar: "وقت الموعد",
    en: "Appointment time",
  },
  "appointment.select.date": {
    fr: "Sélectionner une date",
    ar: "اختر تاريخًا",
    en: "Select a date",
  },
  "appointment.select.time": {
    fr: "Sélectionner une heure",
    ar: "اختر وقتًا",
    en: "Select a time",
  },
  "appointment.summary": {
    fr: "Récapitulatif",
    ar: "ملخص",
    en: "Summary",
  },
  "appointment.confirm": {
    fr: "Confirmer le rendez-vous",
    ar: "تأكيد الموعد",
    en: "Confirm appointment",
  },
  "appointment.success": {
    fr: "Rendez-vous pris avec succès! Nous vous contacterons bientôt pour confirmer.",
    ar: "تم حجز الموعد بنجاح! سنتصل بك قريبًا للتأكيد.",
    en: "Appointment successfully booked! We will contact you soon to confirm.",
  },

  // Comparison
  "comparison.title": {
    fr: "Comparaison",
    ar: "مقارنة",
    en: "Comparison",
  },
  "comparison.heading": {
    fr: "Comparez nos véhicules",
    ar: "قارن سياراتنا",
    en: "Compare our vehicles",
  },
  "comparison.description": {
    fr: "Trouvez le véhicule qui correspond le mieux à vos besoins en comparant les caractéristiques.",
    ar: "ابحث عن السيارة التي تناسب احتياجاتك بشكل أفضل من خلال مقارنة المواصفات.",
    en: "Find the vehicle that best suits your needs by comparing features.",
  },
  "comparison.vehicle1": {
    fr: "Véhicule 1",
    ar: "السيارة 1",
    en: "Vehicle 1",
  },
  "comparison.vehicle2": {
    fr: "Véhicule 2",
    ar: "السيارة 2",
    en: "Vehicle 2",
  },
  "comparison.select.vehicle": {
    fr: "Sélectionner un véhicule",
    ar: "اختر سيارة",
    en: "Select a vehicle",
  },
  "comparison.price": {
    fr: "Prix",
    ar: "السعر",
    en: "Price",
  },
  "comparison.engine": {
    fr: "Moteur",
    ar: "المحرك",
    en: "Engine",
  },
  "comparison.power": {
    fr: "Puissance",
    ar: "القوة",
    en: "Power",
  },
  "comparison.transmission": {
    fr: "Transmission",
    ar: "ناقل الحركة",
    en: "Transmission",
  },
  "comparison.consumption": {
    fr: "Consommation",
    ar: "استهلاك الوقود",
    en: "Fuel consumption",
  },
  "comparison.warranty": {
    fr: "Garantie",
    ar: "الضمان",
    en: "Warranty",
  },
  "comparison.features": {
    fr: "Équipements",
    ar: "التجهيزات",
    en: "Features",
  },

  // Newsletter
  "newsletter.title": {
    fr: "Restez informé de nos offres",
    ar: "ابق على اطلاع بعروضنا",
    en: "Stay informed about our offers",
  },
  "newsletter.description": {
    fr: "Inscrivez-vous à notre newsletter pour recevoir nos dernières offres, promotions et actualités.",
    ar: "اشترك في نشرتنا الإخبارية لتلقي أحدث العروض والترويجات والأخبار.",
    en: "Subscribe to our newsletter to receive our latest offers, promotions and news.",
  },
  "newsletter.placeholder": {
    fr: "Votre adresse email",
    ar: "عنوان بريدك الإلكتروني",
    en: "Your email address",
  },
  "newsletter.subscribe": {
    fr: "S'inscrire",
    ar: "اشترك",
    en: "Subscribe",
  },
  "newsletter.thanks": {
    fr: "Merci pour votre inscription!",
    ar: "شكرا لاشتراكك!",
    en: "Thank you for subscribing!",
  },
  "newsletter.privacy": {
    fr: "Nous respectons votre vie privée. Vous pouvez vous désinscrire à tout moment.",
    ar: "نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.",
    en: "We respect your privacy. You can unsubscribe at any time.",
  },

  // FAQ
  "faq.title": {
    fr: "FAQ",
    ar: "الأسئلة الشائعة",
    en: "FAQ",
  },
  "faq.heading": {
    fr: "Questions fréquentes",
    ar: "الأسئلة المتكررة",
    en: "Frequently Asked Questions",
  },
  "faq.description": {
    fr: "Trouvez rapidement des réponses aux questions les plus courantes sur nos services.",
    ar: "ابحث بسرعة عن إجابات للأسئلة الأكثر شيوعًا حول خدماتنا.",
    en: "Quickly find answers to the most common questions about our services.",
  },
}

export function t(key: string, lang: Language): string {
  if (!translations[key]) {
    console.warn(`Translation key not found: ${key}`)
    return key
  }
  return translations[key][lang] || translations[key].en
}
