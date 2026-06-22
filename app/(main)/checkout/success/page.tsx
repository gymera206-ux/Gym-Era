'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="checkout-result">
      <div className="checkout-result__inner">
        <div className="checkout-result__icon checkout-result__icon--success">✓</div>
        <h1 className="checkout-result__title">Order Confirmed!</h1>
        <p className="checkout-result__message">
          Thank you for your purchase. You&apos;ll receive a confirmation email shortly.
        </p>
        <Link href="/shop" className="btn btn-primary checkout-result__btn">
          Continue Shopping
        </Link>
      </div>
    </main>
  );
}
