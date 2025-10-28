# Media Management Strategy - Replacing Placeholder Images & Videos with Payload CMS

## Executive Summary

This document outlines a comprehensive strategy to replace all hardcoded Pexel URLs, placeholder images, and static media with dynamic content managed through Payload CMS. The strategy follows the existing architectural patterns already established in the codebase (TeamCarouselImages, Partners, etc.).

## Current State Analysis

### Placeholder Media Audit

#### 1. **Hero Section Images** (Home Page)
- **Location**: `src/components/Home/Hero.tsx`, `HeroSlideshow.tsx`
- **Current**: Local static images (`/images/home0.jpg` through `/images/home3.jpg`)
- **Type**: Hero background slideshow (4 images)
- **Use Case**: Auto-rotating hero carousel with 7-second intervals

#### 2. **Homepage Video Gallery** 
- **Location**: `src/components/Home/VideoGallery.tsx`
- **Current**: 6 Pexels thumbnail URLs + empty/placeholder video URLs
- **Type**: Video thumbnails with titles, descriptions, categories
- **Use Case**: Video showcase grid with lightbox functionality

#### 3. **Testimonial Avatars**
- **Location**: `src/components/Home/Testimonials.tsx`
- **Current**: Pravatar.cc placeholder URLs (`https://i.pravatar.cc/120?img={1-7}`)
- **Type**: 6 testimonial profile images
- **Use Case**: Testimonial slider component

#### 4. **Impact Section Image**
- **Location**: `src/components/Home/Impact.tsx`
- **Current**: 1 Pexels URL (child studying image)
- **Type**: Static decorative image
- **Use Case**: Visual accompaniment to impact statistics

#### 5. **Sponsor Page Gallery**
- **Location**: `src/components/Sponsor/gallery-data.ts`
- **Current**: 8 Pexels URLs
- **Type**: Circular gallery images with titles/descriptions
- **Use Case**: Interactive circular gallery on donation page

#### 6. **Sponsor Page Video**
- **Location**: `src/app/(frontend)/sponsor/page.tsx`
- **Current**: Pexels poster image + empty video source
- **Type**: Explainer video with poster frame
- **Use Case**: Embedded video about programs/impact

#### 7. **CSR Partnership Framework**
- **Location**: `src/components/CSR/PartnershipFramework.tsx`
- **Current**: 4 Pexels URLs for different partnership types
- **Type**: Partnership category images
- **Use Case**: Visual representation of collaboration models

#### 8. **CSR Hero Section**
- **Location**: `src/components/CSR/HeroSection.tsx`
- **Current**: 1 Pexels background image
- **Type**: Hero background image
- **Use Case**: CSR page header visual

#### 9. **Volunteer Hero**
- **Location**: `src/components/Volunteer/VolunteerHero.tsx`
- **Current**: 1 Pexels background image
- **Type**: Hero background
- **Use Case**: Volunteer page header

#### 10. **Programs Page Hero**
- **Location**: `src/components/Programs/ProgramsHero.tsx`
- **Current**: 1 Pexels background image
- **Type**: Hero background
- **Use Case**: Programs page header

#### 11. **Framework Reference Images**
- **Location**: `src/components/Programs/FrameworkImages.tsx`
- **Current**: 2 Pexels placeholder URLs
- **Type**: Framework diagrams (McKinsey 21st Century Skills, UN SDG Goals)
- **Use Case**: Reference framework images with captions

#### 12. **Sponsor Modal Image**
- **Location**: `src/components/ui/SponsorModal.tsx`
- **Current**: 1 Pexels URL
- **Type**: Modal background image
- **Use Case**: Popup modal visual

#### 13. **Team Hero Carousel** ✅ (Already Implemented)
- **Location**: `TeamHeroCarousel.tsx` + `TeamCarouselImages` collection
- **Status**: Already using Payload CMS
- **Pattern to Follow**: This is the reference implementation

#### 14. **CSR Partner Logos** ✅ (Already Implemented)
- **Location**: `PartnerLogos.tsx` + `Partners` collection
- **Status**: Already using Payload CMS with fallback placeholders
- **Pattern to Follow**: Has fallback pattern for when no partners exist

---

## Proposed Architecture

### Collections vs Globals - Decision Matrix

