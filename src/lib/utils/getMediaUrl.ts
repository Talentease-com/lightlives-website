import type { Media } from '@/payload-types'

/**
 * Extracts media URL from Payload CMS Media field.
 * Handles string URLs, Media IDs, and Media objects.
 * 
 * **Performance**: Returns R2 direct URLs when available to avoid serverless invocations.
 * Falls back to `/api/media/file/[filename]` for legacy uploads.
 * 
 * @param media - Media field value (string | number | Media | null/undefined)
 * @param fallback - Fallback URL if media is invalid (default: '')
 * @returns Resolved media URL
 */
export function getMediaUrl(
  media: string | number | Media | null | undefined,
  fallback: string = ''
): string {
  if (!media) return fallback

  // Case 1: Direct URL string
  if (typeof media === 'string') {
    return media
  }

  // Case 2: Media ID (legacy - avoid if possible, triggers serverless)
  if (typeof media === 'number') {
    console.warn(`⚠️ Media ID ${media} will trigger serverless function. Consider using R2 direct URLs.`)
    return `/api/media/file/${media}`
  }

  // Case 3: Media object with R2 URL (preferred - no serverless invocation)
  if (typeof media === 'object' && media !== null) {
    // Prefer R2 direct URL if available (bypasses serverless)
    if ('url' in media && media.url) {
      return media.url
    }
    
    // Fallback to filename (triggers serverless - not ideal for production)
    if ('filename' in media && media.filename) {
      console.warn(`⚠️ Using filename ${media.filename} will trigger serverless. Configure R2 public URLs.`)
      return `/api/media/file/${encodeURIComponent(media.filename)}`
    }
  }

  return fallback
}