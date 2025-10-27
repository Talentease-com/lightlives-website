'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Calendar, Target, Users, Award } from 'lucide-react'

const programFeatures = [
  {
    icon: Calendar,
    title: 'Weekly Sessions',
    description: 'Runs once a week throughout the academic year',
    bgClass: 'bg-primary-100',
    textClass: 'text-primary',
  },
  {
    icon: Target,
    title: 'Long-Term Impact',
    description: '8-12 years accompanying students through their journey',
    bgClass: 'bg-secondary-100',
    textClass: 'text-secondary-700',
  },
  {
    icon: Users,
    title: 'Child-Centric Approach',
    description: 'Children are active co-creators, not passive recipients',
    bgClass: 'bg-tertiary-100',
    textClass: 'text-tertiary',
  },
  {
    icon: Award,
    title: 'Continuous Development',
    description: 'Designed as long-term interventions for sustained growth',
    bgClass: 'bg-primary-100',
    textClass: 'text-primary',
  },
]

export default function LEADProgram() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-4">
            The <span className="text-primary">LEAD</span> Program
          </h2>
          <p className="text-2xl text-tertiary-700 font-medium mb-2">
            Leadership Experience And Development
          </p>
          <p className="text-xl text-tertiary-600 max-w-3xl mx-auto">
            A comprehensive, child-centric program designed for lasting impact
          </p>
        </motion.div>

        {/* Program Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {programFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-[5px] p-6 border border-tertiary-200 shadow-md hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`${feature.bgClass} ${feature.textClass} w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-tertiary mb-2">{feature.title}</h3>
                <p className="text-tertiary-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* DELTA Skills Callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-r from-[#1c365d] via-[#2a4a7c] to-[#1c365d] p-8 md:p-10 border-l-4 border-primary"
        >
          <div className="flex items-start space-x-4">
            <div className="bg-primary w-12 h-12 flex items-center justify-center flex-shrink-0">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-3">
                Based on Leading Global Frameworks
              </h3>
              <p className="text-lg text-white/90 leading-relaxed">
                Our curriculum covers most of the <strong>DELTA skills</strong> referenced in 
                McKinsey&apos;s 21st Century Skills Framework, ensuring students develop the 
                competencies needed to thrive in tomorrow&apos;s world.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
