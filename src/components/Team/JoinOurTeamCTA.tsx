import React from 'react';
import Link from 'next/link';
import SwooshButton from '@/components/ui/swoosh-button';

const JoinOurTeamCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/5 backdrop-blur-[5px] border border-white/10 rounded-none p-12 md:p-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
            Join Our Team
          </h2>
          <p className="text-lg md:text-xl text-tertiary mb-8 max-w-2xl mx-auto">
            We&apos;re always looking for passionate individuals who want to make a difference. 
            Explore our current opportunities and become part of our mission.
          </p>
          <Link href="/support/join">
            <SwooshButton>
              View Opportunities
            </SwooshButton>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JoinOurTeamCTA;
