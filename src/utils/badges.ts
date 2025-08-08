import { GameState, Badge } from '../types/game';

const ALL_BADGES: Badge[] = [
  {
    id: 'five_minutes_gone',
    name: 'Five Minutes Gone',
    description: 'You have successfully wasted 5 minutes of your life on this app.',
    icon: '⏰',
    earned: false
  },
  {
    id: 'button_masher',
    name: 'A True Button Masher',
    description: 'You have clicked a total of 1,000 buttons across all levels.',
    icon: '🖱️',
    earned: false
  },
  {
    id: 'pixel_whisperer',
    name: 'Pixel Whisperer',
    description: 'You have found the hidden pixel. Congratulations? You\'ve earned this entirely meaningless badge.',
    icon: '🔍',
    earned: false
  },
  {
    id: 'certified_loiterer',
    name: 'Certified Loiterer',
    description: 'You\'ve left this app open in a browser tab for an entire hour without any interaction.',
    icon: '🪑',
    earned: false
  },
  {
    id: 'master_procrastinator',
    name: 'Master Procrastinator',
    description: 'You successfully avoided doing something productive by completing Level 7.',
    icon: '🏆',
    earned: false
  },
  {
    id: 'spacebar_warrior',
    name: 'Spacebar Warrior',
    description: 'You pressed the spacebar 200 times. Your keyboard is judging you.',
    icon: '⌨️',
    earned: false
  },
  {
    id: 'slider_enthusiast',
    name: 'Slider Enthusiast',
    description: 'You dragged a slider back and forth 10 times. Peak entertainment.',
    icon: '🎚️',
    earned: false
  },
  {
    id: 'first_level',
    name: 'Baby Steps',
    description: 'You completed your first level. This is the beginning of the end.',
    icon: '👶',
    earned: false
  },
  {
    id: 'ten_levels',
    name: 'Double Digits',
    description: 'You\'ve completed 10 levels. There\'s no going back now.',
    icon: '🔟',
    earned: false
  },
  {
    id: 'half_way',
    name: 'Halfway to Nowhere',
    description: 'You\'ve completed 25 levels. You\'re officially committed to this nonsense.',
    icon: '🎯',
    earned: false
  }
];

export const checkBadges = (newState: GameState, oldState: GameState): Badge[] => {
  const newBadges: Badge[] = [];

  // Five minutes gone
  if (newState.totalTimeWasted >= 300 && !newState.badges.includes('five_minutes_gone')) {
    newBadges.push(ALL_BADGES.find(b => b.id === 'five_minutes_gone')!);
  }

  // Button masher
  if (newState.totalClicks >= 1000 && !newState.badges.includes('button_masher')) {
    newBadges.push(ALL_BADGES.find(b => b.id === 'button_masher')!);
  }

  // Pixel whisperer (when level 4 is completed)
  if (newState.completedLevels.includes(4) && !newState.badges.includes('pixel_whisperer')) {
    newBadges.push(ALL_BADGES.find(b => b.id === 'pixel_whisperer')!);
  }

  // Certified loiterer (check if app was open for an hour with minimal interaction)
  const hourInMs = 60 * 60 * 1000;
  const timeSinceStart = Date.now() - newState.sessionStartTime;
  const timeSinceLastActive = Date.now() - newState.lastActiveTime;
  if (timeSinceStart >= hourInMs && timeSinceLastActive >= hourInMs * 0.8 && !newState.badges.includes('certified_loiterer')) {
    newBadges.push(ALL_BADGES.find(b => b.id === 'certified_loiterer')!);
  }

  // Master procrastinator
  if (newState.completedLevels.includes(7) && !newState.badges.includes('master_procrastinator')) {
    newBadges.push(ALL_BADGES.find(b => b.id === 'master_procrastinator')!);
  }

  // Spacebar warrior
  if (newState.totalSpacebars >= 200 && !newState.badges.includes('spacebar_warrior')) {
    newBadges.push(ALL_BADGES.find(b => b.id === 'spacebar_warrior')!);
  }

  // Slider enthusiast (when level 3 is completed)
  if (newState.completedLevels.includes(3) && !newState.badges.includes('slider_enthusiast')) {
    newBadges.push(ALL_BADGES.find(b => b.id === 'slider_enthusiast')!);
  }

  // First level
  if (newState.completedLevels.length >= 1 && !newState.badges.includes('first_level')) {
    newBadges.push(ALL_BADGES.find(b => b.id === 'first_level')!);
  }

  // Ten levels
  if (newState.completedLevels.length >= 10 && !newState.badges.includes('ten_levels')) {
    newBadges.push(ALL_BADGES.find(b => b.id === 'ten_levels')!);
  }

  // Half way
  if (newState.completedLevels.length >= 25 && !newState.badges.includes('half_way')) {
    newBadges.push(ALL_BADGES.find(b => b.id === 'half_way')!);
  }

  return newBadges;
};

export const getAllBadges = (): Badge[] => {
  return ALL_BADGES.map(badge => ({ ...badge }));
};