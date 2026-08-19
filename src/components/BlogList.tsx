import { useEffect, useState } from 'react';
import FadeIn from './ui/FadeIn';
import GlowText from './ui/GlowText';
import { blogCategories, categoryColors } from '../data/portfolio';
import type { BlogCategory } from '../data/portfolio';

export type PostCard = {
  slug: string;
  title: string;
  date: string;
  category: string;
  excerpt: string;
  cover?: string;
  readingMinutes: number;
  /** Present only on reviews: the mean of the scores the piece quotes, out of 10. */
  score?: number;
  /** What was reviewed. The headline is usually too long for the column. */
  reviewOf?: string;
};

const SUPABASE_URL = import.meta.env.PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function colorFor(category: string) {
  return categoryColors[category as BlogCategory] ?? '#7621B0';
}

/**
 * Approved comment counts for every post in one request, tallied here rather
 * than asking the database for a grouped count per slug. Fails silently: a
 * missing badge is a far smaller problem than a blog index that will not render
 * because the database was unreachable.
 */
function useCommentCounts(enabled: boolean) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (!enabled || !SUPABASE_URL || !SUPABASE_KEY) return;
    let cancelled = false;

    fetch(`${SUPABASE_URL}/rest/v1/comments?select=post_slug&approved=eq.true`, {
      headers: { apikey: SUPABASE_KEY },
    })
      .then((r) => (r.ok ? r.json() : []))
      .then((rows: Array<{ post_slug: string }>) => {
        if (cancelled) return;
        const tally: Record<string, number> = {};
        for (const row of rows) tally[row.post_slug] = (tally[row.post_slug] ?? 0) + 1;
        setCounts(tally);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return counts;
}

function CommentBadge({ count }: { count: number }) {
  if (!count) return null;
  return (
    <span className="absolute top-0 right-0 z-20 flex items-center gap-1 bg-[#D6294E] text-white text-[0.62rem] font-medium px-1.5 py-[3px] rounded-bl-[6px]">
      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="currentColor" aria-hidden="true">
        <path d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
      </svg>
      {count}
    </span>
  );
}

/** Cover image, or a tinted panel in the section colour when there is none. */
function Cover({ post }: { post: PostCard }) {
  if (post.cover) {
    return (
      <img
        src={post.cover}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.05]"
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center transition-transform duration-[600ms] group-hover:scale-[1.05]"
      style={{ background: `linear-gradient(140deg, #18011F 10%, ${colorFor(post.category)} 130%)` }}
    >
      <span
        className="font-black uppercase tracking-tight leading-none select-none px-3 text-center"
        style={{ fontSize: 'clamp(1.1rem, 2.6vw, 2rem)', color: 'rgba(255,255,255,0.14)' }}
      >
        {post.category}
      </span>
    </div>
  );
}

/**
 * The card shape the whole page is built from: full-bleed artwork with the
 * headline sitting on top of it, over a scrim dark enough to keep white text
 * legible against any image.
 */
function OverlayCard({
  post,
  count,
  size,
}: {
  post: PostCard;
  count: number;
  size: 'lead' | 'small';
}) {
  const lead = size === 'lead';

  return (
    <a
      href={`/blog/${post.slug}/`}
      className="group relative block overflow-hidden rounded-[6px] bg-black h-full"
    >
      <div className={lead ? 'relative aspect-[4/3]' : 'relative aspect-[4/3]'}>
        <Cover post={post} />
        {/* scrim: opaque at the foot, gone by halfway up */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.94) 0%, rgba(0,0,0,0.75) 22%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0) 72%)',
          }}
        />
      </div>

      <CommentBadge count={count} />

      <div className={`absolute inset-x-0 bottom-0 z-20 ${lead ? 'p-4 sm:p-5' : 'p-3.5'}`}>
        <span
          className="block font-medium uppercase tracking-[0.11em] mb-1.5"
          style={{ color: colorFor(post.category), fontSize: lead ? '0.66rem' : '0.6rem' }}
        >
          {post.category}
        </span>

        <h2
          className="text-white font-medium leading-[1.2]"
          style={{ fontSize: lead ? 'clamp(1.05rem, 1.9vw, 1.35rem)' : 'clamp(0.92rem, 1.4vw, 1.02rem)' }}
        >
          {post.title}
        </h2>
      </div>
    </a>
  );
}

