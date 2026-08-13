import type { APIRoute } from 'astro';
import { supabaseAdmin } from '../lib/env';
import {
  passwordMatches,
  createSessionCookie,
  clearedSessionCookie,
  hasValidSession,
} from '../lib/session';

export const prerender = false;

/**
 * Moderation for every comment, approved or not, so nothing depends on still
 * having the notification email to hand. Sign in once with COMMENT_ADMIN_SECRET
 * and the session lasts twelve hours.
 */

type Comment = {
  id: string;
  post_slug: string;
  author_name: string;
  body: string;
  created_at: string;
  approved: boolean;
};

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const STYLE = `
 *{box-sizing:border-box}
 body{margin:0;min-height:100vh;background:#0C0C0C;color:#D7E2EA;padding:24px 18px 60px;
      font-family:-apple-system,Segoe UI,Roboto,sans-serif}
 main{max-width:720px;margin:0 auto}
 h1{font-size:1.3rem;font-weight:600;margin:0 0 4px}
 .sub{color:rgba(215,226,234,.45);font-size:.85rem;margin:0 0 30px}
 .card{border:1px solid rgba(215,226,234,.15);border-radius:18px;padding:16px 18px;margin-bottom:14px}
 .card.pending{border-color:rgba(182,0,168,.55)}
 .meta{display:flex;flex-wrap:wrap;gap:10px;align-items:baseline;font-size:.78rem;
       color:rgba(215,226,234,.45);margin-bottom:10px}
 .who{color:#D7E2EA;font-weight:500;font-size:.92rem}
 .tag{font-size:.62rem;text-transform:uppercase;letter-spacing:.09em;
      border-radius:999px;padding:3px 9px;border:1px solid currentColor}
 .tag.p{color:#B600A8}.tag.l{color:rgba(215,226,234,.4)}
 .body{white-space:pre-wrap;line-height:1.6;font-weight:300;margin:0 0 14px}
 form{display:inline}
 button{border:0;border-radius:999px;padding:9px 20px;font-size:.82rem;cursor:pointer;margin-right:8px}
 .go{background:linear-gradient(123deg,#18011F 7%,#B600A8 37%,#7621B0 72%,#BE4C00 100%);color:#fff}
 .del{background:transparent;color:rgba(215,226,234,.5);border:1px solid rgba(215,226,234,.25)}
 .del:hover{color:#ff8080;border-color:#ff8080}
 input{width:100%;background:rgba(215,226,234,.07);border:1px solid rgba(215,226,234,.2);
       border-radius:12px;padding:13px 15px;color:#D7E2EA;font-size:.95rem;margin-bottom:14px}
 a{color:rgba(215,226,234,.5);font-size:.82rem}
 .empty{color:rgba(215,226,234,.4);padding:30px 0}
 .note{color:rgba(215,226,234,.35);font-size:.78rem;margin-top:30px;line-height:1.6}
`;

function html(inner: string, extraHeaders: Record<string, string> = {}) {
  return new Response(
    `<!doctype html><html lang="en"><head><meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<title>Comment moderation</title><style>${STYLE}</style></head>
<body><main>${inner}</main></body></html>`,
    { status: 200, headers: { 'content-type': 'text/html; charset=utf-8', ...extraHeaders } }
  );
}

function loginPage(error?: string) {
  return `<h1>Comment moderation</h1>
<p class="sub">${error ? esc(error) : 'Sign in to continue.'}</p>
<form method="POST">
  <input type="password" name="password" placeholder="Admin secret" autofocus
         autocomplete="current-password" />
  <button class="go" type="submit">Sign in</button>
</form>`;
}

const NOT_CONFIGURED =
  '<h1>Not configured</h1><p class="sub">Database credentials are missing on the server.</p>';

