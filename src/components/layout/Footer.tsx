"use client";

import React from "react";
import Link from "next/link";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaClock,
} from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300 py-12 border-t border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-indigo-500">Vijay Laxmi Auto</h2>
                        <p className="mt-4 text-sm text-gray-400 leading-relaxed">
                            Serving quality two-wheelers and exceptional service in Srinagar Garhwal.
                            Whether it's a scooter or motorcycle, trust us to deliver the best ride.
                        </p>
                        <p className="mt-2 text-xs italic text-gray-500">“Where Reliability Meets the Road”</p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            {[
                                { href: "/", label: "Home" },
                                { href: "/vehicles", label: "Our Vehicles" },
                                { href: "/services", label: "Services" },
                                { href: "/about", label: "About Us" },
                                { href: "/gallery", label: "Gallery" },
                                { href: "/contact", label: "Contact" },
                            ].map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-indigo-400 transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Get in Touch</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <FaPhone className="text-indigo-400" />
                                <a href="tel:+919999999999" className="hover:text-indigo-400">
                                    +91 99999 99999
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-indigo-400" />
                                <a href="mailto:contact@vijaylaxmiauto.com" className="hover:text-indigo-400">
                                    contact@vijaylaxmiauto.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaMapMarkerAlt className="text-indigo-400" />
                                <span>Srinagar Garhwal, Uttarakhand</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaClock className="text-indigo-400" />
                                <span>Mon - Sat: 9 AM - 7 PM</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Subscribe</h3>
                        <p className="text-sm text-gray-400 mb-3">
                            Join our newsletter to get the latest updates and offers.
                        </p>
                        <form className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm transition-colors"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-4">
                    <p>© {new Date().getFullYear()} Vijay Laxmi Auto. All rights reserved.</p>
                    <div className="flex gap-5">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-400 transition-colors"
                        >
                            <FaFacebookF />
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-400 transition-colors"
                        >
                            <FaTwitter />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-indigo-400 transition-colors"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
