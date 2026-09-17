import { NextResponse } from 'next/server';

import { sql } from '../../../../lib/db';
import { sendWhatsAppOtp } from '../../../../lib/whatsapp/client';
import {
  generateOtp,
  getOtpExpiry,
  hashOtp,
  OTP_RESEND_COOLDOWN_MS,
} from '../../../../lib/whatsapp/otp';
import { normalizeTurkishPhone } from '../../../../lib/whatsapp/phone';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { phone?: unknown };

    if (typeof body.phone !== 'string') {
      return NextResponse.json({ error: 'Geçerli bir telefon numarası girin.' }, { status: 400 });
    }

    const phone = normalizeTurkishPhone(body.phone);

    if (!phone) {
      return NextResponse.json({ error: 'Geçerli bir Türkiye cep telefonu numarası girin.' }, { status: 400 });
    }

    const recent = await sql`
      SELECT created_at
      FROM public.whatsapp_otp_codes
      WHERE phone = ${phone}
      ORDER BY created_at DESC
      LIMIT 1
    `;

    if (recent.length > 0) {
      const lastSentAt = new Date(String(recent[0].created_at)).getTime();
      const elapsed = Date.now() - lastSentAt;

      if (elapsed < OTP_RESEND_COOLDOWN_MS) {
        const retryAfter = Math.ceil((OTP_RESEND_COOLDOWN_MS - elapsed) / 1000);
        return NextResponse.json(
          { error: 'Yeni kod istemeden önce biraz bekleyin.', retryAfter },
          { status: 429 },
        );
      }
    }

    const code = generateOtp();
    const codeHash = hashOtp(phone, code);
    const expiresAt = getOtpExpiry();

    const inserted = await sql`
      INSERT INTO public.whatsapp_otp_codes (phone, code_hash, expires_at)
      VALUES (${phone}, ${codeHash}, ${expiresAt.toISOString()})
      RETURNING id
    `;

    const otpId = Number(inserted[0].id);
    const sendEnabled = process.env.WHATSAPP_OTP_SEND_ENABLED === 'true';

    if (sendEnabled) {
      try {
        await sendWhatsAppOtp(phone, code);
      } catch (error) {
        await sql`
          DELETE FROM public.whatsapp_otp_codes
          WHERE id = ${otpId}
        `;
        throw error;
      }
    }

    return NextResponse.json({
      ok: true,
      expiresIn: 300,
      delivery: sendEnabled ? 'whatsapp' : 'disabled',
    });
  } catch (error) {
    console.error('WhatsApp OTP request failed', error);
    return NextResponse.json({ error: 'Kod oluşturulamadı veya gönderilemedi.' }, { status: 500 });
  }
}
