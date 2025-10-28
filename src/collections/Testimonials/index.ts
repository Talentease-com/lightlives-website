import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'displayOrder', 'isActive'],
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
      label: 'Name',
    },
    {
      name: 'role',
      type: 'text',
      required: true,
      label: 'Role/Position',
      admin: {
        description: 'e.g., Parent, Student, Volunteer',
      },
    },
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      maxLength: 500,
      label: 'Testimonial Quote',
      admin: {
        description: 'The testimonial text (maximum 500 characters)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Profile Image',
      admin: {
        description: 'Square profile image (1:1 aspect ratio recommended)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Student', value: 'student' },
        { label: 'Parent', value: 'parent' },
        { label: 'Volunteer', value: 'volunteer' },
        { label: 'Partner', value: 'partner' },
        { label: 'Alumnus', value: 'alumnus' },
      ],
      defaultValue: 'student',
    },
    {
      name: 'organization',
      type: 'text',
      label: 'Organization',
      admin: {
        description: 'Optional: Organization name or affiliation',
      },
    },
    {
      name: 'testimonialDate',
      type: 'date',
      label: 'Testimonial Date',
      admin: {
        description: 'When the testimonial was given',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first in the slider',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Uncheck to hide this testimonial from the website',
      },
    },
  ],
}
