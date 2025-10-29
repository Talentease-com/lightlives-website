import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import SwooshButton from '@/components/ui/swoosh-button'
import { VolunteerHero, VolunteerOpportunities, VolunteerFAQ } from '@/components/Volunteer'
import { getPageImages, getGeneralGallery } from '@/lib/payload/fetch'
import type { Media } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Volunteer With Us - Light Lives',
  description:
    'Join our volunteer team at Light Lives. Help facilitate sessions or contribute to curriculum development. Make a lasting impact on young lives through volunteering.',
  keywords:
    'volunteer, volunteering, Light Lives, education volunteer, curriculum development, session facilitator, child development, social work, community service',
}

// Enable static generation
export const dynamic = 'force-static'

export default async function VolunteerPage() {
  const [pageImages, galleryImages] = await Promise.all([
    getPageImages(),
    getGeneralGallery(),
  ]);

  return (
    <div className="">
      {/* Hero Section */}
      <VolunteerHero pageImages={pageImages} />

      {/* Volunteer Opportunities */}
      <VolunteerOpportunities />

      {/* FAQ Section */}
      <VolunteerFAQ />

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">
              Ready to Make a <span className="text-primary">Difference?</span>
            </h2>
            <p className="text-xl text-tertiary-600 mb-8">
              Whether you want to volunteer in person or remotely, we&apos;d love to hear from you. 
              Get in touch and let&apos;s explore how you can contribute to transforming young lives.
            </p>
            <SwooshButton
              href="/contact"
              text="Get in Touch"
              className="bg-primary hover:bg-primary-600 text-white font-bold text-lg px-8 py-4"
            />
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-24 bg-tertiary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {galleryImages.length > 0 ? (
              galleryImages.map((image, index) => {
                const media = image.image as Media;
                return (
                  <div
                    key={image.id}
                    className="relative h-80 rounded-none overflow-hidden shadow-lg group animate-fade-in-up opacity-0 [animation-fill-mode:forwards]"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <Image
                      src={media.url || ''}
                      alt={image.title || image.description || 'Volunteer gallery image'}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                );
              })
            ) : (
              <>
                <div className="relative h-80 rounded-none overflow-hidden shadow-lg group animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
                  <Image
                    src="https://images.pexels.com/photos/8364037/pexels-photo-8364037.jpeg"
                    alt="Volunteers collaborating with children"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="relative h-80 rounded-none overflow-hidden shadow-lg group animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
                  <Image
                    src="https://images.pexels.com/photos/8613314/pexels-photo-8613314.jpeg"
                    alt="Volunteer facilitating learning activities"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="relative h-80 rounded-none overflow-hidden shadow-lg group animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
                  <Image
                    src="https://images.pexels.com/photos/8612992/pexels-photo-8612992.jpeg"
                    alt="Volunteers making an impact"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
