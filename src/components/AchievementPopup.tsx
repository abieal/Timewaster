import React, { useEffect, useState } from 'react';
import { Achievement } from '../types/game';
import { X } from 'lucide-react';

interface AchievementPopupProps {
  achievement: Achievement;
  onDismiss: () => void;
}

const AchievementPopup: React.FC<AchievementPopupProps> = ({ achievement, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation
    setIsVisible(true);
    
    // Auto dismiss after 5 seconds
    const timer = setTimeout(() => {
      handleDismiss();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(onDismiss, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
      <div 
        className={`
          bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500 
          rounded-xl p-6 max-w-md w-full shadow-2xl border-4 border-yellow-300
          transform transition-all duration-300 pointer-events-auto
          ${isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 rotate-12'}
        `}
      >
        <div className="relative">
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="text-center space-y-4">
            <div className="text-6xl animate-bounce">{achievement.icon}</div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                🎉 ACHIEVEMENT UNLOCKED! 🎉
              </h2>
              <h3 className="text-xl font-bold text-white drop-shadow">
                {achievement.title}
              </h3>
            </div>

            <p className="text-white text-opacity-90 text-sm leading-relaxed drop-shadow">
              {achievement.description}
            </p>

            <div className="flex justify-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-white rounded-full animate-ping"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/30 pointer-events-none"
        onClick={handleDismiss}
      />
    </div>
  );
};

export default AchievementPopup;