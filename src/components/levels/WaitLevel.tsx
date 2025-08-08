import React, { useState, useEffect } from 'react';
import { LevelConfig } from '../../types/game';

interface WaitLevelProps {
  level: LevelConfig;
  onComplete: () => void;
}

const WaitLevel: React.FC<WaitLevelProps> = ({ level, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [message, setMessage] = useState('');
  
  const duration = (level.duration || 30) * 1000; // Convert to milliseconds

  useEffect(() => {
    if (!isStarted) return;

    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const currentProgress = Math.min((elapsed / duration) * 100, 99);
      
      setProgress(currentProgress);
      
      // Update messages based on progress
      if (currentProgress < 20) {
        setMessage('This is taking forever...');
      } else if (currentProgress < 40) {
        setMessage('Still waiting... like your life has meaning');
      } else if (currentProgress < 60) {
        setMessage('Halfway there! (To nowhere)');
      } else if (currentProgress < 80) {
        setMessage('Almost done wasting time!');
      } else if (currentProgress < 99) {
        setMessage('So close to meaningless completion!');
      }

      // The cruel joke - reset at 99%
      if (currentProgress >= 99) {
        setMessage('Almost there... not!');
        setTimeout(() => {
          setProgress(0);
          setMessage('Gotcha! Starting over...');
          // Actually complete after the reset joke
          setTimeout(() => {
            onComplete();
          }, 2000);
        }, 1000);
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isStarted, duration, onComplete]);

  if (!isStarted) {
    return (
      <div className="space-y-8 text-center">
        <div className="space-y-4">
          <div className="text-6xl">⏳</div>
          <p className="text-xl text-gray-300">
            Ready to waste {level.duration} seconds of your precious life?
          </p>
          <p className="text-gray-400">
            Click the button and then... just wait. Do nothing. Contemplate your choices.
          </p>
        </div>
        
        <button
          onClick={() => setIsStarted(true)}
          className="px-8 py-4 bg-orange-600 hover:bg-orange-500 text-white text-xl font-bold rounded-xl transition-colors"
        >
          Start Wasting Time
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Progress Circle */}
      <div className="flex justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="6"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#f97316"
              strokeWidth="6"
              fill="none"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * progress) / 100}
              className="transition-all duration-100 ease-linear"
              strokeLinecap="round"
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <div className="text-4xl font-bold text-white">
              {progress.toFixed(0)}%
            </div>
            <div className="text-gray-400 text-sm">
              {progress >= 99 ? 'Resetting...' : 'Loading...'}
            </div>
          </div>
        </div>
      </div>

      {/* Message */}
      <div className="bg-gray-700 rounded-lg p-6 text-center">
        <p className="text-xl text-gray-300 italic">
          "{message}"
        </p>
      </div>

      {/* Waiting Animation */}
      <div className="flex justify-center space-x-2">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 bg-orange-400 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 0.3}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default WaitLevel;