import type { CollectionConfig } from 'payload'

export const VerticalGallery: CollectionConfig = {
  slug: 'vertical-gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'displayOrder', 'isActive'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'Brief description of the gallery item',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Gallery Image',
      admin: {
        description: 'Image for the gallery (square aspect ratio recommended)',
      },
    },
    {
      name: 'impact',
      type: 'text',
      label: 'Impact Statement',
      admin: {
        description: 'Optional: e.g., "500+ children educated"',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first in the gallery',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Uncheck to hide this item from the gallery',
      },
    },
  ],
}
