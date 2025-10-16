import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(_request: NextRequest) {
  // Payload CMS handles authentication for admin routes internally
  // This middleware can be used for any additional custom logic if needed
  return NextResponse.next()
}

export const config = {
  matcher: [
    // Payload CMS admin routes are handled internally by Payload
    // Add custom route patterns here if needed for future middleware logic
  ],
}