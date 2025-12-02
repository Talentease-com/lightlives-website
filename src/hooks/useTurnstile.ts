'use client';

import { useState, useRef, useCallback } from 'react';
import type { TurnstileInstance } from '@marsidev/react-turnstile';

interface UseTurnstileOptions {
  onError?: (message: string) => void;
}

/**
 * Reusable hook for managing Turnstile widget state
 *
 * @example
 * ```tsx
 * const {
 *   turnstileToken,
 *   turnstileRef,
 *   handleTurnstileSuccess,
 *   handleTurnstileError,
 *   handleTurnstileExpire,
 *   resetTurnstile,
 *   isTurnstileValid
 * } = useTurnstile();
 *
 * // In form submission
 * if (!isTurnstileValid()) {
 *   return;
 * }
 *
 * // Include token in API request
 * const response = await fetch('/api/endpoint', {
 *   body: JSON.stringify({ ...data, turnstileToken })
 * });
 *
 * // Reset after success/error
 * resetTurnstile();
 * ```
 */
export function useTurnstile(options?: UseTurnstileOptions) {
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const turnstileRef = useRef<TurnstileInstance | null>(null);

  const handleTurnstileSuccess = useCallback((token: string) => {
    setTurnstileToken(token);
  }, []);

  const handleTurnstileError = useCallback(() => {
    setTurnstileToken(null);
    if (options?.onError) {
      options.onError('Security verification failed. Please try again.');
    }
  }, [options]);

  const handleTurnstileExpire = useCallback(() => {
    setTurnstileToken(null);
  }, []);

  const resetTurnstile = useCallback(() => {
    setTurnstileToken(null);
    if (turnstileRef.current) {
      turnstileRef.current.reset();
    }
  }, []);

  const isTurnstileValid = useCallback(() => {
    return turnstileToken !== null;
  }, [turnstileToken]);

  return {
    turnstileToken,
    turnstileRef,
    handleTurnstileSuccess,
    handleTurnstileError,
    handleTurnstileExpire,
    resetTurnstile,
    isTurnstileValid,
  };
}
