import { NextRequest, NextResponse } from 'next/server';
import { SquareClient, SquareEnvironment } from 'square';

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

    const { items }: { items: CartItem[] } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    const origin = req.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

    const lineItems = items.map((item) => {
      const unitAmount = parsePriceToCents(item.price);
      const productName = item.sizes ? `${item.name} (${item.sizes})` : item.name;

      return {
        name: productName,
        quantity: String(item.quantity),
        basePriceMoney: {
          amount: BigInt(unitAmount),
          currency: 'USD' as const,
        },
      };
    });

    const result = await client.checkout.paymentLinks.create({
      idempotencyKey: crypto.randomUUID(),
      order: {
        locationId,
        lineItems,
      },
      checkoutOptions: {
        redirectUrl: `${origin}/checkout/success`,
        askForShippingAddress: true,
      },
    });

    const checkoutUrl = result.paymentLink?.url;

    if (!checkoutUrl) {
      throw new Error('Square did not return a checkout URL.');
    }

    return NextResponse.json({ url: checkoutUrl });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    console.error('[Square Checkout]', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
