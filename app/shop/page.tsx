import type { Metadata } from 'next';
import Image from 'next/image';
import HeroSubPage from '@/components/HeroSubPage';
import RevealOnScroll from '@/components/RevealOnScroll';
import EmailForm from '@/components/EmailForm';
import ArrowIcon from '@/components/ArrowIcon';
import ProductImageGallery from '@/components/ProductImageGallery';
import { unsplash, reviews } from '@/lib/constants';
import productsData from '@/lib/products-data.json';

export const metadata: Metadata = {
  title: 'Shop the Collection | Gym Era Performance Apparel for Women',
  description: 'Shop Gym Era performance apparel for women. The Foundation Trainer, Era Compression Short, Grip Flex Legging, and The Gym Era Tee. Built for women who train.',
  alternates: { canonical: '/shop' },
  openGraph: {
    title: 'Shop the Collection | Gym Era',
    description: 'Four essentials. Zero compromises. Shop performance apparel built for women who train.',
    type: 'website',
    url: '/shop',
  },
};

type FolderProduct = {
  id: string;
  name: string;
  price: string;
  sizes: string;
  folderName: string;
  images: { src: string; isMain: boolean }[];
};

const shopProductsFallback = [
  { name: 'The Foundation Trainer', subtitle: 'Performance Training Top', price: '$68.00', img: unsplash('training', 600), alt: 'The Foundation Trainer', badge: 'Bestseller', href: '#detail-foundation' },
  { name: 'Era Compression Short', subtitle: 'Training Short', price: '$54.00', img: unsplash('workout', 600), alt: 'Era Compression Short', badge: null, href: '#detail-short' },
  { name: 'Grip Flex Legging', subtitle: 'Performance Legging', price: '$72.00', img: unsplash('legging', 600), alt: 'Grip Flex Legging', badge: 'Fan Favorite', href: '#detail-legging' },
  { name: 'The Gym Era Tee', subtitle: 'Cotton-Blend Tee', price: '$38.00', img: unsplash('confident', 600), alt: 'The Gym Era Tee', badge: null, href: '#detail-tee' },
  { name: 'The Foundation Trainer', subtitle: 'Performance Training Top — Slate', price: '$68.00', img: unsplash('dumbbells', 600), alt: 'The Foundation Trainer - alternate', badge: null, href: '#detail-foundation' },
  { name: 'Grip Flex Legging', subtitle: 'Performance Legging — Clay', price: '$72.00', img: unsplash('gymWoman', 600), alt: 'Grip Flex Legging - alternate', badge: 'New', href: '#detail-legging' },
];

const folderProducts = (productsData as FolderProduct[]).filter((p) => p.images?.length > 0);
const useFolderProducts = folderProducts.length > 0;

