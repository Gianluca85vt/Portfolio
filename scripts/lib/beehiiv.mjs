/**
 * The newsletter's numbers, for the kits and the report. Reads the same two
 * keys the site's sign-up form uses; without them it answers null and the
 * caller says the numbers are unavailable rather than guessing.
 */
export async function newsletterStats() {
  const key = process.env.BEEHIIV_API_KEY;
  const pub = process.env.BEEHIIV_PUBLICATION_ID;
  if (!key || !pub) return null;
  try {
    const res = await fetch(`https://api.beehiiv.com/v2/publications/${pub}?expand[]=stats`, {
      headers: { authorization: `Bearer ${key}` },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) {
      console.log(`beehiiv answered ${res.status}`);
      return null;
    }
    const stats = (await res.json())?.data?.stats ?? {};
    if (typeof stats.active_subscriptions !== 'number') return null;
    return {
      subscribers: stats.active_subscriptions,
      // Percentages as beehiiv reports them; absent until the first issue goes out.
      openRate: typeof stats.average_open_rate === 'number' ? stats.average_open_rate : null,
      clickRate: typeof stats.average_click_rate === 'number' ? stats.average_click_rate : null,
      sent: typeof stats.total_sent === 'number' ? stats.total_sent : null,
    };
  } catch (e) {
    console.log(`beehiiv unreachable: ${e.message}`);
    return null;
  }
}

export async function subscriberCount() {
  return (await newsletterStats())?.subscribers ?? null;
}