/** Compact row for everything past the picture-led blocks. */
function ListRow({ post, count }: { post: PostCard; count: number }) {
  return (
    <a
      href={`/blog/${post.slug}/`}
      className="group flex gap-4 items-start py-4 border-b border-[#D7E2EA]/10"
    >
      <div className="relative w-[112px] sm:w-[145px] shrink-0 aspect-[16/10] overflow-hidden rounded-[4px] bg-black">
        <Cover post={post} />
        <CommentBadge count={count} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap mb-1.5">
          <span className="text-[#D7E2EA]/35 font-light text-[0.66rem] uppercase tracking-wider">
            {formatDate(post.date)}
          </span>
          <span className="text-[#D7E2EA]/20 text-[0.66rem]">|</span>
          <span
            className="font-medium uppercase tracking-[0.09em] text-[0.66rem]"
            style={{ color: colorFor(post.category) }}
          >
            {post.category}
          </span>
        </div>

        <h2 className="text-[#D7E2EA] font-medium leading-snug text-[0.95rem] sm:text-[1.02rem] transition-colors duration-200 group-hover:text-white">
          {post.title}
        </h2>
      </div>
    </a>
  );
}

/**
 * The scoreboard down the side, the way a games site runs one: what was
 * reviewed, and the number, nothing else. Only articles carrying a score
 * appear, so it stays empty until there is something to put in it.
 */
