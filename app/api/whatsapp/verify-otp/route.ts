import { NextResponse } from 'next/server';

import { sql } from '../../../../lib/db';
import { OTP_MAX_ATTEMPTS, verifyOtpHash } from '../../../../lib/whatsapp/otp';
import { normalizeTurkishPhone } from '../../../../lib/whatsapp/phone';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { phone?: unknown; code?: unknown };

    if (typeof body.phone !== 'string' || typeof body.code !== 'string') {
      return NextResponse.json({ error: 'Telefon ve doğrulama kodu gerekli.' }, { status: 400 });
    }

    const phone = normalizeTurkishPhone(body.phone);
    const code = body.code.trim();

    if (!phone || !/^\d{6}$/.test(code)) {
      return NextResponse.json({ error: 'Telefon veya doğrulama kodu geçersiz.' }, { status: 400 });
    }

    const rows = await sql`
      SELECT id, code_hash, expires_at, attempts, verified_at
      FROM public.whatsapp_otp_codes
      WHERE phone = ${phone}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Kod geçersiz veya süresi dolmuş.' }, { status: 400 });
    }

    const otp = rows[0];
    const id = Number(otp.id);
    const attempts = Number(otp.attempts);

    if (otp.verified_at || new Date(String(otp.expires_at)).getTime() <= Date.now()) {
      return NextResponse.json({ error: 'Kod geçersiz veya süresi dolmuş.' }, { status: 400 });
    }

    if (attempts >= OTP_MAX_ATTEMPTS) {
      return NextResponse.json({ error: 'Deneme sınırı aşıldı. Yeni kod isteyin.' }, { status: 429 });
    }

    if (!verifyOtpHash(phone, code, String(otp.code_hash))) {
      await sql`
        UPDATE public.whatsapp_otp_codes
        SET attempts = attempts + 1
        WHERE id = ${id}
      `;

      const remainingAttempts = Math.max(OTP_MAX_ATTEMPTS - attempts - 1, 0);
      return NextResponse.json(
        { error: 'Doğrulama kodu hatalı.', remainingAttempts },
        { status: 400 },
      );
    }

    const verified = await sql`
      UPDATE public.whatsapp_otp_codes
      SET verified_at = NOW()
      WHERE id = ${id}
        AND verified_at IS NULL
        AND expires_at > NOW()
        AND attempts < ${OTP_MAX_ATTEMPTS}
      RETURNING id
    `;

    if (verified.length === 0) {
      return NextResponse.json({ error: 'Kod geçersiz veya süresi dolmuş.' }, { status: 400 });
    }

    return NextResponse.json({ ok: true, phone });
  } catch (error) {
    console.error('WhatsApp OTP verification failed', error);
    return NextResponse.json({ error: 'Kod doğrulanamadı.' }, { status: 500 });
  }
}
