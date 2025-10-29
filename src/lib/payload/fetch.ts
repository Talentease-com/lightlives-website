import { getPayload } from "payload";
import configPromise from '@payload-config'
import { cache } from "react";

// Fetch impact data from Payload CMS
export const getImpactData = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const impacts = await payload.find({
      collection: 'impacts',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 100,
    })

    return impacts.docs
  } catch (error) {
    console.error('Error fetching impact data from Payload:', error);
    return [];
  }
});

// Fetch team carousel images
export const getTeamCarouselImages = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const images = await payload.find({
      collection: 'team-carousel-images',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 100,
    })

    return images.docs
  } catch (error) {
    console.error('Error fetching team carousel images from Payload:', error);
    return [];
  }
});

// Fetch leadership team members
export const getLeadershipTeam = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const leaders = await payload.find({
      collection: 'leadership-team',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 20,
    })

    return leaders.docs
  } catch (error) {
    console.error('Error fetching leadership team from Payload:', error);
    return [];
  }
});

// Fetch advisory board members
export const getAdvisoryBoard = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const advisors = await payload.find({
      collection: 'advisory-board',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 20,
    })

    return advisors.docs
  } catch (error) {
    console.error('Error fetching advisory board from Payload:', error);
    return [];
  }
});

// Fetch CSR partners
export const getCSRPartners = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const partners = await payload.find({
      collection: 'partners',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 50,
    })

    return partners.docs
  } catch (error) {
    console.error('Error fetching CSR partners from Payload:', error);
    return [];
  }
});

// Fetch hero carousel images
export const getHeroCarouselImages = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const images = await payload.find({
      collection: 'hero-carousel-images',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 10,
    })

    return images.docs
  } catch (error) {
    console.error('Error fetching hero carousel images from Payload:', error);
    return [];
  }
});

// Fetch video gallery
export const getVideoGallery = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const videos = await payload.find({
      collection: 'video-gallery',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 20,
    })

    return videos.docs
  } catch (error) {
    console.error('Error fetching video gallery from Payload:', error);
    return [];
  }
});

// Fetch testimonials
export const getTestimonials = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const testimonials = await payload.find({
      collection: 'testimonials',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 50,
    })

    return testimonials.docs
  } catch (error) {
    console.error('Error fetching testimonials from Payload:', error);
    return [];
  }
});

// Fetch vertical gallery
export const getVerticalGallery = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const gallery = await payload.find({
      collection: 'vertical-gallery',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 20,
    })

    return gallery.docs
  } catch (error) {
    console.error('Error fetching vertical gallery from Payload:', error);
    return [];
  }
});

// Fetch general gallery
export const getGeneralGallery = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const gallery = await payload.find({
      collection: 'general-gallery',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 50,
    })

    return gallery.docs
  } catch (error) {
    console.error('Error fetching general gallery from Payload:', error);
    return [];
  }
});

// Fetch our journey milestones
export const getOurJourney = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })

    const journey = await payload.find({
      collection: 'our-journey',
      where: {
        isActive: {
          equals: true
        }
      },
      sort: 'displayOrder',
      limit: 20,
    })

    return journey.docs
  } catch (error) {
    console.error('Error fetching our journey from Payload:', error);
    return [];
  }
});

// Fetch page images global
export const getPageImages = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })
    return await payload.findGlobal({ slug: 'page-images' })
  } catch (error) {
    console.error('Error fetching page images from Payload:', error);
    return null;
  }
});

// Fetch page videos global
export const getPageVideos = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })
    return await payload.findGlobal({ slug: 'page-videos' })
  } catch (error) {
    console.error('Error fetching page videos from Payload:', error);
    return null;
  }
});
export const getSocialSettings = cache(async () => {
  try {
    const payload = await getPayload({ config: configPromise })
    const settings = await payload.findGlobal({
      slug: 'social-settings',
    })
    return settings
  } catch (error) {
    console.error('Error fetching social settings:', error)
    return null
  }
});

export const getFooterLinks = cache(async () => {``
  try {
    const payload = await getPayload({ config: configPromise })
    const links = await payload.findGlobal({
      slug: 'footer-links',
    })
    return links
  } catch (error) {
    console.error('Error fetching footer links:', error)
    return null
  }
});