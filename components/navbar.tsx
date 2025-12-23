"use client";

import { useState, useEffect } from "react";
import {
  Menu,
  X,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/i18n";
import { useRouter, usePathname } from "next/navigation";

// ... existing imports
import { createPortal } from "react-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { language, dir } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navItems = [
    { name: t("home", language), href: "#hero" },
    {
      name: t("services", language),
      href: "#services",
      children: [
        { name: t("Atelier", language), href: "/pages/atelier" },
        { name: t("Magasin des pièces de rechange", language), href: "/pages/magasin" },
        { name: t("Service assurance", language), href: "/pages/assurence" },
      ],
    },
    { name: t("Vente véhicule neuf", language), href: "/pages/logos" },
    { name: t("gallery", language), href: "/pages/gallery" },
    { name: t("contact", language), href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    if (href.startsWith("/")) {
      router.push(href);
    } else {
      if (pathname !== "/") {
        router.push("/");
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isHome = pathname === "/";
  // Always dark background if not on home, otherwise depends on scroll
  const isDarkBackground = !isHome || scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500 ease-in-out",
          isDarkBackground
            ? "bg-black/90 backdrop-blur-lg border-b border-white/10 h-16"
            : "bg-transparent h-24"
        )}
      >
        <div className="container mx-auto px-6 h-full flex items-center justify-between">
          {/* Brand/Socials Section */}
          <div className="flex items-center gap-8">
            <div className="flex items-center">
              <a href="/" className="transition-transform duration-300 hover:scale-105">
               <h2 className="text-3xl font-bold tracking-tighter uppercase italic text-white">
                  Forum <span className="text-[#E71609]">Auto</span>
                </h2>
               
              </a>
            </div>
            
            <div className="hidden lg:flex items-center gap-5 border-l border-white/20 pl-8">
              <SocialLink href="https://www.facebook.com/profile.php?id=61550915821033&locale=fr_FR" icon={<Facebook size={16} />} />
              <SocialLink href="https://www.instagram.com/forum_auto_gabes/" icon={<Instagram size={16} />} />
              <SocialLink href="https://www.linkedin.com/company/103198669/admin/dashboard/" icon={<Linkedin size={16} />} />
            </div>
          </div>

          {/* Desktop Center Navigation */}
          <nav className="hidden md:flex items-center gap-2" style={{ direction: dir }}>
            {navItems.map((item) =>
              item.children ? (
                <div key={item.name} className="relative group">
                  <button className="text-[11px] uppercase tracking-[0.2em] font-bold py-2 px-4 text-white/70 hover:text-white transition-colors flex items-center gap-1 group">
                    {item.name}
                    <ChevronDown className="h-3 w-3 transition-transform duration-300 group-hover:rotate-180 text-[#E71609]" />
                  </button>
                  <div className="absolute left-0 top-[100%] pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <div className="w-64 bg-black/95 border border-white/10 backdrop-blur-xl p-2 shadow-2xl">
                      {item.children.map((child) => (
                        <button
                          key={child.name}
                          onClick={() => handleLinkClick(child.href)}
                          className="w-full text-left px-4 py-3 text-[10px] uppercase tracking-widest text-white/60 hover:text-[#E71609] hover:bg-white/5 transition-all"
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.href)}
                  className="text-[11px] uppercase tracking-[0.2em] font-bold py-2 px-4 text-white/70 hover:text-white hover:text-[#E71609] transition-all relative after:content-[''] after:absolute after:bottom-0 after:left-4 after:w-0 after:h-[1px] after:bg-[#E71609] after:transition-all hover:after:w-1/2"
                >
                  {item.name}
                </button>
              )
            )}
          </nav>

          {/* Action Button */}
          <div className="hidden md:flex items-center">
            <Button
              onClick={() => handleLinkClick("/pages/rendevouz")}
              className="bg-transparent border border-white/30 hover:border-[#E71609] hover:bg-[#E71609] text-white text-[10px] uppercase tracking-[0.2em] font-bold px-6 py-5 rounded-md transition-all duration-500"
            >
              {t("appointment.title", language)}
            </Button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center z-[60]">
            <button
              onClick={toggleMenu}
              className="p-2 text-white hover:text-[#E71609] transition-colors"
            >
              {isOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Fullscreen Mobile Overlay - Rendered in Portal */}
      {mounted && createPortal(
        <div
          className={cn(
            "fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-700 ease-in-out md:hidden overflow-y-auto",
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
          )}
        >
          <div className="min-h-screen flex flex-col items-center justify-center p-6 pt-24 pb-12">
            <nav className="flex flex-col items-center gap-8 text-center w-full" style={{ direction: dir }}>
              {navItems.map((item, idx) => (
                <div key={item.name} style={{ transitionDelay: `${idx * 100}ms` }} className={cn("transition-all transform w-full", isOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0")}>
                  <button
                    onClick={() => !item.children && handleLinkClick(item.href)}
                    className="text-2xl uppercase tracking-[0.3em] font-light text-white hover:text-[#E71609] w-full"
                  >
                    {item.name}
                  </button>
                  {item.children && (
                    <div className="flex flex-col gap-3 mt-4 w-full">
                      {item.children.map((child) => (
                        <button
                          key={child.name}
                          onClick={() => handleLinkClick(child.href)}
                          className="text-sm uppercase tracking-widest text-white/50 hover:text-white py-2"
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button
                onClick={() => handleLinkClick("/pages/rendevouz")}
                className="mt-8 bg-[#E71609] text-white rounded-md px-12 py-7 text-xs font-bold uppercase tracking-widest w-full max-w-xs"
              >
                {t("appointment.title", language)}
              </Button>
            </nav>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-white/80 hover:text-[#E71609] transition-colors duration-300"
    >
      {icon}
    </a>
  );
}