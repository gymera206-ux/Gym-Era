export const SITE_URL = 'https://gymera.com';

const UNSPLASH_BASE: Record<string, string> = {
  gymWoman: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2',
  dumbbells: 'https://images.unsplash.com/photo-1550345332-09e3ac987658',
  workout: 'https://images.unsplash.com/photo-1518611012118-696072aa579a',
  training: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
  boxJump: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155',
  confident: 'https://images.unsplash.com/photo-1609899537878-48f1a1e9c14e',
  legging: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8',
};

export function unsplash(id: string, w: number, q = 80) {
  return `${UNSPLASH_BASE[id]}?w=${w}&q=${q}&auto=format&fit=crop`;
}

export const galleryImages = [
  { src: unsplash('training', 500), alt: 'Woman lifting weights' },
  { src: unsplash('gymWoman', 500), alt: 'Woman stretching' },
  { src: unsplash('boxJump', 500), alt: 'Athletic jump' },
  { src: unsplash('confident', 500), alt: 'Focused athlete' },
  { src: unsplash('dumbbells', 500), alt: 'Dumbbell training' },
];

export const reviews = [
  {
    text: 'The leggings are incredible. Squats, lunges, box jumps — they never move. Best pair I have ever owned.',
    author: 'Jasmine K.',
  },
  {
    text: 'Finally a brand that gets it. No see-through fabric. Just apparel that works and fits like it was made for my body.',
    author: 'Priya S.',
  },
  {
    text: 'I bought the Foundation Trainer and came back for everything else within a week. This is my training uniform now.',
    author: 'Megan L.',
  },
  {
    text: 'Six months of training and washing. My Gym Era pieces still look and fit like day one. Nothing else compares.',
    author: 'Tanya R.',
  },
];

export const products = [
  {
    name: 'The Foundation Trainer',
    description: 'Performance training top that moves with you from warm-up to final set.',
    price: '54.40',
    image: 'training',
  },
  {
    name: 'Era Compression Short',
    description: 'Zero ride-up compression shorts for full range every rep.',
    price: '43.20',
    image: 'workout',
  },
  {
    name: 'Grip Flex Legging',
    description: 'Performance legging that stays put so you can move without limits.',
    price: '57.60',
    image: 'legging',
  },
  {
    name: 'The Gym Era Tee',
    description: 'Earned, not given. The standard-bearer of Gym Era.',
    price: '30.40',
    image: 'confident',
  },
];
