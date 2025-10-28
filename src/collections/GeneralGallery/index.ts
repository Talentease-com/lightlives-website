import type { CollectionConfig } from 'payload'

export const GeneralGallery: CollectionConfig = {
  slug: 'general-gallery',
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
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Image',
      admin: {
        description: 'Gallery image',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title (Optional)',
      admin: {
        description: 'Optional title for the image',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (Optional)',
      admin: {
        description: 'Optional description for the image',
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
