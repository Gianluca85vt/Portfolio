/**
 * Draws the motion-graphic plates for the weekly video.
 *
 *   node scripts/motion-cards.mjs <slug>
 *
 * Reads notes/video/<slug>.graphics.json — a list of plates, each naming a kind
 * and its content — and writes numbered SVGs beside it. 1920x1080, transparent
 * ground, so they drop onto footage in any editor and can be scaled without
 * softening, which a PNG export at this size cannot.
 *
 * SVG rather than a rendered movie on purpose: the text stays editable. A wrong
 * figure is fixed by opening the file, not by asking for the whole plate again.
 *
 * Animation is left to the editor. Each plate is built so the obvious move is
 * the right one — bars grow from the left, numbers count up, rows reveal top to
 * bottom — and the script file says which, with timings.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const W = 1920;
const H = 1080;

const PAPER = '#F4F1F6';
const ACCENT = '#B600A8';
const VIOLET = '#7621B0';
const EMBER = '#BE4C00';
const MUTED = 'rgba(244,241,246,0.45)';

const esc = (s) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const FONT = "Kanit, 'Arial Black', sans-serif";

const frame = (body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${ACCENT}"/><stop offset="100%" stop-color="${EMBER}"/>
    </linearGradient>
  </defs>
${body}
</svg>`;

const kicker = (text, y = 150) =>
  `  <text x="120" y="${y}" font-family="${FONT}" font-size="30" font-weight="600" letter-spacing="10" fill="${ACCENT}">${esc(
    text.toUpperCase()
  )}</text>`;

/** Horizontal bars, each labelled, growing from the left. */
function bars({ title, rows, note }) {
  const max = Math.max(...rows.map((r) => r.value));
  const top = 300;
  const gap = 150;
  const barW = 1320;

  const body = rows
    .map((r, i) => {
      const y = top + i * gap;
      const w = Math.max(6, (r.value / max) * barW);
      return `  <text x="120" y="${y - 14}" font-family="${FONT}" font-size="34" font-weight="600" fill="${PAPER}">${esc(r.label)}</text>
  <rect x="120" y="${y}" width="${w}" height="46" rx="4" fill="${i === rows.length - 1 ? 'url(#accent)' : 'rgba(244,241,246,0.22)'}"/>
  <text x="${120 + w + 26}" y="${y + 36}" font-family="${FONT}" font-size="44" font-weight="800" fill="${
    i === rows.length - 1 ? PAPER : MUTED
  }">${esc(r.display ?? r.value.toLocaleString('en-GB'))}</text>`;
    })
    .join('\n');

  return frame(
    `${kicker(title)}
${body}
${note ? `  <text x="120" y="${top + rows.length * gap + 40}" font-family="${FONT}" font-size="30" fill="${MUTED}">${esc(note)}</text>` : ''}`
  );
}

/** A production timeline with one moment marked on it. */
function timeline({ title, stages, markAt, markLabel, note }) {
  const y = 520;
  const x0 = 120;
  const x1 = 1800;
  const step = (x1 - x0) / (stages.length - 1);

  const dots = stages
    .map((s, i) => {
      const x = x0 + i * step;
      const on = i >= markAt;
      return `  <circle cx="${x}" cy="${y}" r="${on ? 18 : 13}" fill="${on ? ACCENT : 'rgba(244,241,246,0.35)'}"/>
  <text x="${x}" y="${y + 70}" text-anchor="middle" font-family="${FONT}" font-size="27" fill="${
    on ? PAPER : MUTED
  }">${esc(s)}</text>`;
    })
    .join('\n');

  const markX = x0 + markAt * step;

  return frame(
    `${kicker(title)}
  <line x1="${x0}" y1="${y}" x2="${x1}" y2="${y}" stroke="rgba(244,241,246,0.28)" stroke-width="4"/>
  <line x1="${x0}" y1="${y}" x2="${markX}" y2="${y}" stroke="${VIOLET}" stroke-width="4"/>
${dots}
  <line x1="${markX}" y1="${y - 150}" x2="${markX}" y2="${y - 34}" stroke="${ACCENT}" stroke-width="4"/>
  <text x="${markX}" y="${y - 176}" text-anchor="middle" font-family="${FONT}" font-size="40" font-weight="800" fill="${ACCENT}">${esc(markLabel)}</text>
${note ? `  <text x="${x0}" y="${y + 210}" font-family="${FONT}" font-size="32" fill="${MUTED}">${esc(note)}</text>` : ''}`
  );
}

