import type React from "react";
import Link from "next/link";
import { ArrowLeft, type LucideIcon } from "lucide-react";

interface ServiceLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export default function ServiceLayout({
  title,
  description,
  icon: Icon,
  children,
}: ServiceLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div
        className=" text-white"
        style={{
          backgroundImage: "url('/images/bgbanner.jpg')",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center mb-6">
            <div className="bg-white/20 p-4 rounded-lg mr-6">
              <Icon className="h-12 w-12" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
              <p className="text-xl text-blue-100 max-w-3xl">{description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      {children}
    </div>
  );
}
