# Payload CMS Logging System

## Overview

A comprehensive logging system has been added to track all Payload CMS operations in real-time. This helps monitor database access patterns, identify caching behavior, and debug data fetching issues.

## What Gets Logged

### Collections (Users, Media, Impacts, Payments, etc.)
- ✅ **READ** - When a collection item is fetched
- ✅ **CREATE** - When a new item is created
- ✅ **UPDATE** - When an existing item is modified
- ✅ **DELETE** - When an item is deleted

### Globals (EmailSettings, SocialSettings, FooterLinks)
- ✅ **READ** - When a global setting is fetched
- ✅ **UPDATE** - When a global setting is modified

## Terminal Output Format

The logging system uses color-coded terminal output for easy identification:

```
[12:34:56] READ Collection: footer-links (ID: 123)
[12:34:57] READ Global: social-settings
[12:34:58] UPDATE Collection: payments (update)
[12:34:59] CREATE Collection: newsletter-subscribers (create)
[12:35:00] DELETE Collection: media (ID: 456)
```

### Color Coding
- 🟢 **GREEN** - READ operations
- 🔵 **BLUE** - CREATE operations
- 🟡 **YELLOW** - UPDATE operations
- 🔴 **RED** - DELETE operations
- 🟣 **MAGENTA** - Global names
- 🔷 **CYAN** - Collection names
- ⚫ **DIM** - Timestamps and metadata

## How It Works

### Implementation Files

**Logging Hooks** (`src/lib/payload/hooks/logging.ts`)
- Contains all logging logic
- Provides `withCollectionLogging()` and `withGlobalLogging()` wrapper functions
- Uses Payload's hook system to intercept operations

**Payload Config** (`src/payload.config.ts`)
- All collections wrapped with `withCollectionLogging()`
- All globals wrapped with `withGlobalLogging()`
- Non-invasive - existing hooks are preserved

### Technical Details

```typescript
// Collections are wrapped with logging
collections: [
  withCollectionLogging(Users),
  withCollectionLogging(Media),
  withCollectionLogging(Impacts),
  // ... etc
]

// Globals are wrapped with logging
globals: [
  withGlobalLogging(EmailSettings),
  withGlobalLogging(SocialSettings),
  withGlobalLogging(FooterLinks),
]
```

The logging hooks are added to the existing hook arrays, so they don't interfere with any custom hooks you've already defined (like email sending, validation, etc.).

## Use Cases

### 1. **Identifying Cache Behavior**

Watch the terminal when loading a page:

```bash
# First page load
[12:00:01] READ Global: footer-links
[12:00:01] READ Global: social-settings

# Refresh page (if cached, you'll see nothing)
# (no logs = data served from cache)

# Force refresh (Cmd+Shift+R)
[12:00:15] READ Global: footer-links
[12:00:15] READ Global: social-settings
```

**No logs on refresh = Data is being cached** ✅

### 2. **Debugging Data Fetching**

See exactly when and what data is being fetched:

```bash
# Homepage loads footer
[12:01:23] READ Global: footer-links
[12:01:23] READ Global: social-settings

# Homepage loads impacts
[12:01:24] READ Collection: impacts (ID: 1)
[12:01:24] READ Collection: impacts (ID: 2)
[12:01:24] READ Collection: impacts (ID: 3)
```

### 3. **Monitoring Admin Panel Activity**

Track changes made in the admin panel:

```bash
# Admin updates social settings
[12:05:00] READ Global: social-settings
[12:05:10] UPDATE Global: social-settings

# Admin creates a payment record
[12:06:00] CREATE Collection: payments (create)
[12:06:01] READ Collection: payments (ID: 789)
```

### 4. **Performance Optimization**

Identify redundant queries:

```bash
# Multiple reads of the same data might indicate optimization opportunity
[12:10:01] READ Global: footer-links
[12:10:01] READ Global: footer-links  # ⚠️ Duplicate read
[12:10:01] READ Global: footer-links  # ⚠️ Duplicate read
```

## Testing the Logging

### 1. Start Development Server
```bash
npm run dev
```

### 2. Visit Homepage
Navigate to `http://localhost:3001` and watch the terminal

Expected output:
```
[12:00:00] READ Global: footer-links
[12:00:00] READ Global: social-settings
[12:00:00] READ Collection: impacts (ID: 1)
```

