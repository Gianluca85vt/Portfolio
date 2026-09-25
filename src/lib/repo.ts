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
 * The blob sha of a path at a given commit, or null when the path does not
 * exist there. Anything other than a clean "not found" throws, so a rate limit
 * or an outage can never read as "unchanged".
 */
async function blobShaAt(path: string, ref: string): Promise<string | null> {
  const encoded = path.replace(/^\/+/, '').split('/').map(encodeURIComponent).join('/');
  const res = await fetch(`${BASE}/contents/${encoded}?ref=${encodeURIComponent(ref)}`, {
    headers: headers(),
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub ${res.status} reading ${path} at ${ref.slice(0, 7)}`);
  const json = (await res.json()) as { sha?: string; type?: string };
  return json.type === 'dir' ? null : (json.sha ?? null);
}

/**
 * Commits every file in one go and returns the new commit sha.
 *
 * `expectedHeadSha` guards against two people saving the same article from two
 * tabs: pass the sha the editor started from, and the commit is refused if any
 * of the files being written changed since then. Without it the second save
 * would silently erase the first.
 *
 * Per file rather than per branch. The scheduled jobs commit to main many times
 * a day — feeds, the social ledger, cards — and refusing whenever the branch
 * moved turned every one of those into "someone else changed the repository"
 * for an editor who had touched nothing they touched.
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
      const expected = options.expectedHeadSha;
      const moved = await Promise.all(
        files.map(async (f) => (await blobShaAt(f.path, expected)) !== (await blobShaAt(f.path, headSha))),
      );
      if (moved.some(Boolean)) {
        return {
          error:
            'Someone else changed this article while you were writing. Reload it and reapply your edit.',
        };
      }
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

/**
 * A file's text at an exact commit.
 *
 * By sha, never by branch name. raw.githubusercontent.com caches a branch path
 * for about five minutes, so reading `main/...` just after a save returned the
 * text from before it — paired with a fresh head sha, which let the lock above
 * pass and the next save quietly put the old text back. Content at a sha never
 * changes, so there is nothing stale to serve.
 */
function rawUrl(path: string, ref: string) {
  return `https://raw.githubusercontent.com/${OWNER}/${REPO}/${ref}/${path}`;
}

export async function listArticles(): Promise<
  { articles: ArticleSummary[]; head: string | null } | { error: string }
> {
  try {
    // One sha for the tree and for every file read from it, so the list and
    // the head handed to the editor describe the same moment.
    const head = await headSha();
    const ref = head ?? BRANCH;
    const tree = await api(`/git/trees/${ref}?recursive=1`);
    const entries: { path: string; size: number }[] = (tree.tree ?? []).filter(
      (t: { path: string; type: string }) =>
        t.type === 'blob' && t.path.startsWith('src/content/blog/') && t.path.endsWith('.md'),
    );

    // The tree gives paths and sizes but not content, so frontmatter comes from
    // the raw host — unauthenticated, and not counted against the API rate limit.
    const out = await Promise.all(
      entries.map(async (e) => {
        const slug = e.path.replace('src/content/blog/', '').replace(/\.md$/, '');
        const res = await fetch(rawUrl(e.path, ref), { headers: { 'user-agent': 'gianlucascattarella.it' } });
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

    return { articles: out.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)), head };
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Could not read the repository.' };
  }
}

/**
 * An article's text, together with the sha it was read at — which is the sha
 * to hand back as `expectedHeadSha` when saving it.
 */
export async function readArticle(
  slug: string,
): Promise<{ text: string; head: string | null } | { error: string }> {
  if (!/^[a-z0-9][a-z0-9-]{1,120}$/.test(slug)) return { error: 'That slug is not valid.' };

  const head = await headSha();
  const res = await fetch(rawUrl(`src/content/blog/${slug}.md`, head ?? BRANCH), {
    headers: { 'user-agent': 'gianlucascattarella.it' },
  });
  if (!res.ok) return { error: `No article called ${slug}.` };
  return { text: await res.text(), head };
}
