import React from 'react'
import HeroHeader from '@/components/common/HeroHeader'
import ServicesCategories from '@/components/Services/ServicesCategories'
import DetailedServices from '@/components/Services/DetailedServices'
import ScheduleServices from '@/components/Services/ScheduleServices'

const ServicePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <HeroHeader
                title="Get in Touch"
                subtitle="Got questions, feedback, or just want to say hey? We're always up for a chat!"
                ctaText="Send Us a Message"
                ctaLink="#contact-form"
                imageUrl="/images/contact-hero.jpg" // Make sure this image exists
                overlay={true}
            />

            <ServicesCategories />
            <DetailedServices />
            <ScheduleServices />
        </div>
    )
}

export default ServicePage
