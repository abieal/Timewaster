import React from 'react';
import { GameState } from '../types/game';
import { LEVELS } from '../data/levels';
import { Trophy, Clock, MousePointer } from 'lucide-react';

interface LevelGridProps {
  gameState: GameState;
  onPlayLevel: (levelNumber: number) => void;
  onShowBadges: () => void;
}

const LevelGrid: React.FC<LevelGridProps> = ({ gameState, onPlayLevel, onShowBadges }) => {
  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}h ${minutes}m ${secs}s`;
    }
    return `${minutes}m ${secs}s`;
  };

  const lifeWastePercentage = Math.min((gameState.totalTimeWasted / 3600) * 100, 100);

  const handleLevelClick = (levelId: number) => {
    const level = LEVELS.find(l => l.id === levelId);
    if (!level) return;

    if (level.type === 'placeholder') {
      alert(levelId > 75 ? 'This level does not exist. Why did you even click this?' : 'Coming Soon (Never)');
      return;
    }

    if (levelId <= gameState.unlockedLevels) {
      onPlayLevel(levelId);
    }
  };

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            The Ultimate Time Waster
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A sophisticated application designed to help you avoid productivity. Choose your level of procrastination.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-800 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy className="w-5 h-5 text-yellow-400 mr-2" />
                <span className="text-gray-300">Levels Completed</span>
              </div>
              <div className="text-2xl font-bold text-white">{gameState.completedLevels.length}/50</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-red-400 mr-2" />
                <span className="text-gray-300">Time Wasted</span>
              </div>
              <div className="text-2xl font-bold text-white">{formatTime(gameState.totalTimeWasted)}</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <MousePointer className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-gray-300">Total Clicks</span>
              </div>
              <div className="text-2xl font-bold text-white">{gameState.totalClicks.toLocaleString()}</div>
            </div>
          </div>

          {/* Life Waste Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Life Wasted</span>
              <span className="text-red-400 font-bold">{lifeWastePercentage.toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${lifeWastePercentage}%` }}
              />
            </div>
            <p className="text-sm text-gray-400 mt-2 text-center">
              {gameState.totalTimeWasted > 0 
                ? `${formatTime(gameState.totalTimeWasted)} of precious life gone forever`
                : 'Your journey into meaninglessness awaits'
              }
            </p>
          </div>
        </div>

        {/* Badges Button */}
        <div className="text-center mb-8">
          <button
            onClick={onShowBadges}
            className="inline-flex items-center px-6 py-3 bg-yellow-600 hover:bg-yellow-500 text-white rounded-lg transition-colors"
          >
            <Trophy className="w-5 h-5 mr-2" />
            View Badges ({gameState.badges.length})
          </button>
        </div>
      </div>

      {/* Level Grid */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
          {LEVELS.map((level) => {
            const isUnlocked = level.id <= gameState.unlockedLevels;
            const isCompleted = gameState.completedLevels.includes(level.id);
            const isPlaceholder = level.type === 'placeholder';
            
            return (
              <button
                key={level.id}
                onClick={() => handleLevelClick(level.id)}
                className={`
                  aspect-square rounded-lg border-2 transition-all duration-200 relative
                  ${isCompleted 
                    ? 'bg-green-600 border-green-500 text-white hover:bg-green-500' 
                    : isUnlocked && !isPlaceholder
                    ? 'bg-blue-600 border-blue-500 text-white hover:bg-blue-500 hover:scale-105'
                    : 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed'
                  }
                `}
                disabled={!isUnlocked || isPlaceholder}
              >
                <div className="flex flex-col items-center justify-center h-full p-2">
                  <span className="font-bold text-sm md:text-base">{level.id}</span>
                  {isCompleted && (
                    <div className="absolute top-1 right-1">
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                    </div>
                  )}
                  {!isUnlocked && !isPlaceholder && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <div className="text-xs">🔒</div>
                    </div>
                  )}
                  {isPlaceholder && (
                    <div className="absolute inset-0 bg-gray-800 bg-opacity-80 rounded-lg flex items-center justify-center">
                      <div className="text-xs">?</div>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-6xl mx-auto mt-12 text-center">
        <p className="text-gray-500 text-sm">
          Levels 1-50 are playable. Levels 51-100 exist only to mock your ambition.
        </p>
      </div>
    </div>
  );
};

export default LevelGrid;