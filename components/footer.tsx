"use client"

import { Facebook, MessageCircle } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/i18n"
import ScrollLink from "@/components/scroll-link"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { language, dir } = useLanguage()

  return (
    <footer className="bg-red-600 dark:bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8" style={{ direction: dir }}>
          <div className="space-y-4" style={{ textAlign: dir === "rtl" ? "right" : "left" }}>
            <h3 className="text-xl font-bold text-white">Forum Auto Gabès</h3>
            <p className="text-sm">{t("footer.tagline", language)}</p>
            <div className="flex space-x-4" style={{ justifyContent: dir === "rtl" ? "flex-end" : "flex-start" }}>
              <a href="https://www.facebook.com/profile.php?id=61550915821033&locale=fr_FR" className="text-white hover:text-red-200">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              {/* <a href="https://wa.me/21629378089" className="text-white hover:text-red-200">
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a> */}
            </div>
          </div>

          <div style={{ textAlign: dir === "rtl" ? "right" : "left" }}>
            <h3 className="text-lg font-semibold text-white mb-4">{t("footer.quick.links", language)}</h3>
            <ul className="space-y-2">
              <li>
                <ScrollLink href="#hero" className="text-red-100 hover:text-white">
                  {t("home", language)}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink href="#about" className="text-red-100 hover:text-white">
                  {t("about", language)}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink href="#services" className="text-red-100 hover:text-white">
                  {t("services", language)}
                </ScrollLink>
              </li>
              <li>
                <ScrollLink href="#gallery" className="text-red-100 hover:text-white">
                  {t("gallery", language)}
                </ScrollLink>
              </li>
            </ul>
          </div>

          <div style={{ textAlign: dir === "rtl" ? "right" : "left" }}>
            <h3 className="text-lg font-semibold text-white mb-4">{t("services.title", language)}</h3>
            <ul className="space-y-2">
              <li>
                <ScrollLink href="#services" className="text-red-100 hover:text-white">
                Vente de véhicule neuf
                </ScrollLink>
              </li>
              <li>
                <ScrollLink href="#services" className="text-red-100 hover:text-white">
                Diagnostic automobile
                </ScrollLink>
              </li>
              <li>
                <ScrollLink href="#services" className="text-red-100 hover:text-white">
                Réparation mécanique
                </ScrollLink>
              </li>
              <li>
                <ScrollLink href="#services" className="text-red-100 hover:text-white">
                Réparation électrique
                </ScrollLink>
              </li>
              <li>
                <ScrollLink href="#services" className="text-red-100 hover:text-white">
                Carrosserie
                </ScrollLink>
              </li>
            </ul>
          </div>

          <div style={{ textAlign: dir === "rtl" ? "right" : "left" }}>
            <h3 className="text-lg font-semibold text-white mb-4">{t("contact.us", language)}</h3>
            <address className="not-italic text-sm space-y-2 text-red-100">
              <p>Route nationale N1 bouchama Gabes</p>
              <p>+216 29 378 089</p>
              <p>+216 29 514 066</p>
              <p>contact.forumautogabes@gmail.com</p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-red-200">
            &copy; {currentYear} Forum Auto Gabès. {t("footer.rights", language)}
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <ScrollLink href="#" className="text-xs text-red-200 hover:text-white">
              {t("footer.privacy", language)}
            </ScrollLink>
            <ScrollLink href="#" className="text-xs text-red-200 hover:text-white">
              {t("footer.terms", language)}
            </ScrollLink>
          </div>
        </div>
      </div>
    </footer>
  )
}
