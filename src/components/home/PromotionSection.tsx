"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FaArrowRight, FaMotorcycle } from "react-icons/fa";

type PromotionSectionProps = {
    title?: string;
    subtitle?: string;
    ctaText?: string;
    ctaLink?: string;
    discount?: string;
    backgroundColor?: string;
    accentColor?: string;
};

const PromotionSection = ({
    title = "Power Up Your Ride",
    subtitle = "20% OFF all two-wheelers—don’t miss out!",
    ctaText = "Claim the Deal",
    ctaLink = "/vehicles",
    discount = "20% OFF",
    backgroundColor = "bg-white dark:bg-gray-900",
    accentColor = "bg-indigo-600 hover:bg-indigo-700",
}: PromotionSectionProps) => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.25, delayChildren: 0.3 },
        },
    };

    const childVariants = {
        hidden: { opacity: 0, x: -40 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const bannerVariants = {
        hidden: { scale: 0.8, opacity: 0, x: 50 },
        visible: {
            scale: 1,
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, type: "spring", stiffness: 110 },
        },
        pulse: { scale: [1, 1.06, 1], transition: { duration: 1.4, repeat: Infinity } },
    };

    const buttonVariants = {
        hidden: { scale: 0.9, opacity: 0 },
        visible: { scale: 1, opacity: 1, transition: { duration: 0.5, delay: 0.9 } },
        hover: { scale: 1.1, transition: { duration: 0.3, ease: "easeOut" } },
    };

    const iconVariants = {
        hidden: { scale: 0.7, opacity: 0, rotate: -10 },
        visible: { scale: 1, opacity: 1, rotate: 0, transition: { duration: 0.8, ease: "easeOut" } },
        hover: { scale: 1.15, rotate: [0, 5, -5, 0], transition: { duration: 1.2, repeat: Infinity } },
    };

    return (
        <section
            className={`relative py-28 ${backgroundColor} overflow-hidden`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff10_1px,transparent_1px)] bg-[size:60px_60px] opacity-15 dark:bg-[linear-gradient(to_right,#1e293b10_1px,transparent_1px)]" />

            {/* Angled Accent Banner */}
            <div className="absolute top-0 left-0 w-full h-24 bg-indigo-100 dark:bg-indigo-950 clip-path-polygon-[0_0,100%_0,100%_60%,0_100%]" />

            <div className="relative max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 z-10">
                <motion.div
                    className="flex flex-col lg:flex-row items-center justify-between min-h-[500px] gap-12"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Left Content */}
                    <div className="flex-1 text-left space-y-8">
                        {/* Title */}
                        <motion.h2
                            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight leading-tight"
                            variants={childVariants}
                        >
                            {title}
                        </motion.h2>

                        {/* Subtitle */}
                        <motion.p
                            className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-md"
                            variants={childVariants}
                        >
                            {subtitle}
                        </motion.p>

                        {/* Discount Banner */}
                        <motion.div
                            className="inline-block px-8 py-4 bg-yellow-400 text-indigo-900 text-2xl md:text-3xl font-bold rounded-lg shadow-xl transform -rotate-2"
                            variants={bannerVariants}
                            animate="pulse"
                        >
                            {discount}
                            <div className="absolute inset-0 border-2 border-yellow-300/50 rounded-lg -z-10 transform scale-105" />
                        </motion.div>

                        {/* CTA Button */}
                        <motion.div variants={buttonVariants} whileHover="hover">
                            <Button
                                asChild
                                className={`inline-flex items-center px-10 py-4 ${accentColor} text-white text-xl font-semibold rounded-lg shadow-lg transition-all duration-300`}
                            >
                                <Link href={ctaLink}>
                                    {ctaText} <FaArrowRight className="ml-3 h-6 w-6" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>

                    {/* Right Motorcycle Accent */}
                    <motion.div
                        className="flex-1 flex justify-center lg:justify-end"
                        variants={iconVariants}
                        whileHover="hover"
                    >
                        <div className="relative">
                            <div className="absolute inset-0 w-72 h-72 bg-indigo-300/20 dark:bg-indigo-700/20 rounded-full blur-2xl -z-10" />
                            <FaMotorcycle className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 text-indigo-600 dark:text-indigo-400 drop-shadow-xl" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Bottom Accent Line */}
            <motion.div
                className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 dark:bg-indigo-400"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            />
        </section>
    );
};

export default PromotionSection;