/** Beats of a single action, revealed left to right. */
function beats({ title, items, note }) {
  const y = 520;
  const x0 = 130;
  const w = 1660 / items.length;

  const body = items
    .map((label, i) => {
      const x = x0 + i * w;
      return `  <rect x="${x}" y="${y}" width="${w - 26}" height="130" rx="10" fill="rgba(244,241,246,0.08)" stroke="rgba(244,241,246,0.22)" stroke-width="2"/>
  <text x="${x + 26}" y="${y - 22}" font-family="${FONT}" font-size="30" font-weight="800" fill="${ACCENT}">${String(i + 1).padStart(2, '0')}</text>
  <text x="${x + (w - 26) / 2}" y="${y + 78}" text-anchor="middle" font-family="${FONT}" font-size="34" font-weight="600" fill="${PAPER}">${esc(label)}</text>`;
    })
    .join('\n');

  return frame(
    `${kicker(title)}
${body}
${note ? `  <text x="${x0}" y="${y + 220}" font-family="${FONT}" font-size="32" fill="${MUTED}">${esc(note)}</text>` : ''}`
  );
}

/** One sentence, held. For the line the whole piece turns on. */
function statement({ text, attribution }) {
  const words = text.split(' ');
  const lines = [];
  let line = '';
  for (const word of words) {
    if ((line + ' ' + word).trim().length > 26 && line) {
      lines.push(line);
      line = word;
    } else line = (line + ' ' + word).trim();
  }
  lines.push(line);

  const size = 86;
  const start = H / 2 - ((lines.length - 1) * size * 1.18) / 2;

  return frame(
    `  <rect x="120" y="${start - 130}" width="96" height="8" fill="url(#accent)"/>
${lines
  .map(
    (l, i) =>
      `  <text x="120" y="${start + i * size * 1.18}" font-family="${FONT}" font-size="${size}" font-weight="800" fill="${PAPER}">${esc(l)}</text>`
  )
  .join('\n')}
${attribution ? `  <text x="120" y="${start + lines.length * size * 1.18 + 30}" font-family="${FONT}" font-size="30" fill="${MUTED}">${esc(attribution)}</text>` : ''}`
  );
}

/**
 * Two columns saying the same thing from either side. Built for the argument
 * this whole series keeps returning to: an intention and a defect look
 * identical once they are only a frame.
 */
function compare({ title, left, right, rows, note }) {
  const top = 320;
  const gap = 108;
  const midX = 980;

  const head = `  <text x="120" y="${top - 92}" font-family="${FONT}" font-size="32" font-weight="800" letter-spacing="6" fill="${PAPER}">${esc(
    left.toUpperCase()
  )}</text>
  <text x="${midX + 60}" y="${top - 92}" font-family="${FONT}" font-size="32" font-weight="800" letter-spacing="6" fill="${EMBER}">${esc(
    right.toUpperCase()
  )}</text>
  <line x1="${midX}" y1="${top - 136}" x2="${midX}" y2="${top + rows.length * gap - 40}" stroke="rgba(244,241,246,0.2)" stroke-width="2"/>`;

  const body = rows
    .map((r, i) => {
      const y = top + i * gap;
      return `  <text x="120" y="${y}" font-family="${FONT}" font-size="34" fill="${PAPER}">${esc(r[0])}</text>
  <text x="${midX + 60}" y="${y}" font-family="${FONT}" font-size="34" fill="rgba(244,241,246,0.55)">${esc(r[1])}</text>`;
    })
    .join('\n');

  return frame(
    `${kicker(title)}
${head}
${body}
${note ? `  <text x="120" y="${top + rows.length * gap + 50}" font-family="${FONT}" font-size="32" font-weight="600" fill="${ACCENT}">${esc(note)}</text>` : ''}`
  );
}

/**
 * A name strap for the lower third. Sits in the bottom-left safe area so it
 * clears the YouTube scrubber, and slides in from the left edge.
 */
function lower({ name, role, handle }) {
  const y = 850;
  return frame(
    `  <rect x="120" y="${y - 58}" width="10" height="${handle ? 148 : 104}" fill="url(#accent)"/>
  <text x="160" y="${y}" font-family="${FONT}" font-size="60" font-weight="800" fill="${PAPER}">${esc(name)}</text>
  <text x="160" y="${y + 48}" font-family="${FONT}" font-size="32" font-weight="600" letter-spacing="3" fill="${ACCENT}">${esc(
    role
  )}</text>
${handle ? `  <text x="160" y="${y + 92}" font-family="${FONT}" font-size="28" fill="${MUTED}">${esc(handle)}</text>` : ''}`
  );
}

const KINDS = { bars, timeline, beats, statement, compare, lower };

const slug = process.argv[2];
if (!slug) {
  console.error('usage: node scripts/motion-cards.mjs <slug>');
  process.exit(1);
}

const dir = join('notes/video', slug);
const plates = JSON.parse(await readFile(join('notes/video', `${slug}.graphics.json`), 'utf8'));
await mkdir(dir, { recursive: true });

for (const [i, plate] of plates.entries()) {
  const draw = KINDS[plate.kind];
  if (!draw) {
    console.error(`  unknown plate kind: ${plate.kind}`);
    continue;
  }
  const name = `${String(i + 1).padStart(2, '0')}-${plate.id}.svg`;
  await writeFile(join(dir, name), draw(plate));
  console.log(`  ${name}  (${plate.kind})`);
}

console.log(`\n${plates.length} plates in ${dir}`);
