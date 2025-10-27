'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import type { Partner } from '@/payload-types';

interface PartnerLogosProps {
  partners: Partner[];
}

const PartnerLogos: React.FC<PartnerLogosProps> = ({ partners }) => {
  // Fallback placeholder data if no partners are available
  const placeholderFoundations = [
    {
      id: 1,
      name: "Foundation One",
      industry: "Social Development",
      logo: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 2,
      name: "Foundation Two",
      industry: "Community Empowerment",
      logo: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    },
    {
      id: 3,
      name: "Foundation Three",
      industry: "Education & Skills",
      logo: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400&h=250&fit=crop"
    }
  ];

  // Use actual partners if available, otherwise use placeholders
  const displayPartners = partners.length > 0 ? partners : placeholderFoundations;
  const isUsingPlaceholders = partners.length === 0;

  return (
    <section className="py-20 bg-white overflow-hidden">
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
              Partnering with Corporate Organisations
            </h2>
            <p className="text-xl text-tertiary-600 max-w-3xl mx-auto mb-6">
              LightLives is partnering with several corporate organisations and there are various ways in which corporate organisations can participate:
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { label: 'Donations', icon: '💰' },
                { label: 'Sponsorships', icon: '🤝' },
                { label: 'Employee Volunteering Activities', icon: '👥' }
              ].map((way, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center space-x-2 bg-primary/10 text-tertiary px-5 py-3 rounded-none border border-primary/20 hover:bg-primary/20 transition-all"
                >
                  <span className="text-2xl">{way.icon}</span>
                  <span className="font-semibold">{way.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee with Partner/Foundation Logos */}
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={false}
        className="py-8"
      >
        {displayPartners.map((partner) => {
          // Handle both Partner type from CMS and placeholder type
          let partnerId: string | number;
          let partnerName: string;
          let partnerIndustry: string;
          let logoUrl: string = '';

          if (isUsingPlaceholders) {
            // Using placeholder data
            partnerId = partner.id;
            partnerName = partner.name;
            partnerIndustry = partner.industry;
            logoUrl = partner.logo as string;
          } else {
            // Using CMS Partner data
            const cmsPartner = partner as Partner;
            partnerId = cmsPartner.id;
            partnerName = cmsPartner.name;
            
            // Get industry label from select options
            if (typeof cmsPartner.industry === 'string') {
              const industryLabels: Record<string, string> = {
                'technology': 'Technology',
                'healthcare': 'Healthcare',
                'education': 'Education',
                'finance': 'Finance',
                'manufacturing': 'Manufacturing',
                'social-development': 'Social Development',
                'community-empowerment': 'Community Empowerment',
                'retail': 'Retail',
                'energy': 'Energy',
                'other': 'Other'
              };
              partnerIndustry = industryLabels[cmsPartner.industry] || cmsPartner.industry;
            } else {
              partnerIndustry = 'Partner';
            }
            
            // Get logo URL from Media object
            const logo = cmsPartner.logo;
            if (typeof logo === 'object' && logo !== null && 'url' in logo) {
              logoUrl = logo.url || '';
            }
          }

          return (
            <div
              key={partnerId}
              className="mx-8 group relative"
            >
              <div className="relative bg-white border-2 border-tertiary-200 rounded-none p-8 hover:border-primary hover:shadow-2xl transition-all duration-300 w-[400px] h-[250px] flex items-center justify-center overflow-hidden">
                {logoUrl && (
                  <Image
                    src={logoUrl}
                    alt={partnerName}
                    width={400}
                    height={250}
                    className="object-contain max-w-full max-h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                )}
                
                {/* Overlay with partner info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6">
                  <h3 className="text-white font-bold text-2xl mb-2">{partnerName}</h3>
                  <p className="text-white/90 text-sm">{partnerIndustry}</p>
                </div>
              </div>
            </div>
          );
        })}
      </Marquee>
    </section>
  );
};

export default PartnerLogos;
