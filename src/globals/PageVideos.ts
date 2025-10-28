import type { GlobalConfig } from 'payload'
import { revalidatePageVideos } from './hooks/revalidatePageVideos'

export const PageVideos: GlobalConfig = {
  slug: 'page-videos',
  label: 'Page Videos',
  access: {
    read: () => true,
  },
  fields: [
    // Landing Video
    {
      type: 'collapsible',
      label: 'Landing Video',
      fields: [
        {
          name: 'landingVideoFile',
          type: 'upload',
          relationTo: 'media',
          label: 'Landing Video File',
          admin: {
            description: 'Self-hosted video file (MP4 format recommended). Leave empty if using URL.',
          },
        },
        {
          name: 'landingVideoUrl',
          type: 'text',
          label: 'Landing Video URL',
          admin: {
            description: 'YouTube or Vimeo URL. Leave empty if using video file.',
          },
        },
        {
          name: 'landingVideoTitle',
          type: 'text',
          label: 'Title',
          defaultValue: 'Welcome to Light Lives',
          admin: {
            description: 'Title displayed in the video lightbox',
          },
        },
        {
          name: 'landingVideoDescription',
          type: 'textarea',
          label: 'Description',
          admin: {
            description: 'Optional description displayed in the video lightbox',
          },
        },
        {
          name: 'landingVideoThumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail',
          admin: {
            description: 'Thumbnail image (16:9 aspect ratio recommended)',
          },
        },
      ],
    },

    // Impact Video
    {
      type: 'collapsible',
      label: 'Impact Video',
      fields: [
        {
          name: 'impactVideoFile',
          type: 'upload',
          relationTo: 'media',
          label: 'Impact Video File',
          admin: {
            description: 'Self-hosted video file (MP4 format recommended). Leave empty if using URL.',
          },
        },
        {
          name: 'impactVideoUrl',
          type: 'text',
          label: 'Impact Video URL',
          admin: {
            description: 'YouTube or Vimeo URL. Leave empty if using video file.',
          },
        },
        {
          name: 'impactVideoTitle',
          type: 'text',
          label: 'Title',
          defaultValue: 'Our Impact',
          admin: {
            description: 'Title displayed in the video lightbox',
          },
        },
        {
          name: 'impactVideoDescription',
          type: 'textarea',
          label: 'Description',
          admin: {
            description: 'Optional description displayed in the video lightbox',
          },
        },
        {
          name: 'impactVideoThumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail',
          admin: {
            description: 'Thumbnail image (16:9 aspect ratio recommended)',
          },
        },
      ],
    },

    // Sponsor Video
    {
      type: 'collapsible',
      label: 'Sponsor Video',
      fields: [
        {
          name: 'sponsorVideoFile',
          type: 'upload',
          relationTo: 'media',
          label: 'Sponsor Video File',
          admin: {
            description: 'Self-hosted video file (MP4 format recommended). Leave empty if using URL.',
          },
        },
        {
          name: 'sponsorVideoUrl',
          type: 'text',
          label: 'Sponsor Video URL',
          admin: {
            description: 'YouTube or Vimeo URL. Leave empty if using video file.',
          },
        },
        {
          name: 'sponsorVideoTitle',
          type: 'text',
          label: 'Title',
          defaultValue: 'Support Our Cause',
          admin: {
            description: 'Title displayed in the video lightbox',
          },
        },
        {
          name: 'sponsorVideoDescription',
          type: 'textarea',
          label: 'Description',
          admin: {
            description: 'Optional description displayed in the video lightbox',
          },
        },
        {
          name: 'sponsorVideoThumbnail',
          type: 'upload',
          relationTo: 'media',
          label: 'Thumbnail',
          admin: {
            description: 'Thumbnail image (16:9 aspect ratio recommended)',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePageVideos],
  },
}
