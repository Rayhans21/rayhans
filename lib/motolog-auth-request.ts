import { cookies } from 'next/headers';
import { getMotologSessionCookieName, getMotologSigningSecret, verifyMotologSessionToken } from '@/lib/motolog-session';

const SESSION_MAX_AGE_SEC = 60 * 60 * 24 * 14; // 14 days

export { SESSION_MAX_AGE_SEC };

export async function isMotologRequestAuthenticated(): Promise<boolean> {
  const secret = getMotologSigningSecret();
  if (!secret) return false;
  const cookieStore = await cookies();
  const token = cookieStore.get(getMotologSessionCookieName())?.value;
  if (!token) return false;
  return verifyMotologSessionToken(token, secret);
}
