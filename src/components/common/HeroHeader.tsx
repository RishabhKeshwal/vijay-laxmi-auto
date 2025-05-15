"use client";

import React from "react";

interface HeroHeaderProps {
    title: string;
    subtitle?: string;
    imageUrl: string;
    textAlign?: "left" | "center" | "right";
    overlay?: boolean;
    ctaText?: string;
    ctaLink?: string;
}

const HeroHeader: React.FC<HeroHeaderProps> = ({
    title,
    subtitle,
    imageUrl,
    textAlign = "center",
    overlay = true,
    ctaText,
    ctaLink,
}) => {
    const alignmentClass =
        textAlign === "left"
            ? "text-left items-start"
            : textAlign === "right"
                ? "text-right items-end"
                : "text-center items-center";

    return (
        <div
            className="relative w-full h-[70vh] flex items-center justify-center"
            style={{
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Optional dark overlay */}
            {overlay && <div className="absolute inset-0 bg-black/50 z-0"></div>}

            {/* Content */}
            <div
                className={`relative z-10 px-6 max-w-4xl flex flex-col ${alignmentClass}`}
            >
                <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-xl">
                    {title}
                </h1>
                {subtitle && (
                    <p className="mt-4 text-lg md:text-2xl text-white/90 drop-shadow-md">
                        {subtitle}
                    </p>
                )}
                {ctaText && ctaLink && (
                    <a
                        href={ctaLink}
                        className="mt-6 inline-block bg-yellow-400 text-black font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-300 transition"
                    >
                        {ctaText}
                    </a>
                )}
            </div>
        </div>
    );
};

export default HeroHeader;
