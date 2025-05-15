"use client";

import React, { useState, useEffect } from "react";
import VehicleFilter from "@/components/vehicles/VehicleFilter";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroHeader from "@/components/common/HeroHeader";
import { Pagination } from "@/components/common/Pagination";
import vehiclesData from "@/constants";

const VehiclePage = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedBrand, setSelectedBrand] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredVehicles, setFilteredVehicles] = useState(vehiclesData);
    const [currentPage, setCurrentPage] = useState(1);
    const vehiclesPerPage = 6;

    useEffect(() => {
        const filtered = vehiclesData.filter((vehicle) => {
            const matchesCategory =
                selectedCategory === "All" || vehicle.category === selectedCategory;
            const matchesBrand = selectedBrand === "All" || vehicle.brand === selectedBrand;
            const matchesSearch = vehicle.name
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesCategory && matchesBrand && matchesSearch;
        });

        setFilteredVehicles(filtered);
        setCurrentPage(1); // Reset to page 1 when filters change
    }, [selectedCategory, selectedBrand, searchQuery]);

    // Calculate pagination
    const totalPages = Math.ceil(filteredVehicles.length / vehiclesPerPage);
    const indexOfLastVehicle = currentPage * vehiclesPerPage;
    const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
    const currentVehicles = filteredVehicles.slice(indexOfFirstVehicle, indexOfLastVehicle);

    // Pagination handler
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    // Animation variants for vehicle cards
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    return (
        <div>
            {/* Hero Section */}
            <HeroHeader
                title="Explore Our Rides"
                subtitle="Find the perfect two-wheeler for your journey!"
                ctaText="Browse Now"
                ctaLink="#vehicles"
                imageUrl="/images/vehicle-hero.jpg"
                overlay={true}
            />

            {/* Main Content */}
            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-8">
                {/* Vehicle Filter */}
                <aside className="w-full lg:w-1/4">
                    <div className="sticky top-4">
                        <VehicleFilter
                            selectedCategory={selectedCategory}
                            setCategory={setSelectedCategory}
                            selectedBrand={selectedBrand}
                            setBrand={setSelectedBrand}
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    </div>
                </aside>

                <section className="w-full lg:w-3/4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {currentVehicles.length > 0 ? (
                            currentVehicles.map((vehicle, index) => (
                                <motion.div
                                    key={vehicle.slug}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link href={`/ vehicles / ${vehicle.slug} `}>
                                        <div className="bg-white rounded-2xl shadow group overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer">
                                            {/* Image Section */}
                                            <div className="relative h-44 w-full">
                                                <img
                                                    src={vehicle.images?.[0]}
                                                    alt={vehicle.name}
                                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                                />
                                                <div className="absolute bottom-0 left-0 bg-black bg-opacity-40 text-white text-xs px-3 py-1 rounded-tr-xl">
                                                    {vehicle.category}
                                                </div>
                                            </div>

                                            {/* Details Section */}
                                            <div className="p-4 space-y-3">
                                                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                                                    {vehicle.name}
                                                </h3>
                                                <p className="text-sm text-gray-500">{vehicle.brand}</p>

                                                {/* Two-Column Highlights */}
                                                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                                                    <div>
                                                        <span className="block text-xs text-gray-400">Price</span>
                                                        {vehicle.price}
                                                    </div>
                                                    <div>
                                                        <span className="block text-xs text-gray-400">Range</span>
                                                        {vehicle.mileage}
                                                    </div>
                                                </div>

                                                {/* Feature Badge */}
                                                {vehicle.features?.[0] && (
                                                    <span className="inline-block text-xs mt-2 px-2 py-1 bg-indigo-100 text-indigo-600 rounded-full">
                                                        {vehicle.features[0]}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-10 text-gray-500">
                                No vehicles match your filters.
                            </div>
                        )}
                    </div>

                    {/* Pagination Component */}
                    <div className="mt-12">
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default VehiclePage;