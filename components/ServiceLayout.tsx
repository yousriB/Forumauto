import type React from "react";
import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";

interface ServiceLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function  ServiceLayout({
  title,
  description,
  icon: Icon,
  children,
}: ServiceLayoutProps) {
  return (
    <div className="min-h-screen bg-white ">
     

      {/* Hero Header */}
      <div className="relative h-[60vh] flex items-center overflow-hidden bg-black">
        {/* Background Image with Studio Overlay */}
        <div 
          className="absolute inset-0 z-0 scale-105"
          style={{
            backgroundImage: "url('/images/bgbanner.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: "0.5"
          }}
        />
        
        {/* Architectural Grid Overlay */}
        <div className="absolute inset-0 z-10 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }} 
        />

        <div className="relative z-20 max-w-7xl mx-auto px-6 w-full ">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-[2px] w-12 bg-[#E71609]" />
                <span className="text-[10px] uppercase tracking-[0.5em] text-white font-bold">
                  {/* Expertise Studio */}
                </span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter leading-[0.9] mb-8">
                {title.split(' ').map((word, i) => (
                  <span key={i} className={i === 1 ? "italic font-light text-gray-400" : ""}>
                    {word}{" "}
                  </span>
                ))}
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 font-light max-w-xl leading-relaxed">
                {description}
              </p>
            </div>

            {/* Floating Icon Detail */}
            <div className="hidden md:block border border-white/10 p-8 backdrop-blur-sm">
              <Icon className="h-12 w-12 text-[#E71609] stroke-[1px]" />
            </div>
          </div>
        </div>
        
        {/* Bottom Detail Line */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white to-transparent z-20" />
      </div>

      {/* Page Content */}
      <main className="relative z-30 -mt-12">
        {children}
      </main>
    </div>
  );
}