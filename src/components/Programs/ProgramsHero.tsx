'use client'

import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

export default function ProgramsHero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.pexels.com/photos/8471862/pexels-photo-8471862.jpeg"
          alt="Children learning and developing skills"
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
            Our <span className="text-primary">Programs</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto italic">
            &ldquo;The development of competence AND character — building future-ready skills 
            alongside ever-needed values.&rdquo;
          </p>
        </motion.div>
      </div>
    </section>
  )
}
