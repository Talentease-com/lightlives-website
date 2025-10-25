import type { CollectionAfterChangeHook } from 'payload'
import { getEmailSettings, DEFAULT_VALUES } from '@/lib/emailHelpers'

export const sendWelcomeEmail: CollectionAfterChangeHook = async ({
  doc, // the document that was just changed
  req, // the original request
  operation, // 'create' or 'update'
}) => {
  // Only send welcome email on create and if status is active
  if (operation !== 'create' || doc.status !== 'active') {
    return doc
  }

  try {
    const settings = await getEmailSettings(req.payload)
    
    const primaryColor = settings.styling?.primaryColor || DEFAULT_VALUES.primaryColor
    const secondaryColor = settings.styling?.secondaryColor || DEFAULT_VALUES.secondaryColor
    const orgName = settings.organization?.name || DEFAULT_VALUES.organizationName
    const orgAddress = settings.organization?.address || DEFAULT_VALUES.organizationAddress
    const orgPhone = settings.organization?.phone || DEFAULT_VALUES.organizationPhone
    const replyToEmail = settings.organization?.replyToEmail || DEFAULT_VALUES.organizationEmail
    const websiteUrl = settings.organization?.websiteUrl || DEFAULT_VALUES.websiteUrl

    await req.payload.sendEmail({
      to: doc.email,
      from: `Leo Fernandez <noreply@lightlives.org>`,
      replyTo: replyToEmail,
      subject: 'Welcome to the Light Lives Family! 🌟',
      text: `
        Dear Friend,

        Welcome to the Light Lives family! We're thrilled to have you join our community of changemakers who believe in empowering children with essential life skills and values for a brighter tomorrow.

        As a subscriber, you'll be the first to know about:
        ✨ The inspiring stories of children whose lives we're transforming
        📢 Updates on our programs and their impact in communities
        🎉 Upcoming events, workshops, and volunteer opportunities
        💡 Ways you can get involved and make a difference
        🎁 Exclusive insights from our team on the ground

        At Light Lives, we believe that every child deserves the opportunity to grow into a confident, capable, and compassionate individual. Your interest in our work means the world to us, and together, we're building a generation that will light up the world.

        Here's how you can take your support to the next level:

        🤝 Sponsor a Child
        Make a direct impact by sponsoring a child's education and development
        Visit: ${websiteUrl}/sponsor

        👥 Volunteer With Us
        Share your time and skills to mentor and inspire children
        Learn more: ${websiteUrl}/support/join

        🤝 Partner With Us
        Explore CSR and corporate partnership opportunities
        Contact us: ${replyToEmail}

        📱 Stay Connected
        Follow us on social media for daily updates and stories that inspire

        Thank you for believing in our mission. Every child we reach, every life we transform, happens because of supporters like you.

        Together, we're not just changing lives—we're lighting them up! ✨

        With gratitude and warm regards,

        Leo Fernandez
        Managing Trustee
        Light Lives

        ---
        ${orgName}
        ${orgAddress}
        Phone: ${orgPhone}
        Email: ${replyToEmail}
        Website: ${websiteUrl}

        P.S. You can unsubscribe from these emails at any time by clicking the unsubscribe link in any of our emails. We respect your inbox and promise to only send you meaningful updates.
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff;">
          <!-- Header Banner -->
          <div style="background: linear-gradient(135deg, ${primaryColor} 0%, ${secondaryColor} 100%); padding: 40px 20px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Welcome to the Light Lives Family! 🌟</h1>
          </div>
          
          <!-- Main Content -->
          <div style="padding: 40px 30px;">
            <p style="font-size: 16px; line-height: 1.6; color: #333;">Dear Friend,</p>
            
            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              Welcome to the <strong style="color: ${primaryColor};">Light Lives</strong> family! We're thrilled to have you join our community of changemakers who believe in empowering children with essential life skills and values for a brighter tomorrow.
            </p>

            <!-- What to Expect Box -->
            <div style="background-color: #f8f9fc; border-left: 4px solid ${primaryColor}; padding: 20px; margin: 30px 0; border-radius: 0;">
              <h2 style="color: ${secondaryColor}; margin-top: 0; font-size: 20px;">As a subscriber, you'll be the first to know about:</h2>
              <ul style="color: #333; line-height: 1.8; margin: 15px 0;">
                <li>✨ The inspiring stories of children whose lives we're transforming</li>
                <li>📢 Updates on our programs and their impact in communities</li>
                <li>🎉 Upcoming events, workshops, and volunteer opportunities</li>
                <li>💡 Ways you can get involved and make a difference</li>
                <li>🎁 Exclusive insights from our team on the ground</li>
              </ul>
            </div>

            <p style="font-size: 16px; line-height: 1.6; color: #333;">
              At Light Lives, we believe that every child deserves the opportunity to grow into a confident, capable, and compassionate individual. Your interest in our work means the world to us, and together, we're building a generation that will light up the world.
            </p>

            <!-- Call-to-Action Section -->
            <div style="background: linear-gradient(135deg, ${primaryColor}15 0%, ${secondaryColor}15 100%); padding: 30px; margin: 30px 0; border-radius: 0; border: 2px solid ${primaryColor};">
              <h2 style="color: ${secondaryColor}; margin-top: 0; font-size: 22px; text-align: center;">Here's how you can take your support to the next level:</h2>
              
              <!-- CTA Grid -->
              <div style="margin-top: 25px;">
                <!-- Sponsor a Child -->
                <div style="margin-bottom: 20px; padding: 15px; background-color: white; border-left: 3px solid ${primaryColor};">
                  <h3 style="color: ${primaryColor}; margin: 0 0 10px 0; font-size: 18px;">🤝 Sponsor a Child</h3>
                  <p style="margin: 0 0 10px 0; color: #555; font-size: 14px;">Make a direct impact by sponsoring a child's education and development</p>
                  <a href="${websiteUrl}/sponsor" style="color: ${primaryColor}; text-decoration: none; font-weight: bold; font-size: 14px;">Visit: ${websiteUrl}/sponsor →</a>
                </div>

                <!-- Volunteer -->
                <div style="margin-bottom: 20px; padding: 15px; background-color: white; border-left: 3px solid ${primaryColor};">
                  <h3 style="color: ${primaryColor}; margin: 0 0 10px 0; font-size: 18px;">👥 Volunteer With Us</h3>
                  <p style="margin: 0 0 10px 0; color: #555; font-size: 14px;">Share your time and skills to mentor and inspire children</p>
                  <a href="${websiteUrl}/support/join" style="color: ${primaryColor}; text-decoration: none; font-weight: bold; font-size: 14px;">Learn more: ${websiteUrl}/support/join →</a>
                </div>

                <!-- Partner -->
                <div style="margin-bottom: 20px; padding: 15px; background-color: white; border-left: 3px solid ${primaryColor};">
                  <h3 style="color: ${primaryColor}; margin: 0 0 10px 0; font-size: 18px;">🤝 Partner With Us</h3>
                  <p style="margin: 0 0 10px 0; color: #555; font-size: 14px;">Explore CSR and corporate partnership opportunities</p>
                  <a href="mailto:${replyToEmail}" style="color: ${primaryColor}; text-decoration: none; font-weight: bold; font-size: 14px;">Contact us: ${replyToEmail} →</a>
                </div>

                <!-- Social -->
                <div style="padding: 15px; background-color: white; border-left: 3px solid ${primaryColor};">
                  <h3 style="color: ${primaryColor}; margin: 0 0 10px 0; font-size: 18px;">📱 Stay Connected</h3>
                  <p style="margin: 0; color: #555; font-size: 14px;">Follow us on social media for daily updates and stories that inspire</p>
                </div>
              </div>
            </div>

            <!-- Closing Message -->
            <p style="font-size: 16px; line-height: 1.6; color: #333; margin-top: 30px;">
              Thank you for believing in our mission. Every child we reach, every life we transform, happens because of supporters like you.
            </p>

            <div style="background-color: ${primaryColor}15; padding: 20px; margin: 25px 0; text-align: center; border-radius: 0;">
              <p style="font-size: 18px; font-weight: bold; color: ${secondaryColor}; margin: 0;">
                Together, we're not just changing lives—we're lighting them up! ✨
              </p>
            </div>

            <!-- Signature -->
            <div style="margin-top: 40px; border-top: 2px solid #eee; padding-top: 20px;">
              <p style="font-size: 16px; line-height: 1.6; color: #333; margin: 5px 0;">
                With gratitude and warm regards,
              </p>
              <p style="font-size: 18px; font-weight: bold; color: ${primaryColor}; margin: 10px 0;">
                Leo Fernandez
              </p>
              <p style="font-size: 14px; color: #666; margin: 5px 0;">
                Managing Trustee<br>
                <strong style="color: ${secondaryColor};">Light Lives</strong>
              </p>
            </div>
          </div>
          
          <!-- Footer -->
          <div style="background-color: ${secondaryColor}; color: white; padding: 30px 20px; text-align: center; font-size: 13px;">
            <p style="margin: 0; font-weight: bold; font-size: 16px;">${orgName}</p>
            <p style="margin: 10px 0; white-space: pre-line; line-height: 1.5;">${orgAddress}</p>
            <p style="margin: 10px 0;">
              Phone: <a href="tel:${orgPhone.replace(/\s/g, '')}" style="color: ${primaryColor}; text-decoration: none;">${orgPhone}</a><br>
              Email: <a href="mailto:${replyToEmail}" style="color: ${primaryColor}; text-decoration: none;">${replyToEmail}</a><br>
              Website: <a href="${websiteUrl}" style="color: ${primaryColor}; text-decoration: none;">${websiteUrl.replace('https://', '')}</a>
            </p>
            <p style="margin: 20px 0 10px 0; font-style: italic; color: ${primaryColor};">
              ${settings.styling?.footerText || DEFAULT_VALUES.footerText}
            </p>
            <p style="margin: 15px 0 0 0; font-size: 11px; color: #ccc; line-height: 1.5;">
              You're receiving this email because you subscribed to our newsletter.<br>
              You can unsubscribe at any time by clicking the unsubscribe link in any of our emails.
            </p>
          </div>
        </div>
      `,
    })

    console.log(`Welcome email sent to newsletter subscriber: ${doc.email}`)
  } catch (error) {
    console.error('Error sending welcome email to newsletter subscriber:', error)
    // Don't throw error to prevent blocking the document creation
  }

  return doc
}
