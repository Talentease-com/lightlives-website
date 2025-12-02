'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TurnstileWidget } from '@/components/ui/TurnstileWidget';
import { useTurnstile } from '@/hooks/useTurnstile';
import { validateEmail, validateName, validatePhone } from '@/lib/validationUtils';

interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

type SubmissionStatus = 'idle' | 'processing' | 'success' | 'error';

const ContactForm: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const {
    turnstileToken,
    turnstileRef,
    handleTurnstileSuccess,
    handleTurnstileError,
    handleTurnstileExpire,
    resetTurnstile,
    isTurnstileValid,
  } = useTurnstile({
    onError: (message) => {
      setSubmissionStatus('error');
      setStatusMessage(message);
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    // Check if Turnstile token is present
    if (!isTurnstileValid()) {
      setSubmissionStatus('error');
      setStatusMessage('Please complete the security verification.');
      return;
    }

    setSubmissionStatus('processing');
    setStatusMessage('Sending your message...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          turnstileToken,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmissionStatus('success');
        setStatusMessage(result.message || 'Thank you for your message! We&apos;ll get back to you within 24-48 hours.');
        reset();
        resetTurnstile();
      } else {
        const errorResult = await response.json();
        throw new Error(errorResult.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmissionStatus('error');
      setStatusMessage('Sorry, there was an error sending your message. Please try again or contact us directly.');
      resetTurnstile();
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-tertiary mb-8">Send us a Message</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-tertiary-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              id="firstName"
              {...register('firstName', { 
                required: 'First name is required',
                validate: (value) => {
                  const result = validateName(value || '', true);
                  return result === true ? true : result;
                }
              })}
              className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 backdrop-blur-[5px]"
              placeholder="Your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
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
                  const result = validateName(value || '', true);
                  return result === true ? true : result;
                }
              })}
              className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 backdrop-blur-[5px]"
              placeholder="Your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-tertiary-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { 
              required: 'Email is required',
              validate: (value) => {
                const result = validateEmail(value || '');
                return result === true ? true : result;
              }
            })}
            className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 backdrop-blur-[5px]"
            placeholder="your.email@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-tertiary-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            {...register('phone', {
              validate: (value) => {
                if (!value) return true; // Optional field
                const result = validatePhone(value);
                return result === true ? true : result;
              }
            })}
            className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 backdrop-blur-[5px]"
            placeholder="+91 9342250524"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-tertiary-700 mb-2">
            Subject *
          </label>
          <select
            id="subject"
            {...register('subject', { required: 'Please select a subject' })}
            className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 backdrop-blur-[5px]"
          >
            <option value="">Select a subject</option>
            <option value="sponsorship">Child Sponsorship</option>
            <option value="partnership">Partnership Inquiry</option>
            <option value="volunteer">Volunteer Opportunities</option>
            <option value="programs">Program Information</option>
            <option value="csr">CSR Partnership</option>
            <option value="other">Other</option>
          </select>
          {errors.subject && (
            <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-tertiary-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            rows={6}
            {...register('message', { 
              required: 'Message is required',
              minLength: {
                value: 10,
                message: 'Message must be at least 10 characters long'
              }
            })}
            className="w-full px-4 py-3 border border-tertiary-300 focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 backdrop-blur-[5px]"
            placeholder="Tell us how we can help you..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Turnstile Widget */}
        <TurnstileWidget
          ref={turnstileRef}
          action="contact-form"
          onSuccess={handleTurnstileSuccess}
          onError={handleTurnstileError}
          onExpire={handleTurnstileExpire}
        />

        {/* Status Display */}
        {submissionStatus !== 'idle' && (
          <div className={`p-4 border ${
            submissionStatus === 'success' ? 'bg-green-50 border-green-200' :
            submissionStatus === 'error' ? 'bg-red-50 border-red-200' :
            'bg-blue-50 border-blue-200'
          }`}>
            <div className="flex items-center space-x-2">
              {submissionStatus === 'processing' && <Loader2 className="h-5 w-5 animate-spin text-blue-600" />}
              {submissionStatus === 'success' && <CheckCircle className="h-5 w-5 text-green-600" />}
              {submissionStatus === 'error' && <AlertCircle className="h-5 w-5 text-red-600" />}
              <p className={`text-sm font-medium ${
                submissionStatus === 'success' ? 'text-green-800' :
                submissionStatus === 'error' ? 'text-red-800' :
                'text-blue-800'
              }`}>
                {statusMessage}
              </p>
            </div>
          </div>
        )}

        <Button
          type="submit"
          disabled={submissionStatus === 'processing' || !isTurnstileValid()}
          className="w-full bg-primary hover:bg-primary-600 text-white font-bold py-4 px-6 text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {submissionStatus === 'processing' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Send Message</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;