export default function ShopPage() {
  const jsonLd = useFolderProducts
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'The Gym Era Collection',
        numberOfItems: folderProducts.length,
        itemListElement: folderProducts.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: p.name,
            brand: { '@type': 'Brand', name: 'Gym Era' },
            offers: { '@type': 'Offer', priceCurrency: 'USD', price: (p.price || '').replace(/[^0-9.]/g, '') || '0', availability: 'https://schema.org/InStock' },
          },
        })),
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: 'The Gym Era Collection',
        numberOfItems: 4,
        itemListElement: [
          { '@type': 'ListItem', position: 1, item: { '@type': 'Product', name: 'The Foundation Trainer', description: 'Performance training top that moves with you from warm-up to final set.', brand: { '@type': 'Brand', name: 'Gym Era' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '68.00', availability: 'https://schema.org/InStock' } } },
          { '@type': 'ListItem', position: 2, item: { '@type': 'Product', name: 'Era Compression Short', description: 'Zero ride-up compression shorts for full range every rep.', brand: { '@type': 'Brand', name: 'Gym Era' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '54.00', availability: 'https://schema.org/InStock' } } },
          { '@type': 'ListItem', position: 3, item: { '@type': 'Product', name: 'Grip Flex Legging', description: 'Performance legging that stays put so you can move without limits.', brand: { '@type': 'Brand', name: 'Gym Era' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '72.00', availability: 'https://schema.org/InStock' } } },
          { '@type': 'ListItem', position: 4, item: { '@type': 'Product', name: 'The Gym Era Tee', description: 'Earned, not given. The standard-bearer of Gym Era.', brand: { '@type': 'Brand', name: 'Gym Era' }, offers: { '@type': 'Offer', priceCurrency: 'USD', price: '38.00', availability: 'https://schema.org/InStock' } } },
        ],
      };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <HeroSubPage src={unsplash('training', 1920)} ariaLabel="Shop hero">
        <div className="hero-badge reveal">The Collection</div>
        <h1 className="reveal" style={{ fontSize: 'clamp(2.5rem,7vw,5rem)' }}>The Gym Era<br /><span className="accent-text">Collection</span></h1>
        <p className="hero-sub reveal">Four essentials. Zero compromises. Built for women who take training seriously.</p>
      </HeroSubPage>

      {/* Product Grid — from folder products or fallback */}
      <section id="products" className="section-pad" aria-label="Products">
        <div className="container">
          <RevealOnScroll className="section-header">
            <span className="section-tag">Shop All</span>
            <h2>Performance <span className="accent-text">Essentials</span></h2>
          </RevealOnScroll>
          <RevealOnScroll stagger className="shop-grid">
            {useFolderProducts
              ? folderProducts.map((product) => (
                  <article className="shop-card" key={product.id}>
                    <div className="shop-card__img shop-card__img--gallery">
                      <ProductImageGallery
                        images={product.images}
                        productName={product.name}
                      />
                    </div>
                    <div className="shop-card__body">
                      <h3>{product.name}</h3>
                      <div className="shop-card__price">
                        <span className="price-current">{product.price || '—'}</span>
                      </div>
                      {product.sizes && (
                        <p className="shop-card__sizes">
                          Sizes: <span>{product.sizes}</span>
                        </p>
                      )}
                    </div>
                  </article>
                ))
              : shopProductsFallback.map((product, i) => (
                  <article className="shop-card" key={i}>
                    <a href={product.href} className="shop-card__link">
                      <div className="shop-card__img">
                        <Image src={product.img} alt={product.alt} width={600} height={800} loading="lazy" />
                        {product.badge && <span className="shop-card__badge">{product.badge}</span>}
                        <div className="shop-card__quick"><span className="btn">Quick View</span></div>
                      </div>
                    </a>
                    <div className="shop-card__body">
                      <h3>{product.name}</h3>
                      <p className="shop-card__subtitle">{product.subtitle}</p>
                      <div className="shop-card__price">
                        <span className="price-current">{product.price}</span>
                      </div>
                    </div>
                  </article>
                ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured Product Detail — Foundation Trainer */}
      <section id="detail-foundation" className="section-pad bg-dark" aria-label="Foundation Trainer details">
        <div className="container">
          <RevealOnScroll>
            <div className="shop-detail-grid">
              <div className="shop-detail__img">
                <Image src={unsplash('training', 900)} alt="The Foundation Trainer - detailed view" width={900} height={1200} loading="lazy" />
              </div>
              <div className="shop-detail__content">
                <span className="section-tag">Bestseller</span>
                <h2>The Foundation <span className="accent-text">Trainer</span></h2>
                <span className="price-current">$68.00</span>
                <p className="product-tagline">Moves with you from warm-up to final set. Engineered with 4-way stretch fabric that follows your body through every movement and stays breathable when the intensity rises.</p>
                <div className="shop-detail__features">
                  <span>4-Way Stretch</span>
                  <span>Anti-Odor</span>
                  <span>Moisture-Wicking</span>
                  <span>Flatlock Seams</span>
                </div>
                <button className="btn btn-primary btn-lg" aria-label="Add The Foundation Trainer to cart">
                  Add to Cart <ArrowIcon />
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Featured Product Detail — Grip Flex Legging */}
      <section id="detail-legging" className="section-pad" aria-label="Grip Flex Legging details">
        <div className="container">
          <RevealOnScroll>
            <div className="shop-detail-grid" style={{ direction: 'rtl' }}>
              <div className="shop-detail__img" style={{ direction: 'ltr' }}>
                <Image src={unsplash('legging', 900)} alt="Grip Flex Legging - detailed view" width={900} height={1200} loading="lazy" />
              </div>
              <div className="shop-detail__content" style={{ direction: 'ltr' }}>
                <span className="section-tag">Fan Favorite</span>
                <h2>Grip Flex <span className="accent-text">Legging</span></h2>
                <span className="price-current">$72.00</span>
                <p className="product-tagline">Stays put so you can move without limits. The Grip Flex uses a proprietary waistband and compressive knit that hugs every curve without squeezing. Completely squat-proof, sweat-proof, and built for women who refuse to hold back.</p>
                <div className="shop-detail__features">
                  <span>Squat-Proof</span>
                  <span>Compressive Knit</span>
                  <span>High-Rise</span>
                  <span>Side Pocket</span>
                </div>
                <button className="btn btn-primary btn-lg" aria-label="Add Grip Flex Legging to cart">
                  Add to Cart <ArrowIcon />
                </button>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Size & Fit Guide */}
      <section className="section-pad bg-dark" aria-label="Size and fit">
        <div className="container">
          <RevealOnScroll>
            <div className="split-section split-section--reverse">
              <div className="split-media">
                <div className="img-stack">
                  <Image src={unsplash('dumbbells', 800)} alt="Woman training in Gym Era apparel" className="img-main" width={800} height={1000} loading="lazy" />
                </div>
              </div>
              <div className="split-content">
                <span className="section-tag">Built to Fit</span>
                <h2>Designed on <span className="accent-text">Real Bodies</span></h2>
                <p>We did not build our patterns on mannequins. Every Gym Era piece was fit-tested on real women doing real movements — squats, presses, lunges, deadlifts, and everything in between. The result is a fit that holds up through your hardest session and still looks incredible walking out the door.</p>
                <div className="stat-row">
                  <div className="stat">
                    <span className="stat-num">200+</span>
                    <span className="stat-label">Fit Tests</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">12</span>
                    <span className="stat-label">Months R&amp;D</span>
                  </div>
                  <div className="stat">
                    <span className="stat-num">XS–3XL</span>
                    <span className="stat-label">Size Range</span>
                  </div>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Social Proof Strip */}
      <section className="section-pad" aria-label="Customer reviews">
        <div className="container">
          <RevealOnScroll className="section-header text-center">
            <span className="section-tag">Real Women. Real Results.</span>
            <h2>What the <span className="accent-text">Community</span> Says</h2>
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

      {/* Email Capture */}
      <section id="email-capture" className="section-pad bg-dark" aria-label="Email signup">
        <div className="container">
          <RevealOnScroll>
            <div className="email-block">
              <div className="email-block__content">
                <span className="section-tag">Join the Era</span>
                <h2>Get Early Access + <span className="accent-text">15% Off</span></h2>
                <p>New drops. Member-only deals. Training content that actually helps. No spam. Unsubscribe anytime.</p>
                <EmailForm inputId="shop-email" />
              </div>
              <div className="email-block__img">
                <Image src={unsplash('gymWoman', 600)} alt="Woman gearing up for training" width={600} height={600} loading="lazy" />
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
