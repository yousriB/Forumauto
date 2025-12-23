"use client";

import { Facebook, Instagram, Linkedin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/i18n";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language, dir } = useLanguage();
  const router = useRouter();

  const handleNav = (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      if (window.location.pathname !== "/") {
        router.push("/" + href);
      } else {
        const id = href.replace("#", "");
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        window.history.pushState({}, "", href);
      }
    } else {
      router.push(href);
    }
  };

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Background Image with Studio Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-30 grayscale"
        style={{
          backgroundImage: "url('/images/bgbanner.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

      <div className="container relative z-10 pt-24 pb-12 px-6">
        <div 
          className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-8 mb-20"
          style={{ direction: dir }}
        >
          {/* Brand Identity Section */}
          <div className="md:col-span-4 space-y-8">
            <div className="space-y-4">
               <h2 className="text-3xl font-bold tracking-tighter uppercase italic">
                Forum <span className="text-[#E71609]">Auto</span>
              </h2>
              <p className="text-white/50 font-light text-sm max-w-xs leading-relaxed tracking-wide">
                {t("footer.tagline", language)}
              </p>
            </div>
            
            <div className="flex gap-6">
              <SocialIcon href="https://www.facebook.com/profile.php?id=61550915821033&locale=fr_FR" icon={<Facebook size={18} />} />
              <SocialIcon href="https://www.instagram.com/forum_auto_gabes/" icon={<Instagram size={18} />} />
              <SocialIcon href="https://www.linkedin.com/company/103198669/admin/dashboard/" icon={<Linkedin size={18} />} />
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E71609]">
              {t("footer.quick.links", language)}
            </h3>
            <ul className="space-y-4">
              <FooterLink href="#hero" onClick={handleNav("#hero")}>{t("home", language)}</FooterLink>
              <FooterLink href="#about" onClick={handleNav("#about")}>{t("about", language)}</FooterLink>
              <FooterLink href="#services" onClick={handleNav("#services")}>{t("services", language)}</FooterLink>
              <FooterLink href="/pages/gallery" onClick={handleNav("/pages/gallery")}>{t("gallery", language)}</FooterLink>
            </ul>
          </div>

          {/* Expertises Section */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E71609]">
              {t("services.title", language)}
            </h3>
            <ul className="space-y-4">
              <FooterLink href="/pages/logos" onClick={handleNav("/pages/logos")}>Véhicules Neufs</FooterLink>
              <FooterLink href="/pages/atelier" onClick={handleNav("/pages/atelier")}>Diagnostic Expert</FooterLink>
              <FooterLink href="/pages/atelier" onClick={handleNav("/pages/atelier")}>Réparation Mécanique</FooterLink>
              <FooterLink href="/pages/atelier" onClick={handleNav("/pages/atelier")}>Atelier Carrosserie</FooterLink>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="md:col-span-3 space-y-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#E71609]">
              {t("contact.us", language)}
            </h3>
            <address className="not-italic space-y-4">
              <div className="group cursor-pointer">
                <p className="text-[10px] uppercase text-white/30 tracking-widest mb-1">Localisation</p>
                <p className="text-sm font-light text-white/80 group-hover:text-white transition-colors">Route nationale N1, Bouchama, Gabès</p>
              </div>
              <div className="group cursor-pointer">
                <p className="text-[10px] uppercase text-white/30 tracking-widest mb-1">Assistance</p>
                <p className="text-sm font-light text-white/80 group-hover:text-white transition-colors">+216 29 378 089</p>
                <p className="text-sm font-light text-white/80 group-hover:text-white transition-colors">+216 29 514 066</p>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] uppercase tracking-widest text-white/30">
            &copy; {currentYear} Forum Auto Gabès. {t("footer.rights", language)}
          </p>
          
          <div className="flex gap-8">
            <a href="#" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">
              {t("footer.privacy", language)}
            </a>
            <a href="#" className="text-[10px] uppercase tracking-widest text-white/30 hover:text-white transition-colors">
              {t("footer.terms", language)}
            </a>
          </div>
        </div>
      </div>

      {/* Luxury Brand watermark (Optional) */}
      <div className="absolute -bottom-10 -right-10 text-[15rem] font-bold text-white/[0.02] select-none pointer-events-none uppercase italic">
        Forum
      </div>
    </footer>
  );
}

function FooterLink({ children, href, onClick }: { children: React.ReactNode; href: string; onClick: any }) {
  return (
    <li>
      <a
        href={href}
        onClick={onClick}
        className="text-sm font-light text-white/50 hover:text-white transition-all flex items-center group"
      >
        <span className="relative">
          {children}
          <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#E71609] transition-all group-hover:w-full" />
        </span>
        <ArrowUpRight size={12} className="ml-2 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all text-[#E71609]" />
      </a>
    </li>
  );
}

function SocialIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#E71609] hover:bg-[#E71609] transition-all duration-500"
    >
      {icon}
    </a>
  );
}