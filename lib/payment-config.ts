/**
 * Payment configuration. Set these in .env.local (see .env.example).
 * - Stripe: Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY from your Stripe Dashboard.
 * - PayPal: Create an app at developer.paypal.com → get Client ID → set as NEXT_PUBLIC_PAYPAL_CLIENT_ID
 */

export const stripePublishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '';

export const paypalClientId =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';

/** Optional: URL of a serverless API that POSTs { amount, currency } and returns { orderID }. Required for PayPal button. */
export const paypalOrderApi =
  process.env.NEXT_PUBLIC_PAYPAL_ORDER_API ?? '';

export const hasStripe = Boolean(stripePublishableKey);
export const hasPayPal = Boolean(paypalClientId && paypalOrderApi);
export const hasAnyPayment = hasStripe || hasPayPal;
