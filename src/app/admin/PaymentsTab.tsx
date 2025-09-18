import React from 'react';

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

interface PaymentsTabProps {
  paymentsData: PaymentDashboardData | null;
  paymentsLoading: boolean;
  paymentsError: string;
  loadPaymentsData: () => void;
  formatCurrency: (amount: number) => string;
  formatDate: (dateString: string) => string;
}

const PaymentsTab: React.FC<PaymentsTabProps> = ({
  paymentsData,
  paymentsLoading,
  paymentsError,
  loadPaymentsData,
  formatCurrency,
  formatDate,
}) => (
  <div className="space-y-6">
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Payments Dashboard</h2>
          <p className="mt-1 text-sm text-gray-600">
            Overview of donation statistics and recent transactions
          </p>
        </div>
        <button
          onClick={loadPaymentsData}
          disabled={paymentsLoading}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {paymentsLoading ? (
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          )}
          Refresh
        </button>
      </div>
      {paymentsError && (
        <div className="p-6 bg-red-50 border-l-4 border-red-400">
          <p className="text-red-700">{paymentsError}</p>
        </div>
      )}
      {paymentsData && (
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-blue-600 mb-2">Total Amount</h3>
              <p className="text-2xl font-bold text-blue-900">
                {formatCurrency(paymentsData.statistics.totalAmount)}
              </p>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-green-600 mb-2">Total Donations</h3>
              <p className="text-2xl font-bold text-green-900">
                {paymentsData.statistics.totalDonations}
              </p>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-purple-600 mb-2">Recent (30 days)</h3>
              <p className="text-2xl font-bold text-purple-900">
                {paymentsData.statistics.recentDonations}
              </p>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-orange-600 mb-2">Recurring Donors</h3>
              <p className="text-2xl font-bold text-orange-900">
                {paymentsData.statistics.recurringDonors}
              </p>
            </div>
            <div className="bg-indigo-50 p-6 rounded-lg">
              <h3 className="text-sm font-medium text-indigo-600 mb-2">Average Donation</h3>
              <p className="text-2xl font-bold text-indigo-900">
                {formatCurrency(paymentsData.statistics.averageDonation)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
    {paymentsData && (
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Recent Payments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Receipt
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paymentsData.recentPayments.map((payment) => (
                <tr key={payment.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        {payment.first_name ? `${payment.first_name} ${payment.last_name}` : payment.last_name}
                      </div>
                      <div className="text-sm text-gray-500">{payment.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(payment.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      payment.payment_type === 'recurring' ? 'bg-purple-100 text-purple-800' :
                      payment.payment_type === 'upi' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {payment.payment_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      payment.payment_status === 'completed' ? 'bg-green-100 text-green-800' :
                      payment.payment_status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.payment_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(payment.created_at)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {payment.receipt_number || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )}
  </div>
);

export default PaymentsTab;
