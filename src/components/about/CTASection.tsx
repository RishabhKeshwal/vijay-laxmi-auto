"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const fadeInUp = {
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

const CTASection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 to-indigo-900 dark:from-indigo-800 dark:to-black py-20 px-6 sm:px-10 text-white">
            <div className="max-w-5xl mx-auto text-center z-10 relative">
                <motion.h2
                    className="text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight mb-6"
                    initial="hidden"
                    whileInView="visible"
                    custom={1}
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    Discover <span className="text-yellow-400">Laxmi Auto</span>
                </motion.h2>

                <motion.p
                    className="text-lg sm:text-xl text-indigo-100 dark:text-indigo-200 mb-10 max-w-2xl mx-auto leading-relaxed"
                    initial="hidden"
                    whileInView="visible"
                    custom={2}
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    Your journey starts here. Explore our premium two-wheelers or connect with our team today.
                </motion.p>

                <motion.div
                    className="flex flex-wrap justify-center gap-4"
                    initial="hidden"
                    whileInView="visible"
                    custom={3}
                    viewport={{ once: true }}
                    variants={fadeInUp}
                >
                    <Link
                        href="/vehicles"
                        className="px-6 py-3 rounded-full bg-white text-indigo-700 font-semibold shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    >
                        Browse Vehicles
                    </Link>
                    <Link
                        href="/contact"
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-indigo-900 font-semibold shadow-md hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-300"
                    >
                        Contact Us
                    </Link>
                </motion.div>
            </div>

            {/* Decorative background blur circles */}
            <div className="absolute -top-10 -left-10 w-60 h-60 bg-purple-500 opacity-30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 -right-10 w-72 h-72 bg-yellow-400 opacity-20 rounded-full blur-3xl" />
        </section>
    );
};

export default CTASection;
