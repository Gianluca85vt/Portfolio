import { useState } from 'react';
import { Link } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import FadeIn from '../components/ui/FadeIn';
import GlowText from '../components/ui/GlowText';
import { blogCategories } from '../data/portfolio';
import { formatDate, posts } from '../lib/blog';

export default function BlogPage() {
  const [active, setActive] = useState<string>('All');

  const used = blogCategories.filter((c) => posts.some((p) => p.category === c));
  const filters = ['All', ...used];
  const shown = active === 'All' ? posts : posts.filter((p) => p.category === active);

  return (
    <div className="min-h-screen flex flex-col" style={{ overflowX: 'clip' }}>
      <SiteHeader current="/blog" />

      <section className="px-5 sm:px-8 md:px-10 pt-14 sm:pt-20 md:pt-24 pb-10">
        <FadeIn
          as="h1"
          delay={0}
          y={40}
          className="font-black uppercase text-center leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 13vw, 170px)' }}
        >
          <GlowText text="Blog" charClassName="hero-heading" />
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.1}
          y={20}
          className="text-[#D7E2EA]/70 font-light text-center leading-relaxed max-w-[560px] mx-auto mt-7 sm:mt-9"
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
        >
          Notes on 3D and AI, and on the things that feed the work — games, manga,
          film and the shelves they end up on.
        </FadeIn>

        {filters.length > 1 ? (
          <FadeIn
            delay={0.2}
            y={20}
            className="flex flex-wrap justify-center gap-2.5 sm:gap-3 mt-10 sm:mt-12"
          >
            {filters.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActive(c)}
                aria-pressed={active === c}
                className={`rounded-full border px-5 py-2.5 font-medium uppercase tracking-widest text-[0.65rem] sm:text-xs transition-colors duration-300 ${
                  active === c
                    ? 'border-transparent text-white'
                    : 'border-[#D7E2EA]/25 text-[#D7E2EA]/60 hover:bg-[#D7E2EA]/5'
                }`}
                style={
                  active === c
                    ? {
                        background:
                          'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      }
                    : undefined
                }
              >
                {c}
              </button>
            ))}
          </FadeIn>
        ) : null}
      </section>

      <section className="px-5 sm:px-8 md:px-10 pb-20 sm:pb-24">
        {shown.length === 0 ? (
          <p className="text-[#D7E2EA]/40 font-light text-center">
            Nothing here yet.
          </p>
        ) : (
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
            {shown.map((post, index) => (
              <FadeIn key={post.slug} delay={(index % 2) * 0.08} y={30}>
                <Link
                  to={`/blog/${post.slug}`}
                  className="group flex flex-col h-full rounded-[24px] sm:rounded-[28px] border border-[#D7E2EA]/20 overflow-hidden transition-colors duration-300 hover:border-[#D7E2EA]/45"
                >
                  {post.cover ? (
                    <div className="aspect-video overflow-hidden bg-black/40">
                      <img
                        src={post.cover}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : null}

                  <div className="flex flex-col gap-3 p-6 sm:p-7 flex-1">
                    <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-widest">
                      <span className="text-[#D7E2EA]">{post.category}</span>
                      <span className="text-[#D7E2EA]/30">
                        {formatDate(post.date)}
                      </span>
                      <span className="text-[#D7E2EA]/30 ml-auto">
                        {post.readingMinutes} min
                      </span>
                    </div>

                    <h2
                      className="text-[#D7E2EA] font-medium leading-tight"
                      style={{ fontSize: 'clamp(1.1rem, 2.1vw, 1.5rem)' }}
                    >
                      {post.title}
                    </h2>

                    <p className="text-[#D7E2EA]/55 font-light text-sm leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
