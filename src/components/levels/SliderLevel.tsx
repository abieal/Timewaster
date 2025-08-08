import React, { useState, useEffect } from 'react';
import { LevelConfig } from '../../types/game';

interface SliderLevelProps {
  level: LevelConfig;
  onComplete: () => void;
}

const SliderLevel: React.FC<SliderLevelProps> = ({ level, onComplete }) => {
  const [sliderValue, setSliderValue] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const [isRebelling, setIsRebelling] = useState(false);
  
  const targetCycles = level.sliderRepeats || 10;

  // Rebellious slider behavior
  useEffect(() => {
    if (isRebelling) {
      const rebellion = setTimeout(() => {
        const randomJump = Math.random() * 100;
        setSliderValue(randomJump);
        setIsRebelling(false);
        console.log('Slider rebellion: "I do what I want!"');
      }, 200);
      
      return () => clearTimeout(rebellion);
    }
  }, [isRebelling]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    
    // Random chance of rebellion
    if (Math.random() < 0.15) {
      setIsRebelling(true);
      console.log('Slider: "Nope, going somewhere else!"');
      return;
    }
    
    setSliderValue(newValue);
    
    // Check for cycle completion
    if (direction === 'up' && newValue >= 100) {
      setDirection('down');
      console.log('Slider: "Fine, going back down... grudgingly"');
    } else if (direction === 'down' && newValue <= 0) {
      setDirection('up');
      const newCompletedCycles = completedCycles + 1;
      setCompletedCycles(newCompletedCycles);
      
      if (newCompletedCycles >= targetCycles) {
        setTimeout(() => {
          onComplete();
        }, 500);
      } else {
        console.log(`Slider: "Cycle ${newCompletedCycles} complete. ${targetCycles - newCompletedCycles} more to go, human."`);
      }
    }
  };

  const getSliderMessage = () => {
    if (completedCycles >= targetCycles) {
      return "Finally! The slider has been tamed. You are now a certified slider whisperer.";
    }
    
    if (isRebelling) {
      return "The slider is having a tantrum and jumped somewhere random!";
    }
    
    const remaining = targetCycles - completedCycles;
    if (remaining === targetCycles) {
      return `Drag me from 0% to 100% and back ${targetCycles} times. I might not cooperate.`;
    }
    
    return `${remaining} more cycle${remaining === 1 ? '' : 's'} to go. The slider is getting more rebellious!`;
  };

  const getDirectionHint = () => {
    if (completedCycles >= targetCycles) return '';
    return direction === 'up' ? '→ Drag towards 100%' : '← Drag towards 0%';
  };

  return (
    <div className="space-y-8">
      {/* Progress */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Cycles Completed</span>
          <span className="text-purple-400 font-bold">{completedCycles}/{targetCycles}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${(completedCycles / targetCycles) * 100}%` }}
          />
        </div>
      </div>

      {/* Slider */}
      <div className="space-y-6">
        <div className="relative">
          <input
            type="range"
            min="0"
            max="100"
            value={sliderValue}
            onChange={handleSliderChange}
            disabled={completedCycles >= targetCycles}
            className={`
              w-full h-6 bg-gray-700 rounded-lg appearance-none cursor-pointer
              slider-thumb transition-all duration-200
              ${isRebelling ? 'animate-pulse' : ''}
              ${completedCycles >= targetCycles ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          />
          
          {/* Value display */}
          <div className="flex justify-between text-sm text-gray-400 mt-2">
            <span>0%</span>
            <span className="font-bold text-white">{sliderValue}%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Direction hint */}
        <div className="text-center">
          <p className="text-lg text-purple-400 font-bold">
            {getDirectionHint()}
          </p>
        </div>
      </div>

      {/* Message */}
      <div className="bg-gray-700 rounded-lg p-4 text-center">
        <p className="text-gray-300 italic">
          "{getSliderMessage()}"
        </p>
      </div>

      {/* Console Messages */}
      <div className="bg-black rounded-lg p-4 font-mono text-sm">
        <div className="text-green-400">Console:</div>
        <div className="text-gray-300 mt-2">
          {isRebelling && <div className="text-red-400">Slider.exe has stopped responding</div>}
          {completedCycles > 0 && (
            <div className="text-yellow-400">
              Warning: Slider becoming increasingly uncooperative
            </div>
          )}
          {completedCycles >= targetCycles && (
            <div className="text-green-400">
              Success: You have achieved peak slider mastery (somehow)
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .slider-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
        
        .slider-thumb::-moz-range-thumb {
          height: 24px;
          width: 24px;
          border-radius: 50%;
          background: linear-gradient(45deg, #8b5cf6, #ec4899);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default SliderLevel;