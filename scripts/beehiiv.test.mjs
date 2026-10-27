import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { newsletterStats, beehiivProblem } from './lib/beehiiv.mjs';

const realFetch = globalThis.fetch;
let seen = [];

/** A fake beehiiv: `routes` maps a URL fragment to [status, body]. */
function fake(routes) {
  globalThis.fetch = async (url, init) => {
    seen.push({ url: String(url), auth: init?.headers?.authorization });
    for (const [frag, [status, body]] of Object.entries(routes)) {
      if (String(url).includes(frag)) return new Response(JSON.stringify(body), { status });
    }
    return new Response('{}', { status: 500 });
  };
}

beforeEach(() => {
  seen = [];
  process.env.BEEHIIV_API_KEY = 'key-for-tests';
  process.env.BEEHIIV_PUBLICATION_ID = 'pub_00000000-0000-0000-0000-000000000000';
});
afterEach(() => {
  globalThis.fetch = realFetch;
});

test('the stats block gives subscribers and open rate', async () => {
  fake({ 'expand[]=stats': [200, { data: { stats: { active_subscriptions: 42, average_open_rate: 51.5 } } }] });
  const s = await newsletterStats();
  assert.equal(s.subscribers, 42);
  assert.equal(s.openRate, 51.5);
  assert.equal(beehiivProblem(), '');
});

test('without a stats block it tries the other spelling, then counts directly', async () => {
  fake({
    'expand[]=stats': [200, { data: { id: 'pub_x' } }],
    'expand=stats': [200, { data: { id: 'pub_x' } }],
    '/subscriptions?status=active': [200, { data: [{}], total_results: 7 }],
  });
  assert.equal((await newsletterStats()).subscribers, 7);
});

test('a refused key and a wrong ID say so, in words he can act on', async () => {
  fake({ 'expand[]=stats': [401, { errors: [] }] });
  assert.equal(await newsletterStats(), null);
  assert.match(beehiivProblem(), /401.*BEEHIIV_API_KEY/);
  fake({ 'expand[]=stats': [404, { errors: [] }] });
  await newsletterStats();
  assert.match(beehiivProblem(), /404.*pub_/);
});

test('missing secrets are named, and pasted whitespace is trimmed', async () => {
  delete process.env.BEEHIIV_API_KEY;
  assert.equal(await newsletterStats(), null);
  assert.match(beehiivProblem(), /BEEHIIV_API_KEY non arriva/);

  process.env.BEEHIIV_API_KEY = '  key-for-tests\n';
  process.env.BEEHIIV_PUBLICATION_ID = 'pub_abc \n';
  fake({ 'expand[]=stats': [200, { data: { stats: { active_subscriptions: 3 } } }] });
  await newsletterStats();
  assert.ok(seen[0].url.includes('/publications/pub_abc?'));
  assert.equal(seen[0].auth, 'Bearer key-for-tests');
});
