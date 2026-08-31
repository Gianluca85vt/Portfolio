import type { APIRoute } from 'astro';
import { signModeration, safeEqual } from '../../lib/notify';
import { isDraft, publishDraft, discardDraft, requestRevision, canWrite } from '../../lib/github';

export const prerender = false;

/**
 * The three buttons in the draft email.
 *
 * As with comment moderation, GET only ever renders a confirmation page and the
 * change happens on POST — mail clients fetch every link in a message to build
 * previews, and a GET that published on sight would hand the decision to Gmail.
 */

const ACTIONS = ['approve', 'reject', 'revise'] as const;
type Action = (typeof ACTIONS)[number];

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function page(title: string, message: string, form = '') {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<title>${esc(title)}</title>
<style>
 body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
      background:#0C0C0C;color:#D7E2EA;font-family:-apple-system,Segoe UI,Roboto,sans-serif;padding:24px}
 main{max-width:460px;width:100%;text-align:center}
 h1{font-size:1.2rem;font-weight:600;margin:0 0 10px;line-height:1.35}
 p{color:rgba(215,226,234,.6);line-height:1.6;margin:0 0 22px;font-size:.92rem}
 textarea{width:100%;min-height:130px;background:rgba(215,226,234,.07);border:1px solid rgba(215,226,234,.2);
          border-radius:12px;padding:13px 15px;color:#D7E2EA;font:inherit;font-size:.92rem;margin-bottom:16px;resize:vertical}
 button{background:linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%);
        color:#fff;border:0;border-radius:999px;padding:13px 30px;font-size:.95rem;cursor:pointer}
 a{color:rgba(215,226,234,.5);font-size:.84rem}
</style></head><body><main>
<h1>${esc(title)}</h1><p>${message}</p>${form}
<p style="margin-top:26px"><a href="/blog/">Back to the blog</a></p>
</main></body></html>`,
    { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }
  );
}

async function verify(slug: string, action: string, token: string) {
  if (!slug || !ACTIONS.includes(action as Action) || !token) return false;
  const expected = await signModeration(slug, action);
  if (!expected) return false;
  return safeEqual(expected, token);
}

function hidden(slug: string, action: string, token: string) {
  return `<input type="hidden" name="slug" value="${esc(slug)}" />
    <input type="hidden" name="action" value="${esc(action)}" />
    <input type="hidden" name="token" value="${esc(token)}" />`;
}

export const GET: APIRoute = async ({ url }) => {
  const slug = url.searchParams.get('slug') ?? '';
  const action = url.searchParams.get('action') ?? '';
  const token = url.searchParams.get('token') ?? '';

  if (!(await verify(slug, action, token))) {
    return page('Link not valid', 'This link is expired, altered or incomplete.');
  }

  const draft = await isDraft(slug);
  if (!draft) {
    return page('Already dealt with', 'That draft is no longer waiting — it has been published or removed.');
  }
  if (!canWrite()) {
    return page('Not configured', 'GITHUB_TOKEN is missing on the server, so the decision cannot be applied.');
  }

  const copy: Record<Action, [string, string, string]> = {
    approve: ['Publish this draft?', 'It goes live as soon as the site rebuilds, in a minute or two.', 'Publish'],
    reject: ['Delete this draft?', 'The file is removed from the repository. There is no undo.', 'Delete'],
    revise: ['What should change?', 'This is passed to the next scheduled run, which rewrites the draft. It stays unpublished meanwhile.', 'Send the request'],
  };
  const [title, message, button] = copy[action as Action];

  const field =
    action === 'revise'
      ? '<textarea name="instruction" required placeholder="Shorter, and lead with the price rise rather than the history." autofocus></textarea>'
      : '';

  return page(
    title,
    `<strong style="color:#D7E2EA">${esc(draft.title)}</strong><br />${message}`,
    `<form method="POST">${hidden(slug, action, token)}${field}<button type="submit">${button}</button></form>`
  );
};

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const slug = String(form.get('slug') ?? '');
  const action = String(form.get('action') ?? '');
  const token = String(form.get('token') ?? '');

  if (!(await verify(slug, action, token))) {
    return page('Link not valid', 'This link is expired, altered or incomplete.');
  }
  if (!canWrite()) {
    return page('Not configured', 'GITHUB_TOKEN is missing on the server.');
  }
  if (!(await isDraft(slug))) {
    return page('Already dealt with', 'That draft is no longer waiting.');
  }

  if (action === 'approve') {
    const result = await publishDraft(slug);

    // A refusal is the draft failing a rule the build also enforces, caught
    // here so it reads as a sentence rather than as a failed deployment.
    if (typeof result === 'object') return page('Not yet', result.why);

    return result
      ? page('Published', 'It appears on the blog once the rebuild finishes, usually within a couple of minutes.')
      : page('That did not work', 'GitHub refused the commit. Try again in a moment.');
  }

  if (action === 'reject') {
    return (await discardDraft(slug))
      ? page('Deleted', 'The draft is gone from the repository.')
      : page('That did not work', 'GitHub refused the deletion. Try again in a moment.');
  }

  const instruction = String(form.get('instruction') ?? '').trim();
  if (instruction.length < 3) {
    return page('Nothing to pass on', 'Say what should change and send it again.');
  }
  if (instruction.length > 4000) {
    return page('Too long', 'Keep the request under 4000 characters.');
  }

  return (await requestRevision(slug, instruction))
    ? page('Request saved', 'The next scheduled run rewrites the draft and emails you again. It stays unpublished until then.')
    : page('That did not work', 'GitHub refused the write. Try again in a moment.');
};
