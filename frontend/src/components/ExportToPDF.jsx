// import React, { useRef } from 'react';
// import { useReactToPrint } from 'react-to-print';
// import { FaFilePdf } from 'react-icons/fa';

// const ExportToPDF = ({ entries }) => {
//   const componentRef = useRef();

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     documentTitle: `MoodJournal_${new Date().toISOString().split('T')[0]}`,
//   });

//   return (
//     <div className="mb-8">
//       <button
//         onClick={handlePrint}
//         className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//       >
//         <FaFilePdf /> Export to PDF
//       </button>

//       <div className="hidden">
//         <div ref={componentRef} className="p-8">
//           <h1 className="text-2xl font-bold mb-4">Mood Journal Entries</h1>
//           {entries.map((entry, index) => (
//             <div key={index} className="mb-6 pb-4 border-b">
//               <h3 className="text-xl font-semibold">{new Date(entry.date).toLocaleDateString()}</h3>
//               <p><strong>Mood:</strong> {entry.mood}</p>
//               <p><strong>Weather:</strong> {entry.weather?.weather[0].description} ({Math.round(entry.weather?.main.temp)}°C)</p>
//               <p><strong>Notes:</strong> {entry.note}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExportToPDF;


    import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { FaFilePdf } from 'react-icons/fa';

const ExportToPDF = ({ entries }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `MoodJournal_${new Date().toISOString().split('T')[0]}`,
  });

  return (
    // <h1>this is export</h1>
    <div className="mt-6 text-center">
      <button
        onClick={handlePrint}
        disabled={entries.length === 0}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${
          entries.length > 0 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        <FaFilePdf /> Export to PDF
      </button>

      <div style={{ display: 'none' }}>
        <div ref={componentRef} className="p-8">
          <h1 className="text-2xl font-bold mb-6">Mood Journal Entries</h1>
          {entries.slice().reverse().map((entry, index) => (
            <div key={index} className="mb-6 pb-4 border-b">
              <h3 className="text-xl font-semibold">
                {new Date(entry.date).toLocaleDateString()}
              </h3>
              <p><strong>Mood:</strong> {entry.mood}</p>
              {entry.weather && (
                <p><strong>Weather:</strong> {entry.weather.condition} ({entry.weather.temp}°C)</p>
              )}
              {entry.note && <p><strong>Notes:</strong> {entry.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExportToPDF;