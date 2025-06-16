import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Gallery from "@/components/gallery";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Stats from "@/components/stats";
import Appointment from "@/components/appointment";
import FloatingContact from "@/components/floating-contact";
import Newsletter from "@/components/newsletter";
import Showroom from "@/components/showroom";
import Testimonials from "@/components/testimonials";
import AutomobileCarousel from "@/components/automobile-carousel";
import ClientProvider from "@/components/client-provider";

export default function Home() {
  return (
    <ClientProvider>
      <div className="min-h-screen bg-white transition-colors duration-300">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <AutomobileCarousel />
          <Showroom />
          <Stats />
          <Testimonials />
          {/* <Appointment /> */}
          <Newsletter />
          <Contact />
        </main>
        <Footer />
        <FloatingContact />
      </div>
    </ClientProvider>
  );
}
