import type { CollectionAfterChangeHook } from 'payload'
import { sendNotificationEmails } from '@/lib/emailHelpers'

/**
 * Hook to send email notifications after a CSR inquiry is created
 * Sends admin notification to CSR team and auto-reply to company contact
 */
export const emailCSRAfterChange: CollectionAfterChangeHook = async ({ doc, req, operation }) => {
  // Only send emails for newly created CSR inquiries
  if (operation !== 'create') {
    return doc
  }

  try {
    await sendNotificationEmails(req.payload, 'csr', {
      companyName: doc.companyName,
      contactFirstName: doc.contactFirstName,
      contactLastName: doc.contactLastName,
      email: doc.email,
      phone: doc.phone,
      location: doc.location,
      interests: doc.interests,
      budgetBand: doc.budgetBand,
      message: doc.message,
      id: doc.id,
    })

    req.payload.logger.info({
      msg: `CSR inquiry notification emails sent for ${doc.companyName}`,
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    req.payload.logger.error({
      msg: `Error sending CSR inquiry emails: ${errorMessage}`,
      error,
    })
    // Don't throw error to prevent blocking the document creation
  }

  return doc
}
