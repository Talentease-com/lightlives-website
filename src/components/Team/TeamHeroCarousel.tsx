'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import type { Media } from '@/payload-types';
import { getMediaUrl } from '@/lib/utils/getMediaUrl';

interface TeamCarouselImage {
  image: string | number | Media;
  alt: string;
  id: string | number;
}

interface TeamHeroCarouselProps {
  images: TeamCarouselImage[];
}

const TeamHeroCarousel: React.FC<TeamHeroCarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => {
      clearInterval(slideTimer);
    };
  }, [images.length]);

  if (images.length === 0) {
    return (
      <div className="relative h-screen w-full bg-primary flex items-center justify-center">
        <h1 className="text-5xl md:text-7xl font-bold text-white">Meet the Team</h1>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 1 }}
          transition={{
            opacity: { duration: 0.5 },
            scale: { duration: 5, ease: 'linear' },
          }}
          className="absolute inset-0"
        >
          <Image
            src={getMediaUrl(images[currentSlide].image)}
            alt={images[currentSlide].alt}
            fill
            className="object-cover"
            priority={currentSlide === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </motion.div>
      </AnimatePresence>

      {/* Overlay Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center px-4"
        >
          Meet the Team
        </motion.h1>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 transition-all duration-300 rounded-none ${
              currentSlide === index
                ? 'bg-secondary w-8'
                : 'bg-white/50 hover:bg-white/75 w-3'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamHeroCarousel;
