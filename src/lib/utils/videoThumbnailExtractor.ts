/**
 * Video Thumbnail Extraction Utilities
 * Shared utilities for extracting video IDs and thumbnail URLs from YouTube/Vimeo
 */

/**
 * Extract video ID from YouTube URL
 * Supports formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export const extractYoutubeId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Extract video ID from Vimeo URL
 * Supports formats:
 * - https://vimeo.com/VIDEO_ID
 * - https://player.vimeo.com/video/VIDEO_ID
 */
export const extractVimeoId = (url: string): string | null => {
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

/**
 * Get YouTube thumbnail URL from video ID
 * Uses maxresdefault for highest quality, falls back to hqdefault if not available
 */
export const getYoutubeThumbnail = (videoId: string): string => {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
}

/**
 * Get Vimeo thumbnail URL from video ID
 * Note: This returns a placeholder. For actual Vimeo thumbnails, you'd need to call their API
 * But we can construct a reliable pattern that works for most videos
 */
export const getVimeoThumbnail = (videoId: string): string => {
  // Vimeo thumbnail pattern (this works for many videos)
  return `https://vumbnail.com/${videoId}.jpg`
}

/**
 * Extract thumbnail URL from a video URL (YouTube or Vimeo)
 * Returns null if URL is not recognized
 */
export const extractThumbnailFromVideoUrl = (videoUrl: string): string | null => {
  // Try YouTube first
  const youtubeId = extractYoutubeId(videoUrl)
  if (youtubeId) {
    return getYoutubeThumbnail(youtubeId)
  }

  // Try Vimeo
  const vimeoId = extractVimeoId(videoUrl)
  if (vimeoId) {
    return getVimeoThumbnail(vimeoId)
  }

  return null
}

/**
 * Check if a URL is a YouTube video
 */
export const isYoutubeUrl = (url: string): boolean => {
  return extractYoutubeId(url) !== null
}

/**
 * Check if a URL is a Vimeo video
 */
export const isVimeoUrl = (url: string): boolean => {
  return extractVimeoId(url) !== null
}
