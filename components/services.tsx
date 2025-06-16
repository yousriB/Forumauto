"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Services() {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Sample car images array - replace with your actual car images
  const carImages = [
    "https://catalogue.automobile.tn/big/2024/10/47244.webp?t=1730749863",
    "https://catalogue.automobile.tn/big/2024/05/46809.webp?t=1715243311",
    "https://catalogue.automobile.tn/big/2024/05/47143.webp?t=1728034036",
    "https://catalogue.automobile.tn/big/2022/03/46718.webp?t=1713019608",

    // Add more car images as needed
  ];

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? carImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <section id="services" className="py-12 min-h-screen">
      <div className="container h-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">
            Nos Services
          </h2>
          <h3 className="text-xl font-medium text-slate-600 mb-4">
            Toutes les services de votre concessionnaire
          </h3>
          <div className="flex justify-center mt-2">
            <div className="w-32 h-0.5 bg-red-600 relative">
              <div className="absolute w-2 h-2 bg-red-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-4 md:p-6">
          {/* Card 1 - spans 2 rows on desktop, 1 row on mobile */}
          <div
            className="rounded-3xl p-4 md:p-6 text-gray-50 lg:row-span-2 flex flex-col items-center justify-around cursor-pointer relative"
            style={{
              background: "linear-gradient(135deg, #E71609, #000000)",
            }}
          >
            <h2 className="text-xl md:text-2xl font-semibold mb-4 text-center">
              Envie de prendre le volant ?
            </h2>
            <div className="flex flex-col justify-center items-center w-full">
              <div className="relative w-full flex items-center justify-center">
                {/* Left Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className="absolute -left-5 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {/* Car Image */}
                <Image
                  src={carImages[currentImageIndex]}
                  alt="Car"
                  width={800}
                  height={100}
                  className="filter w-[300px] md:w-[300px] transition-opacity duration-300"
                />

                {/* Right Arrow */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className="absolute -right-5 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <a
              className="bg-gray-50 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md cursor-pointer mt-4"
              onClick={() => router.push("/pages/rendevouz")}
            >
              Prendre rendez-vous
            </a>
          </div>

          {/* Card 4 - spans 2 rows on desktop, 1 row on mobile */}
          <div
            className="rounded-3xl p-4 md:p-6 flex flex-col justify-around items-center text-gray-50 lg:row-span-2 cursor-pointer"
            style={{
              background: "url('/images/bgbanner.jpg') no-repeat",
              backgroundSize: "cover",
            }}
            onClick={() => router.push("/pages/logos")}
          >
            <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-semibold mb-4">
                Nos marques
              </h2>
              <p className="text-gray-50 text-base md:text-lg font-medium">
                Achetez un véhicule neuf avec
              </p>
            </div>
            <Image
              src="/images/logoo.png"
              alt="Cupra Leon"
              width={250}
              height={160}
              className="filter brightness-0 invert w-[150px] md:w-[250px]"
            />
            <Image
              src="/images/supercar.png"
              alt="Cupra Leon"
              width={300}
              height={50}
              className="filter brightness-0 invert w-[200px] md:w-[300px]"
            />
          </div>

          {/* Card 2 - 1 row */}
          <div
            className="rounded-3xl p-4 md:p-6 flex flex-col justify-between items-center text-gray-50 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #E71609, #000000)" }}
            onClick={() => router.push("/pages/demanderdevis")}
          >
            <span className="text-2xl md:text-4xl font-semibold mb-2 block text-center">
              Demandez votre devis personnalisé
            </span>
            <h2 className="text-gray-50 text-base md:text-lg font-medium mb-2 text-center">
              Obtenez une estimation rapide et sur-mesure pour votre véhicule.
            </h2>
            <a
              className="bg-gray-50 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md mt-4"
              href="#"
            >
              Demander mon devis
            </a>
          </div>

          {/* Card 3 - 1 row */}
          <div
            className="rounded-3xl p-4 md:p-6 text-gray-50 relative"
            style={{ background: "#000000" }}
          >
            <div className="flex flex-col items-center mb-4">
              <Image
                src="/marque/rondala.png"
                alt="Rendez-vous"
                width={50}
                height={50}
                className="w-[40px] md:w-[50px]"
              />
              <h2 className="text-xl md:text-2xl font-semibold mb-3 text-center mt-4">
                Prenez rendez-vous <br /> pour l'entretien de votre véhicule
              </h2>
              <a
                className="bg-gray-50 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md cursor-pointer mt-4"
                onClick={() => router.push("/pages/rendevouz")}
              >
                Cliquez ici
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
