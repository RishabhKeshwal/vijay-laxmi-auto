// app/layout.tsx
import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import '../globals.css'
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SessionProviders from "@/providers/SessionProviders";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const firaCode = Fira_Code({
    subsets: ["latin"],
    variable: "--font-mono",
    display: "swap",
});

export const metadata: Metadata = {
    title: "Vijay Laxmi Auto | Reliable Vehicle Services",
    description:
        "Explore premium vehicle services, trusted mechanics, and more at Vijay Laxmi Auto. Experience reliability and service excellence today!",
    keywords: ["Auto", "Vehicles", "Services", "Mechanics", "Reliable", "Car Service"],
    icons: {
        icon: "/favicon.ico",
    },
    metadataBase: new URL("https://vijaylaxmiauto.com"),
    openGraph: {
        title: "Vijay Laxmi Auto",
        description: "Your trusted partner for vehicle services and support.",
        url: "https://vijaylaxmiauto.com",
        siteName: "Vijay Laxmi Auto",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${inter.variable} ${firaCode.variable} font-sans antialiased bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100`}
            >
                <SessionProviders>
                    <Navbar />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </SessionProviders>
            </body>
        </html>
    );
}
