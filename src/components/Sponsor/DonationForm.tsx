'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Heart, CreditCard, Calendar, Smartphone, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import usePaymentGateway, { type PaymentGatewayHook } from './PaymentGateway';
import { validatePhone, validateEmail, validateName, validatePAN, validateAmount, validateAddress } from '@/lib/validationUtils';

interface DonationFormProps {
  className?: string;
}

interface FormData {
  firstName?: string;
  lastName: string;
  email: string;
  phone: string;
  address?: string;
  pan?: string;
  upiAmount?: number;
  monthlyContribution?: boolean;
  privacyPolicy: boolean;
}

type PaymentStatus = 'idle' | 'processing' | 'success' | 'error';

const DonationForm: React.FC<DonationFormProps> = ({ className = '' }) => {
  const [paymentType, setPaymentType] = useState<'onetime' | 'recurring' | 'upi'>('onetime');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [receiptNumber, setReceiptNumber] = useState('');

  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormData>();

  const oneTimeAmounts = [2000, 5000, 10000, 20000, 40000];
  const monthlyAmounts = [500, 1000, 1200, 1500, 2000];

  // Watch form values for payment gateway
  const formValues = watch();

  // Get the final amount to be paid
  const getFinalAmount = (): number => {
    if (paymentType === 'upi') {
      return formValues.upiAmount || 1000;
    }
    return selectedAmount || parseInt(customAmount) || 0;
  };

  // Payment gateway integration
  const paymentGateway: PaymentGatewayHook = usePaymentGateway({
    amount: getFinalAmount(),
    currency: 'INR',
    paymentType,
    donorInfo: {
      firstName: formValues.firstName,
      lastName: formValues.lastName || '',
      email: formValues.email || '',
      phone: formValues.phone || '',
      address: formValues.address,
      pan: formValues.pan,
    },
    monthlyContribution: formValues.monthlyContribution,
    privacyPolicy: formValues.privacyPolicy || false,
    onSuccess: (response) => {
      setPaymentStatus('success');
      setStatusMessage('Payment successful! Thank you for your generous donation.');
      setReceiptNumber(String(response.verificationResult.payment.receipt_number || ''));
      console.log('Payment successful:', response);
    },
    onError: (error) => {
      setPaymentStatus('error');
      setStatusMessage(`Payment failed: ${error.message}`);
      console.error('Payment error:', error);
    },
    onPaymentStart: () => {
      setPaymentStatus('processing');
      setStatusMessage('Processing your payment...');
    },
  });

  const onSubmit = async (data: FormData) => {
    console.log('Form submitted:', { ...data, paymentType, amount: getFinalAmount() });
    
    if (paymentType === 'upi') {
      setShowQR(true);
      return;
    }

    // Validate amount
    const amount = getFinalAmount();
    if (!amount || amount <= 0) {
      setPaymentStatus('error');
      setStatusMessage('Please select or enter a valid amount');
      return;
    }

    // Validate required fields
    if (!data.lastName || !data.email || !data.phone || !data.privacyPolicy) {
      setPaymentStatus('error');
      setStatusMessage('Please fill in all required fields');
      return;
    }

    // For non-UPI payments, validate additional fields
    if ((paymentType === 'onetime' || paymentType === 'recurring') && (!data.address || !data.pan)) {
      setPaymentStatus('error');
      setStatusMessage('Address and PAN are required for tax certificate generation');
      return;
    }

    // For recurring payments, validate monthly contribution agreement
    if (paymentType === 'recurring' && !data.monthlyContribution) {
      setPaymentStatus('error');
      setStatusMessage('Please agree to contribute monthly for recurring donations');
      return;
    }

    // Proceed with payment
    try {
      await paymentGateway.handlePayment();
    } catch {
      setPaymentStatus('error');
      setStatusMessage('Failed to initiate payment. Please try again.');
    }
  };

  const renderAmountButtons = (amounts: number[]) => (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
      {amounts.map((amount) => (
        <button
          key={amount}
          type="button"
          onClick={() => {
            setSelectedAmount(amount);
            setCustomAmount('');
          }}
          className={`p-3 font-semibold transition-all duration-200 bg-secondary ${
            selectedAmount === amount
              ? 'bg-tertiary text-white'
              : 'text-tertiary-700'
          }`}
          style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
        >
          ₹{amount.toLocaleString()}
        </button>
      ))}
    </div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className={`px-8 relative ${className}`}
    >
      {/* <h2 className="text-3xl font-bold text-tertiary mb-6">Make a Donation</h2> */}

      {/* Payment Type Tabs */}
      <div className="flex space-x-1 bg-secondary p-1 mb-8 rounded-none z-10">
        <button
          type="button"
          onClick={() => setPaymentType('onetime')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 font-medium transition-all duration-200 bg-secondary ${
            paymentType === 'onetime'
              ? 'bg-tertiary text-white'
              : 'text-tertiary-700'
          }`}
          style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
        >
          <CreditCard className="h-4 w-4" />
          <span>One Time</span>
        </button>
        <button
          type="button"
          onClick={() => setPaymentType('recurring')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 font-medium transition-all duration-200 bg-secondary ${
            paymentType === 'recurring'
              ? 'bg-tertiary text-white'
              : 'text-tertiary-700'
          }`}
          style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
        >
          <Calendar className="h-4 w-4" />
          <span>Monthly</span>
        </button>
        <button
          type="button"
          onClick={() => setPaymentType('upi')}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 font-medium transition-all duration-200 bg-secondary ${
            paymentType === 'upi'
              ? 'bg-tertiary text-white'
              : 'text-tertiary-700'
          }`}
          style={{ borderRadius: 0, border: 'none', boxShadow: 'none' }}
        >
          <Smartphone className="h-4 w-4" />
          <span>UPI</span>
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 backdrop-blur-[5px]">
        {/* Amount Selection */}
        {paymentType !== 'upi' && (
          <div>
            <label className="block text-sm font-medium text-tertiary-700 mb-3">
              Select Amount (₹)
            </label>
            {renderAmountButtons(paymentType === 'onetime' ? oneTimeAmounts : monthlyAmounts)}
            
            <div className="mt-3">
              <input
                type="number"
                min="1"
                max="1000000"
                step="1"
                placeholder="Enter custom amount (₹1 - ₹10,00,000)"
                value={customAmount}
                onChange={(e) => {
                  const value = e.target.value;
                  setCustomAmount(value);
                  setSelectedAmount(null);
                  
                  // Validate amount in real-time
                  if (value) {
                    const numValue = parseFloat(value);
                    const validation = validateAmount(numValue);
                    if (validation !== true) {
                      setPaymentStatus('error');
                      setStatusMessage(validation);
                    } else {
                      setPaymentStatus('idle');
                      setStatusMessage('');
                    }
                  }
                }}
                className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
              />
            </div>
          </div>
        )}

        {/* UPI Amount */}
        {paymentType === 'upi' && (
          <div>
            <label htmlFor="upiAmount" className="block text-sm font-medium text-tertiary-700 mb-2">
              Amount (₹)
            </label>
            <input
              type="number"
              id="upiAmount"
              min="1"
              max="1000000"
              step="1"
              defaultValue={1000}
              {...register('upiAmount', { 
                required: 'Amount is required',
                validate: (value) => {
                  const result = validateAmount(value || 0)
                  return result === true ? true : result
                }
              })}
              className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
              placeholder="Enter amount (₹1 - ₹10,00,000)"
            />
            {errors.upiAmount && (
              <p className="text-red-500 text-sm mt-1">{errors.upiAmount.message as string}</p>
            )}
          </div>
        )}

        {/* Personal Information */}
        <div className="border-t border-tertiary-200 pt-6">
          <h3 className="text-lg font-semibold text-tertiary mb-4">Personal Information</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-tertiary-700 mb-2">
                First Name {paymentType === 'upi' ? '*' : ''}
              </label>
              <input
                type="text"
                id="firstName"
                {...register('firstName', {
                  ...(paymentType === 'upi' ? { required: 'First name is required' } : {}),
                  validate: (value) => {
                    const result = validateName(value || '', paymentType === 'upi')
                    return result === true ? true : result
                  }
                })}
                className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message as string}</p>
              )}
            </div>
            
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-tertiary-700 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                id="lastName"
                {...register('lastName', { 
                  required: 'Last name is required',
                  validate: (value) => {
                    const result = validateName(value || '', true)
                    return result === true ? true : result
                  }
                })}
                className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message as string}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="email" className="block text-sm font-medium text-tertiary-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              {...register('email', { 
                required: 'Email is required',
                validate: (value) => {
                  const result = validateEmail(value || '')
                  return result === true ? true : result
                }
              })}
              className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px] "
            />
            <p className="text-tertiary-500 text-sm mt-1">We will send the purchase receipt to this address.</p>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message as string}</p>
            )}
          </div>

          <div className="mt-4">
            <label htmlFor="phone" className="block text-sm font-medium text-tertiary-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              id="phone"
              {...register('phone', { 
                required: 'Phone number is required',
                validate: (value) => {
                  const result = validatePhone(value || '')
                  return result === true ? true : result
                }
              })}
              className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
              placeholder="+91XXXXXXXXXX or XXXXXXXXXX"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message as string}</p>
            )}
          </div>

          {/* Additional fields for non-UPI payments */}
          {paymentType !== 'upi' && (
            <>
              <div className="mt-4">
                <label htmlFor="address" className="block text-sm font-medium text-tertiary-700 mb-2">
                  Address *
                </label>
                <textarea
                  id="address"
                  rows={3}
                  {...register('address', { 
                    required: 'Address is required',
                    validate: (value) => {
                      const result = validateAddress(value || '', true)
                      return result === true ? true : result
                    }
                  })}
                  className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
                  placeholder="Enter your complete address"
                />
                <p className="text-tertiary-500 text-sm mt-1">Address is required as per Government regulations and to provide 80G certificate</p>
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address.message as string}</p>
                )}
              </div>

              <div className="mt-4">
                <label htmlFor="pan" className="block text-sm font-medium text-tertiary-700 mb-2">
                  PAN Number *
                </label>
                <input
                  type="text"
                  id="pan"
                  {...register('pan', { 
                    required: 'PAN number is required',
                    validate: (value) => {
                      if (!value || value.trim().length === 0) {
                        return 'PAN number is required'
                      }
                      const result = validatePAN(value || '')
                      return result === true ? true : result
                    }
                  })}
                  className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
                  placeholder="ABCDE1234F"
                  style={{ textTransform: 'uppercase' }}
                />
                <p className="text-tertiary-500 text-sm mt-1">PAN Number is required as per Government regulations and to provide 80G certificate</p>
                {errors.pan && (
                  <p className="text-red-500 text-sm mt-1">{errors.pan.message as string}</p>
                )}
              </div>
            </>
          )}
        </div>

        {/* Checkboxes */}
        <div className="space-y-4">
          {paymentType === 'recurring' && (
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="monthlyContribution"
                {...register('monthlyContribution', { required: 'Please agree to contribute monthly' })}
                className="mt-1 h-4 w-4 text-primary focus:ring-primary border-tertiary-300 rounded"
              />
              <label htmlFor="monthlyContribution" className="text-sm text-tertiary-700">
                I agree to contribute monthly *
              </label>
              {errors.monthlyContribution && (
                <p className="text-red-500 text-sm">{errors.monthlyContribution.message as string}</p>
              )}
            </div>
          )}

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="privacyPolicy"
              {...register('privacyPolicy', { required: 'Please agree to the privacy policy' })}
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-tertiary-300 rounded"
            />
            <label htmlFor="privacyPolicy" className="text-sm text-tertiary-700">
              I agree to the <a href="/privacy" className="text-primary hover:text-primary-700">privacy policy</a> *
            </label>
            {errors.privacyPolicy && (
              <p className="text-red-500 text-sm">{errors.privacyPolicy.message as string}</p>
            )}
          </div>
        </div>

        {/* Status Display */}
        {paymentStatus !== 'idle' && (
          <div className={`p-4 rounded-lg border ${
            paymentStatus === 'success' ? 'bg-green-50 border-green-200' :
            paymentStatus === 'error' ? 'bg-red-50 border-red-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-center space-x-2">
              {paymentStatus === 'processing' && <Loader2 className="h-5 w-5 animate-spin text-blue-600" />}
              {paymentStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
              {paymentStatus === 'error' && <AlertCircle className="h-5 w-5 text-red-600" />}
              <p className={`text-sm font-medium ${
                paymentStatus === 'success' ? 'text-green-800' :
                paymentStatus === 'error' ? 'text-red-800' :
                'text-blue-800'
              }`}>
                {statusMessage}
              </p>
            </div>
            {paymentStatus === 'success' && receiptNumber && (
              <p className="text-xs text-green-700 mt-2">
                Receipt Number: {receiptNumber}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={paymentGateway.isProcessing || paymentStatus === 'processing'}
          className="w-full bg-primary text-white font-bold py-8 px-6 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
          size="xl"
        >
          {paymentGateway.isProcessing || paymentStatus === 'processing' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
              <span>Processing...</span>
            </>
          ) : (
            <>
              <Heart className="h-5 w-5 mr-2" />
              <span>
                {paymentType === 'upi' ? 'Generate QR Code' : 
                 paymentType === 'recurring' ? 'Start Monthly Donation' : 
                 'Sponsor Now'}
              </span>
            </>
          )}
        </Button>

        {/* UPI QR Code Display */}
        {paymentType === 'upi' && showQR && (
          <div className="mt-6 p-6 bg-secondary-50 text-center border rounded-lg">
            <h4 className="text-lg font-semibold text-tertiary mb-4">UPI Payment</h4>
            <div className="space-y-4">
              <div className="w-48 h-48 bg-white border-2 border-tertiary-300 mx-auto flex items-center justify-center rounded-lg">
                <p className="text-tertiary-500">QR Code will appear here</p>
              </div>
              <div className="text-sm text-tertiary-600">
                <p className="mb-2">Scan this QR code with any UPI app to complete your donation</p>
                <p className="font-semibold">Amount: ₹{getFinalAmount().toLocaleString()}</p>
              </div>
              <div className="flex flex-col space-y-2">
                <Button
                  type="button"
                  onClick={() => {
                    setPaymentStatus('success');
                    setStatusMessage('UPI payment confirmation received. Thank you for your donation!');
                    setShowQR(false);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Payment Completed
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowQR(false);
                    setPaymentStatus('idle');
                  }}
                >
                  Cancel Payment
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default DonationForm;
