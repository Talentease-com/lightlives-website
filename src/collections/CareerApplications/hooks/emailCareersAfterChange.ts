import type { CollectionAfterChangeHook } from 'payload'
import { sendNotificationEmails } from '@/lib/emailHelpers'

export const emailCareersAfterChange: CollectionAfterChangeHook = async ({
  doc, // the document that was just changed
  req, // the full request object
  operation // 'create' | 'update'
}) => {
  // Use the centralized email helper
  await sendNotificationEmails(
    req.payload,
    'career',
    {
      name: doc.name,
      email: doc.email,
      mobile: doc.mobile,
      id: doc.id,
    },
    operation
  )

  return doc
}
