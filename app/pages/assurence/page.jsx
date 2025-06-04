// InsurancePage.jsx
"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaShieldAlt, FaCarCrash, FaTools, FaHandshake, FaPhoneAlt, FaArrowRight } from "react-icons/fa";
import { MdOutlineVerifiedUser, MdSpeed, MdSupportAgent } from "react-icons/md";

const InsurancePage = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const testimonials = [
    {
      quote: "Après un accident, j'ai été impressionné par la rapidité de prise en charge. Mon véhicule a été réparé en 48h et je n'ai eu aucun frais à avancer. Je recommande vivement !",
      author: "Sarah K.",
      since: "Client depuis 2021",
      image: "/images/testimonial-1.jpg",
    },
    {
      quote: "Service client exceptionnel et couverture adaptée à mes besoins. Je suis très satisfait de mon expérience !",
      author: "Marc L.",
      since: "Client depuis 2022",
      image: "/images/testimonial-2.jpg",
    },
    {
      quote: "Le processus de souscription était simple et rapide. Les conseillers sont très professionnels.",
      author: "Julie M.",
      since: "Client depuis 2020",
      image: "/images/testimonial-3.jpg",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-50 to-white dark:from-red-900/20 dark:to-gray-900">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-400">
                Protégez votre véhicule<br />avec sérénité
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
                Solutions d'assurance sur mesure pour tous vos besoins automobiles avec des garanties adaptées.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg">
                  Obtenir un devis
                </button>
                <button className="border-2 border-red-500 text-red-500 hover:bg-red-500/10 px-8 py-3 rounded-full font-medium transition-all">
                  En savoir plus
                </button>
              </div>
            </div>
            <div className="relative text-[#E71609]">
              <div className="relative w-full h-80 md:h-96">
                <Image
                  src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Car Insurance"
                  fill
                  style={{ objectFit: "contain" }}
                  className="animate-float"
                />
              </div>
              <div className="absolute bottom-0 left-0 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl w-40">
                <div className="flex items-center gap-3">
                  <FaShieldAlt className="text-red-600 text-2xl" />
                  <div>
                    <p className="text-xs text-gray-500">Couverture</p>
                    <p className="font-semibold">100%</p>
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-xl w-40">
                <div className="flex items-center gap-3">
                  <MdSpeed className="text-blue-600 text-2xl" />
                  <div>
                    <p className="text-xs text-gray-500">Traitement</p>
                    <p className="font-semibold">24h max</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Cards */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full text-sm font-medium mb-4">
            Nos Offres
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Solutions adaptées</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choisissez la protection qui correspond à vos besoins et votre budget.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <FaShieldAlt className="text-red-600 text-3xl" />,
              title: "Tous Risques",
              desc: "Couverture complète contre accidents, vol et dommages",
              price: "À partir de 1200€/an",
              features: ["Véhicule remplacement", "Assistance 24/7", "Franchise réduite"],
            },
            {
              icon: <FaCarCrash className="text-blue-600 text-3xl" />,
              title: "Au Tiers",
              desc: "Protection des dommages causés à autrui",
              price: "À partir de 600€/an",
              features: ["Responsabilité civile", "Défense pénale", "Recours suite accident"],
            },
            {
              icon: <FaTools className="text-amber-600 text-3xl" />,
              title: "Dépannage",
              desc: "Assistance technique en cas de panne",
              price: "À partir de 150€/an",
              features: ["Intervention rapide", "Remorquage", "Prise en charge"],
            },
            {
              icon: <MdOutlineVerifiedUser className="text-emerald-600 text-3xl" />,
              title: "Extension Garantie",
              desc: "Prolongez la garantie constructeur",
              price: "À partir de 800€/an",
              features: ["Pièces couvertes", "Main-d'œuvre incluse", "Réseau agréé"],
            },
          ].map((type, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-scale border border-gray-100 dark:border-gray-700 p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">{type.icon}</div>
                {idx === 0 && (
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs px-3 py-1 rounded-full">
                    Populaire
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{type.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{type.desc}</p>
              <p className="text-2xl font-bold text-red-600 mb-4">{type.price}</p>
              <ul className="space-y-3 mb-6">
                {type.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <svg className="w-4 h-4 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center">
                Choisir cette offre <FaArrowRight className="ml-2" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-red-600 to-red-500 text-[#E71609] py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "98%", label: "Clients satisfaits" },
              { number: "24h", label: "Traitement dossier" },
              { number: "500+", label: "Véhicules assurés" },
              { number: "10", label: "Partenaires" },
            ].map((stat, idx) => (
              <div key={idx} className="p-6 animate-scale">
                <p className="text-4xl font-bold mb-2">{stat.number}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full text-sm font-medium mb-4">
            Processus
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#E71609]">Simple et rapide</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Souscrivez à votre assurance en quelques étapes.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 dark:bg-gray-700"></div>
          {[
            {
              step: "1",
              title: "Demande en ligne",
              desc: "Remplissez notre formulaire en 2 minutes",
              icon: <FaPhoneAlt className="text-white text-xl" />,
            },
            {
              step: "2",
              title: "Analyse de votre dossier",
              desc: "Nos experts étudient votre demande",
              icon: <MdSupportAgent className="text-white text-xl" />,
            },
            {
              step: "3",
              title: "Proposition personnalisée",
              desc: "Recevez une offre adaptée à votre profil",
              icon: <FaHandshake className="text-white text-xl" />,
            },
            {
              step: "4",
              title: "Mise en place",
              desc: "Votre contrat est activé immédiatement",
              icon: <MdOutlineVerifiedUser className="text-white text-xl" />,
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`mb-12 md:flex ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center animate-scale`}
            >
              <div className={`md:w-1/2 ${idx % 2 === 0 ? "md:pr-12" : "md:pl-12"} mb-6 md:mb-0`}>
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-center">
                <div className="relative">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center z-10">
                    {item.icon}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <div className="w-24 h-24 bg-red-600/10 rounded-full animate-ping"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full text-sm font-medium mb-4">
              Témoignages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
          </div>

          <div className="max-w-4xl mx-auto relative">
            <div className="bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-lg relative carousel-item">
              <div className="absolute -top-4 -left-4 bg-red-600 text-white p-2 rounded-lg">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <p className="text-lg italic mb-6">{testimonials[currentTestimonial].quote}</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt="Client"
                    width={48}
                    height={48}
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div>
                  <p className="font-bold">{testimonials[currentTestimonial].author}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{testimonials[currentTestimonial].since}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-2 h-2 rounded-full ${idx === currentTestimonial ? "bg-red-600" : "bg-gray-300 dark:bg-gray-600"}`}
                ></button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="container mx-auto px-6 py-16 text-[#E71609]">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos partenaires</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Collaboration avec les leaders du marché pour des garanties optimales.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
          {[
            "/images/partners/axa.png",
            "/images/partners/allianz.png",
            "/images/partners/ami.png",
            "/images/partners/star.png",
            "/images/partners/gat.png",
          ].map((src, idx) => (
            <div key={idx} className="relative h-16 animate-scale">
              <Image
                src={src}
                alt="Partner Logo"
                fill
                style={{ objectFit: "contain" }}
                className="hover:filter-none transition-all"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-red-600 to-red-500 text-[#E71609] py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à protéger votre véhicule ?</h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-8">
            Obtenez une offre personnalisée en moins de 2 minutes.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-red-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg">
              Demander un devis
            </button>
            <button className="border-2 border-white bg-[#E71609] text-white hover:bg-[#E71609]/10 px-8 py-4 rounded-full font-bold transition-all">
              Nous contacter
            </button>
          </div>
        </div>
      </section>

      {/* Inline Styles */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-scale {
          transition: transform 0.3s ease;
        }
        .animate-scale:hover {
          transform: scale(1.03);
        }
        .carousel-item {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
      `}</style>
    </div>
  );
};

export default InsurancePage;