import React from 'react';
import { Scale, FileText, Link2, AlertCircle, Ban, ExternalLink } from 'lucide-react';

export const metadata = {
  title: "Terms and Conditions - Light Lives Charitable Trust",
  description: "Terms and conditions for using the Light Lives Charitable Trust website.",
  keywords: "terms and conditions, terms of use, legal, Light Lives, website terms",
}

export const dynamic = 'force-static'

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-tertiary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-none border-2 border-white/20">
                <Scale className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Terms &amp; Conditions
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Please read these terms carefully before using our website
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Welcome */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-6">
              Welcome to Light Lives Charitable Trust
            </h2>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                These terms and conditions outline the rules and regulations for the use of Light Lives Website.
              </p>
              <div className="bg-primary-50 p-6 rounded-none border-l-4 border-primary my-6">
                <p className="font-semibold text-tertiary-800 mb-2">Light Lives is located at:</p>
                <p className="text-tertiary-700">
                  Yogitha Arcade, Balaji Nagar, Kukatpally<br />
                  Hyderabad, Telangana – 500 072
                </p>
              </div>
              <p className="mb-4">
                By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Light Lives website if you do not accept all of the terms and conditions stated on this page.
              </p>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-secondary-100 text-secondary-700 p-3 rounded-none">
                <FileText className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                Cookies
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                We employ the use of cookies. By using Light Lives website you consent to the use of cookies in accordance with Light Lives privacy policy.
              </p>
              <p className="mb-4">
                Most of the modern day interactive websites use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site to enable the functionality of this area and ease of use for those people visiting. Some of our affiliate / advertising partners may also use cookies.
              </p>
            </div>
          </div>

          {/* License */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 text-primary p-3 rounded-none">
                <Scale className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                License
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                Unless otherwise stated, Light Lives and/or its licensors own the intellectual property rights for all material on Light Lives. All intellectual property rights are reserved.
              </p>
              <p className="mb-4">
                Our downloadable documents, brochures and web pages are provided for your use. You may view and/or print pages from{' '}
                <a href="http://www.lightlives.org" className="text-primary hover:text-primary-700 font-semibold underline">
                  http://www.lightlives.org
                </a>{' '}
                for your own personal use subject to restrictions set in these terms and conditions.
              </p>

              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-none my-6">
                <div className="flex items-start">
                  <Ban className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-red-900 mb-3">You must not:</h3>
                    <ul className="list-disc pl-6 space-y-2 text-red-900">
                      <li>Republish material from http://www.lightlives.org</li>
                      <li>Sell, rent or sub-license material from http://www.lightlives.org</li>
                      <li>Reproduce, duplicate or copy material from http://www.lightlives.org</li>
                      <li>Redistribute content from Light Lives (unless content is specifically made for redistribution)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <p className="mb-4">
                No use of Light Lives logo or other artwork will be allowed for linking absent a trademark license agreement.
              </p>
            </div>
          </div>

          {/* Iframes */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-secondary-100 text-secondary-700 p-3 rounded-none">
                <ExternalLink className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                Iframes
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                Without prior approval and express written permission, you may not create frames around our web pages or use other techniques that alter in any way the visual presentation or appearance of our website.
              </p>
            </div>
          </div>

          {/* Reservation of Rights */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 text-primary p-3 rounded-none">
                <Link2 className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                Reservation of Rights
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our website. You agree to immediately remove all links to our website upon such request.
              </p>
              <p className="mb-4">
                We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuing to link to our website, you agree to be bound to and abide by these linking terms and conditions.
              </p>
            </div>
          </div>

          {/* Removal of Links */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-secondary-100 text-secondary-700 p-3 rounded-none">
                <Ban className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                Removal of Links from Our Website
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                If you find any link on our website or any linked website objectionable for any reason, you may contact us about this. We will consider requests to remove links but will have no obligation to do so or to respond directly to you.
              </p>
              <p className="mb-4">
                Whilst we endeavour to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on the website is kept up to date.
              </p>
              <div className="bg-primary-50 p-6 rounded-none border-l-4 border-primary my-6">
                <p className="text-tertiary-700">
                  Light Lives has taken every precaution to make sure the content of this website is accurate and legally correct at the time of appearance. If you believe the content of any of our pages is inaccurate please contact us at{' '}
                  <a href="mailto:leo.fernandez@lightlives.org" className="text-primary hover:text-primary-700 font-semibold underline">
                    leo.fernandez@lightlives.org
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 text-primary p-3 rounded-none">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                Disclaimer
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-none mb-6">
                <p className="text-yellow-900 font-semibold mb-2">
                  Light Lives accepts no liability for loss or damage, including personal injury, resulting from use of this website.
                </p>
              </div>
              
              <p className="mb-4">
                Light Lives makes all reasonable efforts to make sure malware or viruses are not transmitted from this website, however this cannot be guaranteed. We recommend that you safeguard your IT equipment before downloading information and files. Light Lives will not accept liability for damage caused by viruses.
              </p>
              <p className="mb-4">
                When we provide links to other websites it does not mean that we approve of or endorse the views and information contained in the website. We accept no liability for damage caused by malware or viruses on websites that we have linked to.
              </p>
            </div>
          </div>

          {/* Agreement Notice */}
          <div className="animate-fade-in-up opacity-0 [animation-delay:900ms] [animation-fill-mode:forwards]">
            <div className="bg-gradient-to-br from-secondary-100 to-primary-100 border-2 border-primary/30 p-8 rounded-none shadow-lg">
              <div className="flex items-start">
                <Scale className="h-8 w-8 text-primary mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-tertiary mb-3">Your Acceptance</h3>
                  <p className="text-lg text-tertiary-700 leading-relaxed">
                    By using the Light Lives website, you are agreeing to all the terms and conditions outlined on this page. If you do not agree with these terms, please do not use our website.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-tertiary-200 animate-fade-in-up opacity-0 [animation-delay:1000ms] [animation-fill-mode:forwards]">
            <p className="text-tertiary-600 text-center">
              If you have any questions about these terms and conditions, please{' '}
              <a href="/contact" className="text-primary hover:text-primary-700 font-semibold underline">
                contact us
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
