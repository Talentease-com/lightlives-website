'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Users, BookOpen, Share2, Camera, Compass, Briefcase } from 'lucide-react'

const opportunities = [
  {
    icon: Users,
    title: 'Session Facilitator',
    description:
      "Come in to assist our Facilitator in running the sessions. We'll provide you a brief orientation and some training before you start.",
    gradient: 'from-primary-100 to-secondary-100',
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary',
  },
  {
    icon: BookOpen,
    title: 'Content Contribution',
    description:
      "Contribute your knowledge and experience to our content and curriculum and take up the design and development of specific modules that you're passionate about and expert at.",
    gradient: 'from-secondary-100 to-primary-100',
    iconBg: 'bg-secondary-100',
    iconColor: 'text-secondary-700',
  },
  {
    icon: Share2,
    title: 'Social Media',
    description:
      'Tell our story and showcase our work through case stories on our social media handles. Collect required media and create reels, shorts, videos and carousels and posts for our various platforms.',
    gradient: 'from-primary-100 to-secondary-100',
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary',
  },
  {
    icon: Camera,
    title: 'Photography',
    description:
      'Capture "Wow" moments during our in classroom sessions with the Facilitator and Children. Shoot high impact video testimonials about students learning journey. Freshers are welcome for this role.',
    gradient: 'from-secondary-100 to-primary-100',
    iconBg: 'bg-secondary-100',
    iconColor: 'text-secondary-700',
  },
  {
    icon: Compass,
    title: 'Career Guidance',
    description:
      'Looking for persons with coaching experience who can guide students with a choice of Education and potential careers they can look forward to (based on a diagnostic tool). This would be especially for the higher grade school children and college students.',
    gradient: 'from-primary-100 to-secondary-100',
    iconBg: 'bg-primary-100',
    iconColor: 'text-primary',
  },
  {
    icon: Briefcase,
    title: 'World@Work Mentors',
    description:
      'If you are someone with several years of work experience we would be happy if could speak with our students about your field and a roadmap to pave their way there. You could also share your experience and knowledge with the students which would be highly beneficial to them.',
    gradient: 'from-secondary-100 to-primary-100',
    iconBg: 'bg-secondary-100',
    iconColor: 'text-secondary-700',
  },
]

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

export default function VolunteerOpportunities() {
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
            Ways You Could <span className="text-primary">Volunteer</span>
          </h2>
          <p className="text-xl text-tertiary-600 max-w-3xl mx-auto">
            Choose how you&apos;d like to contribute your time and expertise to transform young lives
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
            {opportunities.map((opportunity) => {
            const Icon = opportunity.icon
            return (
              <motion.div
                key={opportunity.title}
                variants={cardVariants}
                className={`group relative bg-gradient-to-br ${opportunity.gradient} p-8 md:p-10 backdrop-blur-[5px] border border-tertiary-200 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden`}
              >
                {/* Hover shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <div className="relative z-10">
                  <div className={`${opportunity.iconBg} ${opportunity.iconColor} w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="text-3xl font-bold text-tertiary mb-4 group-hover:text-primary transition-colors duration-300">
                    {opportunity.title}
                  </h3>

                  <p className="text-lg text-tertiary-700 leading-relaxed">
                    {opportunity.description}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-primary/10 to-transparent"></div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
