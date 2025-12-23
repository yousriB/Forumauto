"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Facebook, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/i18n";
import SuccessMessage from "@/components/SuccessMessage";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const { language, dir } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({ name: "", email: "", message: "" });
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Luxury Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-8 h-[2px] bg-[#e71810]"></span>
              <span className="text-[#e71810] font-bold uppercase tracking-[0.3em] text-xs">Conciergerie</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-light tracking-tight text-slate-900 leading-none">
              Prendre <span className="font-bold">Contact</span>
            </h2>
          </div>
        </div>

      

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start" style={{ direction: dir }}>
          
          {/* Contact Details - Left Side */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-10">
            <ContactInfoItem 
              icon={MapPin} 
              title={t("contact.address", language)} 
              detail="Route nationale N1 bouchama, Gabès" 
            />
            <ContactInfoItem 
              icon={Phone} 
              title={t("contact.phone", language)} 
              detail="+216 29 378 089 / +216 29 514 066" 
            />
            <ContactInfoItem 
              icon={Mail} 
              title={t("contact.email", language)} 
              detail="contact@forumautogabes.com" 
            />
            <div className="flex items-center gap-4 pt-4 border-t border-slate-100 lg:border-none">
              <a href="https://facebook.com" className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-[#e71810] hover:bg-red-50 transition-all duration-300">
                <Facebook size={20} />
              </a>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Suivez-nous sur Facebook</span>
            </div>
          </div>

          {/* Form Side - Enhanced Visibility */}
          <div className="lg:col-span-8">
            <div className="bg-white border border-slate-100 p-8 md:p-14 rounded-[2rem] shadow-sm relative">
              <AnimatePresence>
                {showSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="mb-8"
                  >
                    <SuccessMessage message="Message envoyé avec succès!" />
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <FloatingInput 
                    label={t("contact.name", language)} 
                    id="name" name="name" value={formData.name} onChange={handleChange} 
                  />
                  <FloatingInput 
                    label={t("contact.email", language)} 
                    id="email" name="email" type="email" value={formData.email} onChange={handleChange} 
                  />
                </div>
                <div className="relative">
                  <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-4 block">
                    {t("contact.message", language)}
                  </label>
                  <Textarea
                    id="message" name="message" value={formData.message} onChange={handleChange}
                    className="min-h-[180px] bg-slate-50 border-slate-300  rounded-2xl p-6 focus-visible:ring-1 focus-visible:ring-[#e71810]/100 transition-all resize-none placeholder:text-slate-300"
                    required
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    className="w-full md:w-auto px-16 h-16 bg-[#e71810] hover:bg-slate-900 text-white rounded-full transition-all duration-500 group flex items-center gap-4 shadow-xl shadow-red-500/10"
                  >
                    <span className="font-bold uppercase tracking-[0.2em] text-xs">{t("contact.send", language)}</span>
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
          {/* Big Map Component */}
        <div className="w-full h-[450px] md:h-[550px] rounded-sm overflow-hidden mt-20 relative shadow-2xl shadow-slate-200">
          <div className="absolute inset-0 bg-slate-900/5 pointer-events-none z-10" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.8760042593576!2d10.068591175170155!3d33.8985178258327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x125571f45c5f8bcb%3A0x7d4f2e0b0abddec5!2sFORUM%20AUTO%20Gab%C3%A8s!5e1!3m2!1sfr!2stn!4v1749810941861!5m2!1sfr!2stn"
            width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"
            className="grayscale contrast-110 brightness-90 hover:grayscale-0 transition-all duration-1000 ease-in-out"
          ></iframe>
        </div>
      </div>
    </section>
  );
}

function ContactInfoItem({ icon: Icon, title, detail }: { icon: any, title: string, detail: string }) {
  return (
    <div className="flex items-start gap-5 group">
      <div className="w-12 h-12 shrink-0 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#e71810] group-hover:text-white transition-all duration-500 shadow-sm">
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">{title}</h3>
        <p className="text-slate-900 font-bold leading-relaxed text-lg">{detail}</p>
      </div>
    </div>
  );
}

function FloatingInput({ label, id, ...props }: any) {
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor={id} className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
        {label}
      </label>
      <Input
        id={id}
        {...props}
        className="bg-slate-50 border-slate-300 rounded-xl h-14 px-6 focus-visible:ring-1 focus-visible:ring-[#E71810]/100 transition-all placeholder:text-slate-200"
        required
      />
    </div>
  );
}