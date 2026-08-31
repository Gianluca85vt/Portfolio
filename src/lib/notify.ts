import nodemailer from 'nodemailer';
import { env } from './env';

/**
 * Comment notifications, sent over your own SMTP.
 *
 * No third-party email service sits in the middle: this talks directly to
 * whichever mailbox you point it at (Aruba, Gmail, anything that speaks SMTP),
 * the same way a mail client would. Configure it with the SMTP_* variables in
 * .env.example — with none of them set, everything here turns into a no-op and
 * commenting carries on working.
 */

type NewComment = {
  id: string;
  postSlug: string;
  authorName: string;
  body: string;
  /**
   * Why the filter held it, in words. Only held comments are emailed now, so
   * this is always present in practice — but the email opens with it, and a
   * decision is easier when you know which of the three lines it crossed.
   */
  heldFor?: string;
};

export function notificationsConfigured() {
  return Boolean(env('SMTP_HOST') && env('SMTP_USER') && env('SMTP_PASS') && env('NOTIFY_TO'));
}

/**
 * Headers are one line each, so a newline inside a value ends the header and
 * starts another — which is how you smuggle a Bcc into somebody else's mail.
 * nodemailer guards against this too; this keeps the subject tidy as well.
 */
function headerSafe(s: string) {
  return s.replace(/[\r\n\t]+/g, ' ').trim().slice(0, 78);
}

/** HTML-escape, because the comment is text a stranger typed. */
function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Signs a moderation link so only links produced here are accepted. Without
 * this, anyone who guessed a comment id could approve their own comment.
 *
 * Returns null when no secret is set, rather than quietly signing with an empty
 * key — an empty key is a key everyone knows, which would make the signature
 * decorative and let anyone publish whatever they wanted.
 */
export async function signModeration(id: string, action: string) {
  const secret = env('COMMENT_ADMIN_SECRET');
  if (!secret) return null;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const sig = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(`${action}:${id}`)
  );
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Constant-time compare. A plain === leaks, through timing, how much of a
 * guessed signature was right, which is enough to reconstruct one byte at a
 * time.
 */
export function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

/**
 * Never throws and never rejects. A comment that saved correctly must not come
 * back as an error to the reader because the mail server was having a moment.
 */
