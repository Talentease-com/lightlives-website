'use client';

import React, { forwardRef } from 'react';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';

interface TurnstileWidgetProps {
  onSuccess: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  action?: string;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
}

/**
 * Reusable Turnstile Widget Component
 *
 * @example
 * ```tsx
 * const { turnstileRef, handleTurnstileSuccess, handleTurnstileError } = useTurnstile();
 *
 * <TurnstileWidget
 *   ref={turnstileRef}
 *   action="contact-form"
 *   onSuccess={handleTurnstileSuccess}
 *   onError={handleTurnstileError}
 * />
 * ```
 */
export const TurnstileWidget = forwardRef<TurnstileInstance, TurnstileWidgetProps>(
  ({ onSuccess, onError, onExpire, action = 'form-submit', theme = 'light', size = 'normal' }, ref) => {
    const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!;

    return (
      <div className="flex justify-center">
        <Turnstile
          ref={ref}
          siteKey={siteKey}
          onSuccess={onSuccess}
          onError={onError}
          onExpire={onExpire}
          options={{
            theme,
            size,
            action,
          }}
        />
      </div>
    );
  }
);

TurnstileWidget.displayName = 'TurnstileWidget';
