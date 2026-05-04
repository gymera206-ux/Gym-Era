import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HeroSubPage from '@/components/HeroSubPage';
import RevealOnScroll from '@/components/RevealOnScroll';
import ParallaxBanner from '@/components/ParallaxBanner';
import GalleryStrip from '@/components/GalleryStrip';
import EmailForm from '@/components/EmailForm';
import ArrowIcon from '@/components/ArrowIcon';
import { unsplash, galleryImages } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Story | Gym Era for Women and Moms Returning to Fitness',
  description: 'Gym Era builds performance activewear for women and moms returning to workouts with limited time. Supportive fit, real comfort, and confidence in motion.',
  alternates: { canonical: '/story' },
  openGraph: {
    title: 'Our Story | Gym Era',
    description: 'Read how Gym Era creates performance activewear for women and moms rebuilding strength and confidence.',
    type: 'website',
  },
};

export default function StoryPage() {
  return (
    <>
      {/* Hero */}
      <HeroSubPage src={unsplash('gymWoman', 1920)} ariaLabel="Our Story hero">
        <div className="hero-badge reveal">Our Story</div>
        <h1 className="reveal" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>Built for Your Comeback.<br /><span className="accent-text">With Real Life in Mind.</span></h1>
      </HeroSubPage>

      {/* Origin Story */}
      <section className="section-pad" aria-label="Brand origin">
        <div className="container">
          <RevealOnScroll className="story-text-block">
            <p>Gym Era started with a simple truth: many women want to get back to training, but life is full. Work, family, and everything else can leave very little time and energy. The last thing anyone needs is workout clothes that slide, pinch, or make you feel unsure.</p>
            <p>So we built activewear for real life and real movement. Not for perfect bodies. Not for perfect routines. For women and moms showing up in the middle of busy weeks, rebuilding strength one session at a time.</p>
            <p>Every piece is tested where it matters: on real women, in real workouts. We focus on secure waistbands, supportive fabrics, and fits that stay put, so getting dressed for a workout feels like one less thing to worry about.</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Full Bleed Action Shot */}
      <ParallaxBanner src={unsplash('training', 1920)} ariaLabel="Training action shot">
        <div className="parallax-content container">
          <RevealOnScroll>
            <h2 className="parallax-text">Small Windows.<br />Steady Effort.<br />Real <span className="accent-text">Progress.</span></h2>
          </RevealOnScroll>
        </div>
      </ParallaxBanner>

      {/* Values */}
      <section className="section-pad" aria-label="Our values">
        <div className="container">
          <RevealOnScroll className="section-header text-center">
            <span className="section-tag">What We Stand For</span>
            <h2>Three Promises.<br /><span className="accent-text">Zero Compromises.</span></h2>
          </RevealOnScroll>
          <RevealOnScroll stagger className="story-values">
            <div className="story-value-card">
              <div className="value-num" aria-hidden="true">01</div>
              <h3>Fit for Real Bodies</h3>
              <p>We design for movement across different body shapes and life stages, so you feel supported and comfortable from warm-up to cooldown.</p>
            </div>
            <div className="story-value-card">
              <div className="value-num" aria-hidden="true">02</div>
              <h3>Built for Limited Time</h3>
              <p>Your schedule is packed. Our pieces are built so you can start your workout quickly without constant readjusting or second-guessing your outfit.</p>
            </div>
            <div className="story-value-card">
              <div className="value-num" aria-hidden="true">03</div>
              <h3>Confidence Through Consistency</h3>
              <p>We are here for women and moms rebuilding routine, confidence, and strength through consistent sessions, not perfection.</p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Split — The People */}
      <section className="section-pad bg-dark" aria-label="Our community">
        <div className="container">
          <RevealOnScroll>
            <div className="split-section">
              <div className="split-media">
                <div className="img-stack">
                  <Image src={unsplash('dumbbells', 800)} alt="Women training together" className="img-main" width={800} height={1000} loading="lazy" />
                  <Image src={unsplash('workout', 500)} alt="Close-up of workout" className="img-accent" width={500} height={500} loading="lazy" />
                </div>
              </div>
              <div className="split-content">
                <span className="section-tag">The Community</span>
                <h2>Built by Women.<br />Made for <span className="accent-text">Your Real Life.</span></h2>
                <p>Whether you train before school drop-off, during lunch, or after everyone is asleep, you belong here. Gym Era supports women and moms returning to fitness with care, encouragement, and purpose.</p>
                <p>This is not about chasing perfect. It is about showing up, feeling strong, and staying consistent.</p>
                <Link href="/shop" className="btn btn-primary">
                  Find Your Fit <ArrowIcon />
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Quote */}
      <section className="section-pad" aria-label="Brand quote">
        <div className="container">
          <RevealOnScroll className="story-quote">
            <blockquote>&ldquo;We Build Activewear That<br />Supports Your <span className="accent-text">Comeback.</span>&rdquo;</blockquote>
            <cite>— The Gym Era Team</cite>
          </RevealOnScroll>
        </div>
      </section>

      {/* Photo Gallery */}
      <GalleryStrip images={galleryImages} />

      {/* Email Capture */}
      <section id="email-capture" className="section-pad" aria-label="Email signup">
        <div className="container">
          <RevealOnScroll>
            <div className="email-block">
              <div className="email-block__content">
                <span className="section-tag">Join the Era</span>
                <h2>Get Early Access + <span className="accent-text">15% Off</span></h2>
                <p>Join a warm community of women and moms rebuilding strength together. Get new drops, practical training support, and member-only offers.</p>
                <EmailForm inputId="story-email" />
              </div>
              <div className="email-block__img">
                <Image src={unsplash('gymWoman', 600)} alt="Woman preparing for training session" width={600} height={600} loading="lazy" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
