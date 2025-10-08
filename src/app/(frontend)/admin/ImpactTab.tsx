import Editor from '@monaco-editor/react';
import React from 'react';

interface ImpactTabProps {
  jsonData: string;
  setJsonData: (data: string) => void;
  saving: boolean;
  error: string;
  success: string;
  handleReset: () => void;
  handleSave: () => void;
}

const ImpactTab: React.FC<ImpactTabProps> = ({
  jsonData,
  setJsonData,
  saving,
  error,
  success,
  handleReset,
  handleSave,
}) => (
  <div className="bg-white rounded-lg shadow">
    <div className="px-6 py-4 border-b border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900">Impact Data Editor</h2>
      <p className="mt-1 text-sm text-gray-600">
        Edit the impact statistics displayed on the homepage. Changes will be saved to impact.json.
      </p>
    </div>
    <div className="p-6">
      <div className="mb-6 bg-yellow-200 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-md shadow">
        <strong>⚠️ Important:</strong> Please use the Impact Data Editor sparingly. <br />
        <span className="font-semibold">Do not update more than twice a month.</span> Frequent updates will negatively affect site performance by clearing the cache.
      </div>
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
      <div className="mt-8 bg-gray-50 rounded-md p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-2">JSON Structure Guide</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p><strong>value:</strong> The numeric value to display (number)</p>
          <p><strong>format:</strong> Text to append after the value (e.g., `&quot;`+`&quot;`, `&quot;` Million+`&quot;`)</p>
          <p><strong>label:</strong> The main title for this statistic (string)</p>
          <p><strong>description:</strong> Additional description text (string)</p>
          <p><strong>decimals:</strong> Number of decimal places to show (number)</p>
          <p><strong>usePointer:</strong> Whether to show a pointer effect (boolean, optional)</p>
          <p><strong>icon:</strong> The icon name to display (string)</p>
        </div>
      </div>
    </div>
  </div>
);

export default ImpactTab;
