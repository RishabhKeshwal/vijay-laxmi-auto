"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay },
    }),
};

const CompanyOverview: React.FC = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
            <div className="max-w-5xl mx-auto px-6 md:px-10">
                {/* Heading */}
                <motion.h2
                    className="text-4xl md:text-5xl font-extrabold text-center tracking-tight text-gray-900 dark:text-white"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0}
                    variants={fadeInUp}
                >
                    Who <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">We Are</span>
                </motion.h2>

                {/* Description Block */}
                <motion.div
                    className="mt-10 bg-white dark:bg-gray-800 shadow-xl rounded-3xl p-8 md:p-12 space-y-6 text-gray-700 dark:text-gray-300"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.2}
                    variants={fadeInUp}
                >
                    <p className="text-lg leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">Laxmi Auto</strong> was born out of a passion for two-wheelers and a commitment to
                        serving our community in Srinagar Garhwal. Since our founding in <strong className="text-indigo-600 dark:text-indigo-400">2010</strong>, we’ve
                        been delivering high-quality motorcycles and scooters—paired with exceptional service that keeps our customers riding confidently.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Our mission goes beyond being just a showroom. We strive to be your trusted partner on every journey, offering reliable vehicles and expert
                        care tailored to your needs—powered by trust, driven by passion.
                    </p>
                </motion.div>
            </div>
        </section>
    );
};

export default CompanyOverview;
