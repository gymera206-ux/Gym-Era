import Image from 'next/image';
import type { ReactNode } from 'react';

interface HeroSubPageProps {
  src: string;
  ariaLabel: string;
  children: ReactNode;
  className?: string;
}

export default function HeroSubPage({ src, ariaLabel, children, className = '' }: HeroSubPageProps) {
  return (
    <section className={`hero-sub-page${className ? ` ${className}` : ''}`} aria-label={ariaLabel}>
      <div className="hero-media" aria-hidden="true">
        <Image src={src} alt="" className="hero-img" width={1920} height={1080} priority />
        <div className="hero-overlay" />
      </div>
      <div className="hero-content container">
        {children}
      </div>
    </section>
  );
}
