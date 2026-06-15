import type { ReactNode } from 'react';

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
}: RevealOnScrollProps) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
