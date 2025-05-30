"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Car, Users, Calendar, Award } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/i18n"

export default function Stats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { language } = useLanguage()

  const stats = [
    {
      icon: Car,
      value: 500,
      labelKey: "stats.vehicles",
      suffix: "+",
    },
    {
      icon: Users,
      value: 1200,
      labelKey: "stats.clients",
      suffix: "+",
    },
    {
      icon: Calendar,
      value: 5,
      labelKey: "stats.experience",
      suffix: "+",
    },
    {
      icon: Award,
      value: 16,
      labelKey: "stats.brands",
      suffix: "",
    },
  ]

  return (
    <section className="py-12 text-white"
    style={{
      backgroundImage: "url('/images/bgbanner.jpg')",
      backgroundSize: "cover",
    }}>
      <div className="container">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem key={index} stat={stat} inView={inView} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ stat, inView, index, language }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (inView) {
      const duration = 2000 // ms
      const interval = 20 // ms
      const steps = duration / interval
      const increment = stat.value / steps
      let current = 0
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          current = stat.value
          clearInterval(timer)
        }
        setCount(Math.floor(current))
      }, interval)
      return () => clearInterval(timer)
    }
  }, [inView, stat.value])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center text-center"
    >
      <div className="mb-4 p-3 bg-white/10 rounded-full">
        <stat.icon className="h-6 w-6" />
      </div>
      <div className="text-4xl font-bold mb-2">
        {count}
        {stat.suffix}
      </div>
      <div className="text-sm opacity-80">{t(stat.labelKey, language)}</div>
    </motion.div>
  )
}
