import { Testimonial as TestimonialCMS } from "@/payload-types"
import { Testimonial as TestimonialType } from "@/types/testimonials"
import React from 'react';
import TestimonialSlider from "@/components/ui/testimonials-slider";

interface TestimonialsProps {
  testimonials: TestimonialCMS[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  // Process CMS data into format needed for slider
  const processedTestimonials: TestimonialType[] = testimonials.map(testimonial => {
    // Get image URL
    let imgSrc = 'https://i.pravatar.cc/120?img=4';
    if (testimonial.image) {
      const media = testimonial.image;
      if (typeof media === 'object' && media !== null && 'url' in media) {
        imgSrc = media.url || imgSrc;
      }
    }

    return {
      quote: testimonial.quote,
      name: testimonial.name,
      role: testimonial.role,
      imgSrc,
    };
  });

  // Fallback testimonials if no CMS data
  const fallbackTestimonials: TestimonialType[] = [
    {
      quote: "LightLives has truly transformed my life. The mentorship and support I received helped me gain confidence and achieve my dreams.",
      name: "Jane Doe",
      role: "Former Student",
      imgSrc: "https://i.pravatar.cc/120?img=4",
    },
    {
      quote: "Volunteering with LightLives has been one of the most rewarding experiences of my life. Seeing the impact on these young lives is incredible.",
      name: "John Smith",
      role: "Volunteer",
      imgSrc: "https://i.pravatar.cc/120?img=2",
    },
    {
      quote: "As a parent, I am so grateful for the opportunities LightLives has provided my child. The programs are engaging and truly make a difference.",
      name: "Mary Johnson",
      role: "Parent",
      imgSrc: "https://i.pravatar.cc/120?img=3",
    },
  ];

  const displayTestimonials = processedTestimonials.length > 0 ? processedTestimonials : fallbackTestimonials;
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-tertiary text-center mb-6">
          <span className="text-primary">Voices</span> From Our Community
        </h2>
        <p className="text-lg text-tertiary-500 text-center mb-12">
          Hear from parents, teachers, and students whose lives have been touched by Light Lives
        </p>
        <TestimonialSlider testimonials={displayTestimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
