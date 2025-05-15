"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaMotorcycle, FaArrowLeft } from "react-icons/fa";
import { Button } from "@/components/ui/button";

const NotFound = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    const bikeVariants = {
        hidden: { x: -50, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { duration: 1, ease: "easeOut" },
        },
        hover: { x: [0, 10, 0], transition: { duration: 1.5, repeat: Infinity } },
    };

    return (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-100 to-white dark:from-indigo-950 dark:to-gray-900 overflow-hidden">
            <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
                <motion.div
                    className="flex flex-col items-center space-y-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {/* Motorcycle Icon */}
                    <motion.div
                        variants={bikeVariants}
                        whileHover="hover"
                        className="text-indigo-600 dark:text-indigo-400"
                    >
                        <FaMotorcycle className="w-24 h-24 md:w-32 md:h-32" />
                    </motion.div>

                    {/* 404 Heading */}
                    <motion.h1
                        className="text-6xl md:text-8xl font-extrabold text-gray-900 dark:text-white tracking-tight"
                        variants={itemVariants}
                    >
                        404
                    </motion.h1>

                    {/* Message */}
                    <motion.h2
                        className="text-2xl md:text-4xl font-semibold text-gray-800 dark:text-gray-200 max-w-xl"
                        variants={itemVariants}
                    >
                        Whoops! Looks like you took a wrong turn, rider.
                    </motion.h2>

                    {/* Subtext */}
                    <motion.p
                        className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-md"
                        variants={itemVariants}
                    >
                        This page is off the map, but we’ve got plenty of dope rides waiting for you.
                    </motion.p>

                    {/* Back Button */}
                    <motion.div variants={itemVariants}>
                        <Button
                            asChild
                            className="inline-flex items-center px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300"
                        >
                            <Link href="/">
                                <FaArrowLeft className="mr-2 h-5 w-5" /> Back to the Garage
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Background Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent opacity-40 dark:from-indigo-800/20" />
        </section>
    );
};

export default NotFound;