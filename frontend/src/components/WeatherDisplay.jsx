// import React from 'react';
// import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';

// const WeatherDisplay = ({ weather }) => {
//   if (!weather) return <div className="text-center py-4">Loading weather...</div>;

//   const getWeatherIcon = () => {
//     const main = weather.weather[0].main;
//     switch (main) {
//       case 'Clear': return <WiDaySunny className="text-5xl" />;
//       case 'Clouds': return <WiCloudy className="text-5xl" />;
//       case 'Rain': return <WiRain className="text-5xl" />;
//       case 'Snow': return <WiSnow className="text-5xl" />;
//       case 'Thunderstorm': return <WiThunderstorm className="text-5xl" />;
//       default: return <WiDaySunny className="text-5xl" />;
//     }
//   };

//   return (
//     <div className="flex items-center justify-center gap-4 mb-6 p-4 bg-white rounded-lg shadow">
//       {getWeatherIcon()}
//       <div>
//         <p className="font-semibold">{Math.round(weather.main.temp)}°C</p>
//         <p className="text-sm capitalize">{weather.weather[0].description}</p>
//         <p className="text-xs">{weather.name}</p>
//       </div>
//     </div>
//   );
// };

// export default WeatherDisplay;

import React from 'react';

const WeatherDisplay = ({ weather }) => {
  if (!weather) return null;

  const weatherIcons = {
    Clear: '☀️',
    Clouds: '☁️',
    Rain: '🌧️',
    Snow: '❄️',
    Thunderstorm: '⛈️',
    Drizzle: '🌦️',
    Mist: '🌫️',
    default: '🌤️'
  };

  const icon = weatherIcons[weather.weather[0].main] || weatherIcons.default;

  return (
    <div className="bg-white/80 p-4 rounded-lg shadow mb-4 text-center">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="text-xl font-semibold">
        {Math.round(weather.main.temp)}°C | {weather.weather[0].main}
      </p>
      <p className="text-sm text-gray-600">
        {weather.name}, {weather.sys.country}
      </p>
    </div>
  );
};

export default WeatherDisplay;