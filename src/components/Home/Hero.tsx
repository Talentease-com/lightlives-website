'use client';

import React, { useState } from 'react';
import { Play } from 'lucide-react';
import HeroSlideshow from './HeroSlideshow';
import HeroCarousel from './HeroCarousel';
import SwooshButton from '@/components/ui/swoosh-button';
import VideoLightbox from '@/components/ui/video-lightbox';

const HeroSectionSEO = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const backgroundImages = [
    '/images/home0.jpg',
    '/images/home1.jpg',
    '/images/home2.jpg',
    '/images/home3.jpg',
  ];

  const carouselItems = [
    {
      title: 'Start Early',
      description: 'Our work with children and young adults means a \'prepare\' job now rather than a \'repair\' job later',
    },
    {
      title: 'Empower rather than handouts',
      description: 'With skills and values we give underprivileged young people the power to help themselves and become leaders for change',
    },
    {
      title: 'A marathon vs A sprint',
      description: 'We believe lasting change comes from a continuous accompaniment of young people. Our multi-year program aims for lasting impact. Attitudes. Habits. Skills. Values.',
    },
  ];

  return (
    <>
      {/* SEO Meta tags would go in layout.tsx or page.tsx */}
      <section className="relative h-screen min-h-screen overflow-hidden">
        <HeroSlideshow images={backgroundImages} />

        {/* Decorative Elements - Behind text, in front of slideshow */}
        <div className="absolute left-0 top-0 lg:block hidden z-5 h-full w-full">
          {/* Primary colored element (orange) - top/back */}
          <div className="bg-primary absolute -left-32 top-0 w-70 h-full transform -skew-x-12">          </div>
          {/* Tertiary colored element (blue) - bottom/front */}
          <div className="bg-tertiary absolute -left-46 top-20 w-130 h-full transform -skew-x-12"></div>
        </div>


        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center pb-12 pt-10">
          <div className="container mx-auto px-4 w-full">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight mb-4 animate-fade-in-up opacity-0">
              What&apos;s the best investment of your social-impact money?
            </h1>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Tagline and Carousel */}
              <div className="text-white">

{/* 
                <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold mb-6 text-primary animate-fade-in-up opacity-0 [animation-delay:100ms]">
                  Making the shift from just charity to building lives. At scale.
                </h2> */}

                <p className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-200 animate-fade-in-up opacity-0 [animation-delay:200ms]">
                  Empowering children and young adults with essential life skills and values for professional and personal success.
                </p>

                <HeroCarousel items={carouselItems} />

                {/* CTA Buttons - Mobile: Video + Sponsor, Desktop: Just Sponsor */}
                <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center lg:items-start">
                  {/* Video Button - Shows on Mobile, Hidden on Desktop */}
                  <button
                    onClick={() => setIsVideoOpen(true)}
                    className="lg:hidden group cursor-pointer animate-fade-in-up opacity-0 [animation-delay:500ms] flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm px-6 py-3 transition-all duration-300 border border-primary/50 hover:border-primary"
                  >
                    <div className="bg-secondary/70 group-hover:bg-primary text-primary group-hover:text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300">
                      <Play className="h-6 w-6 ml-1" fill="currentColor" />
                    </div>
                    <span className="text-white font-semibold">Watch Our Story</span>
                  </button>

                  {/* Sponsor Button */}
                  <div className="animate-fade-in-up opacity-0 [animation-delay:600ms]">
                    <SwooshButton href='/sponsor' className='bg-red-800 font-bold' text='Sponsor a Child' />
                  </div>
                </div>
              </div>

              {/* Right Column - Video Preview (Desktop Only) */}
              <div className="hidden lg:flex justify-center items-center">
                <div 
                  className="group cursor-pointer animate-fade-in opacity-0 [animation-delay:400ms]"
                  onClick={() => setIsVideoOpen(true)}
                >
                  <div className="bg-secondary/70 hover:bg-white text-primary w-24 h-24 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
                    <Play className="h-12 w-12 ml-2" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Video Lightbox */}
        <VideoLightbox
          isOpen={isVideoOpen}
          onClose={() => setIsVideoOpen(false)}
          videoUrl="https://cdn.lightlives.org/static-videos/LightLives_Landing_Optimized_576p25.mp4"
          title="LightLives - Empowering Young Minds"
          description="Watch how we're transforming lives through education and mentorship"
          showNavigation={false}
        />

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "LightLives",
              "description": "Empowering children with essential life skills and values for a brighter tomorrow",
              "mission": "Lighting Up Lives through education and mentorship",
              "serviceType": ["Child Education", "Life Skills Training", "Mentorship Programs"],
              "areaServed": "Global",
              "knowsAbout": carouselItems.map(item => item.title)
            })
          }}
        />
      </section>
    </>
  );
};

export default HeroSectionSEO;
