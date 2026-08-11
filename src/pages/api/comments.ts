import type { APIRoute } from 'astro';

// The only route on the site that runs as a function rather than a static file.
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
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  const salt = import.meta.env.COMMENT_IP_SALT ?? 'portfolio';

  if (!url || !serviceKey) {
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
  const rest = `${url}/rest/v1/comments`;
  const headers = {
    apikey: serviceKey,
    authorization: `Bearer ${serviceKey}`,
    'content-type': 'application/json',
  };

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

  // `approved` is deliberately not sent: the column defaults to false and
  // nothing here should be able to publish itself.
  const insert = await fetch(rest, {
    method: 'POST',
    headers: { ...headers, prefer: 'return=minimal' },
    body: JSON.stringify({ post_slug: postSlug, author_name: authorName, body, ip_hash: ipHash }),
  });

  if (!insert.ok) {
    return json({ error: 'Could not save the comment. Try again later.' }, 502);
  }

  return json({ ok: true, pending: true });
};
