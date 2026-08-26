import type { APIRoute } from 'astro';
import { readCmsSession } from '../../../lib/session';
import { findEditorById } from '../../../lib/accounts';
import { commitFiles, headSha, listArticles, readArticle, canCommit } from '../../../lib/repo';
import type { FileWrite } from '../../../lib/repo';
import type { Editor } from '../../../lib/accounts';

export const prerender = false;

/**
 * Reading and writing articles from the backend.
 *
 * Everything is scoped hard: a request may only touch src/content/blog/<slug>.md
 * and public/img/blog/<slug>/. The slug is validated against a strict pattern
 * before it is ever concatenated into a path, because these strings arrive from
 * a browser and end up in a commit.
 *
 * Roles are checked here rather than in the interface. Hiding a button stops
 * nobody; refusing the request does.
 */

const SLUG = /^[a-z0-9][a-z0-9-]{1,120}$/;
const MAX_ARTICLE_BYTES = 300_000;
const MAX_IMAGE_BYTES = 6_000_000;
const MAX_IMAGES = 8;

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  });

async function requireEditor(request: Request): Promise<Editor | Response> {
  const session = await readCmsSession(request);
  if (!session) return json({ error: 'Sign in first.' }, 401);

  // The cookie carries the role, but an account disabled since sign-in must
  // stop working immediately rather than at the end of its twelve hours.
  const editor = await findEditorById(session.id);
  if (!editor || editor.disabled) return json({ error: 'That account is not active.' }, 403);

  return editor;
}

export const GET: APIRoute = async ({ request, url }) => {
  const editor = await requireEditor(request);
  if (editor instanceof Response) return editor;

  const slug = url.searchParams.get('slug');

  if (slug) {
    if (!SLUG.test(slug)) return json({ error: 'That slug is not valid.' }, 400);
    const found = await readArticle(slug);
    if ('error' in found) return json(found, 404);
    return json({ slug, text: found.text, head: await headSha() });
  }

  const all = await listArticles();
  if ('error' in all) return json(all, 502);

  return json({
    articles: all,
    role: editor.role,
    name: editor.display_name,
    canCommit: canCommit(),
    head: await headSha(),
  });
};

export const POST: APIRoute = async ({ request }) => {
  const editor = await requireEditor(request);
  if (editor instanceof Response) return editor;

  if (!canCommit()) return json({ error: 'No GITHUB_TOKEN is configured, so nothing can be saved.' }, 503);

  let payload: {
    action?: string;
    slug?: string;
    text?: string;
    images?: { name: string; dataBase64: string }[];
    head?: string;
  };
  try {
    payload = await request.json();
  } catch {
    return json({ error: 'Malformed request.' }, 400);
  }

  const action = String(payload.action ?? 'save');
  const slug = String(payload.slug ?? '');
  if (!SLUG.test(slug)) return json({ error: 'The address must be lowercase letters, numbers and hyphens.' }, 400);

  const author = { name: editor.display_name, email: editor.email };

  /* -------------------------------------------------------------- publish */

  if (action === 'publish') {
    if (editor.role !== 'admin') {
      return json({ error: 'Only an admin can publish. Save it and it will go into the review queue.' }, 403);
    }

    const found = await readArticle(slug);
    if ('error' in found) return json(found, 404);
    if (!/^draft:\s*true\s*$/m.test(found.text)) return json({ error: 'That article is already published.' }, 409);

    const text = found.text.replace(/^draft:\s*true\s*\r?\n/m, '');
    const done = await commitFiles(
      [{ path: `src/content/blog/${slug}.md`, content: text }],
      `Publish ${slug}`,
      { author },
    );
    return 'error' in done ? json(done, 502) : json({ ok: true, sha: done.sha });
  }

  /* ----------------------------------------------------------------- save */

  const text = String(payload.text ?? '');
  if (!text.trim()) return json({ error: 'The article is empty.' }, 400);
  if (Buffer.byteLength(text, 'utf8') > MAX_ARTICLE_BYTES) return json({ error: 'That article is too long.' }, 413);
  if (!/^---\r?\n[\s\S]*?\r?\n---/.test(text)) return json({ error: 'The frontmatter block is missing.' }, 400);

  // An editor may only ever write drafts. Enforced on the text itself, so it
  // holds however the interface behaves.
  const isDraft = /^draft:\s*true\s*$/m.test(text);
  if (editor.role !== 'admin' && !isDraft) {
    return json({ error: 'Editors save drafts. Leave "draft: true" in place and an admin will publish it.' }, 403);
  }

  const files: FileWrite[] = [{ path: `src/content/blog/${slug}.md`, content: text }];

  const images = Array.isArray(payload.images) ? payload.images : [];
  if (images.length > MAX_IMAGES) return json({ error: `At most ${MAX_IMAGES} images per save.` }, 413);

  for (const img of images) {
    const name = String(img?.name ?? '');
    if (!/^[a-z0-9][a-z0-9._-]{0,80}\.(jpg|jpeg|png|webp|svg)$/i.test(name)) {
      return json({ error: `"${name}" is not an allowed image name.` }, 400);
    }
    const b64 = String(img?.dataBase64 ?? '').replace(/^data:[^,]+,/, '');
    if (!b64) return json({ error: `"${name}" arrived empty.` }, 400);
    // base64 carries about 3 bytes per 4 characters.
    if ((b64.length * 3) / 4 > MAX_IMAGE_BYTES) return json({ error: `"${name}" is over 6MB.` }, 413);

    files.push({
      path: `public/img/blog/${slug}/${name.toLowerCase()}`,
      content: b64,
      encoding: 'base64',
    });
  }

  const summary =
    images.length > 0
      ? `${isDraft ? 'Draft' : 'Update'}: ${slug} (+${images.length} image${images.length > 1 ? 's' : ''})`
      : `${isDraft ? 'Draft' : 'Update'}: ${slug}`;

  const done = await commitFiles(files, summary, {
    author,
    expectedHeadSha: payload.head ? String(payload.head) : undefined,
  });

  return 'error' in done ? json(done, 409) : json({ ok: true, sha: done.sha, draft: isDraft });
};
