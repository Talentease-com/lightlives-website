import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Use service role client to bypass RLS for admin operations
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
    
    // Get payment statistics
    const { data: payments, error } = await supabase
      .from("payments")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(100);

    if (error) {
      throw error;
    }

    // Calculate statistics
    const totalDonations = payments?.reduce((sum, payment) => 
      payment.payment_status === 'completed' ? sum + (payment.amount || 0) : sum, 0) || 0;
    
    const totalCount = payments?.filter(p => p.payment_status === 'completed').length || 0;
    
    const recentDonations = payments?.filter(p => {
      const paymentDate = new Date(p.created_at);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return paymentDate >= thirtyDaysAgo && p.payment_status === 'completed';
    }) || [];

    const recurringDonors = payments?.filter(p => 
      p.payment_type === 'recurring' && p.payment_status === 'completed').length || 0;

    return NextResponse.json({
      statistics: {
        totalAmount: totalDonations,
        totalDonations: totalCount,
        recentDonations: recentDonations.length,
        recurringDonors,
        averageDonation: totalCount > 0 ? totalDonations / totalCount : 0,
      },
      recentPayments: payments?.slice(0, 20) || [],
    });

  } catch (error) {
    console.error("Error fetching payment dashboard data:", error);
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
