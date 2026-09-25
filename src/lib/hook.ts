import { env } from './env';

/**
 * A shared secret for the two endpoints only GitHub Actions should call:
 * /api/draft-notify and /api/story-ready.
 *
 * Both used to be open, on the argument that the worst a stranger could do was
 * get a real draft emailed twice. Twice, but also two thousand times: each call
 * sends a mail and spends the GitHub token's hourly budget on reads, so a loop
 * could fill the inbox and leave the CMS unable to commit.
 *
 * Opt-in, so that deploying this changes nothing by itself. With HOOK_SECRET
 * unset on the server every request is let through, exactly as before. Set the
 * same value as a GitHub Actions secret first, then on Vercel — the other way
 * round, the workflows would be refused until the GitHub side caught up.
 */
export async function hookAuthorised(request: Request): Promise<boolean> {
  const secret = env('HOOK_SECRET');
  if (!secret) return true;

  const given = request.headers.get('x-hook-secret') ?? '';
  if (!given) return false;

  // Compare digests rather than the strings, so neither the length nor any
  // prefix of the secret can be read off the response time.
  const digest = async (s: string) =>
    new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)));
  const [a, b] = await Promise.all([digest(given), digest(secret)]);

  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
  return diff === 0;
}
