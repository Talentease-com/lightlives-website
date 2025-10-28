'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { Media } from '@/payload-types';
import 'plyr-react/plyr.css';
import '@/styles/plyr-custom.css';

// Dynamically import Plyr to avoid SSR issues
const Plyr = dynamic(() => import('plyr-react'), { ssr: false });

interface ImpactVideoPlayerProps {
  videoFile?: number | Media | null;
  videoUrl?: string | null;
  title?: string;
  description?: string | null;
  thumbnail?: number | Media | null;
}

const ImpactVideoPlayer: React.FC<ImpactVideoPlayerProps> = ({
  videoFile,
  videoUrl,
  thumbnail,
}) => {
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get video URL from CMS data
  const getVideoUrl = () => {
    // Prefer videoUrl (YouTube/Vimeo) over videoFile
    if (videoUrl) {
      return videoUrl;
    }
    
    // Use videoFile if available
    if (videoFile) {
      const media = videoFile;
      if (typeof media === 'object' && media !== null && 'url' in media) {
        return media.url || '';
      }
    }
    
    return '';
  };

  // Detect if URL is YouTube, Vimeo, or direct video
  const getVideoType = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    }
    if (url.includes('vimeo.com')) {
      return 'vimeo';
    }
    return 'video'; // Direct video file
  };

  // Extract video ID for embeds
  const getVideoId = (url: string, type: string) => {
    if (type === 'youtube') {
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      return match && match[2].length === 11 ? match[2] : '';
    }
    if (type === 'vimeo') {
      const regExp = /vimeo.*\/(\d+)/i;
      const match = url.match(regExp);
      return match ? match[1] : '';
    }
    return url; // Return full URL for direct videos
  };

  // Get thumbnail URL for poster
  const getThumbnailUrl = () => {
    if (thumbnail) {
      const media = thumbnail;
      if (typeof media === 'object' && media !== null && 'url' in media) {
        return media.url || '';
      }
    }
    return undefined;
  };

  const videoSource = getVideoUrl();
  const videoType = getVideoType(videoSource);
  const videoId = getVideoId(videoSource, videoType);
  const posterUrl = getThumbnailUrl();

  // Don't render Plyr until client-side
  if (!isClient) {
    return (
      <div className="relative animate-fade-in opacity-0 [animation-delay:600ms]">
        <div className="relative w-full max-w-[600px] mx-auto shadow-2xl overflow-hidden">
          <div className="relative aspect-video bg-black flex items-center justify-center">
            <p className="text-gray-400 text-lg">Loading video player...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative animate-fade-in opacity-0 [animation-delay:600ms]">
      {/* Video Player Container */}
      <div className="relative w-full max-w-[600px] mx-auto shadow-2xl overflow-hidden">
        {/* Plyr Video Player */}
        <div className="relative aspect-video bg-black">
          {videoSource ? (
            <>
              {videoType === 'youtube' || videoType === 'vimeo' ? (
                // Embed player for YouTube/Vimeo
                <div key={videoId}>
                  <Plyr
                    source={{
                      type: 'video',
                      sources: [
                        {
                          src: videoId,
                          provider: videoType as 'youtube' | 'vimeo',
                        },
                      ],
                    }}
                    options={{
                      hideControls: true,
                      controls: [
                        'play-large',
                        'play',
                        'progress',
                        'current-time',
                        'mute',
                        'volume',
                        'settings',
                        'fullscreen',
                      ],
                      settings: ['quality', 'speed'],
                      quality: {
                        default: 720,
                        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
                      },
                      youtube: {
                        noCookie: true,
                        rel: 0,
                        showinfo: 0,
                        iv_load_policy: 3,
                        modestbranding: 1,
                      },
                    }}
                  />
                </div>
              ) : (
                // Direct video file (R2/CDN)
                <div key={videoSource}>
                  <Plyr
                    source={{
                      type: 'video',
                      sources: [
                        {
                          src: videoSource,
                          type: 'video/mp4',
                        },
                      ],
                      poster: posterUrl,
                    }}
                    options={{
                      hideControls: true,
                      controls: [
                        'play-large',
                        'play',
                        'progress',
                        'current-time',
                        'mute',
                        'volume',
                        'settings',
                        'pip',
                        'fullscreen',
                      ],
                      settings: ['speed'],
                      speed: { selected: 1, options: [0.5, 0.75, 1, 1.25, 1.5, 2] },
                    }}
                  />
                </div>
              )}
            </>
          ) : (
            // Placeholder when no video is available
            <div className="absolute inset-0 flex items-center justify-center bg-tertiary/10">
              <p className="text-tertiary-500 text-lg">Video player will load here</p>
            </div>
          )}
        </div>
      </div>

      {/* SwooshButton Floating */}
      {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-fade-in-up opacity-0 [animation-delay:800ms] z-10">
        <SwooshButton 
          href="/about/mission" 
          className="bg-primary text-white font-bold py-8 px-8 text-lg shadow-xl" 
          text="Our Mission" 
        />
      </div> */}
    </div>
  );
};

export default ImpactVideoPlayer;
