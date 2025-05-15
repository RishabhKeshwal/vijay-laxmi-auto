"use client";

import React from "react";
import HeroHeader from "@/components/common/HeroHeader";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";
import MapSection from "@/components/contact/MapSection";

const ContactPage = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-950">
            {/* Hero Section */}
            <HeroHeader
                title="Get in Touch"
                subtitle="Got questions, feedback, or just want to say hey? We're always up for a chat!"
                ctaText="Send Us a Message"
                ctaLink="#contact-form"
                imageUrl="/images/contact-hero.jpg" // Make sure this image exists
                overlay={true}
            />

            {/* Contact Info & Form */}
            <section className="py-16" id="contact-form">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <ContactInfo />
                        <ContactForm />
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <MapSection />
        </div>
    );
};

export default ContactPage;
