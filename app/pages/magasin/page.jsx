"use client";
import React from "react";
import Image from "next/image";
import { FiShoppingCart, FiTruck, FiShield, FiHeadphones, FiCreditCard } from "react-icons/fi";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

const StorePage = () => {
  // Categories data
  const categories = [
    { 
      title: "Assurance Auto", 
      image: "https://cdnfr.africanmanager.com/wp-content/uploads/2022/03/assurance-auto-formules.png",
      count: "12 produits"
    },
    { 
      title: "Accessoires Voiture", 
      image: "https://www.focusauto.fr/wp-content/uploads/2023/05/accessoire-voiture-interieur.jpg",
      count: "28 produits" 
    },
    { 
      title: "Documents Officiels", 
      image: "https://www.bandol.fr/wp-content/uploads/2022/12/documents-officiels.jpg",
      count: "7 produits" 
    },
  ];

  // Featured products data
  const featuredProducts = [
    {
      id: 1,
      name: "Assurance Tous Risques",
      price: "120 DT",
      originalPrice: "150 DT",
      image: "https://www.focusauto.fr/wp-content/uploads/2023/05/accessoire-voiture-interieur.jpg",
      rating: 4.5,
      reviews: 42,
      isNew: true,
      discount: "20%"
    },
    {
      id: 2,
      name: "Kit Antivol Premium",
      price: "35 DT",
      image: "https://www.focusauto.fr/wp-content/uploads/2023/05/accessoire-voiture-interieur.jpg",
      rating: 4,
      reviews: 18,
      bestSeller: true
    },
    {
      id: 3,
      name: "GPS Tracker Voiture",
      price: "89 DT",
      image: "https://www.focusauto.fr/wp-content/uploads/2023/05/accessoire-voiture-interieur.jpg",
      rating: 4.8,
      reviews: 36,
      limited: true
    },
    {
      id: 4,
      name: "Vignette 2025",
      price: "Prix selon véhicule",
      image: "https://www.focusauto.fr/wp-content/uploads/2023/05/accessoire-voiture-interieur.jpg",
      rating: 5,
      reviews: 54
    },
  ];

  // Benefits data
  const benefits = [
    {
      icon: <FiShield className="text-2xl" />,
      title: "Paiement sécurisé",
      desc: "Transactions 100% protégées"
    },
    {
      icon: <FiTruck className="text-2xl" />,
      title: "Livraison rapide",
      desc: "Délai moyen de 48h"
    },
    {
      icon: <FiHeadphones className="text-2xl" />,
      title: "Support 7/24",
      desc: "Assistance par téléphone"
    },
    {
      icon: <FiCreditCard className="text-2xl" />,
      title: "Paiement flexible",
      desc: "Plusieurs options disponibles"
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "Commande facile, livraison rapide et produits de qualité. Merci pour ce service impeccable !",
      author: "Fatma M.",
      rating: 5,
      verified: true
    },
    {
      id: 2,
      quote: "J'ai trouvé exactement ce qu'il me fallait à un prix imbattable. Je recommande vivement ce magasin.",
      author: "Karim B.",
      rating: 4,
      verified: true
    }
  ];

  // FAQ data
  const faqs = [
    {
      question: "Comment commander ?",
      answer: "Choisissez vos produits, ajoutez-les au panier et suivez le processus de paiement sécurisé."
    },
    {
      question: "Quels sont les moyens de paiement ?",
      answer: "Nous acceptons les cartes bancaires, paiement à la livraison et virement bancaire."
    },
    {
      question: "Livrez-vous partout en Tunisie ?",
      answer: "Oui, nous livrons dans toutes les régions avec des frais variables selon la destination."
    }
  ];

  // Render star rating
  const renderRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-[#E71609]" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-[#E71609]" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-[#E71609]" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-white py-20 border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Votre <span className="text-[#E71609]">boutique auto</span> en ligne
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Tout pour votre véhicule au meilleur prix. Livraison rapide dans toute la Tunisie.
              </p>
              <div className="flex space-x-4">
                <button className="bg-[#E71609] hover:bg-[#C51207] text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-[#E71609]/30">
                  Explorer le catalogue
                </button>
                <button className="border-2 border-[#E71609] text-[#E71609] hover:bg-[#E71609]/10 px-8 py-3 rounded-full font-bold transition-all">
                  Nos promotions
                </button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <div className="relative w-full h-64 md:h-80">
                <Image 
                  src="/images/store/hero-car.png" 
                  alt="Voiture" 
                  layout="fill" 
                  objectFit="contain"
                  className="animate-float"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Nos Catégories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Découvrez nos différentes gammes de produits et services
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {categories.map((category, index) => (
            <div 
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48">
                <Image
                  src={category.image}
                  alt={category.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="absolute bottom-0 left-0 p-6 w-full">
                <h3 className="text-xl font-bold text-white mb-1">{category.title}</h3>
                <p className="text-gray-300 text-sm">{category.count}</p>
                <button className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white border border-white hover:bg-white hover:text-[#E71609] px-4 py-1 rounded-full text-sm font-medium">
                  Voir les produits
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold">Produits en vedette</h2>
              <p className="text-gray-600">Nos meilleures ventes</p>
            </div>
            <button className="text-[#E71609] hover:text-[#C51207] font-medium flex items-center">
              Voir tout <FiShoppingCart className="ml-2" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative">
                  <div className="h-48 w-full relative">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {product.isNew && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Nouveau
                    </span>
                  )}
                  {product.bestSeller && (
                    <span className="absolute top-3 left-3 bg-[#E71609] text-white text-xs px-2 py-1 rounded-full">
                      Best-seller
                    </span>
                  )}
                  {product.limited && (
                    <span className="absolute top-3 left-3 bg-[#E71609] text-white text-xs px-2 py-1 rounded-full">
                      Stock limité
                    </span>
                  )}
                  {product.discount && (
                    <span className="absolute top-3 right-3 bg-[#E71609] text-white text-xs px-2 py-1 rounded-full">
                      -{product.discount}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex mr-2">
                      {renderRating(product.rating)}
                    </div>
                    <span className="text-gray-500 text-sm">({product.reviews})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#E71609]">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-400 text-sm line-through ml-2">{product.originalPrice}</span>
                      )}
                    </div>
                    <button className="bg-[#E71609] hover:bg-[#C51207] text-white p-2 rounded-full transition-all">
                      <FiShoppingCart />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-center"
            >
              <div className="bg-[#E71609]/10 w-12 h-12 mx-auto rounded-full flex items-center justify-center text-[#E71609] mb-4">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
              <p className="text-gray-600 text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Avis Clients</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ce que nos clients disent de notre boutique
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex mb-4">
                  {renderRating(testimonial.rating)}
                </div>
                <p className="italic text-gray-700 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 overflow-hidden">
                    <Image 
                      src={`/images/store/avatar-${testimonial.id}.jpg`} 
                      alt={testimonial.author}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    {testimonial.verified && (
                      <p className="text-sm text-gray-500 flex items-center">
                        <span className="text-green-500 mr-1">✓</span> Client vérifié
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
                <h3 className="font-medium">{faq.question}</h3>
                <svg className="w-5 h-5 text-gray-500 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Final CTA */}
      <section className="py-20 bg-white text-[#E71609]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à faire votre shopping ?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Inscrivez-vous maintenant et bénéficiez de 10% de réduction sur votre première commande.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#E71609] hover:bg-gray-100 px-8 py-4 rounded-full font-bold transition-all shadow-lg">
              Commencer mes achats
            </button>
            <button className="border-2 bg-[#E71609] text-white hover:bg-[#E71609]/10 px-8 py-4 rounded-full font-bold transition-all">
              Contactez-nous
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StorePage;