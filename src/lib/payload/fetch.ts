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