| Content Type | Pattern | Rationale |
|-------------|---------|-----------|
| **Collections** (Multiple Items) | Use when: Multiple variations, admin needs to add/remove/reorder items | Hero carousels, video galleries, testimonials, sponsor galleries |
| **Globals** (Single Config) | Use when: One-time configuration, rarely changes, site-wide settings | Hero videos, framework diagrams, default images |

---

## Implementation Plan

### Phase 1: Collections (Multiple Dynamic Items)

#### Collection 1: `HeroSlideshow` (Home Page)
```typescript
slug: 'hero-slideshow-images'
group: 'Homepage Content'
fields:
  - image (upload -> media)
  - alt (text, required)
  - displayOrder (number, default: 0)
  - isActive (checkbox, default: true)
  - title (text, optional) - For future use if captions needed
  - description (textarea, optional) - For future use
```
**Files to Update**:
- `src/collections/HeroSlideshowImages/index.ts` (create)
- `src/components/Home/HeroSlideshow.tsx` (refactor to fetch from CMS)
- `src/app/(frontend)/page.tsx` (fetch data, pass to component)

**Migration Notes**: 
- Upload existing `/images/home0-3.jpg` to Media collection
- Create 4 records pointing to those media items
- Remove static files after migration

---

#### Collection 2: `VideoGallery` (Home Page)
```typescript
slug: 'video-gallery'
group: 'Homepage Content'
fields:
  - title (text, required)
  - description (textarea, required)
  - category (select: 'Education', 'Impact', 'Community', 'Events')
  - thumbnail (upload -> media, required)
  - videoFile (upload -> media, optional) - For self-hosted videos
  - videoUrl (text, optional) - For YouTube/Vimeo embeds
  - displayOrder (number, default: 0)
  - isActive (checkbox, default: true)
  - duration (text, optional) - e.g., "3:45"
  - publishedDate (date, optional)
```
**Files to Update**:
- `src/collections/VideoGallery/index.ts` (create)
- `src/components/Home/VideoGallery.tsx` (remove hardcoded data)
- `src/app/(frontend)/page.tsx` (fetch and pass data)

**Validation**:
- At least one of `videoFile` OR `videoUrl` must be provided
- Add custom validation hook

**Migration Notes**:
- Initially populate with 6 existing placeholder thumbnails
- Gradually replace with actual video content

---

#### Collection 3: `Testimonials`
```typescript
slug: 'testimonials'
group: 'Content'
fields:
  - name (text, required)
  - role (text, required)
  - quote (textarea, required, maxLength: 500)
  - image (upload -> media, required)
  - displayOrder (number, default: 0)
  - isActive (checkbox, default: true)
  - organization (text, optional)
  - testimonialDate (date, optional)
  - category (select: 'Student', 'Parent', 'Volunteer', 'Partner', 'Alumnus')
```
**Files to Update**:
- `src/collections/Testimonials/index.ts` (create)
- `src/components/Home/Testimonials.tsx` (remove hardcoded array)
- `src/app/(frontend)/page.tsx` (fetch data)

**Migration Notes**:
- Replace pravatar.cc URLs with actual testimonial photos
- Preserve existing testimonial text content

---

#### Collection 4: `SponsorGallery`
```typescript
slug: 'sponsor-gallery'
group: 'Sponsor Content'
fields:
  - title (text, required)
  - description (textarea, required)
  - image (upload -> media, required)
  - displayOrder (number, default: 0)
  - isActive (checkbox, default: true)
  - impact (text, optional) - e.g., "500+ children educated"
```
**Files to Update**:
- `src/collections/SponsorGallery/index.ts` (create)
- `src/components/Sponsor/gallery-data.ts` (delete file)
- `src/components/Sponsor/CircularGallery.tsx` (update to use CMS data)
- `src/app/(frontend)/sponsor/page.tsx` (fetch and pass data)

**Migration Notes**:
- Migrate 8 existing gallery items
- Use existing Pexels images initially, replace later

---

### Phase 2: Globals (Single Configuration Items)

#### Global 1: `HeroSettings`
```typescript
slug: 'hero-settings'
label: 'Hero Section Settings'
fields:
  - mainVideo (upload -> media) - Main hero video
  - videoPoster (upload -> media) - Video poster frame
  - videoTitle (text)
  - videoDescription (textarea)
  - ctaPrimaryText (text, default: 'Sponsor a Child')
  - ctaPrimaryUrl (text, default: '/sponsor')
  - ctaSecondaryText (text, default: 'Watch Our Story')
  - slideshowInterval (number, default: 7000) - milliseconds
```
**Files to Update**:
- `src/globals/HeroSettings.ts` (create)
- `src/components/Home/Hero.tsx` (use global settings)
- `src/globals/hooks/revalidateHero.ts` (create - cache invalidation)

