'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { Heart, CreditCard, Calendar, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DonationFormProps {
  className?: string;
}

const DonationForm: React.FC<DonationFormProps> = ({ className = '' }) => {
  const [paymentType, setPaymentType] = useState<'onetime' | 'recurring' | 'upi'>('onetime');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [showQR, setShowQR] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const oneTimeAmounts = [2000, 5000, 10000, 20000, 40000];
  const monthlyAmounts = [500, 1000, 1200, 1500, 2000];

  const onSubmit = (data: Record<string, unknown>) => {
    console.log('Form submitted:', { ...data, paymentType, amount: selectedAmount || customAmount });
    if (paymentType === 'upi') {
      setShowQR(true);
    } else {
      alert('Thank you for your generous contribution! We will process your donation shortly.');
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
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount(null);
                }}
                className="w-full px-4 py-3 border border-tertiary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
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
              defaultValue={1000}
              {...register('upiAmount', { required: 'Amount is required' })}
              className="w-full px-4 py-3 border border-tertiary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
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
                {...register('firstName', paymentType === 'upi' ? { required: 'First name is required' } : {})}
                className="w-full px-4 py-3 border border-tertiary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
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
                {...register('lastName', { required: 'Last name is required' })}
                className="w-full px-4 py-3 border border-tertiary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
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
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Please enter a valid email address'
                }
              })}
              className="w-full px-4 py-3 border border-tertiary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px] "
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
              {...register('phone', { required: 'Phone number is required' })}
              className="w-full px-4 py-3 border border-tertiary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
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
                  {...register('address', { required: 'Address is required' })}
                  className="w-full px-4 py-3 border border-tertiary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent backdrop-blur-[5px]"
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
                    pattern: {
                      value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                      message: 'Please enter a valid PAN number'
                    }
                  })}
                  className="w-full px-4 py-3 border border-tertiary-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="ABCDE1234F"
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full bg-primary text-white font-bold py-8 px-6 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
          size="xl"
        >
          <Heart className="h-5 w-5 mr-2" />
          <span>
            {paymentType === 'upi' ? 'Generate QR Code' : 
             paymentType === 'recurring' ? 'Start Monthly Donation' : 
             'Donate Now'}
          </span>
        </Button>

        {/* UPI QR Code Display */}
        {paymentType === 'upi' && showQR && (
          <div className="mt-6 p-6 bg-secondary-50 rounded-lg text-center">
            <h4 className="text-lg font-semibold text-tertiary mb-4">Scan to Pay</h4>
            <div className="w-48 h-48 bg-white border-2 border-tertiary-300 rounded-lg mx-auto flex items-center justify-center">
              <p className="text-tertiary-500">QR Code will appear here</p>
            </div>
            <p className="text-sm text-tertiary-600 mt-4">
              Scan this QR code with any UPI app to complete your donation
            </p>
          </div>
        )}
      </form>
    </motion.div>
  );
};

export default DonationForm;
