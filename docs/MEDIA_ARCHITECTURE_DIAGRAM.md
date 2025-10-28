# Media Architecture Visual Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         MEDIA MANAGEMENT ARCHITECTURE                        │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                              COLLECTIONS                                     │
│                         (Multiple Dynamic Items)                             │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌─────────────────┐  │
│  │ HeroSlideshowImages  │  │   VideoGallery       │  │  Testimonials   │  │
│  ├──────────────────────┤  ├──────────────────────┤  ├─────────────────┤  │
│  │ • image (upload)     │  │ • thumbnail (upload) │  │ • image (upload)│  │
│  │ • alt (text)         │  │ • videoFile (upload) │  │ • name (text)   │  │
│  │ • displayOrder (num) │  │ • videoUrl (text)    │  │ • role (text)   │  │
│  │ • isActive (bool)    │  │ • title (text)       │  │ • quote (text)  │  │
│  │                      │  │ • description (text) │  │ • displayOrder  │  │
│  │ Used on:             │  │ • category (select)  │  │ • isActive      │  │
│  │ - Homepage Hero      │  │ • displayOrder       │  │                 │  │
│  │                      │  │ • isActive           │  │ Used on:        │  │
│  │ Admin Group:         │  │                      │  │ - Homepage      │  │
│  │ Homepage Content     │  │ Used on:             │  │                 │  │
│  │                      │  │ - Homepage           │  │ Admin Group:    │  │
│  │ Fetch:               │  │                      │  │ Content         │  │
│  │ getHeroSlideshow()   │  │ Admin Group:         │  │                 │  │
│  └──────────────────────┘  │ Homepage Content     │  │ Fetch:          │  │
│                             │                      │  │ getTestimonials │  │
│                             │ Fetch:               │  └─────────────────┘  │
│                             │ getVideoGallery()    │                        │
│                             └──────────────────────┘                        │
│                                                                              │
│  ┌──────────────────────┐                                                   │
│  │  SponsorGallery      │     Already Implemented: ✅                       │
│  ├──────────────────────┤     ┌──────────────────────────────┐             │
│  │ • image (upload)     │     │ TeamCarouselImages           │             │
│  │ • title (text)       │     │ - Used on /about/team        │             │
│  │ • description (text) │     └──────────────────────────────┘             │
│  │ • displayOrder (num) │     ┌──────────────────────────────┐             │
│  │ • isActive (bool)    │     │ Partners (CSR)               │             │
│  │ • impact (text)      │     │ - Used on /csr               │             │
│  │                      │     └──────────────────────────────┘             │
│  │ Used on:             │                                                   │
│  │ - /sponsor (gallery) │                                                   │
│  │                      │                                                   │
│  │ Admin Group:         │                                                   │
│  │ Sponsor Content      │                                                   │
│  │                      │                                                   │
│  │ Fetch:               │                                                   │
│  │ getSponsorGallery()  │                                                   │
│  └──────────────────────┘                                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                                GLOBALS                                       │
│                    (Single Configuration per Global)                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ PageHeroImages                                                      │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ All page hero backgrounds in one global config                     │    │
│  │                                                                     │    │
│  │ Fields:                                                             │    │
│  │ • csrHeroImage (upload) + csrHeroAlt (text)                        │    │
│  │ • volunteerHeroImage (upload) + volunteerHeroAlt (text)            │    │
│  │ • programsHeroImage (upload) + programsHeroAlt (text)              │    │
│  │ • sponsorHeroImage (upload) + sponsorHeroAlt (text)                │    │
│  │ • aboutHeroImage (upload) + aboutHeroAlt (text)                    │    │
│  │                                                                     │    │
│  │ Used on: /csr, /support/volunteer, /about/programs, /sponsor       │    │
│  │ Admin Group: Site Settings                                         │    │
│  │ Fetch: getPageHeroImages()                                         │    │
│  │ Revalidation: afterChange → revalidatePath('/') for all pages     │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ HeroSettings                                                        │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ • mainVideo (upload)       - Hero video file                       │    │
│  │ • videoPoster (upload)     - Video poster frame                    │    │
│  │ • videoTitle (text)                                                │    │
│  │ • videoDescription (textarea)                                      │    │
│  │ • ctaPrimaryText (text)    - "Sponsor a Child"                     │    │
│  │ • ctaPrimaryUrl (text)     - "/sponsor"                            │    │
│  │ • ctaSecondaryText (text)  - "Watch Our Story"                     │    │
│  │ • slideshowInterval (num)  - 7000ms default                        │    │
│  │                                                                     │    │
│  │ Used on: Homepage hero section                                     │    │
│  │ Admin Group: Site Settings                                         │    │
│  │ Fetch: getHeroSettings()                                           │    │
│  │ Revalidation: afterChange → revalidatePath('/')                   │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ FrameworkImages                                                     │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ • mckinseyFrameworkImage (upload)                                  │    │
│  │ • mckinseyFrameworkAlt (text)                                      │    │
│  │ • mckinseyFrameworkCaption (text)                                  │    │
│  │ • sdgGoalsImage (upload)                                           │    │
│  │ • sdgGoalsAlt (text)                                               │    │
│  │ • sdgGoalsCaption (text)                                           │    │
│  │ • showMckinseyPlaceholder (bool) - Dev mode toggle                 │    │
│  │ • showSDGPlaceholder (bool)      - Dev mode toggle                 │    │
│  │                                                                     │    │
│  │ Used on: /about/programs                                           │    │
│  │ Admin Group: Site Settings                                         │    │
│  │ Fetch: getFrameworkImages()                                        │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ SponsorPageSettings                                                 │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ • explainerVideo (upload)                                          │    │
│  │ • explainerVideoPoster (upload)                                    │    │
│  │ • explainerVideoTitle (text)                                       │    │
│  │ • explainerVideoDescription (textarea)                             │    │
│  │ • modalImage (upload)                                              │    │
│  │ • modalImageAlt (text)                                             │    │
│  │ • impactSectionImage (upload)                                      │    │
│  │ • impactSectionImageAlt (text)                                     │    │
│  │                                                                     │    │
│  │ Used on: /sponsor page + SponsorModal                              │    │
│  │ Admin Group: Site Settings                                         │    │
│  │ Fetch: getSponsorPageSettings()                                    │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ CSRPartnershipImages                                                │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ • financialSupportImage (upload) + alt (text)                      │    │
│  │ • skillBasedVolunteeringImage (upload) + alt (text)                │    │
│  │ • productDonationsImage (upload) + alt (text)                      │    │
│  │ • jointInitiativesImage (upload) + alt (text)                      │    │
│  │                                                                     │    │
│  │ Used on: /csr (partnership framework section)                      │    │
│  │ Admin Group: Site Settings                                         │    │
│  │ Fetch: getCSRPartnershipImages()                                   │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│     Already Implemented: ✅                                                 │
│     ┌──────────────────────────────────────────────────────┐               │
│     │ EmailSettings, SocialSettings, FooterLinks           │               │
│     └──────────────────────────────────────────────────────┘               │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                           DATA FLOW ARCHITECTURE                             │
└─────────────────────────────────────────────────────────────────────────────┘

    ┌─────────────┐
    │   Admin UI  │  (Payload CMS at /admin)
    │ /admin      │
    └──────┬──────┘
           │ Creates/Updates
           ▼
    ┌─────────────────────────┐
    │  Vercel Postgres DB     │  (Storage)
    │  + Cloudflare R2        │  (Media files)
    └──────┬──────────────────┘
           │ afterChange hook triggers
           ▼
    ┌─────────────────────────┐
    │  revalidatePath()       │  (Cache invalidation)
    └──────┬──────────────────┘
           │
           ▼
    ┌─────────────────────────────────────┐
    │  Next.js Page                       │  (Server Component)
    │  src/app/(frontend)/page.tsx        │
    │                                     │
    │  export default async function() {  │
    │    const data = await Promise.all([ │
    │      getHeroSlideshow(),  ◄────┐   │
    │      getVideoGallery(),   ◄────┤   │  Cached fetch helpers
    │      getTestimonials(),   ◄────┤   │  (React cache wrapper)
    │    ])                          │   │
    │                                │   │
    │    return <Hero data={data} /> │   │
    │  }                             │   │
    └────────────────────────────────┼───┘
                                     │
                    ┌────────────────┘
                    │
    ┌───────────────▼─────────────────────┐
    │  src/lib/payload/fetch.ts           │
    │                                     │
    │  export const getHeroSlideshow =    │
    │    cache(async () => {              │
    │      const payload = await          │
    │        getPayload({ config })       │
    │                                     │
    │      return payload.find({          │
    │        collection: 'hero-slideshow',│
    │        where: { isActive: true },   │
    │        sort: 'displayOrder'         │
    │      })                             │
    │    })                               │
    └─────────────────────────────────────┘
                    │
                    ▼
    ┌─────────────────────────────────────┐
    │  Component (Client or Server)       │
    │  src/components/Home/HeroSlideshow  │
    │                                     │
    │  interface Props {                  │
    │    images: HeroSlideshowImage[]     │
    │  }                                  │
    │                                     │
    │  const HeroSlideshow = ({ images }) │
    │    => {                             │
    │      return images.map(img =>       │
    │        <Image                       │
    │          src={getMediaUrl(img)}     │
    │        />                           │
    │      )                              │
    │    }                                │
    └─────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         COMPONENT PATTERNS                                   │
