import type { CollectionConfig } from 'payload'
import { emailCSRAfterChange } from './hooks/emailCSRAfterChange'

export const CSRInquiries: CollectionConfig = {
  slug: 'csr-inquiries',
  admin: {
    useAsTitle: 'companyName',
    defaultColumns: ['companyName', 'contactName', 'email', 'status', 'createdAt'],
    group: 'CSR',
  },
  hooks: {
    afterChange: [emailCSRAfterChange],
  },
  access: {
    // Only admins can read/update/delete CSR inquiries
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // API routes will create submissions
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Name of the company/organization',
      },
    },
    {
      name: 'contactFirstName',
      type: 'text',
      required: true,
      maxLength: 50,
      admin: {
        description: 'First name of the contact person',
      },
    },
    {
      name: 'contactLastName',
      type: 'text',
      required: true,
      maxLength: 50,
      admin: {
        description: 'Last name of the contact person',
      },
    },
    {
      name: 'contactName',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'Full name of contact person (auto-generated)',
      },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.contactFirstName && data?.contactLastName) {
              return `${data.contactFirstName} ${data.contactLastName}`
            }
            return data?.contactFirstName || data?.contactLastName || 'Unknown'
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
      name: 'location',
      type: 'text',
      maxLength: 100,
      admin: {
        description: 'City/Location (optional)',
      },
    },
    {
      name: 'interests',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Donations', value: 'donations' },
        { label: 'Sponsorships', value: 'sponsorships' },
        { label: 'Employee Volunteering', value: 'volunteering' },
      ],
      required: true,
      admin: {
        description: 'Partnership interests (can select multiple)',
      },
    },
    {
      name: 'budgetBand',
      type: 'select',
      options: [
        { label: 'Less than ₹10 Lakhs', value: 'under-10l' },
        { label: '₹10 Lakhs - ₹50 Lakhs', value: '10l-50l' },
        { label: '₹50 Lakhs - ₹2 Crores', value: '50l-2cr' },
        { label: 'More than ₹2 Crores', value: 'above-2cr' },
        { label: 'Prefer not to disclose', value: 'undisclosed' },
      ],
      admin: {
        description: 'Approximate CSR budget (optional)',
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
  timestamps: true,
}
