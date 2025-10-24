"use client";
import { Suspense } from "react";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import CarBadge from "@/components/ui/car-badge";

const Fallback = () => (
  <div className="container px-4 mx-auto py-12">
    <p>Loading cars...</p>
  </div>
);

export default function Page() {
  return (
    <Suspense fallback={<Fallback />}>
      <CarFiltersAndList />
    </Suspense>
  );
}

function CarFiltersAndList() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [filters, setFilters] = useState({
    brand: searchParams.get("brand") || "all",
    minPrice: 0,
    maxPrice: 1000000,
    fuel: [],
    gearbox: [],
  });
  const [filteredCars, setFilteredCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(12); // Number of cars to display per page

  const cars = require("../../../data/cars.json");

  // Deduplicate cars by brand and model
  const uniqueCars = Object.values(
    cars.reduce((acc, car) => {
      const key = `${car.brand}-${car.model.trim()}`;
      if (!acc[key]) {
        acc[key] = car; // Select the first car for this brand-model combination
      }
      return acc;
    }, {})
  );

  const brands = [...new Set(uniqueCars.map((car) => car.brand))];
  const fuelTypes = [...new Set(uniqueCars.map((car) => car.fuel))];
  const gearboxTypes = [...new Set(uniqueCars.map((car) => car.gearbox))];

  useEffect(() => {
    const filtered = uniqueCars
      .filter((car) => {
        return (
          (filters.brand === "all" || car.brand === filters.brand) &&
          car.price >= filters.minPrice &&
          car.price <= filters.maxPrice &&
          (filters.fuel.length === 0 || filters.fuel.includes(car.fuel)) &&
          (filters.gearbox.length === 0 ||
            filters.gearbox.includes(car.gearbox))
        );
      })
      // Sort by price from min to max
      .sort((a, b) => a.price - b.price);

    setFilteredCars(filtered);
    setCurrentPage(1); // Reset to first page when filters change

    const query =
      filters.brand !== "all"
        ? `?brand=${encodeURIComponent(filters.brand)}`
        : "";
    router.replace(`/pages/cars${query}`, { scroll: false });
  }, [filters, router]);

  // Get current cars for pagination
  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleCheckboxChange = (type, value) => {
    setFilters((prev) => {
      const currentValues = prev[type];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((item) => item !== value)
        : [...currentValues, value];
      return { ...prev, [type]: newValues };
    });
  };

  const resetFilters = () => {
    setFilters({
      brand: "all",
      minPrice: 0,
      maxPrice: 600000,
      fuel: [],
      gearbox: [],
    });
  };

  // Pagination functions
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Custom Price Slider Logic
  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);
  const rangeRef = useRef(null);

  const updateRangeBackground = () => {
    if (minPriceRef.current && maxPriceRef.current && rangeRef.current) {
      const min = parseInt(minPriceRef.current.value);
      const max = parseInt(maxPriceRef.current.value);
      const minPercent = (min / 600000) * 100;
      const maxPercent = (max / 600000) * 100;
      rangeRef.current.style.background = `linear-gradient(to right, #f44336 ${minPercent}%, #f44336 ${minPercent}%, #f44336 ${maxPercent}%, #f44336 ${maxPercent}%)`;
    }
  };

  useEffect(() => {
    updateRangeBackground();
  }, [filters.minPrice, filters.maxPrice]);

  const handlePriceChange = (type, value) => {
    const parsedValue = parseInt(value);
    if (type === "minPrice" && parsedValue <= filters.maxPrice) {
      setFilters((prev) => ({ ...prev, minPrice: parsedValue }));
    } else if (type === "maxPrice" && parsedValue >= filters.minPrice) {
      setFilters((prev) => ({ ...prev, maxPrice: parsedValue }));
    }
    updateRangeBackground();
  };

  // Handle car click
  const handleCarClick = (car) => {
    const versions = cars.filter(
      (c) => c.brand === car.brand && c.model.trim() === car.model.trim()
    );
    if (versions.length > 1) {
      // Navigate to version selection page
      router.push(
        `/pages/cars/versions/${encodeURIComponent(
          car.brand
        )}/${encodeURIComponent(car.model.trim())}`
      );
    } else {
      // Navigate directly to car details page
      router.push(`/pages/cars/${car.id}`);
    }
  };

  return (
    <section className="py-7 bg-white min-h-screen">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-slate-800 mb-8">
          Nos Voitures Disponibles
        </h2>

        <div className="flex flex-col md:flex-row gap-5">
          <div className="p-6 rounded-lg shadow-md md:w-1/3 relative min-h-screen">
            <div className="sticky top-16">
              <div className="flex justify-between items-center mb-6 pt-4">
                <h3 className="text-xl font-semibold">Filtres</h3>
                <Button
                  variant="link"
                  onClick={resetFilters}
                  className="text-[#E71609]"
                >
                  Réinitialiser
                </Button>
              </div>

              <div className="mb-6">
                <Label className="block mb-2 font-medium">Marque</Label>
                <Select
                  value={filters.brand}
                  onValueChange={(value) => handleFilterChange("brand", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Toutes les marques" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Toutes les marques</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-6">
                <Label className="block mb-2 font-medium">Prix (DT)</Label>
                <div className="">
                  <div className="relative h-2 rounded-full" ref={rangeRef}>
                    <input
                      type="range"
                      min="0"
                      max="600000"
                      step="1000"
                      value={filters.minPrice}
                      onChange={(e) =>
                        handlePriceChange("minPrice", e.target.value)
                      }
                      className="w-full h-2 cursor-pointer hidden"
                      ref={minPriceRef}
                    />
                    <input
                      type="range"
                      min="0"
                      max="600000"
                      step="1000"
                      value={filters.maxPrice}
                      onChange={(e) =>
                        handlePriceChange("maxPrice", e.target.value)
                      }
                      className="absolute w-full h-2 cursor-pointer"
                      ref={maxPriceRef}
                    />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-2">
                    <span>{formatPrice(filters.minPrice)} DT</span>
                    <span>{formatPrice(filters.maxPrice)} DT</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <Label className="block mb-2 font-medium">Carburant</Label>
                <div className="space-y-2">
                  {fuelTypes.map((fuel) => (
                    <div key={fuel} className="flex items-center">
                      <Checkbox
                        id={`fuel-${fuel}`}
                        checked={filters.fuel.includes(fuel)}
                        onCheckedChange={() =>
                          handleCheckboxChange("fuel", fuel)
                        }
                      />
                      <label htmlFor={`fuel-${fuel}`} className="ml-2 text-sm">
                        {fuel}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <Label className="block mb-2 font-medium">
                  Boîte de vitesse
                </Label>
                <div className="space-y-2">
                  {gearboxTypes.map((gearbox) => (
                    <div key={gearbox} className="flex items-center">
                      <Checkbox
                        id={`gearbox-${gearbox}`}
                        checked={filters.gearbox.includes(gearbox)}
                        onCheckedChange={() =>
                          handleCheckboxChange("gearbox", gearbox)
                        }
                      />
                      <label
                        htmlFor={`gearbox-${gearbox}`}
                        className="ml-2 text-sm"
                      >
                        {gearbox}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="w-full">
            {filteredCars.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  Aucune voiture ne correspond aux critères sélectionnés.
                </p>
                <Button variant="link" onClick={resetFilters} className="mt-4">
                  Réinitialiser les filtres
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCars.map((car) => (
                    <Card
                      key={car.id}
                      className="overflow-hidden border-none duration-300 cursor-pointer"
                      onClick={() => handleCarClick(car)}
                    >
                      <div className="relative h-52 w-full overflow-hidden bg-white flex justify-center items-center">
                        <CarBadge isNew={car.new} isPromotion={car.promotion} />
                        <Image
                          src={car.image}
                          alt={`${car.brand} ${car.model}`}
                          width={300}
                          height={300}
                          className="object-cover transition-transform duration-300 hover:scale-105"
                          unoptimized={true}
                        />
                      </div>
                      <CardContent className="pt-0 pb-6">
                        <div className="flex flex-col mb-4">
                          <h3 className="text-black font-medium uppercase text-base">
                            {" "}
                            {car.brand} {car.model}
                          </h3>
                          <span className="font-bold text-xl text-[#E71609]">
                            {cars.filter(
                              (c) =>
                                c.brand === car.brand &&
                                c.model.trim() === car.model.trim()
                            ).length > 1
                              ? `À partir de ${formatPrice(car.price)} DT`
                              : `${formatPrice(car.price)} DT`}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="px-2 py-1 bg-gray-100 rounded-md">
                            {car.fuel}
                          </div>
                          <div className="px-2 py-1 bg-gray-100 rounded-md">
                            {car.gearbox}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {filteredCars.length > carsPerPage && (
                  <div className="flex justify-center mt-8">
                    <nav className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                      >
                        Précédent
                      </Button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (number) => (
                          <Button
                            key={number}
                            variant={
                              currentPage === number ? "default" : "outline"
                            }
                            onClick={() => paginate(number)}
                          >
                            {number}
                          </Button>
                        )
                      )}

                      <Button
                        variant="outline"
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                      >
                        Suivant
                      </Button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
