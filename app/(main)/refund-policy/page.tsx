import type { Metadata } from 'next';
import Link from 'next/link';
import RevealOnScroll from '@/components/RevealOnScroll';
import ArrowIcon from '@/components/ArrowIcon';

export const metadata: Metadata = {
  title: 'Refund Policy | Gym Era',
  description: "Learn about Gym Era's return and refund policy. We want you to love your activewear \u2014 find out how to start a return or exchange.",
  alternates: { canonical: '/refund-policy' },
};

const sections = [
  {
    title: '1. Our Commitment',
    body: 'At Gym Era, we want you to feel confident in every purchase. If something is not right with your order, we are here to make it right. Please read this policy carefully so you know exactly what to expect.',
  },
  {
    title: '2. Return Window',
    body: 'You may return eligible items within 30 days of the delivery date. Items must be unworn, unwashed, and in their original condition with all tags attached. We are unable to accept returns on items that show signs of wear, washing, or damage.',
  },
  {
    title: '3. Non-Returnable Items',
    body: 'The following items are final sale and cannot be returned or exchanged: sale and clearance items, gift cards, and any items marked as non-returnable on the product page. We cannot accept returns on items that have been worn, altered, or damaged after delivery.',
  },
  {
    title: '4. How to Start a Return',
    body: 'To initiate a return, email us at support@gymeraactive.com with your order number and the reason for your return. Our team will respond within 2 business days with a Return Merchandise Authorization (RMA) number and instructions. Please do not send items back without an approved RMA \u2014 they may not be processed.',
  },
  {
    title: '5. Return Shipping',
    body: 'Customers are responsible for return shipping costs unless the item arrived damaged or we made an error with your order. We recommend using a trackable shipping method. Gym Era is not responsible for returns that are lost or damaged in transit.',
  },
  {
    title: '6. Refunds',
    body: 'Once we receive and inspect your returned item, we will notify you by email of the refund approval. Approved refunds are issued to your original payment method within 5\u201310 business days. Please note that your bank or credit card provider may take additional time to reflect the refund in your account.',
  },
  {
    title: '7. Exchanges',
    body: 'We offer exchanges for a different size or color of the same item, subject to availability. To request an exchange, contact us at support@gymeraactive.com with your order number and the item details. If the requested size or color is unavailable, we will issue a full refund instead.',
  },
  {
    title: '8. Damaged or Incorrect Orders',
    body: 'If you receive a damaged item or the wrong product, please contact us within 7 days of delivery at support@gymeraactive.com with a photo of the issue and your order number. We will arrange a replacement or full refund at no cost to you, including return shipping.',
  },
  {
    title: '9. Late or Missing Refunds',
    body: 'If you have not received your refund within 10 business days of our approval email, first check your bank account and then contact your credit card provider, as processing times vary. If you have done both and still have not received your refund, please contact us at support@gymeraactive.com.',
  },
  {
    title: '10. Changes to This Policy',
    body: 'We reserve the right to update this Refund Policy at any time. Changes will be posted on this page. Orders placed before any policy change will be honored under the policy in effect at the time of purchase.',
  },
  {
    title: '11. Contact Us',
    body: 'Have a question about a return or refund? We are happy to help. Reach out to our team at support@gymeraactive.com and we will get back to you within 2 business days.',
  },
];

export default function RefundPolicyPage() {
  return (
    <>
      <section
        className="section-pad bg-dark"
        style={{ paddingTop: 'clamp(120px, 18vw, 180px)' }}
        aria-label="Refund Policy header"
      >
        <div className="container">
          <RevealOnScroll>
            <span className="section-tag">Legal</span>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginTop: '0.5rem' }}>
              Refund <span className="accent-text">Policy</span>
            </h1>
            <p style={{ marginTop: '1rem', maxWidth: '55ch' }}>
              Last updated: June 26, 2026. We want you to love your Gym Era gear. Here is everything you need to know about returns and refunds.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section-pad" aria-label="Refund Policy content">
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

            <RevealOnScroll>
              <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--bg-secondary)' }}>
                <p style={{ marginBottom: '1.5rem' }}>
                  Ready to start a return? Contact our team and we will take care of you.
                </p>
                <Link href="/shop" className="btn btn-primary">
                  Back to Shop <ArrowIcon />
                </Link>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
