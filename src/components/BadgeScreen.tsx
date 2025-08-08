import React from 'react';
import { GameState } from '../types/game';
import { getAllBadges } from '../utils/badges';
import { ArrowLeft, Trophy } from 'lucide-react';

interface BadgeScreenProps {
  gameState: GameState;
  onBackToGrid: () => void;
}

const BadgeScreen: React.FC<BadgeScreenProps> = ({ gameState, onBackToGrid }) => {
  const allBadges = getAllBadges();
  const earnedBadges = allBadges.filter(badge => gameState.badges.includes(badge.id));
  const unearnedBadges = allBadges.filter(badge => !gameState.badges.includes(badge.id));

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
            <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
              <Trophy className="w-8 h-8 mr-3 text-yellow-400" />
              Your Meaningless Badges
            </h1>
            <p className="text-gray-400">
              {earnedBadges.length} of {allBadges.length} completely pointless achievements unlocked
            </p>
          </div>
          
          <div className="w-24"></div>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-green-400">Earned Badges</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {earnedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 border border-green-500"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-4xl">{badge.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">{badge.name}</h3>
                      <p className="text-green-100 text-sm leading-relaxed">
                        {badge.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Unearned Badges */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-400">Locked Badges</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {unearnedBadges.map((badge) => (
              <div
                key={badge.id}
                className="bg-gray-800 rounded-xl p-6 border border-gray-700 opacity-60"
              >
                <div className="flex items-start space-x-4">
                  <div className="text-4xl grayscale">{badge.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-300 mb-2">{badge.name}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {badge.description}
                    </p>
                  </div>
                  <div className="text-gray-500">🔒</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm italic">
            "Collect them all! (But why would you want to?)"
          </p>
        </div>
      </div>
    </div>
  );
};

export default BadgeScreen;