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
  // Everything under the blog's image folder, since 20 September.
  //
  // scripts/strip-blog-images.mjs deletes img/blog from the build output, and
  // vercel.json rewrites /img/blog/* to jsDelivr, which serves it straight out
  // of this repository's main branch. A deployment does not contain a single
  // one of these files, so a commit that only touches them changes nothing a
  // deployment could carry. The story frames, the social cards and the blog's
  // link preview (og-cover.jpg) all live here; on the first days of October
  // they were still triggering builds, and together with the ledger commit
  // that followed each of them they made two thirds of the deployments that
  // filled the storage again.
  //
  // The one thing derived from these files at build time is the WebP card
  // thumbnail of each article's cover. A cover replaced after publication
  // keeps its old thumbnail until the next build, which the next publication
  // brings within hours.
  /^public\/img\/blog\//,
];

const ARTICLE = /^src\/content\/blog\/(.+)\.md$/;

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
