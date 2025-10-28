import type { GlobalConfig } from 'payload'
import { revalidatePageImages } from './hooks/revalidatePageImages'

export const PageImages: GlobalConfig = {
  slug: 'page-images',
  label: 'Page Images',
  access: {
    read: () => true,
  },
  fields: [
    // Mission Page Images
    {
      type: 'row',
      fields: [
        {
          name: 'missionHero',
          type: 'upload',
          relationTo: 'media',
          label: 'Mission Hero',
          admin: {
            description: 'Hero image for Mission page',
          },
        },
        {
          name: 'missionHeroAlt',
          type: 'text',
          label: 'Mission Hero Alt Text',
          defaultValue: 'Our Mission',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'vision',
          type: 'upload',
          relationTo: 'media',
          label: 'Vision',
          admin: {
            description: 'Vision section image',
          },
        },
        {
          name: 'visionAlt',
          type: 'text',
          label: 'Vision Alt Text',
          defaultValue: 'Our Vision',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'conviction',
          type: 'upload',
          relationTo: 'media',
          label: 'Conviction',
          admin: {
            description: 'Conviction section image',
          },
        },
        {
          name: 'convictionAlt',
          type: 'text',
          label: 'Conviction Alt Text',
          defaultValue: 'Our Conviction',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'missionImpact',
          type: 'upload',
          relationTo: 'media',
          label: 'Mission Impact',
          admin: {
            description: 'Mission Impact section image',
          },
        },
        {
          name: 'missionImpactAlt',
          type: 'text',
          label: 'Mission Impact Alt Text',
          defaultValue: 'Our Impact',
        },
      ],
    },

    // Program Page Images
    {
      type: 'row',
      fields: [
        {
          name: 'programHero',
          type: 'upload',
          relationTo: 'media',
          label: 'Program Hero',
          admin: {
            description: 'Hero image for Programs page',
          },
        },
        {
          name: 'programHeroAlt',
          type: 'text',
          label: 'Program Hero Alt Text',
          defaultValue: 'Our Programs',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'framework1',
          type: 'upload',
          relationTo: 'media',
          label: 'Framework 1',
          admin: {
            description: 'First framework image',
          },
        },
        {
          name: 'framework1Alt',
          type: 'text',
          label: 'Framework 1 Alt Text',
          defaultValue: 'Framework 1',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'framework2',
          type: 'upload',
          relationTo: 'media',
          label: 'Framework 2',
          admin: {
            description: 'Second framework image',
          },
        },
        {
          name: 'framework2Alt',
          type: 'text',
          label: 'Framework 2 Alt Text',
          defaultValue: 'Framework 2',
        },
      ],
    },

    // CSR Page
    {
      type: 'row',
      fields: [
        {
          name: 'csrHero',
          type: 'upload',
          relationTo: 'media',
          label: 'CSR Hero',
          admin: {
            description: 'Hero image for CSR page',
          },
        },
        {
          name: 'csrHeroAlt',
          type: 'text',
          label: 'CSR Hero Alt Text',
          defaultValue: 'Corporate Social Responsibility',
        },
      ],
    },

    // Volunteer Page
    {
      type: 'row',
      fields: [
        {
          name: 'volunteerHero',
          type: 'upload',
          relationTo: 'media',
          label: 'Volunteer Hero',
          admin: {
            description: 'Hero image for Volunteer page',
          },
        },
        {
          name: 'volunteerHeroAlt',
          type: 'text',
          label: 'Volunteer Hero Alt Text',
          defaultValue: 'Volunteer with LightLives',
        },
      ],
    },

    // Join Us Page
    {
      type: 'row',
      fields: [
        {
          name: 'joinUsHero',
          type: 'upload',
          relationTo: 'media',
          label: 'Join Us Hero',
          admin: {
            description: 'Hero image for Join Us page',
          },
        },
        {
          name: 'joinUsHeroAlt',
          type: 'text',
          label: 'Join Us Hero Alt Text',
          defaultValue: 'Join Our Team',
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePageImages],
  },
}
