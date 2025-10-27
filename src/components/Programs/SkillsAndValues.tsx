'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Brain, Heart } from 'lucide-react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
}

export default function SkillsAndValues() {
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
            Competence <span className="text-primary">&</span> Character
          </h2>
          <p className="text-xl text-tertiary-600 max-w-3xl mx-auto">
            Our programs uniquely combine future-ready skills with timeless values
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {/* Future-Ready Skills */}
          <motion.div
            variants={cardVariants}
            className="group relative bg-gradient-to-br from-primary-50 to-secondary-100 p-8 md:p-10 backdrop-blur-[5px] border border-tertiary-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="relative z-10">
              <div className="bg-primary-100 text-primary w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8" />
              </div>

              <h3 className="text-3xl font-bold text-tertiary mb-4 group-hover:text-primary transition-colors duration-300">
                Future-Ready Skills
              </h3>

              <p className="text-lg text-tertiary-700 leading-relaxed mb-4">
                Covers both future-ready skills and ever-needed values—the development of 
                <strong> competence AND character</strong>.
              </p>

              <p className="text-base text-tertiary-600 leading-relaxed">
                Our curriculum addresses the critical skills gap, preparing children not just 
                academically but for successful personal and professional lives.
              </p>
            </div>
          </motion.div>

          {/* Ever-Needed Values */}
          <motion.div
            variants={cardVariants}
            className="group relative bg-gradient-to-br from-secondary-100 to-primary-50 p-8 md:p-10 backdrop-blur-[5px] border border-tertiary-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            {/* Hover shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

            <div className="relative z-10">
              <div className="bg-secondary-100 text-secondary-700 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8" />
              </div>

              <h3 className="text-3xl font-bold text-tertiary mb-4 group-hover:text-secondary-700 transition-colors duration-300">
                Ever-Needed Values
              </h3>

              <p className="text-lg text-tertiary-700 leading-relaxed mb-4">
                Rather than training &lsquo;memory machines,&rsquo; we nurture <strong>curious, 
                confident, and creative individuals</strong> with strong character foundations.
              </p>

              <p className="text-base text-tertiary-600 leading-relaxed">
                We focus on the &lsquo;PREPARE&rsquo; job at school—building lasting character 
                traits that make an early and enduring difference.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
