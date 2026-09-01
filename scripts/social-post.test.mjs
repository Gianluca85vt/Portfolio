/**
 * Checks the OAuth 1.0a signing against X's own published example.
 *
 *   node scripts/social-post.test.mjs
 *
 * The signature cannot be exercised for real without live credentials, and a
 * wrong one fails as a flat 401 with nothing to read. The documented vector is
 * the only way to know the percent-encoding, the parameter sort and the HMAC
 * are right before the first post is ever attempted.
 *
 * Vector from X's "Creating a signature" page.
 */
import { authHeader } from './social-post.mjs';

const EXPECTED = 'Ls93hJiZbQ3akF3HF3x1Bz8/zU4=';

const header = authHeader(
  'POST',
  'https://api.x.com/1.1/statuses/update.json',
  'xvz1evFS4wEEPTGEFPHBog',
  'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw',
  '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb',
  'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE',
  {
    // The exclamation mark is the point: encodeURIComponent leaves it alone
    // and OAuth requires %21, so this vector fails outright without the
    // stricter encoder.
    status: 'Hello Ladies + Gentlemen, a signed OAuth request!',
    include_entities: 'true',
  },
  'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg',
  '1318622958'
);

const got = decodeURIComponent(/oauth_signature="([^"]+)"/.exec(header)?.[1] ?? '');

let failed = false;

if (got === EXPECTED) {
  console.log('PASS  signature matches X\'s documented vector');
} else {
  console.error(`FAIL  signature\n        expected ${EXPECTED}\n        got      ${got}`);
  failed = true;
}

// The query and form parameters are signed but must not appear in the header.
if (/status=|include_entities/.test(header)) {
  console.error('FAIL  request parameters leaked into the Authorization header');
  failed = true;
} else {
  console.log('PASS  only oauth_* parameters in the header');
}

// Percent-encoding is the usual place this breaks: encodeURIComponent leaves
// these four alone and OAuth does not.
const { authHeader: _same } = await import('./social-post.mjs');
const punct = _same('POST', 'https://api.x.com/2/tweets', 'k', 's', 't', 'ts', { q: "a!b*c'd(e)" }, 'n', '1');
if (typeof punct === 'string' && punct.startsWith('OAuth ')) {
  console.log('PASS  signs parameters containing !*\'()');
} else {
  console.error('FAIL  signing threw on reserved punctuation');
  failed = true;
}

process.exit(failed ? 1 : 0);
