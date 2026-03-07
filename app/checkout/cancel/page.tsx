import Link from 'next/link';

export const metadata = { title: 'Payment Cancelled – Gym Era' };

export default function CheckoutCancelPage() {
  return (
    <main className="checkout-result">
      <div className="checkout-result__inner">
        <div className="checkout-result__icon checkout-result__icon--cancel">✕</div>
        <h1 className="checkout-result__title">Payment Cancelled</h1>
        <p className="checkout-result__message">
          Your order was not completed. No charge was made.
        </p>
        <Link href="/cart" className="btn btn-primary checkout-result__btn">
          Return to Cart
        </Link>
      </div>
    </main>
  );
}
