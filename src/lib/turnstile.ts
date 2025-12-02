/**
 * Cloudflare Turnstile server-side validation utilities
 */

export interface TurnstileValidationResponse {
  success: boolean;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
  action?: string;
  cdata?: string;
}

/**
 * Validates a Turnstile token with Cloudflare's Siteverify API
 *
 * @param token - The Turnstile response token from the client
 * @param remoteip - The user's IP address (optional but recommended)
 * @returns Validation response from Cloudflare
 */
export async function validateTurnstileToken(
  token: string,
  remoteip?: string
): Promise<TurnstileValidationResponse> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY environment variable is not set');
    return {
      success: false,
      'error-codes': ['missing-secret-key'],
    };
  }

  // Cloudflare expects application/x-www-form-urlencoded or JSON
  const body = new URLSearchParams();
  body.append('secret', secretKey);
  body.append('response', token);

  if (remoteip && remoteip !== 'unknown' && remoteip !== '::1') {
    body.append('remoteip', remoteip);
  }

  try {
    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString(),
      }
    );

    const result: TurnstileValidationResponse = await response.json();

    if (!response.ok) {
      console.error('Turnstile API error:', {
        status: response.status,
        result,
      });
      return {
        success: false,
        'error-codes': result['error-codes'] || ['api-error'],
      };
    }

    return result;
  } catch (error) {
    console.error('Turnstile validation error:', error);
    return {
      success: false,
      'error-codes': ['internal-error'],
    };
  }
}
