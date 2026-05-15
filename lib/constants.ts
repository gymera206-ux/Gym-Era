export const SITE_URL = 'https://gymera.com';

const LOCAL_IMAGES: Record<string, string> = {
  gymWoman: '/photos/hero-stretch.jpg',
  dumbbells: '/photos/squat-pose.jpg',
  workout: '/photos/walking-pose.jpg',
  training: '/photos/training-lunge.jpg',
  boxJump: '/photos/dynamic-arm.jpg',
  confident: '/photos/confident-sitting.jpg',
  legging: '/photos/legging-walk.jpg',
};

export function unsplash(id: string, _w?: number, _q?: number) {
  return LOCAL_IMAGES[id] ?? '';
}

export const galleryImages = [
  { src: '/photos/training-lunge.jpg', alt: 'Woman doing lunges outdoors' },
  { src: '/photos/hero-stretch.jpg', alt: 'Woman stretching in activewear' },
  { src: '/photos/dynamic-arm.jpg', alt: 'Athletic pose outdoors' },
  { src: '/photos/confident-sitting.jpg', alt: 'Confident woman in activewear' },
  { src: '/photos/squat-pose.jpg', alt: 'Woman doing squats' },
  { src: '/photos/blue-stretch.jpg', alt: 'Woman stretching in blue set' },
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
