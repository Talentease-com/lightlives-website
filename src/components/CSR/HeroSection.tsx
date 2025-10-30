'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Award, Users, School, Building2, CheckCircle, MessageSquareText as MessageSquare } from 'lucide-react';
import Image from 'next/image';
import SwooshButton from '@/components/ui/swoosh-button';
import AnimatedCounter from '@/components/Home/AnimatedCounter';
import type { Impact, PageImage, Media } from '@/payload-types';

interface HeroSectionProps {
  impactStats: Impact[];
  pageImages: PageImage | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({ impactStats, pageImages }) => {
  // Icon mapping for impact stats
  const iconMap = [Users, School, Award, Building2];

  // Get CSR hero image and alt text
  const csrHeroImage = pageImages?.csrHero as Media | undefined;
  const csrHeroAlt = pageImages?.csrHeroAlt || 'Corporate Social Responsibility';
  const heroImageUrl = csrHeroImage?.url || 'https://images.pexels.com/photos/6646930/pexels-photo-6646930.jpeg';

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-x-clip">
      {/* Background Pattern - Hexagons */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-none blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-none blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary rounded-none blur-3xl"></div>
      </div>

      {/* Hexagon SVG Decorations */}
      <svg
        className="absolute top-0 right-0 -translate-y-40 translate-x-40"
        width="560"
        height="720"
        viewBox="0 0 560 720"
        style={{ transform: 'rotate(45deg)' }}
      >
        <polygon
          points="300,30 516,154 516,404 300,530 84,404 84,154"
          fill="none"
          stroke="#ff801e"
          strokeWidth="10"
        />
      </svg>

      <svg
        className="absolute bottom-0 left-0 translate-y-75 -translate-x-110"
        width="560"
        height="720"
        viewBox="0 0 560 720"
        style={{ transform: 'rotate(45deg)' }}
      >
        <polygon
          points="300,30 516,154 516,404 300,530 84,404 84,154"
          fill="none"
          stroke="#ff801e"
          strokeWidth="10"
        />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-5rem)]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-tertiary px-4 py-2 rounded-none border border-primary/20">
              <Award className="h-4 w-4" />
              <span className="text-sm font-medium">CSR Partnership Opportunity</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-tertiary leading-tight">
                When you invest your
                <span className="block text-transparent bg-primary bg-clip-text font-bold">
                  CSR money
                </span>
              </h1>
              <p className="text-lg md:text-xl text-tertiary-600 leading-relaxed">
                You&apos;re possibly looking for a few things:
              </p>
            </div>

            {/* Value Propositions */}
            <div className="space-y-4">
              {[
                "Go beyond handouts. Invest in empowering beneficiaries to help themselves",
                "Work not just on symptoms, fix root causes. Long term solutions",
                "Work with partners who maximise impact of your CSR money. No frills.",
                "Measurable, tangible impact",
                "Not just 'helicopter' CSR. Get your employees involved.",
                "Support the big goal of nation building"
              ].map((proposition, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-2 h-2 bg-secondary rounded-none mt-2 flex-shrink-0"></div>
                  <span className="text-tertiary-600">{proposition}</span>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 pt-4 border-t border-tertiary-200">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-sm text-tertiary-600">CSR Registered</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-none shadow-2xl">
              <div className='relative overflow-hidden'>
                <Image
                  src={heroImageUrl}
                  alt={csrHeroAlt}
                  width={1000}
                  height={500}
                  className="w-full h-[500px] object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                <svg
                  className="absolute top-70 left-1/2 transform -translate-x-1/2"
                  width="620"
                  height="400"
                  viewBox="0 0 620 400"
                // style={{ transform: 'rotate(45deg)' }}
                >
                  <polygon
                    points="500,60 610,190 570,440 0,400 0,220 40,120"
                    fill="#1c365d"
                    strokeWidth="10"
                  />
                </svg>
              </div>
              {/* SwooshButton Floating */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up opacity-0 [animation-delay:800ms]">
                <SwooshButton href="/contact" className="bg-primary text-white font-bold py-8 px-8 text-lg shadow-xl" text="Let&apos;s Connect">
                  <span className="flex items-center gap-2">
                    <span>Lets Connect</span>
                    <MessageSquare className='h-5 w-5 text-white' />
                  </span>
                </SwooshButton>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-none blur-xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/20 rounded-none blur-xl"></div>
          </motion.div>
        </div>

        {/* Why LightLives Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 space-y-8"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-4">
              That&apos;s why LightLives could be your
              <span className="block text-transparent bg-primary bg-clip-text font-bold">
                preferred CSR partner
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              "Work with underprivileged children and young adults. Giving them future ready skills and values. They help themselves to succeed.",
              "Create leaders and changemakers. They will drive change. They will solve the big problems.",
              "Sponsorships aimed at maximising impact to beneficiaries. No wasteful expenditure. No crazy overheads.",
              "Get your employees to volunteer and feel engaged and involved.",
              "A marathon not a sprint. Long term engagements that build capability. For the community. For the nation."
            ].map((point, index) => (
              <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start space-x-3 p-4 bg-white border border-tertiary-200 rounded-none hover:shadow-lg transition-all duration-300"
              >
              <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
              <span className="text-tertiary-600">{point}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Impact Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-3 gap-6 mt-16 pb-16 max-w-4xl mx-auto"
        >
          {impactStats.slice(0, 4).map((stat, index) => {
            const Icon = iconMap[index % iconMap.length];

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="text-center p-6 bg-white rounded-none border border-tertiary-200 hover:shadow-2xl hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-none flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2 text-center">
                  <AnimatedCounter
                    value={stat.val}
                    format={stat.suffix || ''}
                    usePointer={false}
                    decimals={stat.decimals || 0}
                  />
                </div>
                <h3 className="font-semibold text-tertiary mb-1">{stat.desc}</h3>
                <p className="text-sm text-tertiary-500">
                  <span className="font-medium">
                    {stat.val2.toLocaleString('en-IN', {
                      minimumFractionDigits: stat.decimals2 || 0,
                      maximumFractionDigits: stat.decimals2 || 0
                    })}
                  </span> {stat.desc2}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Disclaimer */}
        <div className="text-center pb-16 animate-fade-in-up opacity-0 [animation-delay:1200ms]">
          <p className="text-tertiary-500 text-sm italic">
            * Delivered in collaboration with our partner organisation TalentEase. Lightlives began sessions in 2017.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
