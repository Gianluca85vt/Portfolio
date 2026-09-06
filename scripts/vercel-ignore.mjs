/**
 * Decides whether a push is worth a deployment.
 *
 *   exit 0 -> skip the build
 *   exit 1 -> build
 *
 * Wired in through `ignoreCommand` in vercel.json. Vercel's convention is
 * inverted from the usual: zero means "ignore this one".
 *
 * The free plan gives ten gigabytes of deployment storage across every project
 * on the account, and every deployment keeps its own build output. This
 * repository pushes about two dozen times a day and the site carries eighty
 * megabytes of article artwork, so it filled that in a fortnight.
 *
 * Most of those pushes changed nothing anybody can see. Of twenty consecutive
 * deployments on 5 September, four altered the published site. The rest were
 * feed harvests, the social ledger, cards drawn for Instagram, and drafts — and
 * a draft is invisible by definition, because the site is built from
 * `!data.draft`.
 *
 * When in doubt this builds. A missed deployment is a stale site; a wasted one
 * is only storage — and that is also what happens if this file throws, since an
 * uncaught exception exits 1. It cannot fail closed.
 */
import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

/** Paths that cannot change what a visitor sees. */
const INERT = [
  /^notes\//,
  /^\.github\//,
  /^scripts\//,
  /^README/,
  /^\.gitignore$/,
  /^\.env\.example$/,
  // Drawn for Instagram, never rendered by the site.
  //
  // The story frames next to these are NOT inert, though they look it: the
  // evening email links them as /img/blog/digest/<day>-story-NN.jpg, so they
  // have to be deployed or he opens the mail to five broken images.
  /^public\/img\/blog\/[^/]+\/social\.jpg$/,
];

const ARTICLE = /^src\/content\/blog\/(.+)\.md$/;
const ASSET = /^public\/img\/blog\/([^/]+)\//;

function git(...args) {
  return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
}

/**
 * The commit this push is measured against.
 *
 * Not HEAD^. Vercel exposes VERCEL_GIT_PREVIOUS_SHA — the last deployment that
 * actually built — and that is the only correct baseline once builds start
 * being skipped. Push three commits at once, a component edit followed by two
 * feed harvests, and HEAD^ sees nothing but harvests: the component change
 * would be skipped and never deploy at all. The previous deployed SHA spans
 * every commit since the site last changed, however many were ignored.
 *
 * Returns null when no baseline can be established, which means build.
 */
function resolveBase() {
  const have = (ref) => {
    try {
      git('rev-parse', '--verify', `${ref}^{commit}`);
      return true;
    } catch {
      return false;
    }
  };

  const previous = process.env.VERCEL_GIT_PREVIOUS_SHA?.trim();
  if (previous) {
    if (have(previous)) return previous;
    // Shallow clone: ask the remote for that one object.
    try {
      git('fetch', '--depth=1', 'origin', previous);
      if (have(previous)) return previous;
    } catch {
      /* fall through to HEAD^ */
    }
  }

  if (have('HEAD^')) return 'HEAD^';
  try {
    git('fetch', '--deepen', '2');
  } catch {
    /* offline, or already complete */
  }
  return have('HEAD^') ? 'HEAD^' : null;
}

/**
 * Whether an article is on the site at a given commit.
 *
 * Absent counts as unpublished, which covers a file that does not exist on that
 * side of the diff yet.
 */
function published(slug, sha, cache) {
  const key = `${sha}:${slug}`;
  if (cache.has(key)) return cache.get(key);
  let out;
  try {
    out = !/^draft:\s*true\s*$/m.test(git('show', `${sha}:src/content/blog/${slug}.md`));
  } catch {
    out = null; // no such article at this commit
  }
  cache.set(key, out);
  return out;
}

/**
 * A markdown file under the blog only matters if it is published, or just was.
 *
 * Adding a draft changes nothing on the site. Neither does revising one. What
 * matters is the moment `draft: true` disappears, which reads as the flag being
 * set on one side of the diff and not the other.
 */
function articleMatters(slug, base, head, cache) {
  const after = published(slug, head, cache);
  if (after === true) return true;   // published, or just became published
  if (after === false) return false; // still a draft
  return published(slug, base, cache) === true; // deleted: only matters if it was live
}

/**
 * Artwork is only visible if its article is.
 *
 * This is where most of the waste was. Every draft arrives with a placeholder
 * cover, and the image-fetch step that follows adds four screenshots and a
 * credit file — nine or ten megabytes of assets for a piece the build does not
 * render, because the site is generated from `!data.draft`. Three deployments
 * per article before a word of it was public.
 */
function assetMatters(slug, base, head, cache) {
  const after = published(slug, head, cache);
  if (after !== null) return after; // an article owns this folder: follow it

  // No article by that name on either side. Nineteen live pieces point at
  // folders like covers/, editorial/ and marvel-tokon/ that were never named
  // after a slug, so "no article" cannot mean "invisible" — it means shared
  // artwork, and shared artwork ships.
  return published(slug, base, cache) !== false;
}

/**
 * @returns {{build: boolean, why: string, files: string[], reasons: string[]}}
 */
export function decide(base = 'HEAD^', head = 'HEAD') {
  let files;
  try {
    files = git('diff', '--name-only', base, head).split('\n').filter(Boolean);
  } catch {
    return { build: true, why: 'cannot diff against the previous commit', files: [], reasons: [] };
  }

  if (files.length === 0) {
    return { build: false, why: 'nothing changed', files, reasons: [] };
  }

  const cache = new Map();
  const reasons = [];
  for (const f of files) {
    if (INERT.some((re) => re.test(f))) continue;

    const article = f.match(ARTICLE);
    if (article) {
      if (articleMatters(article[1], base, head, cache)) reasons.push(f);
      continue;
    }

    const asset = f.match(ASSET);
    if (asset) {
      if (assetMatters(asset[1], base, head, cache)) reasons.push(f);
      continue;
    }

    reasons.push(f);
  }

  return reasons.length
    ? { build: true, why: `${reasons.length} of ${files.length} changed file(s) reach the site`, files, reasons }
    : { build: false, why: `${files.length} file(s) changed, none visible on the site`, files, reasons };
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const base = resolveBase();

  if (base === null) {
    console.log('Building: nothing to compare this push against.');
    process.exit(1);
  }

  const { build, why, files, reasons } = decide(base, 'HEAD');
  console.log(`${build ? 'Building' : 'Skipping'}: ${why} (against ${base}).`);
  for (const f of (build ? reasons : files).slice(0, 8)) console.log(`  ${f}`);
  process.exit(build ? 1 : 0);
}
