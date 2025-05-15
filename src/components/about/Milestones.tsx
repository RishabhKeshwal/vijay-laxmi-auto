"use client";

import React from "react";
import { FaStar, FaMotorcycle, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const milestones = [
    {
        icon: <FaStar className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
        title: "2010 - Founded",
        description:
            "Laxmi Auto opened its doors in Srinagar Garhwal with a small, dedicated team.",
    },
    {
        icon: <FaMotorcycle className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
        title: "2015 - Expansion",
        description:
            "Expanded our inventory with top brands, becoming a regional favorite.",
    },
    {
        icon: <FaUsers className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
        title: "2020 - Community Leader",
        description:
            "Marked a decade as a trusted partner in our community.",
    },
];

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

const Milestones: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors">
            <div className="max-w-6xl mx-auto px-6 sm:px-10">
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center tracking-tight text-gray-900 dark:text-white mb-14"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                >
                    Our <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Journey</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {milestones.map((milestone, index) => (
                        <motion.div
                            key={index}
                            className="relative rounded-3xl p-8 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 group overflow-hidden"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                            custom={index}
                            variants={cardVariants}
                        >
                            {/* Icon Container */}
                            <div className="flex justify-center mb-6">
                                <div className="p-4 rounded-full bg-indigo-100 dark:bg-indigo-900/20 shadow-md group-hover:scale-110 transition-transform duration-300">
                                    {milestone.icon}
                                </div>
                            </div>

                            {/* Title and Description */}
                            <h3 className="text-xl font-semibold text-center text-gray-900 dark:text-white mb-3">
                                {milestone.title}
                            </h3>
                            <p className="text-sm text-center text-gray-600 dark:text-gray-300 leading-relaxed">
                                {milestone.description}
                            </p>

                            {/* Gradient Accent Bar */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Milestones;
