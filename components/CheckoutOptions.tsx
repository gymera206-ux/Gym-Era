'use client';

import { useEffect, useRef, useState } from 'react';
import { hasStripe, hasPayPal, paypalClientId, paypalOrderApi } from '@/lib/payment-config';
import { useCart } from '@/context/CartContext';

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: {
        createOrder?: (data: unknown, actions: unknown) => Promise<string>;
        onApprove?: (data: { orderID: string }, actions: unknown) => Promise<void>;
        style?: { layout: string; color: string };
      }) => { render: (selector: string | HTMLElement) => Promise<unknown> };
    };
  }
}

export default function CheckoutOptions() {
  const { items } = useCart();
  const paypalRef = useRef<HTMLDivElement>(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);
  const [stripeLoading, setStripeLoading] = useState(false);
  const [stripeError, setStripeError] = useState('');

  async function handleStripeCheckout() {
    if (items.length === 0) return;
    setStripeLoading(true);
    setStripeError('');
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Failed to create checkout session.');
      }
      window.location.href = data.url;
    } catch (err) {
      setStripeError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStripeLoading(false);
    }
  }

  useEffect(() => {
    if (!hasPayPal || !paypalRef.current) return;

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD&components=buttons`;
    script.async = true;
    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        window.paypal
          .Buttons({
            style: { layout: 'vertical', color: 'gold' },
            createOrder: paypalOrderApi
              ? async () => {
                  const res = await fetch(paypalOrderApi, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ amount: 50, currency: 'USD', description: 'Gym Era' }),
                  });
                  const data = await res.json();
                  return data.id ?? data.orderID ?? '';
                }
              : undefined,
            onApprove: async () => {
              window.location.href = '/shop?payment=success';
            },
          })
          .render(paypalRef.current)
          .then(() => setPaypalLoaded(true))
          .catch(() => setPaypalLoaded(false));
      }
    };
    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  if (!hasStripe && !hasPayPal) {
    return (
      <p className="checkout-options__setup">
        Add <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> and <code>STRIPE_SECRET_KEY</code> in{' '}
        <code>.env.local</code> to enable Stripe checkout. See <code>.env.example</code>.
      </p>
    );
  }

  return (
    <div className="checkout-options">
      <p className="checkout-options__label">Secure checkout</p>
      <div className="checkout-options__buttons">
        {hasStripe && (
          <button
            onClick={handleStripeCheckout}
            disabled={stripeLoading || items.length === 0}
            className="btn btn-primary checkout-options__stripe"
          >
            {stripeLoading ? 'Redirecting…' : 'Pay with Stripe'}
          </button>
        )}
        {hasPayPal && (
          <div className="checkout-options__paypal" ref={paypalRef}>
            {!paypalLoaded && <span className="checkout-options__loading">Loading PayPal…</span>}
          </div>
        )}
      </div>
      {stripeError && <p className="checkout-options__error">{stripeError}</p>}
      <p className="checkout-options__trust">
        We accept Stripe and PayPal. Your payment is secure.
      </p>
    </div>
  );
}
