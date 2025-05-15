"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

const TrustedPartners = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.4, delayChildren: 0.3 },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.9 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { delay: i * 0.4, duration: 0.8, ease: "easeOut" },
        }),
        hover: {
            scale: 1.1,
            y: -15,
            transition: { duration: 0.3, ease: "easeOut" },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: -30 },
        visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
    };

    const logoVariants = {
        hidden: { opacity: 0, scale: 0.7 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
        hover: { scale: 1.15, rotate: 3, transition: { duration: 0.3 } },
    };

    // Partner data
    const partners = [
        {
            name: "Bajaj",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Bajaj_Auto_Logo.svg/800px-Bajaj_Auto_Logo.svg.png",
            description: "Pulsar and Dominar—raw power, precision engineering.",
            highlightColor: "from-indigo-600 to-indigo-400",
            accentColor: "text-indigo-600",
        },
        {
            name: "Suzuki",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Suzuki_Logo.svg/800px-Suzuki_Logo.svg.png",
            description: "Access 125 and Gixxer—style meets agility.",
            highlightColor: "from-indigo-500 to-indigo-300",
            accentColor: "text-indigo-500",
        },
        {
            name: "Okinawa",
            logo: "https://d36g7qg6pk2cm7.cloudfront.net/assets/okinawa_logo_black-8b65297bea69397107f981e9c6b9ca7ebdd35b5cacee7e7dd0b2b4b484bff05e.png",
            description: "PraisePro—eco-friendly electric performance.",
            highlightColor: "from-indigo-700 to-indigo-500",
            accentColor: "text-indigo-700",
        },
    ];

    return (
        <section className="py-28 bg-gradient-to-br from-indigo-100 via-white to-indigo-50 dark:from-indigo-950 dark:via-gray-900 dark:to-indigo-900 overflow-hidden relative">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-300/10 dark:bg-indigo-800/10 rounded-full blur-3xl opacity-20 animate-pulse" />

            <div className="container mx-auto px-6 md:px-12 lg:px-24">
                {/* Section Title */}
                <motion.div
                    className="text-center mb-20 relative z-10"
                    initial="hidden"
                    animate="visible"
                    variants={titleVariants}
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                        Our Trusted Partners
                    </h2>
                    <motion.div
                        className="w-32 h-1.5 bg-gradient-to-r from-indigo-600 to-indigo-400 mt-4 mx-auto rounded-full"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    />
                    <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Teaming up with legends to bring you the ultimate ride.
                    </p>
                </motion.div>

                {/* Partner Cards */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12"
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    {partners.map((partner, index) => (
                        <motion.div
                            key={partner.name}
                            custom={index}
                            initial="hidden"
                            animate="visible"
                            variants={cardVariants}
                            whileHover="hover"
                            className="relative"
                        >
                            <Card className="relative bg-gradient-to-b from-white to-indigo-50/50 dark:from-gray-800 dark:to-indigo-900/50 border-2 border-indigo-300/50 dark:border-indigo-700/50 shadow-xl rounded-xl overflow-hidden transition-all duration-500">
                                <CardContent className="p-8 text-center relative z-10">
                                    {/* Logo */}
                                    <motion.div
                                        className="relative w-48 h-32 mx-auto mb-6"
                                        variants={logoVariants}
                                        whileHover="hover"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/30 to-indigo-300/30 rounded-lg blur-md -z-10 transform scale-110" />
                                        <Image
                                            src={partner.logo}
                                            alt={`${partner.name} logo`}
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                        />
                                    </motion.div>

                                    {/* Partner Name */}
                                    <h3 className={`text-2xl md:text-3xl font-extrabold ${partner.accentColor} mb-3 tracking-tight`}>
                                        {partner.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-base text-gray-700 dark:text-gray-200 leading-relaxed font-medium">
                                        {partner.description}
                                    </p>
                                </CardContent>

                                {/* Top Corner Accent */}
                                <motion.div
                                    className={`absolute top-0 left-0 w-16 h-16 bg-gradient-to-br ${partner.highlightColor} clip-path-polygon-[0_0,100%_0,0_100%]`}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ duration: 0.6, delay: index * 0.4 + 0.3 }}
                                />

                                {/* Bottom Glow Bar */}
                                <motion.div
                                    className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${partner.highlightColor} opacity-50`}
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ duration: 0.8, delay: index * 0.4 + 0.5 }}
                                />

                                {/* Hover Effect */}
                                <motion.div
                                    className="absolute inset-0 bg-gradient-to-t from-indigo-600/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                    initial={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                />
                            </Card>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default TrustedPartners;