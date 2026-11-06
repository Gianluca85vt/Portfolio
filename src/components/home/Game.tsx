import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { game } from '../../data/home';
import { Buckets, Reveal, SectionTitle, Slate, pad, useInView } from './ui';

/** The game, between the blog and the contact form. Its own site lives at /thedivinecomedy/. */
function Feature() {
  const ref = useRef<HTMLAnchorElement>(null);
  const inView = useInView(ref);
  return (
    <a ref={ref} href={game.href} data-cursor="Enter" className="group block" aria-label={game.cta}>
      <div className="relative aspect-[16/9] overflow-hidden bg-[#0b0b0b]">
        <img
          src={game.image.src}
          alt={game.image.alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
        <Buckets cols={8} rows={5} active={inView} step={16} />
        <span className="vp-brackets vp-brackets--hover" style={{ '--l': '16px' } as CSSProperties} />
      </div>
    </a>
  );
}

export default function Game() {
  return (
    <section
      id="game"
      data-section="The game"
      data-index="09"
      className="relative px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 pb-10 scroll-mt-16"
    >
      <Slate index="09" label="The game" aside={game.status} />
      <SectionTitle text={game.name} className="mt-8 sm:mt-10" />

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-12 sm:mt-16">
        <Reveal className="lg:col-span-7">
          <Feature />
          <ul className="grid grid-cols-3 gap-3 sm:gap-4 mt-3 sm:mt-4">
            {game.characters.map((c) => (
              <li key={c.name}>
                <a href={game.charactersHref} className="group block">
                  <span
                    className="block relative aspect-[3/4] overflow-hidden rounded-[2px] border border-[#D7E2EA]/10"
                    style={{ background: 'radial-gradient(circle at 50% 38%, #2a211b 0%, #0e0c0b 72%)' }}
                  >
                    <img
                      src={c.src}
                      alt={c.alt}
                      loading="lazy"
                      decoding="async"
                      className="absolute inset-0 w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span className="vp-label block text-[#D7E2EA]/60 mt-2 transition-colors group-hover:text-[#D7E2EA]">{c.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-5">
          <p className="vp-label text-[#ff8a3d]">{game.tagline}</p>
          <p className="text-[#D7E2EA]/65 font-light leading-relaxed text-[1rem] mt-3 max-w-[520px]">{game.description}</p>
          <ul className="border-t border-[#D7E2EA]/[0.12] mt-8">
            {game.traits.map((t, i) => (
              <li key={t.title} className="grid grid-cols-[auto_1fr] gap-4 border-b border-[#D7E2EA]/[0.12] py-5">
                <span className="vp-label text-[#D7E2EA]/35 pt-1">{pad(i + 1)}</span>
                <span className="min-w-0">
                  <span className="block text-[#D7E2EA]/90 font-medium leading-snug text-[1.05rem]">{t.title}</span>
                  <span className="block text-[#D7E2EA]/55 font-light leading-relaxed text-[0.95rem] mt-1.5">{t.text}</span>
                </span>
              </li>
            ))}
          </ul>
          <a
            href={game.href}
            className="group inline-flex items-center gap-2 mt-8 rounded-full vp-grad-bg px-6 py-3 text-white font-medium uppercase tracking-widest text-[0.72rem] transition-transform duration-300 hover:-translate-y-0.5"
          >
            {game.cta}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.8} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
