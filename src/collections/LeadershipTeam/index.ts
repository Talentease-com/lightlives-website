import type { CollectionConfig } from 'payload'

export const LeadershipTeam: CollectionConfig = {
  slug: 'leadership-team',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'jobRole', 'displayOrder', 'isActive'],
    group: 'Team',
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
      name: 'jobRole',
      type: 'text',
      required: true,
      label: 'Job Title/Role',
      admin: {
        description: 'e.g., Chief Executive Officer, Director of Operations',
      },
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
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first in the grid',
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