function LatestReviews({ posts }: { posts: PostCard[] }) {
  const reviews = posts.filter((p) => typeof p.score === 'number').slice(0, 8);
  if (reviews.length === 0) return null;

  return (
    <aside className="rounded-[8px] border border-[#D7E2EA]/15 overflow-hidden">
      <h2 className="text-[#D6294E] font-medium uppercase tracking-[0.12em] text-[0.68rem] px-4 py-3.5 border-b border-[#D7E2EA]/12">
        Latest reviews
      </h2>

      <ul>
        {reviews.map((post) => (
          <li key={post.slug} className="border-b border-[#D7E2EA]/10 last:border-b-0">
            <a
              href={`/blog/${post.slug}/`}
              className="group flex items-center gap-3 px-4 py-3.5 transition-colors duration-200 hover:bg-[#D7E2EA]/[0.04]"
            >
              <span className="flex-1 min-w-0 text-[#D7E2EA]/80 font-medium uppercase tracking-wide text-[0.72rem] leading-snug transition-colors duration-200 group-hover:text-white">
                {post.reviewOf ?? post.title}
              </span>
              <span
                className="shrink-0 font-black leading-none tabular-nums"
                style={{ fontSize: '1.45rem', color: colorFor(post.category) }}
              >
                {post.score!.toFixed(1)}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** How many more rows or cards each press of Show more reveals. */
const PAGE = 8;

function ShowMore({ remaining, onClick }: { remaining: number; onClick: () => void }) {
  if (remaining <= 0) return null;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full mt-8 rounded-[6px] py-4 font-medium uppercase tracking-[0.14em] text-[0.72rem] text-white transition-opacity duration-200 hover:opacity-90"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
      }}
    >
      Show more · {remaining} left
    </button>
  );
}

export default function BlogList({ posts }: { posts: PostCard[] }) {
  const [active, setActive] = useState('All');
  // Articles arrive daily, so the index would otherwise grow without end.
  const [limit, setLimit] = useState(PAGE);
  const counts = useCommentCounts(posts.length > 0);

  // only offer categories that actually have something in them
  const used = blogCategories.filter((c) => posts.some((p) => p.category === c));
  const filters = ['All', ...used];
  const shown = active === 'All' ? posts : posts.filter((p) => p.category === active);

  // Three big, then four smaller, then a list — the same descending weight the
  // reference uses. Inside a filter the split stops meaning anything, so
  // everything becomes one uniform grid instead.
  const filtered = active !== 'All';
  const leadRow = filtered ? [] : shown.slice(0, 3);
  const secondRow = filtered ? [] : shown.slice(3, 7);

  // Only the tail is paged. The picture-led blocks at the top are a fixed
  // shape, so cutting into them would just leave a ragged grid.
  const tail = filtered ? shown : shown.slice(7);
  const tailShown = tail.slice(0, limit);
  const tailRemaining = tail.length - tailShown.length;

  return (
    <>
      <section className="px-4 sm:px-6 md:px-8 pt-9 sm:pt-12">
        <div className="max-w-[1180px] mx-auto">
          <FadeIn
            as="h1"
            delay={0}
            y={18}
            className="font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)' }}
          >
            <GlowText text="Blog" charClassName="hero-heading" />
          </FadeIn>

          <FadeIn
            as="p"
            delay={0.07}
            y={14}
            className="text-[#D7E2EA]/45 font-light leading-relaxed max-w-[560px] mt-2.5 text-[0.88rem]"
          >
            Notes on 3D and AI, and on the things that feed the work — games,
            manga, film and the shelves they end up on.
          </FadeIn>

          {filters.length > 1 ? (
            <FadeIn delay={0.12} y={14} className="flex flex-wrap gap-1.5 mt-6 sm:mt-7">
              {filters.map((c) => {
                const on = active === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => {
                      setActive(c);
                      setLimit(PAGE);
                    }}
                    aria-pressed={on}
                    className={`rounded-[4px] px-3 py-1.5 font-medium uppercase tracking-[0.1em] text-[0.62rem] transition-colors duration-200 ${
                      on ? 'text-white' : 'text-[#D7E2EA]/50 bg-[#D7E2EA]/[0.07] hover:bg-[#D7E2EA]/14'
                    }`}
                    style={on ? { backgroundColor: c === 'All' ? '#7621B0' : colorFor(c) } : undefined}
                  >
                    {c}
                  </button>
                );
              })}
            </FadeIn>
          ) : null}
        </div>
      </section>

      <section className="px-4 sm:px-6 md:px-8 pt-6 sm:pt-8 pb-20 sm:pb-24">
        <div className="max-w-[1180px] mx-auto">
          {shown.length === 0 ? (
            <p className="text-[#D7E2EA]/40 font-light">Nothing here yet.</p>
          ) : filtered ? (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
                {tailShown.map((post, i) => (
                  <FadeIn key={post.slug} delay={(i % 4) * 0.05} y={20}>
                    <OverlayCard post={post} count={counts[post.slug] ?? 0} size="small" />
                  </FadeIn>
                ))}
              </div>
              <ShowMore remaining={tailRemaining} onClick={() => setLimit((n) => n + PAGE)} />
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 sm:gap-3">
                {leadRow.map((post, i) => (
                  <FadeIn key={post.slug} delay={i * 0.06} y={22}>
                    <OverlayCard post={post} count={counts[post.slug] ?? 0} size="lead" />
                  </FadeIn>
                ))}
              </div>

              {secondRow.length ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 mt-2.5 sm:mt-3">
                  {secondRow.map((post, i) => (
                    <FadeIn key={post.slug} delay={i * 0.05} y={22}>
                      <OverlayCard post={post} count={counts[post.slug] ?? 0} size="small" />
                    </FadeIn>
                  ))}
                </div>
              ) : null}

              {/* the list and the scoreboard sit side by side from lg up, the
                  way a news page runs a rail down its right-hand edge */}
              <div className="mt-10 sm:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-10 items-start">
                <div>
                  {tailShown.length ? (
                    <>
                      <h2 className="text-[#D7E2EA]/40 font-medium uppercase tracking-[0.14em] text-[0.66rem] pb-3 border-b border-[#D7E2EA]/15">
                        More from the blog
                      </h2>
                      {tailShown.map((post, i) => (
                        <FadeIn key={post.slug} delay={Math.min(i % PAGE, 4) * 0.05} y={18}>
                          <ListRow post={post} count={counts[post.slug] ?? 0} />
                        </FadeIn>
                      ))}
                      <ShowMore remaining={tailRemaining} onClick={() => setLimit((n) => n + PAGE)} />
                    </>
                  ) : null}
                </div>

                <FadeIn delay={0.1} y={18}>
                  <LatestReviews posts={posts} />
                </FadeIn>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
