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
      </section>

      {/* Offer Section */}
      <section className="re-ty-offer">
        <div className="re-ty-offer-inner">
          <h1 className="re-h2">
            You just made a decision most mums never make.
            <em>Don&apos;t stop at Day&nbsp;1.</em>
          </h1>

          <p className="re-ty-hook">
            Here&apos;s something I wish someone had told me when I started over.
          </p>

          <div className="re-ty-body">
            <p>
              Day 1 will feel good.
              You&apos;ll finish it, catch your breath, and think — <em>yes, I can do this.</em>
            </p>
            <p>
              And then Day 2 arrives with no plan. No instructions. Just you, trying to
              remember what came next, wondering if you should repeat Day 1 or make
              something up.
            </p>
            <p>
              That&apos;s where most women stop.
            </p>
            <p>
              Not because they lack discipline. Because they ran out of road.
            </p>
            <p>
              The full 7-Day Reset exists for exactly that moment. It picks up where
              Day 1 ends and carries you through to the other side — the part where it
              stops feeling like effort and starts feeling like <strong>yours</strong> again.
            </p>
          </div>

          {/* What You Get */}
          <div className="re-ty-includes">
            <div className="re-ty-includes-header">
              <span className="re-ty-includes-title">What You Get Instantly:</span>
            </div>
            <ul className="re-ty-list">
              <li>All 7 complete workouts — progressive, purposeful, 20 minutes each</li>
              <li>Full 7-day meal plan with done-for-you grocery lists</li>
              <li>Daily cool-down and mobility routines (5 minutes — non-negotiable)</li>
              <li>Printable habit tracker to log every rep, every day</li>
              <li>Yours to keep, repeat, and return to whenever life gets loud again</li>
            </ul>
          </div>

          {/* Price Block */}
          <div className="re-ty-price">
            <div className="re-ty-price-compare">
              <span className="re-ty-price-old">$47</span>
              <span className="re-ty-price-current">$17</span>
              <span className="re-ty-price-today">today</span>
            </div>
            <p className="re-ty-price-note">
              This is a one-time offer available only on this page. When you close this
              page, this price closes with it. The Reset will still be available — just
              not at this price.
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="re-cta re-ty-cta"
          >
            {loading ? 'Loading...' : 'Yes — Give Me the Full Reset for $17'}
            {!loading && <span className="re-arrow">&rarr;</span>}
          </button>

          <p className="re-fine">
            Instant delivery. Secure checkout. No subscription. Ever.
          </p>

          {/* Social Proof */}
          <div className="re-ty-review">
            <div className="re-ty-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
            <blockquote className="re-ty-quote">
              &ldquo;I only had the free day at first. I came back for the full plan after
              Day 2 because I had no idea what to do next. Best $17 I&apos;ve spent.&rdquo;
            </blockquote>
            <cite className="re-ty-cite">— Nadia R., mum of two</cite>
          </div>

          {/* Decline */}
          <a href="/" className="re-ty-skip">
            No thanks — I&apos;ll figure out Days 2–7 on my own
          </a>
        </div>
      </section>
    </div>
  );
}
