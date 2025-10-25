# Footer Cache Revalidation

## Overview
This document explains how footer content is automatically revalidated when updated through the Payload CMS admin interface.

## Implementation

### Hook System
When footer-related content is updated in Payload CMS, an `afterChange` hook automatically triggers cache revalidation for all pages that use the footer.

### Files Modified

#### 1. **Revalidation Hook** (`src/globals/hooks/revalidateFooter.ts`)
A shared hook that revalidates the footer cache:

```typescript
import { revalidatePath } from 'next/cache'
import type { GlobalAfterChangeHook } from 'payload'

export const revalidateFooter: GlobalAfterChangeHook = async ({ doc, req }) => {
  try {
    // Revalidate the layout which includes the footer
    // This will affect all pages since the footer is in the root layout
    revalidatePath('/', 'layout')
    
    req.payload.logger.info({
      msg: 'Footer content updated - cache revalidated',
    })
  } catch (error) {
    req.payload.logger.error({
      msg: `Error revalidating footer cache: ${error instanceof Error ? error.message : 'Unknown error'}`,
      error,
    })
  }

  return doc
}
```

#### 2. **Social Settings Global** (`src/globals/SocialSettings.ts`)
Added `afterChange` hook to revalidate when social settings are updated:

```typescript
import { revalidateFooter } from './hooks/revalidateFooter'

export const SocialSettings: GlobalConfig = {
  slug: 'social-settings',
  hooks: {
    afterChange: [revalidateFooter],
  },
  // ... rest of config
}
```

#### 3. **Footer Links Global** (`src/globals/FooterLinks.ts`)
Added `afterChange` hook to revalidate when footer links are updated:

```typescript
import { revalidateFooter } from './hooks/revalidateFooter'

export const FooterLinks: GlobalConfig = {
  slug: 'footer-links',
  hooks: {
    afterChange: [revalidateFooter],
  },
  // ... rest of config
}
```

## How It Works

### Data Flow
1. Admin updates footer content in Payload CMS (`/admin`)
2. Payload CMS saves the changes to the database
3. `afterChange` hook is triggered automatically
4. Hook calls `revalidatePath('/', 'layout')` to clear the cache
5. Next.js regenerates the footer on the next page request
6. All pages now show the updated footer content

### Revalidation Strategy
- **Scope**: Uses `revalidatePath('/', 'layout')` to revalidate the root layout
- **Impact**: Since the footer is part of the root layout, all pages are affected
- **Type**: On-demand revalidation (only when content changes)
- **Performance**: Minimal impact as revalidation happens asynchronously after save

## Global Collections Affected

### Social Settings (`social-settings`)
Contains:
- Contact information (phone, email, address)
- Social media URLs (Facebook, Twitter, Instagram, LinkedIn, YouTube)
- Footer description
- Registration number
- Copyright year

### Footer Links (`footer-links`)
Contains:
- Quick Links
- Legal Links
- Get Involved Links
- Stay Connected Links
- Policy Links (bottom bar)

## Testing

### Manual Testing
1. Navigate to `/admin` and log in
2. Go to **Settings** → **Social Settings** or **Footer Links**
3. Make a change (e.g., update phone number or add a link)
4. Save the changes
5. Visit any page on the frontend
6. Verify the footer shows the updated content

### Logging
The hook logs revalidation events:
- **Success**: `Footer content updated - cache revalidated`
- **Error**: `Error revalidating footer cache: [error message]`

Check Payload CMS logs in your deployment platform or local console.

## Best Practices

### For Developers
1. Don't manually call `revalidatePath` for footer updates - the hook handles it
2. If adding new footer-related globals, add the `revalidateFooter` hook
3. Monitor logs for revalidation errors
4. Test footer updates in staging before production

### For Content Editors
1. Changes take effect immediately after saving
2. May need to hard refresh (Cmd/Ctrl + Shift + R) to see changes in browser
3. All pages will automatically show updated footer content
4. No need to manually rebuild or redeploy the site

## Troubleshooting

### Footer Not Updating
1. **Check browser cache**: Hard refresh the page (Cmd/Ctrl + Shift + R)
2. **Check logs**: Look for revalidation errors in Payload logs
3. **Verify hook**: Ensure the global config has the `afterChange` hook
4. **Check deployment**: On-demand revalidation requires a live deployment with ISR enabled

### Performance Concerns
- Revalidation happens **after** the save completes (non-blocking)
- Only affects pages using the footer (typically all pages)
- Next.js handles revalidation efficiently with background regeneration

## Related Files
- `src/components/Layout/Footer.tsx` - Footer component that fetches data
- `src/globals/SocialSettings.ts` - Social settings global config
- `src/globals/FooterLinks.ts` - Footer links global config
- `src/globals/hooks/revalidateFooter.ts` - Revalidation hook implementation

## Further Reading
- [Next.js Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)
- [Payload CMS Hooks](https://payloadcms.com/docs/hooks/overview)
- [On-Demand Revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/revalidating#on-demand-revalidation)
