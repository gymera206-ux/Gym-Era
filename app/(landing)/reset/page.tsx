'use client';

import { useState, useCallback, useRef, type FormEvent } from 'react';
import './reset.css';

function ResetEmailForm({ id, location }: { id: string; location: string }) {
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = e.currentTarget;
      const input = form.querySelector(
        'input[type="email"]',
      ) as HTMLInputElement;
      if (!input?.value) return;

      setState('sending');

      // TODO: Replace with real Klaviyo / API call
      console.log(`Email captured (${location}):`, input.value);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setState('done');
        input.value = '';
      }, 800);
    },
    [location],
  );

  return (
    <div className="re-form-card">
      <span className="re-pill">Free / Day 1 Inside</span>
      <h3 className="re-form-title">Get the First Workout Free.</h3>
      <form
        className="re-form-row"
        onSubmit={handleSubmit}
        aria-label="Email signup form"
      >
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          className="re-input"
          type="email"
          id={id}
          name="email"
          placeholder="Your email"
          required
          autoComplete="email"
          disabled={state !== 'idle'}
        />
        <button
          className="re-cta"
          type="submit"
          disabled={state !== 'idle'}
        >
          {state === 'idle' && (
            <>
              Send Me Day 1 <span className="re-arrow">→</span>
            </>
          )}
          {state === 'sending' && 'Sending…'}
          {state === 'done' && 'Check Your Inbox ✓'}
        </button>
      </form>
      <p className="re-fine">
        No spam. One email a day for a week. Unsubscribe whenever.
      </p>
    </div>
  );
}

export default function ResetLandingPage() {
  return (
    <div className="re-page">
      {/* ─── HERO ─── */}
      <section className="re-hero">
        <div className="re-hero-bg" aria-hidden="true" />
        <div className="re-hero-content">
          <p className="re-eyebrow">A 7-Day Reset Program</p>
          <h1 className="re-h1">
            Back to
            <em>Feeling Strong.</em>
          </h1>
          <p className="re-hero-sub">
            For busy women and moms finding their way back to movement. Twenty
            minutes a day. Real moves only. The workout you&apos;ll actually do.
          </p>
          <ResetEmailForm id="hero-email" location="hero" />
        </div>
      </section>

      {/* ─── STAT STRIP ─── */}
      <div className="re-strip">
        {[
          ['20', 'Min Per Day'],
          ['7', 'Days'],
          ['1', 'Kettlebell'],
          ['0', 'Excuses'],
        ].map(([num, label]) => (
          <div className="re-strip-item" key={label}>
            <span className="re-strip-num">{num}</span>
            <span className="re-strip-label">{label}</span>
          </div>
        ))}
      </div>

      {/* ─── VALUE CARDS ─── */}
      <section className="re-section">
        <div className="re-section-header">
          <span className="re-pill">What&apos;s Inside</span>
          <h2 className="re-h2">
            Day 1 of the Reset.
            <em>Yours, Free.</em>
          </h2>
        </div>

        <div className="re-value-grid">
          <article className="re-card">
            <span className="re-card-num">01 / The Workout</span>
            <h3 className="re-card-title">A 20-Min Full-Body Session.</h3>
            <p className="re-card-body">
              Three rounds. Four moves. The same workout I do before the kids
              wake up. No gym. No equipment beyond a kettlebell or a backpack of
              books.
            </p>
          </article>
          <article className="re-card">
            <span className="re-card-num">02 / The Plan</span>
            <h3 className="re-card-title">A Simple Grocery List.</h3>
            <p className="re-card-body">
              Real food. Whole proteins. The list I actually use on Sunday.
              Designed for the woman who packs three lunches before her own
              breakfast.
            </p>
          </article>
          <article className="re-card">
            <span className="re-card-num">03 / The Cool-Down</span>
            <h3 className="re-card-title">A 5-Minute Reset Routine.</h3>
            <p className="re-card-body">
              The stretches that keep you from breaking. Hip flexors, hamstrings,
              shoulders. The places motherhood breaks first.
            </p>
          </article>
        </div>
      </section>

      {/* ─── FOUNDER ─── */}
      <section className="re-founder">
        <div className="re-founder-inner">
          <div className="re-founder-img" aria-label="Founder photo">
            <span className="re-founder-tag">The Founder</span>
          </div>
          <div className="re-founder-text">
            <span className="re-pill">Why This Exists</span>
            <h2 className="re-h2" style={{ marginTop: '1rem' }}>
              Built for Women
              <em>Who Show Up.</em>
            </h2>
            <p>
              I built Gym Era because{' '}
              <strong>
                nothing on the market was made for the life I actually live.
              </strong>{' '}
              The packed schedule. The 20-minute reality. The body that&apos;s
              had babies and still wants to move.
            </p>
            <p>
              I built the Reset for the same reason. Not an aspirational program.
              The one I wrote for myself, refined over a year of training, and
              now run with hundreds of women.
            </p>
            <div className="re-founder-sig">
              [Her Name], Founder of Gym Era
            </div>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="re-section">
        <div className="re-section-header">
          <span className="re-pill">Real Women / Real Reviews</span>
          <h2 className="re-h2">
            What the First
            <em>30 Women Said.</em>
          </h2>
        </div>

        <div className="re-testimonial-grid">
          {[
            {
              text: '[Beta testimonial #1. Replace after Week 1 cohort completes. Pull a 1-2 sentence quote about results, fit, or how it changed her week.]',
              author: 'Sarah M.',
              meta: 'Mom of 2, Chicago',
            },
            {
              text: '[Beta testimonial #2. Pull from video review. Focus on the specific moment something clicked.]',
              author: 'Jen R.',
              meta: 'Mom of 3, Austin',
            },
            {
              text: '[Beta testimonial #3. Emotional or identity transformation. "I felt like myself again" type.]',
              author: 'Nicole T.',
              meta: 'Mom of 4, Brooklyn',
            },
          ].map((t) => (
            <div className="re-testimonial" key={t.author}>
              <div className="re-stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <p className="re-testimonial-text">{t.text}</p>
              <p className="re-testimonial-author">{t.author}</p>
              <p className="re-testimonial-meta">{t.meta}</p>
            </div>
          ))}
        </div>
        <p className="re-placeholder-note">
          Real reviews go here once the first 30 testers finish Week 1.
        </p>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="re-final">
        <div className="re-final-inner">
          <span className="re-pill">Last Call</span>
          <h2 className="re-h2-light">
            Train Tonight.
            <em>Or Don&apos;t.</em>
          </h2>
          <p className="re-final-sub">
            The next 20 minutes already exist. The only question is what you do
            with them.
          </p>
          <ResetEmailForm id="final-email" location="final" />
        </div>
      </section>

      {/* ─── MINIMAL FOOTER ─── */}
      <footer className="re-footer">
        <div className="re-wordmark">
          <span className="re-wm-gym">GYM</span>
          <span className="re-wm-era">ERA</span>
        </div>
        <p className="re-footer-tagline">Back to Feeling Strong.</p>
        <p className="re-footer-copy">
          © {new Date().getFullYear()} Gym Era. Built for women who show up.
        </p>
      </footer>

      {/* ─── STICKY MOBILE CTA ─── */}
      <div className="re-sticky-mobile">
        <a href="#hero-email" className="re-cta re-cta--sticky">
          Get Free Day 1 <span className="re-arrow">→</span>
        </a>
      </div>
    </div>
  );
}
