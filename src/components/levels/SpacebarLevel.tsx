import React, { useState, useEffect } from 'react';
import { LevelConfig } from '../../types/game';

interface SpacebarLevelProps {
  level: LevelConfig;
  onComplete: () => void;
  onUpdateSpacebars: (count: number) => void;
}

const SpacebarLevel: React.FC<SpacebarLevelProps> = ({ level, onComplete, onUpdateSpacebars }) => {
  const [presses, setPresses] = useState(0);
  const [shakeIntensity, setShakeIntensity] = useState(0);
  const [isListening, setIsListening] = useState(false);
  
  const target = level.target || 200;

  useEffect(() => {
    if (!isListening) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        
        if (presses < target) {
          const newPresses = presses + 1;
          setPresses(newPresses);
          onUpdateSpacebars(1);
          
          // Increase shake intensity
          const intensity = Math.min((newPresses / target) * 20, 20);
          setShakeIntensity(intensity);
          
          // Console messages
          if (newPresses === 1) {
            console.log('Spacebar: "Ouch! That\'s my first hit!"');
          } else if (newPresses === 50) {
            console.log('Spacebar: "I\'m starting to feel numb..."');
          } else if (newPresses === 100) {
            console.log('Spacebar: "This is abuse! I\'m calling keyboard protective services!"');
          } else if (newPresses === 150) {
            console.log('Spacebar: "I can\'t feel my springs anymore..."');
          } else if (newPresses === target - 10) {
            console.log('Spacebar: "Please... just 10 more and end my suffering..."');
          }
          
          if (newPresses >= target) {
            console.log('Spacebar: "Finally... sweet release from this torment."');
            setTimeout(() => {
              onComplete();
            }, 1000);
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isListening, presses, target, onUpdateSpacebars, onComplete]);

  const startListening = () => {
    setIsListening(true);
  };

  const getShakeStyle = () => {
    if (shakeIntensity === 0) return {};
    
    return {
      transform: `translate(${Math.random() * shakeIntensity - shakeIntensity/2}px, ${Math.random() * shakeIntensity - shakeIntensity/2}px)`,
      transition: 'transform 0.1s ease-out'
    };
  };

  const getMotivationalMessage = () => {
    if (presses >= target) {
      return "Mission accomplished! Your spacebar will never be the same. Neither will you.";
    }
    
    if (!isListening) {
      return "Click 'Start' and then press the spacebar repeatedly. Your keyboard is about to hate you.";
    }
    
    const remaining = target - presses;
    if (remaining > 150) {
      return `${remaining} presses to go. Your spacebar is still optimistic.`;
    } else if (remaining > 100) {
      return `${remaining} left. The spacebar is starting to worry.`;
    } else if (remaining > 50) {
      return `${remaining} remaining. Your spacebar is filing a complaint.`;
    } else if (remaining > 10) {
      return `Only ${remaining} more! The spacebar sees the light at the end of the tunnel.`;
    } else {
      return `${remaining} final presses! The spacebar is praying for mercy.`;
    }
  };

  const progress = (presses / target) * 100;

  return (
    <div className="space-y-8" style={getShakeStyle()}>
      {/* Instructions */}
      <div className="text-center space-y-4">
        <div className="text-6xl">⌨️</div>
        <p className="text-xl text-gray-300">
          Press the Spacebar {target} Times
        </p>
        <p className="text-gray-400">
          Each press will shake the screen a little more. Because why not?
        </p>
      </div>

      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Spacebar Abuse Progress</span>
          <span className="text-green-400 font-bold">{presses}/{target}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-6">
          <div 
            className="bg-gradient-to-r from-green-500 to-yellow-500 h-6 rounded-full transition-all duration-200 flex items-center justify-end pr-2"
            style={{ width: `${Math.max(progress, 5)}%` }}
          >
            {progress > 10 && (
              <span className="text-white text-xs font-bold">⌨️</span>
            )}
          </div>
        </div>
      </div>

      {/* Start Button or Spacebar Visual */}
      <div className="text-center">
        {!isListening ? (
          <button
            onClick={startListening}
            className="px-8 py-4 bg-green-600 hover:bg-green-500 text-white text-xl font-bold rounded-xl transition-colors"
          >
            Start Spacebar Torture
          </button>
        ) : (
          <div className="space-y-4">
            <div 
              className={`
                inline-block px-16 py-8 bg-gray-600 rounded-xl border-4 border-gray-500
                text-white text-2xl font-bold transition-all duration-100
                ${presses > 0 ? 'animate-pulse' : ''}
              `}
              style={{
                backgroundColor: presses >= target ? '#10b981' : `hsl(${120 - (presses / target) * 120}, 70%, 40%)`,
                transform: `scale(${1 + (shakeIntensity / 100)})`
              }}
            >
              SPACEBAR
            </div>
            
            <p className="text-gray-400">
              {presses >= target ? '🎉 COMPLETE! 🎉' : 'Keep pressing the spacebar!'}
            </p>
          </div>
        )}
      </div>

      {/* Motivational Message */}
      <div className="bg-gray-700 rounded-lg p-4 text-center">
        <p className="text-gray-300 italic">
          "{getMotivationalMessage()}"
        </p>
      </div>

      {/* Shake Intensity Meter */}
      {isListening && (
        <div className="text-center">
          <div className="text-sm text-gray-400 mb-2">Screen Shake Intensity</div>
          <div className="w-full bg-gray-700 rounded-full h-2 max-w-xs mx-auto">
            <div 
              className="bg-red-500 h-2 rounded-full transition-all duration-200"
              style={{ width: `${(shakeIntensity / 20) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Console Output */}
      <div className="bg-black rounded-lg p-4 font-mono text-sm">
        <div className="text-green-400">Keyboard Status:</div>
        <div className="text-gray-300 mt-2">
          {presses === 0 && isListening && (
            <div className="text-yellow-400">Spacebar: "I'm ready... I think."</div>
          )}
          {presses > 0 && presses < target && (
            <div className="text-orange-400">
              Spacebar health: {Math.max(0, 100 - (presses / target) * 100).toFixed(0)}%
            </div>
          )}
          {presses >= target && (
            <div className="text-red-400">
              Spacebar: "I am broken. You have broken me. Are you happy now?"
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpacebarLevel;