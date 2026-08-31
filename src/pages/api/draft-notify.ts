import type { APIRoute } from 'astro';
import { isDraft, readFile } from '../../lib/github';
import { notifyNewDraft } from '../../lib/notify';

export const prerender = false;

/**
 * Called by the scheduled writer once it has pushed a draft, to have the review
 * email sent from here — where the SMTP credentials already live. That is the
 * point: an unattended agent running eleven times a day never needs the
 * mailbox password.
 *
 * There is no shared secret either, deliberately. Instead the slug is checked
 * against the repository and must actually exist there as an unpublished draft,
 * so the worst anyone can do by guessing is make a real draft get emailed twice.
 */
export const POST: APIRoute = async ({ request }) => {
  let payload: { slug?: string };
  try {
    payload = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Malformed request.' }), { status: 400 });
  }

  const slug = String(payload.slug ?? '').trim();
  const draft = await isDraft(slug);
  if (!draft) {
    return new Response(
      JSON.stringify({ error: 'No unpublished draft by that name.' }),
      { status: 404, headers: { 'content-type': 'application/json' } }
    );
  }

  // The Monday editorial also gets a LinkedIn post written for it. Carrying it
  // into the email is the difference between something he pastes on the spot
  // and something he has to remember exists in a folder.
  const linkedin = (await readFile(`notes/linkedin/${slug}.md`))?.text?.trim();

  // The video script is far too long to put in an email. Saying it exists, and
  // where, is the part that matters — otherwise it sits in a folder nobody
  // opens on a Monday morning.
  const hasScript = Boolean(await readFile(`notes/video/${slug}.script.md`));

  const result = await notifyNewDraft(
    {
      slug,
      title: draft.title,
      category: draft.category,
      excerpt: draft.excerpt,
      cover: draft.cover,
      linkedin,
      script: hasScript ? `notes/video/${slug}.script.md` : undefined,
    },
    new URL(request.url).origin
  );

  return new Response(JSON.stringify(result), {
    status: result.sent ? 200 : 502,
    headers: { 'content-type': 'application/json' },
  });
};
