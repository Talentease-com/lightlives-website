import React from 'react';
import { AdaptiveCard } from '@/components/ui/cards';

const About = () => {
  return (
    <section className="relative z-20 py-20 bg-gradient-to-br from-secondary-50 via-white to-primary-50">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-16">
          <div className="animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <span>
                Untapped Potential
              </span>
              <span className="text-primary">
                .{' '}
              </span>
              <span>
                Unshakable Values
              </span>
              <span className="text-primary">
                .{' '}
              </span>
              {/* <span>
                Light Lives
              </span>
              <span className="text-primary">
                .{' '}
              </span> */}

            </h2>
          </div>

          <p className="text-xl md:text-2xl text-tertiary-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
            We shape character, teach life skills, and prepare students for <strong className="text-tertiary">Work</strong>, <strong className="text-tertiary">Family</strong>, and <strong className="text-tertiary">Community</strong>.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Why Card */}
          <div className="animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
            <AdaptiveCard
              glowColor="orange"
              className="bg-white/80 md:mb-50 backdrop-blur-sm border-primary/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
                      Shocking stat that drives home the lifeskills necessity &mdash; the soft stuff is the hard stuff.
                    </li>
                    <li className="flex items-start">
                      <span className="text-tertiary-500 mr-2">•</span>
                      A &quot;Prepare job&quot; early is better than the &quot;repair job&quot; later.
                    </li>
                    <li className="flex items-start">
                      <span className="text-tertiary-500 mr-2">•</span>
                      Developing youth for strong nation-building.
                    </li>
                  </ul>
                </div>
              </div>
            </AdaptiveCard>
            
            {/* Quote below Why card - Desktop only */}
            <div className="hidden md:block mt-8 animate-fade-in-up opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]">
              <blockquote className="relative z-10">
                <p className="text-lg lg:text-2xl italic text-tertiary-600 whitespace-nowrap">
                  &ldquo;It is easier to build strong children than to repair broken men.&rdquo;
                </p>
                <p className="text-sm text-tertiary-500 font-medium">― Frederick Douglass</p>
              </blockquote>
            </div>
          </div>

          {/* What Card */}
          <div className="animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
            <AdaptiveCard
              glowColor="blue"
              className="bg-white/80 md:mt-30 md:mb-30 backdrop-blur-sm border-secondary-600/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
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
                      Intensive future ready skills development through round-the-year programs
                    </li>
                    <li className="flex items-start">
                      <span className="text-tertiary-500 mr-2">•</span>
                      Focus on children and young adults at low-income schools and colleges
                    </li>
                    <li className="flex items-start">
                      <span className="text-tertiary-500 mr-2">•</span>
                      Professional, personal and social skills that go beyond academics
                    </li>
                  </ul>
                </div>
              </div>
            </AdaptiveCard>
          </div>

          {/* How Card */}
          <div className="animate-fade-in-up opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]">
            <AdaptiveCard
              glowColor="purple"
              className="bg-white/80 md:mt-50 md:mb-10 backdrop-blur-sm border-tertiary-600/20 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              customSize={true}
            >
              <div className="h-full flex flex-col">
                <h3 className="text-4xl font-bold text-primary mb-4 border-b-2 border-tertiary-600 pb-2">
                  How
                </h3>
                <div className="flex-1">
                  <ul className="text-tertiary  space-y-3">
                    <li className="flex items-start">
                      <span className="text-tertiary-500 mr-2">•</span>
                      High quality research- backed skills- curriculum
                    </li>
                    <li className="flex items-start">
                      <span className="text-tertiary-500 mr-2">•</span>
                      Engaging, immersive and student-centric learning
                    </li>
                    <li className="flex items-start">
                      <span className="text-tertiary-500 mr-2">•</span>
                      Challenges and projects for real life practice
                    </li>
                    <li className="flex items-start">
                      <span className="text-tertiary-500 mr-2">•</span>
                      Trained facilitators committed to making a difference with young people
                    </li>
                    <li className="flex items-start">
                      <span className="text-tertiary-500 mr-2">•</span>
                      Mentoring and coaching eco-system
                    </li>
                  </ul>
                </div>
              </div>
            </AdaptiveCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;