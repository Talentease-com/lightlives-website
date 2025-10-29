import type { CollectionConfig } from 'payload'

export const TeamCarouselImages: CollectionConfig = {
  slug: 'team-carousel-images',
  admin: {
    useAsTitle: 'alt',
    defaultColumns: ['alt', 'image', 'displayOrder', 'isActive'],
    group: 'Content',
    description: 'Manage team carousel images.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Carousel Image',
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
      admin: {
        description: 'Describe the image for accessibility',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first in the carousel',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Uncheck to hide this image from the carousel',
      },
    },
  ],
}
