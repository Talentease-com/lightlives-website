import React from 'react';
import AnimatedCounter from './AnimatedCounter';
import SwooshButton from '../ui/swoosh-button';
import { Users, School, Award } from 'lucide-react';
import type { Impact, Media } from '@/payload-types';
import ImpactVideoPlayer from './ImpactVideoPlayer';

interface ImpactVideoData {
  videoFile?: number | Media | null;
  videoUrl?: string | null;
  title?: string;
  description?: string | null;
  thumbnail?: number | Media | null;
}

interface ImpactSectionProps {
  stats: Impact[];
  impactVideo?: ImpactVideoData;
}

const ImpactSection: React.FC<ImpactSectionProps> = ({ stats, impactVideo }) => {
  return (
    <section className="py-20 bg-white px-2 sm:px-4 relative overflow-x-clip ">
      {/* Background Design Elements */}
      {/* Outlined Hexagon Top Right */}
      <svg
        className="absolute top-0 right-0 -translate-y-40 translate-x-40"
        width="560"
        height="720"
        viewBox="0 0 560 720"
        style={{ transform: 'rotate(45deg)' }}
      >
        <polygon
          points="300,30 516,154 516,404 300,530 84,404 84,154"
          fill="none"
          stroke="#ff801e"
          strokeWidth="10"
        />
      </svg>

      {/* Outlined Hexagon Bottom Left */}
      <svg
        className="absolute bottom-0 left-0 translate-y-75 -translate-x-110"
        width="560"
        height="720"
        viewBox="0 0 560 720"
        style={{ transform: 'rotate(45deg)' }}
      >
        <polygon
          points="300,30 516,154 516,404 300,530 84,404 84,154"
          fill="none"
          stroke="#ff801e"
          strokeWidth="10"
        />
      </svg>

      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Statistics */}
          <div className='flex flex-col justify-center'>
            <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:200ms]">
              <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">
                Our <span className="text-primary">Impact</span> So Far
              </h2>
              <p className="text-xl text-tertiary-600">
                Transforming lives through education and community engagement across the nation.
              </p>
            </div>

            <div className="space-y-8">
              {stats.map((stat, index) => {
                // Use different icons based on index
                const icons = [Users, School, Award];
                const Icon = icons[index % icons.length];
                
                return (
                  <div key={stat.id} className={`flex items-start space-x-4 group animate-fade-in-up opacity-0`} style={{ animationDelay: `${400 + index * 200}ms` }}>
                    <div className="bg-primary-100 text-primary p-3 rounded-full group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-tertiary mb-1">
                        <AnimatedCounter 
                          value={stat.val} 
                          format={stat.suffix || ''} 
                          usePointer={stat.usePointer || false}
                          decimals={stat.decimals || 0}
                        />
                      </div>
                      <div className="text-lg font-semibold text-tertiary-700 mb-2">{stat.desc}</div>
                      <p className="text-tertiary-500">
                        <span className="font-medium">
                          {stat.val2.toLocaleString('en-IN', {
                            minimumFractionDigits: stat.decimals2 || 0,
                            maximumFractionDigits: stat.decimals2 || 0
                          })}
                        </span> {stat.desc2}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 animate-fade-in-up opacity-0 [animation-delay:1000ms]">
              <SwooshButton href='/about/mission' className='bg-tertiary font-bold py-8 px-4 sm:px-8 text-lg' text='Learn More About Our Mission & Team' />
            </div>
          </div>

          {/* Right Column - Video Player */}
          <ImpactVideoPlayer
            videoFile={impactVideo?.videoFile}
            videoUrl={impactVideo?.videoUrl}
            title={impactVideo?.title || 'Our Impact'}
            description={impactVideo?.description}
            thumbnail={impactVideo?.thumbnail}
          />
        </div>
        
        {/* Fine print */}
        <div className="text-center mt-16 animate-fade-in-up opacity-0 [animation-delay:1200ms]">
          <p className="text-tertiary-500 text-xs italic">
            *Delivered in collaboration with our partner organisation TalentEase (started in 2013)
          </p>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;