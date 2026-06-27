import type { Metadata } from 'next';
import RevealOnScroll from '@/components/RevealOnScroll';

export const metadata: Metadata = {
  title: 'Terms of Service | Gym Era',
  description: 'Read the Gym Era Terms of Service to understand the rules and guidelines for using our website and purchasing our activewear.',
  alternates: { canonical: '/terms-of-service' },
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using the Gym Era website (gymeraactive.com) and purchasing our products, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our site or place an order.',
  },
  {
    title: '2. Products and Availability',
    body: 'All products listed on our site are subject to availability. We reserve the right to discontinue any product at any time. Product images are for illustrative purposes and colors may vary slightly due to screen settings.',
  },
  {
    title: '3. Pricing and Payment',
    body: 'All prices are listed in US dollars and are subject to change without notice. We accept major credit cards and other payment methods displayed at checkout. Payment is processed securely at the time of order. Gym Era is not responsible for any additional fees charged by your bank or payment provider.',
  },
  {
    title: '4. Order Acceptance',
    body: 'Placing an order does not constitute a confirmed sale. We reserve the right to cancel or refuse any order for reasons including but not limited to product availability, pricing errors, or suspected fraudulent activity. You will be notified and fully refunded if your order cannot be fulfilled.',
  },
  {
    title: '5. Shipping',
    body: 'We aim to process and ship orders within 3\u20137 business days. Delivery timelines depend on your location and chosen shipping method. Gym Era is not responsible for delays caused by shipping carriers, customs, or events outside our control. Risk of loss passes to you upon delivery to the carrier.',
  },
  {
    title: '6. Intellectual Property',
    body: 'All content on this website \u2014 including text, images, logos, graphics, and product designs \u2014 is the property of Gym Era and is protected by applicable copyright and trademark laws. You may not reproduce, distribute, or use any content without our express written permission.',
  },
  {
    title: '7. User Conduct',
    body: "You agree to use this website only for lawful purposes. You may not use our site to transmit harmful content, attempt unauthorized access, scrape data, or engage in any activity that disrupts the site or other users' experience.",
  },
  {
    title: '8. Disclaimer of Warranties',
    body: 'Our website and products are provided \u201cas is.\u201d Gym Era makes no warranties, express or implied, regarding fitness for a particular purpose, accuracy of information, or uninterrupted access to the site. Use of our products and website is at your own risk.',
  },
  {
    title: '9. Limitation of Liability',
    body: 'To the fullest extent permitted by law, Gym Era shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the website or our products. Our total liability for any claim shall not exceed the amount you paid for the order in question.',
  },
  {
    title: '10. Governing Law',
    body: 'These Terms of Service are governed by the laws of the United States. Any disputes shall be resolved in the applicable courts of competent jurisdiction. If any provision of these terms is found unenforceable, the remaining provisions will continue in full effect.',
  },
  {
    title: '11. Changes to These Terms',
    body: 'We may update these Terms of Service at any time. Changes will be posted on this page with an updated effective date. Continued use of our website after any changes constitutes your acceptance of the revised terms.',
  },
  {
    title: '12. Contact Us',
    body: 'If you have any questions about these Terms of Service, please contact us at support@gymeraactive.com. We are happy to help.',
  },
];

export default function TermsOfServicePage() {
  return (
    <>
      <section
        className="section-pad bg-dark"
        style={{ paddingTop: 'clamp(120px, 18vw, 180px)' }}
        aria-label="Terms of Service header"
      >
        <div className="container">
          <RevealOnScroll>
            <span className="section-tag">Legal</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
              Terms of <span className="accent-text">Service</span>
            </h1>
            <p style={{ marginTop: '1rem', maxWidth: '55ch' }}>
              Last updated: June 26, 2026. Please read these terms carefully before using our website or placing an order.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-pad" aria-label="Terms of Service content">
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
