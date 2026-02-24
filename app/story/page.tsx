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
  title: 'Our Story | Gym Era — Built for Women Who Train',
  description: 'Gym Era was born in the gym, not a boardroom. We build performance apparel for women who demand more from their training and their clothes. Read our story.',
  alternates: { canonical: '/story' },
  openGraph: {
    title: 'Our Story | Gym Era',
    description: 'Gym Era was born in the gym, not a boardroom. Read the story behind the brand built for women who train.',
    type: 'website',
  },
};

export default function StoryPage() {
  return (
    <>
      {/* Hero */}
      <HeroSubPage src={unsplash('gymWoman', 1920)} ariaLabel="Our Story hero">
        <div className="hero-badge reveal">Our Story</div>
        <h1 className="reveal" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>Born in the Gym.<br /><span className="accent-text">Not a Boardroom.</span></h1>
      </HeroSubPage>

      {/* Origin Story */}
      <section className="section-pad" aria-label="Brand origin">
        <div className="container">
          <RevealOnScroll className="story-text-block">
            <p>Gym Era started the way most honest things do — out of frustration. We were tired of apparel that looked good on a hanger and fell apart during a real workout. We were tired of paying premium prices for pieces designed by people who had never felt the challenge of a heavy set or the satisfaction of finishing a session stronger than when they started.</p>
            <p>So we built our own. Not for trends. Not for hype. For the women who set their alarm before sunrise and show up when nobody is watching. For the ones who measure progress in strength, confidence, and the way they feel in their own skin.</p>
            <p>Every thread, every stitch, every seam in Gym Era was tested in the place it was meant to live — the gym floor. We fit-tested on real women doing real movements. We washed and re-washed until we knew the fabric would hold its shape months later. We obsessed over the details that most brands skip because they know you will not notice until it is too late.</p>
          </RevealOnScroll>
        </div>
      </section>

      {/* Full Bleed Action Shot */}
      <ParallaxBanner src={unsplash('training', 1920)} ariaLabel="Training action shot">
        <div className="parallax-content container">
          <RevealOnScroll>
            <h2 className="parallax-text">The Work<br />Speaks <span className="accent-text">Louder.</span></h2>
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
              <h3>Honesty Over Hype</h3>
              <p>We do not use gimmicks to sell you a fantasy. We build apparel that performs and let the results speak. No manufactured scarcity. No fake urgency. Just quality that earns your trust.</p>
            </div>
            <div className="story-value-card">
              <div className="value-num" aria-hidden="true">02</div>
              <h3>Built for the Work</h3>
              <p>Every Gym Era product is designed for the movement patterns of real training — squats, presses, lunges, pulls, and everything between. If it cannot handle the work, it does not leave our lab.</p>
            </div>
            <div className="story-value-card">
              <div className="value-num" aria-hidden="true">03</div>
              <h3>For Women Who Train</h3>
              <p>Gym Era is for women who train with intent, who track their progress, and who understand that the right apparel is part of showing up as your strongest self.</p>
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
                <h2>Built by Women.<br />Worn by <span className="accent-text">Everyone</span> Who Trains.</h2>
                <p>Gym Era is not defined by your sport. It is defined by your standard. Whether you are a competitive lifter, a HIIT enthusiast, someone who trains before the kids wake up, or a woman who just started her fitness journey and refuses to quit — if you take the work seriously, you belong here.</p>
                <p>This is more than a brand. It is a standard. And the standard is showing up.</p>
                <Link href="/shop" className="btn btn-primary">
                  Shop the Collection <ArrowIcon />
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
            <blockquote>&ldquo;We Don&apos;t Sell Clothes.<br />We Build <span className="accent-text">Confidence.</span>&rdquo;</blockquote>
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
                <p>Join the Gym Era community. Be first to shop new drops and get members-only training content. No spam. Unsubscribe anytime.</p>
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
