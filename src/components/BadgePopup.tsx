import React, { useEffect, useState } from 'react';
import { Badge } from '../types/game';
import { X, Trophy } from 'lucide-react';

interface BadgePopupProps {
  badge: Badge;
  onDismiss: () => void;
}

const BadgePopup: React.FC<BadgePopupProps> = ({ badge, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
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
          bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 
          rounded-xl p-6 max-w-md w-full shadow-2xl border-4 border-yellow-300
          transform transition-all duration-300 pointer-events-auto
          ${isVisible ? 'scale-100 opacity-100 rotate-0' : 'scale-75 opacity-0 rotate-6'}
        `}
      >
        <div className="relative">
          <button
            onClick={handleDismiss}
            className="absolute -top-2 -right-2 w-6 h-6 bg-black bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>

          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <Trophy className="w-12 h-12 text-white animate-bounce" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">
                BADGE UNLOCKED!
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-2">
                <span className="text-4xl">{badge.icon}</span>
                <h3 className="text-xl font-bold text-white drop-shadow">
                  {badge.name}
                </h3>
              </div>
            </div>

            <p className="text-white text-opacity-90 text-sm leading-relaxed drop-shadow">
              {badge.description}
            </p>

            <div className="text-xs text-white text-opacity-75 italic">
              "You did it! Now you're one step closer to... nothing."
            </div>
          </div>
        </div>
      </div>
      
      <div 
        className="fixed inset-0 bg-black bg-opacity-30 pointer-events-auto"
        onClick={handleDismiss}
      />
    </div>
  );
};

export default BadgePopup;