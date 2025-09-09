'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface HeroSlideshowProps {
  images: string[];
}

const HeroSlideshow: React.FC<HeroSlideshowProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 7000);

    return () => {
      clearInterval(slideTimer);
    };
  }, [images.length]);

  return (
    <>
      {/* Background Slideshow */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0.7, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          exit={{ opacity: 1 }}
          transition={{ 
            opacity: { duration: 0.5  },
            scale: { duration: 7, ease: "linear" }
          }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentSlide]}
            alt="Children learning"
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </motion.div>
      </AnimatePresence>

      {/* Slide Indicators */}
      {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div> */}
    </>
  );
};

export default HeroSlideshow;
