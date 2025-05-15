"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaPhone, FaFacebookF, FaTwitter, FaInstagram, FaTimes } from "react-icons/fa";

interface TopbarProps {
    isVisible: boolean;
    setIsVisible: (visible: boolean) => void;
}

const Topbar: React.FC<TopbarProps> = ({ isVisible, setIsVisible }) => {
    const handleClose = () => {
        setIsVisible(false);
    };

    // Animation variants for fade-out
    const topbarVariants = {
        visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
        hidden: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeInOut" } },
    };

    if (!isVisible) return null;

    return (
        <motion.div
            className="bg-indigo-600 text-white py-2 fixed top-0 left-0 w-full z-50"
            initial="visible"
            animate="visible"
            exit="hidden"
            variants={topbarVariants}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-row justify-between items-center gap-2 sm:gap-4">
                {/* Latest Offer */}
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm bg-orange-500 px-2 py-1 rounded-full text-white">
                        Offer
                    </span>
                    <p className="text-sm">Get 20% OFF on all motorcycles this month!</p>
                </div>

                {/* Contact Number & Social Media */}
                <div className="items-center gap-4 md:flex">
                    <Link
                        href="tel:+919876543210"
                        className=" items-center hidden md:flex gap-1 text-white hover:text-orange-200 transition-colors duration-200"
                        aria-label="Call us at +91 98765 43210"
                    >
                        <FaPhone className="h-4 w-4" />
                        <span className="text-sm hidden sm:inline">+91 98765 43210</span>
                        <span className="text-sm sm:hidden">Call</span>
                    </Link>

                    <div className=" gap-3 hidden md:flex">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-orange-200 transition-colors duration-200"
                            aria-label="Visit our Facebook page"
                        >
                            <FaFacebookF className="h-4 w-4" />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-orange-200 transition-colors duration-200"
                            aria-label="Visit our Twitter page"
                        >
                            <FaTwitter className="h-4 w-4" />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-orange-200 transition-colors duration-200"
                            aria-label="Visit our Instagram page"
                        >
                            <FaInstagram className="h-4 w-4" />
                        </a>
                    </div>

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="text-white hover:text-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-400 rounded-full p-1 transition-colors duration-200 md:pl-8"
                        aria-label="Close topbar announcement"
                    >
                        <FaTimes className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default Topbar;