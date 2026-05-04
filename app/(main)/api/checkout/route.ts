import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

type CartItem = {
  id: string;
  name: string;
  price: string;
  sizes?: string;
  quantity: number;
  image?: string;
};

function parsePriceToCents(price: string): number {
  const numeric = parseFloat(price.replace(/[^0-9.]/g, ''));
  if (isNaN(numeric) || numeric <= 0) throw new Error(`Invalid price: "${price}"`);
  return Math.round(numeric * 100);
}

export async function POST(req: NextRequest) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json({ error: 'Stripe is not configured on this server.' }, { status: 500 });
    }

    const stripe = new Stripe(secretKey, { apiVersion: '2026-02-25.clover' });

    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map((item) => {
      const unitAmount = parsePriceToCents(item.price);
      const productName = item.sizes ? `${item.name} (${item.sizes})` : item.name;

      // Stripe requires fully absolute https:// URLs for images.
      // Convert relative paths (e.g. /products/...) to absolute using the request origin.
      let imageUrls: string[] = [];
      if (item.image) {
        const absoluteImage = item.image.startsWith('http')
          ? item.image
          : `${origin}${item.image.startsWith('/') ? '' : '/'}${item.image}`;
        imageUrls = [absoluteImage];
      }

      return {
        quantity: item.quantity,
        price_data: {
          currency: 'usd',
          unit_amount: unitAmount,
          product_data: {
            name: productName,
            ...(imageUrls.length > 0 ? { images: imageUrls } : {}),
          },
        },
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU'],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('[Stripe Checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
