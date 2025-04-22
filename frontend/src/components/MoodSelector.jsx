
import React from 'react';
import { 
  FaSmile, 
  FaMeh, 
  FaFrown, 
  FaAngry,
  FaRegLaughSquint,
  FaRegTired
} from 'react-icons/fa';

const MoodSelector = ({ mood, setMood }) => {
  const moods = [
    { id: 'happy', icon: <FaSmile className="text-3xl" />, label: 'Happy' },
    { id: 'calm', icon: <FaMeh className="text-3xl" />, label: 'Calm' },
    { id: 'sad', icon: <FaFrown className="text-3xl" />, label: 'Sad' },
    { id: 'angry', icon: <FaAngry className="text-3xl" />, label: 'Angry' },
    { id: 'excited', icon: <FaRegLaughSquint className="text-3xl" />, label: 'Excited' },
    { id: 'tired', icon: <FaRegTired className="text-3xl" />, label: 'Tired' }
  ];

  return (
    <div className="mb-6">
      <h2 className="text-xl font-semibold mb-3 text-center">How are you feeling today?</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {moods.map((m) => (
          <button
            key={m.id}
            onClick={() => setMood(m.id)}
            className={`flex flex-col items-center p-3 rounded-full transition-all ${
              mood === m.id ? 'bg-white shadow-lg scale-110' : 'bg-white/70 hover:bg-white'
            }`}
          >
            {m.icon}
            <span className="text-xs mt-1">{m.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoodSelector;



// import React from 'react';

// const MoodSelector = ({ mood, setMood }) => {
//   const moods = [
//     { id: 'happy', label: '😊 Happy' },
//     { id: 'sad', label: '😢 Sad' },
//     { id: 'angry', label: '😠 Angry' },
//     { id: 'calm', label: '😌 Calm' },
//     { id: 'excited', label: '🤩 Excited' },
//     { id: 'tired', label: '😴 Tired' }
//   ];

//   return (
//     <div className="my-4">
//       <h2 className="text-lg font-semibold mb-2">Select your mood:</h2>
//       <div className="grid grid-cols-2 gap-2">
//         {moods.map((m) => (
//           <button
//             key={m.id}
//             type="button"
//             onClick={() => setMood(m.id)}
//             className={`p-3 rounded-lg text-left transition-all ${
//               mood === m.id ? 'bg-blue-100 border-2 border-blue-400' : 'bg-gray-100 hover:bg-gray-200'
//             }`}
//           >
//             {m.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MoodSelector;