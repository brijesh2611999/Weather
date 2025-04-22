import React from 'react';
import { format } from 'date-fns';

const CalendarView = ({ entries = [] }) => {  // Default to empty array
  // Ensure entries is always an array and not null/undefined
  const safeEntries = Array.isArray(entries) ? entries : [];
  
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4 text-center">Your Journal History</h2>
      {safeEntries.length === 0 ? (
        <p className="text-center text-gray-500">No entries yet</p>
      ) : (
        <div className="space-y-3">
          {safeEntries.slice().reverse().map((entry, index) => (
            <div key={index} className="bg-white/80 p-4 rounded-lg shadow">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">
                  {format(new Date(entry.date), 'MMMM do, yyyy')}
                </h3>
                <span className="px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                  {entry.mood}
                </span>
              </div>
              {entry.note && <p className="text-gray-700 mb-2">{entry.note}</p>}
              {entry.weather && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>Weather: {entry.weather.condition} ({entry.weather.temp}°C)</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarView;