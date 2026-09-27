import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import AvatarScrub from '../ui/AvatarScrub';
import { site } from '../../data/portfolio';
import { chooser, hero } from '../../data/home';
import { Buckets, useMode, useVoiced } from './ui';

export type LatestPost = { slug: string; title: string; category: string; excerpt: string };

/** How long the portrait waits for its video before rendering in anyway. */
const READY_FALLBACK = 2600;
const TICKER_EVERY = 5200;

function Headline() {
  let i = 0;
  const words = hero.greeting.split(' ');
  return (
    <h1
      aria-label={hero.greeting}
      className="font-black uppercase tracking-tight leading-[0.86] sm:whitespace-nowrap text-center text-[18vw] sm:text-[11vw] md:text-[11.3vw] lg:text-[11.6vw]"
    >
      {words.map((word, w) => (
        // On a phone the name takes a line of its own, at twice the size.
        <span key={w} aria-hidden="true" className={w === words.length - 1 ? 'block sm:inline' : undefined}>
          <span className="vp-line" style={{ display: 'inline-block' }}>
            {[...word].map((ch) => (
              <span key={i} className="vp-rise hero-heading" style={{ '--i': i++ } as CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          {w < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </h1>
  );
}

/** The newest articles, one at a time, in a single line under the header. */
function Ticker({ posts }: { posts: LatestPost[] }) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (posts.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let swap = 0;
    const t = window.setInterval(() => {
      setShown(false);
      swap = window.setTimeout(() => {
        setIndex((n) => (n + 1) % posts.length);
        setShown(true);
      }, 400);
    }, TICKER_EVERY);
    return () => {
      window.clearInterval(t);
      window.clearTimeout(swap);
    };
  }, [posts.length]);

  if (posts.length === 0) return null;
  const post = posts[index];

  return (
    <a
      href={`/blog/${post.slug}/`}
      className="vp-appear group flex items-center gap-2.5 min-w-0 max-w-full sm:max-w-[560px]"
      style={{ '--delay': '0.9s' } as CSSProperties}
    >
      <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#B600A8] vp-pulse shrink-0" />
      <span className="vp-label text-[#D7E2EA]/45 shrink-0">New on the blog</span>
      <span
        className={`truncate text-[#D7E2EA]/80 text-[0.8rem] font-light transition-opacity duration-300 group-hover:text-white ${
          shown ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {post.title}
      </span>
      <ArrowRight className="w-3.5 h-3.5 shrink-0 text-[#D7E2EA]/40 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={1.6} />
    </a>
  );
}

function Chooser() {
  const { mode, setMode } = useMode();

  return (
    <div
      className="vp-appear w-full md:w-[340px] rounded-2xl border border-[#D7E2EA]/15 bg-black/55 backdrop-blur-md p-3.5 sm:p-4"
      style={{ '--delay': '1.25s' } as CSSProperties}
    >
      {mode ? (
        <>
          <div className="flex items-center justify-between gap-3">
            <span className="vp-label text-[#ff8a3d] flex items-center gap-2">
              <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-[#ff8a3d]" />
              {chooser.chosen[mode]}
            </span>
            <button
              type="button"
              onClick={() => setMode(null)}
              className="vp-label text-[#D7E2EA]/45 hover:text-[#D7E2EA] underline underline-offset-4 decoration-[#D7E2EA]/25"
            >
              Change
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3">
            {mode === 'studio' ? (
              <>
                <a href={site.cv} download={site.cvFileName} className="rounded-xl vp-grad-bg text-white text-center font-medium uppercase tracking-widest text-[0.66rem] px-3 py-3">
                  Resume
                </a>
                <a href="#work" className="rounded-xl border border-[#D7E2EA]/25 text-[#D7E2EA] text-center font-medium uppercase tracking-widest text-[0.66rem] px-3 py-3 hover:bg-white/5">
                  See the work
                </a>
              </>
            ) : (
              <>
                <a href="#contact" className="rounded-xl vp-grad-bg text-white text-center font-medium uppercase tracking-widest text-[0.66rem] px-3 py-3">
                  Start a brief
                </a>
                <a href="#skills" className="rounded-xl border border-[#D7E2EA]/25 text-[#D7E2EA] text-center font-medium uppercase tracking-widest text-[0.66rem] px-3 py-3 hover:bg-white/5">
                  What I do
                </a>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          <span className="vp-label text-[#D7E2EA]/55">{chooser.question}</span>
          <div className="grid grid-cols-2 gap-2 mt-2.5">
            {chooser.options.map((option) => (
              <button
                key={option.mode}
                type="button"
                onClick={() => setMode(option.mode)}
                className="group text-left rounded-xl border border-[#D7E2EA]/20 px-3 py-2.5 transition-colors duration-300 hover:border-[#D7E2EA]/50 hover:bg-white/[0.04]"
              >
                <span className="flex items-center justify-between text-[#D7E2EA] font-medium uppercase tracking-wide text-[0.86rem]">
                  {option.label}
                  <ArrowRight className="w-3.5 h-3.5 text-[#D7E2EA]/40 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-[#ff8a3d]" strokeWidth={1.8} />
                </span>
                <span className="vp-label block !text-[0.58rem] text-[#D7E2EA]/45 mt-0.5">{option.detail}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Hero({ latest = [] }: { latest?: LatestPost[] }) {
  const lede = useVoiced(hero.lede);
  const [ready, setReady] = useState(false);
  const [touch, setTouch] = useState(false);

  useEffect(() => {
    setTouch(!window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    const t = window.setTimeout(() => setReady(true), READY_FALLBACK);
    return () => window.clearTimeout(t);
  }, []);

  return (
    // `isolate` makes the section the one stacking context the portrait blends
    // in. Nothing between the video and this element may start another — no
    // z-index on the wrappers, no opacity, no transform — or its black field
    // stops being see-through and covers the floor behind it.
    <section
      id="top"
      data-section="Hello"
      data-index="00"
      className="relative isolate h-[100svh] min-h-[640px] overflow-hidden"
    >
      <div aria-hidden="true" className="vp-floor" />
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(42% 46% at 50% 62%, rgba(118,33,176,0.2), transparent 72%)' }}
      />

      <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none">
        <div className="relative">
          <AvatarScrub
            alt="3D portrait of Gianluca Scattarella that turns to follow the pointer"
            onReady={() => setReady(true)}
            className="block h-[60svh] sm:h-[66vh] md:h-[76vh] lg:h-[82vh] w-auto max-w-none select-none"
          />
          <Buckets cols={16} rows={9} active={ready} step={6} />
        </div>
      </div>

      {/* Keeps the copy at the bottom readable where it crosses the chin. */}
      <div
        aria-hidden="true"
        className="md:hidden absolute inset-x-0 bottom-0 h-[42%] pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.94), rgba(0,0,0,0.55) 45%, transparent)' }}
      />

      <div className="relative z-20 px-5 sm:px-8 md:px-10 pt-[76px] sm:pt-20">
        <Ticker posts={latest} />
        <div className="mt-4 sm:mt-3">
          <Headline />
        </div>
      </div>

      <p
        className="vp-appear vp-label hidden sm:flex absolute z-20 right-8 md:right-10 top-[46%] items-center gap-2 text-[#D7E2EA]/50"
        style={{ '--delay': '1.8s' } as CSSProperties}
      >
        <span aria-hidden="true" className="text-[#ff8a3d]">↔</span>
        {touch ? hero.turnHint.touch : hero.turnHint.fine}
      </p>

      <div className="absolute inset-x-0 bottom-0 z-20 px-5 sm:px-8 md:px-10 pb-5 md:pb-14 flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-8">
        <div className="vp-appear max-w-[420px]" style={{ '--delay': '1s' } as CSSProperties}>
          <span className="vp-label text-[#ff8a3d]">{hero.role}</span>
          <p className="text-[#D7E2EA] font-light leading-snug mt-2 text-[0.98rem] sm:text-[1.1rem] md:text-[1.2rem]">
            {lede}
          </p>
          <a href="#skills" className="hidden md:inline-flex items-center gap-2 vp-label text-[#D7E2EA]/50 hover:text-[#D7E2EA] mt-5 transition-colors">
            <ArrowDown className="w-3.5 h-3.5" strokeWidth={1.6} />
            Scroll to see the work
          </a>
        </div>
        <Chooser />
      </div>
    </section>
  );
}
