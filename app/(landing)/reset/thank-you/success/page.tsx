import type { Metadata } from 'next';
import '../../reset.css';

export const metadata: Metadata = {
  title: 'You\'re All Set! | Gym Era Reset',
  description: 'Your full 7-Day Reset is on its way.',
  robots: { index: false, follow: false },
};

export default function PurchaseSuccessPage() {
  return (
    <div className="re-page">
      <section className="re-ty-confirm" style={{ borderBottom: 'none', paddingBottom: '4rem', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="re-wordmark">
          <span className="re-wm-gym">GYM</span>
          <span className="re-wm-era">ERA</span>
        </div>
        <span className="re-pill" style={{ marginBottom: '1.5rem' }}>Purchase Complete</span>
        <h1 className="re-h2">
          You&apos;re All Set.
          <em>All 7 Days Are Yours.</em>
        </h1>
        <p className="re-ty-confirm-text" style={{ maxWidth: '480px', marginTop: '1.5rem', fontSize: '1.05rem', lineHeight: '1.7' }}>
          Check your inbox — the full 7-Day Reset program is being delivered now.
          All workouts, meal plans, and cool-downs in one place. No waiting.
        </p>
        <p className="re-ty-confirm-text" style={{ marginTop: '1rem' }}>
          If you don&apos;t see it in a few minutes, check your spam or promotions folder.
        </p>
      </section>
    </div>
  );
}
