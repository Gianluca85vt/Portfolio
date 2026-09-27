import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Compass, Download, Linkedin, Users, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { about, direction, site, socials } from '../../data/portfolio';
import { aboutLead } from '../../data/home';
import { Buckets, Reveal, SectionTitle, Slate, fmtCount, pad, useInView, usePrefersReducedMotion, useThumb } from './ui';

export type Facts = { label: string; value: number }[];

/** Counts up to the real number once, when it scrolls into view. */
function Counter({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref);
  const still = usePrefersReducedMotion();
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!inView || still) {
      setShown(value);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 1300);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    setShown(0);
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, still, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {fmtCount(shown)}
    </span>
  );
}

/** The opening sentence, with a small picture of each thing it names set into the line. */
function Lead() {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref);
  const thumb = useThumb();
  let chip = 0;

  return (
    <p
      ref={ref}
      className="text-[#D7E2EA] font-light leading-[1.08] tracking-tight"
      style={{ fontSize: 'clamp(1.9rem, 4.9vw, 5rem)' }}
    >
      {aboutLead.parts.map((part, i) =>
        'chip' in part && part.chip ? (
          <span
            key={i}
            className="inline-block align-middle mx-[0.18em] h-[0.78em] w-[1.5em] rounded-full overflow-hidden border border-white/15 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
            style={{
              transform: inView ? 'scale(1)' : 'scale(0)',
              transitionDelay: `${250 + chip++ * 140}ms`,
            }}
          >
            <img src={thumb(part.chip)} alt={part.alt} loading="lazy" className="w-full h-full object-cover" />
          </span>
        ) : (
          <span key={i}>{'text' in part ? part.text : ''}</span>
        )
      )}
    </p>
  );
}

const PILLAR_ICONS: Record<string, LucideIcon> = { compass: Compass, users: Users, workflow: Workflow };

export function Direction() {
  return (
    <section
      id="direction"
      data-section="Direction"
      data-index="06"
      className="relative px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 pb-10 scroll-mt-16"
    >
      <Slate index="06" label="Direction" aside="Art direction · coordination · pipeline" />
      <div className="grid lg:grid-cols-12 gap-6 mt-8 sm:mt-10 items-end">
        <SectionTitle text="Direction" className="lg:col-span-7" />
        <Reveal delay={150} className="lg:col-span-5 max-w-[480px]">
          <p className="text-[#ff8a3d] vp-label">{direction.tagline}</p>
          <p className="text-[#D7E2EA]/65 font-light leading-relaxed text-[1rem] mt-3">{direction.intro}</p>
        </Reveal>
      </div>

      <div className="grid md:grid-cols-3 gap-px bg-[#D7E2EA]/10 border border-[#D7E2EA]/10 mt-12 sm:mt-16">
        {direction.pillars.map((pillar, i) => {
          const Icon = PILLAR_ICONS[pillar.icon] ?? Compass;
          return (
            <Reveal key={pillar.name} delay={i * 120} className="group relative bg-black p-6 sm:p-8 flex flex-col gap-5 min-h-[300px]">
              <span className="absolute inset-x-0 top-0 h-[2px] vp-grad-bg origin-left scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
              <div className="flex items-center justify-between">
                <span className="vp-label text-[#ff8a3d]">{pad(i + 1)}</span>
                <Icon className="w-6 h-6 text-[#D7E2EA]/60 transition-transform duration-700 group-hover:rotate-[20deg]" strokeWidth={1.3} />
              </div>
              <h3 className="text-[#D7E2EA] font-black uppercase leading-none tracking-tight mt-auto" style={{ fontSize: 'clamp(1.5rem, 2.4vw, 2.2rem)' }}>
                {pillar.name}
              </h3>
              <p className="text-[#D7E2EA]/65 font-light leading-relaxed text-[0.95rem]">{pillar.description}</p>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={100} className="mt-10 max-w-[760px]">
        <span className="vp-label text-[#D7E2EA]/45">The tools on the call sheet</span>
        <ul className="mt-3">
          {direction.tools.map((tool) => (
            <li key={tool.name} className="flex items-baseline gap-3 py-2.5 border-b border-[#D7E2EA]/[0.08]">
              <span className="text-[#D7E2EA] font-medium uppercase tracking-wide text-[0.95rem]">{tool.name}</span>
              <span aria-hidden="true" className="flex-1 border-b border-dotted border-[#D7E2EA]/20 translate-y-[-4px]" />
              <span className="vp-label text-[#D7E2EA]/50">{tool.role}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export default function About({ facts }: { facts: Facts }) {
  const photo = useRef<HTMLDivElement>(null);
  const photoIn = useInView(photo);
  const thumb = useThumb();
  const linkedin = socials.find((s) => s.icon === 'linkedin');

  return (
    <section
      id="about"
      data-section="About"
      data-index="05"
      className="relative px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 pb-10 scroll-mt-16"
    >
      <Slate index="05" label="About" aside="Trained at the International School of Comics" />

      <div className="mt-10 sm:mt-14 max-w-[1400px]">
        <Lead />
      </div>

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 mt-14 sm:mt-20">
        <div ref={photo} className="lg:col-span-5 relative self-start">
          <div className="relative aspect-[798/432] overflow-hidden bg-[#0b0b0b]">
            <img
              src={thumb('/img/me/portrait.png')}
              alt={`${site.name}, portrait`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <Buckets cols={8} rows={4} active={photoIn} step={20} />
            <span className="vp-brackets" style={{ '--l': '16px', inset: '10px' } as CSSProperties} />
          </div>
          <span className="vp-label text-[#D7E2EA]/40 block mt-4">{site.name} · {site.role}</span>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-10">
          <Reveal as="p" className="text-[#D7E2EA]/75 font-light leading-relaxed text-[1.05rem] sm:text-[1.15rem] max-w-[640px]">
            {about.body}
          </Reveal>

          <Reveal delay={120}>
            <dl className="grid grid-cols-2 sm:grid-cols-3 gap-px bg-[#D7E2EA]/10 border border-[#D7E2EA]/10">
              {facts.map((fact) => (
                <div key={fact.label} className="bg-black p-4 sm:p-5 flex flex-col-reverse">
                  <dt className="vp-label text-[#D7E2EA]/50 mt-2">{fact.label}</dt>
                  <dd className="text-[#D7E2EA] font-black leading-none tracking-tight" style={{ fontSize: 'clamp(2rem, 4vw, 3.4rem)' }}>
                    <Counter value={fact.value} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal delay={180} className="flex flex-wrap gap-3">
            <a
              href={site.cv}
              download={site.cvFileName}
              className="inline-flex items-center gap-2 rounded-full vp-grad-bg text-white font-medium uppercase tracking-widest text-[0.7rem] px-6 py-3 transition-transform duration-300 hover:scale-[1.03]"
            >
              <Download className="w-4 h-4" strokeWidth={1.8} />
              Download resume
            </a>
            {linkedin ? (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] font-medium uppercase tracking-widest text-[0.7rem] px-6 py-3 transition-colors duration-300 hover:bg-[#D7E2EA] hover:text-black"
              >
                <Linkedin className="w-4 h-4" strokeWidth={1.8} />
                LinkedIn
              </a>
            ) : null}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
