'use client';

import { useState, useCallback } from 'react';
import '../reset.css';

export default function ThankYouPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/reset-checkout', { method: 'POST' });
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
      {/* Confirmation Banner */}
      <section className="re-ty-confirm">
        <div className="re-wordmark">
          <span className="re-wm-gym">GYM</span>
          <span className="re-wm-era">ERA</span>
        </div>
        <span className="re-pill">You&apos;re In</span>
        <p className="re-ty-confirm-text">
          Day 1 is on its way to your inbox. While you wait&hellip;
        </p>
      </section>

      {/* One-Time Offer */}
      <section className="re-ty-offer">
        <div className="re-ty-offer-inner">
          <span className="re-ty-badge">One-Time Offer</span>
          <h1 className="re-h2" style={{ marginTop: '1rem' }}>
            Why Wait 7 Days?
            <em>Get the Full Reset Now.</em>
          </h1>
          <p className="re-ty-offer-sub">
            You signed up for Day 1. But you can unlock the entire 7-Day Reset
            right now — all workouts, all meal plans, all cool-downs — delivered
            instantly for just <strong>$17</strong>.
          </p>

          {/* What's Included */}
          <div className="re-ty-includes">
            <div className="re-ty-includes-header">
              <span className="re-ty-includes-title">Everything Inside:</span>
            </div>
            <ul className="re-ty-list">
              <li>7 complete 20-minute kettlebell workouts (progressive difficulty)</li>
              <li>Full 7-day meal plan with grocery lists</li>
              <li>Daily 5-minute cool-down &amp; mobility routines</li>
              <li>Printable workout tracker to log your reps</li>
              <li>Private access — keep forever, repeat anytime</li>
            </ul>
          </div>

          {/* Price Anchor */}
          <div className="re-ty-price">
            <div className="re-ty-price-compare">
              <span className="re-ty-price-old">$47</span>
              <span className="re-ty-price-current">$17</span>
            </div>
            <p className="re-ty-price-note">
              This price is only available right now, on this page.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="re-cta re-ty-cta"
          >
            {loading ? 'Loading...' : 'Get Instant Access — $17'}
            {!loading && <span className="re-arrow">&rarr;</span>}
          </button>

          <p className="re-fine">
            Secure checkout. Instant delivery. No subscription.
          </p>

          {/* No Thanks */}
          <a href="/" className="re-ty-skip">
            No thanks, I&apos;ll wait for the daily emails
          </a>
        </div>
      </section>
    </div>
  );
}