└─────────────────────────────────────────────────────────────────────────────┘

PATTERN 1: Collection-based Component
──────────────────────────────────────
✅ Use when: Multiple items, needs add/remove/reorder

// 1. Fetch in page (server component)
const items = await getCollectionName()

// 2. Pass to component
<ComponentName items={items} />

// 3. Component handles rendering
items.map(item => (
  <Image src={getMediaUrl(item.image)} alt={item.alt} />
))

Examples:
- Hero slideshow (4 images)
- Video gallery (6+ videos)
- Testimonials (6+ people)
- Sponsor gallery (8 images)


PATTERN 2: Global-based Component
──────────────────────────────────
✅ Use when: Single configuration, rarely changes

// 1. Fetch in page
const settings = await getGlobalName()

// 2. Pass to component
<ComponentName settings={settings} />

// 3. Component uses single config
<Image 
  src={getMediaUrl(settings.heroImage)} 
  alt={settings.heroAlt} 
/>

Examples:
- Page hero images (one per page)
- Framework diagrams (2 images)
- Video settings (one video)


PATTERN 3: Hybrid (Collection + Global)
────────────────────────────────────────
✅ Use when: Multiple items + configuration

// HomePage example:
const [slideshow, settings] = await Promise.all([
  getHeroSlideshow(),  // Collection: multiple images
  getHeroSettings(),   // Global: video, CTA text
])

