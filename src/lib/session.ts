import { env } from './env';
import { safeEqual } from './notify';

/**
 * A single-user sign-in for the moderation page, using COMMENT_ADMIN_SECRET as
 * the password. No accounts, no user table — there is exactly one person who
 * moderates this site.
 *
 * The cookie never carries the secret. It holds an expiry timestamp and an HMAC
 * of it, so a stolen cookie cannot be turned back into the password, and one
 * that has been edited to extend its own life fails the signature check.
 */

const COOKIE = 'mod_session';
const LIFETIME_HOURS = 12;

async function sign(value: string) {
  const secret = env('COMMENT_ADMIN_SECRET');
  if (!secret) return null;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/** Checks a submitted password against the configured secret. */
export async function passwordMatches(submitted: string) {
  const secret = env('COMMENT_ADMIN_SECRET');
  if (!secret || !submitted) return false;
  // Compare hashes rather than the raw strings: safeEqual bails out early when
  // lengths differ, which would otherwise leak the secret's length.
  const [a, b] = await Promise.all([sign(submitted), sign(secret)]);
  return Boolean(a && b && safeEqual(a, b));
}

/**
 * `secure` is left off over plain http, because a Secure cookie is discarded by
 * the browser on an insecure origin — which would make the page impossible to
 * use on localhost while changing nothing in production, where the site is
 * https and the flag is set.
 */
export async function createSessionCookie(secure: boolean) {
  const expires = Date.now() + LIFETIME_HOURS * 3_600_000;
  const sig = await sign(String(expires));
  if (!sig) return null;

  // httpOnly keeps it away from any script on the page; SameSite=Lax means a
  // form on another site cannot ride along on it.
  return `${COOKIE}=${expires}.${sig}; Path=/; HttpOnly;${secure ? ' Secure;' : ''} SameSite=Lax; Max-Age=${LIFETIME_HOURS * 3600}`;
}

export function clearedSessionCookie(secure: boolean) {
  return `${COOKIE}=; Path=/; HttpOnly;${secure ? ' Secure;' : ''} SameSite=Lax; Max-Age=0`;
}

export async function hasValidSession(request: Request) {
  const raw = request.headers.get('cookie') ?? '';
  const match = new RegExp(`(?:^|;\\s*)${COOKIE}=([^;]+)`).exec(raw);
  if (!match) return false;

  const [expires, sig] = match[1].split('.');
  if (!expires || !sig) return false;
  if (!Number(expires) || Number(expires) < Date.now()) return false;

  const expected = await sign(expires);
  return Boolean(expected && safeEqual(expected, sig));
}
