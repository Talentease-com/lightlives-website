'use client';

import React, { useEffect, useRef, useState } from 'react';
import type { Media } from '@/payload-types';
import 'plyr-react/plyr.css';
import '@/styles/plyr-custom.css';

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
  const videoRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !videoRef.current) return;

    let isMounted = true;

    const initPlayer = async () => {
      try {
        const Plyr = (await import('plyr')).default;
        
        if (!isMounted || !videoRef.current) return;

        // Get video data
        const getVideoUrl = () => {
          if (videoUrl) return videoUrl;
          if (videoFile && typeof videoFile === 'object' && 'url' in videoFile) {
            return videoFile.url || '';
          }
          return '';
        };

        const getVideoType = (url: string) => {
          if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
          if (url.includes('vimeo.com')) return 'vimeo';
          return 'video';
        };

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
          return url;
        };

        const getThumbnailUrl = () => {
          if (thumbnail && typeof thumbnail === 'object' && 'url' in thumbnail) {
            return thumbnail.url || '';
          }
          return undefined;
        };

        const videoSource = getVideoUrl();
        const videoType = getVideoType(videoSource);
        const videoId = getVideoId(videoSource, videoType);

        let videoElement: HTMLVideoElement | HTMLDivElement;

        if (videoType === 'youtube') {
          // Create YouTube div
          const div = document.createElement('div');
          div.setAttribute('data-plyr-provider', 'youtube');
          div.setAttribute('data-plyr-embed-id', videoId);
          videoRef.current.appendChild(div);
          videoElement = div;
        } else if (videoType === 'vimeo') {
          // Create Vimeo div
          const div = document.createElement('div');
          div.setAttribute('data-plyr-provider', 'vimeo');
          div.setAttribute('data-plyr-embed-id', videoId);
          videoRef.current.appendChild(div);
          videoElement = div;
        } else {
          // Create HTML5 video element
          const video = document.createElement('video');
          video.setAttribute('playsinline', '');
          video.setAttribute('controls', '');
          if (getThumbnailUrl()) {
            video.setAttribute('poster', getThumbnailUrl()!);
          }
          const source = document.createElement('source');
          source.setAttribute('src', videoSource);
          source.setAttribute('type', 'video/mp4');
          video.appendChild(source);
          videoRef.current.appendChild(video);
          videoElement = video;
        }

        // Initialize Plyr
        playerRef.current = new Plyr(videoElement, {
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
          settings: ['quality', 'speed'],
          youtube: {
            noCookie: true,
            rel: 0,
            showinfo: 0,
            iv_load_policy: 3,
            modestbranding: 1,
          },
          vimeo: {
            byline: false,
            portrait: false,
            title: false,
            speed: true,
            transparent: false,
          },
        });
      } catch (error) {
        console.error('Error initializing Plyr:', error);
      }
    };

    const timer = setTimeout(initPlayer, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Ignore destroy errors
        }
        playerRef.current = null;
      }
    };
  }, [isClient, videoFile, videoUrl, thumbnail]);

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

  const getVideoUrl = () => {
    if (videoUrl) return videoUrl;
    if (videoFile && typeof videoFile === 'object' && 'url' in videoFile) {
      return videoFile.url || '';
    }
    return '';
  };

  const videoSource = getVideoUrl();

  return (
    <div className="relative animate-fade-in opacity-0 [animation-delay:600ms]">
      {/* Video Player Container */}
      <div className="relative w-full max-w-[600px] mx-auto shadow-2xl overflow-hidden">
        {/* Plyr Video Player */}
        <div className="relative aspect-video bg-black">
          {videoSource ? (
            <div ref={videoRef} className="w-full h-full" />
          ) : (
            // Placeholder when no video is available
            <div className="absolute inset-0 flex items-center justify-center bg-tertiary/10">
              <p className="text-tertiary-500 text-lg">Video player will load here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImpactVideoPlayer;
