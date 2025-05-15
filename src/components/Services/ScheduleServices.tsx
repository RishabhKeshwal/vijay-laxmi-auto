"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FaWrench } from "react-icons/fa";
import { Combobox } from "@/components/ui/combobox";
import { toast } from "sonner";

// Bike brand and model mapping
const bikeData: Record<string, string[]> = {
    Honda: ["Shine", "CB350", "Unicorn", "Hornet"],
    Yamaha: ["FZ", "MT15", "R15", "Fascino"],
    Bajaj: ["Pulsar", "Dominar", "Avenger", "CT100"],
    Suzuki: ["Gixxer", "Access", "Burgman"],
    Hero: ["Splendor", "HF Deluxe", "Xtreme", "Glamour"],
    TVS: ["Apache", "Jupiter", "Ntorq", "Sport"],
    RoyalEnfield: ["Classic 350", "Hunter 350", "Meteor", "Bullet 350"],
};

// Framer motion fade-in animation
const fadeIn = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
};

const ScheduleServices = () => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        company: "",
        model: "",
        serviceType: "",
        preferredDate: "",
        preferredTime: "",
        notes: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCompanyChange = (value: string) => {
        setFormData((prev) => ({ ...prev, company: value, model: "" }));
    };

    const handleModelChange = (value: string) => {
        setFormData((prev) => ({ ...prev, model: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.contact)) {
            return toast.error("📱 Contact number must be exactly 10 digits.");
        }

        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!timeRegex.test(formData.preferredTime)) {
            return toast.error("⏰ Time must be in HH:MM format (24-hour).");
        }

        setLoading(true);
        try {
            const response = await fetch("/api/services/schedule-service", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("✅ Service Scheduled Successfully!");
                setFormData({
                    name: "",
                    contact: "",
                    company: "",
                    model: "",
                    serviceType: "",
                    preferredDate: "",
                    preferredTime: "",
                    notes: "",
                });
            } else {
                toast.error(data?.message || "Something went wrong.");
            }
        } catch (error) {
            toast.error("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-24 bg-gradient-to-b from-slate-100 to-indigo-50 dark:from-gray-900 dark:to-indigo-950">
            <div className="container mx-auto px-4 md:px-8 lg:px-20">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center text-gray-900 dark:text-white mb-12"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    Schedule a <span className="text-indigo-600">Service</span>
                </motion.h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Info */}
                    <motion.div
                        className="flex flex-col gap-6"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                    >
                        <div className="relative">
                            <div className="absolute -inset-2 w-44 h-44 bg-indigo-400/30 blur-2xl rounded-full -z-10" />
                            <FaWrench className="w-20 h-20 text-indigo-600 drop-shadow-xl" />
                        </div>
                        <h3 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white">
                            Keep Your Bike in Prime Shape
                        </h3>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-md">
                            From quick fixes to complete overhauls, our expert team ensures your
                            bike gets top-notch care.
                        </p>
                    </motion.div>

                    {/* Form */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeIn}
                        className="w-full max-w-2xl mx-auto"
                    >
                        <Card className="shadow-2xl border border-indigo-200/50 dark:border-indigo-700/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-800 dark:text-white">
                                    Service Booking Form
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <Label htmlFor="name">Full Name</Label>
                                        <Input
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="contact">Contact Number</Label>
                                        <Input
                                            id="contact"
                                            name="contact"
                                            type="tel"
                                            value={formData.contact}
                                            onChange={handleChange}
                                            required
                                            placeholder="9876543210"
                                        />
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="w-full">
                                            <Label htmlFor="company">Bike Company</Label>
                                            <Combobox
                                                id="company"
                                                options={Object.keys(bikeData)}
                                                value={formData.company}
                                                onChange={handleCompanyChange}
                                                placeholder="Select Company"
                                            />
                                        </div>

                                        <div className="w-full">
                                            <Label htmlFor="model">Bike Model</Label>
                                            <Combobox
                                                id="model"
                                                options={
                                                    formData.company ? bikeData[formData.company] : []
                                                }
                                                value={formData.model}
                                                onChange={handleModelChange}
                                                placeholder={
                                                    formData.company ? "Select Model" : "Choose Company First"
                                                }
                                                disabled={!formData.company}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="serviceType">Service Type</Label>
                                        <Input
                                            id="serviceType"
                                            name="serviceType"
                                            value={formData.serviceType}
                                            onChange={handleChange}
                                            required
                                            placeholder="Oil Change, Engine Check, etc."
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <div className="w-1/2">
                                            <Label htmlFor="preferredDate">Preferred Date</Label>
                                            <Input
                                                id="preferredDate"
                                                name="preferredDate"
                                                type="date"
                                                value={formData.preferredDate}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="w-1/2">
                                            <Label htmlFor="preferredTime">Preferred Time</Label>
                                            <Input
                                                id="preferredTime"
                                                name="preferredTime"
                                                type="time"
                                                value={formData.preferredTime}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <Label htmlFor="notes">Additional Notes</Label>
                                        <Textarea
                                            id="notes"
                                            name="notes"
                                            rows={3}
                                            value={formData.notes}
                                            onChange={handleChange}
                                            placeholder="Mention any specific issues or preferences."
                                        />
                                    </div>

                                    <div>
                                        <Button
                                            type="submit"
                                            disabled={loading}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-base font-medium rounded-xl transition-all duration-300 shadow-md"
                                        >
                                            {loading ? "Scheduling..." : "Schedule Now"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default ScheduleServices;
