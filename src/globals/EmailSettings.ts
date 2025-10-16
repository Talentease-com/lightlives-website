import type { GlobalConfig } from 'payload'
import { DEFAULT_VALUES } from '@/lib/emailHelpers'

export const EmailSettings: GlobalConfig = {
  slug: 'email-settings',
  admin: {
    group: 'Settings',
    description: 'Manage email configurations for automated notifications',
  },
  fields: [
    // Contact Form Email Settings
    {
      name: 'contactEmails',
      type: 'group',
      label: 'Contact Form Emails',
      admin: {
        description: 'Configure emails sent when users submit the contact form',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Contact Form Emails',
          defaultValue: true,
          admin: {
            description: 'Turn on/off email notifications for contact form submissions',
          },
        },
        {
          name: 'adminEmail',
          type: 'email',
          label: 'Admin Email',
          required: true,
          defaultValue: DEFAULT_VALUES.adminEmail,
          admin: {
            description: 'Primary email address to receive contact form notifications',
          },
        },
        {
          name: 'ccEmails',
          type: 'array',
          label: 'CC Recipients',
          admin: {
            description: 'Additional email addresses to CC on contact form notifications',
          },
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
            },
          ],
        },
        {
          name: 'autoReplyEnabled',
          type: 'checkbox',
          label: 'Enable Auto-Reply to Users',
          defaultValue: true,
          admin: {
            description: 'Send automatic confirmation email to users who submit the contact form',
          },
        },
        {
          name: 'autoReplySubject',
          type: 'text',
          label: 'Auto-Reply Subject',
          defaultValue: DEFAULT_VALUES.contactSubject,
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.autoReplyEnabled),
            description: 'Subject line for the auto-reply email',
          },
        },
        {
          name: 'responseTime',
          type: 'text',
          label: 'Response Time Promise',
          defaultValue: DEFAULT_VALUES.contactResponseTime,
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.autoReplyEnabled),
            description: 'How long users can expect to wait for a response',
          },
        },
        {
          name: 'customMessage',
          type: 'textarea',
          label: 'Custom Auto-Reply Message',
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.autoReplyEnabled),
            description: 'Additional message to include in the auto-reply email',
            rows: 3,
          },
        },
      ],
    },
    
    // Career Application Email Settings
    {
      name: 'careerEmails',
      type: 'group',
      label: 'Career Application Emails',
      admin: {
        description: 'Configure emails sent when users submit job applications',
      },
      fields: [
        {
          name: 'enabled',
          type: 'checkbox',
          label: 'Enable Career Application Emails',
          defaultValue: true,
          admin: {
            description: 'Turn on/off email notifications for career applications',
          },
        },
        {
          name: 'hrEmail',
          type: 'email',
          label: 'HR Email',
          required: true,
          defaultValue: DEFAULT_VALUES.hrEmail,
          admin: {
            description: 'Primary email address to receive career application notifications',
          },
        },
        {
          name: 'ccEmails',
          type: 'array',
          label: 'CC Recipients',
          admin: {
            description: 'Additional email addresses to CC on career application notifications',
          },
          fields: [
            {
              name: 'email',
              type: 'email',
              required: true,
            },
          ],
        },
        {
          name: 'applicantAutoReply',
          type: 'checkbox',
          label: 'Enable Auto-Reply to Applicants',
          defaultValue: true,
          admin: {
            description: 'Send automatic confirmation email to job applicants',
          },
        },
        {
          name: 'applicantSubject',
          type: 'text',
          label: 'Applicant Auto-Reply Subject',
          defaultValue: DEFAULT_VALUES.careerSubject,
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.applicantAutoReply),
            description: 'Subject line for the applicant confirmation email',
          },
        },
        {
          name: 'reviewTime',
          type: 'text',
          label: 'Application Review Time',
          defaultValue: DEFAULT_VALUES.careerResponseTime,
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.applicantAutoReply),
            description: 'How long applicants can expect to wait for a response',
          },
        },
        {
          name: 'customApplicantMessage',
          type: 'textarea',
          label: 'Custom Applicant Message',
          admin: {
            condition: (data, siblingData) => Boolean(siblingData?.applicantAutoReply),
            description: 'Additional message to include in the applicant confirmation email',
            rows: 3,
          },
        },
      ],
    },
    
    // General Organization Settings
    {
      name: 'organization',
      type: 'group',
      label: 'Organization Settings',
      admin: {
        description: 'General organization information used in email templates',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Organization Name',
          required: true,
          defaultValue: DEFAULT_VALUES.organizationName,
          admin: {
            description: 'Full name of the organization',
          },
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Organization Address',
          defaultValue: DEFAULT_VALUES.organizationAddress,
          admin: {
            description: 'Physical address of the organization',
            rows: 3,
          },
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Contact Phone',
          defaultValue: DEFAULT_VALUES.organizationPhone,
          admin: {
            description: 'Primary phone number for the organization',
          },
        },
        {
          name: 'replyToEmail',
          type: 'email',
          label: 'Default Reply-To Email',
          defaultValue: DEFAULT_VALUES.organizationEmail,
          admin: {
            description: 'Default email address for replies',
          },
        },
        {
          name: 'websiteUrl',
          type: 'text',
          label: 'Website URL',
          defaultValue: DEFAULT_VALUES.websiteUrl,
          admin: {
            description: 'Main website URL',
          },
        },
      ],
    },
    
    // Email Template Styling
    {
      name: 'styling',
      type: 'group',
      label: 'Email Template Styling',
      admin: {
        description: 'Customize the appearance and branding of email templates',
      },
      fields: [
        {
          name: 'primaryColor',
          type: 'text',
          label: 'Primary Color',
          defaultValue: DEFAULT_VALUES.primaryColor,
          admin: {
            description: 'Primary brand color (hex code)',
          },
        },
        {
          name: 'secondaryColor',
          type: 'text',
          label: 'Secondary Color',
          defaultValue: DEFAULT_VALUES.secondaryColor,
          admin: {
            description: 'Secondary brand color (hex code)',
          },
        },
        {
          name: 'logoUrl',
          type: 'text',
          label: 'Logo URL',
          admin: {
            description: 'URL to organization logo for email headers (optional)',
          },
        },
        {
          name: 'footerText',
          type: 'textarea',
          label: 'Email Footer Text',
          defaultValue: DEFAULT_VALUES.footerText,
          admin: {
            description: 'Custom text to display in email footers',
            rows: 2,
          },
        },
      ],
    },
  ],
}