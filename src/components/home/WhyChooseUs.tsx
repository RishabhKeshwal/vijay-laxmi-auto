"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaStar, FaDollarSign, FaTruck, FaShieldAlt, FaTrophy, FaClock } from "react-icons/fa";

const WhyChooseUs = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.25, delayChildren: 0.3 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
    };

    // Reasons data with React Icons
    const reasons = [
        {
            icon: <FaStar className="w-14 h-14 text-yellow-400 drop-shadow-md" />,
            title: "Top Quality",
            description: "Premium rides from Bajaj, Suzuki, and Okinawa—built to shred.",
            accent: "bg-gradient-to-r from-indigo-600 to-indigo-400",
        },
        {
            icon: <FaDollarSign className="w-14 h-14 text-green-400 drop-shadow-md" />,
            title: "Best Prices",
            description: "Sick deals and discounts that won’t break the bank.",
            accent: "bg-gradient-to-r from-indigo-500 to-indigo-300",
        },
        {
            icon: <FaTruck className="w-14 h-14 text-blue-400 drop-shadow-md" />,
            title: "Fast Delivery",
            description: "Your wheels delivered quick—ready to roll in no time.",
            accent: "bg-gradient-to-r from-indigo-600 to-indigo-500",
        },
        {
            icon: <FaShieldAlt className="w-14 h-14 text-purple-400 drop-shadow-md" />,
            title: "Trusted Service",
            description: "Pro maintenance and support—got your back always.",
            accent: "bg-gradient-to-r from-indigo-700 to-indigo-500",
        },
        {
            icon: <FaTrophy className="w-14 h-14 text-yellow-500 drop-shadow-md" />,
            title: "Award-Winning",
            description: "Top-tier rep for sales and service—straight-up champs.",
            accent: "bg-gradient-to-r from-indigo-600 to-indigo-400",
        },
        {
            icon: <FaClock className="w-14 h-14 text-teal-400 drop-shadow-md" />,
            title: "24/7 Support",
            description: "Help anytime, anywhere—ride worry-free, dude.",
            accent: "bg-gradient-to-r from-indigo-500 to-indigo-400",
        },
    ];

    return (
        <section className="py-24 bg-gradient-to-br from-gray-100 via-indigo-50 to-indigo-100 dark:from-gray-900 dark:via-indigo-950 dark:to-indigo-900 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-200/20 via-transparent to-transparent opacity-40 dark:from-indigo-800/20" />

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
                        Why Roll With Us
                    </motion.h2>
                    <motion.p
                        className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        We’re the real deal—your go-to crew for epic two-wheelers and vibes.
                    </motion.p>
                </motion.div>

                {/* Reasons Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={reason.title}
                            className="relative flex flex-col items-center text-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-indigo-200/50 dark:border-indigo-700/50 hover:shadow-2xl transition-all duration-300"
                            variants={itemVariants}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            {/* Icon with Gradient Circle */}
                            <div className="relative mb-6">
                                <div className="absolute inset-0 w-20 h-20 bg-gradient-to-r from-indigo-400/20 to-indigo-600/20 rounded-full blur-md -z-10" />
                                {reason.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                {reason.title}
                            </h3>

                            {/* Description */}
                            <p className="text-base text-gray-600 dark:text-gray-300">
                                {reason.description}
                            </p>

                            {/* Accent Bar */}
                            <div className={`w-16 h-1 mt-4 rounded-full ${reason.accent}`} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default WhyChooseUs;