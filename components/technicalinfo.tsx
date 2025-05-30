import React from "react";

// Define the Car interface
interface Spec {
  label: string;
  value: string;
}

interface TechnicalSection {
  title: string;
  specs: Spec[];
}

interface Car {
  id: number;
  brand: string;
  version: string;
  model: string;
  price: number;
  image: string;
  technicalSpecs: TechnicalSection[];
}

const TechnicalInfo = ({ car }: { car: Car }) => {
  const { technicalSpecs } = car;

  return (
    <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-800">
          FICHE TECHNIQUE
          <br />
          {car.brand.toUpperCase()} {car.model.toUpperCase()}
        </h2>
        <div className="flex justify-center mt-2">
          <div className="w-16 h-0.5 bg-red-600 relative">
            <div className="absolute w-2 h-2 bg-red-600 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {technicalSpecs.map((section, index) => (
          <div key={index}>
            <h3 className="text-base font-bold text-slate-900 mb-4 border-b border-gray-300 pb-1">
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.specs.map((spec, idx) => (
                <div key={idx} className="flex justify-between text-sm text-gray-700">
                  <span className="font-medium">{spec.label}</span>
                  <span>{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicalInfo;
