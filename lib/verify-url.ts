/** Base URL untuk link di QR (tanpa trailing slash). */
export function getVerifyPublicBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_VERIFY_BASE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, '');
  if (typeof window !== 'undefined') return window.location.origin;
  return 'https://rayhans.vercel.app';
}

export function getVerifyPublicUrl(suratId: string): string {
  return `${getVerifyPublicBaseUrl()}/verify/${suratId}`;
}
