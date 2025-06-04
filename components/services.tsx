"use client"

import { Wrench, Cpu, Car, Droplets, ArrowRight, Settings } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/i18n"
import ScrollLink from "@/components/scroll-link"

export default function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { language, dir } = useLanguage()

  const services = [
    {
      titleKey: "services.maintenance.title",
      descriptionKey: "services.maintenance.desc",
      icon: Wrench,
      link: "/pages/magasin",
      features: ["Vidange et filtres", "Freins et suspension", "Climatisation", "Batterie"],
    },
    {
      titleKey: "services.diagnostic.title",
      descriptionKey: "services.diagnostic.desc",
      icon: Cpu,
      link: "/pages/assurence",
      features: ["Lecture codes défaut", "Réinitialisation voyants", "Programmation", "Mise à jour logiciel"],
    },
    {
      titleKey: "services.repair.title",
      descriptionKey: "services.repair.desc",
      icon: Settings,
      link: "/pages/atelier",
      features: ["Moteur", "Transmission", "Suspension", "Système électrique"],
    },
    {
      titleKey: "services.sales.title",
      descriptionKey: "services.sales.desc",
      icon: Car,
      link: "/pages/logos",
      features: ["Garantie incluse", "Historique vérifié", "Financement", "Reprise possible"],
    },
    // {
    //   titleKey: "services.cleaning.title",
    //   descriptionKey: "services.cleaning.desc",
    //   icon: Droplets,
    //   features: ["Lavage extérieur", "Nettoyage intérieur", "Polissage", "Traitement céramique"],
    // },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="services" className="py-20 md:py-28">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-[#E71609] px-3 py-1 text-sm text-white mb-4 dark:bg-red-900 dark:text-red-200">
            {t("services.title", language)}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-[#E71609] dark:text-red-500">
            {t("services.heading", language)}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">{t("services.description", language)}</p>
        </div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ direction: dir }}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-2">
                  <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-[#E71609]" />
                  </div>
                  <CardTitle className="text-[#E71609]">{t(service.titleKey, language)}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-4">
                    {t(service.descriptionKey, language)}
                  </CardDescription>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-[#E71609]"
                          >
                            <polyline points="20 6 9 17 4 12"></polyline>
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant="ghost"
                    className="p-0 h-auto text-[#E71609] hover:text-red-700"
                  >
                    <a href={service.link} className="flex items-center">
                      <span>{t("services.more", language)}</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
