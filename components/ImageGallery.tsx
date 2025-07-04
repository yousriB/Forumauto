"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  // Showroom images
  {
    id: 1,
    src: "/gallery/showroom/1.jpg",
    alt: "Showroom 1",
    category: "Showroom",
  },
  {
    id: 2,
    src: "/gallery/showroom/2.jpg",
    alt: "Showroom 2",
    category: "Showroom",
  },
  {
    id: 3,
    src: "/gallery/showroom/3.jpg",
    alt: "Showroom 3",
    category: "Showroom",
  },
  {
    id: 4,
    src: "/gallery/showroom/4.jpg",
    alt: "Showroom 4",
    category: "Showroom",
  },
  {
    id: 5,
    src: "/gallery/showroom/5.jpg",
    alt: "Showroom 5",
    category: "Showroom",
  },
  {
    id: 6,
    src: "/gallery/showroom/6.jpg",
    alt: "Showroom 6",
    category: "Showroom",
  },
  // Véhicules images
  {
    id: 7,
    src: "/gallery/vehicules/1.jpg",
    alt: "Véhicule 1",
    category: "Véhicules",
  },
  {
    id: 8,
    src: "/gallery/vehicules/2.jpg",
    alt: "Véhicule 2",
    category: "Véhicules",
  },
  {
    id: 9,
    src: "/gallery/vehicules/3.jpg",
    alt: "Véhicule 3",
    category: "Véhicules",
  },
  {
    id: 10,
    src: "/gallery/vehicules/4.jpg",
    alt: "Véhicule 4",
    category: "Véhicules",
  },
  {
    id: 11,
    src: "/gallery/vehicules/5.jpg",
    alt: "Véhicule 5",
    category: "Véhicules",
  },
  {
    id: 12,
    src: "/gallery/vehicules/6.jpg",
    alt: "Véhicule 6",
    category: "Véhicules",
  },
  {
    id: 13,
    src: "/gallery/vehicules/7.jpg",
    alt: "Véhicule 7",
    category: "Véhicules",
  },
  // Atelier images
  {
    id: 14,
    src: "/gallery/atelier/1.jpg",
    alt: "Atelier 1",
    category: "Atelier",
  },
  {
    id: 15,
    src: "/gallery/atelier/2.jpg",
    alt: "Atelier 2",
    category: "Atelier",
  },
  {
    id: 16,
    src: "/gallery/atelier/3.jpg",
    alt: "Atelier 3",
    category: "Atelier",
  },
  {
    id: 17,
    src: "/gallery/atelier/4.jpg",
    alt: "Atelier 4",
    category: "Atelier",
  },
  {
    id: 18,
    src: "/gallery/atelier/5.jpg",
    alt: "Atelier 5",
    category: "Atelier",
  },
  {
    id: 19,
    src: "/gallery/atelier/6.jpg",
    alt: "Atelier 6",
    category: "Atelier",
  },
  {
    id: 20,
    src: "/gallery/atelier/7.jpg",
    alt: "Atelier 7",
    category: "Atelier",
  },
  // Events images
  { id: 21, src: "/gallery/events/1.jpg", alt: "Event 1", category: "Events" },
  { id: 22, src: "/gallery/events/2.jpg", alt: "Event 2", category: "Events" },
  { id: 23, src: "/gallery/events/3.jpg", alt: "Event 3", category: "Events" },
  { id: 24, src: "/gallery/events/4.jpg", alt: "Event 4", category: "Events" },
  { id: 25, src: "/gallery/events/5.jpg", alt: "Event 5", category: "Events" },
  { id: 26, src: "/gallery/events/6.jpg", alt: "Event 6", category: "Events" },
  // Services (empty for now)
];

const categories = [
  "Tous",
  "Showroom",
  "Véhicules",
  "Atelier",
  "Services",
  "Events",
];

const IMAGES_PER_PAGE = 6;

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredImages = useMemo(() => {
    return selectedCategory === "Tous"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);
  }, [selectedCategory]);

  const totalPages = Math.ceil(filteredImages.length / IMAGES_PER_PAGE);

  const paginatedImages = useMemo(() => {
    const startIndex = (currentPage - 1) * IMAGES_PER_PAGE;
    return filteredImages.slice(startIndex, startIndex + IMAGES_PER_PAGE);
  }, [filteredImages, currentPage]);

  const openLightbox = (imageId: number) => setSelectedImage(imageId);
  const closeLightbox = () => setSelectedImage(null);

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;
    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage
    );
    const newIndex =
      direction === "prev"
        ? (currentIndex - 1 + filteredImages.length) % filteredImages.length
        : (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[newIndex].id);
  };

  const selectedImageData = selectedImage
    ? filteredImages.find((img) => img.id === selectedImage)
    : null;

  return (
    <section className="py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === category
                  ? "bg-[#E71609] text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => openLightbox(image.id)}
            >
              <div className="relative w-full h-64">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Voir en grand
                  </span>
                </div>
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#E71609] text-white px-3 py-1 rounded-full text-sm">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-10">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 border rounded ${
                currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              Précédent
            </button>

            <span className="text-gray-700">
              Page {currentPage} / {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`px-4 py-2 border rounded ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              Suivant
            </button>
          </div>
        )}

        {/* Lightbox */}
        {selectedImage && selectedImageData && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl w-full max-h-[90vh]">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              >
                <X className="h-8 w-8" />
              </button>

              <button
                onClick={() => navigateImage("prev")}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronLeft className="h-8 w-8" />
              </button>

              <button
                onClick={() => navigateImage("next")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
              >
                <ChevronRight className="h-8 w-8" />
              </button>

              <div className="relative w-full h-[75vh]">
                <Image
                  src={selectedImageData.src}
                  alt={selectedImageData.alt}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-lg font-medium">{selectedImageData.alt}</p>
                <p className="text-sm opacity-75">
                  {selectedImageData.category}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
