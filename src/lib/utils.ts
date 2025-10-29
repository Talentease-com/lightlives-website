import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Users, School, Award } from "lucide-react";
import type { Media } from "@/payload-types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const impactIconMap = { Users, School, Award };

// Type for footer link items
export type FooterLinkItem = {
  label?: string
  linkType: 'page' | 'document' | 'external'
  pagePath?: string | null
  document?: number | Media | null
  externalUrl?: string | null
  openInNewTab?: boolean | null
  id?: string | null
}

/**
 * Helper function to get the URL for a link based on its type
 * Supports internal pages, uploaded documents, and external URLs
 */
export function getLinkUrl(link: FooterLinkItem): string {
  if (link.linkType === 'page' && link.pagePath) {
    return link.pagePath
  } else if (link.linkType === 'document' && link.document) {
    // Handle both numeric ID and populated Media object
    if (typeof link.document === 'number') {
      return `/api/media/${link.document}`
    } else if (link.document && typeof link.document === 'object' && 'url' in link.document) {
      return (link.document as Media).url || '#'
    }
  } else if (link.linkType === 'external' && link.externalUrl) {
    return link.externalUrl
  }
  return '#'
}

/**
 * Helper function to determine if a link should open in a new tab
 */
export function shouldOpenInNewTab(link: FooterLinkItem): boolean {
  return link.openInNewTab === true
}
