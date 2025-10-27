import { NextRequest, NextResponse } from 'next/server';
import { getPayload } from 'payload';
import config from '@/payload.config';

interface CSRInquiryData {
  companyName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone?: string;
  location?: string;
  interests: ('donations' | 'sponsorships' | 'volunteering')[];
  budgetBand?: 'under-10l' | '10l-50l' | '50l-2cr' | 'above-2cr' | 'undisclosed';
  message: string;
}

// Helper function to get client IP address
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  const cf = request.headers.get('cf-connecting-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (real) {
    return real;
  }
  if (cf) {
    return cf;
  }
  
  return 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    const body: CSRInquiryData = await request.json();

    // Basic validation
    if (!body.companyName || !body.contactFirstName || !body.contactLastName || !body.email || !body.interests || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Interests validation
    const validInterests = ['donations', 'sponsorships', 'volunteering'];
    if (!Array.isArray(body.interests) || body.interests.length === 0 || 
        !body.interests.every(interest => validInterests.includes(interest))) {
      return NextResponse.json(
        { error: 'Please select at least one partnership interest' },
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

    // Get client information for audit trail
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Get Payload instance
    const payload = await getPayload({ config });

    // Determine priority based on budget band and interests
    let priority: 'low' | 'normal' | 'high' | 'urgent' = 'normal';
    if (body.budgetBand === 'above-2cr' || body.interests.length >= 2) {
      priority = 'high';
    }

    // Create CSR inquiry in Payload CMS
    const submission = await payload.create({
      collection: 'csr-inquiries',
      data: {
        companyName: body.companyName.trim(),
        contactFirstName: body.contactFirstName.trim(),
        contactLastName: body.contactLastName.trim(),
        email: body.email.toLowerCase().trim(),
        phone: body.phone?.trim() || null,
        location: body.location?.trim() || null,
        interests: body.interests,
        budgetBand: body.budgetBand || null,
        message: body.message.trim(),
        status: 'new',
        priority: priority,
        ipAddress: clientIP,
        userAgent: userAgent,
      },
    });

    console.log('CSR inquiry submission created:', {
      id: submission.id,
      company: body.companyName,
      contact: `${body.contactFirstName} ${body.contactLastName}`,
      email: body.email,
      interests: body.interests,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json(
      { 
        success: true, 
        submissionId: submission.id,
        message: 'Thank you for your interest in partnering with Light Lives! We have received your inquiry and will get back to you within 24-48 hours to discuss how we can work together.' 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('CSR inquiry API error:', error);
    
    // Provide different error messages based on error type
    let errorMessage = 'Sorry, there was an error processing your inquiry. Please try again.';
    
    if (error instanceof Error) {
      // Don't expose internal error details to client
      if (error.message.includes('duplicate') || error.message.includes('unique')) {
        errorMessage = 'It looks like you recently submitted a similar inquiry. Please wait a moment before submitting again.';
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
