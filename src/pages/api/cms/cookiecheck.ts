import type { APIRoute } from 'astro';

export const prerender = false;

/**
 * Three questions a browser can only answer about itself.
 *
 * A sign-in that authenticates and then forgets means the cookie is refused
 * somewhere between the response and the next request, and from the server
 * every case looks identical. This sets an ordinary, readable cookie and
 * reports what came back, so the failure can be located rather than guessed.
 */
export const GET: APIRoute = async ({ request, url }) => {
  const raw = request.headers.get('cookie') ?? '';
  const names = raw.split(/;\s*/).map((c) => c.split('=')[0]).filter(Boolean);

  const host = request.headers.get('host') ?? url.host;
  const onSite = /(^|\.)gianlucascattarella\.it$/.test(host.split(':')[0]);
  const domain = onSite ? ' Domain=gianlucascattarella.it;' : '';
  const secure = url.protocol === 'https:' ? ' Secure;' : '';

  const body = {
    host,
    cookieNamesReceived: names,
    sawServerTest: names.includes('cms_cookietest'),
    sawSession: names.includes('cms_session'),
    totalCookies: names.length,
  };

  // Deliberately not HttpOnly: the page needs to read it to tell whether the
  // browser stored it at all, which is the whole point of the test.
  return new Response(JSON.stringify(body, null, 1), {
    headers: {
      'content-type': 'application/json',
      'cache-control': 'no-store',
      'set-cookie': `cms_cookietest=ok; Path=/;${domain}${secure} SameSite=Lax; Max-Age=120`,
    },
  });
};
