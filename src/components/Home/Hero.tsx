import React from 'react';
import { ArrowRight, Play } from 'lucide-react';
import Image from 'next/image';
import HeroSlideshow from './HeroSlideshow';
import HeroCarousel from './HeroCarousel';
import SwooshButton from '@/components/ui/swoosh-button';

const HeroSectionSEO = () => {
  const backgroundImages = [
    'https://images.pexels.com/photos/8926550/pexels-photo-8926550.jpeg',
    'https://images.pexels.com/photos/8926549/pexels-photo-8926549.jpeg',
    'https://images.pexels.com/photos/8926537/pexels-photo-8926537.jpeg',
    'https://images.pexels.com/photos/8926548/pexels-photo-8926548.jpeg',
  ];

  const carouselItems = [
    {
      title: 'Empowering Young Minds',
      description: 'We provide children with essential life skills and values that shape their future, building confidence and character through innovative learning programs.',
    },
    {
      title: 'Building Tomorrow\'s Leaders',
      description: 'Our comprehensive approach focuses on developing critical thinking, emotional intelligence, and social skills that prepare children for success.',
    },
    {
      title: 'Creating Lasting Impact',
      description: 'Through dedicated mentorship and community support, we create sustainable change that transforms lives and strengthens communities.',
    },
  ];

  return (
    <>
      {/* SEO Meta tags would go in layout.tsx or page.tsx */}
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        <HeroSlideshow images={backgroundImages} />

        {/* Decorative Elements - Behind text, in front of slideshow */}
        <div className="absolute left-0 top-0 lg:block hidden z-5 h-full w-full overflow-visible">
          {/* Primary colored element (orange) - top/back */}
          <div className="bg-primary absolute -left-32 top-0 w-70 h-full transform -skew-x-12">          </div>
          {/* Tertiary colored element (blue) - bottom/front */}
          <div className="bg-tertiary absolute -left-24 top-20 w-106 h-full transform -skew-x-12"></div>
        </div>

        {/* <div className="absolute bottom-0 right-0 lg:hidden block z-5 overflow-hidden">
          <div className="bg-tertiary w-48 h-64 transform skew-x-12 -mr-16"></div>
          <div className="bg-primary w-40 h-48 transform skew-x-12 -mt-40 -mr-8"></div>
        </div> */}


        {/* Content */}
        <div className="relative z-10 h-full flex items-center justify-center pb-18">
          <div className="container mx-auto px-4 w-full">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Tagline and Carousel */}
              <div className="text-white">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-in-up opacity-0">
                  Lighting Up
                  <span className="text-primary"> Lives</span>
                </h1>
                
                <p className="text-xl md:text-2xl xl:text-3xl mb-8 text-gray-200 animate-fade-in-up opacity-0 [animation-delay:200ms]">
                  Empowering children with essential life skills and values for a brighter tomorrow.
                </p>

                <HeroCarousel items={carouselItems} />

                {/* CTA Button */}
                {/* <div className="animate-fade-in-up opacity-0 [animation-delay:600ms] mt-6">
                  <button className="group bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl flex items-center space-x-2">
                    <span>Sponsor a Child</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div> */}

                <SwooshButton href='/sponsor' className='bg-red-800 mt-6 font-bold' text='Sponsor a Child' />
              </div>

              {/* Right Column - Video Preview */}
              <div className="hidden lg:flex justify-center">
                <div className="relative group cursor-pointer animate-fade-in opacity-0 [animation-delay:400ms]">
                  <div className="w-80 h-80 rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src="https://images.pexels.com/photos/8926551/pexels-photo-8926551.jpeg"
                      alt="Children in classroom"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="320px"
                      priority
                    />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 hover:bg-white text-primary w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                      <Play className="h-8 w-8 ml-1" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

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
