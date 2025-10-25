import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

/**
 * Hook to revalidate all pages when footer content is updated
 * This ensures the footer changes are reflected immediately across the site
 */
export const revalidateFooter: GlobalAfterChangeHook = async ({ doc, req }) => {
  try {
    // Revalidate the layout which includes the footer
    // This will affect all pages since the footer is in the root layout
    revalidatePath('/', 'layout')
    
    req.payload.logger.info({
      msg: 'Footer content updated - cache revalidated',
    })
  } catch (error) {
    req.payload.logger.error({
      msg: `Error revalidating footer cache: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error,
    })
  }

  return doc
}
