import type { Media } from '@/payload-types'

/**
 * Extracts alt text from Payload CMS Media field.
 * Handles Media IDs, Media objects, and provides fallback text.
 * 
 * @param media - Media field value (string | number | Media | null/undefined)
 * @param fallback - Fallback alt text if media has no alt (default: '')
 * @returns Resolved alt text
 */
export function getMediaAlt(
  media: string | number | Media | null | undefined,
  fallback: string = ''
): string {
  if (!media) return fallback

  // Case 1: String or number - cannot extract alt text
  if (typeof media === 'string' || typeof media === 'number') {
    return fallback
  }

  // Case 2: Media object with alt text
  if (typeof media === 'object' && media !== null && 'alt' in media && media.alt) {
    return media.alt
  }

  return fallback
}
