import type { Metadata } from 'next';
import RevealOnScroll from '@/components/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Privacy Policy | Gym Era',
  description: 'Learn how Gym Era collects, uses, and protects your personal information when you visit our website or place an order.',
  alternates: { canonical: '/privacy-policy' },
};

const sections = [
  {
    title: '1. Information We Collect',
    body: 'When you place an order or create an account, we collect personal information such as your name, email address, shipping address, and payment details. We may also collect non-personal data such as browser type, IP address, and pages visited to improve your experience on our site.',
  },
  {
    title: '2. How We Use Your Information',
    body: 'We use the information we collect to process and fulfill your orders, send order confirmations and shipping updates, respond to customer service inquiries, send promotional emails (only with your consent), and improve our website and product offerings.',
  },
  {
    title: '3. Payment Security',
    body: 'We do not store your full credit card details on our servers. All payment information is handled by our secure third-party payment processors who comply with PCI-DSS standards. Your financial data is encrypted and protected at all times.',
  },
  {
    title: '4. Sharing of Information',
    body: 'We do not sell, rent, or trade your personal information to third parties. We may share your data with trusted service providers \u2014 such as shipping carriers and payment processors \u2014 strictly to fulfill your order. These partners are contractually obligated to keep your information confidential.',
  },
  {
    title: '5. Cookies',
    body: 'Our website uses cookies to remember your preferences, maintain your shopping cart session, and analyze site traffic. You can control cookie settings through your browser. Disabling cookies may affect some features of the site.',
  },
  {
    title: '6. Email Communications',
    body: 'If you subscribe to our email list, we will send you updates about new products, promotions, and training tips. You can unsubscribe at any time by clicking the unsubscribe link in any email. Transactional emails related to your order will still be sent regardless of subscription status.',
  },
  {
    title: '7. Data Retention',
    body: 'We retain your personal information for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes. You may request deletion of your account and associated data at any time by contacting us.',
  },
  {
    title: '8. Your Rights',
    body: 'You have the right to access, correct, or delete the personal information we hold about you. You may also object to certain processing activities or request data portability. To exercise any of these rights, please contact us at support@gymera.com.',
  },
  {
    title: '9. Third-Party Links',
    body: 'Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites. We encourage you to review the privacy policies of any external sites you visit.',
  },
  {
    title: "10. Children's Privacy",
    body: 'Our website is not intended for children under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with their information, please contact us and we will promptly remove it.',
  },
  {
    title: '11. Changes to This Policy',
    body: 'We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this page periodically to stay informed about how we protect your information.',
  },
  {
    title: '12. Contact Us',
    body: 'If you have any questions or concerns about this Privacy Policy, please reach out to us at support@gymera.com. Your privacy matters to us and we will respond as quickly as possible.',
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section
        className="section-pad bg-dark"
        style={{ paddingTop: 'clamp(120px, 18vw, 180px)' }}
        aria-label="Privacy Policy header"
      >
        <div className="container">
          <RevealOnScroll>
            <span className="section-tag">Legal</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
              Privacy <span className="accent-text">Policy</span>
            </h1>
            <p style={{ marginTop: '1rem', maxWidth: '55ch' }}>
              Last updated: June 26, 2026. Your privacy is important to us. This policy explains how we collect and use your information.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-pad" aria-label="Privacy Policy content">
        <div className="container">
          <div style={{ maxWidth: '72ch' }}>
            {sections.map((s, i) => (
              <RevealOnScroll key={i}>
                <div style={{ marginBottom: '2.5rem' }}>
                  <h2
                    style={{
                      fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                      fontFamily: 'var(--font-josefin)',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      marginBottom: '0.75rem',
                    }}
                  >
                    {s.title}
                  </h2>
                  <p style={{ maxWidth: '72ch' }}>{s.body}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
