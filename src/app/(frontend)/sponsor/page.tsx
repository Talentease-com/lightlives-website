import React from 'react';
import type { Metadata } from 'next';
import { getImpactData, getPageVideos } from '@/lib/payload/fetch';
import { ImpactSection, DonationForm } from '@/components/Sponsor';
// import { CircularGallery } from '@/components/ui/circular-gallery';
import ScrollToSponsorButton from '@/components/Sponsor/ScrollToSponsorButton';
// import { galleryData } from '@/components/Sponsor/gallery-data';
import SwooshButton from '@/components/ui/swoosh-button';
import SponsorCTA from '@/components/SponsorCTA';
import SponsorVideo from '@/components/Sponsor/SponsorVideo';

export const metadata: Metadata = {
  title: 'Sponsor a Child’s Future | Light Lives',
  description:
    'Turn your good intention into measurable impact. With transparency, scale, and grass-roots empowerment, your contribution helps under-privileged children and young adults build skills for life.',
  openGraph: {
    title: 'Sponsor a Child’s Future | Light Lives',
    description:
      'Turn your good intention into measurable impact. With transparency, scale, and grass-roots empowerment, your contribution helps under-privileged children and young adults build skills for life.',
    type: 'website',
    url: 'https://lightlives.org/sponsor',
    images: [
      {
        url: '/images/slider_1.jpg',
        width: 1200,
        height: 630,
        alt: 'Light Lives – Sponsor a Child',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sponsor a Child’s Future | Light Lives',
    description:
      'Your investment goes the distance. Help us empower children and young adults with practical skills and a strong ecosystem.',
    images: ['/images/slider_1.jpg'],
  },
};

// Enable static generation
export const dynamic = 'force-static'
// export const revalidate = 3600 // Revalidate every hour
// TODO: Vertical gallery
const Sponsor = async () => {
  const [impactStats, pageVideos] = await Promise.all([
    getImpactData(),
    getPageVideos(),
  ]);

  return (
    <div className="min-h-screen bg-secondary-50">
      <section className="text-center z-10 py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">
            Sponsor a <span className="text-primary">Child&apos;s Future</span>
          </h1>
          <p className="text-xl text-tertiary-600 max-w-4xl mx-auto">
            You&apos;re here because you care. Underprivileged young people are smart, talented and passionate. All they need are the doors to the right opportunities. Doors you can open.
          </p>
      </section>

      {/* Corporate CTA Section */}
      <section className="pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center border border-tertiary-200 bg-tertiary-50/30 p-6 sm:p-8">
          <p className="text-base text-tertiary-600 mb-4">
            <span className="font-semibold text-tertiary">Representing a corporate?</span> Learn about our CSR partnership opportunities for long-term impact.
          </p>
          <SwooshButton 
            href="/csr" 
            text="View CSR Partnerships"
            className="bg-tertiary text-white hover:bg-tertiary/90"
          />
        </div>
      </section>

      {/* Main Content */}
      <section id="sponsor-cta" className="relative pb-10 overflow-clip">
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
          {/* Persuasive intro above the CTA (most impactful bits) */}
          <div className="max-w-3xl mb-12">
            <p className="text-tertiary-700 leading-relaxed mb-6">
              Thank you for stopping by. If you want to see an exponential outcome from your intent,
              take a closer look at what we do—your involvement here, however small, goes a long way
              with Light Lives.
            </p>
            <div>
              <h2 className="text-2xl font-semibold text-tertiary mb-3">When you make a contribution, you want to ensure</h2>
              <ul className="list-disc pl-5 space-y-2 text-tertiary-700">
                <li>
                  It is used for the stated social impact goals with complete transparency about the value it creates.
                </li>
                <li>
                  The intent is real impact—not noise—making lives easier for those who have had a rough start.
                </li>
                <li>
                  Your investment goes the distance by achieving scale and compounding value.
                </li>
              </ul>
            </div>
          </div>
          

          <div className="grid lg:grid-cols-2 gap-16">
            {/* Left Column - Impact Information */}
            <ImpactSection impactStats={impactStats} />

            {/* Right Column - Payment Form */}
            <DonationForm />
          </div>
        </div>
      </section>

      {/* Circular Gallery */}
      
      {/* <section className="relative w-full h-[90vh] flex flex-col items-center overflow-hidden justify-center text-foreground py-16">
          <CircularGallery items={galleryData} radius={700} />
      </section> */}

      {/* Deep narrative below the CTA */}
      <section className="py-20 bg-tertiary relative overflow-clip">
        {/* Background Design Elements */}
        <svg
          className="absolute top-1/2 right-0 -translate-y-30 translate-x-60 "
          width="560"
          height="720"
          viewBox="0 0 560 720"
          style={{ transform: 'rotate(45deg)' }}
        >
          <polygon
            points="300,30 516,154 516,404 300,530 84,404 84,154"
            fill="#495073"
            strokeWidth="10"
          />
        </svg>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-8 z-20">
          <div className="prose max-w-none">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-6 sm:mb-8">Why align with Light Lives?</h2>
            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Intent and Transparency</h3>
            <p className="text-white mb-6 sm:mb-8">
              Light Lives is founded by a team who genuinely cares. Our founders and board members are driven
              by one purpose—to empower under-privileged children and young adults to equalize the game in
              their professional and personal pursuits. With robust governance in place, you can be sure your
              contribution is well invested; you can even track the progress of our projects here on our website
              to see the difference your support makes.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Achieving Scale</h3>
            <p className="text-white mb-6 sm:mb-8">
              We have already empowered thousands across the country. Our delivery infrastructure is built to
              achieve scale, so anything you invest goes the extra mile because of the systems, team, and
              structure we have in place. Our goal is to impact not thousands but millions—so your involvement
              matters and makes a difference, one individual, one institution at a time—driving measurable,
              exponential impact.
            </p>

            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-3 sm:mb-4">Address Grass Roots</h3>
            <p className="text-white mb-8 sm:mb-10">
              Too many problems remain unsolved because the focus is on the periphery. Light Lives tackles
              challenges from the roots. We focus on deep, grass-root empowerment, system changes, and the
              beliefs, values, and skills that can transform society from within. The impact we see is designed
              for sustainability and lasting societal change.
            </p>

            <p className="text-white mb-2 sm:mb-4">
              We deeply value your intent and passion. It is our privilege to help turn your good intention into a
              tangible blessing for many.
            </p>
          </div>
        </div>
      </section>

      {/* Video Explainer */}
      <SponsorVideo 
        videoData={pageVideos ? {
          videoFile: pageVideos.sponsorVideoFile,
          videoUrl: pageVideos.sponsorVideoUrl,
          title: pageVideos.sponsorVideoTitle || 'Watch how Light Lives works',
          description: pageVideos.sponsorVideoDescription,
          thumbnail: pageVideos.sponsorVideoThumbnail,
        } : undefined}
      />

      {/* Back to Top CTA */}
      <SponsorCTA>
          <ScrollToSponsorButton />
      </SponsorCTA>
    </div>
  );
};

export default Sponsor;
