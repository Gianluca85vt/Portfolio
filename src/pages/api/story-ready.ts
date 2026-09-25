import type { APIRoute } from 'astro';
import { readFile } from '../../lib/github';
import { notifyStoryReady } from '../../lib/notify';
import { hookAuthorised } from '../../lib/hook';

export const prerender = false;

/**
 * Called by the evening digest workflow once it has drawn and pushed the story
 * frames, to have the email sent from here — where the SMTP credentials already
 * live, the same arrangement as the draft review email.
 *
 * Every slug in the payload is checked against the repository and must be a
 * published article that exists, and when HOOK_SECRET is set the caller must
 * also present it — see lib/hook.ts.
 */
export const POST: APIRoute = async ({ request }) => {
  if (!(await hookAuthorised(request))) {
    return new Response(JSON.stringify({ error: 'Not allowed.' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

  let payload: { day?: string; slugs?: string[] };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Malformed request.' }), { status: 400 });
  }

  const day = String(payload.day ?? '').trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) {
    return new Response(JSON.stringify({ error: 'Bad day.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  const slugs = (payload.slugs ?? [])
    .map((s) => String(s).trim())
    .filter((s) => /^[a-z0-9-]{3,120}$/.test(s));

  if (slugs.length === 0) {
    return new Response(JSON.stringify({ error: 'No slugs.' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
  }

  // Read each one out of the repository rather than trusting the payload for
  // anything that reaches the email.
  const articles: { title: string; category: string; review: boolean }[] = [];
  for (const slug of slugs) {
    const file = await readFile(`src/content/blog/${slug}.md`);
    if (!file) continue;
    if (/^draft:\s*true\s*$/m.test(file.text)) continue;

    const field = (name: string) =>
      new RegExp(`^${name}:\\s*(.+)$`, 'm')
        .exec(file.text)?.[1]
        ?.trim()
        .replace(/^["']|["']$/g, '') ?? '';

    const title = field('title');
    // A review leads the Reel caption, so the score field is read only to know
    // which piece is one.
    if (title) articles.push({ title, category: field('category') || 'Games', review: field('score') !== '' });
  }

  if (articles.length === 0) {
    return new Response(JSON.stringify({ error: 'None of those are published articles.' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    });
  }

  // Frame zero is the cover, then one per article, in the order they were drawn.
  const frames = Array.from(
    { length: articles.length + 1 },
    (_, i) => `/img/blog/digest/${day}-story-${String(i).padStart(2, '0')}.jpg`
  );

  const result = await notifyStoryReady(
    { day, frames, articles },
    new URL(request.url).origin
  );

  return new Response(JSON.stringify(result), {
    status: result.sent ? 200 : 502,
    headers: { 'content-type': 'application/json' },
  });
};
