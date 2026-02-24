'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  stagger?: boolean;
  threshold?: number;
  rootMargin?: string;
}

export default function RevealOnScroll({
  children,
  className = '',
  style,
  stagger = false,
  threshold = 0.1,
  rootMargin = '0px 0px -30px 0px',
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      el.classList.add('visible');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const baseClass = stagger ? 'reveal-stagger' : 'reveal';

  return (
    <div ref={ref} className={`${baseClass} ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}
