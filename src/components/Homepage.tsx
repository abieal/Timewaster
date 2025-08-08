import React from 'react';
import { GameState } from '../types/game';
import { Trophy, Clock, MousePointer, Home } from 'lucide-react';

interface HomepageProps {
  gameState: GameState;
  onStartGame: () => void;
}

const Homepage: React.FC<HomepageProps> = ({ gameState, onStartGame }) => {
  const lifeWastePercentage = Math.min((gameState.totalTimeWasted / 3600) * 100, 100); // Assume 1 hour = 100% waste
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8 text-center">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
            <Clock className="w-10 h-10 text-white" />
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
            100 Levels
          </h1>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-teal-400 to-blue-400 bg-clip-text text-transparent">
            of Glorious Time Waste
          </h2>
          
          <p className="text-xl text-gray-300 max-w-lg mx-auto">
            The most pointless game ever created. Each level is designed to waste your time in the most creative ways possible.
          </p>
        </div>

        {/* Progress Card */}
        {gameState.gameStarted && (
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
            <h3 className="text-2xl font-bold text-white mb-4 flex items-center justify-center gap-2">
              <Trophy className="w-6 h-6" />
              Your Shameful Progress
            </h3>
            
            <div className="space-y-4">
              {/* Life Waste Progress Bar */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Life Wasted:</span>
                  <span className="text-orange-400 font-bold">{lifeWastePercentage.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${lifeWastePercentage}%` }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-1">
                  {formatTime(gameState.totalTimeWasted)} of precious life gone forever
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{gameState.currentLevel}</div>
                  <div className="text-sm text-gray-400">Current Level</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-teal-400">{gameState.completedLevels.length}</div>
                  <div className="text-sm text-gray-400">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{gameState.achievements.length}</div>
                  <div className="text-sm text-gray-400">Achievements</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-xl font-bold text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl hover:from-purple-500 hover:to-pink-500 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <MousePointer className="w-6 h-6 mr-2 group-hover:animate-bounce" />
            {gameState.gameStarted ? 'Continue Wasting Time' : 'Start Wasting Time'}
          </button>
          
          <p className="text-gray-400 text-sm">
            Warning: This game serves absolutely no purpose and will definitely make you less productive
          </p>
        </div>

        {/* Fun Facts */}
        {gameState.totalClicks > 0 && (
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10">
            <p className="text-gray-300 text-sm">
              💡 <strong>Useless Fact:</strong> You've clicked {gameState.totalClicks} times. 
              That's enough clicks to... well, nothing really. It\'s just wasted motion.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;