import ImageGallery from "@/components/ImageGallery";
import VideoSection from "@/components/VideoSection";
import ServiceLayout from "@/components/ServiceLayout";
import { Image } from "lucide-react";

export default function GalleryPage() {
  return (
    <ServiceLayout
      title="Galerie"
      description="Découvrez notre showroom, nos véhicules et nos installations à travers notre galerie photos et vidéos."
      icon={Image}
    >
      {/* Image Gallery */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block rounded-full bg-[#E71609] px-4 py-2 text-sm font-medium text-white mb-4">
              Photos
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl mb-4 text-[#E71609]">
              Notre Galerie Photos
            </h2>
            <p className="text-lg text-gray-600">
              Explorez notre collection de photos mettant en valeur notre
              showroom et nos véhicules.
            </p>
          </div>
          <ImageGallery />
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block rounded-full bg-[#E71609] px-4 py-2 text-sm font-medium text-white mb-4">
              Vidéos
            </div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl mb-4 text-[#E71609]">
              Nos Vidéos
            </h2>
            <p className="text-lg text-gray-600">
              Découvrez nos vidéos présentant nos installations et nos véhicules
              en action.
            </p>
          </div>
          <VideoSection />
        </div>
      </section>
    </ServiceLayout>
  );
}
