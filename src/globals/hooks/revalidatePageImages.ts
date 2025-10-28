import type { GlobalAfterChangeHook } from 'payload'
import { revalidatePath } from 'next/cache'

export const revalidatePageImages: GlobalAfterChangeHook = async ({ doc, req }) => {
  try {
    // Revalidate all page routes that use page images
    revalidatePath('/about', 'page') // Mission page
    revalidatePath('/programs', 'page')
    revalidatePath('/csr', 'page')
    revalidatePath('/support/volunteer', 'page')
    revalidatePath('/about/join-us', 'page') // Join Us page
    
    req.payload.logger.info({ msg: 'Page images updated - cache revalidated' })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    req.payload.logger.error({ msg: `Error revalidating page images: ${errorMessage}` })
  }
  return doc
}
