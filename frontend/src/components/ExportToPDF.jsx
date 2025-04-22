import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaFilePdf } from 'react-icons/fa';

const ExportToPDF = ({ entries }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `MoodJournal_${new Date().toISOString().split('T')[0]}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      body {
        font-family: 'Helvetica Neue', Arial, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .entry {
        page-break-inside: avoid;
        margin-bottom: 16px;
        padding-bottom: 16px;
        border-bottom: 1px solid #eee;
      }
      .entry:last-child {
        border-bottom: none;
      }
      .header {
        margin-bottom: 24px;
        text-align: center;
      }
      .mood {
        font-weight: bold;
        text-transform: capitalize;
        margin-right: 8px;
      }
      .weather {
        color: #666;
      }
      .notes {
        margin-top: 8px;
        padding: 8px;
        background-color: #f8f8f8;
        border-radius: 4px;
      }
    `,
    onAfterPrint: () => console.log('PDF generated successfully')
  });

  // Function to get emoji for mood
  const getMoodEmoji = (mood) => {
    const emojis = {
      happy: '😊',
      sad: '😢',
      angry: '😠',
      calm: '😌',
      excited: '🤩',
      tired: '😴'
    };
    return emojis[mood] || '';
  };

  return (
    <div className="mt-6">
      <button
        onClick={handlePrint}
        disabled={entries.length === 0}
        className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg mx-auto ${
          entries.length > 0 
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-md transition-all' 
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        <FaFilePdf className="text-lg" />
        <span>Export Journal as PDF</span>
      </button>

      {/* Hidden content that will be printed */}
      <div style={{ display: 'none' }}>
        <div ref={componentRef} className="p-8">
          <div className="header">
            <h1 className="text-3xl font-bold mb-2">Mood Journal</h1>
            <p className="text-gray-600">Generated on {new Date().toLocaleDateString()}</p>
          </div>
          
          {entries.slice().reverse().map((entry, index) => (
            <div key={index} className="entry">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold">
                  {new Date(entry.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </h2>
                <div className="flex items-center">
                  <span className="mood">
                    {getMoodEmoji(entry.mood)} {entry.mood}
                  </span>
                </div>
              </div>
              
              {entry.weather && (
                <div className="weather mb-2">
                  <strong>Weather:</strong> {entry.weather.condition} ({Math.round(entry.weather.temp)}°C)
                </div>
              )}
              
              {entry.note && (
                <div className="notes">
                  <strong>Notes:</strong> {entry.note}
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