export interface GameState {
  currentLevel: number;
  unlockedLevels: number;
  completedLevels: number[];
  badges: string[];
  totalTimeWasted: number; // in seconds
  totalClicks: number;
  totalSpacebars: number;
  gameStartTime: number;
  lastActiveTime: number;
  sessionStartTime: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
}

export interface LevelConfig {
  id: number;
  title: string;
  description: string;
  type: 'click' | 'wait' | 'slider' | 'pixel' | 'spacebar' | 'placeholder';
  target?: number;
  duration?: number;
  sliderRepeats?: number;
}