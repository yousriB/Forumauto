"use client";
import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export default function VersionSelectionPage() {
  const router = useRouter();
  const { brand, model } = useParams();
  const cars = require("../../../../../../data/cars.json");

  // Decode brand and model from URL
  const decodedBrand = decodeURIComponent(brand);
  const decodedModel = decodeURIComponent(model);

  // Filter cars by brand and model
  const versions = cars.filter(
    (car: { brand: string; model: string; }) => car.brand === decodedBrand && car.model.trim() === decodedModel
  );

  const formatPrice = (price: { toString: () => string; }) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  return (
    <section className="py-12 bg-white min-h-screen">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          Versions disponibles pour {decodedBrand} {decodedModel}
        </h2>
        {versions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Aucune version disponible.</p>
            <Button
              variant="link"
              onClick={() => router.push("/pages/cars")}
              className="mt-4"
            >
              Retour à la liste des voitures
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {versions.map((car: { id: React.Key | null | undefined; image: string | StaticImport; brand: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; model: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; version: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; price: any; fuel: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; gearbox: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }) => (
              <Card
                key={car.id}
                className="overflow-hidden border-none duration-300 cursor-pointer"
                onClick={() => router.push(`/pages/cars/${car.id}`)}
              >
                <div className="relative h-52 w-full overflow-hidden bg-white flex justify-center items-center">
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model} ${car.version}`}
                    width={300}
                    height={300}
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    unoptimized={true}
                  />
                </div>
                <CardContent className="pt-0 pb-6">
                  <div className="flex flex-col mb-4">
                    <h3 className="text-black font-medium uppercase text-base">
                      {car.brand} {car.model} {car.version}
                    </h3>
                    <span className="font-bold text-xl text-red-600">
                      {formatPrice(car.price)} DT
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="px-2 py-1 bg-gray-100 rounded-md">{car.fuel}</div>
                    <div className="px-2 py-1 bg-gray-100 rounded-md">{car.gearbox}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}