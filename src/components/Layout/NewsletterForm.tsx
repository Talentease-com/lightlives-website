'use client'

import { useState, FormEvent } from 'react'
import { useNewsletterSubscription } from '@/hooks/useNewsletterSubscription'
import { validateEmail } from '@/lib/validationUtils'
import { Button } from '@/components/ui/button'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [validationError, setValidationError] = useState('')
  const { state, message, subscribe, reset } = useNewsletterSubscription()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setValidationError('')

    // Validate email
    const validation = validateEmail(email)
    if (validation !== true) {
      setValidationError(validation)
      return
    }

    // Subscribe
    await subscribe(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    if (validationError) {
      setValidationError('')
    }
    if (state === 'error') {
      reset()
    }
  }

  const isDisabled = state === 'loading' || state === 'success'

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex flex-col">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={handleEmailChange}
            disabled={isDisabled}
            className="flex-1 px-4 py-2 rounded-none bg-primary/80 text-white border border-white/20 
                     placeholder:text-white/60 focus:outline-none focus:border-tertiary 
                     disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            aria-label="Email address"
            aria-invalid={!!validationError}
            aria-describedby={validationError ? 'email-error' : undefined}
          />
          <Button
            type="submit"
            disabled={isDisabled}
            className="px-4 py-2 bg-tertiary hover:bg-tertiary/90 text-white rounded-none 
                     transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {state === 'loading' ? 'Subscribing...' : state === 'success' ? 'Subscribed!' : 'Subscribe'}
          </Button>
        </div>
      </form>

      {/* Validation Error */}
      {validationError && (
        <p id="email-error" className="text-red-400 text-sm mt-2" role="alert">
          {validationError}
        </p>
      )}

      {/* Success Message */}
      {state === 'success' && message && (
        <p className="text-green-400 text-sm mt-2" role="status">
          {message}
        </p>
      )}

      {/* Error Message */}
      {state === 'error' && message && (
        <p className="text-red-400 text-sm mt-2" role="alert">
          {message}
        </p>
      )}
    </div>
  )
}
