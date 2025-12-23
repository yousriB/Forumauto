import ImageGallery from "@/components/ImageGallery";
import ServiceLayout from "@/components/ServiceLayout";
import { Image as ImageIcon, PlayCircle, Camera } from "lucide-react";

export default function GalleryPage() {
  return (
    <ServiceLayout
      title="Galerie Studio"
      description="Une immersion visuelle au cœur de notre expertise. L'esthétique de la performance capturée en haute définition."
      icon={ImageIcon}
    >
      {/* SECTION 01: CURATED COLLECTIONS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-xl">
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#E71609] font-bold mb-4 block">
                Exposition Visuelle
              </span>
              <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-black uppercase leading-[0.9]">
                L'art du <br />
                <span className="italic font-light text-gray-400">détail automobile</span>
              </h2>
            </div>
            <div className="flex gap-4 border-b border-black/10 pb-2">
               <button className="text-[10px] uppercase tracking-widest font-bold text-black border-b-2 border-[#E71609] pb-2">Tout</button>
               <button className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors pb-2">Showroom</button>
               <button className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors pb-2">Atelier</button>
               <button className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors pb-2">Événements</button>
            </div>
          </div>

          {/* This wrapper ensures the ImageGallery component sits within our luxury grid constraints */}
          <div className="relative group">
            <div className="absolute -top-10 -left-10 text-[120px] font-bold text-black/[0.02] select-none pointer-events-none uppercase tracking-tighter">
              Gallery
            </div>
            <ImageGallery />
          </div>
        </div>
      </section>

      {/* SECTION 03: STUDIO INSTAGRAM FEED / CALL TO ACTION */}
      <section className="py-24 bg-white border-t border-black/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <Camera className="mx-auto mb-8 text-gray-200" size={48} strokeWidth={1} />
           <h3 className="text-xl font-bold uppercase tracking-[0.3em] mb-4">Suivez l'Excellence</h3>
           <p className="text-gray-400 font-light mb-12">Rejoignez notre communauté sur les réseaux pour des exclusivités quotidiennes.</p>
           <a 
            href="#" 
            className="inline-block border border-black px-12 py-5 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black hover:text-white transition-all"
           >
             Instagram Feed
           </a>
        </div>
      </section>
    </ServiceLayout>
  );
}