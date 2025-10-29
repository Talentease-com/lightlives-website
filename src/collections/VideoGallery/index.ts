import type { CollectionConfig } from 'payload'
import { extractVideoThumbnail } from './hooks/extractYoutubeThumbnail'

export const VideoGallery: CollectionConfig = {
  slug: 'video-gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'displayOrder', 'isActive'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Video Title',
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      label: 'Description',
      admin: {
        description: 'Brief description of the video content',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Category',
      options: [
        { label: 'Education', value: 'education' },
        { label: 'Impact', value: 'impact' },
        { label: 'Community', value: 'community' },
        { label: 'Events', value: 'events' },
      ],
      defaultValue: 'education',
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: false,
      label: 'Video Thumbnail',
      admin: {
        description: 'Thumbnail image for the video (16:9 aspect ratio recommended). Optional if using thumbnailUrl or auto-extracted from video URL.',
      },
    },
    {
      name: 'thumbnailUrl',
      type: 'text',
      label: 'Thumbnail URL',
      admin: {
        description: 'Direct URL to thumbnail image. Auto-populated from YouTube/Vimeo URLs. You can also manually set a custom URL.',
      },
    },
    {
      name: 'videoFile',
      type: 'upload',
      relationTo: 'media',
      label: 'Video File',
      admin: {
        description: 'Self-hosted video file (MP4 format recommended). Leave empty if using videoUrl.',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      label: 'Video URL',
      admin: {
        description: 'YouTube or Vimeo URL. Leave empty if using videoFile.',
      },
    },
    {
      name: 'duration',
      type: 'text',
      label: 'Duration',
      admin: {
        description: 'Video duration (e.g., "3:45")',
      },
    },
    {
      name: 'publishedDate',
      type: 'date',
      label: 'Published Date',
      admin: {
        description: 'When the video was published',
      },
    },
    {
      name: 'displayOrder',
      type: 'number',
      required: true,
      defaultValue: 0,
      label: 'Display Order',
      admin: {
        description: 'Lower numbers appear first in the gallery',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      label: 'Active',
      admin: {
        description: 'Uncheck to hide this video from the gallery',
      },
    },
  ],
  hooks: {
    beforeChange: [extractVideoThumbnail],
    beforeValidate: [
      ({ data }) => {
        // Ensure at least one video source is provided
        if (data && !data.videoFile && !data.videoUrl) {
          throw new Error('Either Video File or Video URL must be provided')
        }
        return data
      },
    ],
  },
}
