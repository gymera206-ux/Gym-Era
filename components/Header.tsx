'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.pageYOffset > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeNav = useCallback(() => {
    setNavOpen(false);
    document.body.style.overflow = '';
  }, []);

  const toggleNav = useCallback(() => {
    setNavOpen((prev) => {
      const next = !prev;
      document.body.style.overflow = next ? 'hidden' : '';
      return next;
    });
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && navOpen) {
        closeNav();
        document.getElementById('nav-toggle')?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [navOpen, closeNav]);

  return (
    <header
      className={`site-header${scrolled ? ' scrolled' : ''}`}
      id="site-header"
      role="banner"
    >
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo" aria-label="Gym Era Home">
            GYM <span>ERA</span>
          </Link>
          <nav
            className={`nav-links${navOpen ? ' open' : ''}`}
            id="nav-links"
            role="navigation"
            aria-label="Main navigation"
          >
            <Link href="/shop" onClick={closeNav}>Shop</Link>
            <Link href="/cart" onClick={closeNav} className="header-cart-link">
              Cart
              {totalItems > 0 && <span className="header-cart-count" aria-label={`${totalItems} items in cart`}>{totalItems}</span>}
            </Link>
            <Link href="/story" onClick={closeNav}>Our Story</Link>
            <Link href="/shop" className="btn btn-primary nav-cta" onClick={closeNav}>
              Shop Now
            </Link>
          </nav>
          <button
            className={`nav-toggle${navOpen ? ' active' : ''}`}
            id="nav-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={navOpen}
            onClick={toggleNav}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
      <div
        className={`nav-overlay${navOpen ? ' active' : ''}`}
        id="nav-overlay"
        onClick={closeNav}
      />
    </header>
  );
}
