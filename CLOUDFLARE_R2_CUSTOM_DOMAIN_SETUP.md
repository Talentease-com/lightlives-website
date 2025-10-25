# Cloudflare R2 Custom Domain Setup Guide

This guide explains how to configure a custom domain (`cdn.lightlives.org`) for your Cloudflare R2 bucket to serve media files directly without triggering serverless functions.

## Why Use a Custom Domain?

✅ **Avoid serverless limits** - Media files served directly from R2, not through Vercel Edge Functions
✅ **Better performance** - CDN-optimized delivery with Cloudflare's global network
✅ **Professional branding** - Custom domain instead of R2's default `.r2.cloudflarestorage.com`
✅ **Cost efficiency** - No Vercel serverless invocations for image requests

## Prerequisites

- ✅ Cloudflare account with your domain (`lightlives.org`) managed on Cloudflare DNS
- ✅ R2 bucket created (`lightlivespayload`)
- ✅ Domain nameservers pointing to Cloudflare

## Step-by-Step Setup

### 1. Access R2 Bucket Settings

1. Log into [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **R2 Object Storage** (left sidebar)
3. Click on your bucket: `lightlivespayload`
4. Go to **Settings** tab

### 2. Configure Custom Domain

1. Scroll to **Public Access** section
2. Click **Connect Domain**
3. Enter your subdomain: `cdn.lightlives.org`
4. Click **Continue**

Cloudflare will automatically:

- Create a DNS CNAME record pointing to your R2 bucket
- Configure SSL/TLS certificate
- Enable public access for the bucket

### 3. Configure Public Access (Important!)

After connecting the domain, you need to allow public reads:

1. In **Public Access** section, click **Allow Access**
2. Select **Custom domains** (recommended) or **R2.dev subdomain**
3. Confirm the action

⚠️ **Security Note**: This makes your bucket publicly readable. Ensure you're only uploading media files meant for public access.

### 4. Verify DNS Propagation

Check that DNS is configured correctly:

```bash
# Check CNAME record
dig cdn.lightlives.org CNAME

# Expected output:
# cdn.lightlives.org. 300 IN CNAME lightlivespayload.r2.cloudflarestorage.com.
```

Or use online tools:

- [DNS Checker](https://dnschecker.org/)
- [What&#39;s My DNS](https://www.whatsmydns.net/)

### 5. Test Public Access

Upload a test file and verify access:

```bash
# Test URL format (replace with actual filename)
curl -I https://cdn.lightlives.org/media/test-image.jpg

# Expected response:
# HTTP/2 200
# content-type: image/jpeg
# cache-control: public, max-age=14400
```

### 6. Update Environment Variables

Ensure `.env.local` has the correct configuration:

```bash
# Cloudflare R2 Configuration
S3_ENDPOINT=https://0d5449cd7ce28d6cc9ad90f75af0c77c.r2.cloudflarestorage.com
S3_BUCKET=lightlivespayload
S3_ACCESS_KEY_ID=your-access-key-id
S3_SECRET=your-secret-access-key

# Custom Domain for Public Access
R2_PUBLIC_URL=https://cdn.lightlives.org
```

### 7. Verify Payload CMS Configuration

Confirm `src/payload.config.ts` has custom domain integration:

```typescript
s3Storage({
  collections: {
    media: {
      prefix: 'media',
      generateFileURL: ({ filename, prefix }) => {
        const baseUrl = process.env.R2_PUBLIC_URL || 'https://cdn.lightlives.org'
        const path = prefix ? `${prefix}/${filename}` : filename
        return `${baseUrl}/${path}`
      },
    },
  },
  // ...rest of config
})
```

## Production Deployment

### Vercel Environment Variables

Add to Vercel project settings:

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project → **Settings** → **Environment Variables**
3. Add all R2 variables:

```
S3_ENDPOINT=https://0d5449cd7ce28d6cc9ad90f75af0c77c.r2.cloudflarestorage.com
S3_BUCKET=lightlivespayload
S3_ACCESS_KEY_ID=<your-key>
S3_SECRET=<your-secret>
R2_PUBLIC_URL=https://cdn.lightlives.org
```

4. Select environments: **Production**, **Preview**, **Development**
5. Click **Save**
6. Redeploy your application

## Troubleshooting

### Issue: 403 Forbidden on Media Access

**Cause**: Public access not enabled on bucket**Solution**:

1. R2 Dashboard → Your Bucket → Settings
2. Enable **Allow Access** under Public Access
3. Wait 1-2 minutes for propagation

### Issue: DNS Not Resolving

**Cause**: DNS propagation delay or incorrect configuration**Solution**:

1. Verify CNAME in Cloudflare DNS dashboard
2. Wait up to 48 hours for global propagation (usually < 5 minutes)
3. Clear local DNS cache: `sudo dscacheutil -flushcache` (macOS)

### Issue: Still Seeing `/api/media/file/` Requests

**Cause**: Existing media records have old URLs stored
**Solution**: Two options:

**Option 1**: Re-upload media files through Payload CMS admin

**Option 2**: Run migration script (see next section)

### Issue: Mixed Content Warnings (HTTP vs HTTPS)

**Cause**: R2 custom domain not using HTTPS
**Solution**: Cloudflare automatically provides SSL - ensure you're using `https://` in `R2_PUBLIC_URL`

## Migrating Existing Media

If you have existing media with old URLs, run this migration:

```typescript
// scripts/migrate-media-urls.ts
import { getPayload } from 'payload'
import config from '@payload-config'

async function migrateMediaUrls() {
  const payload = await getPayload({ config })
  
  const media = await payload.find({
    collection: 'media',
    limit: 1000,
  })

  const baseUrl = process.env.R2_PUBLIC_URL || 'https://cdn.lightlives.org'
  let updated = 0

  for (const doc of media.docs) {
    // Skip if URL already uses custom domain
    if (doc.url?.startsWith(baseUrl)) {
      console.log(`⏭️  Skipping media ID ${doc.id} - already using custom domain`)
      continue
    }

    // Update URL to use custom domain
    if (doc.filename) {
      const newUrl = `${baseUrl}/media/${doc.filename}`
    
      await payload.update({
        collection: 'media',
        id: doc.id,
        data: {
          url: newUrl,
        },
      })
    
      console.log(`✅ Updated media ID ${doc.id}: ${newUrl}`)
      updated++
    }
  }
  
  console.log(`\n🎉 Migration complete! Updated ${updated}/${media.docs.length} records.`)
  process.exit(0)
}

migrateMediaUrls().catch((error) => {
  console.error('❌ Migration failed:', error)
  process.exit(1)
})
```

Run with:

```bash
npx tsx scripts/migrate-media-urls.ts
```

## Verification Checklist

After setup, verify:

- [ ] Custom domain resolves: `dig cdn.lightlives.org`
- [ ] Public access works: `curl -I https://cdn.lightlives.org/media/test.jpg`
- [ ] Payload CMS uploads generate CDN URLs (not `/api/media/file/`)
- [ ] Network tab shows direct R2 URLs (not Next.js image optimizer with API route)
- [ ] No serverless function invocations for media files
- [ ] SSL certificate valid (HTTPS works)

## Performance Optimization

### Enable Cloudflare Cache Rules (Optional)

For even better performance:

1. Cloudflare Dashboard → **Caching** → **Cache Rules**
2. Create rule for `cdn.lightlives.org/media/*`
3. Set:
   - **Edge Cache TTL**: 1 year
   - **Browser Cache TTL**: 1 month
   - **Cache Level**: Standard

### CORS Configuration (If Needed)

If accessing from different domains:

1. R2 Bucket → **Settings** → **CORS Policy**
2. Add configuration:

```json
[
  {
    "AllowedOrigins": ["https://lightlives.org", "https://www.lightlives.org"],
    "AllowedMethods": ["GET", "HEAD"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3600
  }
]
```

## Monitoring

### Check Bandwidth Usage

Monitor R2 usage:

1. R2 Dashboard → **Usage**
2. View bandwidth, storage, and request metrics

### Monitor Serverless Invocations

Verify reduced serverless usage:

1. Vercel Dashboard → **Usage** → **Edge Functions**
2. Should see dramatic decrease in `/api/media/file/*` invocations

## Security Considerations

### Private Files

If you need to store private files alongside public media:

**Option 1**: Use separate buckets

- Public bucket: `lightlivespayload` (with custom domain)
- Private bucket: `lightlivespayload-private` (no public access)

**Option 2**: Use folder-based access

- Public: `/media/*` (exposed via custom domain)
- Private: `/private/*` (accessed via signed URLs)

### Access Control

Current setup allows public read access. For sensitive files, consider:

- Signed URLs with expiration
- Token-based authentication
- Cloudflare Access policies

## Additional Resources

- [Cloudflare R2 Documentation](https://developers.cloudflare.com/r2/)
- [Custom Domains for R2](https://developers.cloudflare.com/r2/buckets/public-buckets/#custom-domains)
- [Payload CMS Storage Adapter](https://payloadcms.com/docs/upload/overview)
- [S3 Storage Plugin Docs](https://payloadcms.com/docs/upload/storage-adapters)

## Support

For issues specific to:

- **Cloudflare R2**: [Community Forums](https://community.cloudflare.com/)
- **Payload CMS**: [Discord Community](https://discord.com/invite/payload)
- **This Project**: Check `PAYMENT_INTEGRATION.md`, `FOOTER_REVALIDATION.md`

---

**Last Updated**: October 25, 2025
**Configuration Status**: ✅ Implemented and Active
