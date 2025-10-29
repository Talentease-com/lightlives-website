import React from 'react';
import { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SwooshButton from '@/components/ui/swoosh-button';
import ContactForm from '@/components/Contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us - Light Lives Charitable Trust',
  description: 'Get in touch with Light Lives Charitable Trust. Contact us for child sponsorship, partnerships, volunteer opportunities, and program information.',
  keywords: 'contact, light lives, charitable trust, child sponsorship, partnerships, volunteer, hyderabad',
};

const ContactPage: React.FC = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: '+91 98666 37495',
      subDetails: 'Mon-Fri 9AM-6PM IST',
    },
    {
      icon: Mail,
      title: 'Email',
      details: 'info@lightlives.org',
      subDetails: 'We reply within 24 hours',
    },
    {
      icon: MapPin,
      title: 'Office',
      details: 'Yogitha Arcade, Balaji Nagar',
      subDetails: 'Kukatpally, Hyderabad, Telangana 500 072',
    },
  ];

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold text-tertiary mb-6">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="text-xl text-tertiary-600 max-w-3xl mx-auto">
              Ready to make a difference in a child&apos;s life? Contact us to learn more about our programs, 
              partnership opportunities, or to sponsor a child today.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="animate-[fade-in-up_0.8s_ease-out_0.2s_both]">
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div className="lg:pl-8 animate-[fade-in-up_0.8s_ease-out_0.4s_both]">
              <h2 className="text-3xl font-bold text-tertiary mb-8">Contact Information</h2>
              
              <div className="space-y-8 mb-12">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  const animationDelays = [
                    'animate-[fade-in-up_0.6s_ease-out_0.6s_both]',
                    'animate-[fade-in-up_0.6s_ease-out_0.7s_both]', 
                    'animate-[fade-in-up_0.6s_ease-out_0.8s_both]'
                  ];
                  return (
                    <div 
                      key={info.title} 
                      className={`flex items-start space-x-4 ${animationDelays[index] || animationDelays[0]}`}
                    >
                      <div className="bg-primary-100 text-primary p-3">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-tertiary mb-1">
                          {info.title}
                        </h3>
                        <p className="text-tertiary-700 font-medium mb-1">
                          {info.details}
                        </p>
                        <p className="text-tertiary-500 text-sm">
                          {info.subDetails}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-primary-50 to-secondary-100 p-8 animate-[fade-in_0.8s_ease-out_1s_both]">
                <h3 className="text-2xl font-bold text-tertiary mb-6">Ready to Take Action?</h3>
                
                <div className="space-y-4">
                  <SwooshButton
                    href="/sponsor"
                    text="Sponsor a Child Today"
                    className="w-full bg-primary hover:bg-primary-600 text-white font-semibold py-3 px-6 transition-colors duration-200"
                  />
                  
                  <SwooshButton
                    href="/support/volunteer"
                    text="Become a Volunteer"
                    className="w-full bg-tertiary hover:bg-tertiary-700 text-white font-semibold py-3 px-6 transition-colors duration-200"
                  />
                  
                  <Button
                    variant="outline"
                    className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold py-3 px-6 transition-all duration-200"
                    disabled
                  >
                    Download Our Brochure
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {/* <section className="py-20 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 animate-[fade-in-up_0.8s_ease-out_0.2s_both]">
            <h2 className="text-3xl font-bold text-tertiary mb-4">Visit Our Office</h2>
            <p className="text-lg text-tertiary-600">
              We&apos;d love to meet you in person and discuss how we can work together
            </p>
          </div>

          <div className="bg-tertiary-200 h-96 flex items-center justify-center animate-[fade-in_0.8s_ease-out_0.4s_both]">
            <div className="text-center">
              <p className="text-tertiary-600 text-lg mb-4">Interactive Map Coming Soon</p>
              <div className="text-sm text-tertiary-500">
                <p className="font-semibold">Lightlives Charitable Trust</p>
                <p>Yogitha Arcade, Balaji Nagar</p>
                <p>Kukatpally, Hyderabad</p>
                <p>Telangana 500 072</p>
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default ContactPage;