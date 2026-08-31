import type { APIRoute } from 'astro';
import { notifyNewComment } from '../../lib/notify';
import { env, supabaseAdmin } from '../../lib/env';
import { screen, REASONS } from '../../lib/moderation';

// One of two routes on the site that run as functions rather than static files.
export const prerender = false;

const MAX_PER_WINDOW = 3;
const WINDOW_MINUTES = 10;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

/**
 * Salted SHA-256 of the caller's address. Enough to spot the same submitter
 * within a few minutes, useless as personal data — there is no way back to the
 * address, and without the salt the hash cannot be reproduced either.
 */
async function hashIp(ip: string, salt: string) {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  const db = supabaseAdmin();
  const salt = env('COMMENT_IP_SALT') ?? 'portfolio';

  if (!db) {
    return json({ error: 'Comments are not configured yet.' }, 503);
  }

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Malformed request.' }, 400);
  }

  // Honeypot: a field hidden from people and irresistible to naive bots. Answer
  // 200 so the bot believes it worked and does not come back to retry.
  if (typeof payload.website === 'string' && payload.website.trim() !== '') {
    return json({ ok: true });
  }

  const postSlug = String(payload.postSlug ?? '').trim();
  const authorName = String(payload.authorName ?? '').trim();
  const body = String(payload.body ?? '').trim();

  if (!postSlug || postSlug.length > 200) return json({ error: 'Unknown article.' }, 400);
  if (authorName.length < 1 || authorName.length > 60) {
    return json({ error: 'Name must be between 1 and 60 characters.' }, 400);
  }
  if (body.length < 2 || body.length > 4000) {
    return json({ error: 'Comment must be between 2 and 4000 characters.' }, 400);
  }

  const ipHash = await hashIp(clientAddress ?? 'unknown', salt);
  const { rest, headers } = db;

  // Rate limit: a handful per window, per submitter.
  const since = new Date(Date.now() - WINDOW_MINUTES * 60_000).toISOString();
  const recent = await fetch(
    `${rest}?select=id&ip_hash=eq.${ipHash}&created_at=gte.${since}`,
    { headers }
  );
  if (recent.ok) {
    const rows = (await recent.json()) as unknown[];
    if (rows.length >= MAX_PER_WINDOW) {
      return json({ error: 'That is a few too many in a row. Try again shortly.' }, 429);
    }
  }

  // Everything publishes, including what the filter objects to. Nothing waits
  // for a human, because waiting meant a reader's comment appeared whenever the
  // email was next opened and the thread was never a conversation.
  //
  // The filter's job is now to sort the notification rather than to gate the
  // comment: obscenity and abuse arrive flagged, so they can be read first and
  // deleted if they deserve it. That ordering is deliberate — a word filter is
  // wrong in both directions, and someone quoting a slur to object to it trips
  // the same wire as someone using it. Better to let both through and let a
  // person remove one than to make the innocent case wait.
  const verdict = screen(body, authorName);

  const insert = await fetch(rest, {
    method: 'POST',
    headers: { ...headers, prefer: 'return=representation' },
    body: JSON.stringify({
      post_slug: postSlug,
      author_name: authorName,
      body,
      ip_hash: ipHash,
      approved: true,
    }),
  });

  if (!insert.ok) {
    return json({ error: 'Could not save the comment. Try again later.' }, 502);
  }

  // Everything past this point is best-effort. The comment is already saved, so
  // a mail server that is down or misconfigured must not turn a successful
  // submission into an error for the person who wrote it.
  //
  // Every comment is announced. The flagged ones carry a reason so they sort
  // to the top of the inbox by subject line; the rest are just a note that
  // somebody said something.
  try {
    const [row] = (await insert.json()) as Array<{ id: string }>;
    if (row?.id) {
      await notifyNewComment(
        {
          id: row.id,
          postSlug,
          authorName,
          body,
          flaggedFor: verdict.publish ? undefined : REASONS[verdict.reason],
        },
        new URL(request.url).origin
      );
    }
  } catch (err) {
    console.error('[comments] saved, but could not notify:', err);
  }

  return json({ ok: true, pending: false });
};
