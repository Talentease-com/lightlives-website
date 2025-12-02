import { NextRequest } from 'next/server';

/**
 * Extract client IP address from Next.js request headers
 * Checks multiple headers in order of priority:
 * 1. CF-Connecting-IP (Cloudflare)
 * 2. X-Forwarded-For (Standard proxy header)
 * 3. X-Real-IP (Nginx proxy header)
 *
 * @param request - Next.js request object
 * @returns Client IP address or 'unknown' if not found
 */
export function getClientIP(request: NextRequest): string {
  const cf = request.headers.get('cf-connecting-ip');
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');

  if (cf) {
    return cf;
  }

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (real) {
    return real;
  }

  return 'unknown';
}