function listPage(comments: Comment[], flash?: string) {
  const pending = comments.filter((c) => !c.approved);
  const live = comments.filter((c) => c.approved);

  const card = (c: Comment) => `<div class="card ${c.approved ? '' : 'pending'}">
  <div class="meta">
    <span class="who">${esc(c.author_name)}</span>
    <span class="tag ${c.approved ? 'l' : 'p'}">${c.approved ? 'live' : 'pending'}</span>
    <span>${new Date(c.created_at).toLocaleString('en-GB')}</span>
    <a href="/blog/${esc(c.post_slug)}/">${esc(c.post_slug)}</a>
  </div>
  <p class="body">${esc(c.body)}</p>
  ${
    c.approved
      ? ''
      : `<form method="POST"><input type="hidden" name="id" value="${esc(c.id)}" />
         <input type="hidden" name="action" value="approve" />
         <button class="go" type="submit">Approve</button></form>`
  }
  <form method="POST" onsubmit="return confirm('Delete this comment permanently?')">
    <input type="hidden" name="id" value="${esc(c.id)}" />
    <input type="hidden" name="action" value="delete" />
    <button class="del" type="submit">Delete</button>
  </form>
</div>`;

  return `<h1>Comment moderation</h1>
<p class="sub">${flash ? esc(flash) + ' · ' : ''}${pending.length} awaiting approval, ${live.length} live</p>
${pending.map(card).join('')}
${live.map(card).join('')}
${comments.length === 0 ? '<p class="empty">No comments yet.</p>' : ''}
<p class="note">Deleting is permanent. Approving publishes immediately under the article.</p>
<form method="POST"><input type="hidden" name="action" value="signout" />
<button class="del" type="submit">Sign out</button></form>`;
}

async function loadComments() {
  const db = supabaseAdmin();
  if (!db) return null;
  const res = await fetch(`${db.rest}?select=*&order=created_at.desc`, { headers: db.headers });
  if (!res.ok) return null;
  return (await res.json()) as Comment[];
}

export const GET: APIRoute = async ({ request }) => {
  if (!(await hasValidSession(request))) return html(loginPage());

  const comments = await loadComments();
  return html(comments ? listPage(comments) : NOT_CONFIGURED);
};

export const POST: APIRoute = async ({ request, url }) => {
  const form = await request.formData();
  const action = String(form.get('action') ?? '');
  const secure = url.protocol === 'https:';

  // Signing in is the one action allowed without a session.
  if (!action && form.has('password')) {
    if (!(await passwordMatches(String(form.get('password') ?? '')))) {
      return html(loginPage('That secret is not right.'));
    }
    const cookie = await createSessionCookie(secure);
    if (!cookie) return html(loginPage('COMMENT_ADMIN_SECRET is not set on the server.'));

    const comments = await loadComments();
    return html(comments ? listPage(comments, 'Signed in') : NOT_CONFIGURED, {
      'set-cookie': cookie,
    });
  }

  if (!(await hasValidSession(request))) {
    return html(loginPage('Session expired. Sign in again.'));
  }

  if (action === 'signout') {
    return html('<h1>Signed out</h1><p class="sub"><a href="/moderation">Sign in again</a></p>', {
      'set-cookie': clearedSessionCookie(secure),
    });
  }

  const db = supabaseAdmin();
  if (!db) return html(NOT_CONFIGURED);

  const id = String(form.get('id') ?? '');
  if (!id || (action !== 'approve' && action !== 'delete')) {
    const comments = await loadComments();
    return html(comments ? listPage(comments, 'Nothing to do') : NOT_CONFIGURED);
  }

  const target = `${db.rest}?id=eq.${encodeURIComponent(id)}`;
  const res =
    action === 'approve'
      ? await fetch(target, {
          method: 'PATCH',
          headers: { ...db.headers, prefer: 'return=minimal' },
          body: JSON.stringify({ approved: true }),
        })
      : await fetch(target, { method: 'DELETE', headers: { ...db.headers, prefer: 'return=minimal' } });

  const comments = await loadComments();
  const flash = res.ok ? (action === 'approve' ? 'Approved' : 'Deleted') : 'That did not work';
  return html(comments ? listPage(comments, flash) : NOT_CONFIGURED);
};
