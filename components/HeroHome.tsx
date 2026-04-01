'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ArrowIcon from './ArrowIcon';
import { unsplash } from '@/lib/constants';

export default function HeroHome() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      sectionRef.current?.classList.add('loaded');
    };
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  return (
    <section id="hero" className="hero-home" aria-label="Hero" ref={sectionRef}>
      <div className="hero-media" aria-hidden="true">
        <Image
          src={unsplash('gymWoman', 1920)}
          alt=""
          className="hero-img"
          width={1920}
          height={1080}
          priority
        />
        <div className="hero-overlay" />
        <div className="hero-grain" aria-hidden="true" />
      </div>
      <div className="hero-content container">
        <div className="hero-badge reveal">PERFORMANCE APPAREL</div>
        <h1 className="hero-title reveal">
          <span className="line">Back to</span>
          <span className="line line-no-wrap">Feeling Strong.</span>
          <span className="line accent-text">One Workout at a Time.</span>
        </h1>
        <p className="hero-sub reveal">
          For busy women and moms finding their way back to movement. Gym Era stays in place, supports real bodies, and helps you feel confident in every session.
        </p>
        <div className="hero-actions reveal">
          <Link href="/shop" className="btn btn-primary btn-lg">
            Find Your Fit <ArrowIcon />
          </Link>
          <Link href="/story" className="btn btn-ghost btn-lg">Meet the Community</Link>
        </div>
      </div>
      <div className="hero-scroll-cue" aria-hidden="true">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  );
}
