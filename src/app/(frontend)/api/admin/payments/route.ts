import { getPayload } from "payload";
import config from "@/payload.config";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Get Payload instance
    const payload = await getPayload({ config });
    
    // Get payment statistics
    const paymentsResult = await payload.find({
      collection: 'payments',
      limit: 100,
      sort: '-createdAt',
    });

    const payments = paymentsResult.docs;

    // Calculate statistics
    const totalDonations = payments?.reduce((sum: number, payment) => 
      payment.paymentStatus === 'completed' ? sum + (payment.amount || 0) : sum, 0) || 0;
    
    const totalCount = payments?.filter(p => p.paymentStatus === 'completed').length || 0;
    
    const recentDonations = payments?.filter(p => {
      const paymentDate = new Date(p.createdAt);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return paymentDate >= thirtyDaysAgo && p.paymentStatus === 'completed';
    }) || [];

    const recurringDonors = payments?.filter(p => 
      p.paymentType === 'recurring' && p.paymentStatus === 'completed').length || 0;

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
