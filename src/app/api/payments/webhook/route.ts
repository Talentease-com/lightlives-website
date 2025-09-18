import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { SupabaseClient } from "@supabase/supabase-js";
import crypto from "crypto";

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
    // Use service role client to bypass RLS for server-side operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
    
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
        await handlePaymentCaptured(supabase, event.payload.payment.entity);
        break;
      
      case "payment.failed":
        await handlePaymentFailed(supabase, event.payload.payment.entity);
        break;
      
      case "order.paid":
        await handleOrderPaid(supabase, event.payload.order.entity);
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

async function handlePaymentCaptured(supabase: SupabaseClient, payment: RazorpayPayment) {
  try {
    const { error } = await supabase
      .from("payments")
      .update({
        payment_status: "completed",
        razorpay_payment_id: payment.id,
        updated_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", payment.order_id);

    if (error) {
      console.error("Error updating payment status:", error);
    } else {
      console.log(`Payment captured for order: ${payment.order_id}`);
      // TODO: Send confirmation email
      // TODO: Generate 80G certificate
    }
  } catch (error) {
    console.error("Error handling payment.captured:", error);
  }
}

async function handlePaymentFailed(supabase: SupabaseClient, payment: RazorpayPayment) {
  try {
    const { error } = await supabase
      .from("payments")
      .update({
        payment_status: "failed",
        updated_at: new Date().toISOString(),
      })
      .eq("razorpay_order_id", payment.order_id);

    if (error) {
      console.error("Error updating payment status:", error);
    } else {
      console.log(`Payment failed for order: ${payment.order_id}`);
      // TODO: Send failure notification email
    }
  } catch (error) {
    console.error("Error handling payment.failed:", error);
  }
}

async function handleOrderPaid(supabase: SupabaseClient, order: RazorpayOrder) {
  try {
    console.log(`Order paid: ${order.id}`);
    // Additional order-level processing if needed
  } catch (error) {
    console.error("Error handling order.paid:", error);
  }
}
