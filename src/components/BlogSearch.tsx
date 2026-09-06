import { useEffect, useMemo, useRef, useState } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { colorFor, formatDate } from './blog-format';

/**
 * Searches the whole archive, article bodies included.
 *
 * The index is a static file built alongside the site, not a service, and it is
 * not fetched until someone reaches for the box — it is around six hundred
 * kilobytes, which is cheap once on purpose and expensive on every visit.
 *
 * Matching is every term, anywhere in the piece: someone who remembers a phrase
 * from halfway down an article should find it, which is the whole point of
 * indexing the body rather than the summary.
 */

type Doc = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  text: string;
};

type Hit = Doc & { score: number; snippet: string; matched: string };

const MAX_RESULTS = 40;
const SNIPPET_CHARS = 190;

/** Terms are ANDed, so each one added narrows rather than widens. */
export function termsOf(query: string) {
  return query.toLowerCase().split(/\s+/).filter((t) => t.length > 1);
}

/**
 * Where a term appears decides how much the piece is worth, because a word in
 * the headline is what the article is about and the same word in paragraph
 * eleven may be an aside.
 */
export function scoreDoc(doc: Doc, terms: string[]) {
  const title = doc.title.toLowerCase();
  const category = doc.category.toLowerCase();
  const excerpt = doc.excerpt.toLowerCase();
  const text = doc.text.toLowerCase();

  let score = 0;
  for (const term of terms) {
    const inTitle = title.includes(term);
    const inCategory = category.includes(term);
    const inExcerpt = excerpt.includes(term);
    const inText = text.includes(term);

    // Every term has to appear somewhere, or this is not a result at all.
    if (!inTitle && !inCategory && !inExcerpt && !inText) return 0;

    if (inTitle) score += 12;
    if (inCategory) score += 6;
    if (inExcerpt) score += 4;
    if (inText) score += 1;
  }
  return score;
}

/** The sentence the reader was looking for, not the opening of the article. */
export function snippetFor(text: string, terms: string[]) {
  const haystack = text.toLowerCase();
  let at = -1;
  let hitTerm = '';
  for (const term of terms) {
    const i = haystack.indexOf(term);
    if (i !== -1 && (at === -1 || i < at)) {
      at = i;
      hitTerm = term;
    }
  }
  if (at === -1) return { snippet: text.slice(0, SNIPPET_CHARS), matched: '' };

  // Back up to a word boundary so the excerpt does not open mid-syllable.
  const start = Math.max(0, at - Math.floor(SNIPPET_CHARS / 3));
  const from = start === 0 ? 0 : text.indexOf(' ', start) + 1;
  const raw = text.slice(from, from + SNIPPET_CHARS);
  return {
    snippet: `${from > 0 ? '…' : ''}${raw}${from + SNIPPET_CHARS < text.length ? '…' : ''}`,
    matched: hitTerm,
  };
}

export function search(docs: Doc[], query: string): Hit[] {
  const terms = termsOf(query);
  if (terms.length === 0) return [];

  const hits: Hit[] = [];
  for (const doc of docs) {
    const score = scoreDoc(doc, terms);
    if (score === 0) continue;
    const { snippet, matched } = snippetFor(doc.text || doc.excerpt, terms);
    hits.push({ ...doc, score, snippet, matched });
  }

  // Newest wins a tie: two equally relevant pieces, the current one is likelier
  // to be the one being looked for.
  hits.sort((a, b) => b.score - a.score || b.date.localeCompare(a.date));
  return hits.slice(0, MAX_RESULTS);
}

