import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Plus } from 'lucide-react';
import { services } from '../../data/portfolio';
import { disciplineExtras } from '../../data/home';
import type { DisciplineLink } from '../../data/home';
import { Reveal, SectionTitle, Slate, goTo, useMode, useThumb, useVoiced } from './ui';

export type DisciplineCounts = Record<string, string>;

function follow(link: DisciplineLink) {
  if (link.kind === 'work') goTo('work', { filter: link.filter });
  else if (link.kind === 'reel') goTo('showreel', { tag: link.tag });
  else goTo('contact');
}

/**
 * Three prints fanned out beside the pointer while it is over a row. Written
 * straight to the element's transform on each frame rather than through state,
 * so following the mouse never re-renders the list.
 */
function Follower({ active, previews }: { active: boolean; previews: string[] }) {
  const el = useRef<HTMLDivElement>(null);
  const thumb = useThumb();

  useEffect(() => {
    let x = 0;
    let y = 0;
    let cx = 0;
    let cy = 0;
    let frame = 0;
    const tick = () => {
      cx += (x - cx) * 0.16;
      cy += (y - cy) * 0.16;
      if (el.current) el.current.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(tick) : 0;
    };
    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!cx && !cy) {
        cx = x;
        cy = y;
      }
      if (!frame) frame = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
    };
  }, []);

  return (
    <div ref={el} aria-hidden="true" className="hidden lg:block fixed left-0 top-0 z-30 pointer-events-none">
      <div
        className={`relative -translate-x-1/2 -translate-y-1/2 w-[260px] h-[200px] transition-opacity duration-300 ${
          active && previews.length ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {previews.map((src, i) => (
          <img
            key={src}
            src={thumb(src)}
            alt=""
            decoding="async"
            className="absolute inset-0 m-auto w-[200px] h-[150px] object-cover rounded-md shadow-[0_20px_50px_rgba(0,0,0,0.6)] border border-white/10"
            style={{
              transform: `translate(${(i - 1) * 46}px, ${(i - 1) * -10}px) rotate(${(i - 1) * 7}deg) scale(${
                active ? 1 : 0.8
              })`,
              transition: `transform 0.6s cubic-bezier(0.16,1,0.3,1) ${i * 50}ms`,
              zIndex: i === 1 ? 3 : 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Row({
  service,
  counts,
  open,
  onToggle,
  onHover,
}: {
  service: (typeof services)[number];
  counts: DisciplineCounts;
  open: boolean;
  onToggle: () => void;
  onHover: (on: boolean) => void;
}) {
  const extra = disciplineExtras[service.name];
  const { mode } = useMode();
  const thumb = useThumb();
  const panelId = `discipline-${service.number}`;

  return (
    <li className="border-b border-[#D7E2EA]/[0.12]">
      <button
        type="button"
        onClick={onToggle}
        onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(true)}
        onPointerLeave={() => onHover(false)}
        aria-expanded={open}
        aria-controls={panelId}
        data-cursor={open ? 'Close' : 'Open'}
        className="group w-full grid grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-8 py-5 sm:py-7 text-left"
      >
        <span className="vp-label text-[#ff8a3d] w-8">{service.number}</span>
        <span
          className={`font-black uppercase leading-[0.95] tracking-tight transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3 ${
            open ? 'vp-grad-text' : 'text-[#D7E2EA]'
          }`}
          style={{ fontSize: 'clamp(1.7rem, 5.6vw, 5.4rem)' }}
        >
          {service.name}
        </span>
        <span className="flex items-center gap-4">
          {counts[service.name] ? (
            <span className="vp-label text-[#D7E2EA]/45 hidden sm:inline">{counts[service.name]}</span>
          ) : null}
          <span
            className={`grid place-items-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border transition-all duration-500 ${
              open ? 'rotate-45 border-[#ff8a3d] text-[#ff8a3d]' : 'border-[#D7E2EA]/25 text-[#D7E2EA]/70 group-hover:border-[#D7E2EA]/60'
            }`}
          >
            <Plus className="w-4 h-4" strokeWidth={1.6} />
          </span>
        </span>
      </button>

      <div
        id={panelId}
        className="grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <div className="grid md:grid-cols-12 gap-6 md:gap-10 pb-8 sm:pb-10 md:pl-[4.5rem]">
            <p className="md:col-span-5 text-[#D7E2EA]/75 font-light leading-relaxed text-[0.98rem]">
              {service.description}
            </p>

            <div className="md:col-span-4 flex flex-col gap-4">
              {(mode ? [mode] : (['client', 'studio'] as const)).map((m) => (
                <div key={m}>
                  <span className="vp-label text-[#ff8a3d]">{m === 'client' ? 'For your project' : 'For your team'}</span>
                  <p className="text-[#D7E2EA] font-light leading-snug mt-1 text-[0.98rem]">{extra[m]}</p>
                </div>
              ))}
            </div>

            <div className="md:col-span-3 flex flex-col gap-4">
              {extra.previews.length ? (
                <div className="flex gap-2">
                  {extra.previews.map((src) => (
                    <img
                      key={src}
                      src={thumb(src)}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-1/3 aspect-[4/3] object-cover rounded-sm border border-white/10"
                    />
                  ))}
                </div>
              ) : null}
              <button
                type="button"
                onClick={() => follow(extra.link)}
                className="self-start inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 px-4 py-2.5 text-[#D7E2EA] font-medium uppercase tracking-widest text-[0.66rem] transition-colors duration-300 hover:bg-[#D7E2EA] hover:text-black"
              >
                {extra.link.label}
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Disciplines({ counts }: { counts: DisciplineCounts }) {
  const [open, setOpen] = useState<string | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const intro = useVoiced({
    none: 'Six crafts that feed into each other. Open one to see what it covers and where to find the work.',
    studio: 'Six crafts, and the pipeline knowledge that joins them. Open one for the detail.',
    client: 'Everything I can make for you. Open one to see what you would get, and examples.',
  });

  const previews = hovered ? disciplineExtras[hovered]?.previews ?? [] : [];

  return (
    <section
      id="skills"
      data-section="What I do"
      data-index="01"
      className="relative px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 pb-10 scroll-mt-16"
    >
      <Slate index="01" label="What I do" aside={`${services.length} disciplines`} />
      <div className="grid lg:grid-cols-12 gap-6 mt-8 sm:mt-10 items-end">
        <SectionTitle text="What I do" className="lg:col-span-8" />
        <Reveal as="p" delay={150} className="lg:col-span-4 text-[#D7E2EA]/65 font-light leading-relaxed text-[1rem] max-w-[420px]">
          {intro}
        </Reveal>
      </div>

      <Reveal as="ul" delay={100} className="mt-10 sm:mt-14 border-t border-[#D7E2EA]/[0.12]">
        {services.map((service) => (
          <Row
            key={service.number}
            service={service}
            counts={counts}
            open={open === service.name}
            onToggle={() => setOpen((cur) => (cur === service.name ? null : service.name))}
            onHover={(on) => setHovered(on ? service.name : null)}
          />
        ))}
      </Reveal>

      <Follower active={hovered !== null && hovered !== open} previews={previews} />
    </section>
  );
}
