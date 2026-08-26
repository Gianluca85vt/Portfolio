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

/* ------------------------------------------------------------------------- */
/* Backend accounts                                                          */
/*                                                                           */
/* The moderation sign-in above is one shared password and no identity. The   */
/* CMS needs to know who is writing and what they may do, so its cookie       */
/* carries the account id and role.                                          */
/*                                                                           */
/* Same signing secret, but every CMS payload is prefixed with "cms|" before  */
/* signing. Without that separation a moderation cookie and a CMS cookie      */
/* would be interchangeable, and a moderator would silently become an admin.  */
/* ------------------------------------------------------------------------- */

const CMS_COOKIE = 'cms_session';
const CMS_LIFETIME_HOURS = 12;

/**
 * The site answers on both gianlucascattarella.it and www, with the apex
 * redirecting to www by a 308. A cookie with no Domain is bound to whichever
 * host happened to answer, so a session started on one host is invisible to a
 * page running on the other — which looks exactly like a login that succeeds
 * and then does nothing.
 *
 * Naming the registrable domain makes one cookie valid for both. Derived from
 * the request rather than hard-coded, so localhost and preview deployments,
 * where a Domain would be wrong, simply do not get one.
 */
function cookieDomain(host: string | null) {
  if (!host) return '';
  const name = host.split(':')[0];
  return name === 'gianlucascattarella.it' || name.endsWith('.gianlucascattarella.it')
    ? ' Domain=gianlucascattarella.it;'
    : '';
}

export interface CmsSession {
  id: string;
  role: 'admin' | 'editor';
}

export async function createCmsCookie(session: CmsSession, secure: boolean, host?: string | null) {
  const expires = Date.now() + CMS_LIFETIME_HOURS * 3_600_000;
  const payload = `${session.id}.${session.role}.${expires}`;
  const sig = await sign(`cms|${payload}`);
  if (!sig) return null;

  return `${CMS_COOKIE}=${payload}.${sig}; Path=/;${cookieDomain(host ?? null)} HttpOnly;${secure ? ' Secure;' : ''} SameSite=Lax; Max-Age=${CMS_LIFETIME_HOURS * 3600}`;
}

export function clearedCmsCookie(secure: boolean, host?: string | null) {
  return `${CMS_COOKIE}=; Path=/;${cookieDomain(host ?? null)} HttpOnly;${secure ? ' Secure;' : ''} SameSite=Lax; Max-Age=0`;
}

/**
 * The host-only twin, expired.
 *
 * Sent alongside a fresh sign-in so anyone carrying a cookie from before the
 * Domain attribute existed is not left holding two of them until the older one
 * times out on its own.
 */
export function clearedHostOnlyCmsCookie(secure: boolean) {
  return `${CMS_COOKIE}=; Path=/; HttpOnly;${secure ? ' Secure;' : ''} SameSite=Lax; Max-Age=0`;
}

/**
 * Reads the session, trying every cookie of that name rather than the first.
 *
 * A browser keeps cookies that share a name but differ in Domain as separate
 * cookies and sends them together. Adding Domain to this one therefore left
 * people holding two: the host-only cookie from before the change, and the new
 * one. Reading only the first meant the stale cookie won and the sign-in
 * appeared to do nothing — while the server could plainly see a cms_session in
 * the request, which is what made it look like the cookie was being lost.
 *
 * Only one can be valid, since each is signed, so trying all of them is both
 * correct and cheap.
 */
export async function readCmsSession(request: Request): Promise<CmsSession | null> {
  const raw = request.headers.get('cookie') ?? '';
  // Split rather than match. A regex built inside a template literal needs its
  // backslashes doubled, and losing one turns \s into a literal "s" — a change
  // that still compiles, still matches the first cookie, and silently stops
  // matching any of the others. Splitting has nothing to get wrong.
  const values = raw
    .split(';')
    .map((part) => part.trim())
    .filter((part) => part.startsWith(`${CMS_COOKIE}=`))
    .map((part) => part.slice(CMS_COOKIE.length + 1));

  for (const value of values) {
    const parts = value.split('.');
    if (parts.length !== 4) continue;

    const [id, role, expires, sig] = parts;
    if (role !== 'admin' && role !== 'editor') continue;
    if (!Number(expires) || Number(expires) < Date.now()) continue;

    const expected = await sign(`cms|${id}.${role}.${expires}`);
    if (expected && safeEqual(expected, sig)) return { id, role };
  }

  return null;
}
