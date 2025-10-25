import React from 'react';
import type { Metadata } from 'next';
import {
  getTeamCarouselImages,
  getLeadershipTeam,
  getAdvisoryBoard,
} from '@/lib/payload/fetch';
import {
  TeamHeroCarousel,
  LeadershipGrid,
  AdvisoryBoardSection,
  JoinOurTeamCTA,
} from '@/components/Team';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Our Team | Light Lives',
  description:
    'Meet the dedicated leadership team and advisory board members driving our mission to transform lives through education and support.',
};

export default async function TeamPage() {
  console.log('Page rendering: TeamPage');
  // Fetch all team data in parallel
  const [carouselImages, leadershipTeam, advisoryBoard] = await Promise.all([
    getTeamCarouselImages(),
    getLeadershipTeam(),
    getAdvisoryBoard(),
  ]);

  // Transform carousel images for component
  const carouselData = carouselImages.map((item) => ({
    id: item.id,
    image: item.image,
    alt: item.alt,
  }));

  // Transform leadership data for component
  const leadershipData = leadershipTeam.map((leader) => ({
    id: leader.id,
    name: leader.name,
    jobRole: leader.jobRole,
    profileImage: leader.profileImage,
  }));

  // Transform advisory board data for component
  const advisoryData = advisoryBoard.map((advisor) => ({
    id: advisor.id,
    name: advisor.name,
    profileImage: advisor.profileImage,
    bio: advisor.bio,
  }));

  return (
    <main className="min-h-screen">
      {/* Hero Carousel Section */}
      <TeamHeroCarousel images={carouselData} />

      {/* Leadership Team Section */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Leadership Team
            </h2>
            <p className="text-lg md:text-xl text-tertiary max-w-3xl mx-auto">
              Meet the visionary leaders guiding our mission.
            </p>
          </div>
          <LeadershipGrid leaders={leadershipData} />
        </div>
      </section>

      {/* Advisory Board Section */}
      <section className="py-20 md:py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">
              Advisory Board
            </h2>
            <p className="text-lg md:text-xl text-tertiary max-w-3xl mx-auto">
              Our advisory board brings deep expertise and strategic guidance to help us
              achieve our goals and maximize our impact.
            </p>
          </div>
          <AdvisoryBoardSection advisors={advisoryData} />
        </div>
      </section>

      {/* Join Our Team CTA */}
      <JoinOurTeamCTA />
    </main>
  );
}
