import type { CollectionConfig } from 'payload'
import { revalidateAfterChange, revalidateAfterDelete } from './hooks/revalidateImpact'

export const Impacts: CollectionConfig = {
  slug: 'impacts',
  admin: {
    useAsTitle: 'desc',
    defaultColumns: ['desc', 'val', 'val2', 'isActive'],
  },
  access: {
    read: () => true, // Public read access for frontend display
  },
  hooks: {
    afterChange: [revalidateAfterChange],
    afterDelete: [revalidateAfterDelete],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Internal title for this impact statistic',
      },
    },
    {
      name: 'val',
      label: 'Primary Value',
      type: 'number',
      required: true,
      admin: {
        step: 0.01,
        description: 'The main impact number (e.g., 4.31, 177000, 160)',
      },
    },
    {
      name: 'suffix',
      label: 'Value Suffix',
      type: 'text',
      admin: {
        description: 'Unit or modifier for the primary value (e.g., "million *", "*")',
      },
    },
    {
      name: 'decimals',
      label: 'Decimal Places',
      type: 'number',
      defaultValue: 0,
      admin: {
        step: 1,
        description: 'Number of decimal places to display for the primary value (e.g., 0, 1, 2)',
      },
    },
    {
      name: 'desc',
      label: 'Primary Description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Main description of the impact (e.g., "Impact sessions in total")',
      },
    },
    {
      name: 'val2',
      label: 'Secondary Value',
      type: 'number',
      required: true,
      admin: {
        description: 'Light Lives specific number (e.g., 145000, 11000, 27)',
      },
    },
    {
      name: 'desc2',
      label: 'Secondary Description',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Light Lives specific description (e.g., "delivered by Light Lives")',
      },
    },
    {
      name: 'decimals2',
      label: 'Secondary Value Decimal Places',
      type: 'number',
      defaultValue: 0,
      admin: {
        step: 1,
        description: 'Number of decimal places to display for the secondary value',
      },
    },
    {
      name: 'displayOrder',
      label: 'Display Order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Order in which this impact should be displayed (lower numbers first)',
      },
    },
    {
      name: 'usePointer',
      label: 'Use Pointer',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this impact should use a pointer animation',
      },
    },
    {
      name: 'isActive',
      label: 'Active',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this impact should be displayed on the website',
      },
    },
  ],
}
