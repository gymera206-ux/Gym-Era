'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type CartItem = {
  id: string;
  name: string;
  price: string;
  sizes?: string;
  quantity: number;
  image?: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  replaceCart: (items: CartItem[]) => void;
  totalItems: number;
  coupon: string | null;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'gym-era-cart';
const COUPON_KEY = 'gym-era-coupon';

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {}
}

function loadCoupon(): string | null {
  if (typeof window === 'undefined') return null;
  try {
    return localStorage.getItem(COUPON_KEY);
  } catch {
    return null;
  }
}

function saveCoupon(code: string | null) {
  if (typeof window === 'undefined') return;
  try {
    if (code) {
      localStorage.setItem(COUPON_KEY, code);
    } else {
      localStorage.removeItem(COUPON_KEY);
    }
  } catch {}
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setItems(loadCart());
    setCoupon(loadCoupon());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) saveCart(items);
  }, [items, mounted]);

  useEffect(() => {
    if (mounted) saveCoupon(coupon);
  }, [coupon, mounted]);

  const addItem = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id));
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Used by Meta checkout: replaces the entire cart in one operation
  const replaceCart = useCallback((newItems: CartItem[]) => {
    setItems(newItems);
  }, []);

  const applyCoupon = useCallback((code: string) => {
    setCoupon(code.trim().toUpperCase());
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
  }, []);

  const totalItems = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      replaceCart,
      totalItems,
      coupon,
      applyCoupon,
      removeCoupon,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, replaceCart, totalItems, coupon, applyCoupon, removeCoupon]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
