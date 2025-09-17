import React from 'react';
import { getImpactData } from '@/lib/utils';
import { ImpactSection, DonationForm } from '@/components/Sponsor';

const Sponsor = async () => {
  const impactStats = await getImpactData();

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Hero Section */}
      <section className="py-16 overflow-x-clip relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">
              Sponsor a <span className="text-primary">Child&apos;s Future</span>
            </h1>
            <p className="text-xl text-tertiary-600 max-w-3xl mx-auto">
              Join us in creating a positive transformation in a child&apos;s life. 
              Even a small contribution will make a huge difference in their future.
            </p>
          </div>
        </div>
        
        
      </section>

      {/* Main Content */}
      <section className="relative py-16 overflow-clip">
        {/* Background Design Elements */}
        <svg
          className="absolute top-1/3 right-0 -translate-y-40 translate-x-60"
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
        
        <svg
          className="absolute bottom-0 left-0 translate-y-30 -translate-x-50"
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Impact Information */}
            <ImpactSection impactStats={impactStats} />

            {/* Right Column - Payment Form */}
            <DonationForm />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sponsor;
