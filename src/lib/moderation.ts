/**
 * Decides whether a comment publishes on sight or waits for a human.
 *
 * Comments used to wait for approval every time, which meant a reader's comment
 * appeared whenever Gianluca next opened his email. Now the ordinary ones go up
 * immediately and only two kinds are held: obscenity, and abuse aimed at a
 * person.
 *
 * **A held comment is never deleted and never silently dropped.** It is stored
 * exactly as written, marked unapproved, and emailed for a decision — because
 * this is a word filter, not a judge, and it will be wrong in both directions.
 * Somebody quoting a slur to object to it trips the same wire as somebody using
 * it. A human settles those; the filter only decides who waits.
 *
 * Two languages, because the blog is written in English and read largely by
 * Italians.
 */

/**
 * Fold the tricks used to slip a word past a matcher: accents, letters swapped
 * for digits, and characters repeated to break the spelling. `c4zz0` and
 * `caaazzo` both come out as `cazzo`.
 */
function normalise(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[0]/g, 'o')
    .replace(/[1!|]/g, 'i')
    .replace(/[3]/g, 'e')
    .replace(/[4@]/g, 'a')
    .replace(/[5$]/g, 's')
    .replace(/[7]/g, 't')
    // Three or more of the same letter collapse to one. Neither language has a
    // real triple, so this cannot damage a word, and it is what turns
    // "vaffanculooooo" back into something the list recognises. Collapsing to
    // two instead leaves "vaffanculoo", which matches nothing.
    .replace(/(.)\1{2,}/g, '$1')
    .replace(/[^a-z\s']/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Obscenity. Matched on whole words only — substring matching is how a filter
 * ends up rejecting Scunthorpe, or the surname of anyone called Cazzaniga.
 */
const OBSCENE = [
  // Italian
  'cazzo', 'cazzi', 'cazzata', 'cazzate', 'stronzo', 'stronza', 'stronzi', 'stronzate',
  'merda', 'merdoso', 'coglione', 'coglioni', 'vaffanculo', 'fanculo', 'culo',
  'troia', 'puttana', 'puttane', 'zoccola', 'bastardo', 'bastardi', 'porca',
  'minchia', 'minchione', 'figa', 'checca', 'frocio', 'froci', 'ricchione',
  'negro', 'terrone', 'handicappato', 'mongoloide', 'ritardato',
  // English
  'fuck', 'fucking', 'fucker', 'fucked', 'shit', 'shitty', 'bullshit', 'bitch',
  'bastard', 'asshole', 'arsehole', 'cunt', 'dickhead', 'wanker', 'twat',
  'faggot', 'retard', 'retarded', 'nigger', 'whore', 'slut',
];

/**
 * Insults that are an attack on a person wherever they appear, without needing
 * a "you are" in front of them.
 */
const ABUSIVE = [
  'idiota', 'idioti', 'imbecille', 'imbecilli', 'cretino', 'cretini', 'deficiente',
  'scemo', 'stupido', 'stupida', 'incapace', 'pagliaccio',
  'ignorante', 'buffone', 'sfigato', 'nullita', 'raccomandato',
  'idiot', 'moron', 'imbecile', 'cretin', 'clown', 'loser', 'clueless',
];

/**
 * Words that insult a person but are fair comment about a company. The blog's
 * editorial calls decisions incompetent and publishers grifters most weeks, and
 * a reader is entitled to the same register. These only count when the sentence
 * is aimed at someone, so they are checked by the directed patterns below and
 * never on their own.
 *
 * "hack" was in the list above until a test caught it: a technical artist says
 * it a dozen times a day about a shadow pass.
 */
const DIRECTED_ONLY = [
  'incompetente', 'incompetent', 'talentless', 'hack', 'fraud', 'grifter', 'shill',
  'venduto', 'leccapiedi',
];

/**
 * Second person plus a judgement. This is what separates "the decision was
 * stupid" — a fine thing to say on a blog that argues — from "you are stupid".
 * Disagreement is welcome here; the target is the person.
 */
const DIRECTED = [
  /\bsei\s+(un|una|proprio|solo|veramente|davvero)?\s*\w*\b/,
  /\bsei\s+il\s+peggior/,
  /\bfai\s+schifo\b/,
  /\bnon\s+capisci\s+(un|niente|nulla)\b/,
  /\btorna\s+a\s+\w+/,
  /\bchi\s+ti\s+credi\s+di\s+essere\b/,
  /\byou'?re?\s+(a|an|such|just)\b/,
  /\byou\s+are\s+(a|an|such|just)\b/,
  /\byou\s+(suck|stink)\b/,
  /\bgo\s+back\s+to\s+\w+/,
  /\bwho\s+do\s+you\s+think\s+you\s+are\b/,
  /\bknow\s+nothing\s+about\b/,
];

/** Threats and wishes of harm. Held regardless of how they are phrased. */
const THREATENING = [
  /\bti\s+(ammazzo|uccido|spacco|meno|trovo)\b/,
  /\bspero\s+che\s+(tu\s+)?(muori|crepi|fallisci)\b/,
  /\bvai\s+a\s+(morire|quel\s+paese)\b/,
  /\bkill\s+your(self)?\b/,
  /\bi\s+hope\s+you\s+(die|fail|lose)\b/,
  /\bwatch\s+your\s+back\b/,
];

export type Verdict =
  | { publish: true }
  | { publish: false; reason: 'obscenity' | 'abuse' | 'threat'; matched: string };

export function screen(body: string, authorName = ''): Verdict {
  const text = normalise(`${authorName} ${body}`);
  const words = new Set(text.split(' '));

  for (const pattern of THREATENING) {
    const hit = pattern.exec(text);
    if (hit) return { publish: false, reason: 'threat', matched: hit[0].trim() };
  }

  for (const word of OBSCENE) {
    if (words.has(word)) return { publish: false, reason: 'obscenity', matched: word };
  }

  for (const word of ABUSIVE) {
    if (words.has(word)) return { publish: false, reason: 'abuse', matched: word };
  }

  // A directed phrase alone is not enough — "sei un grande" would trip it. It
  // holds only when it arrives with something unkind attached.
  for (const pattern of DIRECTED) {
    const hit = pattern.exec(text);
    if (!hit) continue;
    const nearby = text.slice(hit.index, hit.index + 80);
    const unkind = [...OBSCENE, ...ABUSIVE, ...DIRECTED_ONLY].some((w) =>
      new RegExp(`\\b${w}\\b`).test(nearby)
    );
    if (unkind) return { publish: false, reason: 'abuse', matched: hit[0].trim() };
  }

  return { publish: true };
}

export const REASONS: Record<string, string> = {
  obscenity: 'obscene language',
  abuse: 'a personal attack',
  threat: 'a threat',
};
