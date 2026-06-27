'use client';

/**
 * Meta / Facebook & Instagram Shop — Checkout URL Handler
 *
 * Meta sends customers here with URL-encoded product IDs and quantities:
 *   /checkout?products=aura-lift-top%3A2%2Caura-lift-set%3A1&coupon=SUMMERSALE20
 *
 * This page:
 *   1. Parses the `products` param  → productId:quantity pairs
 *   2. Parses the optional `coupon` param
 *   3. Clears any previous cart
 *   4. Populates the cart with the products from the catalog
 *   5. Stores the coupon code
 *   6. Redirects the customer to /cart to complete checkout
 */

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCart, CartItem } from '@/context/CartContext';
import productsData from '@/lib/products-data.json';

type CatalogProduct = {
  id: string;
  name: string;
  price: string;
  sizes?: string;
  images?: { src: string; isMain: boolean }[];
};

function MetaCheckoutHandler() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { replaceCart, applyCoupon, removeCoupon } = useCart();

  useEffect(() => {
    const productsParam = searchParams.get('products') ?? '';
    const couponParam = searchParams.get('coupon') ?? '';

    const newItems: CartItem[] = [];

    if (productsParam) {
      // Meta URL-encodes commas (%2C) and colons (%3A).
      // The browser decodes them before passing to searchParams, so we
      // receive a plain "productId:qty,productId:qty" string here.
      for (const entry of productsParam.split(',')) {
        const colonIdx = entry.indexOf(':');
        if (colonIdx === -1) continue;

        const productId = entry.slice(0, colonIdx).trim();
        const quantity = parseInt(entry.slice(colonIdx + 1), 10);

        if (!productId || isNaN(quantity) || quantity < 1) continue;

        const product = (productsData as CatalogProduct[]).find((p) => p.id === productId);

        if (!product) {
          // Product not found in catalog — skip silently.
          // Meta's validation will flag mismatches during their review.
          continue;
        }

        const mainImage = product.images?.find((img) => img.isMain)?.src ?? product.images?.[0]?.src;

        newItems.push({
          id: product.id,
          name: product.name,
          price: product.price,
          sizes: product.sizes,
          quantity,
          image: mainImage,
        });
      }
    }

    // Replace cart in a single state update (avoids async batching issues)
    replaceCart(newItems);

    // Apply or clear coupon
    if (couponParam) {
      applyCoupon(couponParam);
    } else {
      removeCoupon();
    }

    // Send customer to cart to complete checkout
    router.replace('/cart');
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="section-pad" aria-label="Loading cart">
      <div className="container" style={{ textAlign: 'center', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>Loading your cart&hellip;</p>
      </div>
    </section>
  );
}

// useSearchParams() requires a Suspense boundary in Next.js App Router
export default function MetaCheckoutPage() {
  return (
    <Suspense
      fallback={
        <section className="section-pad">
          <div className="container" style={{ textAlign: 'center', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>Loading&hellip;</p>
          </div>
        </section>
      }
    >
      <MetaCheckoutHandler />
    </Suspense>
  );
}
