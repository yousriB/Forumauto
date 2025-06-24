"use client";

import { Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/i18n";
import ScrollLink from "@/components/scroll-link";
import { useRouter } from "next/navigation";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language, dir } = useLanguage();
  const router = useRouter();

  // Helper for navigation
  const handleNav =
    (href: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <footer
      className="text-white"
      style={{
        backgroundImage: "url('/images/bgbanner.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div className="container py-12">
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          style={{ direction: dir }}
        >
          <div
            className="space-y-4"
            style={{ textAlign: dir === "rtl" ? "right" : "left" }}
          >
            <h3 className="text-xl font-bold text-white">Forum Auto Gabès</h3>
            <p className="text-sm">{t("footer.tagline", language)}</p>
            <div
              className="flex space-x-4"
              style={{
                justifyContent: dir === "rtl" ? "flex-end" : "flex-start",
              }}
            >
              <a
                href="https://www.facebook.com/profile.php?id=61550915821033&locale=fr_FR"
                className="text-white hover:text-red-200"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/forum_auto_gabes/"
                className="text-white hover:text-red-200"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://www.linkedin.com/company/103198669/admin/dashboard/"
                className="text-white hover:text-red-200"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          <div style={{ textAlign: dir === "rtl" ? "right" : "left" }}>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("footer.quick.links", language)}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#hero"
                  className="text-red-100 hover:text-white"
                  onClick={handleNav("#hero")}
                >
                  {t("home", language)}
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-red-100 hover:text-white"
                  onClick={handleNav("#about")}
                >
                  {t("about", language)}
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-red-100 hover:text-white"
                  onClick={handleNav("#services")}
                >
                  {t("services", language)}
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-red-100 hover:text-white"
                  onClick={handleNav("/pages/gallery")}
                >
                  {t("gallery", language)}
                </a>
              </li>
            </ul>
          </div>

          <div style={{ textAlign: dir === "rtl" ? "right" : "left" }}>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("services.title", language)}
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/pages/logos"
                  className="text-red-100 hover:text-white"
                  onClick={handleNav("/pages/logos")}
                >
                  Vente de véhicule neuf
                </a>
              </li>
              <li>
                <a
                  href="/pages/atelier"
                  className="text-red-100 hover:text-white"
                  onClick={handleNav("/pages/atelier")}
                >
                  Diagnostic automobile
                </a>
              </li>
              <li>
                <a
                  href="/pages/atelier"
                  className="text-red-100 hover:text-white"
                  onClick={handleNav("/pages/atelier")}
                >
                  Réparation mécanique
                </a>
              </li>
              <li>
                <a
                  href="/pages/atelier"
                  className="text-red-100 hover:text-white"
                  onClick={handleNav("/pages/atelier")}
                >
                  Réparation électrique
                </a>
              </li>
              <li>
                <a
                  href="/pages/atelier"
                  className="text-red-100 hover:text-white"
                  onClick={handleNav("/pages/atelier")}
                >
                  Carrosserie
                </a>
              </li>
            </ul>
          </div>

          <div style={{ textAlign: dir === "rtl" ? "right" : "left" }}>
            <h3 className="text-lg font-semibold text-white mb-4">
              {t("contact.us", language)}
            </h3>
            <address className="not-italic text-sm space-y-2 text-red-100">
              <p>Route nationale N1 bouchama Gabes</p>
              <p>+216 29 378 089</p>
              <p>+216 29 514 066</p>
              <p>contact@forumautogabes.com</p>
            </address>
          </div>
        </div>
      </div>

      <div className="border-t border-white">
        <div className="container py-6 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-red-200">
            &copy; {currentYear} Forum Auto Gabès.{" "}
            {t("footer.rights", language)}
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <ScrollLink
              href="#"
              className="text-xs text-red-200 hover:text-white"
            >
              {t("footer.privacy", language)}
            </ScrollLink>
            <ScrollLink
              href="#"
              className="text-xs text-red-200 hover:text-white"
            >
              {t("footer.terms", language)}
            </ScrollLink>
          </div>
        </div>
      </div>
    </footer>
  );
}
