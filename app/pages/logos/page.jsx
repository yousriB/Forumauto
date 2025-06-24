"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const brands = [
    { name: "ISUZU", image: "/carlogos/isuzu.png" },
    { name: "CHEVROLET", image: "/carlogos/chevrolet.png" },
    { name: "CHERY", image: "/carlogos/chery.png" },
    { name: "GREAT WALL", image: "/carlogos/gwm.png" },
    { name: "HAVAL", image: "/carlogos/haval.png" },
    { name: "GAC", image: "/carlogos/gac.png" },
    { name: "TOYOTA", image: "/carlogos/toyota.png" },
    { name: "SUZUKI", image: "/carlogos/suzuki.png" },
    { name: "MG", image: "/carlogos/mg.png" },
    { name: "FORD", image: "/carlogos/ford.png" },
    { name: "DFSK", image: "/carlogos/dfsk.png" },
    { name: "DONGFENG", image: "/carlogos/dongfeng.png" },
    { name: "BYD", image: "/carlogos/byd.png" },
    { name: "RENAULT", image: "/carlogos/renault.png" },
    { name: "DACIA", image: "/carlogos/dacia.png" },
    { name: "NISSAN", image: "/carlogos/nissan.png" },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">
            Choisissez votre marque
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
          className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-10 max-w-5xl mx-auto"
        >
          {brands.map((brand, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() =>
                router.push(
                  `/pages/cars?brand=${encodeURIComponent(brand.name)}`
                )
              }
            >
              <div className="bg-white rounded-lg shadow-md p-8 h-52 w-full flex items-center justify-center hover:shadow-lg transition-shadow duration-300">
                <div className="relative w-full h-full">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain transition-all duration-300 group-hover:scale-110"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Page;
