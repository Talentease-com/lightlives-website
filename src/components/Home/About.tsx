import React from 'react';
import { AdaptiveCard } from '@/components/ui/cards';

const About = () => {
  return (
    <section className="relative z-20">
      {/* decorative div with a slight rotate (optional) */}
      <div className="relative overflow-x-clip">
        {/* <div className="bg-secondary absolute top-9 w-full h-24 transform rotate-[2deg] -z-10 hidden lg:block"></div> */}
      </div>
      <div className="max-w-7xl mx-auto -mt-18 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Why Card */}
          <AdaptiveCard 
            glowColor="orange" 
            className="bg-white/80 md:mb-50 backdrop-blur-sm border-primary/20 shadow-lg "
            customSize={true}
          >
            <div className="h-full flex flex-col">
              <h3 className="text-4xl font-bold text-primary mb-4 border-b-2 border-primary pb-2">
                Why
              </h3>
              <div className="flex-1">
                <ul className="text-tertiary-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-tertiary-500 mr-2">•</span>
                    Leadership skills and values often matter more for success and meaning than just hard skills and academic success.
                  </li>
                  <li className="flex items-start">
                    <span className="text-tertiary-500 mr-2">•</span>
                    These are best formed as a &apos;prepare&apos; job with children rather than a &apos;repair&apos; job with adults in a VUCA world children need the ever-evolving skills and the unchanging values compass to be able to not just deal with change but harness it.
                  </li>
                </ul>
              </div>
            </div>
          </AdaptiveCard>

          {/* What Card */}
          <AdaptiveCard 
            glowColor="blue" 
            className="bg-white/80 md:mt-30 md:mb-30 backdrop-blur-sm border-secondary-600/20 shadow-lg"
            customSize={true}
          >
            <div className="h-full flex flex-col">
              <h3 className="text-4xl font-bold text-primary mb-4 border-b-2 border-secondary-600 pb-2">
                What
              </h3>
              <div className="flex-1">
                <ul className="text-tertiary space-y-3">
                  <li className="flex items-start">
                    <span className="text-tertiary-500 mr-2">•</span>
                    Works with children and young adults at orphanages and low-income schools.
                  </li>
                  <li className="flex items-start">
                    <span className="text-tertiary-500 mr-2">•</span>
                    Making the Skill and Value difference where it matters - with children and young adults.
                  </li>
                  <li className="flex items-start">
                    <span className="text-tertiary-500 mr-2">•</span>
                    Intensive year-round HEADSTART LEAD program.
                  </li>
                </ul>
              </div>
            </div>
          </AdaptiveCard>

          {/* Who Card */}
          <AdaptiveCard 
            glowColor="purple" 
            className="bg-white/80 md:mt-50 md:mb-10 backdrop-blur-sm border-tertiary-600/20 shadow-lg "
            customSize={true}
          >
            <div className="h-full flex flex-col">
              <h3 className="text-4xl font-bold text-primary mb-4 border-b-2 border-tertiary-600 pb-2">
                Who
              </h3>
              <div className="flex-1">
                <ul className="text-tertiary  space-y-3">
                  <li className="flex items-start">
                    <span className="text-tertiary-500 mr-2">•</span>
                    A Not-For-Profit TalentEase initiative.
                  </li>
                  <li className="flex items-start">
                    <span className="text-tertiary-500 mr-2">•</span>
                    Headed by a global team who have worked with Fortune 500 clients.
                  </li>
                  <li className="flex items-start">
                    <span className="text-tertiary-500 mr-2">•</span>
                    Facilitator Team - a combination of work-world experience and a passion for working with children.
                  </li>
                </ul>
              </div>
            </div>
          </AdaptiveCard>
        </div>
      </div>
    </section>
  );
};

export default About;