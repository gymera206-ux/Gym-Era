import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import HeroHome from '@/components/HeroHome';
import MarqueeBar from '@/components/MarqueeBar';
import RevealOnScroll from '@/components/RevealOnScroll';
import ParallaxBanner from '@/components/ParallaxBanner';
import GalleryStrip from '@/components/GalleryStrip';
import EmailForm from '@/components/EmailForm';
import ArrowIcon from '@/components/ArrowIcon';
import { unsplash, galleryImages, reviews } from '@/lib/constants';
import productsData from '@/lib/products-data.json';
import { originalFromDiscounted } from '@/lib/pricing';

type LineupProduct = {
  id: string;
  name: string;
  price: string;
  sizes: string;
  images: { src: string; isMain: boolean }[];
};
const lineupProducts = (productsData as LineupProduct[]).filter((p) => p.images?.length > 0);

export const metadata: Metadata = {
  title: 'Gym Era | Performance Apparel Built for Women Who Train',
  description: 'Gym Era builds the foundation women who train stand on. Performance apparel engineered for real workouts, real bodies, and real results. Shop the collection.',
  keywords: 'women gym apparel, performance workout clothes, athletic wear for women, gym clothing, fitness apparel, Gym Era',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Gym Era | Your Foundation. Your Power.',
    description: 'Gym Era builds the foundation women who train stand on. Performance apparel for real workouts, real bodies, real results.',
    type: 'website',
    url: '/',
    siteName: 'Gym Era',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gym Era | Your Foundation. Your Power.',
    description: 'Performance apparel for women who train hard every single day.',
  },
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: 'Gym Era',
        url: 'https://gymera.com',
        description: 'Performance gym apparel built for women who train.',
        sameAs: [
          'https://instagram.com/gymera',
          'https://tiktok.com/@gymera',
          'https://youtube.com/@gymera',
        ],
      },
      { '@type': 'WebSite', name: 'Gym Era', url: 'https://gymera.com' },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero */}
      <HeroHome />

      {/* 2. Belief Bar / Marquee */}
      <MarqueeBar />

      {/* 3. Action Photo Split — "The Movement" */}
      <section id="the-movement" className="section-pad" aria-label="The Movement">
        <div className="container">
          <RevealOnScroll>
            <div className="split-section">
              <div className="split-media">
                <div className="img-stack">
                  <Image src={unsplash('dumbbells', 800)} alt="Woman training with dumbbells" className="img-main" width={800} height={1000} loading="lazy" />
                  <Image src={unsplash('workout', 500)} alt="Woman performing a workout" className="img-accent" width={500} height={500} loading="lazy" />
                </div>
              </div>
              <div className="split-content">
                <span className="section-tag">Move Without Thinking</span>
                <h2>Apparel That Disappears<br />When You <span className="accent-text">Show Up</span></h2>
                <p>Between the warm-up and the final set, your clothes should be the last thing on your mind. Gym Era is engineered to move with you — so the only thing you feel is your strength building.</p>
                <div className="stat-row">
                  <div className="stat">
                    <span className="stat-num">4-Way</span>
                    <span className="stat-label">Performance Stretch</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">Anti-Odor</span>
                    <span className="stat-label">Treated Fabric</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">Squat</span>
                    <span className="stat-label">Proof Design</span>
                  </div>
                </div>
                <Link href="/shop" className="btn btn-primary">
                  Explore the Collection <ArrowIcon />
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 4. Full-Bleed Action Banner */}
      <ParallaxBanner src={unsplash('training', 1920)} ariaLabel="Action shot">
        <div className="parallax-content container">
          <RevealOnScroll>
            <h2 className="parallax-text">Every Rep.<br />Every Set.<br />Every <span className="accent-text">Single Day.</span></h2>
          </RevealOnScroll>
        </div>
      </ParallaxBanner>

      {/* 5. Why Gym Era — Benefits */}
      <section id="why-gym-era" className="section-pad" aria-label="Benefits">
        <div className="container">
          <RevealOnScroll className="section-header text-center">
            <span className="section-tag">Why Women Choose Us</span>
            <h2>What You Get When You<br />Train in <span className="accent-text">Gym Era</span></h2>
          </RevealOnScroll>
          <RevealOnScroll stagger className="benefits-grid">
            <div className="benefit-card benefit-card--photo">
              <div className="benefit-card__img">
                <Image src={unsplash('gymWoman', 600)} alt="Woman focused during workout" width={600} height={375} loading="lazy" />
              </div>
              <div className="benefit-card__body">
                <h3>Total Focus</h3>
                <p>When your apparel fits right and moves with you, there is nothing left to adjust. Your only job is to train and feel powerful doing it.</p>
              </div>
            </div>
            <div className="benefit-card benefit-card--photo">
              <div className="benefit-card__img">
                <Image src={unsplash('boxJump', 600)} alt="Athletic woman doing box jump" width={600} height={375} loading="lazy" />
              </div>
              <div className="benefit-card__body">
                <h3>Zero Distractions</h3>
                <p>No pulling, no bunching, no riding up. Gym Era stays locked in so you can push harder without thinking twice about coverage.</p>
              </div>
            </div>
            <div className="benefit-card benefit-card--photo">
              <div className="benefit-card__img">
                <Image src={unsplash('confident', 600)} alt="Confident woman at the gym" width={600} height={375} loading="lazy" />
              </div>
              <div className="benefit-card__body">
                <h3>Confidence Built In</h3>
                <p>Walk into any gym knowing you look as strong as you feel. Gym Era is built for women who show up and put in the work.</p>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* 6. Featured Products Strip — The Gym Era Lineup */}
      <section id="featured" className="section-pad bg-dark" aria-label="Featured products">
        <div className="container">
          <RevealOnScroll className="section-header text-center">
            <span className="section-tag">The Collection</span>
            <h2>The <span className="accent-text">Gym Era</span> Lineup</h2>
            <p>{lineupProducts.length ? 'Performance essentials. Built from the ground up for women who take training seriously.' : 'Four essentials. Zero compromises. Built from the ground up for women who take training seriously.'}</p>
          </RevealOnScroll>
          <RevealOnScroll stagger className="product-scroll">
            {(lineupProducts.length > 0 ? lineupProducts : [
              { id: '1', name: 'The Foundation Trainer', price: '$54.40', images: [{ src: unsplash('training', 600), isMain: true }] },
              { id: '2', name: 'Era Compression Short', price: '$43.20', images: [{ src: unsplash('workout', 600), isMain: true }] },
              { id: '3', name: 'Grip Flex Legging', price: '$57.60', images: [{ src: unsplash('legging', 600), isMain: true }] },
              { id: '4', name: 'The Gym Era Tee', price: '$30.40', images: [{ src: unsplash('confident', 600), isMain: true }] },
            ] as LineupProduct[]).map((product) => {
              const mainImg = product.images?.find((i) => i.isMain) || product.images?.[0];
              return (
                <article className="product-card-v2" key={product.id}>
                  <Link href="/shop" className="product-card-v2__link">
                    <div className="product-card-v2__img">
                      <Image src={mainImg?.src ?? ''} alt={product.name} width={600} height={800} loading="lazy" unoptimized={mainImg?.src?.startsWith('/')} />
                      <div className="product-card-v2__overlay">
                        <span>View Product</span>
                      </div>
                    </div>
                    <div className="product-card-v2__info">
                      <h3>{product.name}</h3>
                      <p>{product.price}{product.sizes ? ` · ${product.sizes}` : ''}</p>
                      <span className="shop-card__sale-badge">20% OFF</span>
                      <div className="product-price-row">
                        <span className="price-original">{originalFromDiscounted(product.price)}</span>
                        <span className="product-price">{product.price}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </RevealOnScroll>
          <RevealOnScroll className="text-center" style={{ marginTop: 48 }}>
            <Link href="/shop" className="btn btn-outline btn-lg">
              Shop All Products <ArrowIcon />
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* 7. Social Proof — Cinematic */}
      <section id="social-proof" className="section-pad" aria-label="Testimonials">
        <div className="container">
          <RevealOnScroll>
            <div className="testimonial-hero">
              <div className="testimonial-hero__img">
                <Image src={unsplash('dumbbells', 800)} alt="Woman training in gym" width={800} height={1000} loading="lazy" />
              </div>
              <div className="testimonial-hero__content">
                <div className="review-stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote>&ldquo;I Don&apos;t Think About My Clothes Anymore. I Just Train.&rdquo;</blockquote>
                <cite>Samira T., Strength Athlete</cite>
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll stagger className="reviews-grid">
            {reviews.map((review) => (
              <div className="review-card" key={review.author}>
                <div className="review-stars" aria-label="5 out of 5 stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="review-text">{review.text}</p>
                <span className="review-author">— {review.author}</span>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* 8. Photo Gallery Strip */}
      <GalleryStrip images={galleryImages} />

      {/* 9. Manifesto — Full Bleed */}
      <section id="manifesto" className="manifesto-section" aria-label="Brand manifesto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={unsplash('gymWoman', 1920)} alt="" className="manifesto-bg" loading="lazy" aria-hidden="true" />
        <div className="manifesto-overlay" />
        <RevealOnScroll className="manifesto-inner container">
          <h2>We Don&apos;t Sell Clothes.<br />We Build <span className="accent-text">Confidence.</span></h2>
          <p>Gym Era exists for women who show up every single day and demand more from their apparel. This is for the ones who train with purpose.</p>
          <Link href="/story" className="btn btn-primary btn-lg">
            Read Our Story <ArrowIcon />
          </Link>
        </RevealOnScroll>
      </section>

      {/* 10. Email Capture */}
      <section id="email-capture" className="section-pad" aria-label="Email signup">
        <div className="container">
          <RevealOnScroll>
            <div className="email-block">
              <div className="email-block__content">
                <span className="section-tag">Join the Era</span>
                <h2>Get Early Access + <span className="accent-text">15% Off</span> Your First Order</h2>
                <p>Be first to shop new drops and member-only deals. No spam. Unsubscribe anytime.</p>
                <EmailForm inputId="email-input" />
              </div>
              <div className="email-block__img">
                <Image src={unsplash('training', 600)} alt="Woman preparing to train" width={600} height={600} loading="lazy" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
