'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Send, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { validateEmail, validateName, validatePhone } from '@/lib/validationUtils';

interface CSRInquiryFormData {
  companyName: string;
  contactFirstName: string;
  contactLastName: string;
  email: string;
  phone?: string;
  location?: string;
  interests: string[];
  budgetBand?: string;
  message: string;
}

type SubmissionStatus = 'idle' | 'processing' | 'success' | 'error';

const CSRInquiryForm: React.FC = () => {
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CSRInquiryFormData>({
    defaultValues: {
      interests: [],
    }
  });

  const onSubmit = async (data: CSRInquiryFormData) => {
    setSubmissionStatus('processing');
    setStatusMessage('Sending your inquiry...');
    
    try {
      const response = await fetch('/api/csr-inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        setSubmissionStatus('success');
        setStatusMessage(result.message || 'Thank you for your interest! We&apos;ll get back to you within 24-48 hours.');
        reset();
      } else {
        const errorResult = await response.json();
        throw new Error(errorResult.error || 'Failed to send inquiry');
      }
    } catch (error) {
      console.error('CSR inquiry form error:', error);
      setSubmissionStatus('error');
      setStatusMessage('Sorry, there was an error sending your inquiry. Please try again or contact us directly.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-tertiary mb-4">
          Connect with us for a discussion
        </h2>
        <p className="text-xl text-tertiary-600">
          Share your details and we&apos;ll reach out to explore how we can partner together
        </p>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-8 border border-tertiary-200 rounded-none shadow-2xl backdrop-blur-[5px]">
        {/* Company Name */}
        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-tertiary-700 mb-2">
            Company/Organization Name *
          </label>
          <input
            type="text"
            id="companyName"
            {...register('companyName', { 
              required: 'Company name is required',
              minLength: {
                value: 2,
                message: 'Company name must be at least 2 characters'
              }
            })}
            className="w-full px-4 py-3 border border-tertiary-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="Your organization name"
          />
          {errors.companyName && (
            <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
          )}
        </div>

        {/* Contact Person Name */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="contactFirstName" className="block text-sm font-medium text-tertiary-700 mb-2">
              Contact Person First Name *
            </label>
            <input
              type="text"
              id="contactFirstName"
              {...register('contactFirstName', { 
                required: 'First name is required',
                validate: (value) => {
                  const result = validateName(value || '', true);
                  return result === true ? true : result;
                }
              })}
              className="w-full px-4 py-3 border border-tertiary-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="First name"
            />
            {errors.contactFirstName && (
              <p className="text-red-500 text-sm mt-1">{errors.contactFirstName.message}</p>
            )}
          </div>
          
          <div>
            <label htmlFor="contactLastName" className="block text-sm font-medium text-tertiary-700 mb-2">
              Contact Person Last Name *
            </label>
            <input
              type="text"
              id="contactLastName"
              {...register('contactLastName', { 
                required: 'Last name is required',
                validate: (value) => {
                  const result = validateName(value || '', true);
                  return result === true ? true : result;
                }
              })}
              className="w-full px-4 py-3 border border-tertiary-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Last name"
            />
            {errors.contactLastName && (
              <p className="text-red-500 text-sm mt-1">{errors.contactLastName.message}</p>
            )}
          </div>
        </div>

        {/* Email and Phone */}
        <div className="grid md:grid-cols-2 gap-6">
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
              className="w-full px-4 py-3 border border-tertiary-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="your.email@company.com"
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
                  if (!value) return true;
                  const result = validatePhone(value);
                  return result === true ? true : result;
                }
              })}
              className="w-full px-4 py-3 border border-tertiary-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="+91 98666 37495"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-tertiary-700 mb-2">
            City/Location
          </label>
          <input
            type="text"
            id="location"
            {...register('location')}
            className="w-full px-4 py-3 border border-tertiary-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="e.g., Mumbai, Bangalore, Delhi"
          />
        </div>

        {/* Partnership Interests */}
        <div>
          <label className="block text-sm font-medium text-tertiary-700 mb-3">
            Partnership Interests * (select all that apply)
          </label>
          <div className="space-y-3">
            {[
              { value: 'sponsorships', label: 'Sponsorships' },
              { value: 'volunteering', label: 'Employee Volunteering Activities' },
              { value: 'content_curriculum', label: 'Content & Curriculum design' },
              { value: 'industry_coaches_mentors', label: 'Industry coaches & mentors' },
            ].map((interest) => (
              <div key={interest.value} className="flex items-center">
                <input
                  type="checkbox"
                  id={interest.value}
                  value={interest.value}
                  {...register('interests', { 
                    required: 'Please select at least one partnership interest' 
                  })}
                  className="w-4 h-4 text-primary border-tertiary-300 rounded-none focus:ring-primary"
                />
                <label htmlFor={interest.value} className="ml-3 text-tertiary-700">
                  {interest.label}
                </label>
              </div>
            ))}
          </div>
          {errors.interests && (
            <p className="text-red-500 text-sm mt-1">{errors.interests.message}</p>
          )}
        </div>

        {/* Budget Band */}
        <div>
          <label htmlFor="budgetBand" className="block text-sm font-medium text-tertiary-700 mb-2">
            Approximate CSR Budget
          </label>
          <select
            id="budgetBand"
            {...register('budgetBand')}
            className="w-full px-4 py-3 border border-tertiary-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          >
            <option value="">Select budget range (optional)</option>
            <option value="under-10l">Less than ₹10 Lakhs</option>
            <option value="10l-50l">₹10 Lakhs - ₹50 Lakhs</option>
            <option value="50l-2cr">₹50 Lakhs - ₹2 Crores</option>
            <option value="above-2cr">More than ₹2 Crores</option>
            <option value="undisclosed">Prefer not to disclose</option>
          </select>
        </div>

        {/* Message */}
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
            className="w-full px-4 py-3 border border-tertiary-300 rounded-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            placeholder="Tell us about your CSR objectives and how you'd like to partner with us..."
          />
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
          )}
        </div>

        {/* Status Display */}
        {submissionStatus !== 'idle' && (
          <div className={`p-4 border rounded-none ${
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
          disabled={submissionStatus === 'processing'}
          className="w-full bg-primary hover:bg-primary-600 text-white font-bold py-4 px-6 rounded-none text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
        >
          {submissionStatus === 'processing' ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="h-5 w-5" />
              <span>Submit Inquiry</span>
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default CSRInquiryForm;
