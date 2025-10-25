'use client'

import { useState } from 'react'

type SubscriptionState = 'idle' | 'loading' | 'success' | 'error'

interface UseNewsletterSubscriptionReturn {
  state: SubscriptionState
  message: string
  subscribe: (email: string) => Promise<void>
  reset: () => void
}

export function useNewsletterSubscription(): UseNewsletterSubscriptionReturn {
  const [state, setState] = useState<SubscriptionState>('idle')
  const [message, setMessage] = useState('')

  const subscribe = async (email: string) => {
    setState('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setState('success')
        setMessage(data.message || 'Successfully subscribed!')
      } else {
        setState('error')
        setMessage(data.error || 'Failed to subscribe. Please try again.')
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error)
      setState('error')
      setMessage('Network error. Please check your connection and try again.')
    }
  }

  const reset = () => {
    setState('idle')
    setMessage('')
  }

  return {
    state,
    message,
    subscribe,
    reset,
  }
}
