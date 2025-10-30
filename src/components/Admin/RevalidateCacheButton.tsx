'use client'

import { RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function RevalidateCacheButton() {
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleRevalidate = async () => {
    setIsLoading(true)
    setMessage(null)

    try {
      const response = await fetch('/api/revalidate', {
        method: 'POST',
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'Cache revalidated successfully' })
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to revalidate cache' })
      }
    } catch {
      setMessage({ type: 'error', text: 'Error revalidating cache' })
    } finally {
      setIsLoading(false)
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  return (
    <div>
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleRevalidate}
          disabled={isLoading}
          className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <RefreshCw size={16} className={`mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {isLoading ? 'Revalidating...' : 'Revalidate Cache'}
        </button>
        {message && (
          <div
            className={`mt-2 p-2 text-xs rounded-none ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 border border-green-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </div>
  )
}
