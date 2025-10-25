import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { validateEmail } from '@/lib/validationUtils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    const emailValidation = validateEmail(email)
    if (emailValidation !== true) {
      return NextResponse.json(
        { error: emailValidation },
        { status: 400 }
      )
    }

    const payload = await getPayload({ config })

    // Check if email already exists
    const existingSubscriber = await payload.find({
      collection: 'newsletter-subscribers',
      where: {
        email: {
          equals: email.toLowerCase().trim(),
        },
      },
      limit: 1,
    })

    if (existingSubscriber.docs.length > 0) {
      const subscriber = existingSubscriber.docs[0]
      
      // If user previously unsubscribed, reactivate their subscription
      if (subscriber.status === 'unsubscribed') {
        await payload.update({
          collection: 'newsletter-subscribers',
          id: subscriber.id,
          data: {
            status: 'active',
            subscribedAt: new Date().toISOString(),
            unsubscribedAt: null,
          },
        })

        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        })
      }

      // If already subscribed and active
      return NextResponse.json({
        success: true,
        message: 'You are already subscribed to our newsletter!',
      })
    }

    // Get IP address and user agent for audit trail
    const ipAddress =
      request.headers.get('x-forwarded-for') ||
      request.headers.get('x-real-ip') ||
      'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // Create new newsletter subscriber
    await payload.create({
      collection: 'newsletter-subscribers',
      data: {
        email: email.toLowerCase().trim(),
        status: 'active',
        subscribedAt: new Date().toISOString(),
        ipAddress,
        userAgent,
        source: 'footer',
      },
    })

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing! Check your email for a welcome message.',
    })
  } catch (error: unknown) {
    console.error('Newsletter subscription error:', error)

    return NextResponse.json(
      {
        error: 'Failed to subscribe to newsletter. Please try again later.',
      },
      { status: 500 }
    )
  }
}
