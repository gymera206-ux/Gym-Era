import crypto from 'crypto';

const PIXEL_ID = process.env.META_PIXEL_ID ?? '';
const ACCESS_TOKEN = process.env.META_CONVERSIONS_API_TOKEN ?? '';
const API_VERSION = 'v21.0';

export const hasMetaConversions = Boolean(PIXEL_ID && ACCESS_TOKEN);

function sha256(value: string): string {
  return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex');
}

type PurchaseEvent = {
  email: string;
  amountUsd: number;
  currency?: string;
  orderId?: string;
  userAgent?: string;
  sourceUrl?: string;
  clientIp?: string;
};

export async function sendPurchaseEvent(data: PurchaseEvent): Promise<boolean> {
  if (!hasMetaConversions) {
    console.warn('[Meta CAPI] Not configured — skipping event');
    return false;
  }

  const eventTime = Math.floor(Date.now() / 1000);

  const payload = {
    data: [
      {
        event_name: 'Purchase',
        event_time: eventTime,
        event_id: data.orderId ?? `purchase_${eventTime}`,
        event_source_url: data.sourceUrl ?? 'https://gymera.com/shop',
        action_source: 'website',
        user_data: {
          em: [sha256(data.email)],
          client_ip_address: data.clientIp ?? undefined,
          client_user_agent: data.userAgent ?? undefined,
        },
        custom_data: {
          currency: data.currency ?? 'USD',
          value: data.amountUsd,
          content_type: 'product',
        },
      },
    ],
  };

  try {
    const url = `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[Meta CAPI] Error:', res.status, err);
      return false;
    }

    const result = await res.json();
    console.log('[Meta CAPI] Purchase event sent:', result);
    return true;
  } catch (err) {
    console.error('[Meta CAPI] Failed to send event:', err);
    return false;
  }
}
