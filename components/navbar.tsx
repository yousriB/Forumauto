"use client";
import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Globe,
  ChevronDown,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/i18n";
import { useRouter, usePathname } from "next/navigation"; // Import usePathname

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { language, dir } = useLanguage();
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current path

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { name: t("home", language), href: "#hero" },
    {
      name: t("services", language),
      href: "#services",
      children: [
        // { name: t("Vente vehicle neuf", language), href: "/pages/logos" },
        { name: t("Atelier", language), href: "/pages/atelier" },

        {
          name: t("Magasin des pièces de rechange", language),
          href: "/pages/magasin",
        },
        { name: t("Service assurance", language), href: "/pages/assurence" },
      ],
    },
    { name: t("Vente vehicle neuf", language), href: "/pages/logos" },
    { name: t("gallery", language), href: "/pages/gallery" },
    { name: t("contact", language), href: "#contact" },
  ];

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/")) {
      router.push(href); // Navigate to a full page
    } else {
      if (pathname !== "/") {
        router.push("/");
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-black backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b shadow-sm"
          : "bg-black"
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 sm:w-32 w-28">
            <a href="/" className="">
              <img src="/images/logoo.png" alt="" />
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#E71609]"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#E71609]"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-[#E71609]"
            >
              <Linkedin className="h-6 w-6" />
            </a>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6" style={{ direction: dir }}>
          {navItems.map((item) =>
            item.children ? (
              <div key={item.name} className="relative group">
                <button className="text-base font-medium p-4 text-gray-100 hover:text-[#E71609] flex items-center gap-1">
                  {item.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
                <div className="absolute hidden group-hover:block w-60 bg-white rounded shadow-lg py-1 mt-1 top-[90%] left-0">
                  {item.children.map((child) => (
                    <button
                      key={child.name}
                      onClick={() => handleLinkClick(child.href)}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-[#E71609]"
                    >
                      {child.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                key={item.name}
                onClick={() => handleLinkClick(item.href)}
                className="text-base font-medium text-gray-100 hover:text-[#E71609]"
              >
                {item.name}
              </button>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button
            size="sm"
            className="bg-[#E71609] hover:bg-red-700 text-white ml-2"
            onClick={() => handleLinkClick("#appointment")}
          >
            {t("appointment.title", language)}
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center gap-2 group">
          <button
            className="text-xl"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <X className="h-6 w-6 text-white group-hover:text-[#E71609]" />
            ) : (
              <Menu className="h-6 w-6 text-white group-hover:text-[#E71609]" />
            )}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-white",
            isOpen ? "slide-in-from-top-2" : "hidden"
          )}
          style={{ direction: dir }}
        >
          <div className="relative z-20 grid gap-6 rounded-md p-4">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {navItems.map((item) => (
                <div key={item.name}>
                  <button
                    onClick={() => !item.children && handleLinkClick(item.href)}
                    className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100"
                  >
                    {item.name}
                  </button>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <button
                          key={child.name}
                          onClick={() => handleLinkClick(child.href)}
                          className="w-full text-left text-sm text-gray-700 hover:text-[#E71609]"
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
