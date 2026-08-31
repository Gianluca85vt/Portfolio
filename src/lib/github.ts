import { env } from './env';

/**
 * The blog lives in Git, not in a database, so approving a draft means making a
 * commit. This is the smallest slice of the GitHub contents API needed to read,
 * rewrite and delete a single file.
 *
 * Reads work without a token because the repository is public. Only the write
 * paths need GITHUB_TOKEN, so a missing token degrades to "you can still be
 * notified, you just cannot act from the email" rather than breaking outright.
 */

const OWNER = 'Gianluca85vt';
const REPO = 'Portfolio';
const API = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;

function headers(withAuth: boolean) {
  const h: Record<string, string> = {
    accept: 'application/vnd.github+json',
    'user-agent': 'gianlucascattarella.it',
  };
  const token = env('GITHUB_TOKEN');
  if (withAuth && token) h.authorization = `Bearer ${token}`;
  return h;
}

export function canWrite() {
  return Boolean(env('GITHUB_TOKEN'));
}

export async function readFile(path: string) {
  const res = await fetch(`${API}/${path}`, { headers: headers(true) });
  if (!res.ok) return null;

  const json = (await res.json()) as { content?: string; sha?: string };
  if (!json.content || !json.sha) return null;

  // The API returns base64 with newlines in it, which atob will not accept.
  const decoded = new TextDecoder().decode(
    Uint8Array.from(atob(json.content.replace(/\n/g, '')), (c) => c.charCodeAt(0))
  );
  return { text: decoded, sha: json.sha };
}

async function writeFile(path: string, text: string, sha: string, message: string) {
  const body = Uint8Array.from(new TextEncoder().encode(text));
  let binary = '';
  for (const byte of body) binary += String.fromCharCode(byte);

  const res = await fetch(`${API}/${path}`, {
    method: 'PUT',
    headers: { ...headers(true), 'content-type': 'application/json' },
    body: JSON.stringify({ message, content: btoa(binary), sha }),
  });
  return res.ok;
}

export async function deleteFile(path: string, sha: string, message: string) {
  const res = await fetch(`${API}/${path}`, {
    method: 'DELETE',
    headers: { ...headers(true), 'content-type': 'application/json' },
    body: JSON.stringify({ message, sha }),
  });
  return res.ok;
}

export type PublishRefusal = { ok: false; why: string };

/**
 * Does a path exist in the repository, without downloading it.
 *
 * Deliberately not readFile: that returns null when the contents API omits the
 * body, which it does for anything over a megabyte — so a large cover would
 * read as missing and be refused for existing. The metadata comes back either
 * way, so a sha is the honest test.
 */
async function fileExists(path: string) {
  const res = await fetch(`${API}/${path}`, { headers: headers(true) });
  if (!res.ok) return false;
  const json = (await res.json()) as { sha?: string; type?: string };
  return Boolean(json.sha) && json.type !== 'dir';
}

/**
 * The build's rules, checked before the commit rather than after.
 *
 * Publishing commits straight to main without building, so anything the content
 * schema rejects becomes a failed production deployment — and since one bad
 * entry fails the whole build, it takes every other page's deploy down with it.
 * That happened on 31 August: an article approved with the drawn placeholder
 * still on it stopped the site deploying until the artwork was sourced.
 *
 * Three doors reach main this way — the approve link, the CMS publish action,
 * and an admin saving without `draft: true` — and one rule written three times
 * is one rule that will diverge. All three call this.
 *
 * Returns the reason to refuse, or null to go ahead.
 */
export async function publishRefusal(text: string): Promise<string | null> {
  const cover = /^cover:\s*(.+)$/m.exec(text)?.[1]?.trim().replace(/^["']|["']$/g, '');

  if (!cover) {
    return 'This one has no cover at all. Ask for a revision and the next run will source one.';
  }

  if (cover.endsWith('.svg')) {
    return (
      'This one still has the drawn placeholder as its cover, and a published article needs a real image. ' +
      'Publishing it would fail the build and stop the whole site deploying. Ask for a revision, or add the ' +
      'artwork first — it stays here waiting either way.'
    );
  }

  // Naming a file is not having one. A draft can carry `cover.jpg` while only
  // the .svg was ever written, which passes an extension check and ships a
  // broken image to the card, the share preview and every social post.
  if (!(await fileExists(`public${cover}`))) {
    return (
      `The cover this names is not in the repository: public${cover}. ` +
      'Publishing it would fail the build. Ask for a revision so the artwork gets fetched.'
    );
  }

  return null;
}

export async function publishDraft(slug: string): Promise<true | false | PublishRefusal> {
  const path = `src/content/blog/${slug}.md`;
  const file = await readFile(path);
  if (!file) return false;
  if (!/^draft:\s*true\s*$/m.test(file.text)) return false;

  const why = await publishRefusal(file.text);
  if (why) return { ok: false, why };

  const published = file.text.replace(/^draft:\s*true\s*\r?\n/m, '');
  return writeFile(path, published, file.sha, `Publish ${slug}`);
}

export async function discardDraft(slug: string) {
  const path = `src/content/blog/${slug}.md`;
  const file = await readFile(path);
  if (!file) return false;
  // Refuse to delete anything already live: this link must never be able to
  // take a published article off the site.
  if (!/^draft:\s*true\s*$/m.test(file.text)) return false;

  return deleteFile(path, file.sha, `Discard draft ${slug}`);
}

/**
 * Revision requests are dropped into the repository rather than acted on here.
 * The scheduled writer picks them up on its next run, which keeps the rewriting
 * where the research tools are.
 */
export async function requestRevision(slug: string, instruction: string) {
  const path = `notes/revision-requests/${slug}.md`;
  const existing = await readFile(path);
  const stamp = new Date().toISOString();
  const text =
    (existing?.text ? existing.text + '\n' : `# Revision requests for ${slug}\n\n`) +
    `## ${stamp}\n\n${instruction.trim()}\n`;

  const body = Uint8Array.from(new TextEncoder().encode(text));
  let binary = '';
  for (const byte of body) binary += String.fromCharCode(byte);

  const res = await fetch(`${API}/${path}`, {
    method: 'PUT',
    headers: { ...headers(true), 'content-type': 'application/json' },
    body: JSON.stringify({
      message: `Revision requested for ${slug}`,
      content: btoa(binary),
      ...(existing ? { sha: existing.sha } : {}),
    }),
  });
  return res.ok;
}

/** Confirms a slug really is an unpublished draft before we email about it. */
export async function isDraft(slug: string) {
  if (!/^[a-z0-9-]{3,120}$/.test(slug)) return null;
  const file = await readFile(`src/content/blog/${slug}.md`);
  if (!file || !/^draft:\s*true\s*$/m.test(file.text)) return null;

  const field = (name: string) =>
    new RegExp(`^${name}:\\s*(.+)$`, 'm').exec(file.text)?.[1]?.trim() ?? '';

  return {
    title: field('title'),
    category: field('category'),
    excerpt: field('excerpt'),
    // The review email shows this, so the answer to "does it have artwork?"
    // arrives with the decision rather than after clicking Publish.
    cover: field('cover').replace(/^["']|["']$/g, ''),
  };
}
