"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Phone, X, Send, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 bg-black text-white p-0 w-72 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
          >
            {/* Header Area */}
            <div className="bg-[#E71609] p-6 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/80 block mb-1">
                  Conciergerie
                </span>
                <h3 className="text-lg font-bold uppercase tracking-tighter leading-none">
                  Studio Contact
                </h3>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:rotate-90 transition-transform duration-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Links Area */}
            <div className="p-2">
              <div className="space-y-1">
                <a
                  href="tel:+21629378089"
                  className="group flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Phone size={16} className="text-[#E71609]" />
                    <span className="text-[11px] uppercase tracking-widest font-bold">Ligne Directe</span>
                  </div>
                  <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>

                <a
                  href="https://wa.me/21629378089"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Send size={16} className="text-[#E71609]" />
                    <span className="text-[11px] uppercase tracking-widest font-bold">WhatsApp Business</span>
                  </div>
                  <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>

                <a
                  href="mailto:contact@forumautogabes.com"
                  className="group flex items-center justify-between p-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <MessageSquare size={16} className="text-[#E71609]" />
                    <span className="text-[11px] uppercase tracking-widest font-bold">Demande Email</span>
                  </div>
                  <ArrowRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </a>
              </div>
            </div>

            {/* Availability Footer */}
            <div className="border-t border-white/5 p-4 bg-white/5">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">
                  Agents disponibles en ligne
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-16 h-16 bg-black border border-white/10 hover:border-[#E71609] transition-all duration-500"
      >
        {/* Animated Background on Hover */}
        <div className="absolute inset-0 bg-[#E71609] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500" />
        
        {/* Icons */}
        <div className="relative z-10 text-white">
          {isOpen ? (
            <X size={24} strokeWidth={1.5} />
          ) : (
            <MessageSquare size={24} strokeWidth={1.5} />
          )}
        </div>

        {/* Floating Label (Luxury Detail) */}
        {!isOpen && (
          <span className="absolute right-20 text-[10px] uppercase tracking-[0.4em] text-black font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none whitespace-nowrap">
            Contactez-nous
          </span>
        )}
      </button>
    </div>
  );
}