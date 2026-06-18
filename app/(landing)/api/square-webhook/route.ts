import { NextRequest, NextResponse } from 'next/server';
import { sendPurchaseEvent, hasMetaConversions } from '@/lib/meta-conversions';

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY!;
const RESET_BUYERS_LIST_ID = 'XG3Ptq';
const SQUARE_ACCESS_TOKEN = process.env.SQUARE_ACCESS_TOKEN!;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const eventType = body?.type;

    // Only handle payment events
    if (eventType !== 'payment.completed' && eventType !== 'payment.updated') {
      return NextResponse.json({ received: true });
    }

    const payment = body?.data?.object?.payment;
    if (!payment) {
      return NextResponse.json({ received: true });
    }

    // For payment.updated, only proceed if status is COMPLETED
    if (payment.status && payment.status !== 'COMPLETED') {
      return NextResponse.json({ received: true });
    }

    // Get buyer email directly from payment
    let buyerEmail = payment.buyer_email_address;

    // If no email on payment, fetch the order
    if (!buyerEmail && payment.order_id) {
      const orderRes = await fetch(
        `https://connect.squareup.com/v2/orders/${payment.order_id}`,
        {
          headers: {
            Authorization: `Bearer ${SQUARE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (orderRes.ok) {
        const orderData = await orderRes.json();
        buyerEmail =
          orderData.order?.fulfillments?.[0]?.shipment_details?.recipient?.email_address;
      }
    }

    if (!buyerEmail) {
      console.error('[Square Webhook] No buyer email found');
      return NextResponse.json({ received: true });
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

    // 2. Add profile to Reset Buyers list
    const listRes = await fetch(
      `https://a.klaviyo.com/api/lists/${RESET_BUYERS_LIST_ID}/relationships/profiles/`,
      {
        method: 'POST',
        headers: {
          Authorization: `Klaviyo-API-Key ${KLAVIYO_API_KEY}`,
          'Content-Type': 'application/json',
          revision: '2024-10-15',
        },
        body: JSON.stringify({
          data: [{ type: 'profile', id: profileId }],
        }),
      },
    );

    if (!listRes.ok) {
      const err = await listRes.text();
      console.error('[Square Webhook] Failed to add to list:', err);
    }

    console.log(`[Square Webhook] Added ${buyerEmail} to Reset Buyers list`);

    // 3. Fire Meta Conversions API Purchase event
    if (hasMetaConversions) {
      const amountCents = payment.amount_money?.amount ?? payment.total_money?.amount ?? 0;
      const amountUsd = Number(amountCents) / 100;

      await sendPurchaseEvent({
        email: buyerEmail,
        amountUsd,
        orderId: payment.order_id,
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('[Square Webhook] Error:', err);
    return NextResponse.json({ received: true });
  }
}
