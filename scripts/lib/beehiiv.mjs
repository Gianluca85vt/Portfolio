/**
 * The newsletter's subscriber count, for the kits and the report. Reads the
 * same two keys the site's sign-up form uses; without them it answers null and
 * the caller says the count is unavailable rather than guessing.
 */
export async function subscriberCount() {
  const key = process.env.BEEHIIV_API_KEY;
  const pub = process.env.BEEHIIV_PUBLICATION_ID;
  if (!key || !pub) return null;
  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${pub}?expand[]=stat_active_subscriptions`, {
      headers: { authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.log(`beehiiv answered ${res.status}`);
      return null;
    }
    const json = await res.json();
    const n = json?.data?.stats?.active_subscriptions;
    return typeof n === 'number' ? n : null;
  } catch (e) {
    console.log(`beehiiv unreachable: ${e.message}`);
    return null;
  }
}
