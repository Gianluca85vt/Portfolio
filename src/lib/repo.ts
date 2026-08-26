import { env } from './env';

/**
 * Writing several files in one commit.
 *
 * `github.ts` uses the contents API, which is one file per commit. That is
 * fine for approving a draft, and wrong for the editor: saving an article with
 * three images would make four commits and four deploys, and the page would
 * appear before the pictures it references.
 *
 * The git data API does it properly — blobs, a tree, one commit, one ref
 * update — so an article and its artwork arrive together or not at all.
 */

const OWNER = 'Gianluca85vt';
const REPO = 'Portfolio';
const BASE = `https://api.github.com/repos/${OWNER}/${REPO}`;
const BRANCH = 'main';

function headers(): Record<string, string> {
  const token = env('GITHUB_TOKEN');
  return {
    accept: 'application/vnd.github+json',
    'user-agent': 'gianlucascattarella.it',
    'content-type': 'application/json',
    ...(token ? { authorization: `Bearer ${token}` } : {}),
  };
}

export function canCommit() {
  return Boolean(env('GITHUB_TOKEN'));
}

export interface FileWrite {
  path: string;
  /** Text content, or base64 for binary. */
  content: string;
  encoding?: 'utf-8' | 'base64';
}

async function api(path: string, init?: RequestInit) {
  const res = await fetch(`${BASE}${path}`, { ...init, headers: headers() });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`GitHub ${res.status} on ${path}: ${detail.slice(0, 200)}`);
  }
  return res.json();
}

/**
 * Commits every file in one go and returns the new commit sha.
 *
 * `expectedHeadSha` guards against two people saving the same article from two
 * tabs: pass the sha the editor started from and the commit is refused if the
 * branch has moved. Without it the second save would silently erase the first.
 */
export async function commitFiles(
  files: FileWrite[],
  message: string,
  options: { author?: { name: string; email: string }; expectedHeadSha?: string } = {},
): Promise<{ sha: string } | { error: string }> {
  if (!canCommit()) return { error: 'No GITHUB_TOKEN is configured, so nothing can be written.' };
  if (!files.length) return { error: 'Nothing to commit.' };

  try {
    const ref = await api(`/git/ref/heads/${BRANCH}`);
    const headSha: string = ref.object.sha;

    if (options.expectedHeadSha && options.expectedHeadSha !== headSha) {
      return {
        error:
          'Someone else changed the repository while you were writing. Reload the article and reapply your edit.',
      };
    }

    const headCommit = await api(`/git/commits/${headSha}`);

    // Blobs first: each file becomes an object, then one tree points at all of
    // them. base64 is declared explicitly so an image is not mangled as text.
    const blobs = await Promise.all(
      files.map(async (f) => {
        const blob = await api('/git/blobs', {
          method: 'POST',
          body: JSON.stringify({ content: f.content, encoding: f.encoding ?? 'utf-8' }),
        });
        return { path: f.path.replace(/^\/+/, ''), mode: '100644', type: 'blob', sha: blob.sha };
      }),
    );

    const tree = await api('/git/trees', {
      method: 'POST',
      body: JSON.stringify({ base_tree: headCommit.tree.sha, tree: blobs }),
    });

    const commit = await api('/git/commits', {
      method: 'POST',
      body: JSON.stringify({
        message,
        tree: tree.sha,
        parents: [headSha],
        ...(options.author ? { author: options.author, committer: options.author } : {}),
      }),
    });

    await api(`/git/refs/heads/${BRANCH}`, {
      method: 'PATCH',
      body: JSON.stringify({ sha: commit.sha, force: false }),
    });

    return { sha: commit.sha as string };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'The commit failed.' };
  }
}

/** The sha the branch is currently at, for optimistic locking on save. */
export async function headSha(): Promise<string | null> {
  try {
    const ref = await api(`/git/ref/heads/${BRANCH}`);
    return ref.object.sha as string;
  } catch {
    return null;
  }
}

/**
 * Every article in the repository, read from one tree request rather than one
 * request per file. Frontmatter is parsed loosely on purpose: a malformed
 * draft should still appear in the list so it can be opened and fixed.
 */
export interface ArticleSummary {
  slug: string;
  title: string;
  date: string;
  category: string;
  draft: boolean;
  column?: string;
  score?: number;
  size: number;
}

export async function listArticles(): Promise<ArticleSummary[] | { error: string }> {
  try {
    const tree = await api(`/git/trees/${BRANCH}?recursive=1`);
    const entries: { path: string; size: number }[] = (tree.tree ?? []).filter(
      (t: { path: string; type: string }) =>
        t.type === 'blob' && t.path.startsWith('src/content/blog/') && t.path.endsWith('.md'),
    );

    // The tree gives paths and sizes but not content, so frontmatter comes from
    // the raw host — which is CDN-cached, unauthenticated and does not count
    // against the API rate limit.
    const out = await Promise.all(
      entries.map(async (e) => {
        const slug = e.path.replace('src/content/blog/', '').replace(/\.md$/, '');
        const res = await fetch(
          `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${e.path}`,
          { headers: { 'user-agent': 'gianlucascattarella.it' } },
        );
        const text = res.ok ? await res.text() : '';
        const fm = /^---\r?\n([\s\S]*?)\r?\n---/.exec(text)?.[1] ?? '';
        const field = (k: string) =>
          new RegExp(`^${k}:\\s*(.*)$`, 'm').exec(fm)?.[1]?.trim().replace(/^["']|["']$/g, '');

        return {
          slug,
          title: field('title') ?? slug,
          date: field('date') ?? '',
          category: field('category') ?? '',
          draft: /^draft:\s*true\s*$/m.test(fm),
          column: field('column'),
          score: field('score') ? Number(field('score')) : undefined,
          size: e.size,
        };
      }),
    );

    return out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Could not read the repository.' };
  }
}

export async function readArticle(slug: string): Promise<{ text: string } | { error: string }> {
  if (!/^[a-z0-9][a-z0-9-]{1,120}$/.test(slug)) return { error: 'That slug is not valid.' };

  const res = await fetch(
    `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/src/content/blog/${slug}.md`,
    { headers: { 'user-agent': 'gianlucascattarella.it' } },
  );
  if (!res.ok) return { error: `No article called ${slug}.` };
  return { text: await res.text() };
}