**Cache Revalidation**: 
- Add `afterChange: [revalidateHero]` hook
- Revalidates root layout on settings change

---

#### Global 2: `PageHeroImages`
```typescript
slug: 'page-hero-images'
label: 'Page Hero Images'
fields:
  - csrHeroImage (upload -> media)
  - csrHeroAlt (text)
  - volunteerHeroImage (upload -> media)
  - volunteerHeroAlt (text)
  - programsHeroImage (upload -> media)
  - programsHeroAlt (text)
  - sponsorHeroImage (upload -> media)
  - sponsorHeroAlt (text)
  - aboutHeroImage (upload -> media)
  - aboutHeroAlt (text)
```
**Files to Update**:
- `src/globals/PageHeroImages.ts` (create)
- `src/components/CSR/HeroSection.tsx`
- `src/components/Volunteer/VolunteerHero.tsx`
- `src/components/Programs/ProgramsHero.tsx`
- `src/globals/hooks/revalidatePageHeroes.ts` (create)

**Rationale**: 
- These are one-per-page images that rarely change
- Global is simpler than creating collections for single items
- All hero images in one admin interface

---

#### Global 3: `FrameworkImages`
```typescript
slug: 'framework-images'
label: 'Framework Reference Images'
fields:
  - mckinseyFrameworkImage (upload -> media)
  - mckinseyFrameworkAlt (text, default: 'McKinsey 21st Century Skills Framework')
  - mckinseyFrameworkCaption (text)
  - sdgGoalsImage (upload -> media)
  - sdgGoalsAlt (text, default: 'UN Sustainable Development Goals')
  - sdgGoalsCaption (text)
  - showMckinseyPlaceholder (checkbox, default: false)
  - showSDGPlaceholder (checkbox, default: false)
```
**Files to Update**:
- `src/globals/FrameworkImages.ts` (create)
- `src/components/Programs/FrameworkImages.tsx`

**Notes**:
- Includes placeholder toggle for development
- Once real framework images uploaded, disable placeholders

---

#### Global 4: `SponsorPageSettings`
```typescript
slug: 'sponsor-page-settings'
label: 'Sponsor Page Settings'
fields:
  - explainerVideo (upload -> media)
  - explainerVideoPoster (upload -> media)
  - explainerVideoTitle (text)
  - explainerVideoDescription (textarea)
  - modalImage (upload -> media)
  - modalImageAlt (text)
  - impactSectionImage (upload -> media)
  - impactSectionImageAlt (text)
```
**Files to Update**:
- `src/globals/SponsorPageSettings.ts` (create)
- `src/app/(frontend)/sponsor/page.tsx`
- `src/components/ui/SponsorModal.tsx`
- `src/components/Home/Impact.tsx`

---

#### Global 5: `CSRPartnershipImages`
```typescript
slug: 'csr-partnership-images'
label: 'CSR Partnership Framework Images'
fields:
  - financialSupportImage (upload -> media)
  - financialSupportAlt (text)
  - skillBasedVolunteeringImage (upload -> media)
  - skillBasedVolunteeringAlt (text)
  - productDonationsImage (upload -> media)
  - productDonationsAlt (text)
  - jointInitiativesImage (upload -> media)
  - jointInitiativesAlt (text)
```
**Files to Update**:
- `src/globals/CSRPartnershipImages.ts` (create)
- `src/components/CSR/PartnershipFramework.tsx`

**Notes**:
- 4 partnership type images
- Rarely change, so global is appropriate

---

## Migration Strategy

### Step 1: Create Collection/Global Schemas
1. Create all collection files in `src/collections/`
2. Create all global files in `src/globals/`
3. Add to `payload.config.ts` with logging wrappers
4. Run `pnpm generate:types` to update TypeScript types

