import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = "INR", receipt } = await request.json();

    // Validation
    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount. Amount must be greater than 0" },
        { status: 400 }
      );
    }

    if (!receipt) {
      return NextResponse.json(
        { error: "Receipt is required" },
        { status: 400 }
      );
    }

    // Convert amount to smallest currency unit (paise for INR)
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: currency.toUpperCase(),
      receipt: receipt,
      payment_capture: 1, // Auto capture payment
    };

    console.log('Creating Razorpay order with options:', options);

    const order = await razorpay.orders.create(options);

    console.log('Razorpay order created successfully:', order.id);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    
    // Handle specific Razorpay errors
    if (error instanceof Error) {
      if (error.message.includes('Invalid key_id')) {
        return NextResponse.json(
          { error: "Payment service configuration error" },
          { status: 500 }
        );
      }
      if (error.message.includes('Invalid amount')) {
        return NextResponse.json(
          { error: "Invalid amount specified" },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { error: "Failed to create payment order. Please try again." },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    message: "Payment order API is running",
    timestamp: new Date().toISOString(),
    razorpay_configured: !!(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET)
  });
}