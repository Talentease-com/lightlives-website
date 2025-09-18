import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

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

    // Insert payment record into database
    const { data, error } = await supabase
      .from("payments")
      .insert({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        amount: parseFloat(amount),
        currency: currency || "INR",
        payment_type: paymentType,
        payment_status: "completed",
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        address: address || null,
        pan_number: pan || null,
        is_recurring: paymentType === "recurring",
        monthly_contribution_agreed: monthlyContribution || false,
        privacy_policy_agreed: privacyPolicy || false,
        ip_address: ip,
        user_agent: userAgent
      })
      .select()
      .single();

    if (error) {
      console.error("Database error:", error);
      return NextResponse.json(
        { error: "Database Error, Failed to save payment record, If money has been deposited, contact support" },
        { status: 500 }
      );
    }

    // TODO: Send confirmation email to donor
    // TODO: Generate 80G certificate if applicable

    return NextResponse.json({
      success: true,
      payment: data,
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
