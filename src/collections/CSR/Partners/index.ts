import type { CollectionConfig } from 'payload'

export const Partners: CollectionConfig = {
  slug: 'partners',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'industry', 'isActive', 'displayOrder'],
    group: 'CSR',
  },
  access: {
    read: () => true, // Public can view active partners
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      maxLength: 100,
      admin: {
        description: 'Name of the partner organization',
      },
    },
    {
      name: 'industry',
      type: 'select',
      options: [
        { label: 'Technology', value: 'technology' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Education', value: 'education' },
        { label: 'Finance', value: 'finance' },
        { label: 'Manufacturing', value: 'manufacturing' },
        { label: 'Social Development', value: 'social-development' },
        { label: 'Community Empowerment', value: 'community-empowerment' },
        { label: 'Retail', value: 'retail' },
        { label: 'Energy', value: 'energy' },
        { label: 'Other', value: 'other' },
      ],
      required: true,
      admin: {
        description: 'Industry sector of the partner',
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Partner logo (recommended size: 400x250px)',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether to display this partner on the website',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order in which partners are displayed (lower numbers first)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Optional description about the partnership',
      },
    },
    {
      name: 'partnershipStartDate',
      type: 'date',
      admin: {
        description: 'When the partnership began (optional)',
      },
    },
  ],
  timestamps: true,
}
