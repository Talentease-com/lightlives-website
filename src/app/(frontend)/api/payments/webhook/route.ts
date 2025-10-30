import { NextRequest, NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@/payload.config";
import type { Payload } from "payload";
import crypto from "crypto";
import { sendNotificationEmails } from "@/lib/emailHelpers";

interface RazorpayPayment {
  id: string;
  order_id: string;
  status: string;
  amount: number;
  currency: string;
}

interface RazorpayOrder {
  id: string;
  status: string;
  amount: number;
  currency: string;
}

export async function POST(request: NextRequest) {
  try {
    // Get Payload instance
    const payload = await getPayload({ config });
    
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing signature" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    const webhookSecret = process.env.WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("Webhook secret not configured");
      return NextResponse.json(
        { error: "Webhook not configured" },
        { status: 500 }
      );
    }

    const generatedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(body)
      .digest("hex");

    if (generatedSignature !== signature) {
      console.error("Invalid webhook signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const event = JSON.parse(body);
    console.log("Razorpay webhook event:", event.event);

    // Handle different webhook events
    switch (event.event) {
      case "payment.captured":
        await handlePaymentCaptured(payload, event.payload.payment.entity);
        break;
      
      case "payment.failed":
        await handlePaymentFailed(payload, event.payload.payment.entity);
        break;
      
      case "order.paid":
        await handleOrderPaid(payload, event.payload.order.entity);
        break;
      
      default:
        console.log(`Unhandled webhook event: ${event.event}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

async function handlePaymentCaptured(payload: Payload, payment: RazorpayPayment) {
  try {
    // Find payment by razorpay order ID
    const payments = await payload.find({
      collection: 'payments',
      where: {
        razorpayOrderId: {
          equals: payment.order_id,
        },
      },
      limit: 1,
    });

    if (payments.docs.length > 0) {
      const paymentDoc = payments.docs[0];
      
      await payload.update({
        collection: 'payments',
        id: paymentDoc.id,
        data: {
          paymentStatus: "completed",
          razorpayPaymentId: payment.id,
        },
      });
      
      console.log(`Payment captured for order: ${payment.order_id}`);
      
      // Send confirmation email to donor and notification to admin
      try {
        await sendNotificationEmails(payload, 'donation', {
          firstName: paymentDoc.firstName || undefined,
          lastName: paymentDoc.lastName,
          email: paymentDoc.email,
          phone: paymentDoc.phone,
          amount: paymentDoc.amount,
          currency: paymentDoc.currency,
          paymentType: paymentDoc.paymentType,
          receiptNumber: paymentDoc.receiptNumber || 'N/A',
          razorpayPaymentId: payment.id,
          razorpayOrderId: payment.order_id,
          address: paymentDoc.address || undefined,
          panNumber: paymentDoc.panNumber || undefined,
          isRecurring: paymentDoc.isRecurring || false,
          id: String(paymentDoc.id),
        });
        console.log(`Donation emails sent for payment: ${payment.order_id}`);
      } catch (emailError) {
        console.error("Failed to send donation emails:", emailError);
      }
      
      // TODO: Generate 80G certificate
    } else {
      console.error(`Payment record not found for order: ${payment.order_id}`);
    }
  } catch (error) {
    console.error("Error handling payment.captured:", error);
  }
}

async function handlePaymentFailed(payload: Payload, payment: RazorpayPayment) {
  try {
    // Find payment by razorpay order ID
    const payments = await payload.find({
      collection: 'payments',
      where: {
        razorpayOrderId: {
          equals: payment.order_id,
        },
      },
      limit: 1,
    });

    if (payments.docs.length > 0) {
      await payload.update({
        collection: 'payments',
        id: payments.docs[0].id,
        data: {
          paymentStatus: "failed",
        },
      });
      
      console.log(`Payment failed for order: ${payment.order_id}`);
      // TODO: Send failure notification email
    } else {
      console.error(`Payment record not found for order: ${payment.order_id}`);
    }
  } catch (error) {
    console.error("Error handling payment.failed:", error);
  }
}

async function handleOrderPaid(payload: Payload, order: RazorpayOrder) {
  try {
    console.log(`Order paid: ${order.id}`);
    // Additional order-level processing if needed
  } catch (error) {
    console.error("Error handling order.paid:", error);
  }
}
