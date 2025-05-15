"use client";

import React, { useState } from "react";
import { FaFilter, FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
} from "@/components/ui/popover";

interface VehicleFilterProps {
    selectedCategory: string;
    setCategory: (category: string) => void;
    selectedBrand: string;
    setBrand: (brand: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const categories = ["All", "Motorcycle", "Scooter", "Electric"];
const brands = ["All", "Bajaj", "Suzuki", "Okinawa"];

const VehicleFilter: React.FC<VehicleFilterProps> = ({
    selectedCategory,
    setCategory,
    selectedBrand,
    setBrand,
    searchQuery,
    setSearchQuery,
}) => {
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);
    const [isBrandOpen, setIsBrandOpen] = useState(false);

    return (
        <section className="py-6 bg-gray-50">
            <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-left justify-between mb-4 gap-4">
                    {/* Header */}
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                        <FaFilter className="h-6 w-6 text-indigo-600" />
                        Filter Vehicles
                    </h2>

                    {/* Search Input */}
                    <div className="relative w-full">
                        <Label htmlFor="search" className="mb-1">
                            Search Vehicles
                        </Label>

                        <div className="relative">
                            <FaSearch className="absolute left-4 top-3.5 text-gray-400" />

                            <Input
                                id="search"
                                type="text"
                                placeholder="Search vehicles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>

                    {/* Category Filter (Desktop) */}
                    <div className="w-full">
                        <Label className="mb-2">Filter by Category</Label>

                        <div className="hidden md:flex flex-wrap gap-3">
                            {categories.map((category) => (
                                <motion.button
                                    key={category}
                                    onClick={() => setCategory(category)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${selectedCategory === category
                                        ? "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-lg"
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-indigo-100 hover:border-indigo-400 hover:text-indigo-700"
                                        }`}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.92 }}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Brand Filter (Desktop) */}
                    <div className="w-full">
                        <Label className="mb-2">Filter by Brand</Label>

                        <div className="hidden md:flex flex-wrap gap-3">
                            {brands.map((brand) => (
                                <motion.button
                                    key={brand}
                                    onClick={() => setBrand(brand)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${selectedBrand === brand
                                        ? "bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-lg"
                                        : "bg-white text-gray-700 border border-gray-300 hover:bg-indigo-100 hover:border-indigo-400 hover:text-indigo-700"
                                        }`}
                                    whileHover={{ scale: 1.08 }}
                                    whileTap={{ scale: 0.92 }}
                                >
                                    {brand}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Filters */}
                    <div className="md:hidden w-full flex flex-col gap-4">
                        {/* Category Dropdown */}
                        <div>
                            <Label className="mb-2">Category</Label>

                            <Popover open={isCategoryOpen} onOpenChange={setIsCategoryOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedCategory}
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full p-2">
                                    {categories.map((category) => (
                                        <Button
                                            key={category}
                                            variant={
                                                selectedCategory === category ? "default" : "ghost"
                                            }
                                            className="w-full justify-start"
                                            onClick={() => {
                                                setCategory(category);
                                                setIsCategoryOpen(false);
                                            }}
                                        >
                                            {category}
                                        </Button>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </div>

                        {/* Brand Dropdown */}
                        <div>
                            <Label className="mb-2">Brand</Label>

                            <Popover open={isBrandOpen} onOpenChange={setIsBrandOpen}>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full justify-between">
                                        {selectedBrand}
                                    </Button>
                                </PopoverTrigger>

                                <PopoverContent className="w-full p-2">
                                    {brands.map((brand) => (
                                        <Button
                                            key={brand}
                                            variant={
                                                selectedBrand === brand ? "default" : "ghost"
                                            }
                                            className="w-full justify-start"
                                            onClick={() => {
                                                setBrand(brand);
                                                setIsBrandOpen(false);
                                            }}
                                        >
                                            {brand}
                                        </Button>
                                    ))}
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VehicleFilter;
