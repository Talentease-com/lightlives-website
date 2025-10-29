'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Rocket, 
  TrendingUp, 
  Infinity, 
  Target, 
  Users, 
  BarChart3, 
  Handshake, 
  CheckSquare, 
  Package, 
  ArrowRight, 
  Calendar, 
  FileText 
} from 'lucide-react';
import Image from 'next/image';
import SwooshButton from '@/components/ui/swoosh-button';

const PartnershipFramework = () => {
  const [activePhase, setActivePhase] = useState(0);

  const frameworkPhases = [
    {
      id: 1,
      phase: "Discovery & Assessment",
      duration: "Months 1-2",
      icon: Search,
      
      title: "Understanding Your CSR Vision",
      description: "Listen to and understand your corporate values, CSR objectives, and community impact goals.",
      activities: [
        "Stakeholder consultation sessions",
        "CSR goal alignment workshop if you want it", 
        "Target low income school/college needs assessment",
        "Impact measurement framework design"
      ],
      deliverables: [
        "Partnership roadmap",
        "Baseline impact metrics",
        "Customized program design",
        "Success measurement criteria"
      ],
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
    },
    {
      id: 2,
      phase: "Program Design & Launch",
      duration: "Months 3-8",
      icon: Rocket,
      
      title: "Strategic Program Implementation",
      description: "Co-creating sustainable programs that align with your brand values and community needs.",
      activities: [
        "Program curriculum development",
        "Identification of target low-income schools/colleges from shortlist",
        "Resource allocation planning",
        "Team deployment"
      ],
      deliverables: [
        "Pilot program launch",
        "Engagement protocols",
        "Progress tracking systems",
        "Initial impact reports"
      ],
      image: "https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg"
    },
    {
      id: 3,
      phase: "Scale & Optimize",
      duration: "Months 9-18",
      icon: TrendingUp,
      
      title: "Expanding Impact Reach",
      description: "Scaling successful interventions while continuously optimizing for maximum benefit to the children and young adults we serve",
      activities: [
        "Program expansion planning",
        "Performance optimization",
        "Stakeholder feedback integration",
        "Impact amplification strategies"
      ],
      deliverables: [
        "Scaled program operations",
        "Enhanced impact metrics",
        "Success stories",
        "ROI analysis reports"
      ],
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
    },
    {
      id: 4,
      phase: "Sustain & Evolve",
      duration: "Years 2-5+",
      icon: Infinity,

      title: "Long-term Partnership Excellence",
      description: "Building self-sustaining programs that create generational impact and community ownership.",
      activities: [
        "Community ownership transition",
        "Leadership development programs",
        "Innovation integration",
        "Legacy planning initiatives"
      ],
      deliverables: [
        "Self-sustaining programs",
        "Community leadership networks",
        "Generational impact evidence",
        "Partnership evolution roadmap"
      ],
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
    }
  ];

  const partnershipPrinciples = [
    {
      icon: Target,
      title: "Impact-First Approach",
      description: "Every initiative designed with measurable community transformation as the primary goal."
    },
    {
      icon: Users,
      title: "Community Ownership",
      description: "Programs that empower local leadership and create sustainable change from within."
    },
    {
      icon: BarChart3,
      title: "Transparent Reporting",
      description: "Real-time dashboards and comprehensive impact reports for complete visibility."
    },
    {
      icon: Handshake,
      title: "Strategic Alignment",
      description: "Perfect integration with your corporate values and business objectives."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-4">
              Join Us in Shaping Leaders, Creating Impact
            </h2>
            <p className="text-xl text-tertiary-600 max-w-3xl mx-auto mb-8">
              Partner with us in building a legacy of strong, ethical leaders. Your CSR funding will not only support our Leadership Skills and Values Program but will contribute to a more resilient and empowered society.
            </p>
          </motion.div>
        </div>

        {/* Partnership Principles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {partnershipPrinciples.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-none border border-tertiary-200 hover:shadow-2xl transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-tertiary mb-2">{principle.title}</h3>
                <p className="text-sm text-tertiary-600">{principle.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Framework Phases */}
        <div className="bg-white rounded-none border border-tertiary-200 overflow-hidden shadow-2xl">
          {/* Phase Navigation - Tab Style */}
          <div className="border-b border-tertiary-200 bg-secondary/30">
            <div className="flex overflow-x-auto">
              {frameworkPhases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <button
                    key={phase.id}
                    onClick={() => setActivePhase(index)}
                    className={`flex-shrink-0 flex items-center space-x-3 px-6 py-4 font-medium transition-all duration-300 border-b-2 ${
                      activePhase === index
                        ? 'border-primary text-tertiary bg-white'
                        : 'border-transparent text-tertiary-600 hover:text-tertiary hover:bg-secondary/50'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <div className="text-left">
                      <div className="text-sm font-semibold">{phase.phase}</div>
                      <div className="text-xs opacity-75">{phase.duration}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Phase Content */}
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="p-8"
          >
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-tertiary mb-2">
                    {frameworkPhases[activePhase].title}
                  </h3>
                  <p className="text-tertiary-600 mb-4">
                    {frameworkPhases[activePhase].description}
                  </p>
                  <div className="flex items-center space-x-2 text-sm text-tertiary-600">
                    <Calendar className="h-4 w-4" />
                    <span>{frameworkPhases[activePhase].duration}</span>
                  </div>
                </div>

                {/* Activities */}
                <div>
                  <h4 className="font-semibold text-tertiary mb-3 flex items-center space-x-2">
                    <CheckSquare className="h-5 w-5" />
                    <span>Key Activities</span>
                  </h4>
                  <ul className="space-y-2">
                    {frameworkPhases[activePhase].activities.map((activity, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-primary rounded-none mt-2 flex-shrink-0"></div>
                        <span className="text-tertiary-600">{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Deliverables */}
                <div>
                  <h4 className="font-semibold text-tertiary mb-3 flex items-center space-x-2">
                    <Package className="h-5 w-5" />
                    <span>Deliverables</span>
                  </h4>
                  <ul className="space-y-2">
                    {frameworkPhases[activePhase].deliverables.map((deliverable, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ArrowRight className="h-4 w-4 text-secondary mt-0.5 flex-shrink-0" />
                        <span className="text-tertiary-600">{deliverable}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Visual */}
              <div className="relative">
                <div className="rounded-none overflow-hidden shadow-2xl">
                  <Image
                    src={frameworkPhases[activePhase].image}
                    alt={`${frameworkPhases[activePhase].title} visualization`}
                    width={800}
                    height={320}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-tertiary backdrop-blur-[5px] rounded-none p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-secondary">Phase {frameworkPhases[activePhase].id}</p>
                          <p className="text-sm text-secondary">{frameworkPhases[activePhase].phase}</p>
                        </div>
                        <div className={`w-10 h-10 bg-primary/10 rounded-none flex items-center justify-center`}>
                          {React.createElement(frameworkPhases[activePhase].icon, { 
                            className: `h-5 w-5 text-primary` 
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-none border border-tertiary-200"
        >
          <h3 className="text-2xl font-bold text-tertiary mb-4">
            Ready to Begin Your Partnership Journey?
          </h3>
          <p className="text-tertiary-600 mb-6 max-w-2xl mx-auto">
            Let&apos;s discuss how our framework can be customized to achieve your specific CSR objectives 
            and create lasting community impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <SwooshButton 
              href="/contact" 
              className="bg-tertiary text-white font-bold py-8 px-8 text-lg shadow-xl"
              text="Schedule Strategy Session"
            />
            <button 
              disabled
              className="border border-tertiary-200 px-8 py-3 rounded-none font-semibold transition-colors flex items-center justify-center space-x-2 opacity-50 cursor-not-allowed"
            >
              <FileText className="h-5 w-5" />
              <span>Download Framework Guide</span>
            </button>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
};

export default PartnershipFramework;
