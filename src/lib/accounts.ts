import { randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { env } from './env';

/**
 * Backend accounts. Articles live in git; this file only answers who may write
 * and what they are allowed to do.
 *
 * Passwords are hashed with scrypt rather than a SHA variant. A fast hash is
 * the wrong tool here precisely because it is fast: an attacker with the table
 * can try billions of guesses a second. scrypt is deliberately slow and
 * memory-hard, so the same hardware manages thousands.
 *
 * Everything goes through the service-role key from the server. The browser
 * never touches this table, which is why row level security is on and no
 * policy grants access to anyone else.
 */

const scrypt = promisify(scryptCb) as (
  password: string | Buffer,
  salt: string | Buffer,
  keylen: number,
  options: { N: number; r: number; p: number; maxmem?: number },
) => Promise<Buffer>;

// OWASP's floor for scrypt at the time of writing. N is the work factor: raise
// it and both the cost to verify and the cost to attack rise together.
const PARAMS = { N: 2 ** 15, r: 8, p: 1, maxmem: 64 * 1024 * 1024 };
const KEYLEN = 32;

export type Role = 'admin' | 'editor';

export interface Editor {
  id: string;
  email: string;
  display_name: string;
  role: Role;
  password_hash: string | null;
  disabled: boolean;
  invite_token: string | null;
  invite_expires_at: string | null;
}

function db(table: string) {
  const url = env('PUBLIC_SUPABASE_URL');
  const key = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !key) return null;

  const headers: Record<string, string> = {
    apikey: key,
    'content-type': 'application/json',
  };
  if (key.startsWith('eyJ')) headers.authorization = `Bearer ${key}`;

  return { rest: `${url}/rest/v1/${table}`, headers };
}

export function accountsConfigured() {
  return db('editors') !== null;
}

/* ---------------------------------------------------------------- passwords */

export async function hashPassword(plain: string) {
  const salt = randomBytes(16);
  const key = await scrypt(plain.normalize('NFKC'), salt, KEYLEN, PARAMS);
  return `scrypt$${PARAMS.N}$${PARAMS.r}$${PARAMS.p}$${salt.toString('base64')}$${key.toString('base64')}`;
}

