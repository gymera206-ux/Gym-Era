import type { ReactNode } from 'react';

interface ParallaxBannerProps {
  src: string;
  alt?: string;
  ariaLabel?: string;
  children: ReactNode;
}

export default function ParallaxBanner({ src, alt = '', ariaLabel = 'Action shot', children }: ParallaxBannerProps) {
  return (
    <section className="parallax-banner" aria-label={ariaLabel}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="parallax-img"
        loading="lazy"
        aria-hidden="true"
      />
      <div className="parallax-overlay" />
      {children}
    </section>
  );
}
