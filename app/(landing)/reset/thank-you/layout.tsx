import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'You\'re In! | Gym Era Reset',
  description: 'Check your inbox — Day 1 of the Gym Era Reset is on its way.',
  robots: { index: false, follow: false },
};

export default function ThankYouLayout({ children }: { children: React.ReactNode }) {
  return children;
}
