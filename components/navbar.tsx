"use client"
import { useState, useEffect } from "react"
import { Menu, X, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/contexts/language-context"
import { t } from "@/lib/i18n"
import { useRouter, usePathname } from "next/navigation"  // Import usePathname

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language, setLanguage, dir } = useLanguage()
  const router = useRouter()
  const pathname = usePathname() // Use usePathname to get the current path

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = [
    { name: t("home", language), href: "#hero" },
    { name: t("services", language), href: "#services" },
    { name: t("nosreferences", language), href: "#gallery" },
    { name: t("gallery", language), href: "/pages/gallery" }, // External page
    { name: t("contact", language), href: "#contact" },
  ]

  const handleLinkClick = (href: string) => {
    if (href.startsWith("/")) {
      router.push(href); // Navigate to a full page
    } else {
      if (pathname !== '/') {
        router.push('/');
        setTimeout(() => {
          document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };
  

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-black backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b shadow-sm"
          : "bg-black",
      )}
    >
      <div className="container flex h-20 items-center justify-between">
        <div className="flex items-center gap-2 w-44">
          <a href="/" className="">
           <img src="/images/logoo.png" alt="" />
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6" style={{ direction: dir }}>
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleLinkClick(item.href)}
              className="text-lg font-medium text-gray-100 transition-colors hover:text-red-600"
            >
              {item.name}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <Globe className="h-4 w-4 text-gray-300" />
                <span className="sr-only">Toggle language</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage("fr")}>Français</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("ar")}>العربية</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage("en")}>English</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button  size="sm" className="bg-red-600 hover:bg-red-700 text-white ml-2" onClick={() => handleLinkClick("#appointment")}>
            {t("appointment.title", language)}
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center gap-2 group">
          <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle Menu">
            {isOpen ? <X className="h-6 w-6 text-white group-hover:text-red-600" /> : <Menu className="h-6 w-6 text-white group-hover:text-red-600" />}
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-white",
            isOpen ? "slide-in-from-top-2" : "hidden",
          )}
          style={{ direction: dir }}
        >
          <div className="relative z-20 grid gap-6 rounded-md p-4">
            <nav className="grid grid-flow-row auto-rows-max text-sm">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleLinkClick(item.href)}
                  className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:bg-gray-100"
                >
                  {item.name}
                </button>
              ))}
              <div className="mt-4 border-t pt-4">
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4" />
                  <span className="text-sm font-medium text-gray-600">{t("language", language)}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={language === "fr" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("fr")}
                    className={language === "fr" ? "bg-red-600 hover:bg-red-700" : ""}
                  >
                    FR
                  </Button>
                  <Button
                    variant={language === "ar" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("ar")}
                    className={language === "ar" ? "bg-red-600 hover:bg-red-700" : ""}
                  >
                    AR
                  </Button>
                  <Button
                    variant={language === "en" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage("en")}
                    className={language === "en" ? "bg-red-600 hover:bg-red-700" : ""}
                  >
                    EN
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
