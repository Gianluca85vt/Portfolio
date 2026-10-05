/**
 * Posts a published article to Bluesky.
 *
 * Bluesky is where the #b3d crowd, VFX artists and gamedevs went, and unlike X
 * its API costs nothing: an account, an app password, two HTTP calls. So every
 * article that reaches Facebook and Instagram reaches Bluesky too, as a post
 * with the headline, the summary and a link card carrying the cover.
 *
 * Needs BLUESKY_HANDLE and BLUESKY_APP_PASSWORD (an app password made in
 * Bluesky's settings, never the account password). Without them it is skipped.
 */
import { readFile, stat } from 'node:fs/promises';
import { tagged } from '../src/lib/utm.ts';

const PDS = 'https://bsky.social/xrpc';

/** Bluesky counts graphemes and allows 300. Code points are a safe stand-in for this text. */
const LIMIT = 300;

/** A couple of tags the reader of each section actually follows. */
const TAGS = {
  '3D': ['b3d', '3dart'],
  Games: ['gamedev'],
  Editorial: ['gamedev', 'vfx'],
  'Film & TV': ['vfx'],
  Manga: ['anime'],
  Tech: ['tech'],
  AI: ['ai'],
  Collecting: ['collecting'],
};

const len = (s) => [...s].length;

function clip(s, room) {
  if (len(s) <= room) return s;
  const cut = [...s].slice(0, Math.max(0, room - 1)).join('');
  return `${cut.replace(/\s+\S*$/, '')}…`;
}

/**
 * The post itself: text with clickable hashtags. Hashtags on Bluesky are not
 * parsed from the text; each needs a facet pointing at its bytes.
 */
export function buildPost(article) {
  const tags = (TAGS[article.category] ?? []).map((t) => `#${t}`);
  const tail = tags.length ? `\n\n${tags.join(' ')}` : '';
  const head = article.title;
  const room = LIMIT - len(head) - len(tail) - 2;
  const body = article.excerpt && room > 20 ? `\n\n${clip(article.excerpt, room)}` : '';
  const text = `${head}${body}${tail}`;

  const facets = [];
  let from = len(head) + len(body) + 2; // after the blank line before the tags
  for (const t of tags) {
    const start = Buffer.byteLength([...text].slice(0, from).join(''), 'utf8');
    const end = start + Buffer.byteLength(t, 'utf8');
    facets.push({
      index: { byteStart: start, byteEnd: end },
      features: [{ $type: 'app.bsky.richtext.facet#tag', tag: t.slice(1) }],
    });
    from += len(t) + 1;
  }
  return { text, facets };
}

async function xrpc(method, body, token, contentType = 'application/json') {
  const res = await fetch(`${PDS}/${method}`, {
    method: 'POST',
    headers: { 'content-type': contentType, ...(token ? { authorization: `Bearer ${token}` } : {}) },
    body: contentType === 'application/json' ? JSON.stringify(body) : body,
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(`${method} -> HTTP ${res.status} ${json.error ?? ''} ${json.message ?? ''}`.trim());
  return json;
}

export const blueskyConfigured = () => !!(process.env.BLUESKY_HANDLE && process.env.BLUESKY_APP_PASSWORD);

/**
 * @param article {title, excerpt, category, slug, url}
 * @param coverPath local path of the cover, for the link card; optional
 * @returns the post's at:// uri
 */
export async function postToBluesky(article, coverPath) {
  const session = await xrpc('com.atproto.server.createSession', {
    identifier: process.env.BLUESKY_HANDLE,
    password: process.env.BLUESKY_APP_PASSWORD,
  });

  // The link card's picture. Bluesky refuses blobs near a megabyte, and the
  // card is still a link without one, so a missing or heavy cover is skipped.
  let thumb;
  if (coverPath && /\.(jpe?g|png|webp)$/i.test(coverPath)) {
    try {
      if ((await stat(coverPath)).size < 950_000) {
        const type = /\.png$/i.test(coverPath) ? 'image/png' : /\.webp$/i.test(coverPath) ? 'image/webp' : 'image/jpeg';
        const up = await xrpc('com.atproto.repo.uploadBlob', await readFile(coverPath), session.accessJwt, type);
        thumb = up.blob;
      }
    } catch (err) {
      console.log(`bluesky: no card image (${err.message})`);
    }
  }

  const { text, facets } = buildPost(article);
  const created = await xrpc(
    'com.atproto.repo.createRecord',
    {
      repo: session.did,
      collection: 'app.bsky.feed.post',
      record: {
        $type: 'app.bsky.feed.post',
        text,
        facets,
        langs: ['en'],
        createdAt: new Date().toISOString(),
        embed: {
          $type: 'app.bsky.embed.external',
          external: {
            uri: tagged(article.url, 'bluesky', 'social', article.slug),
            title: article.title,
            description: article.excerpt ?? '',
            ...(thumb ? { thumb } : {}),
          },
        },
      },
    },
    session.accessJwt
  );
  return created.uri;
}