### Step 2: Create Fetch Helpers
```typescript
// src/lib/payload/fetch.ts additions
export const getHeroSlideshow = cache(async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'hero-slideshow-images',
    where: { isActive: { equals: true } },
    sort: 'displayOrder',
    limit: 10,
  })
  return result.docs
})

export const getVideoGallery = cache(async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'video-gallery',
    where: { isActive: { equals: true } },
    sort: 'displayOrder',
    limit: 20,
  })
  return result.docs
})

export const getTestimonials = cache(async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'testimonials',
    where: { isActive: { equals: true } },
    sort: 'displayOrder',
    limit: 50,
  })
  return result.docs
})

export const getHeroSettings = cache(async () => {
  const payload = await getPayload({ config })
  return await payload.findGlobal({ slug: 'hero-settings' })
})

export const getPageHeroImages = cache(async () => {
  const payload = await getPayload({ config })
  return await payload.findGlobal({ slug: 'page-hero-images' })
})

export const getFrameworkImages = cache(async () => {
  const payload = await getPayload({ config })
  return await payload.findGlobal({ slug: 'framework-images' })
})

export const getSponsorPageSettings = cache(async () => {
  const payload = await getPayload({ config })
  return await payload.findGlobal({ slug: 'sponsor-page-settings' })
})

export const getCSRPartnershipImages = cache(async () => {
  const payload = await getPayload({ config })
  return await payload.findGlobal({ slug: 'csr-partnership-images' })
})

export const getSponsorGallery = cache(async () => {
  const payload = await getPayload({ config })
  const result = await payload.find({
    collection: 'sponsor-gallery',
    where: { isActive: { equals: true } },
    sort: 'displayOrder',
    limit: 20,
  })
  return result.docs
})
```

### Step 3: Create Cache Revalidation Hooks
```typescript
// src/globals/hooks/revalidateHero.ts
export const revalidateHero: GlobalAfterChangeHook = async ({ doc, req }) => {
  try {
    revalidatePath('/', 'layout')
    req.payload.logger.info({ msg: 'Hero settings updated - cache revalidated' })
  } catch (error) {
    req.payload.logger.error({ msg: `Error revalidating: ${error.message}` })
  }
  return doc
}

// Apply to all globals that affect shared layouts
```

### Step 4: Refactor Components
For each component:
1. Remove hardcoded data arrays/URLs
2. Accept data as props from parent page
3. Add TypeScript types from `@/payload-types`
4. Handle empty states gracefully
5. Add fallback UI for when no CMS data exists

### Step 5: Update Page-Level Data Fetching
```typescript
// Example: src/app/(frontend)/page.tsx
export default async function Home() {
  const [stats, heroImages, videos, testimonials] = await Promise.all([
    getImpactData(),
    getHeroSlideshow(),
    getVideoGallery(),
    getTestimonials(),
  ])
  
  return (
    <main>
      <Hero images={heroImages} />
      <VideoGallery videos={videos} />
      <Testimonials testimonials={testimonials} />
      {/* ... */}
    </main>
  )
}
```

### Step 6: Initial Data Population
1. Access Payload admin at `/admin`
2. Upload placeholder images to Media collection
3. Create initial records in each collection/global
4. Use existing Pexels URLs initially via URL upload
5. Test that all pages render correctly
6. Gradually replace with real content

### Step 7: Remove External Dependencies
1. Remove `images.pexels.com` from `next.config.ts` remotePatterns
2. Delete `/public/images/home*.jpg` static files (after migration)
3. Remove hardcoded data files (e.g., `gallery-data.ts`)

---

## File Structure After Implementation

```
src/
├── collections/
│   ├── HeroSlideshowImages/
│   │   └── index.ts
│   ├── VideoGallery/
│   │   └── index.ts
│   ├── Testimonials/
│   │   └── index.ts
│   ├── SponsorGallery/
│   │   └── index.ts
│   └── (existing collections...)
├── globals/
│   ├── HeroSettings.ts
│   ├── PageHeroImages.ts
│   ├── FrameworkImages.ts
│   ├── SponsorPageSettings.ts
│   ├── CSRPartnershipImages.ts
│   ├── hooks/
│   │   ├── revalidateHero.ts
│   │   ├── revalidatePageHeroes.ts
│   │   └── (other hooks...)
│   └── (existing globals...)
├── lib/
│   └── payload/
│       └── fetch.ts (extended with new helpers)
```

---

## Type Safety Pattern

All components should use generated types:
```typescript
import type { 
  HeroSlideshowImage,
  VideoGallery,
  Testimonial,
  SponsorGallery,
  Media 
} from '@/payload-types'

// Component props
interface HeroSlideshowProps {
  images: HeroSlideshowImage[]
}

// Handle Media relationship
const getImageUrl = (image: string | number | Media): string => {
  if (typeof image === 'object' && image.url) {
    return image.url
  }
  return '/placeholder.jpg' // Fallback
}
```

