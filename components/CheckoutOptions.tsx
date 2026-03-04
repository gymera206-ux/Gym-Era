'use client';

import { useEffect, useRef, useState } from 'react';
import { hasStripe, hasPayPal, stripePaymentLink, paypalClientId, paypalOrderApi } from '@/lib/payment-config';

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
  const paypalRef = useRef<HTMLDivElement>(null);
  const [paypalLoaded, setPaypalLoaded] = useState(false);

  useEffect(() => {
    if (!hasPayPal || !paypalRef.current) return;

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD&components=buttons`;
    script.async = true;
    script.onload = () => {
      if (window.paypal && paypalRef.current) {
        const orderApi = process.env.NEXT_PUBLIC_PAYPAL_ORDER_API;
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
            onApprove: async (data) => {
              // Optional: capture on your server or show success
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
        Add <code>NEXT_PUBLIC_STRIPE_PAYMENT_LINK</code> and/or <code>NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> + <code>NEXT_PUBLIC_PAYPAL_ORDER_API</code> in <code>.env.local</code> to enable checkout. See <code>.env.example</code>.
      </p>
    );
  }

  return (
    <div className="checkout-options">
      <p className="checkout-options__label">Secure checkout</p>
      <div className="checkout-options__buttons">
        {hasStripe && (
          <a
            href={stripePaymentLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary checkout-options__stripe"
          >
            Pay with Stripe
          </a>
        )}
        {hasPayPal && (
          <div className="checkout-options__paypal" ref={paypalRef}>
            {!paypalLoaded && <span className="checkout-options__loading">Loading PayPal…</span>}
          </div>
        )}
      </div>
      <p className="checkout-options__trust">
        We accept Stripe and PayPal. Your payment is secure.
      </p>
    </div>
  );
}
