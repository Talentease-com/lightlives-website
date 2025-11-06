'use client';

import React, { useState } from 'react';
import VideoLightbox from '@/components/ui/video-lightbox';
import { Play } from 'lucide-react';
import Image from 'next/image';
import type { Media } from '@/payload-types';
import { extractThumbnailFromVideoUrl } from '@/lib/utils/videoThumbnailExtractor';

interface SponsorVideoData {
  videoFile?: number | Media | null;
  videoUrl?: string | null;
  title?: string;
  description?: string | null;
  thumbnail?: number | Media | null;
}

interface SponsorVideoProps {
  videoData?: SponsorVideoData;
}

const SponsorVideo: React.FC<SponsorVideoProps> = ({ videoData }) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Get video URL from CMS data
  const getVideoUrl = () => {
    if (!videoData) return '';
    
    // Prefer videoUrl (YouTube/Vimeo) over videoFile
    if (videoData.videoUrl) {
      return videoData.videoUrl;
    }
    
    // Use videoFile if available
    if (videoData.videoFile) {
      const media = videoData.videoFile;
      if (typeof media === 'object' && media !== null && 'url' in media) {
        return media.url || '';
      }
    }
    
    return '';
  };

  // Get thumbnail URL - priority: uploaded thumbnail > auto-extracted > fallback
  const getThumbnailUrl = () => {
    const defaultFallback = 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1200';
    
    // First priority: uploaded custom thumbnail
    if (videoData?.thumbnail) {
      const media = videoData.thumbnail;
      if (typeof media === 'object' && media !== null && 'url' in media) {
        return media.url || defaultFallback;
      }
    }
    
    // Second priority: auto-extract from YouTube/Vimeo URL
    if (videoData?.videoUrl) {
      const extractedThumbnail = extractThumbnailFromVideoUrl(videoData.videoUrl);
      if (extractedThumbnail) {
        return extractedThumbnail;
      }
    }
    
    // Fallback
    return defaultFallback;
  };

  const videoUrl = getVideoUrl();
  const thumbnailUrl = getThumbnailUrl();
  const title = videoData?.title || 'Watch how Light Lives works';
  const description = videoData?.description || 'A short explainer about our programs, impact, and governance';

  return (
    <section className="py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-semibold text-tertiary mb-4">{title}</h2>
        
        {videoUrl ? (
          // Video with thumbnail and play button
          <div
            onClick={() => setIsVideoOpen(true)}
            className="relative border border-tertiary-200 cursor-pointer group overflow-hidden"
          >
            <Image
              src={thumbnailUrl}
              alt={title}
              width={1200}
              height={675}
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300"></div>
            
            {/* Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/90 group-hover:bg-white w-20 h-20 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                <Play 
                  className="h-10 w-10 ml-1" 
                  style={{ color: 'hsl(var(--primary))' }}
                  fill="currentColor"
                />
              </div>
            </div>
          </div>
        ) : (
          // Fallback: Static video element with controls (no CMS video)
          <figure className="border border-tertiary-200">
            <video
              className="w-full h-auto"
              controls
              preload="metadata"
              poster={thumbnailUrl}
            >
              <source src="https://player.vimeo.com/external/374131650.sd.mp4?s=4a1fbe3a3d1c8cb30b1f0c341f45b0f2b4e59cf4&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <figcaption className="text-sm text-tertiary-600 p-3">
              {description}
            </figcaption>
          </figure>
        )}

        {/* Video Lightbox - Plyr handles YouTube/Vimeo thumbnails automatically */}
        {videoUrl && (
          <VideoLightbox
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            videoUrl={videoUrl}
            title={title}
            description={description}
            showNavigation={false}
          />
        )}
      </div>
    </section>
  );
};

export default SponsorVideo;
