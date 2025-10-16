import React from 'react';
import { Target, Lightbulb, Sparkles } from 'lucide-react';
import SwooshButton from '@/components/ui/swoosh-button';
import Image from 'next/image';

export const metadata = {
  title: "Mission & Vision - LightLives",
  description: "LightLives is focused on providing leadership and future ready skills training to children. Our mission: Create One Million Young leaders and changemakers.",
  keywords: "mission, vision, leadership training, life skills, child development, future ready skills, LightLives, changemakers, youth empowerment",
}

// Enable static generation
export const dynamic = 'force-static'

export default function MissionVisionPage() {
  return (
    <div className="">
      {/* Hero Section with Quote */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg"
            alt="Children learning together"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/50 to-gray-900/70"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
            <p className="text-2xl md:text-4xl font-medium text-white leading-relaxed mb-8 italic">
              &ldquo;Never doubt that a small group of thoughtful, committed citizens can change the world;
              indeed, it&apos;s the only thing that ever has.&rdquo;
            </p>
            <p className="text-xl md:text-2xl text-primary-300 font-medium">
              - Margaret Mead
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
              <div className="relative h-[500px] rounded-none overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/8617842/pexels-photo-8617842.jpeg"
                  alt="Children in classroom"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div className="order-1 lg:order-2 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
              <div className="flex items-center mb-6">
                <div className="bg-primary-100 text-primary p-4 rounded-none">
                  <Lightbulb className="h-8 w-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-tertiary ml-4">Vision</h2>
              </div>
                            <p className="text-2xl text-tertiary-700 leading-relaxed mb-4">
                LightLives is focused on providing leadership and future ready skills and values
                training to children at all types of schools and orphanages.
              </p>
              <p className="text-lg text-tertiary-600 leading-relaxed mb-4">
                Many children grow up focused on academics but miss out on building the key skills and values they need for successful personal and professional lives. This skill and value gap is often addressed with a &lsquo;REPAIR&rsquo; job later in life.
              </p>
              <p className="text-lg text-tertiary-600 leading-relaxed mb-8">
                Students are often trained to be &lsquo;memory machines&rsquo; instead of curious, confident, and creative individuals. Teachers are pressured to cover syllabi, and parents may lack the time or resources to fill this educational void.
              </p>
              <div className="bg-secondary-100 border-l-4 border-secondary-600 p-6 rounded-none">
                <p className="text-xl text-tertiary-800 font-medium italic">
                  The &lsquo;PREPARE&rsquo; job at school is what will really make an EARLY and LASTING difference.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Conviction Section */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
              <div className="flex items-center mb-6">
                <div className="bg-secondary-200 text-secondary-700 p-4 rounded-none">
                  <Sparkles className="h-8 w-8" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-tertiary ml-4">Our Conviction</h2>
              </div>
              <p className="text-2xl text-tertiary-700 leading-relaxed">
                Light Lives seeks to bring these advantages to under-privileged children who have
                the talent and skills but who are often denied the opportunity to grow and develop
                those talents and skills.
              </p>
            </div>

            <div className="animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
              <div className="relative h-[500px] rounded-none overflow-hidden shadow-2xl">
                <Image
                  src="https://images.pexels.com/photos/8364026/pexels-photo-8364026.jpeg"
                  alt="Children learning"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement Section - Enhanced */}
      <section className="relative bg-tertiary overflow-hidden">
        <div className="relativez-10">
          {/* Centered Intro */}

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Column - Mission Statement (takes 3 columns) */}
            <div className="max-w-7xl py-16 mx-auto px-4 sm:px-6 lg:px-8 lg:col-span-3 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
              {/* Main Mission Box */}
              <div className="relative bg-gradient-to-br from-primary via-[#ff6b00] to-[#e85500] p-10 md:p-12 rounded-none shadow-2xl border-4 border-primary/60 mb-8 overflow-hidden group">
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center mb-6">
                    {/* <div className="w-3 h-20 bg-white shadow-lg mr-4 rounded-none"></div> */}
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-none drop-shadow-lg">
                      1 Million
                    </h2>
                  </div>
                  <p className="text-3xl md:text-4xl font-bold text-white leading-tight mb-2 drop-shadow-md">
                    Young Leaders & Changemakers
                  </p>
                  <p className="text-xl text-white font-medium drop-shadow-sm">
                    That&apos;s our mission
                  </p>
                </div>
              </div>

              {/* Supporting Text */}
              <div className="space-y-6">

                {/* Skills Section */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <div className="w-1 h-8 bg-secondary-400 mr-3"></div>
                    Essential Skills We Teach
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-secondary/10 backdrop-blur-sm border-2 border-secondary-400/30 p-5 rounded-none hover:bg-secondary/20 hover:border-secondary-400/50 transition-all duration-300 group">
                      <div className="text-2xl font-bold text-secondary-400 mb-2 group-hover:text-secondary-300 transition-colors">Communicative English</div>
                      <p className="text-secondary-100 text-sm">Fluent expression for career success</p>
                    </div>
                    <div className="bg-secondary/10 backdrop-blur-sm border-2 border-secondary-400/30 p-5 rounded-none hover:bg-secondary/20 hover:border-secondary-400/50 transition-all duration-300 group">
                      <div className="text-2xl font-bold text-secondary-400 mb-2 group-hover:text-secondary-300 transition-colors">Building Confidence</div>
                      <p className="text-secondary-100 text-sm">Self-belief to face any challenge</p>
                    </div>
                    <div className="bg-secondary/10 backdrop-blur-sm border-2 border-secondary-400/30 p-5 rounded-none hover:bg-secondary/20 hover:border-secondary-400/50 transition-all duration-300 group">
                      <div className="text-2xl font-bold text-secondary-400 mb-2 group-hover:text-secondary-300 transition-colors">Digital Literacy & AI</div>
                      <p className="text-secondary-100 text-sm">Future-ready tech competencies</p>
                    </div>
                    <div className="bg-secondary/10 backdrop-blur-sm border-2 border-secondary-400/30 p-5 rounded-none hover:bg-secondary/20 hover:border-secondary-400/50 transition-all duration-300 group">
                      <div className="text-2xl font-bold text-secondary-400 mb-2 group-hover:text-secondary-300 transition-colors">Interview Skills</div>
                      <p className="text-secondary-100 text-sm">Professional presentation mastery</p>
                    </div>
                  </div>
                </div>

                {/* Values Section */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                    <div className="w-1 h-8 bg-primary mr-3"></div>
                    Core Values We Instill
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="bg-primary/10 backdrop-blur-sm border-2 border-primary/30 p-4 rounded-none hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group text-center">
                      <div className="text-xl font-bold text-primary mb-1 group-hover:text-primary-400 transition-colors">Patience</div>
                    </div>
                    <div className="bg-primary/10 backdrop-blur-sm border-2 border-primary/30 p-4 rounded-none hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group text-center">
                      <div className="text-xl font-bold text-primary mb-1 group-hover:text-primary-400 transition-colors">Gratitude</div>
                    </div>
                    <div className="bg-primary/10 backdrop-blur-sm border-2 border-primary/30 p-4 rounded-none hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group text-center">
                      <div className="text-xl font-bold text-primary mb-1 group-hover:text-primary-400 transition-colors">Kindness</div>
                    </div>
                    <div className="bg-primary/10 backdrop-blur-sm border-2 border-primary/30 p-4 rounded-none hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group text-center">
                      <div className="text-xl font-bold text-primary mb-1 group-hover:text-primary-400 transition-colors">Respect</div>
                    </div>
                    <div className="bg-primary/10 backdrop-blur-sm border-2 border-primary/30 p-4 rounded-none hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group text-center">
                      <div className="text-xl font-bold text-primary mb-1 group-hover:text-primary-400 transition-colors">Resilience</div>
                    </div>
                    <div className="bg-primary/10 backdrop-blur-sm border-2 border-primary/30 p-4 rounded-none hover:bg-primary/20 hover:border-primary/50 transition-all duration-300 group text-center">
                      <div className="text-xl font-bold text-primary mb-1 group-hover:text-primary-400 transition-colors">Leadership</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 mt-10">
                <SwooshButton 
                  href="/about/team" 
                  className="bg-secondary text-tertiary font-bold text-lg hover:bg-secondary-200 border-2 border-secondary-300"
                  text="Meet Our Team"
                />
                <SwooshButton 
                  href="/sponsor" 
                  className="bg-primary font-bold text-lg"
                  text="Join the Movement"
                />
              </div>
            </div>

            {/* Right Column - Simple Image */}
              <div className="hidden lg:block lg:col-span-2 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards] h-full">
                <div className="relative h-full min-h-[500px] w-full overflow-hidden" style={{ height: '100%' }}>
                  <Image 
                    src="/bg-overlay.svg" 
                    alt="Background Overlay" 
                    fill 
                    className="object-cover absolute inset-0 z-10 pointer-events-none"
                  />
                  <Image
                    src="https://images.pexels.com/photos/8471862/pexels-photo-8471862.jpeg"
                    alt="Young leaders"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
          </div>
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="py-24 bg-gradient-to-br from-secondary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
            <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-4">
              Our <span className="text-primary">Journey</span>
            </h2>
            <p className="text-xl text-tertiary-600">
              Milestones in transforming children&apos;s education
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-orange-200 via-teal-200 to-orange-200 hidden md:block"></div>

            <div className="space-y-16">
              {[
                {
                  year: '2018',
                  event: 'Light Lives founded with a vision to transform child education',
                  image: 'https://images.pexels.com/photos/8617842/pexels-photo-8617842.jpeg'
                },
                {
                  year: '2019',
                  event: 'First program launched in schools across Mumbai',
                  image: 'https://images.pexels.com/photos/8363028/pexels-photo-8363028.jpeg'
                },
                {
                  year: '2020',
                  event: 'Adapted to digital platforms during pandemic, reaching children across India',
                  image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg'
                },
                {
                  year: '2021',
                  event: 'Expanded to multiple states, impacting thousands of children annually',
                  image: 'https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg'
                },
                {
                  year: '2022',
                  event: 'Launched facilitator training program for sustainable impact',
                  image: 'https://images.pexels.com/photos/8363118/pexels-photo-8363118.jpeg'
                },
                {
                  year: '2023',
                  event: 'Achieved major milestone in impact sessions and student engagement',
                  image: 'https://images.pexels.com/photos/8923177/pexels-photo-8923177.jpeg'
                },
              ].map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={`relative grid md:grid-cols-2 gap-8 items-center animate-fade-in-up opacity-0 [animation-fill-mode:forwards]`}
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`${index % 2 === 0 ? 'md:pr-16' : 'md:pl-16 md:col-start-2'}`}>
                    <div className="bg-gradient-to-br from-primary-50 to-secondary-100 p-8 rounded-none shadow-lg border border-primary-100">
                      <div className="text-5xl font-bold text-primary mb-4">
                        {milestone.year}
                      </div>
                      <p className="text-xl text-tertiary-700 leading-relaxed">{milestone.event}</p>
                    </div>
                  </div>

                  <div className={`${index % 2 === 0 ? 'md:pl-16' : 'md:pr-16 md:col-start-1 md:row-start-1'}`}>
                    <div className="relative h-64 md:h-80 rounded-none overflow-hidden shadow-xl group">
                      <Image
                        src={milestone.image}
                        alt={`Milestone ${milestone.year}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-24 bg-tertiary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative h-80 rounded-none overflow-hidden shadow-lg group animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
              <Image
                src="https://images.pexels.com/photos/8364037/pexels-photo-8364037.jpeg"
                alt="Children collaborating"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative h-80 rounded-none overflow-hidden shadow-lg group animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
              <Image
                src="https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg"
                alt="Learning activities"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="relative h-80 rounded-none overflow-hidden shadow-lg group animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
              <Image
                src="https://images.pexels.com/photos/8612992/pexels-photo-8612992.jpeg"
                alt="Young changemakers"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
