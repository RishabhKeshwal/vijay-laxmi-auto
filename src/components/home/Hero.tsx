"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Bike } from "lucide-react"; // Replaced PhoneCall with Bike
import { motion } from "framer-motion";

const Hero = () => {
    // Animation variants
    const textVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    };

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100 dark:from-indigo-950 dark:via-gray-900 dark:to-indigo-900 py-20 lg:py-32">
            {/* Background Accent */}
            <div className="absolute top-[-10rem] left-[-10rem] w-[400px] h-[400px] bg-indigo-200 rounded-full blur-3xl opacity-20 dark:bg-indigo-800" />
            <div className="absolute bottom-[-15rem] right-[-15rem] w-[500px] h-[500px] bg-indigo-300 rounded-full blur-3xl opacity-15 dark:bg-indigo-700" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20 flex flex-col-reverse lg:flex-row items-center justify-between gap-12 lg:gap-20">
                {/* Left Content */}
                <motion.div
                    className="max-w-lg text-center lg:text-left"
                    initial="hidden"
                    animate="visible"
                    variants={textVariants}
                >
                    <span className="inline-block text-sm uppercase tracking-widest text-indigo-500 dark:text-indigo-400 font-semibold bg-indigo-100 dark:bg-indigo-800/50 rounded-full px-3 py-1 mb-4">
                        Serving Riders Since 2010
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                        Two-Wheeler Excellence<br />
                        <span className="text-indigo-600 dark:text-indigo-400">Ride with Confidence</span>
                    </h1>
                    <p className="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-md">
                        Discover premium motorcycles and scooters, expert servicing, and seamless booking.
                        Your ride deserves top care – we make it happen.
                    </p>

                    <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                        <Button
                            size="lg"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Book a Test Ride <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-3 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/50 transition-all duration-300"
                        >
                            Explore Two-Wheelers
                        </Button>
                    </div>
                </motion.div>

                {/* Right Image */}
                <motion.div
                    className="relative w-full max-w-md lg:max-w-lg"
                    initial="hidden"
                    animate="visible"
                    variants={imageVariants}
                >
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl ring-1 ring-indigo-200 dark:ring-indigo-800">
                        <Image
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80" // Motorcycle image
                            alt="Premium two-wheeler"
                            width={600}
                            height={450}
                            className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-500"
                            priority
                        />
                        {/* Overlay Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/20 to-transparent pointer-events-none" />
                    </div>
                    {/* Floating Badge */}
                    <div className="absolute bottom-4 right-4 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
                        Certified Experts
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;