---

## Admin UX Enhancements

### Grouping Strategy
```typescript
admin: {
  group: 'Homepage Content' // HeroSlideshow, VideoGallery, Testimonials
  group: 'Sponsor Content'  // SponsorGallery, SponsorPageSettings
  group: 'Content'          // General content (Partners, TeamCarousel, etc.)
  group: 'Site Settings'    // Globals (HeroSettings, PageHeroImages, etc.)
}
```

### Default Columns for Collections
```typescript
admin: {
  defaultColumns: ['title', 'displayOrder', 'isActive', 'updatedAt']
}
```

### Help Text Pattern
```typescript
admin: {
  description: 'Recommended size: 1920x1080px. Images will be cropped to fit.'
}
```

---

## Benefits of This Approach

1. **Consistency**: Follows existing patterns (TeamCarouselImages, Partners)
2. **Type Safety**: Full TypeScript support via generated types
3. **Performance**: Server-side rendering + React cache deduplication
4. **Cache Invalidation**: Automatic revalidation on content updates
5. **Admin UX**: Non-technical staff can manage all media
6. **Scalability**: Easy to add new images/videos without code changes
7. **SEO**: Alt text and metadata stored in CMS
8. **Media Management**: Centralized Cloudflare R2 storage
9. **Logging**: All CRUD operations logged (via `withCollectionLogging`)
10. **Fallback Patterns**: Graceful handling when no content exists

---

## Testing Checklist

- [ ] All collections created and registered in `payload.config.ts`
- [ ] All globals created and registered in `payload.config.ts`
- [ ] Types regenerated (`pnpm generate:types`)
- [ ] Fetch helpers added to `src/lib/payload/fetch.ts`
- [ ] Revalidation hooks added to globals
- [ ] All components refactored to accept CMS data
- [ ] All pages updated to fetch and pass data
- [ ] Initial data populated in admin panel
- [ ] All placeholder URLs removed from components
- [ ] Static image files deleted (after migration)
- [ ] `next.config.ts` updated (remove Pexels domain)
- [ ] Type safety verified (no TypeScript errors)
- [ ] Cache invalidation tested (update content, verify refresh)
- [ ] Empty states tested (no content in collections)
- [ ] Performance tested (page load times)

---

## Rollback Plan

If issues arise:
1. Keep old components in `_archive/` folder during refactor
2. Git branching strategy: `feature/cms-media-migration`
3. Can revert specific components while keeping others
4. Environment variable to toggle between static/CMS data (for testing)

---

## Timeline Estimate

- **Phase 1 (Collections)**: 8-12 hours
  - Collection schemas: 2 hours
  - Fetch helpers: 1 hour
  - Component refactoring: 4-6 hours
  - Testing: 2-3 hours

- **Phase 2 (Globals)**: 6-8 hours
  - Global schemas: 2 hours
  - Revalidation hooks: 1 hour
  - Component refactoring: 2-3 hours
  - Testing: 1-2 hours

- **Phase 3 (Migration & Cleanup)**: 4-6 hours
  - Initial data population: 2-3 hours
  - Cleanup old code: 1 hour
  - Final testing: 1-2 hours

**Total: 18-26 hours**

---

## Next Steps

1. Review this strategy document with team
2. Decide on priority order (Phase 1 vs Phase 2 first)
3. Create GitHub issues for each collection/global
4. Begin implementation with highest-impact items (e.g., Hero section)
5. Test incrementally after each collection/global
6. Document any deviations from this plan

---

## Questions to Resolve

1. Should testimonials support video testimonials in addition to images?
2. Do we need versioning/approval workflow for content changes?
3. Should we implement content scheduling (publish dates)?
4. Do we need multi-language support for images (alt text in multiple languages)?
5. Should framework images be downloadable as PDFs?

---

## Related Documentation

- `FOOTER_REVALIDATION.md` - Cache revalidation pattern reference
- `PAYMENT_INTEGRATION.md` - Collection schema pattern reference
- `TEAMS_PAGE_IMPLEMENTATION.md` - TeamCarouselImages reference implementation
- Payload CMS docs: https://payloadcms.com/docs

---

**Document Version**: 1.0  
**Last Updated**: October 28, 2025  
**Author**: Development Team  
**Status**: ✅ Ready for Implementation
