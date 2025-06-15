"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();
  return (
    <section id="services" className="py-12 min-h-screen">
      <div className="container h-auto">
        <section className="grid grid-cols-3 grid-rows-2 gap-6 p-6">
          {/* Card 1 - spans 2 rows, 1 column */}
          <div
            className="rounded-3xl p-6 text-gray-50 row-span-2 flex flex-col items-center justify-center cursor-pointer"
            style={{
              background: "linear-gradient(135deg, #E71609, #000000)",
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <h2 className="text-2xl font-semibold mb-4">
                Envie de prendre le volant ?
              </h2>
              <Image
                src="/images/supercar.png"
                alt="Cupra Leon"
                width={300}
                height={50}
                className="filter brightness-0 invert"
              />
              <a
                className="bg-gray-50 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md cursor-pointer"
                onClick={() => router.push("/pages/rendevouz")}
              >
                Prendre rendez-vous
              </a>
            </div>
          </div>
          {/* Card 4 - spans 2 rows, 1 column */}
          <div
            className="rounded-3xl p-6 flex flex-col justify-around items-center text-gray-50 row-span-2 cursor-pointer"
            style={{
              background: "url('/images/bgbanner.jpg') no-repeat",
              backgroundSize: "cover",
            }}
            onClick={() => router.push("/pages/logos")}
          >
            <div className="text-center">
              <h2 className="text-4xl font-semibold mb-4">Nos marques</h2>
              <p className="text-gray-50 text-lg font-medium">
                Achetez un véhicule neuf avec
              </p>
            </div>
            <Image
              src="/images/logoo.png"
              alt="Cupra Leon"
              width={250}
              height={160}
              className="filter brightness-0 invert"
            />
            <Image
              src="/images/supercar.png"
              alt="Cupra Leon"
              width={300}
              height={50}
              className="filter brightness-0 invert"
            />
          </div>

          {/* Card 2 - 1 row, 1 column */}
          <div
            className="rounded-3xl p-6 flex flex-col justify-between items-center text-gray-50 cursor-pointer"
            style={{ background: "linear-gradient(135deg, #E71609, #000000)" }}
            onClick={() => router.push("/pages/demanderdevis")}
          >
            <span className="text-4xl font-semibold mb-2 block">
              Demandez votre devis personnalisé
            </span>
            <h2 className="text-gray-50 text-lg font-medium mb-2">
              Obtenez une estimation rapide et sur-mesure pour votre véhicule.
            </h2>
            <a
              className="bg-gray-50 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md"
              href="#"
            >
              Demander mon devis
            </a>
          </div>

          {/* Card 3 - 1 row, 1 column */}
          <div
            className="rounded-3xl p-6 text-gray-50 relative"
            style={{ background: "#000000" }}
          >
            <div className="flex flex-col items-center mb-4">
              {/* icon or Image here */}
              <Image
                src="/marque/rondala.png"
                alt="Rendez-vous"
                width={50}
                height={50}
              />
              <h2 className="text-2xl font-semibold mb-3 text-center mt-4 ">
                Prenez rendez-vous <br /> pour l’entretien de votre véhicule
              </h2>
              <a
                className="bg-gray-50 text-gray-900 font-semibold py-2 px-4 rounded-md shadow-md cursor-pointer"
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
