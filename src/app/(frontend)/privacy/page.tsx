import React from 'react';
import { Shield, Cookie, Lock, FileText, Users, Eye } from 'lucide-react';

export const metadata = {
  title: "Privacy Policy - Light Lives Charitable Trust",
  description: "Learn how Light Lives Charitable Trust protects your privacy and handles your personal information.",
  keywords: "privacy policy, data protection, personal information, Light Lives, privacy, security",
}

export const dynamic = 'force-static'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-tertiary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-none border-2 border-white/20">
                <Shield className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Your privacy matters to us. Learn how we protect and handle your personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            <div className="bg-gradient-to-br from-secondary-50 to-primary-50 border-l-4 border-secondary p-6 rounded-none mb-8">
              <p className="text-lg text-tertiary-700 leading-relaxed">
                Light Lives Charitable Trust is committed to protecting your privacy. We will never share or sell your information to anyone. This policy explains how we collect, use, and protect your personal data when you visit our website.
              </p>
            </div>
          </div>

          {/* How We Protect Your Personal Details */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 text-primary p-3 rounded-none">
                <Lock className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                How We Protect Your Personal Details
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                We protect the privacy of everyone using our website and will never share/sell your information to anyone.
              </p>
              <p className="mb-4">
                We use secure server software (SSL) to encrypt any financial information you send when you donate or buy something. This software encrypts all your personal data so that these details cannot be accessed as they are transferred to us over the internet.
              </p>
            </div>
          </div>

          {/* How Do We Collect Your Information */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-secondary-100 text-secondary-700 p-3 rounded-none">
                <Users className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                How Do We Collect Your Information?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                We collect information from you in a number of ways, for example when you:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Make a donation</li>
                <li>Sign up to our campaign</li>
                <li>Sign up to stay updated</li>
              </ul>
              <p className="mb-4">
                We won&apos;t collect or record your personal information unless you choose to give it to us.
              </p>
            </div>
          </div>

          {/* What Do We Do With Your Personal Information */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 text-primary p-3 rounded-none">
                <Eye className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                What Do We Do With Your Personal Information?
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                We use the information you give us in the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>To make sure we have an accurate record of all the donations we receive</li>
                <li>To email you with news and information about Light Lives and our campaigns, but only if you have agreed to this</li>
                <li>To find out more about you and the people who are visiting our website, donating or joining our campaign</li>
              </ul>
            </div>
          </div>

          {/* Cookies */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-secondary-100 text-secondary-700 p-3 rounded-none">
                <Cookie className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                Cookies
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                Like many websites we use cookies to improve your experience with us. We use them in the following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>We use styling cookies to remember your preferences for page format, text size and other display preferences</li>
                <li>We use cookies to remember your needs for media player functions</li>
                <li>We also use session cookies to remember information when you make a donation, or sign up to our campaign</li>
              </ul>
              <p className="mb-6">
                We also use cookies to gather information about what our users are doing on our website. We do this to understand how people use our website and how to improve our service. The analytical data we gather to do this is always anonymous.
              </p>
              <p className="mb-6">
                You can turn off cookies at any time. If you do, you may notice that the site does not work as well and you may not be able to use every service.
              </p>

              <div className="bg-tertiary-50 p-6 rounded-none border border-tertiary-200 my-8">
                <h3 className="text-2xl font-bold text-tertiary mb-4">Tools and Services We Use</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xl font-semibold text-tertiary mb-2">Google Analytics</h4>
                    <p className="text-tertiary-700">
                      We use Google Analytics to understand how the site is being used so that we can improve it for other visitors. The data we collect is always anonymous.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-tertiary mb-2">Social Buttons</h4>
                    <p className="text-tertiary-700">
                      Most of the pages on the site include social buttons. These buttons allow you to share pages with your friends using social media sites such as Facebook and Twitter. In order to connect to those sites we use cookies.
                    </p>
                    <p className="text-tertiary-700 mt-2">
                      You should also be aware that these websites are likely to be collecting information about you and your use of the internet. Check the policies of each site to find out how they collect information and how to opt out or delete the information.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xl font-semibold text-tertiary mb-2">External Web Services</h4>
                    <p className="text-tertiary-700">
                      We use a number of external web services on our site to display content within our web pages. For example, to display video we use YouTube. As with the social buttons, we cannot prevent these sites, or external domains, from collecting information on your use of the content we embed on our site.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-secondary-50 p-6 rounded-none border-l-4 border-secondary my-8">
                <h4 className="text-xl font-semibold text-tertiary mb-2">Turning Off Cookies</h4>
                <p className="text-tertiary-700">
                  All modern browsers allow you to change your cookie settings. The help function of your web browser will tell you how.
                </p>
              </div>
            </div>
          </div>

          {/* Agreement Notice */}
          <div className="animate-fade-in-up opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]">
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 border-2 border-secondary/30 p-8 rounded-none shadow-lg">
              <div className="flex items-start">
                <FileText className="h-8 w-8 text-secondary-700 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-tertiary mb-3">Your Agreement</h3>
                  <p className="text-lg text-tertiary-700 leading-relaxed">
                    By using the Light Lives website, you are agreeing to all the terms outlined in this privacy policy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-tertiary-200 animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
            <p className="text-tertiary-600 text-center">
              If you have any questions about our privacy policy, please{' '}
              <a href="/contact" className="text-secondary hover:text-secondary-700 font-semibold underline">
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
