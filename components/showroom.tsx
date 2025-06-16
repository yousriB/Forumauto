"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRouter } from "next/navigation";
import LogoCarousel from "./LogoCarousel";

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
    <section className="py-12 bg-white" id="gallery">
      <div className="">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-slate-800 mb-2">
            Nos Marques
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
        <div className="w-full h-full grayscale">
          <LogoCarousel />
        </div>
      </div>
    </section>
  );
}
