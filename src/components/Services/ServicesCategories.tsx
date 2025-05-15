"use client";
import React from "react";
import { motion } from "framer-motion";
import {
    FaTools,
    FaBiking,
    FaOilCan,
    FaPaintBrush,
    FaBatteryThreeQuarters,
} from "react-icons/fa";

const services = [
    {
        title: "Routine Bike Servicing",
        icon: FaTools,
        description: "Thorough 21-point inspection, chain oiling, brake check, and full engine tune-up to keep your ride smooth and safe.",
    },
    {
        title: "Custom Mods & Upgrades",
        icon: FaBiking,
        description: "Tailor your bike with premium seat covers, LED lights, performance exhausts, and design wraps — your bike, your vibe.",
    },
    {
        title: "Engine Oil & Filter Change",
        icon: FaOilCan,
        description: "High-grade oil replacement with filter swap for enhanced engine life, better mileage, and smoother performance.",
    },
    {
        title: "Scratch Removal & Paint Detailing",
        icon: FaPaintBrush,
        description: "From minor scratch removal to full body repaint & ceramic polish — give your ride a fresh showroom finish.",
    },
    {
        title: "Battery Health & Replacement",
        icon: FaBatteryThreeQuarters,
        description: "Battery load testing, terminal cleaning, and replacement if needed — never get stranded again.",
    },
];


const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.5 },
    }),
};

const ServicesCategories = () => {
    return (
        <section className="relative z-10 py-20 bg-gradient-to-br from-white via-gray-50 to-white dark:from-black dark:via-gray-950 dark:to-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Section Heading */}
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={0}
                >
                    Our <span className="text-indigo-600">Services</span>
                </motion.h2>
                <motion.p
                    className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                    custom={1}
                >
                    Designed to give your ride the best care it deserves. From quick fixes to deep customizations, we’ve got you.
                </motion.p>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <motion.div
                                key={index}
                                className="bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-3xl shadow-xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-indigo-500/50"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeIn}
                                custom={index + 2}
                            >
                                <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white text-3xl mx-auto shadow-lg mb-5">
                                    <Icon />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesCategories;
