import { NextRequest, NextResponse } from 'next/server'
import config from '@payload-config'
import { getPayload } from 'payload'
import { validateTurnstileToken } from '@/lib/turnstile'
import { getClientIP } from '@/lib/getClientIP'

export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })

    // Parse form data
    const formData = await request.formData()

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const mobile = formData.get('mobile') as string
    const comment = formData.get('comment') as string
    const resumeFile = formData.get('resume') as File
    const turnstileToken = formData.get('turnstileToken') as string

    // Validate required fields
    if (!name || !email || !mobile || !comment || !resumeFile) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: {
            name: !name ? 'Name is required' : null,
            email: !email ? 'Email is required' : null,
            mobile: !mobile ? 'Mobile is required' : null,
            comment: !comment ? 'Comment is required' : null,
            resume: !resumeFile ? 'Resume is required' : null,
          }
        },
        { status: 400 }
      )
    }

    // Turnstile validation
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Security verification is required' },
        { status: 400 }
      )
    }

    const clientIP = getClientIP(request);
    const turnstileValidation = await validateTurnstileToken(turnstileToken, clientIP);

    if (!turnstileValidation.success) {
      console.warn('Turnstile validation failed:', {
        ip: clientIP,
        errors: turnstileValidation['error-codes'],
      });
      return NextResponse.json(
        { error: 'Security verification failed. Please try again.' },
        { status: 403 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Validate file type and size
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(resumeFile.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload PDF, DOC, or DOCX files only.' },
        { status: 400 }
      )
    }

    if (resumeFile.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Please upload files smaller than 5MB.' },
        { status: 400 }
      )
    }

    // Get User Agent for audit
    const userAgent = request.headers.get('user-agent') || 'unknown'

    try {
      // First, upload the resume file to Media collection
      const resumeBuffer = Buffer.from(await resumeFile.arrayBuffer())
      
      const mediaResult = await payload.create({
        collection: 'media',
        data: {
          alt: `Resume for ${name}`,
        },
        file: {
          data: resumeBuffer,
          mimetype: resumeFile.type,
          name: resumeFile.name,
          size: resumeFile.size,
        },
      })

      // Create the career application record
      const applicationResult = await payload.create({
        collection: 'career-applications',
        data: {
          name,
          email,
          mobile,
          comment,
          resume: mediaResult.id,
          applicationStatus: 'new',
          ipAddress: clientIP,
          userAgent,
        },
      })

      return NextResponse.json({
        success: true,
        message: 'Application submitted successfully! We will be in touch within 5-7 business days.',
        applicationId: applicationResult.id,
      })

    } catch (payloadError) {
      console.error('Payload operation error:', payloadError)
      
      return NextResponse.json(
        { 
          error: 'Failed to submit application. Please try again.',
          details: process.env.NODE_ENV === 'development' ? payloadError : undefined
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Career application submission error:', error)
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    )
  }
}

// Handle preflight OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}