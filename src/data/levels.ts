import { LevelConfig } from '../types/game';

export const LEVELS: LevelConfig[] = [
  // Working levels 1-50
  {
    id: 1,
    title: 'The Beginning of Your Downfall',
    description: 'Click the button 100 times. The button will offer unhelpful advice.',
    type: 'click',
    target: 100
  },
  {
    id: 2,
    title: 'The Cruel Joke',
    description: 'Wait for the progress bar to fill. Spoiler: it won\'t.',
    type: 'wait',
    duration: 30
  },
  {
    id: 3,
    title: 'Sisyphean Slider',
    description: 'Drag the slider from 0% to 100% and back, 10 times. It has a mind of its own.',
    type: 'slider',
    sliderRepeats: 10
  },
  {
    id: 4,
    title: 'Needle in a Digital Haystack',
    description: 'Find the hidden pixel. Move your mouse around until you find it.',
    type: 'pixel'
  },
  {
    id: 5,
    title: 'Spacebar Symphony',
    description: 'Press the spacebar 200 times. The screen will shake with your futility.',
    type: 'spacebar',
    target: 200
  },
  {
    id: 6,
    title: 'Double Trouble',
    description: 'Click the button 200 times. Twice the clicking, twice the regret.',
    type: 'click',
    target: 200
  },
  {
    id: 7,
    title: 'The Procrastination Station',
    description: 'Wait 45 seconds while contemplating your life choices.',
    type: 'wait',
    duration: 45
  },
  {
    id: 8,
    title: 'Slider Madness Returns',
    description: 'Drag the rebellious slider 15 times. It\'s even more stubborn now.',
    type: 'slider',
    sliderRepeats: 15
  },
  {
    id: 9,
    title: 'The Invisible Dot',
    description: 'Find another hidden pixel. Because you enjoyed it so much the first time.',
    type: 'pixel'
  },
  {
    id: 10,
    title: 'Spacebar Encore',
    description: 'Press spacebar 300 times. Your keyboard is crying.',
    type: 'spacebar',
    target: 300
  },
  // Continue pattern for levels 11-50
  ...Array.from({ length: 40 }, (_, i) => {
    const levelNum = i + 11;
    const types = ['click', 'wait', 'slider', 'pixel', 'spacebar'] as const;
    const type = types[i % types.length];
    
    const configs = {
      click: {
        title: `Click Fest ${levelNum}`,
        description: `Click ${50 + levelNum * 10} times. Your finger is getting stronger... or more numb.`,
        target: 50 + levelNum * 10
      },
      wait: {
        title: `Waiting Game ${levelNum}`,
        description: `Wait ${15 + levelNum} seconds. Time moves slower when you're wasting it.`,
        duration: 15 + levelNum
      },
      slider: {
        title: `Slider Challenge ${levelNum}`,
        description: `Move the slider ${5 + Math.floor(levelNum / 2)} times. It's getting more rebellious.`,
        sliderRepeats: 5 + Math.floor(levelNum / 2)
      },
      pixel: {
        title: `Pixel Hunt ${levelNum}`,
        description: 'Find the hidden pixel. It\'s hiding better this time.'
      },
      spacebar: {
        title: `Spacebar Marathon ${levelNum}`,
        description: `Press spacebar ${100 + levelNum * 20} times. Your keyboard is filing a complaint.`,
        target: 100 + levelNum * 20
      }
    };

    return {
      id: levelNum,
      type,
      ...configs[type]
    } as LevelConfig;
  }),
  // Placeholder levels 51-100
  ...Array.from({ length: 50 }, (_, i) => ({
    id: i + 51,
    title: `Level ${i + 51}`,
    description: 'Coming Soon (Never)',
    type: 'placeholder' as const
  }))
];