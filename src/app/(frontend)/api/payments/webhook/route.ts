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
  subscription_id?: string;
}

interface RazorpayOrder {
  id: string;
  status: string;
  amount: number;
  currency: string;
}

interface RazorpaySubscription {
  id: string;
  plan_id: string;
  status: string;
  quantity: number;
  total_count: number;
  paid_count: number;
  remaining_count: number;
  start_at?: number;
  end_at?: number;
  charge_at?: number;
  customer_email?: string;
  customer_name?: string;
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
      
      case "subscription.charged":
        await handleSubscriptionCharged(payload, event.payload.subscription.entity, event.payload.payment?.entity);
        break;
      
      case "subscription.activated":
        await handleSubscriptionActivated(payload, event.payload.subscription.entity);
        break;
      
      case "subscription.cancelled":
        await handleSubscriptionCancelled(payload, event.payload.subscription.entity);
        break;
      
      case "subscription.completed":
        await handleSubscriptionCompleted(payload, event.payload.subscription.entity);
        break;
      
      case "subscription.halted":
        await handleSubscriptionHalted(payload, event.payload.subscription.entity);
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

async function handleSubscriptionCharged(payload: Payload, subscription: RazorpaySubscription, payment?: RazorpayPayment) {
  try {
    // Find payment record by subscription ID
    const payments = await payload.find({
      collection: 'payments',
      where: {
        razorpaySubscriptionId: {
          equals: subscription.id,
        },
      },
      limit: 1,
    });

    if (payments.docs.length > 0) {
      const paymentDoc = payments.docs[0];
      
      // Update the payment record with subscription status
      const validStatus = ['created', 'authenticated', 'active', 'pending', 'halted', 'cancelled', 'completed', 'expired'].includes(subscription.status)
        ? subscription.status as 'created' | 'authenticated' | 'active' | 'pending' | 'halted' | 'cancelled' | 'completed' | 'expired'
        : 'active';
      
      await payload.update({
        collection: 'payments',
        id: paymentDoc.id,
        data: {
          paymentStatus: "completed",
          subscriptionStatus: validStatus,
          paidSubscriptionCount: subscription.paid_count,
          remainingSubscriptionCount: subscription.remaining_count,
          ...(payment && { razorpayPaymentId: payment.id }),
        },
      });
      
      console.log(`Subscription charged: ${subscription.id}, Payment: ${payment?.id || 'N/A'}`);
      
      // Send confirmation email for this billing cycle
      if (payment) {
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
            razorpayOrderId: payment.order_id || '',
            address: paymentDoc.address || undefined,
            panNumber: paymentDoc.panNumber || undefined,
            isRecurring: true,
            id: String(paymentDoc.id),
          });
          console.log(`Subscription charge email sent for: ${subscription.id}`);
        } catch (emailError) {
          console.error("Failed to send subscription charge emails:", emailError);
        }
      }
    } else {
      console.error(`Payment record not found for subscription: ${subscription.id}`);
    }
  } catch (error) {
    console.error("Error handling subscription.charged:", error);
  }
}

async function handleSubscriptionActivated(payload: Payload, subscription: RazorpaySubscription) {
  try {
    const payments = await payload.find({
      collection: 'payments',
      where: {
        razorpaySubscriptionId: {
          equals: subscription.id,
        },
      },
      limit: 1,
    });

    if (payments.docs.length > 0) {
      await payload.update({
        collection: 'payments',
        id: payments.docs[0].id,
        data: {
          subscriptionStatus: "active",
          subscriptionStartDate: subscription.start_at ? new Date(subscription.start_at * 1000).toISOString() : null,
        },
      });
      
      console.log(`Subscription activated: ${subscription.id}`);
    }
  } catch (error) {
    console.error("Error handling subscription.activated:", error);
  }
}

async function handleSubscriptionCancelled(payload: Payload, subscription: RazorpaySubscription) {
  try {
    const payments = await payload.find({
      collection: 'payments',
      where: {
        razorpaySubscriptionId: {
          equals: subscription.id,
        },
      },
      limit: 1,
    });

    if (payments.docs.length > 0) {
      await payload.update({
        collection: 'payments',
        id: payments.docs[0].id,
        data: {
          subscriptionStatus: "cancelled",
          paymentStatus: "cancelled",
        },
      });
      
      console.log(`Subscription cancelled: ${subscription.id}`);
      // TODO: Send cancellation notification email
    }
  } catch (error) {
    console.error("Error handling subscription.cancelled:", error);
  }
}

async function handleSubscriptionCompleted(payload: Payload, subscription: RazorpaySubscription) {
  try {
    const payments = await payload.find({
      collection: 'payments',
      where: {
        razorpaySubscriptionId: {
          equals: subscription.id,
        },
      },
      limit: 1,
    });

    if (payments.docs.length > 0) {
      await payload.update({
        collection: 'payments',
        id: payments.docs[0].id,
        data: {
          subscriptionStatus: "completed",
          subscriptionEndDate: subscription.end_at ? new Date(subscription.end_at * 1000).toISOString() : null,
        },
      });
      
      console.log(`Subscription completed: ${subscription.id}`);
      // TODO: Send completion/thank you email
    }
  } catch (error) {
    console.error("Error handling subscription.completed:", error);
  }
}

async function handleSubscriptionHalted(payload: Payload, subscription: RazorpaySubscription) {
  try {
    const payments = await payload.find({
      collection: 'payments',
      where: {
        razorpaySubscriptionId: {
          equals: subscription.id,
        },
      },
      limit: 1,
    });

    if (payments.docs.length > 0) {
      await payload.update({
        collection: 'payments',
        id: payments.docs[0].id,
        data: {
          subscriptionStatus: "halted",
        },
      });
      
      console.log(`Subscription halted: ${subscription.id}`);
      // TODO: Send notification email to retry payment
    }
  } catch (error) {
    console.error("Error handling subscription.halted:", error);
  }
}
