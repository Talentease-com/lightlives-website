'use client'

import { ExternalLink } from 'lucide-react'

export default function GoToWebsiteButton() {
  const handleGoToWebsite = () => {
    window.open('/', '_blank', 'noopener,noreferrer')
  }

  return (
    <div>
      <div className="p-4 border-t border-gray-200">
      <button
        onClick={handleGoToWebsite}
        className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-none transition-colors"
      >
        <ExternalLink size={16} className="mr-2" />
        Go to Website
      </button>
      </div>
    </div>
  )
}