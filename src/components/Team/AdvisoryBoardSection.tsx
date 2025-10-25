'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import type { Media } from '@/payload-types';
import { getMediaUrl } from '@/lib/utils/getMediaUrl';

interface AdvisoryMember {
  id: string | number;
  name: string;
  profileImage: string | number | Media;
  bio: string;
}

interface AdvisoryBoardSectionProps {
  advisors: AdvisoryMember[];
}

const AdvisoryBoardSection: React.FC<AdvisoryBoardSectionProps> = ({ advisors }) => {
  if (advisors.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No advisory board members found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12 md:space-y-16">
      {advisors.map((advisor, index) => {
        const imageUrl = getMediaUrl(advisor.profileImage);

        return (
          <motion.div
            key={advisor.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col md:flex-row gap-6 md:gap-8 items-start"
          >
            {/* Circular Profile Image */}
            <div className="flex-shrink-0 mx-auto md:mx-0">
              <div className="relative w-48 h-48 overflow-hidden rounded-full border-4 border-primary/20">
                <Image
                  src={imageUrl}
                  alt={advisor.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 192px, 192px"
                />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                {advisor.name}
              </h3>
              <p className="text-base md:text-lg text-tertiary leading-relaxed whitespace-pre-wrap">
                {advisor.bio}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default AdvisoryBoardSection;
