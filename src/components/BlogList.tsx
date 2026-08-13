import { useState } from 'react';
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
};

function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function colorFor(category: string) {
  return categoryColors[category as BlogCategory] ?? '#7621B0';
}

/** Small coloured section label, the way a news site tags a desk. */
function Badge({ category, size = 'sm' }: { category: string; size?: 'sm' | 'lg' }) {
  return (
    <span
      className={`inline-block rounded-[4px] font-medium uppercase tracking-widest text-white ${
        size === 'lg' ? 'text-[0.68rem] px-2.5 py-1' : 'text-[0.58rem] px-2 py-[3px]'
      }`}
      style={{ backgroundColor: colorFor(category) }}
    >
      {category}
    </span>
  );
}

/**
 * Artwork for posts that have no cover. Four of the articles are text pieces
 * with no image worth using, and in a dense grid an empty card reads as broken
 * rather than deliberate — so they get a tinted panel in the section's colour
 * with its initial, which sits in the layout as if it were meant to be there.
 */
function CoverArt({ post, className = '' }: { post: PostCard; className?: string }) {
  const color = colorFor(post.category);

  if (post.cover) {
    return (
      <img
        src={post.cover}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className={`w-full h-full object-cover transition-transform duration-[600ms] group-hover:scale-[1.04] ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`w-full h-full flex items-center justify-center transition-transform duration-[600ms] group-hover:scale-[1.04] ${className}`}
      style={{ background: `linear-gradient(140deg, #18011F 10%, ${color} 130%)` }}
    >
      <span
        className="font-black leading-none select-none uppercase tracking-tight text-center px-4"
        style={{ fontSize: 'clamp(1.5rem, 3.4vw, 2.6rem)', color: 'rgba(255,255,255,0.14)' }}
      >
        {post.category}
      </span>
    </div>
  );
}

function Meta({ post }: { post: PostCard }) {
  return (
    <span className="text-[#D7E2EA]/35 font-light text-[0.7rem] tracking-wide whitespace-nowrap">
      {formatDate(post.date)} · {post.readingMinutes} min
    </span>
  );
}

/** The opening story: one wide card so the page leads with an article. */
function LeadStory({ post }: { post: PostCard }) {
  return (
    <a
      href={`/blog/${post.slug}/`}
      className="group grid grid-cols-1 md:grid-cols-2 rounded-[20px] overflow-hidden border border-[#D7E2EA]/15 transition-colors duration-300 hover:border-[#D7E2EA]/40"
    >
      <div className="aspect-video md:aspect-auto md:min-h-[300px] overflow-hidden bg-black/40">
        <CoverArt post={post} />
      </div>

      <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 md:p-10">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge category={post.category} size="lg" />
          <Meta post={post} />
        </div>

        <h2
          className="text-[#D7E2EA] font-medium leading-[1.15] transition-colors duration-300 group-hover:text-white"
          style={{ fontSize: 'clamp(1.35rem, 3vw, 2.15rem)' }}
        >
          {post.title}
        </h2>

        {post.excerpt ? (
          <p className="text-[#D7E2EA]/55 font-light leading-relaxed text-[0.9rem] sm:text-[0.95rem] line-clamp-4">
            {post.excerpt}
          </p>
        ) : null}
      </div>
    </a>
  );
}

function GridCard({ post }: { post: PostCard }) {
  return (
    <a
      href={`/blog/${post.slug}/`}
      className="group flex flex-col h-full rounded-[16px] overflow-hidden border border-[#D7E2EA]/15 transition-colors duration-300 hover:border-[#D7E2EA]/40"
    >
      {/* the badge sits on the image, which is what makes the grid scannable */}
      <div className="relative aspect-video overflow-hidden bg-black/40">
        <CoverArt post={post} />
        <span className="absolute left-3 bottom-3">
          <Badge category={post.category} />
        </span>
      </div>

      <div className="flex flex-col gap-2 p-4 sm:p-5 flex-1">
        <h2 className="text-[#D7E2EA] font-medium leading-snug text-[0.98rem] sm:text-[1.05rem] transition-colors duration-300 group-hover:text-white">
          {post.title}
        </h2>

        {post.excerpt ? (
          <p className="text-[#D7E2EA]/45 font-light text-[0.8rem] leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        ) : null}

        <span className="mt-auto pt-2">
          <Meta post={post} />
        </span>
      </div>
    </a>
  );
}

export default function BlogList({ posts }: { posts: PostCard[] }) {
  const [active, setActive] = useState('All');

  // only offer categories that actually have something in them
  const used = blogCategories.filter((c) => posts.some((p) => p.category === c));
  const filters = ['All', ...used];
  const shown = active === 'All' ? posts : posts.filter((p) => p.category === active);

  // The lead only makes sense on the unfiltered view, where it is genuinely the
  // latest thing published. Inside a filter it would just be an arbitrarily
  // enlarged card.
  const lead = active === 'All' ? shown[0] : undefined;
  const rest = lead ? shown.slice(1) : shown;

  return (
    <>
      {/* Compact masthead. A news page earns its space by leading with stories,
          so the title takes a fraction of what a portfolio section heading does. */}
      <section className="px-5 sm:px-8 md:px-10 pt-10 sm:pt-14">
        <div className="max-w-6xl mx-auto">
          <FadeIn
            as="h1"
            delay={0}
            y={20}
            className="font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
          >
            <GlowText text="Blog" charClassName="hero-heading" />
          </FadeIn>

          <FadeIn
            as="p"
            delay={0.08}
            y={16}
            className="text-[#D7E2EA]/50 font-light leading-relaxed max-w-[560px] mt-3"
            style={{ fontSize: 'clamp(0.88rem, 1.5vw, 1rem)' }}
          >
            Notes on 3D and AI, and on the things that feed the work — games,
            manga, film and the shelves they end up on.
          </FadeIn>

          {filters.length > 1 ? (
            <FadeIn
              delay={0.14}
              y={16}
              className="flex flex-wrap gap-2 mt-7 sm:mt-8 pb-7 sm:pb-8 border-b border-[#D7E2EA]/12"
            >
              {filters.map((c) => {
                const on = active === c;
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setActive(c)}
                    aria-pressed={on}
                    className={`rounded-[5px] px-3 py-1.5 font-medium uppercase tracking-widest text-[0.62rem] transition-colors duration-200 ${
                      on
                        ? 'text-white'
                        : 'text-[#D7E2EA]/50 bg-[#D7E2EA]/[0.06] hover:bg-[#D7E2EA]/12'
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

      <section className="px-5 sm:px-8 md:px-10 pt-8 sm:pt-10 pb-20 sm:pb-24">
        <div className="max-w-6xl mx-auto">
          {shown.length === 0 ? (
            <p className="text-[#D7E2EA]/40 font-light">Nothing here yet.</p>
          ) : (
            <>
              {lead ? (
                <FadeIn delay={0} y={24} className="mb-6 sm:mb-8">
                  <LeadStory post={lead} />
                </FadeIn>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                {rest.map((post, index) => (
                  <FadeIn key={post.slug} delay={(index % 3) * 0.06} y={24}>
                    <GridCard post={post} />
                  </FadeIn>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
