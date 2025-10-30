import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import crypto from "crypto";
import { sendNotificationEmails } from "@/lib/emailHelpers";

export async function POST(request: NextRequest) {
  try {
    // Get Payload instance
    const payload = await getPayload({ config });
    
    const body = await request.json();
    
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      currency,
      paymentType,
      firstName,
      lastName,
      email,
      phone,
      address,
      pan,
      monthlyContribution,
      privacyPolicy
    } = body;

    // Verify the payment signature
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }

    // Get client IP and user agent for audit trail
    const ip = request.headers.get("x-forwarded-for") || 
               request.headers.get("x-real-ip") || 
               "unknown";
    const userAgent = request.headers.get("user-agent") || "unknown";

    // Insert payment record into Payload CMS
    const paymentData = await payload.create({
      collection: 'payments',
      data: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        amount: parseFloat(amount),
        currency: currency || "INR",
        paymentType,
        paymentStatus: "completed",
        firstName,
        lastName,
        email,
        phone,
        address: address || null,
        panNumber: pan || null,
        isRecurring: paymentType === "recurring",
        monthlyContributionAgreed: monthlyContribution || false,
        privacyPolicyAgreed: privacyPolicy || false,
        ipAddress: ip,
        userAgent: userAgent
      }
    });

    // Send confirmation email to donor and notification to admin
    try {
      await sendNotificationEmails(payload, 'donation', {
        firstName: firstName || undefined,
        lastName: lastName,
        email: email,
        phone: phone,
        amount: parseFloat(amount),
        currency: currency || "INR",
        paymentType: paymentType,
        receiptNumber: paymentData.receiptNumber || 'N/A',
        razorpayPaymentId: razorpay_payment_id,
        razorpayOrderId: razorpay_order_id,
        address: address || undefined,
        panNumber: pan || undefined,
        isRecurring: paymentType === "recurring",
        id: String(paymentData.id),
      });
    } catch (emailError) {
      // Log email error but don't fail the payment verification
      console.error("Failed to send donation emails:", emailError);
    }

    // TODO: Generate 80G certificate if applicable

    return NextResponse.json({
      success: true,
      payment: paymentData,
      message: "Payment verified and recorded successfully"
    });

  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
