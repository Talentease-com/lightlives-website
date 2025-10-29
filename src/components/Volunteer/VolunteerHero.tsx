'use client'

import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'
import type { PageImage, Media } from '@/payload-types'

interface VolunteerHeroProps {
  pageImages: PageImage | null;
}

export default function VolunteerHero({ pageImages }: VolunteerHeroProps) {
  // Get volunteer hero image and alt text
  const volunteerHeroImage = pageImages?.volunteerHero as Media | undefined;
  const volunteerHeroAlt = pageImages?.volunteerHeroAlt || 'Volunteer with LightLives';
  const heroImageUrl = volunteerHeroImage?.url || 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg';

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={heroImageUrl}
          alt={volunteerHeroAlt}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/70"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Volunteer With <span className="text-primary">Us</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto">
            Sure you can sponsor our work. But there&apos;s another way you can get involved - by volunteering
          </p>
        </motion.div>
      </div>
    </section>
  )
}
