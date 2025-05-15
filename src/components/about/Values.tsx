"use client";

import React from "react";
import { FaMotorcycle, FaTools, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const values = [
    {
        icon: <FaMotorcycle className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
        title: "Quality Vehicles",
        description: "Offering the best two-wheelers from trusted brands.",
    },
    {
        icon: <FaTools className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
        title: "Expert Service",
        description: "Keeping your ride in peak condition with skilled care.",
    },
    {
        icon: <FaUsers className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />,
        title: "Customer Commitment",
        description: "Putting our customers first in everything we do.",
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

const Values = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors">
            <div className="max-w-6xl mx-auto px-6 sm:px-10">
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center tracking-tight text-gray-900 dark:text-white mb-14"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={cardVariants}
                >
                    Our <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Values</span>
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            className="relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-8 text-center shadow-md hover:shadow-xl group transition-all duration-300 overflow-hidden"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.4 }}
                            custom={index}
                            variants={cardVariants}
                        >
                            {/* Icon Container */}
                            <div className="flex justify-center mb-6">
                                <div className="p-4 bg-indigo-100 dark:bg-indigo-900/20 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300">
                                    {value.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{value.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                                {value.description}
                            </p>

                            {/* Accent Line */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-600 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-t" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;
