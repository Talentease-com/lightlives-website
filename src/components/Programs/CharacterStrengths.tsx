'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Award, Shield, Zap, Users, Heart, Sun, Sparkles } from 'lucide-react'

const characterStrengths = [
  { 
    name: 'Grit', 
    icon: Award, 
    borderClass: 'border-primary/30 hover:border-primary',
    bgClass: 'bg-primary-100',
    textClass: 'text-primary',
    hoverTextClass: 'group-hover:text-primary'
  },
  { 
    name: 'Self-control', 
    icon: Shield, 
    borderClass: 'border-primary/30 hover:border-primary',
    bgClass: 'bg-primary-100',
    textClass: 'text-primary',
    hoverTextClass: 'group-hover:text-primary'
  },
  { 
    name: 'Zest', 
    icon: Zap, 
    borderClass: 'border-primary/30 hover:border-primary',
    bgClass: 'bg-primary-100',
    textClass: 'text-primary',
    hoverTextClass: 'group-hover:text-primary'
  },
  { 
    name: 'Social Intelligence', 
    icon: Users, 
    borderClass: 'border-primary/30 hover:border-primary',
    bgClass: 'bg-primary-100',
    textClass: 'text-primary',
    hoverTextClass: 'group-hover:text-primary'
  },
  { 
    name: 'Gratitude', 
    icon: Heart, 
    borderClass: 'border-primary/30 hover:border-primary',
    bgClass: 'bg-primary-100',
    textClass: 'text-primary',
    hoverTextClass: 'group-hover:text-primary'
  },
  { 
    name: 'Optimism', 
    icon: Sun, 
    borderClass: 'border-primary/30 hover:border-primary',
    bgClass: 'bg-primary-100',
    textClass: 'text-primary',
    hoverTextClass: 'group-hover:text-primary'
  },
  { 
    name: 'Curiosity', 
    icon: Sparkles, 
    borderClass: 'border-primary/30 hover:border-primary',
    bgClass: 'bg-primary-100',
    textClass: 'text-primary',
    hoverTextClass: 'group-hover:text-primary'
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const chipVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
}

export default function CharacterStrengths() {
  return (
    <section className="py-24 bg-gradient-to-br from-secondary-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">
            Seven Character <span className="text-primary">Strengths</span>
          </h2>
          <p className="text-xl text-tertiary-700 max-w-4xl mx-auto mb-4">
            Our program develops the seven character strengths identified by 
            <strong> Angela Duckworth, David Levin, and Dominic Randolph</strong>
          </p>
          <p className="text-lg text-tertiary-600 italic">
            As referenced in &ldquo;How Children Succeed&rdquo; by Paul Tough
          </p>
        </motion.div>

        {/* Character Strengths Grid - Symmetrical Layout */}
        <div className="flex flex-col items-center gap-4 mb-12">
          {/* First Row - 3 items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-4 w-full max-w-4xl justify-items-center"
          >
            {characterStrengths.slice(0, 3).map((strength) => {
              const Icon = strength.icon
              return (
                <motion.div
                  key={strength.name}
                  variants={chipVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`group bg-white backdrop-blur-[5px] p-6 border-2 ${strength.borderClass} shadow-md hover:shadow-xl transition-all duration-300 cursor-default w-full max-w-xs`}
                >
                  <div className={`${strength.bgClass} ${strength.textClass} w-12 h-12 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className={`text-xl font-bold text-center text-tertiary ${strength.hoverTextClass} transition-colors duration-300`}>
                    {strength.name}
                  </h3>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Second Row - 4 items */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-5xl justify-items-center"
          >
            {characterStrengths.slice(3, 7).map((strength) => {
              const Icon = strength.icon
              return (
                <motion.div
                  key={strength.name}
                  variants={chipVariants}
                  whileHover={{ scale: 1.05, y: -4 }}
                  className={`group bg-white backdrop-blur-[5px] p-6 border-2 ${strength.borderClass} shadow-md hover:shadow-xl transition-all duration-300 cursor-default w-full max-w-xs`}
                >
                  <div className={`${strength.bgClass} ${strength.textClass} w-12 h-12 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className={`text-xl font-bold text-center text-tertiary ${strength.hoverTextClass} transition-colors duration-300`}>
                    {strength.name}
                  </h3>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Paul Tough Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative bg-gradient-to-r from-[#1c365d] via-[#2a4a7c] to-[#1c365d] p-8 md:p-12 overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/10 rounded-full translate-x-20 translate-y-20"></div>

          <div className="relative z-10">
            <div className="flex items-start mb-6">
              <div className="text-primary text-6xl md:text-8xl font-serif leading-none mr-4">&ldquo;</div>
              <div className="flex-1">
                <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-6">
                  What matters most in a child&apos;s development...is not how much information we 
                  can stuff into her brain…What matters instead, is whether we are able to help her 
                  develop a very different set of qualities, a list that includes persistence, 
                  self-control, curiosity, conscientiousness, grit and self-confidence. Economists 
                  refer to these as non-cognitive skills, psychologists call them personality traits, 
                  and the rest of us sometimes think of them as{' '}
                  <span className="text-primary font-bold text-3xl">CHARACTER</span>.
                </blockquote>
                <p className="text-lg md:text-xl text-white/90 italic">
                  According to this new way of thinking, the conventional wisdom about child 
                  development over the past few decades has been misguided. We have been focusing 
                  on the wrong skills and abilities in our children, and we have been using the 
                  wrong strategies to help nurture and teach those skills.
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl md:text-2xl text-primary-300 font-semibold">
                — Paul Tough
              </p>
              <p className="text-lg text-white/80 italic">
                How Children Succeed
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
