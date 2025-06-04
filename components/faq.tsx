"use client"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Faq() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const faqs = [
    {
      question: "Quels types de véhicules proposez-vous à la vente ?",
      answer:
        "Nous proposons une large gamme de véhicules d'occasion de différentes marques, notamment Toyota, Ford, Chevrolet, Suzuki, et bien d'autres. Tous nos véhicules sont soigneusement inspectés et vérifiés avant la vente pour garantir leur qualité et leur fiabilité.",
    },
    {
      question: "Proposez-vous des garanties sur les véhicules d'occasion ?",
      answer:
        "Oui, tous nos véhicules d'occasion sont vendus avec une garantie minimale de 3 mois. Nous proposons également des extensions de garantie allant jusqu'à 24 mois pour une tranquillité d'esprit supplémentaire.",
    },
    {
      question: "Quels services d'entretien proposez-vous ?",
      answer:
        "Nous offrons une gamme complète de services d'entretien, incluant les vidanges, le remplacement des filtres, l'entretien des freins, la climatisation, les diagnostics électroniques, et bien plus encore. Notre équipe de mécaniciens qualifiés peut prendre en charge tous les aspects de l'entretien de votre véhicule.",
    },
    {
      question: "Puis-je prendre rendez-vous en ligne pour l'entretien de mon véhicule ?",
      answer:
        "Oui, vous pouvez facilement prendre rendez-vous en ligne via notre formulaire de rendez-vous. Sélectionnez simplement la date et l'heure qui vous conviennent, et nous vous confirmerons votre rendez-vous dans les plus brefs délais.",
    },
    {
      question: "Acceptez-vous les paiements échelonnés pour l'achat d'un véhicule ?",
      answer:
        "Oui, nous proposons différentes options de financement pour l'achat de véhicules. Nous travaillons avec plusieurs partenaires financiers pour vous offrir les meilleures conditions possibles. N'hésitez pas à nous contacter pour discuter des options disponibles.",
    },
    {
      question: "Combien de temps prend généralement un entretien régulier ?",
      answer:
        "Un entretien régulier prend généralement entre 1 et 2 heures, selon le type de service requis. Pour des réparations plus complexes, nous vous fournirons une estimation du temps nécessaire lors de votre rendez-vous.",
    },
  ]

  return (
    <section id="faq" className="py-20 md:py-28 bg-gray-50 dark:bg-gray-900">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block rounded-lg bg-[#E71609] px-3 py-1 text-sm text-white mb-4 dark:bg-red-900 dark:text-red-200">
            FAQ
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-[#E71609] dark:text-red-500">
            Questions fréquentes
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Trouvez rapidement des réponses aux questions les plus courantes sur nos services.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-gray-900 dark:text-white">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
