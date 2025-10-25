import type { CollectionConfig } from 'payload'
import { sendWelcomeEmail } from './hooks/sendWelcomeEmail'

export const NewsletterSubscribers: CollectionConfig = {
  slug: 'newsletter-subscribers',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['email', 'status', 'subscribedAt'],
    group: 'Communications',
  },
  access: {
    // Only admins can read/update/delete newsletter subscribers
    read: ({ req: { user } }) => Boolean(user),
    create: () => true, // API routes will create subscriptions
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Email address of the subscriber',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Unsubscribed', value: 'unsubscribed' },
      ],
      defaultValue: 'active',
      required: true,
      admin: {
        description: 'Subscription status',
      },
    },
    {
      name: 'subscribedAt',
      type: 'date',
      admin: {
        readOnly: true,
        description: 'Date when the user subscribed',
        date: {
          displayFormat: 'd MMM yyy h:mm a',
        },
      },
      hooks: {
        beforeValidate: [
          ({ value, operation }) => {
            if (operation === 'create' && !value) {
              return new Date().toISOString()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'unsubscribedAt',
      type: 'date',
      admin: {
        description: 'Date when the user unsubscribed',
        date: {
          displayFormat: 'd MMM yyy h:mm a',
        },
        condition: (data) => data?.status === 'unsubscribed',
      },
    },
    // Audit fields
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'IP address when subscription was made',
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
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Website Footer', value: 'footer' },
        { label: 'Contact Page', value: 'contact' },
        { label: 'Popup', value: 'popup' },
        { label: 'Manual', value: 'manual' },
      ],
      defaultValue: 'footer',
      admin: {
        description: 'Source of the subscription',
      },
    },
  ],
  hooks: {
    afterChange: [sendWelcomeEmail],
  },
  timestamps: true,
}
