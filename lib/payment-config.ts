/**
 * Payment configuration. Set these in .env.local (see .env.example).
 * - Stripe: Create a Payment Link in Stripe Dashboard → Copy link → set as NEXT_PUBLIC_STRIPE_PAYMENT_LINK
 * - PayPal: Create an app at developer.paypal.com → get Client ID → set as NEXT_PUBLIC_PAYPAL_CLIENT_ID
 *   For full checkout, you'll need a serverless API to create orders (see docs).
 */

export const stripePaymentLink =
  process.env.NEXT_PUBLIC_STRIPE_PAYMENT_LINK ?? '';

export const paypalClientId =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';

/** Optional: URL of a serverless API that POSTs { amount, currency } and returns { orderID }. Required for PayPal button. */
export const paypalOrderApi =
  process.env.NEXT_PUBLIC_PAYPAL_ORDER_API ?? '';

export const hasStripe = Boolean(stripePaymentLink);
export const hasPayPal = Boolean(paypalClientId && paypalOrderApi);
export const hasAnyPayment = hasStripe || hasPayPal;