/** Wraps every occurrence of a term so the eye lands on it. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  if (terms.length === 0) return <>{text}</>;
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const parts = text.split(new RegExp(`(${escaped.join('|')})`, 'gi'));
  const lower = terms.map((t) => t.toLowerCase());

  return (
    <>
      {parts.map((part, i) =>
        lower.includes(part.toLowerCase()) ? (
          <mark key={i} className="bg-transparent text-white font-medium">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default function BlogSearch({ onQueryChange }: { onQueryChange: (q: string) => void }) {
  const [query, setQuery] = useState('');
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  // One fetch, on the first sign of interest, never repeated.
  const load = () => {
    if (docs || loading || failed) return;
    setLoading(true);
    fetch('/blog/search-index.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((d: Doc[]) => setDocs(d))
      .catch(() => setFailed(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    onQueryChange(query);
  }, [query, onQueryChange]);

  const hits = useMemo(() => (docs ? search(docs, query) : []), [docs, query]);
  const terms = useMemo(() => termsOf(query), [query]);
  const active = query.trim().length > 1;

  return (
    <div className="mt-6 sm:mt-7">
      <div
        className="flex items-center gap-2.5 rounded-[4px] px-3.5 py-2.5 transition-colors duration-200 focus-within:bg-[#D7E2EA]/[0.12]"
        style={{ backgroundColor: 'rgba(215,226,234,0.07)' }}
      >
        {loading ? (
          <Loader2
            className="w-[0.95rem] h-[0.95rem] text-[#D7E2EA]/40 animate-spin shrink-0"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        ) : (
          <Search
            className="w-[0.95rem] h-[0.95rem] text-[#D7E2EA]/40 shrink-0"
            strokeWidth={1.7}
            aria-hidden="true"
          />
        )}

        <input
          ref={input}
          type="search"
          value={query}
          onFocus={load}
          onChange={(e) => {
            load();
            setQuery(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setQuery('');
          }}
          placeholder="Search every article — a topic, a name, a phrase"
          aria-label="Search the archive"
          className="flex-1 bg-transparent border-0 outline-none text-[#D7E2EA] placeholder:text-[#D7E2EA]/35 font-light text-[0.9rem] [&::-webkit-search-cancel-button]:hidden"
        />

        {query ? (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              input.current?.focus();
            }}
            aria-label="Clear the search"
            className="text-[#D7E2EA]/40 hover:text-[#D7E2EA] transition-colors duration-200 shrink-0"
          >
            <X className="w-[0.95rem] h-[0.95rem]" strokeWidth={1.7} aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {active ? (
        <div className="mt-4" aria-live="polite">
          {failed ? (
            <p className="text-[#D7E2EA]/40 font-light text-[0.85rem]">
              The search index would not load. Reload the page and try again.
            </p>
          ) : !docs ? (
            <p className="text-[#D7E2EA]/40 font-light text-[0.85rem]">Reading the archive…</p>
          ) : hits.length === 0 ? (
            <p className="text-[#D7E2EA]/40 font-light text-[0.85rem]">
              Nothing matches “{query.trim()}”.
            </p>
          ) : (
            <>
              <p className="text-[#D7E2EA]/35 font-medium uppercase tracking-[0.14em] text-[0.62rem]">
                {hits.length === MAX_RESULTS ? `First ${MAX_RESULTS}` : hits.length}{' '}
                {hits.length === 1 ? 'article' : 'articles'}
              </p>

              <ul className="mt-3 divide-y" style={{ borderColor: 'rgba(215,226,234,0.1)' }}>
                {hits.map((hit) => (
                  <li key={hit.slug}>
                    <a
                      href={`/blog/${hit.slug}/`}
                      className="group block py-3.5 transition-opacity duration-200 hover:opacity-100 opacity-90"
                    >
                      <div className="flex items-baseline gap-2.5 flex-wrap">
                        <span
                          className="font-medium uppercase tracking-[0.1em] text-[0.58rem] px-1.5 py-0.5 rounded-[3px] text-white"
                          style={{ backgroundColor: colorFor(hit.category) }}
                        >
                          {hit.category}
                        </span>
                        <span className="text-[#D7E2EA]/30 font-light text-[0.7rem]">
                          {formatDate(hit.date)}
                        </span>
                      </div>

                      <h3 className="mt-1.5 font-medium leading-snug text-[#D7E2EA] group-hover:text-white transition-colors duration-200 text-[1rem]">
                        <Highlight text={hit.title} terms={terms} />
                      </h3>

                      <p className="mt-1 text-[#D7E2EA]/45 font-light leading-relaxed text-[0.82rem]">
                        <Highlight text={hit.snippet} terms={terms} />
                      </p>
                    </a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}
