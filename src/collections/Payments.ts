import type { CollectionConfig } from 'payload'
import { validatePhone, validateEmail, validateName, validatePAN, validateAmount, validateAddress } from '@/lib/validationUtils'

export const Payments: CollectionConfig = {
  slug: 'payments',
  admin: {
    useAsTitle: 'receiptNumber',
    defaultColumns: ['receiptNumber', 'email', 'amount', 'paymentStatus', 'createdAt'],
    group: 'Logs',
  },
  access: {
    // Only admins can read/create/update payments
    read: ({ req: { user } }) => {
      if (user) {
        // Allow users to see their own payments
        return {
          email: {
            equals: user.email,
          },
        }
      }
      // Admin access is handled by Payload's built-in auth
      return false
    },
    create: () => true, // API routes will create payments
    update: ({ req: { user } }) => Boolean(user), // Only authenticated users can update
    delete: ({ req: { user } }) => Boolean(user), // Only authenticated users can delete
  },
  fields: [
    // Razorpay order details
    {
      name: 'razorpayOrderId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'razorpayPaymentId',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'razorpaySignature',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    // Payment details
    {
      name: 'amount',
      type: 'number',
      required: true,
      min: 1,
      max: 1000000,
      admin: {
        step: 0.01,
        description: 'Amount in INR (minimum ₹1, maximum ₹10,00,000)',
      },
      validate: (val: number | null | undefined) => {
        if (val === null || val === undefined) {
          return 'Amount is required'
        }
        return validateAmount(val)
      },
    },
    {
      name: 'currency',
      type: 'select',
      options: [
        { label: 'INR', value: 'INR' },
        { label: 'USD', value: 'USD' },
      ],
      defaultValue: 'INR',
      required: true,
    },
    {
      name: 'paymentType',
      type: 'select',
      options: [
        { label: 'One Time', value: 'onetime' },
        { label: 'Recurring', value: 'recurring' },
        { label: 'UPI', value: 'upi' },
      ],
      required: true,
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'pending',
      required: true,
    },
    // Donor information
    {
      name: 'firstName',
      type: 'text',
      maxLength: 100,
      validate: (val: string | null | undefined) => {
        return validateName(val || '', false)
      },
    },
    {
      name: 'lastName',
      type: 'text',
      required: true,
      maxLength: 100,
      validate: (val: string | null | undefined) => {
        return validateName(val || '', true)
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      index: true,
      validate: (val: string | null | undefined) => {
        return validateEmail(val || '')
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      maxLength: 20,
      validate: (val: string | null | undefined) => {
        return validatePhone(val || '')
      },
    },
    {
      name: 'address',
      type: 'textarea',
      maxLength: 500,
      admin: {
        description: 'Complete address for 80G certificate generation',
      },
      validate: (val: string | null | undefined) => {
        return validateAddress(val || '', false)
      },
    },
    {
      name: 'panNumber',
      type: 'text',
      maxLength: 10,
      admin: {
        description: 'Required for 80G tax exemption certificate (Format: ABCDE1234F)',
      },
      validate: (val: string | null | undefined) => {
        return validatePAN(val || '')
      },
    },
    // Recurring payment details
    {
      name: 'isRecurring',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'monthlyContributionAgreed',
      type: 'checkbox',
      defaultValue: false,
    },
    // Terms and conditions
    {
      name: 'privacyPolicyAgreed',
      type: 'checkbox',
      required: true,
      defaultValue: false,
    },
    // Receipt details
    {
      name: 'receiptNumber',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
        description: 'Auto-generated receipt number',
      },
    },
    // Audit fields
    {
      name: 'ipAddress',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'IP address of the donor',
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
    // 80G certificate details
    {
      name: 'certificateIssued',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: '80G tax exemption certificate issued',
      },
    },
    {
      name: 'certificateNumber',
      type: 'text',
      maxLength: 50,
      admin: {
        condition: (data) => data.certificateIssued === true,
      },
    },
    {
      name: 'certificateIssuedAt',
      type: 'date',
      admin: {
        condition: (data) => data.certificateIssued === true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation }) => {
        // Generate receipt number for new payments
        if (operation === 'create' && !data.receiptNumber) {
          const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '')
          const randomSuffix = Math.random().toString(36).substr(2, 4).toUpperCase()
          data.receiptNumber = `LL${timestamp}${randomSuffix}`
        }
        return data
      },
    ],
  },
  timestamps: true,
}