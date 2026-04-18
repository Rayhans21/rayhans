import { NextResponse } from 'next/server';
import { getClientIp, motologAuthRateLimit } from '@/lib/motolog-rate-limit';
import {
  createMotologSessionToken,
  getMotologSessionCookieName,
  getMotologSessionCookieOptions,
  getMotologSigningSecret,
  motologPasswordMatches,
} from '@/lib/motolog-session';
import { isMotologRequestAuthenticated, SESSION_MAX_AGE_SEC } from '@/lib/motolog-auth-request';

const DEBUG_INGEST = 'http://127.0.0.1:7580/ingest/8d3cd742-b66e-401a-9786-d15ae127c80c';

function debugLog(hypothesisId: string, message: string, data: Record<string, unknown>) {
  // #region agent log
  fetch(DEBUG_INGEST, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': 'a09896' },
    body: JSON.stringify({
      sessionId: 'a09896',
      hypothesisId,
      location: 'auth/route.ts',
      message,
      data,
      timestamp: Date.now(),
    }),
  }).catch(() => {});
  // #endregion
}

/** Session probe — no secrets in response */
export async function GET() {
  const configured = !!process.env.MOTOLOG_PASSWORD && !!getMotologSigningSecret();
  const authenticated = await isMotologRequestAuthenticated();
  // #region agent log
  debugLog('H_session', 'auth_get', { configured, authenticated });
  // #endregion
  return NextResponse.json({ authenticated, configured });
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  if (motologAuthRateLimit(ip) === 'rate_limited') {
    // #region agent log
    debugLog('H_rl', 'auth_rate_limited', { ipKind: ip === 'unknown' ? 'unknown' : 'set' });
    // #endregion
    return NextResponse.json({ success: false, error: 'Too many attempts' }, { status: 429 });
  }

  const expectedPw = process.env.MOTOLOG_PASSWORD;
  const secret = getMotologSigningSecret();

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    // #region agent log
    debugLog('H_json', 'auth_json_invalid', {});
    // #endregion
    return NextResponse.json({ success: false, error: 'Invalid body' }, { status: 400 });
  }

  const password = body?.password;

  // #region agent log
  debugLog('H_env', 'auth_post_branch', {
    hasExpectedPw: typeof expectedPw === 'string' && expectedPw.length > 0,
    hasSecret: !!secret,
    passwordType: password === undefined ? 'undefined' : typeof password,
  });
  // #endregion

  if (!expectedPw || expectedPw.length === 0 || !secret) {
    return NextResponse.json({ success: false, error: 'Not configured' }, { status: 503 });
  }

  if (typeof password !== 'string' || password.length === 0) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!motologPasswordMatches(password, expectedPw)) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  const token = createMotologSessionToken(SESSION_MAX_AGE_SEC, secret);
  const res = NextResponse.json({ success: true });
  const opts = getMotologSessionCookieOptions(SESSION_MAX_AGE_SEC);
  res.cookies.set(opts.name, token, {
    httpOnly: opts.httpOnly,
    secure: opts.secure,
    sameSite: opts.sameSite,
    path: opts.path,
    maxAge: opts.maxAge,
  });
  // #region agent log
  debugLog('H_ok', 'auth_login_ok', { setCookie: true });
  // #endregion
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  const name = getMotologSessionCookieName();
  res.cookies.set(name, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
  return res;
}
