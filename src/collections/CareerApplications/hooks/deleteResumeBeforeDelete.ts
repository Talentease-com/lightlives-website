import type { CollectionBeforeDeleteHook } from 'payload'

export const deleteResumeBeforeDelete: CollectionBeforeDeleteHook = async ({
  req, // the full request object
  id, // the id of the document being deleted
}) => {
  try {
    // Fetch the career application to get the resume ID
    const careerApplication = await req.payload.findByID({
      collection: 'career-applications',
      id,
    })

    // If there's a resume attached, delete it from the media collection
    if (careerApplication?.resume) {
      const resumeId = typeof careerApplication.resume === 'object' 
        ? careerApplication.resume.id 
        : careerApplication.resume

      if (resumeId) {
        await req.payload.delete({
          collection: 'media',
          id: resumeId,
        })
        
        req.payload.logger.info(`Deleted resume (media ID: ${resumeId}) for career application ${id}`)
      }
    }
  } catch (error) {
    req.payload.logger.error(`Error deleting resume for career application ${id}:`, error)
    // Don't throw the error - we still want the career application to be deleted
    // even if the resume deletion fails
  }
}
