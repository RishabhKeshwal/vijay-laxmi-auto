"use client";
import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion"; // For subtle animations

const contactDetails = [
    {
        icon: <FaPhone className="h-6 w-6 text-indigo-600" />,
        content: (
            <a
                href="tel:+919876543210"
                className="hover:text-indigo-600 transition-colors duration-200"
            >
                +91 98765 43210
            </a>
        ),
    },
    {
        icon: <FaEnvelope className="h-6 w-6 text-indigo-600" />,
        content: (
            <a
                href="mailto:info@laxmiauto.com"
                className="hover:text-indigo-600 transition-colors duration-200"
            >
                info@laxmiauto.com
            </a>
        ),
    },
    {
        icon: <FaMapMarkerAlt className="h-6 w-6 text-indigo-600" />,
        content: <span>Srinagar Garhwal, Uttarakhand, India</span>,
    },
    {
        icon: <FaClock className="h-6 w-6 text-indigo-600" />,
        content: <span>Mon-Sat: 9 AM - 6 PM</span>,
    },
];

const ContactInfo = () => {
    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="bg-white dark:bg-muted shadow-md rounded-2xl p-6 md:p-10 border border-border">
            <motion.h2
                className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                Get in <span className="text-indigo-600">Touch</span>
            </motion.h2>
            <ul className="space-y-6 text-gray-700">
                {contactDetails.map((detail, index) => (
                    <motion.li
                        key={index}
                        className="group flex items-center gap-4"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                        transition={{ delay: index * 0.1 }} // FIX: Applied transition separately
                    >
                        <div className="p-2 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full shadow-sm group-hover:scale-110 transition-transform duration-300">
                            {detail.icon}
                        </div>
                        <div className="text-lg leading-relaxed">{detail.content}</div>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};

export default ContactInfo;
