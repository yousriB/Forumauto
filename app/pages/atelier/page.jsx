"use client"
import React from 'react';
import Image from 'next/image';
import { FaTools, FaCar, FaClock, FaPhoneAlt, FaCalendarAlt, FaCheckCircle } from 'react-icons/fa';
import { GiCarWheel, GiCarKey, GiSteeringWheel } from 'react-icons/gi';
import { MdElectricalServices, MdAir } from 'react-icons/md';
import { IoMdPricetags } from 'react-icons/io';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { FaShoppingCart, FaTruck, FaShield, FaHeadphones, FaCreditCard } from 'react-icons/fi';


const AtelierPage = () => {
  // Services data
  const services = [
    {
      icon: <FaCar className="text-3xl text-[#E71609]" />,
      title: "Moteur",
      description: "Diagnostic et réparation complète de tous types de moteurs"
    },
    {
      icon: <GiCarWheel className="text-3xl text-[#E71609]" />,
      title: "Transmission",
      description: "Réglage ou remplacement de boîtes de vitesses et embrayages"
    },
    {
      icon: <GiSteeringWheel className="text-3xl text-[#E71609]" />,
      title: "Suspension",
      description: "Amortisseurs, ressorts, bras de suspension et géométrie"
    },
    {
      icon: <MdElectricalServices className="text-3xl text-[#E71609]" />,
      title: "Système électrique",
      description: "Batterie, alternateur, faisceaux électriques et éclairage"
    },
    {
      icon: <GiCarKey className="text-3xl text-[#E71609]" />,
      title: "Freinage",
      description: "Plaquettes, disques, étriers et liquide de frein"
    },
    {
      icon: <MdAir className="text-3xl text-[#E71609]" />,
      title: "Climatisation",
      description: "Recharge de gaz, dépannage et entretien du système"
    },
    {
      icon: <FaTools className="text-3xl text-[#E71609]" />,
      title: "Vidange & entretien",
      description: "Huiles moteur, filtres et check-up complet"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "Service exceptionnel ! Ma voiture est comme neuve après la réparation. Prix très corrects pour la qualité du travail.",
      author: "Mohamed T.",
      rating: 5
    },
    {
      id: 2,
      quote: "Mécaniciens honnêtes qui expliquent clairement les problèmes et solutions. Je recommande vivement cet atelier.",
      author: "Samira K.",
      rating: 5
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "Combien de temps dure une réparation ?",
      answer: "Cela dépend de la nature de l'intervention. Une simple vidange prend environ 30 minutes, tandis qu'une réparation moteur complexe peut nécessiter plusieurs jours."
    },
    {
      question: "Est-ce que je dois laisser ma voiture toute la journée ?",
      answer: "Pas nécessairement. Pour les petites interventions, nous pouvons vous donner une estimation horaire. Pour les grosses réparations, nous vous conseillons de laisser le véhicule."
    },
    {
      question: "Est-ce que vous utilisez des pièces d'origine ?",
      answer: "Nous proposons toujours le choix entre pièces d'origine et pièces de qualité équivalente à prix réduit, avec une transparence totale sur les options."
    }
  ];

  // Render star rating
  const renderRating = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      i < rating 
        ? <FaStar key={i} className="text-yellow-500 inline" /> 
        : <FaRegStar key={i} className="text-yellow-500 inline" />
    ));
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gray-100 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                <span className="text-[#E71609]">Réparation Automobile</span> Professionnelle
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Des services experts pour remettre votre véhicule en parfait état.
              </p>
              <div className="flex space-x-4">
                <button className="bg-[#E71609] hover:bg-[#C51207] text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-[#E71609]/30">
                  Prendre rendez-vous
                </button>
                <button className="border-2 border-[#E71609] text-[#E71609] hover:bg-[#E71609]/10 px-8 py-3 rounded-full font-bold transition-all">
                  Demander un devis
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-64 md:h-80">
                <Image 
                  src="/images/atelier-hero.jpg" 
                  alt="Atelier de réparation automobile" 
                  layout="fill" 
                  objectFit="cover"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tous types de réparations effectuées par nos mécaniciens certifiés
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all text-center border border-gray-100"
            >
              <div className="flex justify-center mb-4">
                <div className="bg-[#E71609]/10 w-16 h-16 rounded-full flex items-center justify-center">
                  {service.icon}
                </div>
              </div>
              <h3 className="font-bold text-xl mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <div className="relative w-full h-64 md:h-80">
                <Image 
                  src="https://f.hellowork.com/obs-static-images/seo/ObsJob/chef-atelier-automobile.jpg" 
                  alt="Intérieur de l'atelier" 
                  width={500}
                  height={500}
                  objectFit="cover"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold mb-6">Pourquoi choisir notre atelier ?</h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#E71609] text-xl mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold">Mécaniciens qualifiés et certifiés</h3>
                    <p className="text-gray-600">Notre équipe possède toutes les certifications nécessaires pour travailler sur votre véhicule</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#E71609] text-xl mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold">Service rapide et garanti</h3>
                    <p className="text-gray-600">Nous respectons les délais annoncés et garantissons nos interventions</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#E71609] text-xl mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold">Devis transparent et sans surprise</h3>
                    <p className="text-gray-600">Vous connaissez le prix exact avant toute intervention</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <FaCheckCircle className="text-[#E71609] text-xl mt-1 mr-3" />
                  <div>
                    <h3 className="font-bold">Atelier équipé de technologies modernes</h3>
                    <p className="text-gray-600">Nous disposons des outils les plus récents pour un diagnostic précis</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Notre Atelier en Images</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="relative h-48 rounded-lg overflow-hidden shadow-md">
              <Image
                src="https://www.sayarti.tn/wp-content/uploads/2022/03/atelier-seat-dar-tunisie.jpg"
                alt={`Atelier photo ${item}`}
                layout="fill"
                objectFit="cover"
                className="hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-[#E71609] text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Témoignages Clients</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm"
              >
                <div className="flex mb-4 text-white">
                  {renderRating(testimonial.rating)}
                </div>
                <p className="italic text-xl mb-6">"{testimonial.quote}"</p>
                <p className="font-bold">— {testimonial.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="bg-gray-100 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Besoin d'une réparation ?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Contactez-nous dès maintenant pour un rendez-vous ou un devis gratuit
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#E71609] hover:bg-[#C51207] text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-[#E71609]/30 flex items-center justify-center">
              <FaCalendarAlt className="mr-2" /> Prendre rendez-vous
            </button>
            <button className="border-2 border-[#E71609] text-[#E71609] hover:bg-[#E71609]/10 px-8 py-4 rounded-full font-bold transition-all flex items-center justify-center">
              <FaPhoneAlt className="mr-2" /> Nous appeler
            </button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden"
            >
              <button className="w-full text-left p-4 bg-white hover:bg-gray-50 transition-all flex justify-between items-center">
                <h3 className="font-medium text-lg">{faq.question}</h3>
                <svg className="w-5 h-5 text-[#E71609] transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AtelierPage;