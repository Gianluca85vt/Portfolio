import type { APIRoute } from 'astro';
import { signModeration, safeEqual } from '../../lib/notify';

export const prerender = false;

/**
 * One-click moderation from the notification email.
 *
 * GET only ever *shows* a confirmation page; the action happens on POST. That
 * split matters: mail clients and link scanners routinely fetch every URL in a
 * message to preview it, and a GET that approved on sight would let Gmail
 * moderate the site on your behalf.
 */

const ACTIONS = ['approve', 'delete'] as const;
type Action = (typeof ACTIONS)[number];

function page(title: string, message: string, form?: { id: string; action: string; token: string }) {
  const body = form
    ? `<form method="POST">
         <input type="hidden" name="id" value="${form.id}" />
         <input type="hidden" name="action" value="${form.action}" />
         <input type="hidden" name="token" value="${form.token}" />
         <button type="submit">${form.action === 'approve' ? 'Approve comment' : 'Delete comment'}</button>
       </form>`
    : '';

  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${title}</title>
<style>
 body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;
      background:#0C0C0C;color:#D7E2EA;font-family:-apple-system,Segoe UI,Roboto,sans-serif;padding:24px}
 main{max-width:420px;text-align:center}
 h1{font-size:1.25rem;font-weight:600;margin:0 0 10px}
 p{color:rgba(215,226,234,.6);line-height:1.6;margin:0 0 24px}
 button{background:linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%);
        color:#fff;border:0;border-radius:999px;padding:13px 30px;font-size:.95rem;cursor:pointer}
 a{color:rgba(215,226,234,.55);font-size:.85rem}
</style></head><body><main>
<h1>${title}</h1><p>${message}</p>${body}
<p style="margin-top:26px"><a href="/blog/">Back to the blog</a></p>
</main></body></html>`,
    { status: 200, headers: { 'content-type': 'text/html; charset=utf-8' } }
  );
}

async function verify(id: string, action: string, token: string) {
  if (!id || !ACTIONS.includes(action as Action) || !token) return false;
  const expected = await signModeration(id, action);
  // No signing secret configured means no link can be trusted, including this
  // one. Refuse rather than fall back to something weaker.
  if (!expected) return false;
  return safeEqual(expected, token);
}

function supabase() {
  const url = import.meta.env.PUBLIC_SUPABASE_URL;
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;

  const headers: Record<string, string> = {
    apikey: serviceKey,
    'content-type': 'application/json',
  };
  if (serviceKey.startsWith('eyJ')) headers.authorization = `Bearer ${serviceKey}`;
  return { rest: `${url}/rest/v1/comments`, headers };
}

export const GET: APIRoute = async ({ url }) => {
  const id = url.searchParams.get('id') ?? '';
  const action = url.searchParams.get('action') ?? '';
  const token = url.searchParams.get('token') ?? '';

  if (!(await verify(id, action, token))) {
    return page('Link not valid', 'This moderation link is expired, altered or incomplete.');
  }

  return page(
    action === 'approve' ? 'Approve this comment?' : 'Delete this comment?',
    action === 'approve'
      ? 'It becomes visible under the article straight away.'
      : 'This removes it permanently. There is no undo.',
    { id, action, token }
  );
};

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const id = String(form.get('id') ?? '');
  const action = String(form.get('action') ?? '');
  const token = String(form.get('token') ?? '');

  if (!(await verify(id, action, token))) {
    return page('Link not valid', 'This moderation link is expired, altered or incomplete.');
  }

  const db = supabase();
  if (!db) return page('Not configured', 'The database credentials are missing on the server.');

  const target = `${db.rest}?id=eq.${encodeURIComponent(id)}`;
  const res =
    action === 'approve'
      ? await fetch(target, {
          method: 'PATCH',
          headers: { ...db.headers, prefer: 'return=minimal' },
          body: JSON.stringify({ approved: true }),
        })
      : await fetch(target, {
          method: 'DELETE',
          headers: { ...db.headers, prefer: 'return=minimal' },
        });

  if (!res.ok) {
    return page('That did not work', 'The database refused the change. Try again in a moment.');
  }

  return page(
    action === 'approve' ? 'Approved' : 'Deleted',
    action === 'approve'
      ? 'The comment is now live under the article.'
      : 'The comment is gone.'
  );
};
