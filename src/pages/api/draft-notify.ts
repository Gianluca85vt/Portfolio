import type { APIRoute } from 'astro';
import { isDraft, readFile } from '../../lib/github';
import { notifyNewDraft } from '../../lib/notify';
import { hookAuthorised } from '../../lib/hook';
import { findRelated, parseSocialKit, subjectOf } from '../../lib/social-kit';
import type { Related } from '../../lib/social-kit';
import { tagged } from '../../lib/utm';

export const prerender = false;

/**
 * Called by the scheduled writer once it has pushed a draft, to have the review
 * email sent from here — where the SMTP credentials already live. That is the
 * point: an unattended agent running eleven times a day never needs the
 * mailbox password.
 *
 * The slug is checked against the repository and must actually exist there as
 * an unpublished draft. When HOOK_SECRET is set the caller must also present it,
 * so a stranger cannot loop real drafts into the inbox — see lib/hook.ts.
 */
export const POST: APIRoute = async ({ request }) => {
  if (!(await hookAuthorised(request))) {
    return new Response(JSON.stringify({ error: 'Not allowed.' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    });
  }

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

  // The social kit: a LinkedIn post and an X thread, written with the draft
  // (notes/social/<slug>.md). The Monday editorial's older notes/linkedin file
  // still reads, as LinkedIn only. Carrying them into the email is the
  // difference between something he pastes on the spot and something he has to
  // remember exists in a folder.
  const kit = parseSocialKit(
    (await readFile(`notes/social/${slug}.md`))?.text ?? (await readFile(`notes/linkedin/${slug}.md`))?.text ?? ''
  );
  const articleUrl = `https://www.gianlucascattarella.it/blog/${slug}/`;

  // Whether the blog already ran this story in the last two months, read off
  // the published site's own search index. A miss here only costs the warning.
  let related: Related[] = [];
  try {
    const res = await fetch(new URL('/blog/search-index.json', request.url), { signal: AbortSignal.timeout(5000) });
    if (res.ok) related = findRelated(subjectOf(draft.title, draft.reviewOf), await res.json(), new Date(), 60, slug);
  } catch {
    related = [];
  }

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
      outlets: draft.outlets,
      linkedin: kit.linkedin,
      xThread: kit.x,
      links: {
        linkedin: tagged(articleUrl, 'linkedin', 'social', slug),
        x: tagged(articleUrl, 'x', 'social', slug),
      },
      related,
      script: hasScript ? `notes/video/${slug}.script.md` : undefined,
    },
    new URL(request.url).origin
  );

  return new Response(JSON.stringify(result), {
    status: result.sent ? 200 : 502,
    headers: { 'content-type': 'application/json' },
  });
};
