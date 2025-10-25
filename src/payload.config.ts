// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Impacts } from './collections/Impacts'
import { Payments } from './collections/Payments'
import { CareerApplications } from './collections/CareerApplications'
import { ContactSubmissions } from './collections/ContactSubmissions'
import { NewsletterSubscribers } from './collections/NewsletterSubscribers'
import { TeamCarouselImages } from './collections/TeamCarouselImages'
import { LeadershipTeam } from './collections/LeadershipTeam'
import { AdvisoryBoard } from './collections/AdvisoryBoard'
import { EmailSettings } from './globals/EmailSettings'
import { SocialSettings } from './globals/SocialSettings'
import { FooterLinks } from './globals/FooterLinks'
import { s3Storage } from '@payloadcms/storage-s3'
import {
  withCollectionLogging,
  withGlobalLogging,
} from './lib/payload/hooks/logging'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      actions: ['/components/Admin/GoToWebsiteButton.tsx'],
    },
  },
  collections: [
    withCollectionLogging(Users),
    withCollectionLogging(Media),
    withCollectionLogging(Impacts),
    withCollectionLogging(Payments),
    withCollectionLogging(CareerApplications),
    withCollectionLogging(ContactSubmissions),
    withCollectionLogging(NewsletterSubscribers),
    withCollectionLogging(TeamCarouselImages),
    withCollectionLogging(LeadershipTeam),
    withCollectionLogging(AdvisoryBoard),
  ],
  globals: [
    withGlobalLogging(EmailSettings),
    withGlobalLogging(SocialSettings),
    withGlobalLogging(FooterLinks),
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
  }),
  email: resendAdapter({
    defaultFromAddress: process.env.RESEND_FROM_EMAIL || 'noreply@lightlives.org',
    defaultFromName: 'Light Lives',
    apiKey: process.env.RESEND_API_KEY || '',
  }),
  sharp,
  plugins: [
     s3Storage({
      collections: {
        media: true, // Apply storage to 'media' collection
      },
      bucket: process.env.S3_BUCKET || '',
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET || '',
        },
        region: 'auto', // Cloudflare R2 uses 'auto' as the region
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
})
