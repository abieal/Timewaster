import React, { useState, useEffect } from 'react';
import { GameState } from '../types/game';
import { LEVELS } from '../data/levels';
import ClickLevel from './levels/ClickLevel';
import WaitLevel from './levels/WaitLevel';
import TypeLevel from './levels/TypeLevel';
import { Home, Trophy, Clock, MousePointer } from 'lucide-react';

interface LevelScreenProps {
  gameState: GameState;
  onUpdateGameState: (updates: Partial<GameState>) => void;
  onCompleteLevel: (levelNumber: number) => void;
  onGoHome: () => void;
}

const LevelScreen: React.FC<LevelScreenProps> = ({
  gameState,
  onUpdateGameState,
  onCompleteLevel,
  onGoHome
}) => {
  const [levelStartTime, setLevelStartTime] = useState<number>(Date.now());
  const currentLevelConfig = LEVELS.find(l => l.id === gameState.currentLevel);

  useEffect(() => {
    setLevelStartTime(Date.now());
  }, [gameState.currentLevel]);

  if (!currentLevelConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">🎉 Congratulations! 🎉</h1>
          <p className="text-xl text-gray-300 mb-8">
            You've reached the end of the available levels. More levels coming soon!
          </p>
          <button
            onClick={onGoHome}
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleLevelComplete = () => {
    const timeSpent = Math.floor((Date.now() - levelStartTime) / 1000);
    onUpdateGameState({
      totalTimeWasted: gameState.totalTimeWasted + timeSpent
    });
    onCompleteLevel(gameState.currentLevel);
  };

  const updateClicks = (clicks: number) => {
    onUpdateGameState({
      totalClicks: gameState.totalClicks + clicks
    });
  };

  const renderLevel = () => {
    switch (currentLevelConfig.type) {
      case 'click':
        return (
          <ClickLevel
            config={currentLevelConfig}
            onComplete={handleLevelComplete}
            onUpdateClicks={updateClicks}
          />
        );
      case 'wait':
        return (
          <WaitLevel
            config={currentLevelConfig}
            onComplete={handleLevelComplete}
          />
        );
      case 'type':
        return (
          <TypeLevel
            config={currentLevelConfig}
            onComplete={handleLevelComplete}
          />
        );
      default:
        return <div>Unknown level type</div>;
    }
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={onGoHome}
            className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors backdrop-blur-sm border border-white/20"
          >
            <Home className="w-4 h-4 mr-2" />
            Home
          </button>
          
          <div className="flex items-center gap-6 text-white">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span>Level {gameState.currentLevel}/100</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-teal-400" />
              <span>{Math.floor(gameState.totalTimeWasted / 60)}min wasted</span>
            </div>
            <div className="flex items-center gap-2">
              <MousePointer className="w-5 h-5 text-purple-400" />
              <span>{gameState.totalClicks} clicks</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(gameState.completedLevels.length / 100) * 100}%` }}
          />
        </div>
        <p className="text-center text-gray-400 text-sm">
          {gameState.completedLevels.length} of 100 levels of pure time waste completed
        </p>
      </div>

      {/* Level Content */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20 text-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-white mb-3">
              Level {currentLevelConfig.id}: {currentLevelConfig.title}
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed">
              {currentLevelConfig.description}
            </p>
          </div>

          {renderLevel()}

          <div className="mt-8 text-sm text-gray-400">
            <p>⏱️ Estimated time waste: {currentLevelConfig.timeWasteEstimate} seconds</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelScreen;