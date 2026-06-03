'use client';

import { useState, useCallback } from 'react';
import '../reset.css';
import './get-the-reset.css';

export default function GetTheResetPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reset-full-checkout', { method: 'POST' });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Something went wrong. Please try again.');
        setLoading(false);
      }
    } catch {
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  }, []);

  return (
    <div className="re-page">
      {/* Hero */}
      <section className="gtr-hero">
        <div className="gtr-hero-bg" aria-hidden="true" />
        <div className="gtr-hero-content">
          <div className="re-wordmark" style={{ marginBottom: '2rem' }}>
            <span className="re-wm-gym" style={{ color: 'var(--cream)' }}>GYM</span>
            <span className="re-wm-era">ERA</span>
          </div>
          <span className="re-pill">The Full Program</span>
          <h1 className="re-h1" style={{ marginTop: '1.5rem' }}>
            Ready for All
            <em>7 Days?</em>
          </h1>
          <p className="gtr-hero-sub">
            You tried Day 1. You know what it feels like. Now imagine what a
            full week of that momentum could do.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="re-section">
        <div className="re-section-header">
          <span className="re-pill">The Truth</span>
          <h2 className="re-h2">
            Day 1 Alone
            <em>Isn&apos;t Enough.</em>
          </h2>
        </div>

        <div className="gtr-story">
          <p>
            You got the free workout. Maybe you did it, maybe it&apos;s still
            sitting in your inbox. Either way, you&apos;re here &mdash; and
            that tells me something.
          </p>
          <p>
            You <em>want</em> to move again. You want to feel like yourself
            again. But one workout doesn&apos;t build a habit. One day
            doesn&apos;t create momentum.
          </p>
          <p>
            <strong>Seven days does.</strong>
          </p>
          <p>
            The full 7-Day Reset is the complete program &mdash; designed to
            take you from &ldquo;I haven&apos;t moved in months&rdquo; to
            &ldquo;I actually look forward to this&rdquo; in just one week.
          </p>
        </div>
      </section>

      {/* What's Inside */}
      <section className="re-section" style={{ paddingTop: 0 }}>
        <div className="re-section-header">
          <span className="re-pill">What&apos;s Inside</span>
          <h2 className="re-h2">
            Everything You Need.
            <em>Nothing You Don&apos;t.</em>
          </h2>
        </div>

        <div className="re-value-grid">
          <article className="re-card">
            <span className="re-card-num">01 / The Workouts</span>
            <h3 className="re-card-title">7 Progressive Sessions.</h3>
            <p className="re-card-body">
              Each day builds on the last. 20 minutes. Full body. Designed for
              women getting back to movement &mdash; not already there.
            </p>
          </article>
          <article className="re-card">
            <span className="re-card-num">02 / The Meal Plan</span>
            <h3 className="re-card-title">7-Day Nutrition Guide.</h3>
            <p className="re-card-body">
              Real food, real portions. A done-for-you grocery list and daily
              meals designed for busy moms who cook for the whole family.
            </p>
          </article>
          <article className="re-card">
            <span className="re-card-num">03 / The Recovery</span>
            <h3 className="re-card-title">Daily Cool-Down Routines.</h3>
            <p className="re-card-body">
              5-minute mobility flows for each day. Hip flexors, shoulders,
              hamstrings &mdash; the places that tighten first when life
              takes over.
            </p>
          </article>
          <article className="re-card">
            <span className="re-card-num">04 / The Tracker</span>
            <h3 className="re-card-title">Printable Habit Log.</h3>
            <p className="re-card-body">
              Track every rep, every day. The simple accountability tool that
              turns &ldquo;I&apos;ll try&rdquo; into &ldquo;I did.&rdquo;
            </p>
          </article>
          <article className="re-card">
            <span className="re-card-num">05 / The Community</span>
            <h3 className="re-card-title">WhatsApp Support Group.</h3>
            <p className="re-card-body">
              Join other women doing the Reset. Share wins, ask questions, stay
              accountable. You don&apos;t have to do this alone.
            </p>
          </article>
          <article className="re-card">
            <span className="re-card-num">06 / Yours Forever</span>
            <h3 className="re-card-title">Lifetime Access.</h3>
            <p className="re-card-body">
              No subscription. No expiration. Come back to the Reset whenever
              life gets loud and you need to find your rhythm again.
            </p>
          </article>
        </div>
      </section>

      {/* Stat Strip */}
      <div className="re-strip">
        {[
          ['7', 'Complete Workouts'],
          ['20', 'Min Per Day'],
          ['1', 'Kettlebell'],
          ['$47', 'One-Time'],
        ].map(([num, label]) => (
          <div className="re-strip-item" key={label}>
            <span className="re-strip-num">{num}</span>
            <span className="re-strip-label">{label}</span>
          </div>
        ))}
      </div>

      {/* Price + CTA */}
      <section className="gtr-offer">
        <div className="gtr-offer-inner">
          <span className="re-pill">Full Program</span>
          <h2 className="re-h2" style={{ marginTop: '1rem' }}>
            Get the Complete
            <em>7-Day Reset.</em>
          </h2>

          <div className="re-ty-price" style={{ marginTop: '2rem' }}>
            <div className="re-ty-price-compare">
              <span className="re-ty-price-current">$47</span>
              <span className="re-ty-price-today">one-time</span>
            </div>
            <p className="re-ty-price-note">
              One payment. Instant delivery. Yours forever. No subscription, no
              hidden fees.
            </p>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="re-cta re-ty-cta"
          >
            {loading
              ? 'Loading...'
              : <>Give Me the Full 7-Day Reset &mdash; $47</>}
            {!loading && <span className="re-arrow">&rarr;</span>}
          </button>

          <p className="re-fine">Secure checkout powered by Square.</p>
        </div>
      </section>

      {/* WhatsApp Community */}
      <section className="gtr-community">
        <div className="gtr-community-inner">
          <span className="re-pill">After You Buy</span>
          <h2 className="re-h2-light" style={{ marginTop: '1rem' }}>
            You&apos;re Not Doing
            <em>This Alone.</em>
          </h2>
          <p className="gtr-community-text">
            Every woman who gets the full Reset gets access to our private
            WhatsApp community &mdash; a group of real women, real moms, who
            are all doing the same thing you are: getting back to feeling
            strong.
          </p>

          <div className="gtr-community-features">
            <div className="gtr-community-feature">
              <span className="gtr-community-icon">&#128172;</span>
              <div>
                <strong>Share Your Wins</strong>
                <p>
                  Finished Day 3? Tell someone who gets it. Every small win
                  matters.
                </p>
              </div>
            </div>
            <div className="gtr-community-feature">
              <span className="gtr-community-icon">&#129309;</span>
              <div>
                <strong>Get Real Support</strong>
                <p>
                  Ask questions, swap tips, and lean on women who understand
                  your schedule.
                </p>
              </div>
            </div>
            <div className="gtr-community-feature">
              <span className="gtr-community-icon">&#128170;</span>
              <div>
                <strong>Stay Accountable</strong>
                <p>
                  It&apos;s harder to skip Day 5 when someone&apos;s cheering
                  you on.
                </p>
              </div>
            </div>
          </div>

          <p className="gtr-community-note">
            After purchase, you&apos;ll receive the WhatsApp group invite link
            in your confirmation email. Jump in, introduce yourself, and start
            with Day 1.
          </p>
        </div>
      </section>

      {/* Founder */}
      <section className="re-founder">
        <div className="re-founder-inner">
          <div className="re-founder-img" aria-label="Founder photo">
            <span className="re-founder-tag">The Founder</span>
          </div>
          <div className="re-founder-text">
            <span className="re-pill">Why I Built This</span>
            <h2 className="re-h2" style={{ marginTop: '1rem' }}>
              For Women Who
              <em>Keep Showing Up.</em>
            </h2>
            <p>
              I know what it&apos;s like to want to move again but not know
              where to start. To feel like every program out there was built
              for someone with two free hours and no kids.
            </p>
            <p>
              <strong>
                The Reset is the program I built for myself
              </strong>{' '}
              &mdash; and now it&apos;s for you. Seven days. Twenty minutes.
              The version of fitness that fits your actual life.
            </p>
            <div className="re-founder-sig">
              Solange, Founder of Gym Era
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="re-final">
        <div className="re-final-inner">
          <span className="re-pill">Last Call</span>
          <h2 className="re-h2-light">
            Seven Days.
            <em>Your Reset Starts Now.</em>
          </h2>
          <p className="re-final-sub">
            You already took the first step. The full program is waiting.
          </p>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="re-cta re-ty-cta"
            style={{ maxWidth: '440px', margin: '0 auto' }}
          >
            {loading
              ? 'Loading...'
              : <>Get the Full Reset &mdash; $47</>}
            {!loading && <span className="re-arrow">&rarr;</span>}
          </button>

          <p className="re-fine" style={{ color: 'rgba(251,250,247,0.6)' }}>
            Instant delivery. Secure checkout. No subscription.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="re-footer">
        <div className="re-wordmark">
          <span className="re-wm-gym">GYM</span>
          <span className="re-wm-era">ERA</span>
        </div>
        <p className="re-footer-tagline">Back to Feeling Strong.</p>
        <p className="re-footer-copy">
          &copy; {new Date().getFullYear()} Gym Era. Built for women who
          show up.
        </p>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="re-sticky-mobile">
        <button
          onClick={handleCheckout}
          disabled={loading}
          className="re-cta re-cta--sticky"
        >
          {loading
            ? 'Loading...'
            : <>Get the Full Reset &mdash; $47</>}
          {!loading && <span className="re-arrow">&rarr;</span>}
        </button>
      </div>
    </div>
  );
}
