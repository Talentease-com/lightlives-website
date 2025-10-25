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