<Hero 
  images={slideshow}     // From collection
  videoUrl={settings.mainVideo}  // From global
  ctaText={settings.ctaPrimaryText}
/>

┌─────────────────────────────────────────────────────────────────────────────┐
│                         TYPE SAFETY PATTERN                                  │
└─────────────────────────────────────────────────────────────────────────────┘

// Auto-generated types (after pnpm generate:types)
import type { 
  HeroSlideshowImage,  // Collection type
  VideoGallery,        // Collection type
  Testimonial,         // Collection type
  Media,               // Media collection
  PageHeroImages,      // Global type
} from '@/payload-types'

// Component props
interface HeroSlideshowProps {
  images: HeroSlideshowImage[]  // Type-safe array
}

// Handling Media relationship
const getImageUrl = (image: string | number | Media): string => {
  if (typeof image === 'object' && image?.url) {
    return image.url  // Populated media object
  }
  return '/placeholder.jpg'  // Fallback
}

┌─────────────────────────────────────────────────────────────────────────────┐
│                      MIGRATION PRIORITY MAP                                  │
└─────────────────────────────────────────────────────────────────────────────┘

Priority 1 (HIGH) - User-facing homepage content
┌────────────────────────────────────────────────┐
│ 1. HeroSlideshow        → Collection           │
│ 2. Testimonials         → Collection           │
│ 3. VideoGallery         → Collection           │
│ 4. PageHeroImages       → Global               │
└────────────────────────────────────────────────┘
         ▼