### 3. Refresh Page (Cmd+R)
- If you see logs: Data is being fetched fresh
- If you see no logs: Data is being served from cache

### 4. Edit in Admin Panel
Navigate to `/admin/globals/footer-links`, make a change, and save

Expected output:
```
[12:05:00] READ Global: footer-links
[12:05:10] UPDATE Global: footer-links
```

### 5. Subscribe to Newsletter
Fill out the newsletter form in the footer

Expected output:
```
[12:10:00] CREATE Collection: newsletter-subscribers (create)
[12:10:01] READ Collection: newsletter-subscribers (ID: 123)
```

## Understanding Next.js Caching

### Server Components (Default Behavior)

Next.js 15 caches server component data by default. Here's what to expect:

**Development Mode** (`npm run dev`):
- Data is usually fetched fresh each time
- You'll see logs on every page load
- Cache is less aggressive for better DX

**Production Mode** (`npm run build && npm start`):
- Data is cached more aggressively
- First request: You'll see logs
- Subsequent requests: No logs (served from cache)
- Cache revalidation happens based on your settings

### Footer Component Example

Your `Footer.tsx` is a server component that fetches data:

```typescript
async function getFooterLinks(): Promise<FooterLink | null> {
  const payload = await getPayload({ config })
  const links = await payload.findGlobal({
    slug: 'footer-links',
  })
  return links
}
```

**Expected Logging**:
- Initial page load: `READ Global: footer-links`
- Refresh: May or may not log (depending on cache)
- Hard refresh (Cmd+Shift+R): `READ Global: footer-links`

## Disabling Logging

If you want to disable logging (e.g., in production), simply remove the wrappers:

```typescript
// Before (with logging)
collections: [
  withCollectionLogging(Users),
  withCollectionLogging(Media),
]

// After (without logging)
collections: [
  Users,
  Media,
]
```

Or add an environment variable check:

```typescript
const shouldLog = process.env.NODE_ENV === 'development'

collections: [
  shouldLog ? withCollectionLogging(Users) : Users,
  shouldLog ? withCollectionLogging(Media) : Media,
]
```

## Advanced: Custom Logging

You can customize the logging behavior by modifying `src/lib/payload/hooks/logging.ts`:

### Add Request Context
```typescript
export const createCollectionReadLogger =
  (collectionSlug: string): CollectionAfterReadHook =>
  async ({ doc, req }) => {
    console.log(
      `[${collectionSlug}] READ by ${req.user?.email || 'anonymous'}`
    )
    return doc
  }
```

### Add Performance Timing
```typescript
const startTime = performance.now()
// ... operation ...
const duration = performance.now() - startTime
console.log(`Operation took ${duration.toFixed(2)}ms`)
```

### Filter by Collection
```typescript
const LOGGED_COLLECTIONS = ['payments', 'newsletter-subscribers']

export const withCollectionLogging = (collection: CollectionConfig) => {
  if (!LOGGED_COLLECTIONS.includes(collection.slug)) {
    return collection // Skip logging
  }
  // ... add logging
}
```

## Troubleshooting

### Not Seeing Logs?

1. **Check terminal is running**: Ensure `npm run dev` is active
2. **Check you're on the right terminal**: Logs appear in the terminal running the dev server
3. **Data might be cached**: Try hard refresh (Cmd+Shift+R)
4. **Check imports**: Ensure logging hooks are imported in `payload.config.ts`

### Too Many Logs?

1. **Filter by collection**: Modify `withCollectionLogging` to only log certain collections
2. **Reduce verbosity**: Comment out operations you don't need (e.g., READ)
3. **Add environment check**: Only log in development mode

### Colors Not Showing?

Some terminals don't support ANSI color codes. The logging will still work, but without colors.

## Summary

✅ **Enabled**: Logging is now active for all collections and globals  
✅ **Color-coded**: Easy to identify operation types at a glance  
✅ **Non-invasive**: Preserves existing hooks and functionality  
✅ **Helpful**: Identifies caching behavior and data flow  
✅ **Customizable**: Easy to modify or disable as needed  

Watch your terminal to see exactly when Payload CMS fetches data!

---

**Last Updated**: 24 October 2025
