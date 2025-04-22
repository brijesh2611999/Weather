import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MoodSelector from './components/MoodSelector';
import WeatherDisplay from './components/WeatherDisplay';
import Detail from './components/Detail';
import CalendarView from './components/CalendarView';
import ExportToPDF from './components/ExportToPDF';

function App() {
  const [mood, setMood] = useState(null);
  const [note, setNote] = useState('');
  const [weather, setWeather] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveError, setSaveError] = useState(null);

  const moodToColor = {
    happy: 'bg-yellow-300',
    sad: 'bg-blue-300',
    angry: 'bg-red-300',
    calm: 'bg-green-300',
    excited: 'bg-orange-300',
    tired: 'bg-gray-400'
  };

  const buttonColors = {
    happy: 'bg-yellow-600 hover:bg-yellow-700',
    sad: 'bg-blue-600 hover:bg-blue-700',
    angry: 'bg-red-600 hover:bg-red-700',
    calm: 'bg-green-600 hover:bg-green-700',
    excited: 'bg-orange-600 hover:bg-orange-700',
    tired: 'bg-gray-600 hover:bg-gray-700'
  };

  const [isSaving, setIsSaving] = useState(false);



// On button:
// disabled={!mood || isSaving}

  const fetchWeather = async (lat, lon) => {
    try {
      const API_KEY = '7fe1470a73e32f2f88f6e71e5d1f950d';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
      );
      return response.data;
    } catch (error) {
      console.error("Weather API error:", error);
      throw error;
    }
  };

  // Update your fetchEntries function:
const fetchEntries = async () => {
  try {
    const res = await axios.get('https://weather-ddcq.onrender.com/entries');
    console.log('Entries fetched:', res.data);
    
    // Extract the data array from the response
    const entriesData = res.data.data || [];
    setEntries(entriesData);
    setError(null);
  } catch (err) {
    console.error("Failed to fetch entries:", err);
    setError("Failed to load entries. Please try again later.");
    setEntries([]); // Ensure entries is always an array
  }
};
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              const weatherData = await fetchWeather(latitude, longitude);
              setWeather(weatherData);
              setLoading(false);
            },
            async (error) => {
              console.error("Geolocation error:", error);
              const weatherData = await fetchWeather(51.5074, 0.1278);
              setWeather(weatherData);
              setLoading(false);
            }
          );
        } else {
          const weatherData = await fetchWeather(51.5074, 0.1278);
          setWeather(weatherData);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to load weather data");
        setLoading(false);
      }
    };

    fetchData();
    fetchEntries();
  }, []);


const saveEntry = async (e) => {
  if (e) e.preventDefault();
  setIsSaving(true);
  
  if (!mood) {
    setSaveError("Please select a mood before saving");
    setIsSaving(false);
    return;
  }

  const newEntry = {
    date: new Date().toISOString(),
    mood,
    note,
    weather: weather ? {
      temp: weather?.main?.temp,
      condition: weather?.weather?.[0]?.main
    } : null
  };

  try {
    setSaveError(null);
    console.log('Sending to backend:', JSON.stringify(newEntry, null, 2));
    
    const res = await axios.post('https://weather-ddcq.onrender.com/entries', newEntry, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000 // 10 second timeout
    });

    console.log('Full backend response:', res);
    
    if (!res.data) {
      throw new Error('Backend returned empty response');
    }

    if (res.data.success === false) {
      throw new Error(res.data.message || 'Backend rejected the entry');
    }

    // If we get here, save was successful
    await fetchEntries();
    setNote('');
    setMood(null);
    
  } catch (err) {
    const serverMessage = err.response?.data?.message;
    const errorMessage = serverMessage || 
                        err.message || 
                        'Database save failed. Check backend logs.';
    
    console.error('Full error details:', {
      error: err,
      response: err.response,
      request: err.request
    });
    
    setSaveError(errorMessage);
    alert(`Save failed: ${errorMessage}`);
  } finally {
    setIsSaving(false);
  }
};
  
  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${mood ? moodToColor[mood] : 'bg-gray-50'}`}>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">🌤️ Mood Journal</h1>

        <div className="text-center mb-4 text-lg">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
          })}
        </div>

        {loading ? (
          <div className="text-center py-4">Loading weather data...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-4">{error}</div>
        ) : (
          <>
            <WeatherDisplay weather={weather} />
            <MoodSelector mood={mood} setMood={setMood} />
            <Detail note={note} setNote={setNote} />

            {saveError && (
              <div className="text-red-500 text-center mb-2">{saveError}</div>
            )}

            <button
              onClick={saveEntry}
              disabled={!mood || isSaving}
              className={`w-full py-3 px-6 rounded-lg mt-4 font-bold text-white text-lg transition-all ${
                mood ? buttonColors[mood] : 'bg-gray-300 cursor-not-allowed'
              }`}
            >
              Save Today's Entry
            </button>
          </>
        )}

        <CalendarView entries={entries} />
        <ExportToPDF entries={entries} />
      </div>
    </div>
  );
}

export default App;