export async function verifyPassword(plain: string, stored: string | null) {
  if (!stored) return false;

  const [scheme, N, r, p, saltB64, keyB64] = stored.split('$');
  if (scheme !== 'scrypt' || !saltB64 || !keyB64) return false;

  // The stored parameters are used rather than the current ones, so raising
  // PARAMS later does not lock out everyone hashed under the old settings.
  const expected = Buffer.from(keyB64, 'base64');
  let actual: Buffer;
  try {
    actual = await scrypt(plain.normalize('NFKC'), Buffer.from(saltB64, 'base64'), expected.length, {
      N: Number(N),
      r: Number(r),
      p: Number(p),
      maxmem: 128 * 1024 * 1024,
    });
  } catch {
    return false;
  }

  // Length is checked first because timingSafeEqual throws on a mismatch, and
  // a thrown error would itself be a timing signal.
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/** Password rules kept short on purpose: length beats forced punctuation. */
export function passwordProblem(plain: string): string | null {
  if (plain.length < 12) return 'Use at least 12 characters. Length matters more than symbols.';
  if (plain.length > 200) return 'That is longer than 200 characters.';
  if (/^\s|\s$/.test(plain)) return 'Remove the leading or trailing space.';
  return null;
}

/* ------------------------------------------------------------------ lookups */

export async function findEditorByEmail(email: string): Promise<Editor | null> {
  const c = db('editors');
  if (!c) return null;

  const res = await fetch(
    `${c.rest}?email=eq.${encodeURIComponent(email.trim().toLowerCase())}&limit=1`,
    { headers: c.headers },
  );
  if (!res.ok) return null;

  const rows = (await res.json()) as Editor[];
  return rows[0] ?? null;
}

export async function findEditorById(id: string): Promise<Editor | null> {
  const c = db('editors');
  if (!c) return null;

  const res = await fetch(`${c.rest}?id=eq.${encodeURIComponent(id)}&limit=1`, { headers: c.headers });
  if (!res.ok) return null;

  const rows = (await res.json()) as Editor[];
  return rows[0] ?? null;
}

export async function listEditors(): Promise<Editor[]> {
  const c = db('editors');
  if (!c) return [];

  const res = await fetch(`${c.rest}?select=*&order=created_at.asc`, { headers: c.headers });
  return res.ok ? ((await res.json()) as Editor[]) : [];
}

export async function countEditors() {
  const c = db('editors');
  if (!c) return 0;

  const res = await fetch(`${c.rest}?select=id`, {
    headers: { ...c.headers, prefer: 'count=exact', range: '0-0' },
  });
  const range = res.headers.get('content-range') ?? '';
  return Number(range.split('/')[1] ?? 0);
}

/* ------------------------------------------------------------------ writing */

export async function createEditor(opts: {
  email: string;
  displayName: string;
  role: Role;
}): Promise<{ editor: Editor; inviteToken: string } | { error: string }> {
  const c = db('editors');
  if (!c) return { error: 'Accounts are not configured on this deployment.' };

  const email = opts.email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return { error: 'That email address does not look valid.' };
  if (await findEditorByEmail(email)) return { error: 'An account already exists for that address.' };

  // The invite is what the new editor uses to set their own password. Nobody
  // ever sends a password to anyone, which is the point.
  const inviteToken = randomBytes(32).toString('base64url');
  const expires = new Date(Date.now() + 7 * 24 * 3_600_000).toISOString();

  const res = await fetch(c.rest, {
    method: 'POST',
    headers: { ...c.headers, prefer: 'return=representation' },
    body: JSON.stringify({
      email,
      display_name: opts.displayName.trim(),
      role: opts.role,
      invite_token: inviteToken,
      invite_expires_at: expires,
    }),
  });

  if (!res.ok) return { error: `Could not create the account (${res.status}).` };

  const rows = (await res.json()) as Editor[];
  return { editor: rows[0], inviteToken };
}

export async function setPasswordFromInvite(token: string, plain: string) {
  const c = db('editors');
  if (!c) return { ok: false as const, error: 'Accounts are not configured.' };

  const problem = passwordProblem(plain);
  if (problem) return { ok: false as const, error: problem };

  const found = await fetch(`${c.rest}?invite_token=eq.${encodeURIComponent(token)}&limit=1`, {
    headers: c.headers,
  });
  const rows = found.ok ? ((await found.json()) as Editor[]) : [];
  const editor = rows[0];

  if (!editor) return { ok: false as const, error: 'That invitation link is not valid.' };
  if (editor.invite_expires_at && new Date(editor.invite_expires_at) < new Date())
    return { ok: false as const, error: 'That invitation has expired. Ask for a new one.' };

  const res = await fetch(`${c.rest}?id=eq.${editor.id}`, {
    method: 'PATCH',
    headers: c.headers,
    body: JSON.stringify({
      password_hash: await hashPassword(plain),
      invite_token: null,
      invite_expires_at: null,
    }),
  });

  return res.ok
    ? { ok: true as const, editor }
    : { ok: false as const, error: `Could not save the password (${res.status}).` };
}

export async function setRole(id: string, role: Role) {
  const c = db('editors');
  if (!c) return false;
  const res = await fetch(`${c.rest}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: c.headers,
    body: JSON.stringify({ role }),
  });
  return res.ok;
}

export async function setDisabled(id: string, disabled: boolean) {
  const c = db('editors');
  if (!c) return false;
  const res = await fetch(`${c.rest}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: c.headers,
    body: JSON.stringify({ disabled }),
  });
  return res.ok;
}

export async function touchLogin(id: string) {
  const c = db('editors');
  if (!c) return;
  await fetch(`${c.rest}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: c.headers,
    body: JSON.stringify({ last_login_at: new Date().toISOString() }),
  }).catch(() => {});
}

/* ------------------------------------------------------------- rate limiting */

export async function recordAttempt(email: string, successful: boolean, ipHash: string | null) {
  const c = db('login_attempts');
  if (!c) return;
  await fetch(c.rest, {
    method: 'POST',
    headers: c.headers,
    body: JSON.stringify({ email: email.trim().toLowerCase(), successful, ip_hash: ipHash }),
  }).catch(() => {});
}

/**
 * Ten failures in fifteen minutes locks the address out for the rest of that
 * window. Counted per address rather than per IP: an attacker rotates addresses
 * far less easily than they rotate IPs, and locking by IP would let one bad
 * network shut out a legitimate editor sharing it.
 */
export async function tooManyFailures(email: string) {
  const c = db('login_attempts');
  if (!c) return false;

  const since = new Date(Date.now() - 15 * 60_000).toISOString();
  const res = await fetch(
    `${c.rest}?email=eq.${encodeURIComponent(email.trim().toLowerCase())}&successful=eq.false&at=gte.${since}&select=id`,
    { headers: { ...c.headers, prefer: 'count=exact', range: '0-0' } },
  );

  const range = res.headers.get('content-range') ?? '';
  return Number(range.split('/')[1] ?? 0) >= 10;
}
