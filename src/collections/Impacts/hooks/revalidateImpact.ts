import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidateAfterChange: CollectionAfterChangeHook = async ({
  doc, // the document that was just changed
  previousDoc, // the document before the change
  operation, // 'create' | 'update'
  req, // the full request object
}) => {
  try {
    // Only revalidate if this is a published/active impact
    // or if the isActive status changed
    const shouldRevalidate = 
      doc.isActive || 
      (previousDoc && previousDoc.isActive !== doc.isActive) ||
      operation === 'create'

    if (shouldRevalidate) {
      // Revalidate the home page where impacts are displayed
      revalidatePath('/')
      
      // Revalidate the sponsor page where impacts might be shown
      revalidatePath('/sponsor')
      
      req.payload.logger.info({
        msg: `Revalidated paths after ${operation} operation on impact: ${doc.title}`,
        paths: ['/', '/sponsor'],
        operation,
      })
    } else {
      req.payload.logger.info({
        msg: `Skipped revalidation for ${operation} operation on inactive impact: ${doc.title}`,
        operation,
      })
    }
  } catch (error) {
    req.payload.logger.error({
      msg: `Error revalidating paths after impact ${operation}`,
      error: error instanceof Error ? error.message : String(error),
      operation,
    })
  }
  return doc
}

export const revalidateAfterDelete: CollectionAfterDeleteHook = async ({
  doc, // the document that was just deleted
  id, // the id of the document that was deleted
  req, // the full request object
}) => {
  try {
    // Always revalidate on delete since removing an impact affects the display
    revalidatePath('/')
    revalidatePath('/sponsor')
    
    req.payload.logger.info({
      msg: `Revalidated paths after deleting impact: ${doc.title || id}`,
      paths: ['/', '/sponsor'],
      deletedId: id,
    })
  } catch (error) {
    req.payload.logger.error({
      msg: 'Error revalidating paths after impact deletion',
      error: error instanceof Error ? error.message : String(error),
      deletedId: id,
    })
  }

  return doc
}