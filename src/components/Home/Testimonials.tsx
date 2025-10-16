import { Testimonial } from "@/types/testimonials"
const testimonials: Testimonial[] = [
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
  {
    quote: "The skill-building workshops gave me practical tools I use every day. LightLives helped me transition into a career I love.",
    name: "Rahul Patel",
    role: "Alumnus",
    imgSrc: "https://i.pravatar.cc/120?img=5",
  },
  {
    quote: "Mentoring through LightLives has been fulfilling — I can see real growth in the students and the community around them.",
    name: "Aisha Khan",
    role: "Alumni Mentor",
    imgSrc: "https://i.pravatar.cc/120?img=6",
  },
  {
    quote: "Partnering with LightLives has amplified our outreach. Their team is professional, passionate, and results-driven.",
    name: "Carlos Mendes",
    role: "Community Partner",
    imgSrc: "https://i.pravatar.cc/120?img=7",
  },
];

import React from 'react';
import TestimonialSlider from "@/components/ui/testimonials-slider";

const Testimonials: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-tertiary text-center mb-6">
          <span className="text-primary">Voices</span> From Our Community
        </h2>
        <p className="text-lg text-tertiary-500 text-center mb-12">
          Hear from parents, teachers, and students whose lives have been touched by Light Lives
        </p>
        <TestimonialSlider testimonials={testimonials} />
      </div>
    </section>
  );
};

export default Testimonials;
