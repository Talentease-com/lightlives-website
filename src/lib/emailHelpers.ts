import type { Payload } from 'payload'
import type { EmailSetting } from '@/payload-types'

// Helper function to get email settings from Payload globals
const EMAIL_SETTINGS_SLUG = 'email-settings' as const

// Centralized default values - simple constants
export const DEFAULT_VALUES = {
  primaryColor: '#ff801e',
  secondaryColor: '#1c365d',
  organizationName: 'Light Lives',
  organizationAddress: 'Yogitha Arcade, Balaji Nagar\nKukatpally, Hyderabad, Telangana 500 072',
  organizationPhone: '+91 9342250524',
  organizationEmail: 'info@lightlives.org',
  websiteUrl: 'https://lightlives.org',
  footerText: 'Light Lives - Making Impact Together',
  contactSubject: 'Thank you for contacting Light Lives',
  contactResponseTime: '24-48 hours',
  careerSubject: 'Application Received - Light Lives Careers',
  careerResponseTime: '5-7 business days',
  adminEmail: 'info@lightlives.org',
  hrEmail: 'careers@lightlives.org',
} as const

export async function getEmailSettings(payload: Payload): Promise<EmailSetting> {
  try {
    const emailSettings = await payload.findGlobal({
      slug: EMAIL_SETTINGS_SLUG,
    })
    
    return emailSettings as EmailSetting
  } catch (error) {
    console.error('Error fetching email settings:', error)
    // Return minimal default settings object
    return {
      id: 1,
      contactEmails: {
        enabled: true,
        adminEmail: DEFAULT_VALUES.adminEmail,
        ccEmails: [],
        autoReplyEnabled: true,
        autoReplySubject: DEFAULT_VALUES.contactSubject,
        responseTime: DEFAULT_VALUES.contactResponseTime,
        customMessage: '',
      },
      careerEmails: {
        enabled: true,
        hrEmail: DEFAULT_VALUES.hrEmail,
        ccEmails: [],
        applicantAutoReply: true,
        applicantSubject: DEFAULT_VALUES.careerSubject,
        reviewTime: DEFAULT_VALUES.careerResponseTime,
        customApplicantMessage: '',
      },
      organization: {
        name: DEFAULT_VALUES.organizationName,
        address: DEFAULT_VALUES.organizationAddress,
        phone: DEFAULT_VALUES.organizationPhone,
        replyToEmail: DEFAULT_VALUES.organizationEmail,
        websiteUrl: DEFAULT_VALUES.websiteUrl,
      },
      styling: {
        primaryColor: DEFAULT_VALUES.primaryColor,
        secondaryColor: DEFAULT_VALUES.secondaryColor,
        logoUrl: '',
        footerText: DEFAULT_VALUES.footerText,
      },
    }
  }
}

// Interface for contact form notification data
interface ContactNotificationData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  subject: string
  message: string
  id: string
}

// Interface for career application notification data
interface CareerNotificationData {
  name: string
  email: string
  mobile: string
  id: string
}

// Interface for CSR inquiry notification data
interface CSRInquiryNotificationData {
  companyName: string
  contactFirstName: string
  contactLastName: string
  email: string
  phone?: string
  location?: string
  interests: string[]
  budgetBand?: string
  message: string
  id: string
}

// Helper function to build email recipients list
export function buildRecipientsList(primaryEmail: string, ccEmails?: Array<{ email: string; id?: string | null }> | null) {
  const recipients = [primaryEmail]
  
  if (ccEmails && ccEmails.length > 0) {
    recipients.push(...ccEmails.map(cc => cc.email))
  }
  
  return recipients
}

