import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

// Your plan ID for ₹100/month
const MONTHLY_PLAN_ID = "plan_RfafdSHmGikUtb";

// Base plan amount (₹100 per unit)
const PLAN_UNIT_AMOUNT = 100;

// Razorpay allows max 500 units per subscription
const MAX_QUANTITY = 500;
const MAX_AMOUNT = MAX_QUANTITY * PLAN_UNIT_AMOUNT; // ₹50,000

export async function POST(request: NextRequest) {
  try {
    const { amount, customerName, customerEmail, notify = 1 } = await request.json();

    // Validation
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount. Amount must be greater than 0" },
        { status: 400 }
      );
    }

    // Validate maximum amount (Razorpay limit: 500 units max)
    if (amount > MAX_AMOUNT) {
      return NextResponse.json(
        { error: `Amount cannot exceed ₹${MAX_AMOUNT.toLocaleString()} for monthly subscriptions (Razorpay limit: ${MAX_QUANTITY} units)` },
        { status: 400 }
      );
    }

    if (!customerEmail) {
      return NextResponse.json(
        { error: "Customer email is required" },
        { status: 400 }
      );
    }

    // Validate that amount is a multiple of ₹100
    if (amount % PLAN_UNIT_AMOUNT !== 0) {
      return NextResponse.json(
        { error: `Amount must be a multiple of ₹${PLAN_UNIT_AMOUNT}` },
        { status: 400 }
      );
    }

    // Calculate quantity (amount / ₹100 = quantity of ₹100 plan)
    const quantity = Math.round(amount / PLAN_UNIT_AMOUNT);

    const subscriptionOptions = {
      plan_id: MONTHLY_PLAN_ID,
      quantity: quantity,
      customer_notify: notify,
      total_count: 12, // 12 months = 1 year, adjust as needed or make configurable
      notes: {
        customer_name: customerName || '',
        customer_email: customerEmail,
        monthly_amount: amount,
      },
    };

    console.log('Creating Razorpay subscription with options:', subscriptionOptions);

    const subscription = await razorpay.subscriptions.create(subscriptionOptions);

    console.log('Razorpay subscription created successfully:', subscription.id);

    return NextResponse.json({
      id: subscription.id,
      plan_id: subscription.plan_id,
      quantity: subscription.quantity,
      status: subscription.status,
      customer_notify: subscription.customer_notify,
      start_at: subscription.start_at,
      end_at: subscription.end_at,
      total_count: subscription.total_count,
      paid_count: subscription.paid_count,
      remaining_count: subscription.remaining_count,
      short_url: subscription.short_url,
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating Razorpay subscription:", error);
    
    // Handle specific Razorpay errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid key_id')) {
        return NextResponse.json(
          { error: "Payment service configuration error" },
          { status: 500 }
        );
      }
      if (error.message.includes('Invalid plan_id')) {
        return NextResponse.json(
          { error: "Invalid subscription plan" },
          { status: 400 }
        );
      }
      if (error.message.includes('quantity')) {
        return NextResponse.json(
          { error: "Invalid subscription quantity" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create subscription. Please try again." },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    message: "Subscription creation API is running",
    timestamp: new Date().toISOString(),
    plan_id: MONTHLY_PLAN_ID,
    razorpay_configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  });
}
