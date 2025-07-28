"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { galleryImages } from "../data/galleryImages";

const categories = ["Showroom", "Atelier", "Events", "Magasin", "Labo"];

const IMAGES_PER_PAGE = 6;

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page to 1 when category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const filteredImages = useMemo(() => {
    return galleryImages.filter((img) => img.category === selectedCategory);
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
