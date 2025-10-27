import React from 'react';
import type { Metadata } from 'next';
import { HeroSection, PartnershipFramework, PartnerLogos, CSRInquiryForm } from '@/components/CSR';
import { getImpactData, getCSRPartners } from '@/lib/payload/fetch';

export const metadata: Metadata = {
  title: 'CSR Partnerships for Leadership Development | Light Lives',
  description: 'Partner with Light Lives for impactful CSR initiatives. Support our HeadStart LEAD program to empower children with leadership skills and values. Long-term partnerships (5-10 years) focused on measurable impact, employee volunteering, and nation building.',
  keywords: ['CSR partnership', 'leadership development', 'children leadership programs', 'employee volunteering', 'CSR donations', 'CSR sponsorships', 'HeadStart LEAD', 'measurable CSR impact', 'India CSR', 'skill development', 'values education', 'corporate social responsibility'],
};

export const dynamic = 'force-static';

export default async function CSRPage() {
  const impactStats = await getImpactData();
  const partners = await getCSRPartners();

  return (
    <main className="min-h-screen">
      <HeroSection impactStats={impactStats} />
      <PartnerLogos partners={partners} />
      <PartnershipFramework />
      
      {/* CSR Inquiry Form Section */}
      <section id="csr-form" className="py-16 bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CSRInquiryForm />
        </div>
      </section>
    </main>
  );
}
