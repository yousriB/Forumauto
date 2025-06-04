"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Mail, Check } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/i18n"

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { language } = useLanguage()

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/subscribe-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log("Email submitted:", email);
        setSubmitted(true);
        setEmail("");
        // Reset after 3 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 3000);
      } else {
        console.error('Failed to subscribe:', response.status);
        alert('Failed to subscribe. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Error submitting email. Please try again.');
    }
  };

  return (
    <section className="py-16 text-white"
    style={{
      backgroundImage: "url('/images/bgbanner.jpg')",
      backgroundSize: "cover",
    }}
    >
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-6">
            <Mail className="h-6 w-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-4">{t("newsletter.title", language)}</h2>
          <p className="text-lg text-white/80 mb-8">{t("newsletter.description", language)}</p>

          {submitted ? (
            <div className="flex items-center justify-center space-x-2 text-white bg-white/20 rounded-lg py-3 px-4 max-w-md mx-auto">
              <Check className="h-5 w-5" />
              <span>{t("newsletter.thanks", language)}</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t("newsletter.placeholder", language)}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
              />
              <Button type="submit" className="bg-white text-[#E71609] hover:bg-white/90 dark:bg-white dark:text-red-700">
                {t("newsletter.subscribe", language)}
              </Button>
            </form>
          )}

          <p className="text-sm text-white/60 mt-4">{t("newsletter.privacy", language)}</p>
        </motion.div>
      </div>
    </section>
  )
}
