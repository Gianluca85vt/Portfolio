/**
 * Sends one email to Gianluca over the same SMTP the report uses. Only ever to
 * NOTIFY_TO: nothing here writes to anyone else, which is the rule for every
 * automated job on this site — outreach is drafted, never sent.
 */
export async function mailHim({ subject, html, text, attachments = [] }) {
  const need = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'NOTIFY_TO'];
  const missing = need.filter((n) => !process.env[n]);
  if (missing.length) {
    console.log(`not emailing — missing ${missing.join(', ')}`);
    return false;
  }
  const { default: nodemailer } = await import('nodemailer');
  const port = Number(process.env.SMTP_PORT ?? 465);
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transport.sendMail({
    from: process.env.NOTIFY_FROM ?? process.env.SMTP_USER,
    to: process.env.NOTIFY_TO,
    subject,
    html,
    text,
    attachments,
  });
  return true;
}
