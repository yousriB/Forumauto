"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Check, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/i18n";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { language } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/newsletter-subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setSubmitted(true);
        setEmail("");
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section className="relative py-24 overflow-hidden bg-[#0a0a0a]">
      {/* Background with subtle luxury treatment */}
      <div 
        className="absolute inset-0 z-0 opacity-20 grayscale transition-transform duration-[10s] hover:scale-110"
        style={{
          backgroundImage: "url('/images/bgbanner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-[#0a0a0a] z-0" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center text-center">
            {/* Minimalist Icon */}
            <div className="mb-8">
              <div className="relative flex items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-white/5">
                <Mail className="h-6 w-6 text-[#e71810]" strokeWidth={1.5} />
                <div className="absolute inset-0 rounded-full bg-[#e71810]/20 blur-xl scale-50" />
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-4 mb-10">
              <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white leading-none">
                Restez <span className="font-bold">Informé</span>
              </h2>
              <p className="text-slate-400 max-w-lg mx-auto text-sm md:text-base leading-relaxed tracking-wide">
                {t("newsletter.description", language)}
              </p>
            </div>

            <div className="w-full max-w-md">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex items-center justify-center space-x-3 text-white border border-[#e71810]/30 bg-[#e71810]/5 rounded-xl py-4 px-6"
                  >
                    <div className="bg-[#e71810] rounded-full p-1">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium tracking-wide">
                      {t("newsletter.thanks", language)}
                    </span>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="relative flex items-center p-1 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md focus-within:border-[#e71810]/50 transition-all duration-300"
                  >
                    <Input
                      type="email"
                      placeholder={t("newsletter.placeholder", language)}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-transparent border-none text-white h-12 px-6 placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                    <Button
                      type="submit"
                      className="bg-[#e71810] hover:bg-[#c6140d] text-white px-6 h-12 rounded-xl transition-all duration-300 group"
                    >
                      <span className="mr-2 hidden sm:inline">{t("newsletter.subscribe", language)}</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                )}
              </AnimatePresence>

              <p className="text-[10px] text-slate-500 mt-6 uppercase tracking-[0.2em] font-medium">
                {t("newsletter.privacy", language)}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}