Priority 2 (MEDIUM) - Sponsor/donation flow
┌────────────────────────────────────────────────┐
│ 5. SponsorGallery       → Collection           │
│ 6. SponsorPageSettings  → Global               │
│ 7. CSRPartnershipImages → Global               │
└────────────────────────────────────────────────┘
         ▼
Priority 3 (LOW) - Can use placeholders
┌────────────────────────────────────────────────┐
│ 8. FrameworkImages      → Global               │
└────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                         ADMIN UX GROUPING                                    │
└─────────────────────────────────────────────────────────────────────────────┘

Collections Menu:
├── 📁 Homepage Content
│   ├── Hero Slideshow Images
│   ├── Video Gallery
│   └── Testimonials
│
├── 📁 Sponsor Content
│   └── Sponsor Gallery
│
├── 📁 Content
│   ├── Team Carousel Images ✅
│   ├── Partners ✅
│   ├── Leadership Team ✅
│   └── Advisory Board ✅
│
└── 📁 Submissions
    ├── Payments ✅
    ├── Contact Submissions ✅
    ├── CSR Inquiries ✅
    ├── Career Applications ✅
    └── Newsletter Subscribers ✅

Globals Menu:
├── 🌐 Site Settings
│   ├── Hero Settings
│   ├── Page Hero Images
│   ├── Framework Images
│   ├── Sponsor Page Settings
│   ├── CSR Partnership Images
│   ├── Email Settings ✅
│   ├── Social Settings ✅
│   └── Footer Links ✅

┌─────────────────────────────────────────────────────────────────────────────┐
│                     PERFORMANCE OPTIMIZATIONS                                │
└─────────────────────────────────────────────────────────────────────────────┘

✅ React cache() wrapper
   → Deduplicates fetch calls in same render

✅ Promise.all() parallel fetching
   → Multiple queries execute simultaneously

✅ Next.js Image optimization
   → Automatic WebP conversion, lazy loading

✅ Cloudflare R2 CDN
   → Global edge distribution

✅ Server Components default
   → No client-side JavaScript for data fetching

✅ Revalidation on demand
   → Cache updates only when content changes

✅ Static generation where possible
   → Pre-rendered pages (export const dynamic = 'force-static')

┌─────────────────────────────────────────────────────────────────────────────┐
│                       DEPLOYMENT CHECKLIST                                   │
└─────────────────────────────────────────────────────────────────────────────┘

Phase 1: Development
☐ Create all collections/globals
☐ Register in payload.config.ts
☐ Generate types (pnpm generate:types)
☐ Create fetch helpers
☐ Create revalidation hooks
☐ Refactor components
☐ Update pages

Phase 2: Testing
☐ Test with empty collections (fallback UI)
☐ Test with single item
☐ Test with multiple items
☐ Test reordering (displayOrder)
☐ Test isActive toggle
☐ Test cache invalidation
☐ Test image uploads
☐ Test alt text rendering

Phase 3: Migration
☐ Upload placeholder images to Media
☐ Create initial collection records
☐ Verify all pages render
☐ Replace placeholders with real content
☐ Delete old static files
☐ Remove Pexels from next.config.ts

Phase 4: Production
☐ Verify Cloudflare R2 working
☐ Test image loading speed
☐ Check SEO (alt text, metadata)
☐ Monitor Payload logs
☐ Train content editors
☐ Document admin workflows

✅ = Already Implemented
☐ = To Be Implemented
