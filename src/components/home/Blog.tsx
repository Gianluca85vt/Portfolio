import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { blog, categoryColors } from '../../data/portfolio';
import type { BlogCategory } from '../../data/portfolio';
import { Buckets, Reveal, SectionTitle, Slate, fmtCount, pad, useInView } from './ui';

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

const colour = (category: string) => categoryColors[category as BlogCategory] ?? '#B600A8';

function Feature({ post }: { post: HomePost }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref);
  return (
    <a ref={ref} href={`/blog/${post.slug}/`} data-cursor="Read" className="group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0b0b]">
        {post.cover ? (
          <img
            src={post.cover}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        ) : null}
        {post.score !== undefined ? (
          <span className="absolute top-3 right-3 vp-label rounded-full bg-black/75 text-white px-2.5 py-1">{post.score}/10</span>
        ) : null}
        <Buckets cols={8} rows={5} active={inView} step={16} />
        <span className="vp-brackets vp-brackets--hover" style={{ '--l': '16px' } as CSSProperties} />
      </div>
      <div className="flex items-center gap-3 mt-5">
        <span className="vp-label" style={{ color: colour(post.category) }}>{post.category}</span>
        <span className="vp-label text-[#D7E2EA]/35">{fmt(post.date)}</span>
      </div>
      <h3 className="text-[#D7E2EA] font-medium leading-[1.1] mt-2 transition-colors group-hover:text-white" style={{ fontSize: 'clamp(1.4rem, 2.6vw, 2.3rem)' }}>
        {post.title}
      </h3>
      {post.excerpt ? <p className="text-[#D7E2EA]/55 font-light leading-relaxed mt-3 text-[0.98rem] max-w-[640px]">{post.excerpt}</p> : null}
    </a>
  );
}

export default function Blog({ posts = [], total = 0 }: { posts?: HomePost[]; total?: number }) {
  if (posts.length === 0) return null;
  const [first, ...rest] = posts;

  return (
    <section
      id="blog"
      data-section="Backdrop, the blog"
      data-index="08"
      className="relative px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 pb-10 scroll-mt-16"
    >
      <Slate index="08" label="Backdrop · the blog" aside={total ? `${fmtCount(total)} articles` : undefined} />
      <div className="grid lg:grid-cols-12 gap-6 mt-8 sm:mt-10 items-end">
        <SectionTitle text={blog.name} className="lg:col-span-7" />
        <Reveal delay={150} className="lg:col-span-5 max-w-[480px]">
          <p className="vp-label text-[#ff8a3d]">{blog.tagline}</p>
          <p className="text-[#D7E2EA]/65 font-light leading-relaxed text-[1rem] mt-3">{blog.description}</p>
        </Reveal>
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-12 sm:mt-16">
        <Reveal className="lg:col-span-7">
          <Feature post={first} />
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <ul className="border-t border-[#D7E2EA]/[0.12]">
            {rest.map((post, i) => (
              <li key={post.slug} className="border-b border-[#D7E2EA]/[0.12]">
                <a href={`/blog/${post.slug}/`} className="group grid grid-cols-[auto_1fr_auto] gap-4 py-5 items-start">
                  <span className="vp-label text-[#D7E2EA]/35 pt-1">{pad(i + 2)}</span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-3">
                      <span className="vp-label" style={{ color: colour(post.category) }}>{post.category}</span>
                      <span className="vp-label text-[#D7E2EA]/35">{fmt(post.date)}</span>
                    </span>
                    <span className="block text-[#D7E2EA]/90 font-medium leading-snug mt-1.5 text-[1.05rem] transition-colors group-hover:text-white">
                      {post.title}
                    </span>
                  </span>
                  {post.cover ? (
                    <span className="relative w-20 sm:w-24 aspect-[4/3] overflow-hidden rounded-[2px] bg-[#0b0b0b]">
                      <img
                        src={post.cover}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 transition-all duration-500 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                      />
                    </span>
                  ) : (
                    <span />
                  )}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="/blog/"
            className="group inline-flex items-center gap-2 mt-8 rounded-full border border-[#D7E2EA]/30 px-6 py-3 text-[#D7E2EA] font-medium uppercase tracking-widest text-[0.7rem] transition-colors duration-300 hover:bg-[#D7E2EA] hover:text-black"
          >
            Read {blog.name}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
