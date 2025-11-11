import React from 'react';
import { RefreshCw, AlertTriangle, Mail, Clock, CheckCircle, XCircle } from 'lucide-react';

export const metadata = {
  title: "Cancellation and Refund Policy | Light Lives",
  description: "Learn about Light Lives Charitable Trust's cancellation and refund policy for program payments.",
  keywords: "cancellation policy, refund policy, payment refund, Light Lives, cancellation",
}

export const dynamic = 'force-static'

export default function CancellationRefundPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-tertiary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up opacity-0 [animation-delay:0ms] [animation-fill-mode:forwards]">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-none border-2 border-white/20">
                <RefreshCw className="h-16 w-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              Cancellation &amp; Refund Policy
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Understanding our policy for cancellations and refunds
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:200ms] [animation-fill-mode:forwards]">
            <div className="bg-gradient-to-br from-secondary-50 to-primary-50 border-l-4 border-secondary p-6 rounded-none mb-8">
              <p className="text-lg text-tertiary-700 leading-relaxed">
                Light Lives Charitable Trust is committed to providing transparent and fair refund policies for our program participants. Please read this policy carefully to understand the conditions under which refunds are processed.
              </p>
            </div>
          </div>

          {/* Refund Eligibility */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:300ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 text-primary p-3 rounded-none">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                Refund Eligibility
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                Light Lives offers a refund policy to the buyers of Light Lives programs <strong>only in case there has been an error or technical reason</strong> for the transfer due to which buyers have mistakenly:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Made double payments</li>
                <li>Paid an extra amount</li>
              </ul>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-none my-6">
                <div className="flex items-start">
                  <AlertTriangle className="h-6 w-6 text-yellow-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-yellow-900 mb-2">Important Notice</h3>
                    <p className="text-yellow-900">
                      Under no circumstances will any part of amount exercised/paid as statutory taxes, transaction charges, or payment gateway charges during the buying process be refunded.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Request a Refund */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-secondary-100 text-secondary-700 p-3 rounded-none">
                <Mail className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                How to Request a Refund
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                We will be happy to refund the payment provided the buyer informs Light Lives and claims their refund within <strong>7 days from the date of transaction</strong> through one of the following methods:
              </p>

              <div className="grid md:grid-cols-2 gap-6 my-8">
                <div className="bg-primary-50 p-6 rounded-none border-2 border-primary-200">
                  <h3 className="text-xl font-bold text-tertiary mb-3 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    Via Email
                  </h3>
                  <p className="text-tertiary-700">
                    Send your refund request to:
                  </p>
                  <a 
                    href="mailto:info@lightlives.org" 
                    className="text-primary hover:text-primary-700 font-semibold underline block mt-2"
                  >
                    info@lightlives.org
                  </a>
                </div>

                <div className="bg-secondary-50 p-6 rounded-none border-2 border-secondary-200">
                  <h3 className="text-xl font-bold text-tertiary mb-3 flex items-center">
                    <Mail className="h-5 w-5 mr-2 text-secondary-700" />
                    Via Courier
                  </h3>
                  <p className="text-tertiary-700">
                    Send a letter via courier to our Chennai office
                  </p>
                  <p className="text-sm text-tertiary-600 mt-2">
                    (Contact us for office address)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Processing Timeline */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:500ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-primary-100 text-primary p-3 rounded-none">
                <Clock className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                Processing Timeline
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <div className="bg-gradient-to-br from-primary-50 to-secondary-50 p-8 rounded-none border-2 border-primary-200 my-6">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 font-bold">
                      1
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-tertiary mb-2">Request Period</h4>
                      <p className="text-tertiary-700">
                        Submit your refund request within <strong>7 days</strong> from the date of transaction
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-secondary-700 text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 font-bold">
                      2
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-tertiary mb-2">Processing Time</h4>
                      <p className="text-tertiary-700">
                        Expect to receive your refund within <strong>30 calendar days</strong> from the request date
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-tertiary text-white rounded-full w-10 h-10 flex items-center justify-center flex-shrink-0 mr-4 font-bold">
                      3
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-tertiary mb-2">Notification</h4>
                      <p className="text-tertiary-700">
                        You will receive complete refund details via email or letter
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Refund Method */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:600ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-secondary-100 text-secondary-700 p-3 rounded-none">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                Refund Method
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <p className="mb-4">
                The information regarding the refund will be notified via email/letter with complete details.
              </p>
              <div className="bg-primary-50 p-6 rounded-none border-l-4 border-primary my-6">
                <h3 className="text-xl font-bold text-tertiary mb-3">Payment Methods</h3>
                <p className="text-tertiary-700 mb-3">
                  The refund will be made <strong>only on the name of the buying party</strong> through:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-tertiary-700">
                  <li>A/C Payee Cheque</li>
                  <li>NEFT (National Electronic Funds Transfer)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Non-Refundable Cases */}
          <div className="mb-12 animate-fade-in-up opacity-0 [animation-delay:700ms] [animation-fill-mode:forwards]">
            <div className="flex items-center mb-6">
              <div className="bg-red-100 text-red-600 p-3 rounded-none">
                <XCircle className="h-8 w-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-tertiary ml-4">
                Non-Refundable Cases
              </h2>
            </div>
            <div className="prose prose-lg max-w-none text-tertiary-700">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-none">
                <div className="flex items-start">
                  <XCircle className="h-6 w-6 text-red-600 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-bold text-red-900 mb-3">Important Restrictions</h3>
                    <p className="text-red-900 mb-4">
                      No refund/cancellation request for the transacted amount by any buyer will be entertained after the payment is accepted by our online payment gateway service providers, <strong>unless there is a fraud notification from our payment gateway service providers</strong>.
                    </p>
                    <p className="text-red-900 font-semibold">
                      Requests made after 7 days from the transaction date will not be processed.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Policy Notice */}
          <div className="animate-fade-in-up opacity-0 [animation-delay:800ms] [animation-fill-mode:forwards]">
            <div className="bg-gradient-to-br from-primary-100 to-secondary-100 border-2 border-secondary/30 p-8 rounded-none shadow-lg">
              <div className="flex items-start">
                <RefreshCw className="h-8 w-8 text-secondary-700 mr-4 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-tertiary mb-3">Your Understanding</h3>
                  <p className="text-lg text-tertiary-700 leading-relaxed">
                    By making a payment on the Light Lives website, you acknowledge that you have read, understood, and agree to this cancellation and refund policy.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-12 pt-8 border-t border-tertiary-200 animate-fade-in-up opacity-0 [animation-delay:900ms] [animation-fill-mode:forwards]">
            <p className="text-tertiary-600 text-center">
              If you have any questions about our cancellation and refund policy, please{' '}
              <a href="/contact" className="text-secondary hover:text-secondary-700 font-semibold underline">
                contact us
              </a>
              {' '}or email us at{' '}
              <a href="mailto:info@lightlives.org" className="text-primary hover:text-primary-700 font-semibold underline">
                info@lightlives.org
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
