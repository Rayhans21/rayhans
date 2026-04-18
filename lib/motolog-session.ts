import { createHash, createHmac, timingSafeEqual } from 'crypto';

const COOKIE_NAME = 'motolog_session';

export function getMotologSigningSecret(): string | null {
  const explicit = process.env.MOTOLOG_SESSION_SECRET;
  if (explicit) return explicit;
  const pw = process.env.MOTOLOG_PASSWORD;
  if (pw) return createHmac('sha256', pw).update('motolog-session-v1').digest('hex');
  return null;
}

function signPayload(payload: { exp: number; v: number }, secret: string): string {
  const payloadB64 = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const sig = createHmac('sha256', secret).update(payloadB64).digest('base64url');
  return `${payloadB64}.${sig}`;
}

export function verifyMotologSessionToken(token: string, secret: string): boolean {
  const parts = token.split('.');
  if (parts.length !== 2) return false;
  const [payloadB64, sig] = parts;
  if (!payloadB64 || !sig) return false;
  const expected = createHmac('sha256', secret).update(payloadB64).digest('base64url');
  try {
    if (!timingSafeEqual(Buffer.from(sig, 'utf8'), Buffer.from(expected, 'utf8'))) return false;
  } catch {
    return false;
  }
  let payload: { exp?: number; v?: number };
  try {
    payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'));
  } catch {
    return false;
  }
  if (payload.v !== 1 || typeof payload.exp !== 'number') return false;
  if (payload.exp <= Date.now()) return false;
  return true;
}

export function createMotologSessionToken(maxAgeSeconds: number, secret: string): string {
  const exp = Date.now() + maxAgeSeconds * 1000;
  return signPayload({ exp, v: 1 }, secret);
}

export function getMotologSessionCookieName(): string {
  return COOKIE_NAME;
}

export function getMotologSessionCookieOptions(maxAgeSeconds: number) {
  return {
    name: COOKIE_NAME,
    httpOnly: true as const,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: maxAgeSeconds,
  };
}

/** Constant-time compare via SHA-256 (avoids length leak from raw buffers). */
export function motologPasswordMatches(input: string | undefined, expected: string | undefined): boolean {
  if (typeof input !== 'string' || typeof expected !== 'string') return false;
  const ah = createHash('sha256').update(input, 'utf8').digest();
  const bh = createHash('sha256').update(expected, 'utf8').digest();
  return timingSafeEqual(ah, bh);
}
