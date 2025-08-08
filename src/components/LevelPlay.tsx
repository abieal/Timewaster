import React from 'react';
import { GameState } from '../types/game';
import { LEVELS } from '../data/levels';
import ClickLevel from './levels/ClickLevel';
import WaitLevel from './levels/WaitLevel';
import SliderLevel from './levels/SliderLevel';
import PixelLevel from './levels/PixelLevel';
import SpacebarLevel from './levels/SpacebarLevel';
import { ArrowLeft } from 'lucide-react';

interface LevelPlayProps {
  levelNumber: number;
  gameState: GameState;
  onUpdateGameState: (updates: Partial<GameState>) => void;
  onCompleteLevel: (levelNumber: number) => void;
  onBackToGrid: () => void;
}

const LevelPlay: React.FC<LevelPlayProps> = ({
  levelNumber,
  gameState,
  onUpdateGameState,
  onCompleteLevel,
  onBackToGrid
}) => {
  const level = LEVELS.find(l => l.id === levelNumber);

  if (!level) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Level Not Found</h1>
          <p className="text-gray-400 mb-8">This level doesn't exist. How did you get here?</p>
          <button
            onClick={onBackToGrid}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors"
          >
            Back to Grid
          </button>
        </div>
      </div>
    );
  }

  const renderLevel = () => {
    switch (level.type) {
      case 'click':
        return (
          <ClickLevel
            level={level}
            onComplete={() => onCompleteLevel(levelNumber)}
            onUpdateClicks={(clicks) => onUpdateGameState({ 
              totalClicks: gameState.totalClicks + clicks 
            })}
          />
        );
      case 'wait':
        return (
          <WaitLevel
            level={level}
            onComplete={() => onCompleteLevel(levelNumber)}
          />
        );
      case 'slider':
        return (
          <SliderLevel
            level={level}
            onComplete={() => onCompleteLevel(levelNumber)}
          />
        );
      case 'pixel':
        return (
          <PixelLevel
            level={level}
            onComplete={() => onCompleteLevel(levelNumber)}
          />
        );
      case 'spacebar':
        return (
          <SpacebarLevel
            level={level}
            onComplete={() => onCompleteLevel(levelNumber)}
            onUpdateSpacebars={(count) => onUpdateGameState({ 
              totalSpacebars: gameState.totalSpacebars + count 
            })}
          />
        );
      default:
        return <div>Unknown level type</div>;
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBackToGrid}
            className="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Grid
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Level {level.id}
            </h1>
            <h2 className="text-lg md:text-xl text-gray-300">
              {level.title}
            </h2>
          </div>
          
          <div className="w-24"></div> {/* Spacer for centering */}
        </div>

        {/* Level Content */}
        <div className="bg-gray-800 rounded-xl p-8">
          <div className="text-center mb-8">
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              {level.description}
            </p>
          </div>

          {renderLevel()}
        </div>
      </div>
    </div>
  );
};

export default LevelPlay;