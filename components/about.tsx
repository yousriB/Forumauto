"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/i18n"
import ScrollLink from "@/components/scroll-link"

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { language, dir } = useLanguage()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="about" className="py-20 md:py-28 bg-gray-50">
      <div className="container">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex flex-col md:flex-row gap-12 items-center"
          style={{ direction: dir }}
        >
          <motion.div variants={itemVariants} className="md:w-1/2">
            <div className="relative w-full aspect-video overflow-hidden rounded-xl shadow-2xl">
              <Image src="/images/team.jpg" alt={t("about.heading", language)} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <div className="bg-red-600 text-white px-4 py-2 rounded-lg inline-block mb-2">
                  {t("about.since", language)}
                </div>
                <h3 className="text-white text-xl font-bold">{t("about.trust", language)}</h3>
              </div>
            </div>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="md:w-1/2 space-y-6"
            style={{ textAlign: dir === "rtl" ? "right" : "left" }}
          >
            <div className="inline-block rounded-lg bg-red-100 px-3 py-1 text-sm text-red-800">
              {t("about.title", language)}
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-red-600">
              {t("about.heading", language)}
            </h2>
            <p className="text-lg text-gray-600">{t("about.paragraph1", language)}</p>
            <p className="text-lg text-gray-600">{t("about.paragraph2", language)}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-2" style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-600"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{t("about.feature1.title", language)}</h3>
                  <p className="text-gray-500">{t("about.feature1.desc", language)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2" style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-600"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{t("about.feature2.title", language)}</h3>
                  <p className="text-gray-500">{t("about.feature2.desc", language)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2" style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-600"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{t("about.feature3.title", language)}</h3>
                  <p className="text-gray-500">{t("about.feature3.desc", language)}</p>
                </div>
              </div>
              <div className="flex items-start gap-2" style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}>
                <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-600"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{t("about.feature4.title", language)}</h3>
                  <p className="text-gray-500">{t("about.feature4.desc", language)}</p>
                </div>
              </div>
            </div>
            <div className="pt-4">
              <Button asChild className="bg-red-600 hover:bg-red-700 group">
                <ScrollLink
                  href="#services"
                  className="flex items-center"
                  style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}
                >
                  {t("about.cta", language)}
                  <ChevronRight
                    className={`${dir === "rtl" ? "mr-2 rotate-180" : "ml-2"} h-4 w-4 transition-transform group-hover:${dir === "rtl" ? "-translate-x-1" : "translate-x-1"}`}
                  />
                </ScrollLink>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
