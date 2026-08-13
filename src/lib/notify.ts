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

    const text = [
      `${comment.authorName} commented on ${comment.postSlug}`,
      '',
      comment.body,
      '',
      `Approve: ${approve}`,
      `Delete:  ${remove}`,
      `Article: ${article}`,
      '',
      'The comment is not visible until you approve it.',
    ].join('\n');

    const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,sans-serif;max-width:560px;color:#1a1a1a">
  <p style="font-size:13px;color:#666;margin:0 0 6px">New comment awaiting approval</p>
  <p style="margin:0 0 4px"><strong>${esc(comment.authorName)}</strong> on
    <a href="${esc(article)}" style="color:#7621B0">${esc(comment.postSlug)}</a></p>
  <blockquote style="margin:16px 0;padding:12px 16px;border-left:3px solid #B600A8;background:#f6f6f8;white-space:pre-wrap">${esc(comment.body)}</blockquote>
  <p style="margin:24px 0 0">
    <a href="${esc(approve)}" style="background:#7621B0;color:#fff;text-decoration:none;padding:10px 20px;border-radius:999px;display:inline-block">Approve</a>
    &nbsp;&nbsp;
    <a href="${esc(remove)}" style="color:#666;text-decoration:underline;padding:10px 0;display:inline-block">Delete</a>
  </p>
  <p style="font-size:12px;color:#888;margin-top:22px">Both links open a confirmation page first — nothing happens just by clicking.</p>
</div>`;

    await transport.sendMail({
      from: env('NOTIFY_FROM') ?? env('SMTP_USER'),
      to: env('NOTIFY_TO'),
      subject: headerSafe(`New comment from ${comment.authorName} on ${comment.postSlug}`),
      text,
      html,
    });

    return { sent: true };
  } catch (err) {
    console.error('[comments] notification failed:', err);
    return { sent: false, reason: 'send failed' };
  }
}
