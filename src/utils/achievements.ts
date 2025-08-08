import { GameState, Achievement } from '../types/game';

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_click',
    title: '👆 First Click!',
    description: 'You clicked something! Congratulations on this pointless milestone.',
    icon: '🎉'
  },
  {
    id: 'level_1_complete',
    title: '🏆 Level 1 Master',
    description: 'You successfully wasted time clicking a button 50 times. Your parents are so proud.',
    icon: '🥳'
  },
  {
    id: 'ten_levels',
    title: '🎯 Double Digits',
    description: 'You\'ve completed 10 levels of pure time waste. There\'s no going back now.',
    icon: '🎊'
  },
  {
    id: 'hundred_clicks',
    title: '💯 Click Master',
    description: 'You\'ve clicked 100 times! Your finger is now certified useless.',
    icon: '👑'
  },
  {
    id: 'five_minutes',
    title: '⏰ 5 Minutes Gone',
    description: 'You\'ve wasted 5 whole minutes! Think of all the productivity you could have had.',
    icon: '😭'
  },
  {
    id: 'ten_minutes',
    title: '🕙 10 Minutes Vanished',
    description: 'A whole 10 minutes of your life, gone forever. But hey, at least you had fun?',
    icon: '💀'
  },
  {
    id: 'procrastination_master',
    title: '🏅 Procrastination Master',
    description: 'You\'ve unlocked the art of supreme time wasting. Your efficiency is impressively terrible.',
    icon: '🎖️'
  }
];

export const checkAchievements = (newState: GameState, oldState: GameState): Achievement[] => {
  const newAchievements: Achievement[] = [];

  // First click
  if (newState.totalClicks > 0 && !newState.achievements.includes('first_click')) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'first_click')!);
  }

  // Level 1 complete
  if (newState.completedLevels.includes(1) && !newState.achievements.includes('level_1_complete')) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'level_1_complete')!);
  }

  // Ten levels
  if (newState.completedLevels.length >= 10 && !newState.achievements.includes('ten_levels')) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'ten_levels')!);
  }

  // Hundred clicks
  if (newState.totalClicks >= 100 && !newState.achievements.includes('hundred_clicks')) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'hundred_clicks')!);
  }

  // Five minutes
  if (newState.totalTimeWasted >= 300 && !newState.achievements.includes('five_minutes')) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'five_minutes')!);
  }

  // Ten minutes
  if (newState.totalTimeWasted >= 600 && !newState.achievements.includes('ten_minutes')) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'ten_minutes')!);
  }

  // Procrastination master
  if (newState.completedLevels.length >= 25 && newState.totalTimeWasted >= 900 && !newState.achievements.includes('procrastination_master')) {
    newAchievements.push(ACHIEVEMENTS.find(a => a.id === 'procrastination_master')!);
  }

  return newAchievements;
};