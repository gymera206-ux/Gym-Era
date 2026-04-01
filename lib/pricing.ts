const DISCOUNT_RATE = 0.2;

export function parsePrice(value: string): number {
  const numeric = parseFloat((value || '').replace(/[^0-9.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}

export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export function originalFromDiscounted(discountedPrice: string): string {
  const discounted = parsePrice(discountedPrice);
  if (discounted <= 0) return '$0.00';
  const original = discounted / (1 - DISCOUNT_RATE);
  return formatUsd(original);
}
