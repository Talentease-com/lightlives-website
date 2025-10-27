import React from 'react';
import type { Metadata } from 'next';
import { HeroSection, PartnershipFramework, PartnerLogos } from '@/components/CSR';
import { getImpactData } from '@/lib/payload/fetch';

export const metadata: Metadata = {
  title: 'CSR Partnerships | Light Lives',
  description: 'Transform your CSR from temporary relief to lasting change. Partner with LightLives for marathon partnerships in skill development and community empowerment.',
  keywords: ['CSR', 'Corporate Social Responsibility', 'CSR Partnership', 'Skill Development', 'Community Empowerment', 'Nation Building'],
};

export const dynamic = 'force-static';

export default async function CSRPage() {
  const impactStats = await getImpactData();

  return (
    <main className="min-h-screen">
      <HeroSection impactStats={impactStats} />
      <PartnerLogos />
      <PartnershipFramework />
    </main>
  );
}
