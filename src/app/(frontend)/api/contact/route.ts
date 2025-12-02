import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';
import { validateTurnstileToken } from '@/lib/turnstile';
import { getClientIP } from '@/lib/getClientIP';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: 'sponsorship' | 'partnership' | 'volunteer' | 'programs' | 'csr' | 'other';
  message: string;
  turnstileToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();

    // Basic validation
    if (!body.firstName || !body.lastName || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Turnstile validation
    if (!body.turnstileToken) {
      return NextResponse.json(
        { error: 'Security verification is required' },
        { status: 400 }
      );
    }

    const clientIP = getClientIP(request);
    const turnstileValidation = await validateTurnstileToken(body.turnstileToken, clientIP);

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

    console.log('Turnstile validation successful:', {
      action: turnstileValidation.action,
      hostname: turnstileValidation.hostname,
      challenge_ts: turnstileValidation.challenge_ts,
    });

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Subject validation
    const validSubjects = ['sponsorship', 'partnership', 'volunteer', 'programs', 'csr', 'other'];
    if (!validSubjects.includes(body.subject)) {
      return NextResponse.json(
        { error: 'Invalid subject selection' },
        { status: 400 }
      );
    }

    // Message length validation
    if (body.message.length < 10) {
      return NextResponse.json(
        { error: 'Message must be at least 10 characters long' },
        { status: 400 }
      );
    }

    // Get user agent for audit trail
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Get Payload instance
    const payload = await getPayload({ config });

    // Create contact submission in Payload CMS
    const submission = await payload.create({
      collection: 'contact-submissions',
      data: {
        firstName: body.firstName.trim(),
        lastName: body.lastName.trim(),
        email: body.email.toLowerCase().trim(),
        phone: body.phone?.trim() || null,
        subject: body.subject,
        message: body.message.trim(),
        status: 'new',
        priority: body.subject === 'sponsorship' ? 'high' : 'normal', // Prioritize sponsorship inquiries
        ipAddress: clientIP,
        userAgent: userAgent,
      },
    });

    console.log('Contact form submission created:', {
      id: submission.id,
      name: `${body.firstName} ${body.lastName}`,
      email: body.email,
      subject: body.subject,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        success: true, 
        submissionId: submission.id,
        message: 'Thank you for your message! We have received your inquiry and will get back to you within 24-48 hours.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form API error:', error);
    
    // Provide different error messages based on error type
    let errorMessage = 'Sorry, there was an error processing your message. Please try again.';
    
    if (error instanceof Error) {
      // Don't expose internal error details to client
      if (error.message.includes('duplicate') || error.message.includes('unique')) {
        errorMessage = 'It looks like you recently submitted a similar message. Please wait a moment before submitting again.';
      } else if (error.message.includes('validation')) {
        errorMessage = 'Please check your information and try again.';
      }
    }

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}