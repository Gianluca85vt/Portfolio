import FadeIn from './ui/FadeIn';
import GlowText from './ui/GlowText';
import { blog, categoryColors } from '../data/portfolio';
import type { BlogCategory } from '../data/portfolio';

/**
 * The blog, on the home page.
 *
 * Half the site's pageviews land here — 49 of 100 in the window to 4 September —
 * and until now the page had nine sections and none of them was the blog. The
 * only way through was the nav link and a speech bubble on the avatar that a
 * reader can dismiss. A hundred and twenty-four articles and the most visited
 * page of the site showed none of them.
 *
 * It sits before Contact deliberately: after the work, where someone who has
 * scrolled that far has already decided they are interested.
 */

export type HomePost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  cover?: string;
  date: string;
  score?: number;
};

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function BlogSection({ posts = [] }: { posts?: HomePost[] }) {
  if (posts.length === 0) return null;

  return (
    <section
      id="blog"
      className="relative z-10 bg-[#000000] px-5 sm:px-8 md:px-10 pt-12 sm:pt-14 md:pt-16 pb-8"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="font-black uppercase text-center leading-none tracking-tight"
        style={{ fontSize: 'clamp(2.6rem, 8vw, 100px)' }}
      >
        <GlowText text={blog.name} charClassName="hero-heading" />
      </FadeIn>

      <FadeIn
        as="p"
        delay={0.1}
        y={20}
        className="text-[#D7E2EA]/50 font-light text-center leading-relaxed max-w-[640px] mx-auto mt-5"
        style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1rem)' }}
      >
        {blog.description}
      </FadeIn>

      <div className="max-w-6xl mx-auto grid gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4 mt-10 sm:mt-12">
        {posts.map((post, i) => (
          <FadeIn key={post.slug} delay={0.15 + i * 0.07} y={30}>
            <article className="group h-full">
              <a href={`/blog/${post.slug}/`} className="block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[6px] bg-black">
                  {post.cover && (
                    <img
                      src={post.cover}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                  )}
                  {post.score !== undefined && (
                    <span className="absolute top-2.5 right-2.5 rounded-[4px] bg-black/75 px-2 py-1 text-[0.68rem] font-semibold text-white tabular-nums">
                      {post.score}/10
                    </span>
                  )}
                </div>
              </a>

              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 mt-3.5">
                <span
                  className="font-medium uppercase tracking-[0.11em] text-[0.6rem]"
                  style={{ color: categoryColors[post.category as BlogCategory] ?? '#B600A8' }}
                >
                  {post.category}
                </span>
                <span className="text-[#D7E2EA]/30 font-light text-[0.66rem]">
                  {fmt(post.date)}
                </span>
              </div>

              <h3 className="mt-1.5 leading-snug">
                <a
                  href={`/blog/${post.slug}/`}
                  className="text-[#D7E2EA]/90 font-medium text-[1rem] transition-colors hover:text-white"
                >
                  {post.title}
                </a>
              </h3>

              {post.excerpt && (
                <p className="text-[#D7E2EA]/45 font-light text-[0.84rem] leading-relaxed mt-2">
                  {post.excerpt}
                </p>
              )}
            </article>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.5} y={20} className="flex justify-center mt-12 sm:mt-14">
        <a
          href="/blog/"
          className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/50 text-[#D7E2EA] font-medium uppercase tracking-widest px-7 py-3 text-xs sm:text-sm transition-colors duration-300 hover:bg-[#D7E2EA]/10"
        >
          Read the blog
        </a>
      </FadeIn>
    </section>
  );
}
