import type { CollectionBeforeChangeHook } from 'payload'
import {
  extractYoutubeId,
  extractVimeoId,
  getYoutubeThumbnail,
  getVimeoThumbnail,
} from '@/lib/utils/videoThumbnailExtractor'

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
