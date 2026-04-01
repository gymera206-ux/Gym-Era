'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import CheckoutOptions from '@/components/CheckoutOptions';
import ArrowIcon from '@/components/ArrowIcon';
import { originalFromDiscounted } from '@/lib/pricing';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems } = useCart();

  const totalPrice = items.reduce((sum, i) => {
    const num = parseFloat((i.price || '').replace(/[^0-9.]/g, '')) || 0;
    return sum + num * i.quantity;
  }, 0);
  const totalFormatted = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(totalPrice);

  if (items.length === 0) {
    return (
      <section className="section-pad" aria-label="Cart">
        <div className="container">
          <div className="cart-empty">
            <h1>Your cart is empty</h1>
            <p>Add something from the shop and come back to checkout.</p>
            <Link href="/shop" className="btn btn-primary btn-lg">
              Find Your Fit <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-pad" aria-label="Cart">
      <div className="container">
        <h1 className="cart-page-title">Your Cart</h1>
        <div className="cart-layout">
          <ul className="cart-list" aria-label="Cart items">
            {items.map((item) => (
              <li className="cart-item" key={item.id}>
                {item.image && (
                  <div className="cart-item__img">
                    <Image src={item.image} alt="" width={120} height={160} unoptimized />
                  </div>
                )}
                <div className="cart-item__info">
                  <h3 className="cart-item__name">{item.name}</h3>
                  {item.sizes && <p className="cart-item__sizes">Size: {item.sizes}</p>}
                  <div className="shop-card__price cart-item__price-row">
                    <span className="price-original">{originalFromDiscounted(item.price)}</span>
                    <span className="cart-item__price">{item.price}</span>
                  </div>
                </div>
                <div className="cart-item__qty">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  className="cart-item__remove"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p className="cart-summary__total">
              <span>Total</span>
              <strong>{totalFormatted}</strong>
            </p>
            <p className="cart-summary__count">{totalItems} item{totalItems !== 1 ? 's' : ''}</p>
            <div className="cart-summary__checkout">
              <CheckoutOptions />
            </div>
            <Link href="/shop" className="btn btn-ghost" style={{ marginTop: 16 }}>
              Continue browsing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
