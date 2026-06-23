import { NextRequest, NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';

const TICKET_PRICE_CENTS = 2500; // $25.00

export async function POST(req: NextRequest) {
  try {
    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;

    if (!accessToken || !locationId) {
      return NextResponse.json({ error: 'Square is not configured on this server.' }, { status: 500 });
    }

    const client = new SquareClient({
      token: accessToken,
      environment:
        process.env.SQUARE_ENVIRONMENT === 'production'
          ? SquareEnvironment.Production
          : SquareEnvironment.Sandbox,
    });

    const { quantity }: { quantity: number } = await req.json();
    const qty = Math.max(1, Math.min(10, Math.floor(quantity ?? 1)));

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const result = await client.checkout.paymentLinks.create({
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId,
        lineItems: [
          {
            name: 'Dance to Show Love — Fundraiser Ticket (July 18, 2026)',
            quantity: String(qty),
            basePriceMoney: {
              amount: BigInt(TICKET_PRICE_CENTS),
              currency: 'USD' as const,
            },
          },
        ],
      },
      checkoutOptions: {
        redirectUrl: `${origin}/fundraiser/success`,
        askForShippingAddress: false,
      },
    });

    const checkoutUrl = result.paymentLink?.url;
    if (!checkoutUrl) throw new Error('Square did not return a checkout URL.');

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('[Fundraiser Checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
