import type { CollectionConfig } from 'payload'

export const AdvisoryBoard: CollectionConfig = {
  slug: 'advisory-board',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'displayOrder', 'isActive'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Full Name',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Profile Image',
      admin: {
        description: 'Square image recommended (1:1 aspect ratio)',
      },
    },
    {
      name: 'bio',
      type: 'textarea',
      required: true,
      label: 'Biography',
      admin: {
        description: 'Full paragraph about the advisory board member',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first on the page',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Uncheck to hide this member from the team page',
      },
    },
  ],
}
