import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidatePageVideos: GlobalAfterChangeHook = async ({ doc, req }) => {
  try {
    // Revalidate pages that use page videos
    revalidatePath('/', 'page') // Landing page
    revalidatePath('/sponsor', 'page') // Sponsor page
    
    req.payload.logger.info({ msg: 'Page videos updated - cache revalidated' })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    req.payload.logger.error({ msg: `Error revalidating page videos: ${errorMessage}` })
  }
  return doc
}
