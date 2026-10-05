import type { APIRoute } from 'astro';
import { env } from '../../lib/env';

export const prerender = false;

/**
 * Newsletter sign-up, passed on to beehiiv.
 *
 * The form posts here rather than straight to beehiiv so the API key stays on
 * the server, and so the form can be the site's own instead of an iframe. The
 * list is the one asset the growth plan of 5 October builds towards: a number
 * a sponsor can be shown, owned rather than rented from a network.
 *
 * Needs BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID on Vercel. Without them the
 * form says the newsletter is not open yet, and nothing breaks.
 *
 * Accepts JSON from the script on the page, and an ordinary form post from a
 * browser without JavaScript, which is sent back to the landing page.
 */

const EMAIL = /^[^\s@<>()"',;:]+@[^\s@<>()"',;:]+\.[a-z]{2,}$/i;
const SOURCE = /^[a-z0-9-]{1,40}$/;

/** A per-instance brake on someone hammering the form. beehiiv dedupes anyway. */
const recent = new Map<string, number[]>();
function tooMany(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < 10 * 60_000);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5000) recent.clear();
  return hits.length > 5;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const isForm = !(request.headers.get('content-type') ?? '').includes('application/json');
  let email = '';
  let source = 'site';
  let trap = '';

  try {
    if (isForm) {
      const form = await request.formData();
      email = String(form.get('email') ?? '');
      source = String(form.get('source') ?? 'site');
      trap = String(form.get('website') ?? '');
    } else {
      const body = (await request.json()) as { email?: string; source?: string; website?: string };
      email = String(body.email ?? '');
      source = String(body.source ?? 'site');
      trap = String(body.website ?? '');
    }
  } catch {
    return json({ error: 'That did not arrive in one piece. Try again.' }, 400);
  }

  const back = (state: string) =>
    new Response(null, { status: 303, headers: { location: `/newsletter/?${state}` } });

  email = email.trim().toLowerCase();
  if (!SOURCE.test(source)) source = 'site';

  // A field no person sees: anything typed in it is a bot. Answered as a
  // success so it learns nothing.
  if (trap) return isForm ? back('subscribed=1') : json({ ok: true });

  if (!EMAIL.test(email) || email.length > 254) {
    return isForm ? back('error=email') : json({ error: 'That email address does not look right.' }, 400);
  }

  if (tooMany(clientAddress ?? 'unknown')) {
    return isForm ? back('error=busy') : json({ error: 'Too many tries. Wait a few minutes.' }, 429);
  }

  const key = env('BEEHIIV_API_KEY');
  const publication = env('BEEHIIV_PUBLICATION_ID');
  if (!key || !publication) {
    return isForm ? back('error=closed') : json({ error: 'The newsletter is not open yet. Soon.' }, 503);
  }

  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${encodeURIComponent(publication)}/subscriptions`, {
      method: 'POST',
      headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: true,
        utm_source: source,
        utm_medium: 'website',
        referring_site: 'https://www.gianlucascattarella.it',
      }),
    });
    if (!res.ok) {
      console.error(`[subscribe] beehiiv answered ${res.status}: ${(await res.text()).slice(0, 300)}`);
      return isForm ? back('error=failed') : json({ error: 'The sign-up did not go through. Try again later.' }, 502);
    }
  } catch (err) {
    console.error('[subscribe] beehiiv unreachable:', err);
    return isForm ? back('error=failed') : json({ error: 'The sign-up did not go through. Try again later.' }, 502);
  }

  return isForm ? back('subscribed=1') : json({ ok: true });
};
