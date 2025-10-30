import React from 'react'
import Link from 'next/link'
import { Heart, Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import { NewsletterForm } from './NewsletterForm'
import { getFooterLinks, getSocialSettings } from '@/lib/payload/fetch'
import { getLinkUrl, shouldOpenInNewTab } from '@/lib/utils'

const Footer = async () => {
  const socialSettings = await getSocialSettings()
  const footerLinks = await getFooterLinks()

  // Extract links from CMS or use empty arrays as fallback
  const quickLinks = footerLinks?.quickLinks || []
  const legalDocuments = footerLinks?.legalLinks || []
  const supportLinks = footerLinks?.getInvolvedLinks || []
  const stayConnectedLinks = footerLinks?.stayConnectedLinks || []
  const policyLinks = footerLinks?.policyLinks || []

  // Use social settings data or fallback defaults
  const contact = {
    phone: socialSettings?.contact?.phone || '+91 9342250524',
    email: socialSettings?.contact?.email || 'info@lightlives.org',
    address: socialSettings?.contact?.address || 'Yogitha Arcade, Balaji Nagar\nKukatpally, Hyderabad, Telangana 500 072',
  }

  const socialMedia = {
    facebook: socialSettings?.socialMedia?.facebook,
    twitter: socialSettings?.socialMedia?.twitter,
    instagram: socialSettings?.socialMedia?.instagram,
    linkedin: socialSettings?.socialMedia?.linkedin,
  }

  const footerContent = {
    description:
      socialSettings?.footer?.description ||
      "Empowering children with essential life skills and values for a brighter tomorrow. Together, we're building a generation of confident, capable, and compassionate individuals.",
    registrationNumber: socialSettings?.footer?.registrationNumber || 'NGO/2018/12345',
    copyrightYear: socialSettings?.footer?.copyrightYear || new Date().getFullYear(),
  }

  return (
    <footer className="bg-tertiary text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-8">
          {/* Company Info - 1/5 */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <Heart className="h-8 w-8 text-primary" />
              <span className="font-bold text-xl">Light Lives</span>
            </Link>
            <p className="text-secondary/80 mb-6">{footerContent.description}</p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary" />
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="text-secondary/80 hover:text-primary transition-colors duration-200"
                >
                  {contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-secondary/80 hover:text-primary transition-colors duration-200"
                >
                  {contact.email}
                </a>
              </div>
              {/* <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <span className="text-secondary/80 whitespace-pre-line">{contact.address}</span>
              </div> */}
            </div>
          </div>

          {/* Quick Links & Legal Documents - 2/5 */}
          <div className="lg:col-span-2 flex flex-col sm:flex-row max-sm:gap-8">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => {
                  const url = getLinkUrl(link)
                  const openInNewTab = shouldOpenInNewTab(link)
                  return (
                    <li key={`quick-${index}`}>
                      <Link
                        href={url}
                        className="text-secondary/80 hover:text-primary transition-colors duration-200"
                        target={openInNewTab ? '_blank' : undefined}
                        rel={openInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg mb-6">Legal</h3>
              <ul className="space-y-3">
                {legalDocuments.map((link, index) => {
                  const url = getLinkUrl(link)
                  const openInNewTab = shouldOpenInNewTab(link)
                  return (
                    <li key={`legal-${index}`}>
                      <Link
                        href={url}
                        className="text-secondary/80 hover:text-primary transition-colors duration-200"
                        target={openInNewTab ? '_blank' : undefined}
                        rel={openInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>

          {/* Get Involved - 1/5 */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-6">Get Involved</h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => {
                const url = getLinkUrl(link)
                const openInNewTab = shouldOpenInNewTab(link)
                return (
                  <li key={`support-${index}`}>
                    <Link
                      href={url}
                      className="text-secondary/80 hover:text-primary transition-colors duration-200"
                      target={openInNewTab ? '_blank' : undefined}
                      rel={openInNewTab ? 'noopener noreferrer' : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Newsletter & Social - 1/5 */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-lg mb-6">Stay Connected</h3>
            <p className="text-secondary/80 mb-4">
              Subscribe to our newsletter for updates on our impact and programs.
            </p>

            <NewsletterForm />

            {/* Additional Stay Connected Links */}
            {stayConnectedLinks.length > 0 && (
              <ul className="space-y-2 mt-4 mb-4">
                {stayConnectedLinks.map((link, index) => {
                  const url = getLinkUrl(link)
                  const openInNewTab = shouldOpenInNewTab(link)
                  return (
                    <li key={`stay-${index}`}>
                      <Link
                        href={url}
                        className="text-secondary/80 hover:text-primary text-sm transition-colors duration-200"
                        target={openInNewTab ? '_blank' : undefined}
                        rel={openInNewTab ? 'noopener noreferrer' : undefined}
                      >
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            )}

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialMedia.facebook && (
                <a
                  href={socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/80 hover:text-primary transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <Facebook className="h-6 w-6" />
                </a>
              )}
              {socialMedia.twitter && (
                <a
                  href={socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/80 hover:text-primary transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              )}
              {socialMedia.instagram && (
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/80 hover:text-primary transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              )}
              {socialMedia.linkedin && (
                <a
                  href={socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-secondary/80 hover:text-primary transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Copyright */}
            <div className="text-secondary/80 text-sm mb-4 md:mb-0">
              © {footerContent.copyrightYear} Light Lives. All rights reserved.
            </div>

            {/* Policy Links */}
            <div className="flex space-x-6">
              {policyLinks.map((link, index) => {
                const url = getLinkUrl(link)
                const openInNewTab = shouldOpenInNewTab(link)
                return (
                  <Link
                    key={`policy-${index}`}
                    href={url}
                    className="text-secondary/80 hover:text-primary text-sm transition-colors duration-200"
                    target={openInNewTab ? '_blank' : undefined}
                    rel={openInNewTab ? 'noopener noreferrer' : undefined}
                  >
                    {link.label}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
