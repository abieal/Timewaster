import React, { useState, useEffect } from 'react';
import LevelGrid from './components/LevelGrid';
import LevelPlay from './components/LevelPlay';
import BadgeScreen from './components/BadgeScreen';
import BadgePopup from './components/BadgePopup';
import { GameState, Badge } from './types/game';
import { loadGameState, saveGameState, getDefaultGameState } from './utils/storage';
import { checkBadges } from './utils/badges';

type Screen = 'grid' | 'play' | 'badges';

function App() {
  const [gameState, setGameState] = useState<GameState>(getDefaultGameState());
  const [currentScreen, setCurrentScreen] = useState<Screen>('grid');
  const [selectedLevel, setSelectedLevel] = useState<number>(1);
  const [badgeQueue, setBadgeQueue] = useState<Badge[]>([]);

  useEffect(() => {
    const savedState = loadGameState();
    if (savedState) {
      setGameState({
        ...savedState,
        sessionStartTime: Date.now(),
        lastActiveTime: Date.now()
      });
    }
  }, []);

  useEffect(() => {
    saveGameState(gameState);
  }, [gameState]);

  // Update last active time on any interaction
  useEffect(() => {
    const updateActiveTime = () => {
      setGameState(prev => ({ ...prev, lastActiveTime: Date.now() }));
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      document.addEventListener(event, updateActiveTime);
    });

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActiveTime);
      });
    };
  }, []);

  // Check for idle badge
  useEffect(() => {
    const interval = setInterval(() => {
      const newBadges = checkBadges(gameState, gameState);
      if (newBadges.length > 0) {
        setBadgeQueue(prev => [...prev, ...newBadges]);
        setGameState(prev => ({
          ...prev,
          badges: [...prev.badges, ...newBadges.map(b => b.id)]
        }));
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [gameState]);

  const updateGameState = (updates: Partial<GameState>) => {
    setGameState(prev => {
      const newState = { ...prev, ...updates, lastActiveTime: Date.now() };
      
      // Check for new badges
      const newBadges = checkBadges(newState, prev);
      if (newBadges.length > 0) {
        setBadgeQueue(prevQueue => [...prevQueue, ...newBadges]);
        newState.badges = [...newState.badges, ...newBadges.map(b => b.id)];
      }
      
      return newState;
    });
  };

  const completeLevel = (levelNumber: number) => {
    updateGameState({
      completedLevels: [...gameState.completedLevels, levelNumber],
      unlockedLevels: Math.max(gameState.unlockedLevels, levelNumber + 1),
      totalTimeWasted: gameState.totalTimeWasted + Math.floor((Date.now() - gameState.sessionStartTime) / 1000)
    });
    setCurrentScreen('grid');
  };

  const playLevel = (levelNumber: number) => {
    setSelectedLevel(levelNumber);
    setCurrentScreen('play');
  };

  const dismissBadge = () => {
    setBadgeQueue(prev => prev.slice(1));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-['Inter',sans-serif]">
      {currentScreen === 'grid' && (
        <LevelGrid 
          gameState={gameState}
          onPlayLevel={playLevel}
          onShowBadges={() => setCurrentScreen('badges')}
        />
      )}
      
      {currentScreen === 'play' && (
        <LevelPlay 
          levelNumber={selectedLevel}
          gameState={gameState}
          onUpdateGameState={updateGameState}
          onCompleteLevel={completeLevel}
          onBackToGrid={() => setCurrentScreen('grid')}
        />
      )}

      {currentScreen === 'badges' && (
        <BadgeScreen 
          gameState={gameState}
          onBackToGrid={() => setCurrentScreen('grid')}
        />
      )}

      {badgeQueue.length > 0 && (
        <BadgePopup 
          badge={badgeQueue[0]}
          onDismiss={dismissBadge}
        />
      )}
    </div>
  );
}

export default App;