'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CarouselItem {
  title: string;
  description: string;
}

interface HeroCarouselProps {
  items: CarouselItem[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ items }) => {
  const [currentCarousel, setCurrentCarousel] = useState(0);

  useEffect(() => {
    const carouselTimer = setInterval(() => {
      setCurrentCarousel((prev) => (prev + 1) % items.length);
    }, 9000);

    return () => {
      clearInterval(carouselTimer);
    };
  }, [items.length]);

  return (
    <>
      {/* Auto-sliding Carousel */}
      <div className="mb-8 h-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCarousel}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
          >
            <h3 className="text-xl font-semibold mb-3 text-primary-400">
              {items[currentCarousel].title}
            </h3>
            <p className="text-gray-100">
              {items[currentCarousel].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Carousel Indicators */}
      <div className="flex space-x-2 mt-16 sm:mt-12 md:mt-8 lg:mt-12 ml-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentCarousel(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentCarousel === index
                ? 'bg-secondary w-8'
                : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </>
  );
};

export default HeroCarousel;
