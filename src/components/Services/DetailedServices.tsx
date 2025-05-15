"use client";

import React from "react";
import {
    FaTools,
    FaOilCan,
    FaBiking,
    FaBatteryThreeQuarters,
    FaPaintBrush,
} from "react-icons/fa";
import { MdOutlineMiscellaneousServices } from "react-icons/md";

const services = [
    {
        title: "Full Bike Service",
        icon: FaTools,
        tasks: [
            "Engine oil change",
            "Air filter & spark plug cleaning",
            "Brake inspection & adjustment",
            "Chain lubrication & tightening",
            "Water wash & polish",
        ],
        price: "₹500 – ₹800",
    },
    {
        title: "Engine Oil Change",
        icon: FaOilCan,
        tasks: [
            "Drain old oil",
            "Fill 10W-30/20W-40 grade oil",
            "Oil filter check (if applicable)",
        ],
        price: "₹300 – ₹450 (incl. oil)",
    },
    {
        title: "Battery Check & Replacement",
        icon: FaBatteryThreeQuarters,
        tasks: [
            "Battery voltage test",
            "Terminal cleaning",
            "Replacement (if needed)",
        ],
        price: "₹150 (Check Only) / ₹900 – ₹1500 (New Battery)",
    },
    {
        title: "Bike Customization",
        icon: FaBiking,
        tasks: [
            "Seat cover replacement",
            "Handle grip & lever mod",
            "Sticker/wrap application",
            "LED installation",
        ],
        price: "₹300 – ₹2000 (Based on Mod)",
    },
    {
        title: "Paint & Polish",
        icon: FaPaintBrush,
        tasks: [
            "Scratch removal",
            "Spray paint or touch-up",
            "Teflon or ceramic coating",
        ],
        price: "₹600 – ₹2500",
    },
    {
        title: "Periodic Maintenance",
        icon: MdOutlineMiscellaneousServices,
        tasks: [
            "Mileage tuning",
            "Brake shoe change",
            "Clutch wire/cable check",
            "Electrical wiring check",
        ],
        price: "₹400 – ₹1000",
    },
];

const DetailedServices = () => {
    return (
        <section className="py-20 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
                    Our <span className="text-indigo-600">Detailed</span> Services
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group relative bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full text-3xl">
                                    <service.icon />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                                    {service.title}
                                </h3>
                            </div>

                            <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc pl-6 space-y-1 mb-4">
                                {service.tasks.map((task, i) => (
                                    <li key={i}>{task}</li>
                                ))}
                            </ul>

                            <div className="text-indigo-600 font-medium text-sm">
                                Estimated Price: {service.price}
                            </div>

                            <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 rounded-b-2xl" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DetailedServices;
