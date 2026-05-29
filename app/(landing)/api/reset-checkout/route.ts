import { NextRequest, NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';

export async function POST(req: NextRequest) {
  try {
    const accessToken = process.env.SQUARE_ACCESS_TOKEN;
    const locationId = process.env.SQUARE_LOCATION_ID;

    if (!accessToken || !locationId) {
      return NextResponse.json(
        { error: 'Square is not configured on this server.' },
        { status: 500 }
      );
    }

    const client = new SquareClient({
      token: accessToken,
      environment:
        process.env.SQUARE_ENVIRONMENT === 'production'
          ? SquareEnvironment.Production
          : SquareEnvironment.Sandbox,
    });

    const origin =
      req.headers.get('origin') ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      'http://localhost:3000';

    const result = await client.checkout.paymentLinks.create({
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId,
        lineItems: [
          {
            name: 'Gym Era Reset — Full 7-Day Program',
            quantity: '1',
            basePriceMoney: {
              amount: BigInt(1700),
              currency: 'USD' as const,
            },
          },
        ],
      },
      checkoutOptions: {
        redirectUrl: `${origin}/reset/thank-you/success`,
        askForShippingAddress: false,
      },
    });

    const checkoutUrl = result.paymentLink?.url;

    if (!checkoutUrl) {
      throw new Error('Square did not return a checkout URL.');
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('[Reset Checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
