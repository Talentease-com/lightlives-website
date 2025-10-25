'use client';

import React from 'react';
import { motion } from 'motion/react';
import Image from 'next/image';
import type { Media } from '@/payload-types';
import { getMediaUrl } from '@/lib/utils/getMediaUrl';

interface LeadershipMember {
  id: string | number;
  name: string;
  jobRole: string;
  profileImage: string | number | Media;
}

interface LeadershipGridProps {
  leaders: LeadershipMember[];
}

const LeadershipGrid: React.FC<LeadershipGridProps> = ({ leaders }) => {
  if (leaders.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No leadership team members found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
      {leaders.map((leader, index) => {
        const imageUrl = getMediaUrl(leader.profileImage);

        return (
          <motion.div
            key={leader.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="flex flex-col items-center text-center"
          >
            {/* Circular Profile Image */}
            <div className="relative w-40 h-40 mb-4 overflow-hidden rounded-full border-4 border-primary/20">
              <Image
                src={imageUrl}
                alt={leader.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, 160px"
              />
            </div>

            {/* Name */}
            <h3 className="text-xl font-bold text-primary mb-1">
              {leader.name}
            </h3>

            {/* Job Role */}
            <p className="text-base text-tertiary">
              {leader.jobRole}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

export default LeadershipGrid;
