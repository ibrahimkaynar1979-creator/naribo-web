import { randomBytes, randomUUID } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';
import { sql } from '../../../../lib/db';
import { buildPasswordResetEmail } from '../../../../lib/email/password-reset-template';

const GENERIC_RESPONSE = { ok: true };

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = String(body.email || '').trim().toLowerCase();

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ error: 'Geçerli bir e-posta adresi yazın.' }, { status: 400 });
    }

    const users = await sql`
      SELECT id, name, email
      FROM neon_auth."user"
      WHERE lower(email) = ${email}
      LIMIT 1
    `;

    const user = users[0] as { id: string; name: string | null; email: string } | undefined;

    // Kullanıcı var/yok bilgisini dışarı sızdırmamak için her iki durumda da aynı yanıtı döndür.
    if (!user) return NextResponse.json(GENERIC_RESPONSE);

    // Aynı hesap için kısa sürede peş peşe e-posta üretimini sınırlıyoruz.
    const recent = await sql`
      SELECT id
      FROM neon_auth.verification
      WHERE value = ${user.id}
        AND identifier LIKE 'reset-password:%'
        AND "createdAt" > now() - interval '60 seconds'
      LIMIT 1
    `;

    if (recent.length) return NextResponse.json(GENERIC_RESPONSE);

    const token = randomBytes(18).toString('base64url');
    const verificationId = randomUUID();

    await sql`
      INSERT INTO neon_auth.verification
        (id, identifier, value, "expiresAt", "createdAt", "updatedAt")
      VALUES
        (${verificationId}, ${`reset-password:${token}`}, ${user.id}, now() + interval '1 hour', now(), now())
    `;

    const authBaseUrl = process.env.NEON_AUTH_BASE_URL;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!authBaseUrl || !resendApiKey) {
      console.error('Password reset email configuration is incomplete');
      return NextResponse.json({ error: 'Şifre oluşturma e-postası şu anda gönderilemiyor.' }, { status: 500 });
    }

    const callbackUrl = 'https://www.paneltakip.com/auth/reset-password';
    const resetUrl = `${authBaseUrl.replace(/\/$/, '')}/reset-password/${token}?callbackURL=${encodeURIComponent(callbackUrl)}`;
    const message = buildPasswordResetEmail({
      resetUrl,
      userName: user.name || 'PanelTakip Yöneticisi',
    });

    const sendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'PanelTakip <hesap@paneltakip.com>',
        to: [user.email],
        subject: message.subject,
        html: message.html,
        text: message.text,
      }),
    });

    if (!sendResponse.ok) {
      console.error('Resend password reset failed', await sendResponse.text());
      return NextResponse.json({ error: 'Şifre oluşturma e-postası gönderilemedi.' }, { status: 502 });
    }

    return NextResponse.json(GENERIC_RESPONSE);
  } catch (error) {
    console.error('Password reset request failed', error);
    return NextResponse.json({ error: 'Şifre oluşturma bağlantısı gönderilemedi.' }, { status: 500 });
  }
}
