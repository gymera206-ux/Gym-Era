import type { Metadata } from 'next';
import '../reset.css';

export const metadata: Metadata = {
  title: 'You\'re In! | Gym Era Reset',
  description: 'Check your inbox — Day 1 of the Gym Era Reset is on its way.',
  robots: { index: false, follow: false },
};

export default function ThankYouPage() {
  return (
    <div className="re-page">
      <section className="re-thankyou">
        <div className="re-thankyou-inner">
          <div className="re-wordmark">
            <span className="re-wm-gym">GYM</span>
            <span className="re-wm-era">ERA</span>
          </div>
          <span className="re-pill">You&apos;re In</span>
          <h1 className="re-h2" style={{ marginTop: '1rem' }}>
            Check Your Inbox.
            <em>Day 1 Is Coming.</em>
          </h1>
          <p className="re-thankyou-sub">
            We just sent you the first workout. If you don&apos;t see it in a
            few minutes, check your spam or promotions folder.
          </p>
        </div>
      </section>
    </div>
  );
}
