/**
 * Server-side environment access, read at runtime.
 *
 * Deliberately NOT `import.meta.env`. Vite replaces those reads with literals
 * while building, which breaks this project in two ways:
 *
 *  - the value is whatever the build machine had, so changing a variable in
 *    Vercel does nothing until something triggers a fresh build;
 *  - once a secret is inlined as a constant, the minifier reasons about it. An
 *    empty key at build time turned `if (!key) return 503` into the whole
 *    handler, and the rest of the function was dropped as unreachable.
 *
 * `process.env` is read when the request runs, on the Node runtime Vercel gives
 * these functions, so the value is the one currently configured and nothing is
 * baked into the bundle.
 *
 * Client-side code cannot use this — the browser has no process.env — so
 * anything the browser needs stays on `import.meta.env.PUBLIC_*`, which is
 * meant to be inlined and is safe to expose.
 */
export function env(name: string): string | undefined {
  const v = typeof process !== 'undefined' ? process.env?.[name] : undefined;
  return typeof v === 'string' && v.trim() !== '' ? v.trim() : undefined;
}

/**
 * PostgREST credentials for the comments table. Returns null when the server is
 * not configured, so callers can say so instead of failing obscurely.
 */
export function supabaseAdmin() {
  const url = env('PUBLIC_SUPABASE_URL');
  const serviceKey = env('SUPABASE_SERVICE_ROLE_KEY');
  if (!url || !serviceKey) return null;

  // Supabase issues two shapes of secret: the legacy service_role JWT and the
  // newer sb_secret_... key. PostgREST wants a JWT in Authorization, so that
  // header is only sent when the key actually is one. Either format works.
  const headers: Record<string, string> = {
    apikey: serviceKey,
    'content-type': 'application/json',
  };
  if (serviceKey.startsWith('eyJ')) {
    headers.authorization = `Bearer ${serviceKey}`;
  }

  return { rest: `${url}/rest/v1/comments`, headers };
}
