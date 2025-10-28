import type { CollectionConfig } from 'payload'
import { emailCareersAfterChange } from './hooks/emailCareersAfterChange'
import { deleteResumeAfterDelete } from './hooks/deleteResumeAfterDelete'

export const CareerApplications: CollectionConfig = {
  slug: 'career-applications',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'mobile', 'createdAt'],
    group: 'Submissions',
  },
  access: {
    // Only admins can read/update/delete career applications
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // API routes will create applications
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
        description: 'Full name of the applicant',
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
      name: 'mobile',
      type: 'text',
      required: true,
      maxLength: 20,
      admin: {
        description: 'Mobile number with country code',
      },
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Resume/CV file (PDF, DOC, DOCX)',
      },
    },
    // Additional fields for tracking
    {
      name: 'applicationStatus',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Under Review', value: 'reviewing' },
        { label: 'Interview Scheduled', value: 'interview' },
        { label: 'Accepted', value: 'accepted' },
        { label: 'Rejected', value: 'rejected' },
      ],
      defaultValue: 'new',
      required: true,
      admin: {
        description: 'Current status of the application',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        description: 'Internal notes about the applicant',
        condition: (data, siblingData, { user }) => Boolean(user),
      },
    },
    // Audit fields
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'IP address when application was submitted',
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
    afterChange: [emailCareersAfterChange],
    afterDelete: [deleteResumeAfterDelete]
  },
  timestamps: true
}