/**
 * Read-only check that the three Meta secrets are the right three values.
 * Publishes nothing, changes nothing, and prints no secret — only the names
 * that come back, which is what proves the token reaches the right accounts.
 *
 *   node scripts/social-check.mjs
 *
 * Run this once after setting the secrets, rather than finding out that one of
 * them is wrong on the evening an article is waiting to go out.
 */
const GRAPH = 'https://graph.facebook.com/v26.0';

const token = process.env.META_PAGE_TOKEN;
const pageId = process.env.META_PAGE_ID;
const igId = process.env.META_IG_USER_ID;

let failed = false;

function report(label, ok, detail) {
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${label.padEnd(26)} ${detail}`);
  if (!ok) failed = true;
}

async function get(path, fields) {
  const qs = new URLSearchParams({ fields, access_token: token });
  const res = await fetch(`${GRAPH}/${path}?${qs}`);
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(json.error?.message ?? `HTTP ${res.status}`);
  return json;
}

for (const [name, value] of Object.entries({ META_PAGE_ID: pageId, META_IG_USER_ID: igId, META_PAGE_TOKEN: token })) {
  report(name, Boolean(value), value ? 'set' : 'MISSING — add it in repository secrets');
}

if (!failed) {
  try {
    const page = await get(pageId, 'name,link,fan_count');
    report('Facebook Page', true, `${page.name} — ${page.fan_count ?? '?'} followers`);
  } catch (err) {
    report('Facebook Page', false, err.message);
  }

  try {
    const ig = await get(igId, 'username,followers_count');
    report('Instagram account', true, `@${ig.username} — ${ig.followers_count ?? '?'} followers`);
  } catch (err) {
    report('Instagram account', false, err.message);
  }

  // The token is only useful here if it never expires. A Page token derived
  // from a long-lived user token reports expires_at 0; anything else means the
  // extension step was skipped and this will stop working, quietly, within
  // hours or at most sixty days.
  try {
    const qs = new URLSearchParams({ input_token: token, access_token: token });
    const res = await fetch(`${GRAPH}/debug_token?${qs}`);
    const { data } = await res.json();
    const expires = data?.expires_at;
    const perms = (data?.scopes ?? []).join(' ');

    report(
      'Token lifetime',
      expires === 0,
      expires === 0
        ? 'never expires — correct'
        : `expires ${new Date(expires * 1000).toISOString()} — redo the 60-day extension before calling me/accounts`
    );

    for (const need of ['pages_manage_posts', 'instagram_content_publish', 'instagram_basic']) {
      report(need, perms.includes(need), perms.includes(need) ? 'granted' : 'MISSING from the token');
    }
  } catch (err) {
    report('Token inspection', false, err.message);
  }
}

console.log(failed ? '\nSomething is wrong above — nothing will post until it is fixed.' : '\nAll three secrets check out. The next article you approve will post itself.');
process.exit(failed ? 1 : 0);
