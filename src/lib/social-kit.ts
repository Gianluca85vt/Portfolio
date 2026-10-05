/**
 * What the review email carries besides the draft itself.
 *
 * The social kit: for every draft the writer leaves notes/social/<slug>.md
 * with a LinkedIn post and an X thread, written to the growth plan of
 * 5 October — the whole argument inside the LinkedIn post (LinkedIn buries
 * posts with links), the link in the first comment, and a 4-6 post thread for
 * X that tells the technical finding in full and links only at the end. The
 * links themselves are added here, with utm tags, so they are always right.
 *
 * And the warning that the story may already be on the blog. Minecraft
 * Dungeons II was reviewed twice on consecutive days in September because
 * nothing compared a new draft with what was already published.
 *
 * Kept to TypeScript Node can run with its types stripped, so the tests in
 * /scripts import it directly.
 */

export type SocialKit = { linkedin?: string; x?: string[] };

/**
 * `## LinkedIn` and `## X` sections, in any order. A file with no headings at
 * all is the older notes/linkedin/<slug>.md, a LinkedIn post and nothing else.
 */
export function parseSocialKit(md: string): SocialKit {
  const text = md.replace(/\r\n?/g, '\n').trim();
  if (!text) return {};
  if (!/^##\s+/m.test(text)) return { linkedin: text };

  const out: SocialKit = {};
  const parts = text.split(/^##\s+(.+)$/m);
  // split() with a capture group gives [before, heading, body, heading, body…]
  for (let i = 1; i < parts.length; i += 2) {
    const name = (parts[i] ?? '').trim().toLowerCase();
    const body = (parts[i + 1] ?? '').trim();
    if (!body) continue;
    if (name.startsWith('linkedin')) out.linkedin = body;
    else if (name === 'x' || name.startsWith('x ') || name.startsWith('twitter')) {
      out.x = body
        .split(/\n\s*\n/)
        .map((p) => p.trim())
        .filter(Boolean);
    }
  }
  return out;
}

export type Related = { slug: string; title: string; date: string };

const norm = (s: string) =>
  ` ${s
    .toLowerCase()
    .replace(/[’'`]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()} `;

/** What a piece is about: the game reviewed, or the headline up to its colon. */
export function subjectOf(title: string, reviewOf?: string): string {
  if (reviewOf?.trim()) return reviewOf.trim();
  const head = title.split(/:|—/)[0] ?? title;
  return head.trim();
}

/**
 * Published pieces in the last `days` whose headline names the same subject.
 * A subject of fewer than four letters ("AI") would match everything, so it
 * matches nothing.
 */
export function findRelated(
  subject: string,
  index: { slug: string; title: string; date: string }[],
  now: Date,
  days = 60,
  exclude?: string
): Related[] {
  const needle = norm(subject);
  if (needle.replace(/\s/g, '').length < 4) return [];
  const since = now.getTime() - days * 86_400_000;
  return index
    .filter((p) => p.slug !== exclude)
    .filter((p) => Date.parse(p.date) >= since)
    .filter((p) => norm(p.title).includes(needle) || norm(p.slug.replace(/-/g, ' ')).includes(needle))
    .slice(0, 3)
    .map((p) => ({ slug: p.slug, title: p.title, date: p.date.slice(0, 10) }));
}
