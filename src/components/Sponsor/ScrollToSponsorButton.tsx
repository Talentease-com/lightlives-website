'use client';

import React from 'react';
import SwooshButton from '@/components/ui/swoosh-button';

const ScrollToSponsorButton = () => {
  const scrollToSponsor = () => {
    const sponsorSection = document.getElementById('sponsor-cta');
    if (sponsorSection) {
      sponsorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <SwooshButton onClick={scrollToSponsor} className="mx-auto">
      Sponsor a Child Now
    </SwooshButton>
  );
};

export default ScrollToSponsorButton;
