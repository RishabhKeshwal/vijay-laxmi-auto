"use client";

import React from "react";
import HeroHeader from "@/components/common/HeroHeader"; // Adjust path based on your file structure
import CompanyOverview from "@/components/about/CompanyOverview";
import Milestones from "@/components/about/Milestones";
import Values from "@/components/about/Values";
import CTASection from "@/components/about/CTASection";

const AboutPage = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-950">
            {/* Hero Header */}
            <HeroHeader
                title="About Us"
                subtitle="We’re all about epic rides and epic vibes—your two-wheeler crew since day one."
                ctaText="Meet the Team"
                ctaLink="/about#team"
                imageUrl="/images/about-hero.jpg"
                overlay={true}
                textAlign="center"
            />

            <CompanyOverview />
            <Milestones />
            <Values />
            <CTASection />
        </div>
    );
};

export default AboutPage;
