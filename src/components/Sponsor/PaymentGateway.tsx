"use client";

import { useState } from "react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount?: number;
  currency?: string;
  name: string;
  description: string;
  order_id?: string;
  subscription_id?: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  notes: Record<string, string>;
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
  on: (event: string, callback: (response: PaymentError) => void) => void;
}

interface DonorInfo {
  firstName?: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  pan?: string;
}

interface RazorpayResponse {
  razorpay_order_id?: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  razorpay_subscription_id?: string;
}

interface VerificationResult {
  success: boolean;
  payment: Record<string, unknown>;
  message: string;
}

interface PaymentSuccessResponse extends RazorpayResponse {
  verificationResult: VerificationResult;
  donorInfo: DonorInfo;
  amount: number;
  paymentType: string;
}

interface PaymentError {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: Record<string, unknown>;
  };
}

export interface PaymentGatewayHook {
  handlePayment: () => Promise<void>;
  isProcessing: boolean;
}

interface PaymentGatewayProps {
  amount: number; // Amount in INR
  currency: string; // Currency code, e.g., "INR"
  paymentType: 'onetime' | 'recurring' | 'upi';
  donorInfo: DonorInfo;
  monthlyContribution?: boolean;
  privacyPolicy: boolean;
  onSuccess: (response: PaymentSuccessResponse) => void;
  onError: (error: Error) => void;
  onPaymentStart?: () => void;
}

const usePaymentGateway = ({
  amount,
  currency,
  paymentType,
  donorInfo,
  monthlyContribution,
  privacyPolicy,
  onSuccess,
  onError,
  onPaymentStart,
}: PaymentGatewayProps): PaymentGatewayHook => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => {
        setIsScriptLoaded(true);
        resolve(true);
      };
      script.onerror = () => reject(new Error("Razorpay SDK failed to load"));
      document.body.appendChild(script);
    });
  };

  const createOrder = async () => {
    try {
      // Generate receipt ID (max 40 chars per Razorpay requirement)
      // Format: DN_<base36_timestamp>_<email_prefix>
      const timestamp = Date.now().toString(36).toUpperCase();
      const emailPrefix = donorInfo.email.split('@')[0].substring(0, 15).toUpperCase();
      const receiptId = `DN_${timestamp}_${emailPrefix}`;
      
      const response = await fetch("/api/payments/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          amount, 
          currency,
          receipt: receiptId
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create order");
      }

      return await response.json();
    }
    catch (error) {
      throw error;
    }
  };

  const createSubscription = async () => {
    try {
      const response = await fetch("/api/payments/create-subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          amount,
          customerName: `${donorInfo.firstName || ''} ${donorInfo.lastName}`.trim(),
          customerEmail: donorInfo.email,
          customerPhone: donorInfo.phone,
          notify: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create subscription");
      }

      return await response.json();
    }
    catch (error) {
      throw error;
    }
  };

  const verifyPayment = async (paymentResponse: RazorpayResponse, subscriptionData?: Record<string, unknown>) => {
    try {
      const response = await fetch("/api/payments/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          razorpay_subscription_id: paymentResponse.razorpay_subscription_id,
          amount,
          currency,
          paymentType,
          firstName: donorInfo.firstName,
          lastName: donorInfo.lastName,
          email: donorInfo.email,
          phone: donorInfo.phone,
          address: donorInfo.address,
          pan: donorInfo.pan,
          monthlyContribution,
          privacyPolicy,
          // Include subscription data if available
          ...(subscriptionData && {
            planId: subscriptionData.plan_id,
            subscriptionQuantity: subscriptionData.quantity,
            subscriptionStatus: subscriptionData.status,
            totalCount: subscriptionData.total_count,
            paidCount: subscriptionData.paid_count,
            remainingCount: subscriptionData.remaining_count,
            startAt: subscriptionData.start_at,
            endAt: subscriptionData.end_at,
          }),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Payment verification failed");
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!privacyPolicy) {
      onError(new Error("Please agree to the privacy policy"));
      return;
    }

    setIsProcessing(true);
    onPaymentStart?.();

    try {
      if (!isScriptLoaded) {
        await loadRazorpayScript();
      }

      // For recurring payments, create subscription instead of order
      if (paymentType === 'recurring') {
        const subscription = await createSubscription();

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          subscription_id: subscription.id,
          name: "Light Lives",
          description: `Monthly Donation - ₹${amount}/month`,
          handler: async function (response: RazorpayResponse) {
            try {
              const verificationResult = await verifyPayment(response, subscription);
              onSuccess({
                ...response,
                verificationResult,
                donorInfo,
                amount,
                paymentType
              });
            } catch (error) {
              onError(error as Error);
            } finally {
              setIsProcessing(false);
            }
          },
          prefill: {
            name: `${donorInfo.firstName || ''} ${donorInfo.lastName}`.trim(),
            email: donorInfo.email,
            contact: donorInfo.phone,
          },
          notes: {
            payment_type: paymentType,
            donor_email: donorInfo.email,
            monthly_contribution: monthlyContribution?.toString() || 'false',
            subscription_amount: amount.toString(),
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: function() {
              setIsProcessing(false);
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        
        razorpay.on('payment.failed', function (response: PaymentError) {
          onError(new Error(`Payment failed: ${response.error.description}`));
          setIsProcessing(false);
        });

        razorpay.open();
      } else {
        // For one-time and UPI payments, create order as before
        const order = await createOrder();

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
          amount: order.amount,
          currency: order.currency,
          name: "Light Lives",
          description: paymentType === 'upi' ? "UPI Donation" : "One-time Donation",
          order_id: order.id,
          handler: async function (response: RazorpayResponse) {
            try {
              const verificationResult = await verifyPayment(response);
              onSuccess({
                ...response,
                verificationResult,
                donorInfo,
                amount,
                paymentType
              });
            } catch (error) {
              onError(error as Error);
            } finally {
              setIsProcessing(false);
            }
          },
          prefill: {
            name: `${donorInfo.firstName || ''} ${donorInfo.lastName}`.trim(),
            email: donorInfo.email,
            contact: donorInfo.phone,
          },
          notes: {
            payment_type: paymentType,
            donor_email: donorInfo.email,
            monthly_contribution: monthlyContribution?.toString() || 'false',
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: function() {
              setIsProcessing(false);
            }
          }
        };

        const razorpay = new window.Razorpay(options);
        
        razorpay.on('payment.failed', function (response: PaymentError) {
          onError(new Error(`Payment failed: ${response.error.description}`));
          setIsProcessing(false);
        });

        razorpay.open();
      }
    } catch (error) {
      onError(error as Error);
      setIsProcessing(false);
    }
  };

  return {
    handlePayment,
    isProcessing
  };
};

export default usePaymentGateway;