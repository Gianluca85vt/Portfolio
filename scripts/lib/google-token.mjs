/**
 * Turns a Google service-account key into an access token, without pulling in
 * the googleapis package for what is thirty lines of signing.
 *
 * The flow is the standard JWT bearer grant: build a claim set, sign it with
 * the account's private key, and trade the signature for a token. One token
 * covers both Analytics and Search Console as long as both scopes are asked
 * for up front.
 *
 * The key never leaves this process and is never logged.
 */
import { createSign } from 'node:crypto';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';

function base64url(input) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * @param {string} keyJson  the service account JSON, verbatim
 * @param {string[]} scopes
 */
export async function accessToken(keyJson, scopes) {
  let key;
  try {
    key = JSON.parse(keyJson);
  } catch {
    throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON is not valid JSON — paste the whole key file, braces included');
  }
  if (!key.client_email || !key.private_key) {
    throw new Error('the service account key has no client_email or private_key');
  }

  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = base64url(
    JSON.stringify({
      iss: key.client_email,
      scope: scopes.join(' '),
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    })
  );

  const signer = createSign('RSA-SHA256');
  signer.update(`${header}.${claims}`);
  const signature = signer.sign(key.private_key, 'base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${header}.${claims}.${signature}`,
    }),
  });

  const json = await res.json().catch(() => ({}));
  if (!res.ok || !json.access_token) {
    // Google's own message is the only useful part of a failure here — a wrong
    // scope, a disabled API and a revoked key all look identical otherwise.
    throw new Error(`Google refused the service account: ${json.error_description ?? json.error ?? res.status}`);
  }
  return json.access_token;
}

export const SCOPES = {
  analytics: 'https://www.googleapis.com/auth/analytics.readonly',
  searchConsole: 'https://www.googleapis.com/auth/webmasters.readonly',
};
