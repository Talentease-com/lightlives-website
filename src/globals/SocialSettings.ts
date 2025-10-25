import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const SocialSettings: GlobalConfig = {
  slug: 'social-settings',
  admin: {
    group: 'Settings',
    description: 'Manage social media links and contact information displayed in the footer',
  },
  hooks: {
    afterChange: [revalidateFooter],
  },
  fields: [
    // Contact Information
    {
      name: 'contact',
      type: 'group',
      label: 'Contact Information',
      admin: {
        description: 'Primary contact details displayed in the footer',
      },
      fields: [
        {
          name: 'phone',
          type: 'text',
          label: 'Phone Number',
          defaultValue: '+91 98666 37495',
          admin: {
            description: 'Primary contact phone number',
          },
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email Address',
          defaultValue: 'info@lightlives.org',
          admin: {
            description: 'Primary contact email address',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Physical Address',
          defaultValue: 'Yogitha Arcade, Balaji Nagar\nKukatpally, Hyderabad, Telangana 500 072',
          admin: {
            description: 'Organization physical address',
            rows: 3,
          },
        },
      ],
    },

    // Social Media Links
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media Links',
      admin: {
        description: 'Social media profile URLs',
      },
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
          admin: {
            description: 'Full URL to Facebook page',
            placeholder: 'https://facebook.com/lightlives',
          },
        },
        {
          name: 'twitter',
          type: 'text',
          label: 'Twitter/X URL',
          admin: {
            description: 'Full URL to Twitter/X profile',
            placeholder: 'https://twitter.com/lightlives',
          },
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
          admin: {
            description: 'Full URL to Instagram profile',
            placeholder: 'https://instagram.com/lightlives',
          },
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
          admin: {
            description: 'Full URL to LinkedIn page',
            placeholder: 'https://linkedin.com/company/lightlives',
          },
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
          admin: {
            description: 'Full URL to YouTube channel',
            placeholder: 'https://youtube.com/@lightlives',
          },
        },
      ],
    },

    // Footer Content
    {
      name: 'footer',
      type: 'group',
      label: 'Footer Content',
      admin: {
        description: 'Additional content displayed in the footer',
      },
      fields: [
        {
          name: 'description',
          type: 'textarea',
          label: 'Organization Description',
          defaultValue:
            'Empowering children with essential life skills and values for a brighter tomorrow. Together, we\'re building a generation of confident, capable, and compassionate individuals.',
          admin: {
            description: 'Brief description of the organization displayed in the footer',
            rows: 3,
          },
        },
        {
          name: 'registrationNumber',
          type: 'text',
          label: 'Registration Number',
          defaultValue: 'NA',
          admin: {
            description: 'Official NGO registration number',
          },
        },
        {
          name: 'copyrightYear',
          type: 'number',
          label: 'Copyright Year',
          defaultValue: new Date().getFullYear(),
          admin: {
            description: 'Copyright year (defaults to current year)',
          },
        },
      ],
    },
  ],
}
