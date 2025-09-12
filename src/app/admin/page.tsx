'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Editor from '@monaco-editor/react';

interface ImpactItem {
  value: number;
  format: string;
  label: string;
  description: string;
  decimals: number;
  usePointer?: boolean;
  icon: string;
}

export default function AdminPage() {
  const [jsonData, setJsonData] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    loadImpactData();
  }, []);

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
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage impact data for the Light Lives website
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-sm text-blue-600 hover:text-blue-500 underline"
              >
                ← Back to Website
              </Link>
              <div className="text-sm text-gray-500">
                {/* Future: Add authentication status here */}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Authentication Bypassed
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Impact Data Editor</h2>
            <p className="mt-1 text-sm text-gray-600">
              Edit the impact statistics displayed on the homepage. Changes will be saved to impact.json.
            </p>
          </div>

          <div className="p-6">
            {/* Usage Warning */}
            <div className="mb-6 bg-yellow-200 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-md shadow">
              <strong>⚠️ Important:</strong> Please use the Impact Data Editor sparingly. <br />
              <span className="font-semibold">Do not update more than twice a month.</span> Frequent updates will negatively affect site performance by clearing the cache.
            </div>

            {/* Status Messages */}
            {error && (
              <div className="mb-4 bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-4 bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-green-700">{success}</p>
                  </div>
                </div>
              </div>
            )}

            {/* JSON Editor */}
            <div className="border border-gray-300 rounded-md overflow-hidden">
              <Editor
                height="500px"
                language="json"
                value={jsonData}
                onChange={(value) => setJsonData(value || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  automaticLayout: true,
                  scrollBeyondLastLine: false,
                  formatOnPaste: true,
                  formatOnType: true,
                }}
                theme="vs"
              />
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={handleReset}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                Reset to Original
              </button>
              
              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
            </div>

            {/* Help Section */}
            <div className="mt-8 bg-gray-50 rounded-md p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">JSON Structure Guide</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>value:</strong> The numeric value to display (number)</p>
                <p><strong>format:</strong> Text to append after the value (e.g., &quot;+&quot;, &quot; Million+&quot;)</p>
                <p><strong>label:</strong> The main title for this statistic (string)</p>
                <p><strong>description:</strong> Additional description text (string)</p>
                <p><strong>decimals:</strong> Number of decimal places to show (number)</p>
                <p><strong>usePointer:</strong> Whether to show a pointer effect (boolean, optional)</p>
                <p><strong>icon:</strong> The icon name to display (string)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
