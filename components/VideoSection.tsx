"use client";

const videos = [
  {
    id: 1,
    title: "Visite Virtuelle du Showroom",
    description: "Découvrez notre showroom en visite virtuelle complète",
    thumbnail: "/placeholder.svg?height=300&width=500",
    embedId: "dQw4w9WgXcQ", // YouTube video ID
    type: "youtube",
  },
  {
    id: 2,
    title: "Présentation de Notre Atelier",
    description: "Découvrez nos installations et notre équipe technique",
    thumbnail: "/placeholder.svg?height=300&width=500",
    embedId: "dQw4w9WgXcQ",
    type: "youtube",
  },
  {
    id: 3,
    title: "Témoignages Clients",
    description: "Écoutez les retours de nos clients satisfaits",
    thumbnail: "/placeholder.svg?height=300&width=500",
    embedId: "dQw4w9WgXcQ",
    type: "youtube",
  },
];

export default function VideoSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vidéos de Présentation
          </h2>
          <p className="text-xl text-gray-600">
            Plongez dans l'univers de notre concession à travers nos vidéos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="bg-gray-50 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-colors">
                    <svg
                      className="w-8 h-8 ml-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {video.title}
                </h3>
                <p className="text-gray-600 mb-4">{video.description}</p>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors">
                  Regarder la vidéo →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Video */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vidéo à la Une
            </h3>
            <p className="text-gray-600">
              Découvrez notre dernière présentation
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative pb-9/16 h-0 overflow-hidden rounded-xl shadow-2xl">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="Vidéo de présentation"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ aspectRatio: "16/9" }}
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
