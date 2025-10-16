'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface VideoLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title: string;
  description?: string;
  currentIndex?: number;
  totalVideos?: number;
  onPrevious?: () => void;
  onNext?: () => void;
  showNavigation?: boolean;
}

const VideoLightbox: React.FC<VideoLightboxProps> = ({
  isOpen,
  onClose,
  videoUrl,
  title,
  description,
  currentIndex,
  totalVideos,
  onPrevious,
  onNext,
  showNavigation = false,
}) => {
  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onPrevious, onNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              aria-label="Close video"
            >
              <X className="h-8 w-8" />
            </button>

            {/* Video Player */}
            <div className="bg-black aspect-video flex items-center justify-center rounded-none overflow-hidden">
              {videoUrl ? (
                <div className="w-full h-full">
                  {/* Placeholder for actual video player implementation */}
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={title}
                  />
                </div>
              ) : (
                <div className="text-center text-white">
                  <Play className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Video player will be implemented here</p>
                  <p className="text-sm text-gray-400 mt-2">{title}</p>
                </div>
              )}
            </div>

            {/* Video Info */}
            {(title || description) && (
              <div className="mt-4 text-white">
                <h3 className="text-2xl font-bold mb-2">{title}</h3>
                {description && <p className="text-gray-300 mb-4">{description}</p>}
              </div>
            )}

            {/* Navigation Buttons */}
            {showNavigation && onPrevious && (
              <button
                onClick={onPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-200"
                aria-label="Previous video"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
            )}
            {showNavigation && onNext && (
              <button
                onClick={onNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 backdrop-blur-sm p-3 rounded-full transition-all duration-200"
                aria-label="Next video"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            )}

            {/* Video Counter */}
            {showNavigation && currentIndex !== undefined && totalVideos !== undefined && (
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
                {currentIndex + 1} / {totalVideos}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VideoLightbox;
