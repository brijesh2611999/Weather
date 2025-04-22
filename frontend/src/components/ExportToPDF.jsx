import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaFilePdf } from 'react-icons/fa';

const ExportToPDF = ({ entries }) => {
  const componentRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `MoodJournal_${new Date().toISOString().split('T')[0]}`,
    onBeforeGetContent: () => setIsGenerating(true),
    onAfterPrint: () => setIsGenerating(false),
    pageStyle: `
      @page {
        size: A4;
        margin: 15mm;
      }
      body {
        font-family: Arial, sans-serif;
        line-height: 1.5;
      }
      .entry {
        margin-bottom: 15px;
        page-break-inside: avoid;
      }
    `,
    removeAfterPrint: true
  });

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
    <div className="mt-4">
      <button
        onClick={handlePrint}
        disabled={isGenerating}
        className={`bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors ${
          isGenerating ? 'opacity-50 cursor-wait' : ''
        }`}
      >
        {isGenerating ? (
          'Generating PDF...'
        ) : (
          <>
            <FaFilePdf className="inline mr-2" />
            Export to PDF ({entries.length} entries)
          </>
        )}
      </button>

      <div style={{ display: 'none' }}>
        <div ref={componentRef} className="p-6">
          <h1 className="text-2xl font-bold mb-4">Mood Journal Entries</h1>
          <p className="text-gray-600 mb-6">
            Generated on {new Date().toLocaleDateString()}
          </p>
          
          {entries.map((entry, index) => (
            <div key={index} className="entry">
              <div className="flex justify-between items-start mb-1">
                <h2 className="font-semibold">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </h2>
                <span className="capitalize bg-gray-100 px-2 py-1 rounded">
                  {entry.mood}
                </span>
              </div>
              
              {entry.weather && (
                <p className="text-sm text-gray-600 mb-1">
                  Weather: {entry.weather.condition} ({Math.round(entry.weather.temp)}°C)
                </p>
              )}
              
              {entry.note && (
                <p className="mt-2 whitespace-pre-wrap">{entry.note}</p>
              )}
              
              {index < entries.length - 1 && <hr className="my-3 border-gray-200" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportToPDF;