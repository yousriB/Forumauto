import ImageGallery from "@/components/ImageGallery";
import VideoSection from "@/components/VideoSection";

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Galerie</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre showroom, nos véhicules et nos installations à
              travers notre galerie photos et vidéos.
            </p>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      <ImageGallery />

      {/* Video Section */}
      <VideoSection />
    </div>
  );
}
