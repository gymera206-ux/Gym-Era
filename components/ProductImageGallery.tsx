'use client';

import Image from 'next/image';
import { useRef, useState, useCallback, useEffect } from 'react';

export interface ProductImageItem {
  src: string;
  isMain?: boolean;
}

interface ProductImageGalleryProps {
  images: ProductImageItem[];
  productName: string;
  className?: string;
}

export default function ProductImageGallery({ images, productName, className = '' }: ProductImageGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 2);
  }, []);

  useEffect(() => {
    updateScrollState();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(updateScrollState);
    ro.observe(el);
    el.addEventListener('scroll', updateScrollState);
    return () => {
      ro.disconnect();
      el.removeEventListener('scroll', updateScrollState);
    };
  }, [images.length, updateScrollState]);

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -step : step, behavior: 'smooth' });
  };

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft' && images.length > 1) {
        setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
      }
      if (e.key === 'ArrowRight' && images.length > 1) {
        setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIndex, images.length]);

  if (!images.length) return null;

  return (
    <>
      <div className={`product-gallery ${className}`}>
        <div
          ref={scrollRef}
          className="product-gallery__scroll"
          role="region"
          aria-label={`${productName} images`}
          tabIndex={0}
        >
          {images.map((img, i) => (
            <button
              type="button"
              key={img.src}
              className="product-gallery__thumb"
              onClick={() => openLightbox(i)}
              aria-label={`View image ${i + 1} of ${images.length}`}
            >
              <Image
                src={img.src}
                alt={`${productName} - view ${i + 1}`}
                width={400}
                height={533}
                loading={i === 0 ? 'eager' : 'lazy'}
                unoptimized
              />
              {img.isMain && <span className="product-gallery__main-badge">Main</span>}
            </button>
          ))}
        </div>
        {images.length > 1 && (
          <>
            {canScrollLeft && (
              <button
                type="button"
                className="product-gallery__arrow product-gallery__arrow--left"
                onClick={() => scroll('left')}
                aria-label="Scroll images left"
              />
            )}
            {canScrollRight && (
              <button
                type="button"
                className="product-gallery__arrow product-gallery__arrow--right"
                onClick={() => scroll('right')}
                aria-label="Scroll images right"
              />
            )}
            <div className="product-gallery__indicators" aria-hidden>
              <span className="product-gallery__scroll-hint">Scroll for more</span>
              <span className="product-gallery__dots">
                {images.map((_, i) => (
                  <span key={i} className="product-gallery__dot" aria-hidden />
                ))}
              </span>
            </div>
          </>
        )}
      </div>

      {lightboxIndex !== null && (
        <div
          className="product-gallery__lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} full size image`}
          onClick={closeLightbox}
        >
          <button
            type="button"
            className="product-gallery__lightbox-close"
            onClick={closeLightbox}
            aria-label="Close"
          >
            ×
          </button>
          <div className="product-gallery__lightbox-inner" onClick={(e) => e.stopPropagation()}>
            {images.length > 1 && (
              <button
                type="button"
                className="product-gallery__lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === null ? 0 : (i - 1 + images.length) % images.length));
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
            )}
            <Image
              src={images[lightboxIndex].src}
              alt={`${productName} - full size`}
              width={1200}
              height={1600}
              unoptimized
              className="product-gallery__lightbox-img"
              onClick={(e) => e.stopPropagation()}
            />
            {images.length > 1 && (
              <button
                type="button"
                className="product-gallery__lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((i) => (i === null ? 0 : (i + 1) % images.length));
                }}
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
