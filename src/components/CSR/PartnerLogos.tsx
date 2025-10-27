'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

const PartnerLogos = () => {
  const foundations = [
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
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-tertiary-600 max-w-3xl mx-auto">
              Join forward-thinking corporations who have transformed their CSR approach through strategic partnerships with LightLives.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Marquee with Foundation Logos */}
      <Marquee
        gradient={false}
        speed={40}
        pauseOnHover={false}
        className="py-8"
      >
        {foundations.map((foundation) => (
          <div
            key={foundation.id}
            className="mx-8 group relative"
          >
            <div className="relative bg-white border-2 border-tertiary-200 rounded-none p-8 hover:border-primary hover:shadow-2xl transition-all duration-300 w-[400px] h-[250px] flex items-center justify-center overflow-hidden">
              <Image
                src={foundation.logo}
                alt={foundation.name}
                width={400}
                height={250}
                className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
              />
              
              {/* Overlay with foundation info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end p-6">
                <h3 className="text-white font-bold text-2xl mb-2">{foundation.name}</h3>
                <p className="text-white/90 text-sm">{foundation.industry}</p>
              </div>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default PartnerLogos;
