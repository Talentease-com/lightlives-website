import type { CollectionAfterChangeHook } from 'payload'
import { sendNotificationEmails } from '@/lib/emailHelpers'

export const emailContactAfterChange: CollectionAfterChangeHook = async ({
  doc, // the document that was just changed
  req, // the original request
  operation, // 'create'
}) => {
  // Use the centralized email helper
  await sendNotificationEmails(
    req.payload,
    'contact',
    {
      firstName: doc.firstName,
      lastName: doc.lastName,
      email: doc.email,
      phone: doc.phone,
      subject: doc.subject,
      message: doc.message,
      id: doc.id,
    },
    operation
  )

  return doc
}