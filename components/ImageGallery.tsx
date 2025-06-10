"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Showroom principal",
    category: "Showroom",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Véhicule de luxe",
    category: "Véhicules",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Atelier de réparation",
    category: "Atelier",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Espace d'accueil",
    category: "Showroom",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Véhicule sportif",
    category: "Véhicules",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Zone de livraison",
    category: "Services",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Véhicule familial",
    category: "Véhicules",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Bureau conseil",
    category: "Services",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Parking client",
    category: "Showroom",
  },
];

const categories = ["Tous", "Showroom", "Véhicules", "Atelier", "Services"];

export default function ImageGallery() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages =
    selectedCategory === "Tous"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (imageId: number) => {
    setSelectedImage(imageId);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (selectedImage === null) return;

    const currentIndex = filteredImages.findIndex(
      (img) => img.id === selectedImage
    );
    let newIndex;

    if (direction === "prev") {
      newIndex =
        currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex =
        currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }

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
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => openLightbox(image.id)}
            >
              <div className="relative">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
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

        {/* Lightbox */}
        {selectedImage && selectedImageData && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
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

              <img
                src={selectedImageData.src || "/placeholder.svg"}
                alt={selectedImageData.alt}
                className="max-w-full max-h-full object-contain"
              />

              <div className="absolute bottom-4 left-4 text-black">
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
