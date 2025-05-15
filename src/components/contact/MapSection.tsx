"use client";

import React from "react";
import { motion } from "framer-motion";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut", delay: i * 0.2 },
    }),
};

const MapSection = () => {
    return (
        <section className="py-20 bg-gradient-to-br from-white via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <motion.h2
                    className="text-3xl sm:text-4xl font-bold text-center mb-8 tracking-tight text-gray-800 dark:text-white"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    custom={0}
                    viewport={{ once: true }}
                >
                    Visit <span className="text-indigo-600 dark:text-indigo-400">Our Location</span>
                </motion.h2>

                {/* Map Container */}
                <motion.div
                    className="w-full h-[300px] sm:h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-gray-300/40 dark:border-gray-700/50 backdrop-blur-md bg-white/70 dark:bg-white/5"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    custom={1}
                    viewport={{ once: true }}
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13793.15148483751!2d78.7719395!3d30.2210772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908c2e7b24e8e4d%3A0x5b3e3e8c4e8e8e8e!2sSrinagar%2C%20Uttarakhand%202464174%2C%20India!5e0!3m2!1sen!2sus!4v1698765432100!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </motion.div>

                {/* Description */}
                <motion.p
                    className="mt-8 text-center text-gray-700 dark:text-gray-300 text-lg md:text-xl"
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    custom={2}
                    viewport={{ once: true }}
                >
                    We're located in the heart of{" "}
                    <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                        Srinagar Garhwal, Uttarakhand
                    </span>
                    . Feel free to stop by for a visit!
                </motion.p>
            </div>
        </section>
    );
};

export default MapSection;
