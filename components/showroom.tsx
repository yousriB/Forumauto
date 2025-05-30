"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

export default function Showroom() {
  const router = useRouter();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const brands = [
    {
      name: "ISUZU",
      image: "/marque/secondsuzu.png",
    },
    {
      name: "CHEVROLET",
      image: "/marque/chevrolet.webp",
    },
    {
      name: "CHERY",
      image: "/marque/chery.webp",
    },
    {
      name: "GREAT WALL",
      image: "/marque/gwm.webp",
    },
    {
      name: "HAVAL",
      image: "/marque/haval.webp",
    },
    {
      name: "GAC",
      image: "/marque/gac.webp",
    },
    {
      name: "TOYOTA",
      image: "/marque/toyota.webp",
    },
    {
      name: "SUZUKI",
      image: "/marque/suzuki.webp",
    },
    {
      name: "MG",
      image: "/marque/mg.webp",
    },
    {
      name: "FORD",
      image: "/marque/ford.webp",
    },
    {
      name: "DFSK",
      image: "/marque/dfsk.webp",
    },
    {
      name: "DONGFENG",
      image: "/marque/dongfong.webp",
    },
    {
      name: "BYD",
      image: "/marque/byd.webp",
    },
    {
      name: "RENAULT",
      image: "/marque/renault.webp",
    },
    {
      name: "DACIA",
      image: "/marque/dacia.webp",
    },
    {
      name: "NISSAN",
      image: "/marque/nissan.webp",
    },
   
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-16 bg-white" id="gallery">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">
            Showroom Auto
          </h2>
          <h3 className="text-xl font-medium text-slate-600 mb-4">
            Toutes les marques automobiles
          </h3>
          <div className="flex justify-center mt-2">
            <div className="w-32 h-0.5 bg-red-600 relative">
              <div className="absolute w-2 h-2 bg-red-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-5xl mx-auto cursor-pointer"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center"
              onClick={() =>
                router.push(
                  `/pages/cars?brand=${encodeURIComponent(brand.name)}`
                )
              }
            >
              <div className="bg-white rounded-lg shadow-md p-8 h-52 w-full flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <div className="relative h-full w-full group">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain transition-all duration-300 group-hover:filter-none filter grayscale"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
