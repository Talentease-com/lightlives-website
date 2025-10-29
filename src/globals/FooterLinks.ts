import type { GlobalConfig } from 'payload'
import { revalidateFooter } from './hooks/revalidateFooter'

export const FooterLinks: GlobalConfig = {
  slug: 'footer-links',
  admin: {
    group: 'Settings',
    description: 'Manage footer navigation links organized by categories',
  },
  hooks: {
    afterChange: [revalidateFooter],
  },
  fields: [
    // Quick Links Category
    {
      name: 'quickLinks',
      type: 'array',
      label: 'Quick Links',
      admin: {
        description: 'Links for the "Quick Links" section in the footer',
        initCollapsed: false,
      },
      defaultValue: [
        {
          label: 'Our Mission',
          linkType: 'page',
          pagePath: '/about/mission',
          openInNewTab: false,
        },
        {
          label: 'Our Programs',
          linkType: 'page',
          pagePath: '/about/programs',
          openInNewTab: false,
        },
        {
          label: 'Meet the Team',
          linkType: 'page',
          pagePath: '/about/team',
          openInNewTab: false,
        },
        {
          label: 'News & Events',
          linkType: 'page',
          pagePath: '/news',
          openInNewTab: false,
        },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Link Label',
          required: true,
          admin: {
            description: 'Display text for the link',
          },
        },
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link Type',
          required: true,
          defaultValue: 'page',
          options: [
            {
              label: 'Internal Page',
              value: 'page',
            },
            {
              label: 'Document/PDF',
              value: 'document',
            },
            {
              label: 'External URL',
              value: 'external',
            },
          ],
          admin: {
            description: 'Choose whether this links to a page, document, or external URL',
            layout: 'horizontal',
          },
        },
        {
          name: 'pagePath',
          type: 'text',
          label: 'Page Path',
          admin: {
            description: 'Internal page path (e.g., /about/mission)',
            placeholder: '/about/mission',
            condition: (data, siblingData) => siblingData?.linkType === 'page',
          },
        },
        {
          name: 'document',
          type: 'upload',
          label: 'Document',
          relationTo: 'media',
          admin: {
            description: 'Upload a PDF or document file',
            condition: (data, siblingData) => siblingData?.linkType === 'document',
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'External URL',
          admin: {
            description: 'Full external URL (e.g., https://example.com)',
            placeholder: 'https://example.com',
            condition: (data, siblingData) => siblingData?.linkType === 'external',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: false,
          admin: {
            description: 'Open link in a new tab (recommended for external links and documents)',
          },
        },
      ],
    },

    // Legal Category
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Legal',
      admin: {
        description: 'Links for the "Legal" section in the footer (certificates, compliance docs)',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Link Label',
          required: true,
          admin: {
            description: 'Display text for the link',
          },
        },
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link Type',
          required: true,
          defaultValue: 'document',
          options: [
            {
              label: 'Internal Page',
              value: 'page',
            },
            {
              label: 'Document/PDF',
              value: 'document',
            },
            {
              label: 'External URL',
              value: 'external',
            },
          ],
          admin: {
            description: 'Choose whether this links to a page, document, or external URL',
            layout: 'horizontal',
          },
        },
        {
          name: 'pagePath',
          type: 'text',
          label: 'Page Path',
          admin: {
            description: 'Internal page path',
            placeholder: '/legal/compliance',
            condition: (data, siblingData) => siblingData?.linkType === 'page',
          },
        },
        {
          name: 'document',
          type: 'upload',
          label: 'Document',
          relationTo: 'media',
          admin: {
            description: 'Upload a PDF or document file (recommended for certificates)',
            condition: (data, siblingData) => siblingData?.linkType === 'document',
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'External URL',
          admin: {
            description: 'Full external URL',
            placeholder: 'https://example.com',
            condition: (data, siblingData) => siblingData?.linkType === 'external',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: true,
          admin: {
            description: 'Open link in a new tab (recommended for documents)',
          },
        },
      ],
    },

    // Get Involved Category
    {
      name: 'getInvolvedLinks',
      type: 'array',
      label: 'Get Involved',
      admin: {
        description: 'Links for the "Get Involved" section in the footer',
        initCollapsed: false,
      },
      defaultValue: [
        {
          label: 'Sponsor a Child',
          linkType: 'page',
          pagePath: '/sponsor',
          openInNewTab: false,
        },
        {
          label: 'Volunteer',
          linkType: 'page',
          pagePath: '/support/volunteer',
          openInNewTab: false,
        },
        {
          label: 'Corporate Partnership',
          linkType: 'page',
          pagePath: '/csr',
          openInNewTab: false,
        },
        {
          label: 'Careers',
          linkType: 'page',
          pagePath: '/support/join',
          openInNewTab: false,
        },
      ],
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Link Label',
          required: true,
          admin: {
            description: 'Display text for the link',
          },
        },
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link Type',
          required: true,
          defaultValue: 'page',
          options: [
            {
              label: 'Internal Page',
              value: 'page',
            },
            {
              label: 'Document/PDF',
              value: 'document',
            },
            {
              label: 'External URL',
              value: 'external',
            },
          ],
          admin: {
            description: 'Choose whether this links to a page, document, or external URL',
            layout: 'horizontal',
          },
        },
        {
          name: 'pagePath',
          type: 'text',
          label: 'Page Path',
          admin: {
            description: 'Internal page path (e.g., /sponsor)',
            placeholder: '/sponsor',
            condition: (data, siblingData) => siblingData?.linkType === 'page',
          },
        },
        {
          name: 'document',
          type: 'upload',
          label: 'Document',
          relationTo: 'media',
          admin: {
            description: 'Upload a PDF or document file',
            condition: (data, siblingData) => siblingData?.linkType === 'document',
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'External URL',
          admin: {
            description: 'Full external URL (e.g., https://donate.example.com)',
            placeholder: 'https://donate.example.com',
            condition: (data, siblingData) => siblingData?.linkType === 'external',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: false,
          admin: {
            description: 'Open link in a new tab (recommended for external links)',
          },
        },
      ],
    },

    // Stay Connected Category (Additional Links)
    {
      name: 'stayConnectedLinks',
      type: 'array',
      label: 'Stay Connected (Additional Links)',
      admin: {
        description:
          'Optional additional links for the "Stay Connected" section (social media and newsletter are handled separately)',
        initCollapsed: true,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Link Label',
          required: true,
          admin: {
            description: 'Display text for the link',
          },
        },
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link Type',
          required: true,
          defaultValue: 'page',
          options: [
            {
              label: 'Internal Page',
              value: 'page',
            },
            {
              label: 'Document/PDF',
              value: 'document',
            },
            {
              label: 'External URL',
              value: 'external',
            },
          ],
          admin: {
            description: 'Choose whether this links to a page, document, or external URL',
            layout: 'horizontal',
          },
        },
        {
          name: 'pagePath',
          type: 'text',
          label: 'Page Path',
          admin: {
            description: 'Internal page path',
            placeholder: '/blog',
            condition: (data, siblingData) => siblingData?.linkType === 'page',
          },
        },
        {
          name: 'document',
          type: 'upload',
          label: 'Document',
          relationTo: 'media',
          admin: {
            description: 'Upload a PDF or document file',
            condition: (data, siblingData) => siblingData?.linkType === 'document',
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'External URL',
          admin: {
            description: 'Full external URL',
            placeholder: 'https://example.com',
            condition: (data, siblingData) => siblingData?.linkType === 'external',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: false,
          admin: {
            description: 'Open link in a new tab',
          },
        },
      ],
    },

    // Graces Culture Section
    {
      name: 'gracesCultureLink',
      type: 'group',
      label: 'Graces Culture',
      admin: {
        description: 'Single link for Graces Culture section',
      },
      fields: [
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link Type',
          required: true,
          defaultValue: 'document',
          options: [
            {
              label: 'Internal Page',
              value: 'page',
            },
            {
              label: 'Document/PDF',
              value: 'document',
            },
            {
              label: 'External URL',
              value: 'external',
            },
          ],
          admin: {
            description: 'Choose whether this links to a page, document, or external URL',
            layout: 'horizontal',
          },
        },
        {
          name: 'pagePath',
          type: 'text',
          label: 'Page Path',
          admin: {
            description: 'Internal page path (e.g., /about/culture)',
            placeholder: '/about/culture',
            condition: (data, siblingData) => siblingData?.linkType === 'page',
          },
        },
        {
          name: 'document',
          type: 'upload',
          label: 'Document',
          relationTo: 'media',
          admin: {
            description: 'Upload a PDF or document file',
            condition: (data, siblingData) => siblingData?.linkType === 'document',
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'External URL',
          admin: {
            description: 'Full external URL',
            placeholder: 'https://example.com',
            condition: (data, siblingData) => siblingData?.linkType === 'external',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: true,
          admin: {
            description: 'Open link in a new tab',
          },
        },
      ],
    },

    // Policy Links (Bottom Bar)
    {
      name: 'policyLinks',
      type: 'array',
      label: 'Policy Links (Bottom Bar)',
      admin: {
        description: 'Links displayed in the bottom copyright bar (e.g., Privacy Policy, Terms)',
        initCollapsed: false,
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Link Label',
          required: true,
          admin: {
            description: 'Display text for the link',
          },
        },
        {
          name: 'linkType',
          type: 'radio',
          label: 'Link Type',
          required: true,
          defaultValue: 'page',
          options: [
            {
              label: 'Internal Page',
              value: 'page',
            },
            {
              label: 'Document/PDF',
              value: 'document',
            },
            {
              label: 'External URL',
              value: 'external',
            },
          ],
          admin: {
            description: 'Choose whether this links to a page, document, or external URL',
            layout: 'horizontal',
          },
        },
        {
          name: 'pagePath',
          type: 'text',
          label: 'Page Path',
          admin: {
            description: 'Internal page path (e.g., /privacy)',
            placeholder: '/privacy',
            condition: (data, siblingData) => siblingData?.linkType === 'page',
          },
        },
        {
          name: 'document',
          type: 'upload',
          label: 'Document',
          relationTo: 'media',
          admin: {
            description: 'Upload a PDF or document file',
            condition: (data, siblingData) => siblingData?.linkType === 'document',
          },
        },
        {
          name: 'externalUrl',
          type: 'text',
          label: 'External URL',
          admin: {
            description: 'Full external URL',
            placeholder: 'https://example.com/privacy',
            condition: (data, siblingData) => siblingData?.linkType === 'external',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          label: 'Open in New Tab',
          defaultValue: false,
          admin: {
            description: 'Open link in a new tab',
          },
        },
      ],
    },
  ],
}
