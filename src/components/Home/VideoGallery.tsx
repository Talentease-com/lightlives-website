
'use client';

import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import Image from 'next/image';
import VideoLightbox from '@/components/ui/video-lightbox';
import type { VideoGallery as VideoGalleryType } from '@/payload-types';

interface VideoGalleryProps {
  videos: VideoGalleryType[];
}

interface ProcessedVideo {
  id: string | number;
  thumbnail: string;
  title: string;
  duration?: string | null;
  videoUrl: string;
  description?: string | null;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos }) => {
  const [selectedVideoIndex, setSelectedVideoIndex] = useState<number | null>(null);

  // Process CMS data into format needed for display
  const processedVideos: ProcessedVideo[] = videos.map(video => {
    // Get thumbnail URL - priority: thumbnailUrl > thumbnail upload > fallback
    let thumbnailUrl = 'https://images.pexels.com/photos/8926547/pexels-photo-8926547.jpeg';
    
    // First priority: direct thumbnailUrl
    if (video.thumbnailUrl) {
      thumbnailUrl = video.thumbnailUrl;
    } 
    // Second priority: uploaded thumbnail
    else if (video.thumbnail) {
      const media = video.thumbnail;
      if (typeof media === 'object' && media !== null && 'url' in media) {
        thumbnailUrl = media.url || thumbnailUrl;
      }
    }

    // Get video URL (prefer videoUrl over videoFile)
    let videoUrl = '';
    if (video.videoUrl) {
      videoUrl = video.videoUrl;
    } else if (video.videoFile) {
      const media = video.videoFile;
      if (typeof media === 'object' && media !== null && 'url' in media) {
        videoUrl = media.url || '';
      }
    }

    return {
      id: video.id,
      thumbnail: thumbnailUrl,
      title: video.title,
      duration: video.duration,
      videoUrl,
      description: video.description,
    };
  });

  // Fallback videos if no CMS data
  const fallbackVideos: ProcessedVideo[] = [
    {
      id: 1,
      thumbnail: 'https://images.pexels.com/photos/8926547/pexels-photo-8926547.jpeg',
      title: 'Life Skills Workshop',
      duration: '3:45',
      videoUrl: '',
      description: 'Watch how we teach essential life skills through interactive activities',
    },
    {
      id: 2,
      thumbnail: 'https://images.pexels.com/photos/8926546/pexels-photo-8926546.jpeg',
      title: 'Character Building Program',
      duration: '5:20',
      videoUrl: '',
      description: 'Discover our approach to building strong character and values',
    },
    {
      id: 3,
      thumbnail: 'https://images.pexels.com/photos/8926545/pexels-photo-8926545.jpeg',
      title: 'Community Engagement',
      duration: '4:15',
      videoUrl: '',
      description: 'See how children connect with their communities',
    },
  ];

  const displayVideos = processedVideos.length > 0 ? processedVideos : fallbackVideos;

  const handlePrevious = useCallback(() => {
    if (selectedVideoIndex === null) return;
    setSelectedVideoIndex((selectedVideoIndex - 1 + displayVideos.length) % displayVideos.length);
  }, [selectedVideoIndex, displayVideos.length]);

  const handleNext = useCallback(() => {
    if (selectedVideoIndex === null) return;
    setSelectedVideoIndex((selectedVideoIndex + 1) % displayVideos.length);
  }, [selectedVideoIndex, displayVideos.length]);

  const selectedVideo = selectedVideoIndex !== null ? displayVideos[selectedVideoIndex] : null;

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-tertiary text-gray-900 mb-6">
            See Our Work in{' '}
            <span className='text-primary'>Action</span>
          </h2>
          <p className="text-xl text-tertiary-500 max-w-3xl mx-auto">
            Watch how we&apos;re transforming young lives through our innovative programs
          </p>
        </motion.div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
              onClick={() => setSelectedVideoIndex(index)}
            >
              <div className="relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 rounded-none">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  unoptimized
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 group-hover:bg-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-all duration-300">
                    <Play 
                      className="h-8 w-8 ml-1" 
                      style={{ color: 'hsl(var(--primary))' }}
                      fill="currentColor"
                    />
                  </div>
                </div>
                
                {/* Video Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                  <h3 className="font-semibold mb-1 text-lg">{video.title}</h3>
                  {video.duration && <p className="text-sm opacity-90">{video.duration}</p>}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <VideoLightbox
          isOpen={selectedVideoIndex !== null}
          onClose={() => setSelectedVideoIndex(null)}
          videoUrl={selectedVideo?.videoUrl || ''}
          title={selectedVideo?.title || ''}
          description={selectedVideo?.description || undefined}
          currentIndex={selectedVideoIndex ?? undefined}
          totalVideos={displayVideos.length}
          onPrevious={handlePrevious}
          onNext={handleNext}
          showNavigation={true}
        />
      </div>
    </section>
  );
};

export default VideoGallery;