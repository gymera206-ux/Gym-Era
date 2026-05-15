/**
 * Payment configuration. Set these in .env.local (see .env.example).
 * - Square: Set SQUARE_ACCESS_TOKEN and SQUARE_LOCATION_ID from your Square Dashboard.
 * - PayPal: Create an app at developer.paypal.com -> get Client ID -> set as NEXT_PUBLIC_PAYPAL_CLIENT_ID
 */

export const squareEnvironment =
  process.env.SQUARE_ENVIRONMENT === 'production' ? 'production' : 'sandbox';

export const paypalClientId =
  process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '';

/** Optional: URL of a serverless API that POSTs { amount, currency } and returns { orderID }. Required for PayPal button. */
export const paypalOrderApi =
  process.env.NEXT_PUBLIC_PAYPAL_ORDER_API ?? '';

export const hasSquare = Boolean(process.env.SQUARE_ACCESS_TOKEN && process.env.SQUARE_LOCATION_ID);
export const hasPayPal = Boolean(paypalClientId && paypalOrderApi);
export const hasAnyPayment = hasSquare || hasPayPal;
