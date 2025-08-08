import React, { useState } from 'react';
import { LevelConfig } from '../../types/game';
import { Keyboard, CheckCircle } from 'lucide-react';

interface TypeLevelProps {
  config: LevelConfig;
  onComplete: () => void;
}

const TypeLevel: React.FC<TypeLevelProps> = ({ config, onComplete }) => {
  const [input, setInput] = useState('');
  const [completedCount, setCompletedCount] = useState(0);
  
  const targetText = config.text || 'potato';
  const targetCount = config.target || 20;
  const progress = (completedCount / targetCount) * 100;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);

    // Check if they typed the target word correctly
    if (value.toLowerCase() === targetText.toLowerCase()) {
      const newCount = completedCount + 1;
      setCompletedCount(newCount);
      setInput(''); // Clear input for next word
      
      if (newCount >= targetCount) {
        setTimeout(() => {
          onComplete();
        }, 500);
      }
    }
  };

  const getInstructions = () => {
    if (completedCount >= targetCount) {
      return "🎉 You've successfully typed meaningless words! Your keyboard thanks you!";
    }
    if (completedCount === 0) {
      return `Type "${targetText}" in the box below and press Enter. Then do it ${targetCount - 1} more times because... reasons.`;
    }
    const remaining = targetCount - completedCount;
    return `Good! Now type "${targetText}" ${remaining} more ${remaining === 1 ? 'time' : 'times'}. Your dedication to pointlessness is admirable.`;
  };

  const getMotivationalQuip = () => {
    const remaining = targetCount - completedCount;
    if (remaining > 15) return "This is definitely the best use of your typing skills.";
    if (remaining > 10) return "Your English teacher would be so proud... or horrified.";
    if (remaining > 5) return "Almost done! You're becoming a professional word-waster!";
    if (remaining > 1) return `Just ${remaining} more! You can practically taste the pointlessness!`;
    return "ONE MORE! This final word will complete your transformation into a typing master of nothing!";
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-300">Typing Progress:</span>
          <span className="text-teal-400 font-bold">{completedCount}/{targetCount}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4">
          <div 
            className="bg-gradient-to-r from-teal-500 to-blue-500 h-4 rounded-full transition-all duration-300 flex items-center justify-end pr-2"
            style={{ width: `${Math.max(progress, 8)}%` }}
          >
            {progress > 15 && (
              <Keyboard className="w-3 h-3 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center space-y-4">
        <p className="text-xl text-white">
          {getInstructions()}
        </p>
        
        {completedCount < targetCount && (
          <div className="bg-white/10 rounded-lg p-4 border border-white/20">
            <p className="text-3xl font-bold text-teal-400 mb-2">
              Type: "{targetText}"
            </p>
          </div>
        )}
      </div>

      {/* Input Field */}
      {completedCount < targetCount && (
        <div className="space-y-4">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={`Type "${targetText}" here...`}
            className="w-full px-6 py-4 text-2xl text-center bg-white/10 border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-teal-400 focus:outline-none transition-colors"
            autoFocus
          />
          
          <div className="text-center">
            <p className="text-gray-400 text-sm italic">
              "{getMotivationalQuip()}"
            </p>
          </div>
        </div>
      )}

      {/* Completion Status */}
      {completedCount > 0 && (
        <div className="flex justify-center items-center space-x-4">
          {[...Array(targetCount)].map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index < completedCount 
                  ? 'bg-teal-400 scale-110' 
                  : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}

      {/* Success Message */}
      {completedCount >= targetCount && (
        <div className="text-center space-y-4">
          <CheckCircle className="w-16 h-16 text-green-400 mx-auto animate-pulse" />
          <p className="text-2xl text-green-400 font-bold">
            Mission Accomplished!
          </p>
          <p className="text-gray-300">
            You typed "{targetText}" {targetCount} times. This achievement will surely impress... no one.
          </p>
        </div>
      )}
    </div>
  );
};

export default TypeLevel;