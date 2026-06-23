'use client';

import { useState } from 'react';
import ArrowIcon from './ArrowIcon';

export default function FundraiserCheckoutButton() {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const total = (quantity * 25).toFixed(2);

  async function handleCheckout() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/fundraiser-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error ?? 'Failed to create checkout.');
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="fundraiser-checkout">
      <div className="fundraiser-checkout__qty">
        <label htmlFor="ticket-qty" className="fundraiser-checkout__qty-label">
          Number of Tickets
        </label>
        <div className="fundraiser-checkout__qty-controls">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
          >
            −
          </button>
          <span id="ticket-qty" aria-live="polite">{quantity}</span>
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.min(10, q + 1))}
            aria-label="Increase quantity"
            disabled={quantity >= 10}
          >
            +
          </button>
        </div>
      </div>

      <p className="fundraiser-checkout__total">
        Total: <strong>${total}</strong>
        <span> ({quantity} ticket{quantity !== 1 ? 's' : ''} × $25)</span>
      </p>

      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? 'Redirecting to Square…' : `Buy Ticket${quantity !== 1 ? 's' : ''} — $${total}`}
        {!loading && <ArrowIcon />}
      </button>

      {error && <p className="fundraiser-checkout__error">{error}</p>}

      <p className="fundraiser-checkout__trust">
        Secure payment powered by Square. All proceeds go to MFASCD Foundation.
      </p>
    </div>
  );
}
