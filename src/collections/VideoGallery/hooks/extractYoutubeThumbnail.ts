import type { CollectionBeforeChangeHook } from 'payload'

/**
 * Extract video ID from YouTube URL
 * Supports formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
const extractYoutubeId = (url: string): string | null => {
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
const extractVimeoId = (url: string): string | null => {
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
 * Uses mqdefault (medium quality default) for consistent 16:9 aspect ratio
 */
const getYoutubeThumbnail = (videoId: string): string => {
  return `https://i3.ytimg.com/vi/${videoId}/mqdefault.jpg`
}

/**
 * Get Vimeo thumbnail URL from video ID
 * Note: This returns a placeholder. For actual Vimeo thumbnails, you'd need to call their API
 * But we can construct a reliable pattern that works for most videos
 */
const getVimeoThumbnail = (videoId: string): string => {
  // Vimeo thumbnail pattern (this works for many videos)
  return `https://vumbnail.com/${videoId}.jpg`
}

/**
 * Hook to automatically extract and set thumbnail from YouTube/Vimeo URLs
 * Runs before validation to ensure thumbnail is set before required checks
 */
export const extractVideoThumbnail: CollectionBeforeChangeHook = async ({ data, req }) => {
  // Only process if videoUrl is provided
  if (!data?.videoUrl) {
    return data
  }

  const videoUrl = data.videoUrl as string

  // Skip if thumbnailUrl is already manually set
  if (data.thumbnailUrl) {
    req.payload.logger.info({
      msg: `Video thumbnail URL already set manually: ${data.thumbnailUrl}`,
    })
    return data
  }

  // Try to extract YouTube thumbnail
  const youtubeId = extractYoutubeId(videoUrl)
  if (youtubeId) {
    data.thumbnailUrl = getYoutubeThumbnail(youtubeId)
    req.payload.logger.info({
      msg: `Extracted YouTube thumbnail for video ID: ${youtubeId}`,
    })
    return data
  }

  // Try to extract Vimeo thumbnail
  const vimeoId = extractVimeoId(videoUrl)
  if (vimeoId) {
    data.thumbnailUrl = getVimeoThumbnail(vimeoId)
    req.payload.logger.info({
      msg: `Extracted Vimeo thumbnail for video ID: ${vimeoId}`,
    })
    return data
  }

  // Log if URL doesn't match known patterns
  if (!youtubeId && !vimeoId) {
    req.payload.logger.warn({
      msg: `Could not extract thumbnail from video URL: ${videoUrl}. Please provide a thumbnail manually.`,
    })
  }

  return data
}
