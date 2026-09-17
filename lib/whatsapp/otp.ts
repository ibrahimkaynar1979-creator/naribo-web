import { createHmac, randomInt, timingSafeEqual } from 'node:crypto';

export const OTP_TTL_MS = 5 * 60 * 1000;
export const OTP_RESEND_COOLDOWN_MS = 60 * 1000;
export const OTP_MAX_ATTEMPTS = 5;

function getOtpSecret(): string {
  const secret = process.env.WHATSAPP_OTP_SECRET;

  if (!secret) {
    throw new Error('WHATSAPP_OTP_SECRET is not configured');
  }

  return secret;
}

export function generateOtp(): string {
  return randomInt(0, 1_000_000).toString().padStart(6, '0');
}

export function hashOtp(phone: string, code: string): string {
  return createHmac('sha256', getOtpSecret())
    .update(`${phone}:${code}`)
    .digest('hex');
}

export function verifyOtpHash(
  phone: string,
  code: string,
  expectedHash: string,
): boolean {
  const actual = Buffer.from(hashOtp(phone, code), 'hex');
  const expected = Buffer.from(expectedHash, 'hex');

  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

export function getOtpExpiry(now = Date.now()): Date {
  return new Date(now + OTP_TTL_MS);
}
