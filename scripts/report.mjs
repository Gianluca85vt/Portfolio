/**
 * The four-day report: gather, render, print, send.
 *
 *   node scripts/report.mjs --html out.html   write the page and stop
 *   node scripts/report.mjs --pdf out.pdf     write the PDF and stop
 *   node scripts/report.mjs                   write the PDF and email it
 *
 * Every data source is optional and the report says which ones were missing,
 * so this produces something useful before all the credentials exist and keeps
 * producing it if one of them lapses.
 *
 * Environment:
 *   GA4_PROPERTY_ID                the numeric property id, not the G- tag
 *   GOOGLE_SERVICE_ACCOUNT_JSON    the whole service-account key file
 *   BING_API_KEY                   from Bing Webmaster Tools
 *   SMTP_HOST SMTP_PORT SMTP_USER SMTP_PASS NOTIFY_TO NOTIFY_FROM
 */
import { writeFile } from 'node:fs/promises';
import { gather } from './report-data.mjs';
import { renderReport } from './report-html.mjs';

const args = process.argv.slice(2);
const flag = (name) => {
  const i = args.indexOf(name);
  return i >= 0 ? args[i + 1] ?? true : null;
};

const DAYS = Number(flag('--days') || 4);

async function toPdf(html, path) {
  // Imported here rather than at the top so --html works on a machine that has
  // never installed a browser.
  const { default: puppeteer } = await import('puppeteer');
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-dev-shm-usage'] });
  try {
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.pdf({
      path,
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: true,
      headerTemplate: '<div></div>',
      footerTemplate:
        '<div style="width:100%;font-size:7pt;color:#6C6470;padding:0 13mm;text-align:right;font-family:sans-serif">' +
        '<span class="pageNumber"></span> / <span class="totalPages"></span></div>',
      margin: { top: '14mm', bottom: '16mm', left: '13mm', right: '13mm' },
    });
  } finally {
    await browser.close();
  }
}

async function email(pdfPath, data) {
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

  const { ga, sc, window: win } = data;
  const headline = ga.ok
    ? `${ga.current.users} users, ${ga.current.views} pageviews`
    : 'analytics unavailable';
  const search = sc.ok ? `${sc.current.clicks} clicks from ${sc.current.impressions} impressions` : '';

  await transport.sendMail({
    from: process.env.NOTIFY_FROM ?? process.env.SMTP_USER,
    to: process.env.NOTIFY_TO,
    subject: `Backdrop — ${win.current.start} to ${win.current.end}`,
    text: [
      `${DAYS} days on Backdrop, ${win.current.start} to ${win.current.end}.`,
      '',
      headline,
      search,
      '',
      'The detail is in the attached PDF.',
    ]
      .filter(Boolean)
      .join('\n'),
    attachments: [{ filename: `backdrop-${win.current.end}.pdf`, path: pdfPath }],
  });

  return true;
}

const data = await gather(DAYS);

// A short line in the job log, so a run that produced a thin report says why
// without anyone opening the PDF.
for (const [name, source] of [
  ['analytics', data.ga],
  ['search console', data.sc],
  ['bing', data.bing],
]) {
  console.log(`${name.padEnd(15)} ${source.ok ? 'ok' : `SKIPPED — ${source.why}`}`);
}

const html = renderReport(data);

const htmlOut = flag('--html');
if (typeof htmlOut === 'string') {
  await writeFile(htmlOut, html);
  console.log(`wrote ${htmlOut}`);
  process.exit(0);
}

const pdfOut = typeof flag('--pdf') === 'string' ? flag('--pdf') : `backdrop-${data.window.current.end}.pdf`;
await toPdf(html, pdfOut);
console.log(`wrote ${pdfOut}`);

if (flag('--pdf')) process.exit(0);

const sent = await email(pdfOut, data);
console.log(sent ? 'emailed' : 'not emailed');
