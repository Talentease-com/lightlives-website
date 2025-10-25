import type { Media } from '@/payload-types';

/**
 * Extracts the URL from a Payload CMS Media field which can be:
 * - A direct URL string
 * - A numeric ID reference
 * - A populated Media object
 * 
 * @param media - The media field value (string | number | Media)
 * @param fallback - Optional fallback URL if media is invalid (default: '')
 * @returns The media URL or fallback
 */
export function getMediaUrl(
  media: string | number | Media | null | undefined,
  fallback: string = ''
): string {
  // Handle null/undefined
  if (!media) {
    return fallback;
  }

  // Handle direct URL string
  if (typeof media === 'string') {
    return media;
  }

  // Handle numeric ID - construct API URL
  if (typeof media === 'number') {
    return `/api/media/${media}`;
  }

  // Handle Media object
  if (typeof media === 'object' && media !== null) {
    return media.url || fallback;
  }

  return fallback;
}
