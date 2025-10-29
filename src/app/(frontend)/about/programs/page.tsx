import React from 'react'
import { Metadata } from 'next'
import SwooshButton from '@/components/ui/swoosh-button'
import {
  ProgramsHero,
  SkillsAndValues,
  LEADProgram,
  FrameworkImages,
  CharacterStrengths,
} from '@/components/Programs'
import { getPageImages } from '@/lib/payload/fetch'

export const metadata: Metadata = {
  title: 'Our Programs - LEAD | Light Lives',
  description:
    'Light Lives LEAD program develops competence and character in children through future-ready skills and ever-needed values. Running 8-12 year interventions with a child-centric approach.',
  keywords:
    'LEAD program, leadership development, character education, 21st century skills, child development, McKinsey skills, Paul Tough, Angela Duckworth, Light Lives, grit, values education',
}

// Enable static generation
export const dynamic = 'force-static'

export default async function ProgramsPage() {
  // Fetch page images
  const pageImages = await getPageImages()

  return (
    <div className="">
      {/* Hero Section */}
      <ProgramsHero 
        image={pageImages?.programHero}
        alt={pageImages?.programHeroAlt || 'Our Programs'}
      />

      {/* Skills & Values Overview */}
      <SkillsAndValues />

      {/* LEAD Program Details */}
      <LEADProgram />

      {/* Framework Images */}
      <FrameworkImages 
        framework1={pageImages?.framework1}
        framework1Alt={pageImages?.framework1Alt || 'Framework 1'}
        framework2={pageImages?.framework2}
        framework2Alt={pageImages?.framework2Alt || 'Framework 2'}
      />

      {/* Character Strengths */}
      <CharacterStrengths />

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary-50 to-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-tertiary mb-6">
              Bring <span className="text-primary">LEAD</span> to Your School
            </h2>
            <p className="text-xl text-tertiary-700 mb-8 leading-relaxed">
              Interested in running the LEAD program at your institution? Partner with us to 
              develop competence and character in your students through our research-backed, 
              child-centric approach.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SwooshButton
                href="/contact"
                text="Get in Touch"
                className="bg-primary hover:bg-primary-600 text-white font-bold text-lg px-8 py-4"
              />
              <SwooshButton
                href="/sponsor"
                text="Learn About Sponsorship"
                className="bg-tertiary hover:bg-tertiary-700 text-white font-bold text-lg px-8 py-4"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
