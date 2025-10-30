'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Users, School, Award, CheckCircle } from 'lucide-react';
import { AdaptiveCard } from '@/components/ui/cards';
import { PointerHighlight } from '@/components/ui/pointer-highlight';
import type { Impact } from '@/payload-types';
import AnimatedCounter from '@/components/Home/AnimatedCounter';

interface ImpactSectionProps {
  impactStats: Impact[];
  className?: string;
}

const ImpactSection: React.FC<ImpactSectionProps> = ({ impactStats, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className={`relative ${className}`}
    >
      <AdaptiveCard 
        glowColor="orange" 
        customSize={true}
        className="w-full p-8 "
      >
        <h2 className="text-4xl font-bold text-primary mb-6">
          Support Our Work
        </h2>
        
        <p className="text-tertiary-600 mb-8 leading-relaxed">
          Join us in creating a positive transformation in a child&apos;s life. Even a small contribution 
          will make a huge difference in a child&apos;s future. With your support, these children will 
          gain skills for life and educational aids.
        </p>

        <div className="space-y-6 mb-8">
          {impactStats.map((stat, index) => {
            // Use different icons based on index or you could add an icon field to the CMS
            const icons = [Users, School, Award];
            const Icon = icons[index % icons.length];
            
            return (
              <div key={stat.id} className="flex items-start space-x-4 group hover:scale-105 transition-all">
                <div className="bg-primary-100 text-primary p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-tertiary mb-1">
                    <AnimatedCounter 
                      value={stat.val} 
                      format={stat.suffix || ''} 
                      usePointer={stat.usePointer || false}
                      decimals={stat.decimals || 0}
                    />
                  </div>
                  <div className="text-lg font-semibold text-tertiary-700 mb-1">
                    {stat.desc}
                  </div>
                  <p className="text-tertiary-500 text-sm">
                    <span className="font-medium">
                      {stat.val2.toLocaleString('en-IN', {
                        minimumFractionDigits: stat.decimals2 || 0,
                        maximumFractionDigits: stat.decimals2 || 0
                      })}
                    </span> {stat.desc2}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className=" rounded-xl mb-6">
          <h3 className="text-xl font-bold text-tertiary mb-3">LEAD Program Impact</h3>
          <p className="text-tertiary-700 mb-4">
            Help us fund a child with Skills and Values program on a year round basis. 
            The LEAD program consists of 20-24 sessions a year with a session duration 
            being 90-120 minutes along with 4 full day events consisting of projects and challenges.
          </p>
          <p className="relative text-primary-600 font-semibold p-2 z-10">
            Your contribution can help a child with life and career success skills which can propel their future!
          </p>
        </div>

        <PointerHighlight pointerClassName="text-primary" rectangleClassName=' bg-secondary border border-secondary-300 ' containerClassName='mb-6 '>
          <div className="flex relative items-start space-x-2 z-10 m-4">
            <CheckCircle className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="text-tertiary font-medium">Tax Benefit Available</p>
              <p className="text-tertiary-700 text-sm">
                Your donation is eligible for income tax benefit under section 12 clause (iv) 
                of first proviso to sub-section (5) of section 80G of the Income Tax Act, 1961
              </p>
            </div>
          </div>
        </PointerHighlight>

        <div className="bg-tertiary-100 border border-tertiary-200 p-4 rounded-lg">
          <h4 className="font-semibold text-tertiary mb-2">Bank Transfer Details</h4>
          <p className="text-tertiary-600 text-sm mb-2">
            In case of difficulty in using cards or UPI, you could do a bank-to-bank transfer:
          </p>
          <div className="text-tertiary text-sm space-y-1">
            <p><strong>Light Lives Charitable Trust</strong></p>
            <p>Account No: 112105001291</p>
            <p>IFSC: ICIC0001121</p>
            <p>ICICI Bank, MG Road Hyderabad Branch</p>
          </div>
        </div>

        <p className="text-tertiary-500 text-sm mt-4 italic">
          * Delivered in collaboration with our partner organisation TalentEase. Lightlives began sessions in 2017.
        </p>
      </AdaptiveCard>
    </motion.div>
  );
};

export default ImpactSection;
