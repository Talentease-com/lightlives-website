'use client';
import { createClient } from "@/utils/supabase/client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { User } from "@supabase/supabase-js";
import ImpactTab from './ImpactTab';
import PaymentsTab from './PaymentsTab';

interface ImpactItem {
  value: number;
  format: string;
  label: string;
  description: string;
  decimals: number;
  usePointer?: boolean;
  icon: string;
}

interface PaymentDashboardData {
  statistics: {
    totalAmount: number;
    totalDonations: number;
    recentDonations: number;
    recurringDonors: number;
    averageDonation: number;
  };
  recentPayments: Array<{
    id: string;
    amount: number;
    payment_type: string;
    payment_status: string;
    first_name?: string;
    last_name: string;
    email: string;
    created_at: string;
    receipt_number?: string;
  }>;
}

type ActiveTab = 'impact' | 'payments';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('impact');
  
  // Impact Data State
  const [jsonData, setJsonData] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);

  // Payments Data State
  const [paymentsData, setPaymentsData] = useState<PaymentDashboardData | null>(null);
  const [paymentsLoading, setPaymentsLoading] = useState(false);
  const [paymentsError, setPaymentsError] = useState<string>('');

  useEffect(() => {
    loadImpactData();
    fetchUser();
  }, []);

  useEffect(() => {
    if (activeTab === 'payments') {
      loadPaymentsData();
    }
  }, [activeTab]);

  const fetchUser = async () => {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    setUser(data.user);
  };

  const loadImpactData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/impact');
      if (!response.ok) {
        throw new Error('Failed to load impact data');
      }
      const data = await response.json();
      setJsonData(JSON.stringify(data, null, 2));
    } catch (err) {
      setError('Failed to load impact data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadPaymentsData = async () => {
    try {
      setPaymentsLoading(true);
      setPaymentsError('');
      const response = await fetch('/api/admin/payments');
      if (!response.ok) {
        throw new Error('Failed to load payments data');
      }
      const data = await response.json();
      setPaymentsData(data);
    } catch (err) {
      setPaymentsError('Failed to load payments data');
      console.error(err);
    } finally {
      setPaymentsLoading(false);
    }
  };
  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      // Validate JSON format
      let parsedData: ImpactItem[];
      try {
        parsedData = JSON.parse(jsonData);
      } catch {
        throw new Error('Invalid JSON format');
      }

      // Save to backend
      const response = await fetch('/api/impact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save');
      }

      setSuccess('Impact data saved successfully!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save impact data');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    loadImpactData();
    setError('');
    setSuccess('');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* User Indicator Bar */}
      <div className="w-full bg-blue-100 dark:bg-blue-900 px-4 py-2 flex justify-between items-center">
        <span className="text-sm text-blue-900 dark:text-blue-100">
          {user ? `Logged in as ${user.email}` : "Not logged in"}
        </span>
        {user && (
          <form action="/auth/logout" method="post">
            <button
              type="submit"
              className="inline-flex items-center px-3 py-1 border border-blue-300 text-xs font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Log out
            </button>
          </form>
        )}
      </div>

      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage impact data and view payment analytics
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:text-blue-500 underline"
              >
                ← Back to Website
              </Link>

            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('impact')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'impact'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Impact Data
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'payments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Payments Dashboard
            </button>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'impact' && (
          <ImpactTab
            jsonData={jsonData}
            setJsonData={setJsonData}
            saving={saving}
            error={error}
            success={success}
            handleReset={handleReset}
            handleSave={handleSave}
          />
        )}
        {activeTab === 'payments' && (
          <PaymentsTab
            paymentsData={paymentsData}
            paymentsLoading={paymentsLoading}
            paymentsError={paymentsError}
            loadPaymentsData={loadPaymentsData}
            formatCurrency={formatCurrency}
            formatDate={formatDate}
          />
        )}
      </div>
    </div>
  );
}
