'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import ArrowIcon from './ArrowIcon';

export type ProductForCart = {
  id: string;
  name: string;
  price: string;
  sizes?: string;
  image?: string;
};

type AddToCartButtonProps = {
  product: ProductForCart;
  className?: string;
  label?: string;
};

export default function AddToCartButton({ product, className = '', label = 'Add to Cart' }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      sizes: product.sizes,
      image: product.image,
    });
    setShowModal(true);
  };

  return (
    <>
      <button
        type="button"
        className={`btn btn-primary btn-lg ${className}`}
        onClick={handleClick}
        aria-label={`Add ${product.name} to cart`}
      >
        {label} <ArrowIcon />
      </button>
      {showModal && (
        <div className="add-to-cart-modal" role="dialog" aria-modal="true" aria-label="Added to cart">
          <div className="add-to-cart-modal__backdrop" onClick={() => setShowModal(false)} />
          <div className="add-to-cart-modal__box">
            <p className="add-to-cart-modal__title">Added to cart</p>
            <p className="add-to-cart-modal__product">{product.name}</p>
            <div className="add-to-cart-modal__actions">
              <Link href="/cart" className="btn btn-primary" onClick={() => setShowModal(false)}>
                Review my cart
              </Link>
              <button type="button" className="btn btn-ghost" onClick={() => setShowModal(false)}>
                Continue browsing
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