export async function notifyNewComment(comment: NewComment, siteUrl: string) {
  if (!notificationsConfigured()) return { sent: false, reason: 'not configured' };

  try {
    const port = Number(env('SMTP_PORT') ?? 465);
    const transport = nodemailer.createTransport({
      host: env('SMTP_HOST'),
      port,
      // 465 is implicit TLS; 587 starts plaintext and upgrades with STARTTLS.
      secure: port === 465,
      auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
    });

    const article = `${siteUrl}/blog/${comment.postSlug}/`;
    const approve = `${siteUrl}/api/moderate?id=${comment.id}&action=approve&token=${await signModeration(comment.id, 'approve')}`;
    const remove = `${siteUrl}/api/moderate?id=${comment.id}&action=delete&token=${await signModeration(comment.id, 'delete')}`;

    const held = comment.heldFor
      ? `Held by the filter for ${comment.heldFor}. Everything else publishes on sight.`
      : 'Held for approval.';

    const text = [
      `${comment.authorName} commented on ${comment.postSlug}`,
      held,
      '',
      comment.body,
      '',
      `Approve: ${approve}`,
      `Delete:  ${remove}`,
      `Article: ${article}`,
      '',
      'It is saved but not visible. The filter can be wrong — someone quoting a',
      'slur to object to it trips the same wire as someone using it.',
    ].join('\n');

    const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;color:#1a1a1a">
  <p style="font-size:13px;color:#666;margin:0 0 6px">${esc(held)}</p>
  <p style="margin:0 0 4px"><strong>${esc(comment.authorName)}</strong> on
    <a href="${esc(article)}" style="color:#7621B0">${esc(comment.postSlug)}</a></p>
  <blockquote style="margin:16px 0;padding:12px 16px;border-left:3px solid #B600A8;background:#f6f6f8;white-space:pre-wrap">${esc(comment.body)}</blockquote>
  <p style="margin:24px 0 0">
    <a href="${esc(approve)}" style="background:#7621B0;color:#fff;text-decoration:none;padding:10px 20px;border-radius:999px;display:inline-block">Approve</a>
    &nbsp;&nbsp;
    <a href="${esc(remove)}" style="color:#666;text-decoration:underline;padding:10px 0;display:inline-block">Delete</a>
  </p>
  <p style="font-size:12px;color:#888;margin-top:22px">Both links open a confirmation page first — nothing happens just by clicking. The filter can be wrong in either direction: someone quoting a slur to object to it trips the same wire as someone using it.</p>
</div>`;

    await transport.sendMail({
      from: env('NOTIFY_FROM') ?? env('SMTP_USER'),
      to: env('NOTIFY_TO'),
      subject: headerSafe(`Held comment from ${comment.authorName} on ${comment.postSlug}`),
      text,
      html,
    });

    return { sent: true };
  } catch (err) {
    console.error('[comments] notification failed:', err);
    return { sent: false, reason: 'send failed' };
  }
}

/**
 * Sent when the scheduled writer leaves a draft. Carries the three decisions as
 * signed links, so the whole review can happen from a phone without opening
 * GitHub. Subject is prefixed so a mail filter can catch these on its own.
 */
export async function notifyNewDraft(
  draft: {
    slug: string;
    title: string;
    category: string;
    excerpt: string;
    cover?: string;
    linkedin?: string;
    script?: string;
  },
  siteUrl: string
) {
  if (!notificationsConfigured()) return { sent: false, reason: 'not configured' };

  try {
    const port = Number(env('SMTP_PORT') ?? 465);
    const transport = nodemailer.createTransport({
      host: env('SMTP_HOST'),
      port,
      secure: port === 465,
      auth: { user: env('SMTP_USER'), pass: env('SMTP_PASS') },
    });

    const link = async (action: string) =>
      `${siteUrl}/api/draft-action?slug=${encodeURIComponent(draft.slug)}&action=${action}&token=${await signModeration(draft.slug, action)}`;

    const [approve, reject, revise] = await Promise.all([
      link('approve'),
      link('reject'),
      link('revise'),
    ]);

    // The one thing you cannot tell from a headline and an excerpt is whether
    // the piece has artwork. A drawn placeholder cannot be published — the
    // approve link refuses it — so saying which it is here saves a click that
    // was only ever going to come back with a no.
    const drawnCover = !draft.cover || draft.cover.endsWith('.svg');
    const coverUrl = draft.cover ? `${siteUrl}${draft.cover}` : '';

    const text = [
      `New draft awaiting your decision: ${draft.title}`,
      `Category: ${draft.category}`,
      drawnCover
        ? 'Cover: PLACEHOLDER — no real image yet, so this cannot be published as it stands. Ask for a revision.'
        : 'Cover: a real image',
      '',
      draft.excerpt,
      '',
      ...(drawnCover ? [] : [`Approve: ${approve}`]),
      `Reject:  ${reject}`,
      `Revise:  ${revise}`,
      '',
      'Nothing is live until you approve it.',
      ...(draft.script ? ['', `Video script and plates: ${draft.script}`] : []),
      ...(draft.linkedin
        ? ['', '— for LinkedIn, copy from here —', '', draft.linkedin]
        : []),
    ].join('\n');

    const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;color:#1a1a1a">
  <p style="font-size:13px;color:#666;margin:0 0 6px">New draft awaiting your decision · ${esc(draft.category)}</p>
  <h2 style="font-size:19px;line-height:1.3;margin:0 0 10px">${esc(draft.title)}</h2>
  <p style="color:#444;line-height:1.6;margin:0 0 18px">${esc(draft.excerpt)}</p>
  ${
    drawnCover
      ? `<p style="border-left:3px solid #BE4C00;background:#FDF6F1;padding:10px 14px;margin:0 0 20px;line-height:1.5;color:#5a3520">
    <strong>No artwork yet.</strong> This one still has the drawn placeholder as its cover, so it cannot be
    published as it stands — ask for a revision and the next run will source an image.
  </p>`
      : `<a href="${esc(coverUrl)}"><img src="${esc(coverUrl)}" alt="" width="520" style="width:100%;max-width:520px;border-radius:10px;display:block;margin:0 0 20px"></a>`
  }
  <p style="margin:0 0 18px">
    ${
      drawnCover
        ? ''
        : `<a href="${esc(approve)}" style="background:#0b804b;color:#fff;text-decoration:none;padding:11px 22px;border-radius:999px;display:inline-block;margin-right:6px">Approve</a>`
    }
    <a href="${esc(revise)}" style="background:#7621B0;color:#fff;text-decoration:none;padding:11px 22px;border-radius:999px;display:inline-block;margin-right:6px">Revise</a>
    <a href="${esc(reject)}" style="color:#666;text-decoration:underline;padding:11px 0;display:inline-block">Reject</a>
  </p>
  <p style="font-size:12px;color:#888;line-height:1.6">Each link opens a confirmation page first — nothing happens just by clicking. Revise lets you type what to change; the next scheduled run picks it up.</p>
  ${
    draft.script
      ? `<p style="font-size:12px;color:#888;line-height:1.6;margin:14px 0 0">Video script and motion-graphic plates: <code style="background:#f2eef4;padding:2px 6px;border-radius:4px">${esc(draft.script)}</code></p>`
      : ''
  }
  ${
    draft.linkedin
      ? `<div style="border-top:1px solid #e4dee8;margin-top:26px;padding-top:18px">
    <p style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#888;margin:0 0 10px">For LinkedIn — select and copy</p>
    <div style="background:#f7f5f8;border-radius:10px;padding:16px 18px;white-space:pre-wrap;line-height:1.55;color:#1a1a1a;font-size:14px">${esc(draft.linkedin)}</div>
    <p style="font-size:11px;color:#888;margin:10px 0 0">${draft.linkedin.length} characters. LinkedIn hides everything past about 210 behind “see more”.</p>
  </div>`
      : ''
  }
</div>`;

    await transport.sendMail({
      from: env('NOTIFY_FROM') ?? env('SMTP_USER'),
      to: env('NOTIFY_TO'),
      subject: headerSafe(`[Bozza] ${draft.category} — ${draft.title}`),
      text,
      html,
    });

    return { sent: true };
  } catch (err) {
    console.error('[drafts] notification failed:', err);
    return { sent: false, reason: 'send failed' };
  }
}
