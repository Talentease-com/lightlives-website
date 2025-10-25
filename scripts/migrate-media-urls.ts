import 'dotenv/config'
/**
 * Migration Script: Update Media URLs to use Custom Domain
 * 
 * This script updates existing media records to use the Cloudflare R2 custom domain
 * (cdn.lightlives.org) instead of the legacy /api/media/file/ pattern.
 * 
 * Usage:
 *   # Dry-run (no DB writes)
 *   npx tsx scripts/migrate-media-urls.ts --dry-run
 *
 *   # Apply changes
 *   npx tsx scripts/migrate-media-urls.ts
 * 
 * Environment Variables Required:
 *   - POSTGRES_URL
 *   - PAYLOAD_SECRET
 *   - R2_PUBLIC_URL (default: https://cdn.lightlives.org)
 */

import { getPayload } from 'payload'
import config from '@payload-config'

async function migrateMediaUrls() {
  console.log('🚀 Starting media URL migration...\n')

  try {
    const payload = await getPayload({ config })
    const DRY_RUN = process.argv.includes('--dry-run')
    
    // Fetch all media records
    const media = await payload.find({
      collection: 'media',
      limit: 1000,
    })

    console.log(`📊 Found ${media.docs.length} media records\n`)

  const baseUrl = (process.env.R2_PUBLIC_URL || 'https://cdn.lightlives.org').replace(/\/$/, '')
    let updated = 0
    let skipped = 0
    let errors = 0

    for (const doc of media.docs) {
      try {
        const currentUrl = doc.url || ''
        const mediaPrefix = `${baseUrl}/media/`
        let newUrl: string | null = null

        // Case A: URL already on CDN but with /media prefix -> strip it
        if (currentUrl.startsWith(mediaPrefix)) {
          newUrl = currentUrl.replace(mediaPrefix, `${baseUrl}/`)
        }
        // Case B: URL already on CDN root (no /media) -> skip
        else if (currentUrl.startsWith(`${baseUrl}/`)) {
          console.log(`⏭️  Skipping ID ${doc.id} (${doc.filename}) - already using CDN root`)
          skipped++
          continue
        }
        // Case C: Legacy API URL -> build new URL from filename
        else if (currentUrl.includes('/api/media/file')) {
          newUrl = `${baseUrl}/${doc.filename}`
        }

        // Skip if no filename
        if (!doc.filename) {
          console.log(`⚠️  Skipping ID ${doc.id} - no filename found`)
          skipped++
          continue
        }

        // Case D: No URL but has filename -> build new URL from filename
        if (!newUrl) {
          if (!doc.filename) {
            console.log(`⚠️  Skipping ID ${doc.id} - no filename found`)
            skipped++
            continue
          }
          // Generate new URL with custom domain from filename
          newUrl = `${baseUrl}/${doc.filename}`
        }
        
        if (DRY_RUN) {
          console.log(`📝 DRY RUN - Would update ID ${doc.id}: ${doc.filename}`)
          console.log(`   Old: ${currentUrl || 'N/A'}`)
          console.log(`   New: ${newUrl}\n`)
        } else {
          // Update the record
          await payload.update({
            collection: 'media',
            id: doc.id,
            data: { url: newUrl },
          })
        }
        
        console.log(`✅ ${DRY_RUN ? 'Planned' : 'Updated'} ID ${doc.id}: ${doc.filename}`)
        console.log(`   Old: ${currentUrl || 'N/A'}`)
        console.log(`   New: ${newUrl}\n`)
        updated++
      } catch (error) {
        console.error(`❌ Error updating ID ${doc.id}:`, error)
        errors++
      }
    }
    
    console.log('\n' + '='.repeat(60))
    console.log('🎉 Migration Summary')
    console.log('='.repeat(60))
    console.log(`Total records: ${media.docs.length}`)
    console.log(`✅ Updated: ${updated}`)
    console.log(`⏭️  Skipped: ${skipped}`)
    console.log(`❌ Errors: ${errors}`)
    console.log('='.repeat(60) + '\n')

    if (updated > 0 && !DRY_RUN) {
      console.log('💡 Next Steps:')
      console.log('1. Verify custom domain is working: https://cdn.lightlives.org/test.jpg')
      console.log('2. Check your website - images should load from CDN root (no /media)')
      console.log('3. Monitor serverless usage - should decrease significantly')
      console.log('4. Clear browser cache if images don\'t load immediately\n')
    }

    process.exit(0)
  } catch (error) {
    console.error('\n❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateMediaUrls()
