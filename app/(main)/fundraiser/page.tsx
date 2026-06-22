import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import HeroSubPage from '@/components/HeroSubPage';
import RevealOnScroll from '@/components/RevealOnScroll';
import ArrowIcon from '@/components/ArrowIcon';

export const metadata: Metadata = {
  title: 'Dance to Show Love Fundraiser | Gym Era x MFASCD Foundation',
  description: 'Join Gym Era and MFASCD Foundation for a Zumba & Afrobeat dance fundraiser supporting families affected by Sickle Cell Disease and Autism. Saturday, July 18, 2026.',
  alternates: { canonical: '/fundraiser' },
  openGraph: {
    title: 'Dance to Show Love | Gym Era x MFASCD Foundation',
    description: 'A Zumba/Afrobeat dance fundraiser for families walking the path of Strength, Love & Resilience. Saturday July 18, 2026.',
    type: 'website',
    url: '/fundraiser',
  },
};

export default function FundraiserPage() {
  return (
    <>
      {/* Hero */}
      <HeroSubPage src="/fundraiser-flyer.jpg" ariaLabel="Dance to Show Love fundraiser">
        <div className="hero-badge">Fundraiser</div>
        <h1 style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>
          Dance to <span className="accent-text">Show Love</span>
        </h1>
        <p className="hero-sub">
          Gym Era partners with MFASCD Foundation to support families affected by Sickle Cell Disease &amp; Autism.
        </p>
        <a
          href="#register"
          className="btn btn-primary btn-lg"
          style={{ marginTop: '1.5rem' }}
        >
          Get Your Ticket — $25 <ArrowIcon />
        </a>
      </HeroSubPage>

      {/* Event Details */}
      <section className="section-pad" aria-label="Event details">
        <div className="container">
          <RevealOnScroll className="section-header text-center">
            <span className="section-tag">Save the Date</span>
            <h2>A Night of <span className="accent-text">Movement &amp; Community</span></h2>
          </RevealOnScroll>
          <RevealOnScroll>
            <div className="fundraiser-details">
              <div className="fundraiser-detail-card">
                <span className="fundraiser-detail-card__icon">📅</span>
                <h3>Date</h3>
                <p>Saturday, July 18th, 2026</p>
              </div>
              <div className="fundraiser-detail-card">
                <span className="fundraiser-detail-card__icon">📍</span>
                <h3>Location</h3>
                <p>TBA — Stay tuned!</p>
              </div>
              <div className="fundraiser-detail-card">
                <span className="fundraiser-detail-card__icon">🕐</span>
                <h3>Time</h3>
                <p>TBA — Stay tuned!</p>
              </div>
              <div className="fundraiser-detail-card">
                <span className="fundraiser-detail-card__icon">🎟</span>
                <h3>Ticket Price</h3>
                <p>$25 per person</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Flyer + Description */}
      <section className="section-pad bg-dark" aria-label="About the event">
        <div className="container">
          <RevealOnScroll>
            <div className="split-section">
              <div className="split-media">
                <Image
                  src="/fundraiser-flyer.jpg"
                  alt="Dance to Show Love — Gym Era x MFASCD Foundation fundraiser flyer"
                  width={600}
                  height={850}
                  style={{ width: '100%', height: 'auto', borderRadius: 'var(--radius-lg)' }}
                  priority
                />
              </div>
              <div className="split-content">
                <span className="section-tag">Zumba &amp; Afrobeat</span>
                <h2>Come Dance. <span className="accent-text">Come Give.</span> Come Show Love.</h2>
                <p>
                  Through movement, music, and community, we make a difference. All proceeds go directly
                  to the MFASCD Foundation — supporting families, spreading awareness, and creating hope
                  for those walking the path of Sickle Cell Disease and Autism.
                </p>
                <p>
                  We see you. We hear you. We stand with you. You are not alone — we are with you every step of the way.
                </p>
                <div className="stat-row">
                  <div className="stat">
                    <span className="stat-num">100%</span>
                    <span className="stat-label">Proceeds to MFASCD</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">$25</span>
                    <span className="stat-label">Per Ticket</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">July 18</span>
                    <span className="stat-label">2026</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Register / Buy Ticket */}
      <section id="register" className="section-pad" aria-label="Get your ticket">
        <div className="container">
          <RevealOnScroll>
            <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
              <span className="section-tag">Limited Spaces Available</span>
              <h2>Get Your <span className="accent-text">Ticket</span></h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 520, margin: '0 auto 2rem' }}>
                Tickets are $25 per person. Payment details will be released soon.
                Join the waitlist to be first in line when registration opens.
              </p>
              <div
                className="fundraiser-price-badge"
                aria-label="Ticket price: $25"
              >
                $25 <span>per ticket</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: '1rem 0 1.5rem' }}>
                Payment details coming soon — follow us on social media for updates.
              </p>
              <Link href="/shop" className="btn btn-primary">
                Browse the Shop
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
