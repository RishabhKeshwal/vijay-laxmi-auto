"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

const Testimonials = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.3, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    // Testimonial data
    const testimonials = [
        {
            quote: "Picked up a Pulsar NS200—insane power and the smoothest deal ever. These guys rock!",
            author: "Rohan K., Mumbai",
            rating: 5,
        },
        {
            quote: "Suzuki Access 125 is my daily vibe. Fast delivery and dope service—10/10!",
            author: "Priya S., Delhi",
            rating: 4,
        },
        {
            quote: "Okinawa PraisePro’s eco-game is strong. Support’s on point—totally worth it.",
            author: "Amit V., Bangalore",
            rating: 5,
        },
        {
            quote: "Got my Gixxer with a killer discount. Crew’s legit—riding happy!",
            author: "Karan T., Pune",
            rating: 4,
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-indigo-50 to-white dark:from-indigo-900 dark:to-gray-900 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#e0e7ff_1px,transparent_1px),linear-gradient(to_bottom,#e0e7ff_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 dark:bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)]" />

            <div className="container mx-auto px-6 md:px-12 lg:px-20">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight"
                        variants={itemVariants}
                    >
                        What Riders Say
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto"
                        variants={itemVariants}
                    >
                        Real talk from our crew—why they’re stoked to ride with us.
                    </motion.p>
                </motion.div>

                {/* Testimonials Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="relative flex flex-col bg-white/95 dark:bg-gray-800/95 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-indigo-200/50 dark:border-indigo-700/50 hover:shadow-xl transition-all duration-300"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            {/* Quote Icon */}
                            <FaQuoteLeft className="absolute top-4 left-4 w-8 h-8 text-indigo-400 opacity-30" />

                            {/* Quote */}
                            <p className="text-base text-gray-700 dark:text-gray-300 mt-8 mb-4 italic">
                                “{testimonial.quote}”
                            </p>

                            {/* Rating */}
                            <div className="flex justify-center mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <FaStar
                                        key={i}
                                        className={`w-5 h-5 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
                                            }`}
                                    />
                                ))}
                            </div>

                            {/* Author */}
                            <p className="text-sm font-semibold text-gray-900 dark:text-white text-center">
                                {testimonial.author}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;