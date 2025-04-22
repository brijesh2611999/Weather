
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