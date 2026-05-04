import { NextRequest, NextResponse } from 'next/server';

const KLAVIYO_API_KEY = process.env.KLAVIYO_API_KEY!;
const KLAVIYO_LIST_ID = process.env.KLAVIYO_LIST_ID!;

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    // 1. Create or update the profile
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
          attributes: { email },
        },
      }),
    });

    let profileId: string;

    if (profileRes.status === 201) {
      const created = await profileRes.json();
      profileId = created.data.id;
    } else if (profileRes.status === 409) {
      // Profile already exists — get the ID from the duplicate error
      const conflict = await profileRes.json();
      profileId = conflict.errors?.[0]?.meta?.duplicate_profile_id;
      if (!profileId) {
        return NextResponse.json({ error: 'Could not resolve profile' }, { status: 500 });
      }
    } else {
      const err = await profileRes.text();
      console.error('Klaviyo profile error:', profileRes.status, err);
      return NextResponse.json({ error: 'Failed to create profile' }, { status: 500 });
    }

    // 2. Subscribe the profile to the list
    const subRes = await fetch(
      `https://a.klaviyo.com/api/lists/${KLAVIYO_LIST_ID}/relationships/profiles/`,
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

    if (!subRes.ok) {
      const err = await subRes.text();
      console.error('Klaviyo subscribe error:', subRes.status, err);
      return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Klaviyo route error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
