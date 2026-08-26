import type { APIRoute } from 'astro';
import { env } from '../../../lib/env';
import { passwordMatches } from '../../../lib/session';
import { createCmsCookie, clearedCmsCookie } from '../../../lib/session';
import {
  accountsConfigured,
  countEditors,
  createEditor,
  findEditorByEmail,
  passwordProblem,
  recordAttempt,
  setPasswordFromInvite,
  tooManyFailures,
  touchLogin,
  verifyPassword,
} from '../../../lib/accounts';

export const prerender = false;

/**
 * Sign-in for the backend.
 *
 * Three actions, deliberately in one route so they share the rate limiting and
 * the same shape of reply:
 *
 *   bootstrap  creates the very first admin, and only while no account exists
 *   login      email + password
 *   invite     an invited editor choosing their own password
 *
 * No password is ever emailed, logged, or returned. An invited editor gets a
 * link with a one-time token and picks their own, so nobody — including
 * whoever set up the account — ever knows it.
 */

const json = (body: unknown, status = 200, cookie?: string) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      ...(cookie ? { 'set-cookie': cookie } : {}),
    },
  });

async function hashIp(request: Request) {
  const salt = env('COMMENT_IP_SALT');
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    '';
  if (!salt || !ip) return null;

  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(salt + ip));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
}

export const POST: APIRoute = async ({ request, url }) => {
  if (!accountsConfigured()) {
    return json({ error: 'Accounts are not configured on this deployment.' }, 503);
  }

  let payload: Record<string, string>;
  try {
    payload = (await request.json()) as Record<string, string>;
  } catch {
    return json({ error: 'Malformed request.' }, 400);
  }

  const secure = url.protocol === 'https:';
  const action = String(payload.action ?? '');

  /* ------------------------------------------------------------ bootstrap */

  if (action === 'bootstrap') {
    // Only possible while the table is empty, so this cannot be used to add an
    // admin later. Proof of ownership is the moderation secret, which lives in
    // the deployment's environment and nowhere else.
    if ((await countEditors()) > 0) {
      return json({ error: 'The first account already exists. Sign in instead.' }, 409);
    }
    if (!(await passwordMatches(String(payload.secret ?? '')))) {
      return json({ error: 'That setup secret is not right.' }, 401);
    }

    const problem = passwordProblem(String(payload.password ?? ''));
    if (problem) return json({ error: problem }, 400);

    const made = await createEditor({
      email: String(payload.email ?? ''),
      displayName: String(payload.displayName ?? '').trim() || 'Gianluca Scattarella',
      role: 'admin',
    });
    if ('error' in made) return json({ error: made.error }, 400);

    const set = await setPasswordFromInvite(made.inviteToken, String(payload.password));
    if (!set.ok) return json({ error: set.error }, 400);

    const cookie = await createCmsCookie({ id: made.editor.id, role: 'admin' }, secure);
    return json({ ok: true, role: 'admin' }, 200, cookie ?? undefined);
  }

  /* --------------------------------------------------------------- invite */

  if (action === 'invite') {
    const set = await setPasswordFromInvite(String(payload.token ?? ''), String(payload.password ?? ''));
    if (!set.ok) return json({ error: set.error }, 400);

    const cookie = await createCmsCookie({ id: set.editor.id, role: set.editor.role }, secure);
    return json({ ok: true, role: set.editor.role }, 200, cookie ?? undefined);
  }

  /* ---------------------------------------------------------------- login */

  if (action === 'login') {
    const email = String(payload.email ?? '').trim().toLowerCase();
    const password = String(payload.password ?? '');

    if (await tooManyFailures(email)) {
      return json({ error: 'Too many attempts. Wait fifteen minutes and try again.' }, 429);
    }

    const editor = await findEditorByEmail(email);
    const ip = await hashIp(request);

    // Verify even when the account is missing, against a throwaway hash, so a
    // wrong address and a wrong password take the same time. Otherwise the
    // response time tells an attacker which addresses exist.
    const ok =
      editor && !editor.disabled
        ? await verifyPassword(password, editor.password_hash)
        : await verifyPassword(password, null);

    await recordAttempt(email, Boolean(ok), ip);

    if (!ok || !editor) {
      return json({ error: 'Those details do not match an account.' }, 401);
    }

    await touchLogin(editor.id);
    const cookie = await createCmsCookie({ id: editor.id, role: editor.role }, secure);
    return json({ ok: true, role: editor.role, name: editor.display_name }, 200, cookie ?? undefined);
  }

  /* --------------------------------------------------------------- logout */

  if (action === 'logout') {
    return json({ ok: true }, 200, clearedCmsCookie(secure));
  }

  return json({ error: 'Unknown action.' }, 400);
};

/** Tells the sign-in page whether it should offer setup or a normal login. */
export const GET: APIRoute = async () => {
  if (!accountsConfigured()) return json({ configured: false, needsBootstrap: false });
  return json({ configured: true, needsBootstrap: (await countEditors()) === 0 });
};
