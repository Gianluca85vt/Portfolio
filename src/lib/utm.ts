/**
 * A link that says where the reader came from.
 *
 * Until October every visit from a post landed in Analytics as "Organic
 * Social" or "Unassigned", so there was no telling LinkedIn from Instagram
 * from Facebook, and no way to judge which of them was worth the time. Every
 * link this site writes for somebody to post now carries utm_source (the
 * network), utm_medium (social, newsletter, bio) and utm_campaign (the
 * article's slug, or what the link is for).
 *
 * Shared by the site and the scripts in /scripts, which import it directly,
 * so it keeps to TypeScript that Node can run with its types stripped.
 */
export function tagged(url: string, source: string, medium: string, campaign: string): string {
  const u = new URL(url);
  u.searchParams.set('utm_source', source);
  u.searchParams.set('utm_medium', medium);
  u.searchParams.set('utm_campaign', campaign);
  return u.toString();
}
