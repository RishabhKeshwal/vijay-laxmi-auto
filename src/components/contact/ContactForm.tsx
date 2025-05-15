"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

const ContactForm = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            toast.error("Please fill out all fields.");
            return;
        }

        setLoading(true);

        const toastId = toast.loading("Sending your message...");

        try {
            const res = await fetch("/api/contact/create-querie", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const text = await res.text();
                throw new Error(`Server error: ${res.status} - ${text}`);
            }

            const data = await res.json();

            toast.success(data.message || "Message sent successfully!", {
                id: toastId,
            });

            setFormData({ name: "", email: "", phone: "", message: "" });
        } catch (error) {
            toast.error((error as Error).message || "Something went wrong.", {
                id: toastId,
            });
        } finally {
            setLoading(false);
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    };

    return (
        <div className="bg-white dark:bg-muted shadow-md rounded-2xl p-6 md:p-10 border border-border">
            <motion.h2
                className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6 tracking-tight"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                Send Us a <span className="text-indigo-600">Message</span>
            </motion.h2>

            <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="Your Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                        id="message"
                        name="message"
                        placeholder="How can we assist you?"
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        disabled={loading}
                        required
                    />
                </div>

                <motion.div whileHover={{ scale: loading ? 1 : 1.03 }}>
                    <Button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold"
                        disabled={loading}
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </Button>
                </motion.div>
            </motion.form>
        </div>
    );
};

export default ContactForm;
