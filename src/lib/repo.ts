import { env } from './env';
import { OWNER, REPO } from './github';

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
  options: {
    author?: { name: string; email: string };
    expectedHeadSha?: string;
    /** Paths to delete in the same commit. */
    remove?: string[];
    /** Which paths the lock checks; every written and removed path by default. */
    lockPaths?: string[];
  } = {},
): Promise<{ sha: string } | { error: string }> {
  if (!canCommit()) return { error: 'No GITHUB_TOKEN is configured, so nothing can be written.' };
  const remove = (options.remove ?? []).map((p) => p.replace(/^\/+/, ''));
  if (!files.length && !remove.length) return { error: 'Nothing to commit.' };

  try {
    const ref = await api(`/git/ref/heads/${BRANCH}`);
    const headSha: string = ref.object.sha;

    if (options.expectedHeadSha && options.expectedHeadSha !== headSha) {
      const expected = options.expectedHeadSha;
      const paths = options.lockPaths ?? [...files.map((f) => f.path), ...remove];
      const moved = await Promise.all(
        paths.map(async (p) => (await blobShaAt(p, expected)) !== (await blobShaAt(p, headSha))),
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

    // A tree entry with a null sha removes that path from the base tree.
    const removals = remove.map((path) => ({ path, mode: '100644', type: 'blob', sha: null }));

    const tree = await api('/git/trees', {
      method: 'POST',
      body: JSON.stringify({ base_tree: headCommit.tree.sha, tree: [...blobs, ...removals] }),
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

/**
 * Everything a draft brought with it, as paths that exist at `ref`: the
 * article, its image folder (fetched shots, the drawn cover, the social card),
 * and the notes the writer left beside it — the image request, the social kit,
 * revision requests, and the Monday editorial's video script and plates.
 * Deleting a draft takes all of it, so nothing is left pointing at an article
 * that no longer exists.
 */
export async function draftFiles(slug: string, ref: string): Promise<string[]> {
  const listDir = async (dir: string) => {
    const res = await fetch(`${BASE}/contents/${dir}?ref=${encodeURIComponent(ref)}`, { headers: headers() });
    if (res.status === 404) return [];
    if (!res.ok) throw new Error(`GitHub ${res.status} listing ${dir}`);
    const entries = (await res.json()) as { path: string; type: string }[];
    return Array.isArray(entries) ? entries.filter((e) => e.type === 'file').map((e) => e.path) : [];
  };
  const single = [
    `src/content/blog/${slug}.md`,
    `notes/image-requests/${slug}.json`,
    `notes/social/${slug}.md`,
    `notes/linkedin/${slug}.md`,
    `notes/revision-requests/${slug}.md`,
    `notes/video/${slug}.script.md`,
    `notes/video/${slug}.graphics.json`,
  ];
  const present = await Promise.all(single.map(async (p) => ((await blobShaAt(p, ref)) ? p : null)));
  const [images, plates] = await Promise.all([listDir(`public/img/blog/${slug}`), listDir(`notes/video/${slug}`)]);
  return [...present.filter((p): p is string => Boolean(p)), ...images, ...plates];
}

/**
 * Deletes a draft and everything it brought (see draftFiles) in one commit.
 * Used by the backend's Delete button and by the review email's Delete link.
 *
 * Drafts only, checked against the text on main right now rather than as the
 * caller last saw it, and locked to that sha: a draft published in the seconds
 * between reading and committing is refused, so this can never take a live
 * article off the site. Not locked on the image folder, which the image
 * workflow may add to in the meantime.
 */
export async function deleteDraft(
  slug: string,
  author?: { name: string; email: string },
): Promise<{ removed: number; sha: string } | { error: string; status: number }> {
  if (!canCommit()) return { error: 'No GITHUB_TOKEN is configured, so nothing can be written.', status: 503 };
  const found = await readArticle(slug);
  if ('error' in found) return { error: found.error, status: 404 };
  if (!/^draft:\s*true\s*$/m.test(found.text)) {
    return { error: 'That article is published. Only drafts can be deleted.', status: 409 };
  }
  if (!found.head) return { error: 'Could not read the repository. Try again in a moment.', status: 502 };

  let paths: string[];
  try {
    paths = await draftFiles(slug, found.head);
  } catch (err) {
    return { error: err instanceof Error ? err.message : 'Could not list the draft’s files.', status: 502 };
  }

  const done = await commitFiles([], `Delete draft ${slug}`, {
    author,
    remove: paths,
    expectedHeadSha: found.head,
    lockPaths: [`src/content/blog/${slug}.md`],
  });
  return 'error' in done ? { error: done.error, status: 502 } : { removed: paths.length, sha: done.sha };
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
