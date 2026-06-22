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

function parseSizes(sizes?: string): string[] {
  if (!sizes) return [];
  return sizes
    .split(/[,&\/]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function AddToCartButton({ product, className = '', label = 'Add to Cart' }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState(false);

  const sizeOptions = parseSizes(product.sizes);
  const hasSizes = sizeOptions.length > 0;

  const handleClick = () => {
    if (hasSizes && !selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    addItem({
      id: `${product.id}${selectedSize ? `-${selectedSize}` : ''}`,
      name: product.name,
      price: product.price,
      sizes: selectedSize || product.sizes,
      image: product.image,
    });
    setShowModal(true);
  };

  return (
    <>
      {hasSizes && (
        <div className="size-selector" role="group" aria-label="Select a size">
          <p className="size-selector__label">
            Select Size{sizeError && <span className="size-selector__error"> — Please choose a size</span>}
          </p>
          <div className="size-selector__options">
            {sizeOptions.map((size) => (
              <button
                key={size}
                type="button"
                className={`size-selector__btn${selectedSize === size ? ' size-selector__btn--active' : ''}`}
                onClick={() => { setSelectedSize(size); setSizeError(false); }}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}
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
            <p className="add-to-cart-modal__product">
              {product.name}{selectedSize ? ` — Size ${selectedSize}` : ''}
            </p>
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
