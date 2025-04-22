    // import React, { useState, useEffect } from 'react';
    // import axios from 'axios';
    // import MoodSelector from './components/MoodSelector';
    // import WeatherDisplay from './components/WeatherDisplay';
    // import Detail from './components/Detail';
    // import CalendarView from './components/CalendarView';
    // import ExportToPDF from './components/ExportToPDF';
    // // import ThemeToggle from './components/ThemeToogle.jsx'

    // function App() {
    //   const [mood, setMood] = useState(null);
    //   const [note, setNote] = useState('');
    //   const [weather, setWeather] = useState(null);
    //   const [entries, setEntries] = useState([]);
    //   const [loading, setLoading] = useState(true);
    //   const [error, setError] = useState(null);

    //   const moodToColor = {
    //     happy: 'bg-yellow-300',
    //     sad: 'bg-blue-300',
    //     angry: 'bg-red-300',
    //     calm: 'bg-green-300',
    //     excited: 'bg-orange-300',
    //     tired: 'bg-gray-400'
    //   };

    //   const buttonColors = {
    //     happy: 'bg-yellow-600 hover:bg-yellow-700',
    //     sad: 'bg-blue-600 hover:bg-blue-700',
    //     angry: 'bg-red-600 hover:bg-red-700',
    //     calm: 'bg-green-600 hover:bg-green-700',
    //     excited: 'bg-orange-600 hover:bg-orange-700',
    //     tired: 'bg-gray-600 hover:bg-gray-700'
    //   };

    //   useEffect(() => {
    //     const fetchData = async () => {
    //       try {
    //         if (navigator.geolocation) {
    //           navigator.geolocation.getCurrentPosition(
    //             async (position) => {
    //               const { latitude, longitude } = position.coords;
    //               const weatherData = await fetchWeather(latitude, longitude);
    //               setWeather(weatherData);
    //               setLoading(false);
    //             },
    //             async (error) => {
    //               console.error("Geolocation error:", error);
    //               // Fallback to default location (London)
    //               const weatherData = await fetchWeather(51.5074, 0.1278);
    //               setWeather(weatherData);
    //               setLoading(false);
    //             }
    //           );
    //         } else {
    //           // If geolocation is not supported
    //           const weatherData = await fetchWeather(51.5074, 0.1278);
    //           setWeather(weatherData);
    //           setLoading(false);
    //         }
    //       } catch (err) {
    //         setError("Failed to load weather data");
    //         setLoading(false);
    //         console.error(err);
    //       }
    //     };

    //     fetchData();
        
    //     // Load saved entries from localStorage
    //     const savedEntries = localStorage.getItem('moodEntries');
    //     if (savedEntries) {
    //       setEntries(JSON.parse(savedEntries));
    //     }
    //   }, []);

    //   const fetchWeather = async (lat, lon) => {
    //     try {
    //       const API_KEY = '7fe1470a73e32f2f88f6e71e5d1f950d';
    //       const response = await axios.get(
    //         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    //       );
    //       return response.data;
    //     } catch (error) {
    //       console.error("Weather API error:", error);
    //       throw error;
    //     }
    //   };

    //   const saveEntry = () => {
    //     if (!mood) return;
        
    //     const newEntry = { 
    //       date: new Date(), 
    //       mood, 
    //       note, 
    //       weather: {
    //         temp: weather?.main?.temp,
    //         condition: weather?.weather?.[0]?.main
    //       }
    //     };
        
    //     const updatedEntries = [...entries, newEntry];
    //     setEntries(updatedEntries);
    //     localStorage.setItem('moodEntries', JSON.stringify(updatedEntries));
    //     setNote('');
    //     alert('Entry saved successfully!');
    //   };

    //   return (
    //     <div className={`min-h-screen p-6 transition-colors duration-300 ${mood ? moodToColor[mood] : 'bg-gray-50'}`}>
    //       <div className="max-w-2xl mx-auto">
    //         <h1 className="text-3xl font-bold text-center mb-6">🌤️ Mood Journal</h1>
            
    //         <div className="text-center mb-4 text-lg">
    //           {new Date().toLocaleDateString('en-US', { 
    //             weekday: 'long', 
    //             month: 'long', 
    //             day: 'numeric' 
    //           })}
    //         </div>

    //         {loading ? (
    //           <div className="text-center py-4">Loading weather data...</div>
    //         ) : error ? (
    //           <div className="text-center text-red-500 py-4">{error}</div>
    //         ) : (
    //           <>
    //             <WeatherDisplay weather={weather} />
    //             <MoodSelector mood={mood} setMood={setMood} />
    //             <Detail note={note} setNote={setNote} />

    //             <button
    //               onClick={saveEntry}
    //               disabled={!mood}
    //               className={`w-full py-3 px-6 rounded-lg mt-4 font-bold text-white text-lg transition-all ${
    //                 mood ? buttonColors[mood] : 'bg-gray-300 cursor-not-allowed'
    //               }`}
    //             >
    //               Save Today's Entry
    //             </button>
    //           </>
    //         )}

    //         <CalendarView entries={entries} />
    //         <ExportToPDF entries={entries} />
    //       </div>
    //     </div>
    //   );
    // }

    // export default App;



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
              const weatherData = await fetchWeather(51.5074, 0.1278); // fallback to London
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
        console.error(err);
      }
    };

    const fetchEntries = async () => {
      try {
        const res = await axios.get('http://localhost:5000/entries');
        setEntries(res.data);
      } catch (err) {
        console.error("Failed to fetch entries:", err);
      }
    };

    fetchData();
    fetchEntries();
  }, []);

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

  // const saveEntry = async () => {
  //   if (!mood) return;

  //   const newEntry = {
  //     date: new Date(),
  //     mood,
  //     note,
  //     weather: {
  //       temp: weather?.main?.temp,
  //       condition: weather?.weather?.[0]?.main
  //     }
  //   };

  //   try {
  //     const res = await axios.post('http://localhost:5000/api/entries', newEntry);
  //     setEntries(prev => [...prev, res.data]);
  //     setNote('');
  //     alert('Entry saved to backend!');
  //   } catch (err) {
  //     console.error("Error saving entry:", err);
  //     alert('Failed to save entry.');
  //   }
  // };
  const saveEntry = async () => {
    if (!mood) return;
  
    const newEntry = {
      date: new Date(),
      mood,
      note,
      weather: {
        temp: weather?.main?.temp,
        condition: weather?.weather?.[0]?.main
      }
    };
  
    try {
      console.log('Sending entry to backend:', newEntry);
      const res = await axios.post('http://localhost:5000/entries', newEntry, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log('Response from backend:', res.data);
      setEntries(prev => [...prev, res.data]);
      setNote('');
      alert('Entry saved successfully!');
    } catch (err) {
      console.error("Error saving entry:", err.response?.data || err.message);
      alert(`Failed to save entry: ${err.response?.data?.error || err.message}`);
    }
  };
  
  // In your fetchEntries function:
  const fetchEntries = async () => {
    try {
      const res = await axios.get('http://localhost:5000/entries');
      console.log('Fetched entries:', res.data);
      setEntries(res.data);
    } catch (err) {
      console.error("Failed to fetch entries:", err.response?.data || err.message);
      setError("Failed to load entries");
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

            <button
              onClick={saveEntry}
              disabled={!mood}
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
