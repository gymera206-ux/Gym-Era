import type { Metadata } from 'next';
import '../../reset.css';
import '../get-the-reset.css';

export const metadata: Metadata = {
  title: "You're In! | Gym Era Reset",
  description: 'Your full 7-Day Reset is on its way. Welcome to the community.',
  robots: { index: false, follow: false },
};

export default function GetTheResetSuccessPage() {
  return (
    <div className="re-page">
      <section
        className="re-ty-confirm"
        style={{
          borderBottom: 'none',
          paddingBottom: '3rem',
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className="re-wordmark">
          <span className="re-wm-gym">GYM</span>
          <span className="re-wm-era">ERA</span>
        </div>
        <span className="re-pill" style={{ marginBottom: '1.5rem' }}>
          Purchase Complete
        </span>
        <h1 className="re-h2">
          You&apos;re All Set.
          <em>All 7 Days Are Yours.</em>
        </h1>
        <p
          style={{
            maxWidth: '520px',
            marginTop: '1.5rem',
            fontSize: '1.05rem',
            lineHeight: '1.7',
            textAlign: 'center',
          }}
        >
          Check your inbox &mdash; the full 7-Day Reset program is being delivered
          now. All workouts, meal plans, and cool-downs in one place.
        </p>
        <p
          style={{
            marginTop: '1rem',
            fontSize: '0.95rem',
            color: 'var(--muted)',
          }}
        >
          If you don&apos;t see it in a few minutes, check your spam or
          promotions folder.
        </p>

        {/* WhatsApp Community CTA */}
        <div
          style={{
            marginTop: '3rem',
            padding: '2rem',
            background: 'var(--cream-2)',
            border: '1px solid var(--line)',
            borderRadius: '16px',
            textAlign: 'center',
            maxWidth: '480px',
            width: '100%',
          }}
        >
          <p style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>
            &#128172;
          </p>
          <h2
            style={{
              fontFamily: "var(--font-josefin, 'Josefin Sans', sans-serif)",
              fontSize: '1.2rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.04em',
              color: 'var(--dark)',
              marginBottom: '0.75rem',
            }}
          >
            Join the Community
          </h2>
          <p
            style={{
              fontSize: '0.95rem',
              lineHeight: '1.6',
              color: 'var(--muted)',
              marginBottom: '1.5rem',
            }}
          >
            Your WhatsApp group invite is in your confirmation email. Jump in,
            introduce yourself, and meet the women doing this with you.
          </p>
          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--muted)',
              fontStyle: 'italic',
            }}
          >
            Can&apos;t find the invite? Check your spam folder or reply to your
            confirmation email and we&apos;ll get you in.
          </p>
        </div>
      </section>
    </div>
  );
}
