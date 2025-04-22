import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaFilePdf } from 'react-icons/fa';

const ExportToPDF = ({ entries }) => {
  const componentRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `MoodJournal_${new Date().toISOString().split('T')[0]}`,
    onBeforeGetContent: () => {
      setIsGenerating(true);
      setError(null);
    },
    onAfterPrint: () => setIsGenerating(false),
    onPrintError: (err) => {
      console.error('Print error:', err);
      setError('Failed to generate PDF. Please try again or check browser settings.');
      setIsGenerating(false);
    },
    pageStyle: `
      @page { size: A4; margin: 10mm; }
      body { font-family: Arial; padding: 10mm; }
      .entry { margin-bottom: 5mm; page-break-inside: avoid; }
      h1 { color: #333; }
      .mood { font-weight: bold; text-transform: capitalize; }
    `,
    removeAfterPrint: true
  });

  // Test if printing is supported
  const isPrintSupported = typeof window.print === 'function';
console.log('Print supported:', typeof window.print === 'function');
  if (!isPrintSupported) {
    return (
      <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
        <p>Your browser doesn't support PDF generation. Try Chrome or Firefox.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-4">
        <p>{error}</p>
        <button 
          onClick={handlePrint}
          className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <button 
        disabled 
        className="bg-gray-300 text-gray-500 px-4 py-2 rounded-lg cursor-not-allowed"
      >
        <FaFilePdf className="inline mr-2" />
        No entries to export
      </button>
    );
  }

  return (
    <div className="mt-6">
      <button
        onClick={handlePrint}
        disabled={isGenerating}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg mx-auto ${
          isGenerating 
            ? 'bg-blue-500 cursor-wait' 
            : 'bg-green-600 hover:bg-green-700'
        } text-white shadow-md transition-all`}
      >
        {isGenerating ? (
          'Generating PDF...'
        ) : (
          <>
            <FaFilePdf className="text-lg" />
            <span>Export to PDF</span>
          </>
        )}
      </button>

      {/* Printable content */}
      <div style={{ position: 'absolute', left: '-9999px' }}>
        <div ref={componentRef} className="p-8">
          <h1 className="text-2xl font-bold mb-6">Mood Journal Entries</h1>
          <p className="text-gray-600 mb-8">
            Generated on {new Date().toLocaleDateString()}
          </p>
          
          {entries.map((entry, index) => (
            <div key={index} className="entry mb-8">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </h2>
                <span className="mood bg-gray-100 px-2 py-1 rounded">
                  {entry.mood}
                </span>
              </div>
              
              {entry.weather && (
                <p className="text-gray-700 mb-2">
                  <strong>Weather:</strong> {entry.weather.condition} ({Math.round(entry.weather.temp)}°C)
                </p>
              )}
              
              {entry.note && (
                <div className="bg-gray-50 p-3 rounded">
                  <p className="whitespace-pre-wrap">{entry.note}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportToPDF;