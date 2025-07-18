"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, Mail, MapPin, Facebook } from "lucide-react";
import { useLanguage } from "@/contexts/language-context";
import { t } from "@/lib/i18n";
import SuccessMessage from "@/components/SuccessMessage";

export default function Contact() {
  const { language, dir } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/contact-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Contact form submitted:", formData);
        setFormData({ name: "", email: "", message: "" });
        setShowSuccess(true);
      } else {
        console.error("Failed to send contact email:", response.status);
        alert("Failed to send contact email. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Error submitting contact form. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          {showSuccess && (
            <SuccessMessage message="Message envoyé avec succès!" />
          )}
          <div className="inline-block rounded-lg bg-[#E71609] px-3 py-1 text-sm text-white mb-4 dark:bg-red-900 dark:text-red-200">
            {t("contact.us", language)}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-[#E71609] dark:text-red-500">
            {t("contact.us", language)}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Nous sommes à votre disposition pour répondre à toutes vos
            questions.
          </p>
        </div>

        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
          style={{ direction: dir }}
        >
          <div className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("contact.name", language)}</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t("contact.name", language)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("contact.email", language)}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t("contact.email", language)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">
                  {t("contact.message", language)}
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t("contact.message", language)}
                  rows={5}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-[#E71609] hover:bg-red-700 text-white"
              >
                {t("contact.send", language)}
              </Button>
            </form>

            <div className="space-y-4">
              <div
                className="flex items-start gap-3"
                style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}
              >
                <MapPin className="h-5 w-5 text-[#E71609] mt-1" />
                <div>
                  <h3 className="font-semibold">
                    {t("contact.address", language)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Route nationale N1 bouchama Gabes
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-3"
                style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}
              >
                <Phone className="h-5 w-5 text-[#E71609] mt-1" />
                <div>
                  <h3 className="font-semibold">
                    {t("contact.phone", language)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    +216 29 378 089
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    +216 29 514 066
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-3"
                style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}
              >
                <Mail className="h-5 w-5 text-[#E71609] mt-1" />
                <div>
                  <h3 className="font-semibold">
                    {t("contact.email", language)}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    contact@forumautogabes.com
                  </p>
                </div>
              </div>
              <div
                className="flex items-start gap-3"
                style={{ flexDirection: dir === "rtl" ? "row-reverse" : "row" }}
              >
                <Facebook className="h-5 w-5 text-[#E71609] mt-1" />
                <div>
                  <h3 className="font-semibold">Facebook</h3>
                  <a
                    href="https://www.facebook.com/profile.php?id=61550915821033&locale=fr_FR"
                    className="text-[#E71609] hover:underline"
                  >
                    Forum Auto Gabès
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="h-[400px] lg:h-full min-h-[400px] rounded-xl overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.8760042593576!2d10.068591175170155!3d33.8985178258327!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x125571f45c5f8bcb%3A0x7d4f2e0b0abddec5!2sFORUM%20AUTO%20Gab%C3%A8s!5e1!3m2!1sfr!2stn!4v1749810941861!5m2!1sfr!2stn"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
