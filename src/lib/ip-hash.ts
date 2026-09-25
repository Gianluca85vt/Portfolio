/**
 * Salted SHA-256 of a visitor's address, cut to 32 hex characters.
 *
 * Enough to spot the same submitter within a few minutes, useless as personal
 * data — there is no way back to the address, and without the salt the hash
 * cannot be reproduced either. Used for the comment rate limit and for the
 * record of CMS sign-in attempts.
 */
export async function hashAddress(ip: string, salt: string) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(`${salt}:${ip}`));
  return [...new Uint8Array(digest)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 32);
}
