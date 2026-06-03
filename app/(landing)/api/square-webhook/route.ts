import { NextRequest, NextResponse } from 'next/server';

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY!;
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN!;
const SQUARE_WEBHOOK_SIGNATURE_KEY = process.env.SQUARE_WEBHOOK_SIGNATURE_KEY;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = body?.type;

    // Only handle completed payments
    if (eventType !== 'payment.completed') {
      return NextResponse.json({ received: true });
    }

    const payment = body?.data?.object?.payment;
    if (!payment) {
      return NextResponse.json({ received: true });
    }

    const orderId = payment.order_id;
    if (!orderId) {
      console.error('[Square Webhook] No order_id on payment');
      return NextResponse.json({ received: true });
    }

    // Fetch the order to get the buyer's email and line items
    const orderRes = await fetch(
      `https://connect.squareup.com/v2/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!orderRes.ok) {
      console.error('[Square Webhook] Failed to fetch order:', orderRes.status);
      return NextResponse.json({ received: true });
    }

    const orderData = await orderRes.json();
    const order = orderData.order;

    // Get buyer email from the order
    const buyerEmail =
      payment.buyer_email_address ??
      order?.fulfillments?.[0]?.shipment_details?.recipient?.email_address ??
      null;

    if (!buyerEmail) {
      console.error('[Square Webhook] No buyer email found on order', orderId);
      return NextResponse.json({ received: true });
    }

    // Determine which product was purchased based on amount
    const amountCents = Number(payment.amount_money?.amount ?? 0);
    let tag: string;

    if (amountCents <= 2000) {
      tag = 'reset-17-purchased';
    } else {
      tag = 'reset-47-purchased';
    }

    // 1. Create or get profile in Klaviyo
    const profileRes = await fetch('https://a.klaviyo.com/api/profiles/', {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        revision: '2024-10-15',
      },
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: { email: buyerEmail },
        },
      }),
    });

    let profileId: string;

    if (profileRes.status === 201) {
      const created = await profileRes.json();
      profileId = created.data.id;
    } else if (profileRes.status === 409) {
      const conflict = await profileRes.json();
      profileId = conflict.errors?.[0]?.meta?.duplicate_profile_id;
      if (!profileId) {
        console.error('[Square Webhook] Could not resolve Klaviyo profile');
        return NextResponse.json({ received: true });
      }
    } else {
      console.error('[Square Webhook] Klaviyo profile error:', profileRes.status);
      return NextResponse.json({ received: true });
    }

    // 2. Tag the profile so the Klaviyo flow triggers
    // First, create the tag if it doesn't exist (Klaviyo will return it or 409)
    const tagRes = await fetch('https://a.klaviyo.com/api/tags/', {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        revision: '2024-10-15',
      },
      body: JSON.stringify({
        data: {
          type: 'tag',
          attributes: { name: tag },
        },
      }),
    });

    let tagId: string;

    if (tagRes.status === 201) {
      const created = await tagRes.json();
      tagId = created.data.id;
    } else {
      // Tag likely already exists, fetch it
      const listRes = await fetch(
        `https://a.klaviyo.com/api/tags/?filter=equals(name,"${tag}")`,
        {
          headers: {
            Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
            'Content-Type': 'application/json',
            revision: '2024-10-15',
          },
        },
      );
      const listData = await listRes.json();
      tagId = listData.data?.[0]?.id;

      if (!tagId) {
        console.error('[Square Webhook] Could not create or find tag:', tag);
        return NextResponse.json({ received: true });
      }
    }

    // 3. Assign the tag to the profile
    await fetch(`https://a.klaviyo.com/api/tags/${tagId}/relationships/profiles/`, {
      method: 'POST',
      headers: {
        Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
        'Content-Type': 'application/json',
        revision: '2024-10-15',
      },
      body: JSON.stringify({
        data: [{ type: 'profile', id: profileId }],
      }),
    });

    console.log(`[Square Webhook] Tagged ${buyerEmail} with ${tag}`);

    return NextResponse.json({ received: true, tagged: tag });
  } catch (err) {
    console.error('[Square Webhook] Error:', err);
    return NextResponse.json({ received: true });
  }
}
