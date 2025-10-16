import type { CollectionAfterDeleteHook } from 'payload'

export const deleteResumeAfterDelete: CollectionAfterDeleteHook = async ({
  req, // the full request object
  id, // the id of the document that was deleted
  doc, // the document that was deleted (includes the resume reference)
}) => {
  try {
    // Get the resume ID from the deleted document
    const resumeId = typeof doc.resume === 'object' 
      ? doc.resume?.id 
      : doc.resume

    // If there's a resume attached, delete it from the media collection
    if (resumeId) {
      try {
        await req.payload.delete({
          collection: 'media',
          id: resumeId,
          depth: 0,
        })
        
        req.payload.logger.info(`Deleted resume (media ID: ${resumeId}) for career application ${id}`)
      } catch (mediaError) {
        // Log specific error for media deletion
        req.payload.logger.error(`Failed to delete media ${resumeId}: ${mediaError instanceof Error ? mediaError.message : String(mediaError)}`)
      }
    } else {
      req.payload.logger.warn(`Career application ${id} was deleted but had no valid resume ID to clean up`)
    }
  } catch (error) {
    // Log detailed error information
    const errorMessage = error instanceof Error ? error.message : String(error)
    const errorStack = error instanceof Error ? error.stack : undefined
    
    req.payload.logger.error(`Error deleting resume for career application ${id}: ${errorMessage}`, {
      stack: errorStack,
      careerApplicationId: id,
    })
    // Don't throw the error - we still want the career application to be deleted
    // even if the resume deletion fails
  }
}
