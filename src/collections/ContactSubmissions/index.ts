import type { CollectionConfig } from 'payload'
import { emailContactAfterChange } from './hooks/emailContactAfterChange'

export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'subject', 'createdAt'],
    group: 'Communications',
  },
  access: {
    // Only admins can read/update/delete contact submissions
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // API routes will create submissions
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
      required: true,
      maxLength: 50,
      admin: {
        description: 'First name of the person contacting us',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      maxLength: 50,
      admin: {
        description: 'Last name of the person contacting us',
      },
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Full name (auto-generated)',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.firstName && data?.lastName) {
              return `${data.firstName} ${data.lastName}`
            }
            return data?.firstName || data?.lastName || 'Unknown'
          },
        ],
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
      admin: {
        description: 'Email address for communication',
      },
    },
    {
      name: 'phone',
      type: 'text',
      maxLength: 20,
      admin: {
        description: 'Phone number (optional)',
      },
    },
    {
      name: 'subject',
      type: 'select',
      options: [
        { label: 'Child Sponsorship', value: 'sponsorship' },
        { label: 'Partnership Inquiry', value: 'partnership' },
        { label: 'Volunteer Opportunities', value: 'volunteer' },
        { label: 'Program Information', value: 'programs' },
        { label: 'CSR Partnership', value: 'csr' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        description: 'Subject of the inquiry',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      maxLength: 2000,
      admin: {
        description: 'Message content',
        rows: 6,
      },
    },
    // Status tracking
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Responded', value: 'responded' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'new',
      required: true,
      admin: {
        description: 'Current status of the inquiry',
      },
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Normal', value: 'normal' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      defaultValue: 'normal',
      required: true,
      admin: {
        description: 'Priority level of the inquiry',
      },
    },
    {
      name: 'assignedTo',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        description: 'Team member assigned to handle this inquiry',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about the inquiry',
        condition: (data, siblingData, { user }) => Boolean(user),
      },
    },
    // Audit fields
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'IP address when submission was made',
      },
    },
    {
      name: 'userAgent',
      type: 'textarea',
      admin: {
        readOnly: true,
        description: 'Browser user agent string',
      },
    },
  ],
  hooks: {
    afterChange: [emailContactAfterChange]
  },
  timestamps: true,
}