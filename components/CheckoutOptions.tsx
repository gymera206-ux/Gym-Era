'use client';

import { useEffect, useRef, useState } from 'react';
import { hasPayPal, paypalClientId, paypalOrderApi } from '@/lib/payment-config';
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
  const [squareLoading, setSquareLoading] = useState(false);
  const [squareError, setSquareError] = useState('');

  async function handleSquareCheckout() {
    if (items.length === 0) return;
    setSquareLoading(true);
    setSquareError('');
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
      setSquareError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setSquareLoading(false);
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
              window.location.href = '/checkout/success';
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

  return (
    <div className="checkout-options">
      <p className="checkout-options__label">Secure checkout</p>
      <div className="checkout-options__buttons">
        <button
          onClick={handleSquareCheckout}
          disabled={squareLoading || items.length === 0}
          className="btn btn-primary checkout-options__square"
        >
          {squareLoading ? 'Redirecting…' : 'Pay with Square'}
        </button>
        {hasPayPal && (
          <div className="checkout-options__paypal" ref={paypalRef}>
            {!paypalLoaded && <span className="checkout-options__loading">Loading PayPal…</span>}
          </div>
        )}
      </div>
      {squareError && <p className="checkout-options__error">{squareError}</p>}
      <p className="checkout-options__trust">
        We accept Square and PayPal. Your payment is secure.
      </p>
    </div>
  );
}
