'use client'

import React from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

export default function FrameworkImages() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-4">
            Research-Backed <span className="text-primary">Frameworks</span>
          </h2>
          <p className="text-xl text-tertiary-600 max-w-3xl mx-auto">
            Our programs are grounded in leading global research and frameworks
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* McKinsey Framework */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-gradient-to-br from-primary-50 to-white p-6 border-2 border-tertiary-200 shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="relative h-64 md:h-80 mb-6 overflow-hidden bg-tertiary-100">
              {/* TODO: Replace with actual McKinsey "Defining skills citizens will need" framework image */}
              {/* Source: McKinsey report (June 2021) */}
              <Image
                src="https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg"
                alt="McKinsey 21st Century Skills Framework - Placeholder"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white text-sm font-medium">Placeholder - Replace with McKinsey Framework</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-tertiary mb-3">
              Defining the skills citizens will need in the future world of work
            </h3>
            <p className="text-lg text-primary font-semibold mb-2">McKinsey, June 2021</p>
            <p className="text-tertiary-600 leading-relaxed">
              Our LEAD program aligns with McKinsey&apos;s comprehensive framework for 21st-century 
              skills, covering the DELTA competencies essential for future success.
            </p>
          </motion.div>

          {/* Sustainable Development Goals */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-secondary-50 to-white p-6 border-2 border-tertiary-200 shadow-lg hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="relative h-64 md:h-80 mb-6 overflow-hidden bg-tertiary-100">
              {/* TODO: Replace with official UN Sustainable Development Goals image */}
              {/* Source: UN SDG Resources */}
              <Image
                src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg"
                alt="UN Sustainable Development Goals - Placeholder"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <p className="text-white text-sm font-medium">Placeholder - Replace with SDG Goals</p>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-tertiary mb-3">
              Sustainable Development Goals
            </h3>
            <p className="text-lg text-secondary-700 font-semibold mb-2">United Nations</p>
            <p className="text-tertiary-600 leading-relaxed">
              Our programs directly contribute to achieving the UN&apos;s Sustainable Development 
              Goals, particularly Quality Education (SDG 4) and Reduced Inequalities (SDG 10).
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
