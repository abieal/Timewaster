import { GameState } from '../types/game';

const STORAGE_KEY = 'ultimate-time-waster-state';

export const saveGameState = (gameState: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  } catch (error) {
    console.error('Failed to save game state:', error);
  }
};

export const loadGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (error) {
    console.error('Failed to load game state:', error);
    return null;
  }
};

export const getDefaultGameState = (): GameState => ({
  currentLevel: 1,
  unlockedLevels: 1,
  completedLevels: [],
  badges: [],
  totalTimeWasted: 0,
  totalClicks: 0,
  totalSpacebars: 0,
  gameStartTime: Date.now(),
  lastActiveTime: Date.now(),
  sessionStartTime: Date.now()
});