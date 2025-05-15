"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { div } from "framer-motion/client";
import Hero from "@/components/home/Hero";
import TrustedPartners from "@/components/home/TrustedPartners";
import PromotionSection from "@/components/home/PromotionSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <TrustedPartners />
      <PromotionSection />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}