// Centralized email sending function
// Main function to send notification emails
export async function sendNotificationEmails(
  payload: Payload,
  type: 'contact' | 'career' | 'csr',
  data: ContactNotificationData | CareerNotificationData | CSRInquiryNotificationData,
): Promise<void> {
  try {
    const settings = await getEmailSettings(payload)
    
    if (type === 'contact') {
      const contactData = data as ContactNotificationData
      const contactSettings = settings.contactEmails
      
      if (!contactSettings?.enabled) {
        console.log('Contact form emails disabled in settings')
        return
      }

      // Send admin notification
      const adminEmail = contactSettings.adminEmail || DEFAULT_VALUES.adminEmail
      const recipients = buildRecipientsList(adminEmail, contactSettings.ccEmails)
      
      const primaryColor = settings.styling?.primaryColor || DEFAULT_VALUES.primaryColor
      const secondaryColor = settings.styling?.secondaryColor || DEFAULT_VALUES.secondaryColor
      const orgName = settings.organization?.name || DEFAULT_VALUES.organizationName
      const adminUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://lightlives.org'

      await payload.sendEmail({
        to: recipients,
        subject: `New Contact Form Submission: ${contactData.subject}`,
        text: `
          A new contact form submission has been received on ${orgName} website.
          
          Contact Details:
          Name: ${contactData.firstName} ${contactData.lastName}
          Email: ${contactData.email}
          Phone: ${contactData.phone || 'Not provided'}
          Subject: ${contactData.subject}
          
          Message:
          ${contactData.message}
          
          Submission ID: ${contactData.id}
          Submitted: ${new Date().toLocaleString()}
          
          Please log in to the admin panel to respond to this inquiry.
          Admin Panel: ${adminUrl}/admin
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: ${primaryColor};">New Contact Form Submission</h2>
            
            <p>A new contact form submission has been received on ${orgName} website.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid ${primaryColor}; margin: 20px 0;">
              <h3 style="margin-top: 0; color: ${secondaryColor};">Contact Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0; font-weight: bold; width: 80px;">Name:</td>
                  <td style="padding: 5px 0;">${contactData.firstName} ${contactData.lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 5px 0;"><a href="mailto:${contactData.email}" style="color: ${primaryColor};">${contactData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 5px 0;">${contactData.phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Subject:</td>
                  <td style="padding: 5px 0;">${contactData.subject}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #fff; padding: 15px; border: 1px solid #ddd; margin: 20px 0;">
              <h3 style="margin-top: 0; color: ${secondaryColor};">Message</h3>
              <p style="white-space: pre-wrap; line-height: 1.5;">${contactData.message}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${adminUrl}/admin/collections/contact-submissions/${contactData.id}" 
                 style="background-color: ${primaryColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                View in Admin Panel
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; text-align: center;">
              Submission ID: ${contactData.id}<br>
              Submitted: ${new Date().toLocaleString()}<br>
              ${orgName} - Contact Form System
            </p>
          </div>
        `,
      })

      // Send auto-reply if enabled
      if (contactSettings.autoReplyEnabled) {
        const autoReplySubject = contactSettings.autoReplySubject || DEFAULT_VALUES.contactSubject
        const responseTime = contactSettings.responseTime || DEFAULT_VALUES.contactResponseTime
        const customMessage = contactSettings.customMessage || ''
        const orgAddress = settings.organization?.address || DEFAULT_VALUES.organizationAddress
        const orgPhone = settings.organization?.phone || DEFAULT_VALUES.organizationPhone
        const orgEmail = settings.organization?.replyToEmail || DEFAULT_VALUES.organizationEmail
        const websiteUrl = settings.organization?.websiteUrl || DEFAULT_VALUES.websiteUrl

        await payload.sendEmail({
          to: contactData.email,
          subject: autoReplySubject,
          text: `
            Dear ${contactData.firstName},
            
            Thank you for reaching out to ${orgName}! We have received your message and appreciate your interest in our work.
            
            Your inquiry details:
            - Subject: ${contactData.subject}
            - Submission ID: ${contactData.id}
            - Submitted: ${new Date().toLocaleString()}
            
            Our team will review your message and get back to you within ${responseTime}. If you have an urgent inquiry, please feel free to call us at ${orgPhone} during business hours (Mon-Fri 9AM-6PM IST).
            
            ${customMessage ? customMessage + '\n\n' : ''}In the meantime, we encourage you to:
            - Visit our website to learn more about our programs: ${websiteUrl}
            - Follow us on social media for updates on our impact
            - Consider sponsoring a child to make a direct difference
            
            Thank you for your interest in supporting our mission to transform lives and communities.
            
            Best regards,
            The Light Lives Team
            
            ---
            ${orgName}
            ${orgAddress}
            Email: ${orgEmail}
            Phone: ${orgPhone}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting Us!</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <p>Dear ${contactData.firstName},</p>
                
                <p>Thank you for reaching out to <strong>${orgName}</strong>! We have received your message and appreciate your interest in our work.</p>
                
                <div style="background-color: #f8f9fc; padding: 15px; border-left: 4px solid ${primaryColor}; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: ${secondaryColor};">Your Inquiry Details</h3>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="padding: 5px 0;"><strong>Subject:</strong> ${contactData.subject}</li>
                    <li style="padding: 5px 0;"><strong>Submission ID:</strong> ${contactData.id}</li>
                    <li style="padding: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
                  </ul>
                </div>
                
                <p>Our team will review your message and get back to you within <strong>${responseTime}</strong>. If you have an urgent inquiry, please feel free to call us at <a href="tel:${orgPhone.replace(/\s/g, '')}" style="color: ${primaryColor};">${orgPhone}</a> during business hours (Mon-Fri 9AM-6PM IST).</p>
                
                ${customMessage ? `<div style="background-color: #fff; border: 2px solid ${primaryColor}; border-radius: 8px; padding: 15px; margin: 20px 0;"><p>${customMessage}</p></div>` : ''}
                
                <div style="background-color: #fff; border: 2px solid ${primaryColor}; border-radius: 8px; padding: 20px; margin: 25px 0;">
                  <h3 style="margin-top: 0; color: ${secondaryColor}; text-align: center;">In the meantime, we encourage you to:</h3>
                  <ul style="color: ${secondaryColor}; line-height: 1.6;">
                    <li>Visit our website to learn more about our programs: <a href="${websiteUrl}" style="color: ${primaryColor};">${websiteUrl.replace('https://', '')}</a></li>
                    <li>Follow us on social media for updates on our impact</li>
                    <li>Consider <a href="${websiteUrl}/sponsor" style="color: ${primaryColor};">sponsoring a child</a> to make a direct difference</li>
                  </ul>
                </div>
                
                <p>Thank you for your interest in supporting our mission to transform lives and communities.</p>
                
                <p style="margin-top: 30px;">
                  Best regards,<br>
                  <strong style="color: ${primaryColor};">The Light Lives Team</strong>
                </p>
              </div>
              
              <div style="background-color: ${secondaryColor}; color: white; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0; font-weight: bold;">${orgName}</p>
                <p style="margin: 5px 0; white-space: pre-line;">${orgAddress}</p>
                <p style="margin: 5px 0;">
                  Email: <a href="mailto:${orgEmail}" style="color: ${primaryColor};">${orgEmail}</a> | 
                  Phone: <a href="tel:${orgPhone.replace(/\s/g, '')}" style="color: ${primaryColor};">${orgPhone}</a>
                </p>
                <p style="margin-top: 10px; font-style: italic;">${settings.styling?.footerText || DEFAULT_VALUES.footerText}</p>
              </div>
            </div>
          `,
        })
      }

      console.log(`Contact form notification emails sent for ${contactData.firstName} ${contactData.lastName} (${contactData.email})`)
    
    } else if (type === 'career') {
      const careerData = data as CareerNotificationData
      const careerSettings = settings.careerEmails
      
      if (!careerSettings?.enabled) {
        console.log('Career application emails disabled in settings')
        return
      }

      // Send HR notification
      const hrEmail = careerSettings.hrEmail || DEFAULT_VALUES.hrEmail
      const recipients = buildRecipientsList(hrEmail, careerSettings.ccEmails)
      
      const primaryColor = settings.styling?.primaryColor || DEFAULT_VALUES.primaryColor
      const secondaryColor = settings.styling?.secondaryColor || DEFAULT_VALUES.secondaryColor
      const orgName = settings.organization?.name || DEFAULT_VALUES.organizationName
      const adminUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://lightlives.org'

      await payload.sendEmail({
        to: recipients,
        subject: `New Career Application: ${careerData.name}`,
        text: `
          A new career application has been submitted on ${orgName} website.
          
          Applicant Details:
          Name: ${careerData.name}
          Email: ${careerData.email}
          Mobile: ${careerData.mobile}
          Application ID: ${careerData.id}
          Submitted: ${new Date().toLocaleString()}
          
          Please log in to the admin panel to review the application and resume.
          Admin Panel: ${adminUrl}/admin
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: ${primaryColor};">New Career Application Received</h2>
            
            <p>A new career application has been submitted on ${orgName} website.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid ${primaryColor}; margin: 20px 0;">
              <h3 style="margin-top: 0; color: ${secondaryColor};">Applicant Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0; font-weight: bold; width: 100px;">Name:</td>
                  <td style="padding: 5px 0;">${careerData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 5px 0;"><a href="mailto:${careerData.email}" style="color: ${primaryColor};">${careerData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Mobile:</td>
                  <td style="padding: 5px 0;">${careerData.mobile}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Application ID:</td>
                  <td style="padding: 5px 0;">${careerData.id}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Submitted:</td>
                  <td style="padding: 5px 0;">${new Date().toLocaleString()}</td>
                </tr>
              </table>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${adminUrl}/admin/collections/career-applications/${careerData.id}" 
                 style="background-color: ${primaryColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                Review Application & Resume
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; text-align: center;">
              Application ID: ${careerData.id}<br>
              Submitted: ${new Date().toLocaleString()}<br>
              ${orgName} - Career Portal
            </p>
          </div>
        `,
      })

      // Send applicant auto-reply if enabled
      if (careerSettings.applicantAutoReply) {
        const autoReplySubject = careerSettings.applicantSubject || DEFAULT_VALUES.careerSubject
        const responseTime = careerSettings.reviewTime || DEFAULT_VALUES.careerResponseTime
        const customMessage = careerSettings.customApplicantMessage || ''
        const orgAddress = settings.organization?.address || DEFAULT_VALUES.organizationAddress
        const orgPhone = settings.organization?.phone || DEFAULT_VALUES.organizationPhone
        const orgEmail = settings.organization?.replyToEmail || DEFAULT_VALUES.organizationEmail
        const websiteUrl = settings.organization?.websiteUrl || DEFAULT_VALUES.websiteUrl

        await payload.sendEmail({
          to: careerData.email,
          subject: autoReplySubject,
          text: `
            Dear ${careerData.name},
            
            Thank you for your interest in joining ${orgName}! We have successfully received your career application.
            
            Application Details:
            - Name: ${careerData.name}
            - Email: ${careerData.email}
            - Mobile: ${careerData.mobile}
            - Application ID: ${careerData.id}
            - Submitted: ${new Date().toLocaleString()}
            
            Our HR team will review your application and get back to you within ${responseTime}. If your profile matches our current openings, we'll reach out to schedule an initial conversation.
            
            ${customMessage ? customMessage + '\n\n' : ''}In the meantime, feel free to:
            - Explore our work and impact at ${websiteUrl}
            - Follow us on social media for updates
            - Learn more about our mission and values
            
            If you have any questions about your application, please don't hesitate to reach out to us at ${orgEmail}
            
            Thank you for considering a career with us. We look forward to potentially welcoming you to our team!
            
            Best regards,
            The ${orgName} Team
            
            ---
            ${orgName}
            ${orgAddress}
            Email: ${orgEmail}
            Phone: ${orgPhone}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Application Received Successfully!</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <p>Dear ${careerData.name},</p>
                
                <p>Thank you for your interest in joining <strong>${orgName}</strong>! We have successfully received your career application.</p>
                
                <div style="background-color: #f8f9fc; padding: 15px; border-left: 4px solid ${primaryColor}; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: ${secondaryColor};">Application Details</h3>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="padding: 5px 0;"><strong>Name:</strong> ${careerData.name}</li>
                    <li style="padding: 5px 0;"><strong>Email:</strong> ${careerData.email}</li>
                    <li style="padding: 5px 0;"><strong>Mobile:</strong> ${careerData.mobile}</li>
                    <li style="padding: 5px 0;"><strong>Application ID:</strong> ${careerData.id}</li>
                    <li style="padding: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
                  </ul>
                </div>
                
                <p>Our HR team will review your application and get back to you within <strong>${responseTime}</strong>. If your profile matches our current openings, we'll reach out to schedule an initial conversation.</p>
                
                ${customMessage ? `<div style="background-color: #fff; border: 2px solid ${primaryColor}; border-radius: 8px; padding: 15px; margin: 20px 0;"><p>${customMessage}</p></div>` : ''}
                
                <div style="background-color: #fff; border: 2px solid ${primaryColor}; border-radius: 8px; padding: 20px; margin: 25px 0;">
                  <h3 style="margin-top: 0; color: ${secondaryColor}; text-align: center;">In the meantime, feel free to:</h3>
                  <ul style="color: ${secondaryColor}; line-height: 1.6;">
                    <li>Explore our work and impact at <a href="${websiteUrl}" style="color: ${primaryColor};">${websiteUrl.replace('https://', '')}</a></li>
                    <li>Follow us on social media for updates</li>
                    <li>Learn more about our mission and values</li>
                  </ul>
                </div>
                
                <p>If you have any questions about your application, please don't hesitate to reach out to us at <a href="mailto:${orgEmail}" style="color: ${primaryColor};">${orgEmail}</a></p>
                
                <p>Thank you for considering a career with us. We look forward to potentially welcoming you to our team!</p>
                
                <p style="margin-top: 30px;">
                  Best regards,<br>
                  <strong style="color: ${primaryColor};">The ${orgName} Team</strong>
                </p>
              </div>
              
              <div style="background-color: ${secondaryColor}; color: white; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0; font-weight: bold;">${orgName}</p>
                <p style="margin: 5px 0; white-space: pre-line;">${orgAddress}</p>
                <p style="margin: 5px 0;">
                  Email: <a href="mailto:${orgEmail}" style="color: ${primaryColor};">${orgEmail}</a> | 
                  Phone: <a href="tel:${orgPhone.replace(/\s/g, '')}" style="color: ${primaryColor};">${orgPhone}</a>
                </p>
                <p style="margin-top: 10px; font-style: italic;">${settings.styling?.footerText || DEFAULT_VALUES.footerText}</p>
              </div>
            </div>
          `,
        })
      }

      console.log(`Career application notification emails sent for ${careerData.name} (${careerData.email})`)
    
    } else if (type === 'csr') {
      const csrData = data as CSRInquiryNotificationData
      const contactSettings = settings.contactEmails // Reuse contact settings for CSR admin notifications
      
      if (!contactSettings?.enabled) {
        console.log('CSR inquiry emails disabled (contact settings disabled)')
        return
      }

      // Send admin notification
      const adminEmail = contactSettings.adminEmail || DEFAULT_VALUES.adminEmail
      const recipients = buildRecipientsList(adminEmail, contactSettings.ccEmails)
      
      const primaryColor = settings.styling?.primaryColor || DEFAULT_VALUES.primaryColor
      const secondaryColor = settings.styling?.secondaryColor || DEFAULT_VALUES.secondaryColor
      const orgName = settings.organization?.name || DEFAULT_VALUES.organizationName
      const adminUrl = process.env.PAYLOAD_PUBLIC_SERVER_URL || 'https://lightlives.org'

      // Format interests list
      const interestsList = csrData.interests.join(', ')
      const budgetLabel = csrData.budgetBand || 'Not specified'

      await payload.sendEmail({
        to: recipients,
        subject: `New CSR Partnership Inquiry: ${csrData.companyName}`,
        text: `
          A new CSR partnership inquiry has been received on ${orgName} website.
          
          Company Details:
          Company Name: ${csrData.companyName}
          Contact Person: ${csrData.contactFirstName} ${csrData.contactLastName}
          Email: ${csrData.email}
          Phone: ${csrData.phone || 'Not provided'}
          Location: ${csrData.location || 'Not provided'}
          
          Partnership Interest:
          Areas of Interest: ${interestsList}
          Budget Band: ${budgetLabel}
          
          Message:
          ${csrData.message}
          
          Inquiry ID: ${csrData.id}
          Submitted: ${new Date().toLocaleString()}
          
          Please log in to the admin panel to respond to this inquiry.
          Admin Panel: ${adminUrl}/admin
        `,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: ${primaryColor};">New CSR Partnership Inquiry</h2>
            
            <p>A new CSR partnership inquiry has been received on ${orgName} website.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid ${primaryColor}; margin: 20px 0;">
              <h3 style="margin-top: 0; color: ${secondaryColor};">Company Details</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0; font-weight: bold; width: 120px;">Company Name:</td>
                  <td style="padding: 5px 0;">${csrData.companyName}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Contact Person:</td>
                  <td style="padding: 5px 0;">${csrData.contactFirstName} ${csrData.contactLastName}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Email:</td>
                  <td style="padding: 5px 0;"><a href="mailto:${csrData.email}" style="color: ${primaryColor};">${csrData.email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Phone:</td>
                  <td style="padding: 5px 0;">${csrData.phone || 'Not provided'}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Location:</td>
                  <td style="padding: 5px 0;">${csrData.location || 'Not provided'}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-left: 4px solid ${secondaryColor}; margin: 20px 0;">
              <h3 style="margin-top: 0; color: ${secondaryColor};">Partnership Interest</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 5px 0; font-weight: bold; width: 120px;">Areas of Interest:</td>
                  <td style="padding: 5px 0;">${interestsList}</td>
                </tr>
                <tr>
                  <td style="padding: 5px 0; font-weight: bold;">Budget Band:</td>
                  <td style="padding: 5px 0;">${budgetLabel}</td>
                </tr>
              </table>
            </div>
            
            <div style="background-color: #fff; padding: 15px; border: 1px solid #ddd; margin: 20px 0;">
              <h3 style="margin-top: 0; color: ${secondaryColor};">Message</h3>
              <p style="white-space: pre-wrap; line-height: 1.5;">${csrData.message}</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${adminUrl}/admin/collections/csr-inquiries/${csrData.id}" 
                 style="background-color: ${primaryColor}; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
                View in Admin Panel
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            <p style="font-size: 12px; color: #666; text-align: center;">
              Inquiry ID: ${csrData.id}<br>
              Submitted: ${new Date().toLocaleString()}<br>
              ${orgName} - CSR Partnership System
            </p>
          </div>
        `,
      })

      // Send auto-reply to company contact
      if (contactSettings.autoReplyEnabled) {
        const orgAddress = settings.organization?.address || DEFAULT_VALUES.organizationAddress
        const orgPhone = settings.organization?.phone || DEFAULT_VALUES.organizationPhone
        const orgEmail = settings.organization?.replyToEmail || DEFAULT_VALUES.organizationEmail
        const websiteUrl = settings.organization?.websiteUrl || DEFAULT_VALUES.websiteUrl

        await payload.sendEmail({
          to: csrData.email,
          subject: `Thank you for your CSR partnership interest - ${orgName}`,
          text: `
            Dear ${csrData.contactFirstName},
            
            Thank you for ${csrData.companyName}'s interest in partnering with ${orgName}!
            
            We have received your CSR partnership inquiry and appreciate your commitment to creating positive social impact through corporate responsibility.
            
            Your inquiry details:
            - Company: ${csrData.companyName}
            - Areas of Interest: ${interestsList}
            - Budget Band: ${budgetLabel}
            - Inquiry ID: ${csrData.id}
            - Submitted: ${new Date().toLocaleString()}
            
            Our partnerships team will review your inquiry and get back to you within 24-48 hours to discuss how we can collaborate to create meaningful impact together.
            
            At Light Lives, we believe in long-term partnerships that go beyond traditional CSR. Through our HeadStart LEAD program and other initiatives, we offer opportunities for:
            - Direct community impact through leadership development
            - Employee volunteering and skill-building opportunities
            - Measurable outcomes and transparent reporting
            - Strategic alignment with your company's values and goals
            
            In the meantime, we encourage you to:
            - Explore our CSR partnership framework: ${websiteUrl}/csr
            - Learn more about our HeadStart LEAD program
            - Review our impact metrics and success stories
            
            If you have any urgent questions, please feel free to reach out to us at ${orgEmail} or call ${orgPhone}.
            
            We look forward to exploring partnership opportunities with ${csrData.companyName}!
            
            Best regards,
            The Light Lives Partnerships Team
            
            ---
            ${orgName}
            ${orgAddress}
            Email: ${orgEmail}
            Phone: ${orgPhone}
          `,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
              <div style="background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%); padding: 20px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Your Partnership Interest!</h1>
              </div>
              
              <div style="padding: 30px 20px;">
                <p>Dear ${csrData.contactFirstName},</p>
                
                <p>Thank you for <strong>${csrData.companyName}</strong>'s interest in partnering with <strong>${orgName}</strong>!</p>
                
                <p>We have received your CSR partnership inquiry and appreciate your commitment to creating positive social impact through corporate responsibility.</p>
                
                <div style="background-color: #f8f9fc; padding: 15px; border-left: 4px solid ${primaryColor}; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: ${secondaryColor};">Your Inquiry Details</h3>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    <li style="padding: 5px 0;"><strong>Company:</strong> ${csrData.companyName}</li>
                    <li style="padding: 5px 0;"><strong>Areas of Interest:</strong> ${interestsList}</li>
                    <li style="padding: 5px 0;"><strong>Budget Band:</strong> ${budgetLabel}</li>
                    <li style="padding: 5px 0;"><strong>Inquiry ID:</strong> ${csrData.id}</li>
                    <li style="padding: 5px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString()}</li>
                  </ul>
                </div>
                
                <p>Our partnerships team will review your inquiry and get back to you within <strong>24-48 hours</strong> to discuss how we can collaborate to create meaningful impact together.</p>
                
                <div style="background-color: #fff; border: 2px solid ${primaryColor}; border-radius: 8px; padding: 20px; margin: 25px 0;">
                  <h3 style="margin-top: 0; color: ${secondaryColor}; text-align: center;">Partnership Opportunities</h3>
                  <p>At Light Lives, we believe in long-term partnerships that go beyond traditional CSR. Through our HeadStart LEAD program and other initiatives, we offer opportunities for:</p>
                  <ul style="color: ${secondaryColor}; line-height: 1.6;">
                    <li>Direct community impact through leadership development</li>
                    <li>Employee volunteering and skill-building opportunities</li>
                    <li>Measurable outcomes and transparent reporting</li>
                    <li>Strategic alignment with your company's values and goals</li>
                  </ul>
                </div>
                
                <div style="background-color: #f8f9fc; border-left: 4px solid ${secondaryColor}; padding: 15px; margin: 20px 0;">
                  <h3 style="margin-top: 0; color: ${secondaryColor};">In the meantime, we encourage you to:</h3>
                  <ul style="line-height: 1.6;">
                    <li>Explore our CSR partnership framework: <a href="${websiteUrl}/csr" style="color: ${primaryColor};">${websiteUrl.replace('https://', '')}/csr</a></li>
                    <li>Learn more about our HeadStart LEAD program</li>
                    <li>Review our impact metrics and success stories</li>
                  </ul>
                </div>
                
                <p>If you have any urgent questions, please feel free to reach out to us at <a href="mailto:${orgEmail}" style="color: ${primaryColor};">${orgEmail}</a> or call <a href="tel:${orgPhone.replace(/\s/g, '')}" style="color: ${primaryColor};">${orgPhone}</a>.</p>
                
                <p>We look forward to exploring partnership opportunities with <strong>${csrData.companyName}</strong>!</p>
                
                <p style="margin-top: 30px;">
                  Best regards,<br>
                  <strong style="color: ${primaryColor};">The Light Lives Partnerships Team</strong>
                </p>
              </div>
              
              <div style="background-color: ${secondaryColor}; color: white; padding: 20px; text-align: center; font-size: 14px;">
                <p style="margin: 0; font-weight: bold;">${orgName}</p>
                <p style="margin: 5px 0; white-space: pre-line;">${orgAddress}</p>
                <p style="margin: 5px 0;">
                  Email: <a href="mailto:${orgEmail}" style="color: ${primaryColor};">${orgEmail}</a> | 
                  Phone: <a href="tel:${orgPhone.replace(/\s/g, '')}" style="color: ${primaryColor};">${orgPhone}</a>
                </p>
                <p style="margin-top: 10px; font-style: italic;">${settings.styling?.footerText || DEFAULT_VALUES.footerText}</p>
              </div>
            </div>
          `,
        })
      }

      console.log(`CSR inquiry notification emails sent for ${csrData.companyName} - ${csrData.contactFirstName} ${csrData.contactLastName} (${csrData.email})`)
    }
  } catch (error) {
    console.error(`Error sending ${type} notification emails:`, error)
    // Don't throw error to prevent blocking the document creation
  }
}
