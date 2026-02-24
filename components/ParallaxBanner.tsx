'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface ParallaxBannerProps {
  src: string;
  alt?: string;
  ariaLabel?: string;
  children: ReactNode;
}

export default function ParallaxBanner({ src, alt = '', ariaLabel = 'Action shot', children }: ParallaxBannerProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (window.innerWidth <= 768) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      const img = imgRef.current;
      if (!section || !img) return;
      const rect = section.getBoundingClientRect();
      const yPos = rect.top * 0.15;
      img.style.transform = `translateY(${yPos}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="parallax-banner" ref={sectionRef} aria-label={ariaLabel}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
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
