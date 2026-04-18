const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 10;

type Entry = { count: number; resetAt: number };

const buckets = new Map<string, Entry>();

function prune(now: number) {
  for (const [ip, e] of buckets) {
    if (now > e.resetAt) buckets.delete(ip);
  }
}

/** Returns 'ok' | 'rate_limited'. Best-effort per-process (serverless: per instance). */
export function motologAuthRateLimit(ip: string): 'ok' | 'rate_limited' {
  const now = Date.now();
  prune(now);
  const e = buckets.get(ip);
  if (!e || now > e.resetAt) {
    buckets.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return 'ok';
  }
  if (e.count >= MAX_ATTEMPTS) return 'rate_limited';
  e.count += 1;
  return 'ok';
}

export function getClientIp(req: Request): string {
  const xf = req.headers.get('x-forwarded-for');
  if (xf) return xf.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') || 'unknown';
}
