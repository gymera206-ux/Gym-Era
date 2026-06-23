import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Ticket Confirmed — Dance to Show Love | Gym Era' };

export default function FundraiserSuccessPage() {
  return (
    <main className="checkout-result">
      <div className="checkout-result__inner">
        <div className="checkout-result__icon checkout-result__icon--success">✓</div>
        <h1 className="checkout-result__title">You&apos;re In!</h1>
        <p className="checkout-result__message">
          Thank you for your support. Your ticket for the Dance to Show Love fundraiser
          has been confirmed. You&apos;ll receive a confirmation email shortly.
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
          Saturday, July 18th, 2026 &mdash; Location &amp; Time TBA
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/fundraiser" className="btn btn-primary checkout-result__btn">
            Back to Fundraiser
          </Link>
          <Link href="/shop" className="btn btn-ghost checkout-result__btn">
            Browse the Shop
          </Link>
        </div>
      </div>
    </main>
  );
}
