import React, { useState } from 'react';
import { LevelConfig } from '../../types/game';

interface ClickLevelProps {
  level: LevelConfig;
  onComplete: () => void;
  onUpdateClicks: (clicks: number) => void;
}

const ClickLevel: React.FC<ClickLevelProps> = ({ level, onComplete, onUpdateClicks }) => {
  const [clicks, setClicks] = useState(0);
  const target = level.target || 100;
  
  const messages = [
    "Just one more",
    "Your finger is getting tired",
    "Still here?",
    "This is your life now",
    "Click away your dreams",
    "Productivity is overrated",
    "Your mouse is judging you",
    "Almost there... not!",
    "Keep clicking, nothing else matters",
    "This is peak entertainment",
    "Your time has no value",
    "Click like your life depends on it",
    "Embrace the meaninglessness",
    "You're really doing this",
    "Professional time waster"
  ];

  const handleClick = () => {
    if (clicks < target) {
      const newClicks = clicks + 1;
      setClicks(newClicks);
      onUpdateClicks(1);
      
      if (newClicks >= target) {
        setTimeout(() => {
          onComplete();
        }, 1000);
      }
    }
  };

  const getCurrentMessage = () => {
    if (clicks >= target) {
      return "You did it! Now you're one step closer to... nothing.";
    }
    if (clicks === 0) {
      return "Click the button to begin your descent into meaninglessness";
    }
    return messages[clicks % messages.length];
  };

  const progress = (clicks / target) * 100;

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Progress</span>
          <span className="text-blue-400 font-bold">{clicks}/{target}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Button */}
      <div className="text-center">
        <button
          onClick={handleClick}
          disabled={clicks >= target}
          className={`
            px-12 py-6 text-xl font-bold rounded-xl transition-all duration-150
            transform hover:scale-105 active:scale-95
            ${clicks >= target 
              ? 'bg-green-600 text-white cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-500 text-white'
            }
          `}
        >
          {clicks >= target ? '🎉 COMPLETE! 🎉' : `Click Me! (${clicks}/${target})`}
        </button>
      </div>

      {/* Message */}
      <div className="bg-gray-700 rounded-lg p-4 text-center">
        <p className="text-gray-300 italic">
          "{getCurrentMessage()}"
        </p>
      </div>

      {clicks >= target && (
        <div className="text-center">
          <p className="text-green-400 text-lg font-bold">
            Congratulations! You successfully wasted time clicking a button {target} times!
          </p>
        </div>
      )}
    </div>
  );
};

export default ClickLevel;