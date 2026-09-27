import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { showreel } from '../../data/portfolio';
import { reel } from '../../data/home';
import type { ReelTag } from '../../data/home';
import { Buckets, Reveal, SectionTitle, Slate, pad, useInView, useThumb } from './ui';
import type { ReelEvent } from './ui';

const TRACK_COLOUR: Record<ReelTag, string> = {
  'Unreal Engine': '#ff8a3d',
  Animation: '#B600A8',
  'Motion Design': '#8f4de0',
};

// Castle Lake: the environment the site already uses as its share picture.
const FIRST = Math.max(0, showreel.findIndex((v) => v.id === 'U9QQZWzm9Ac'));

/**
 * The showreel as an editing timeline: one player, and every clip laid out on
 * the track it belongs to — real-time, animation, motion design — in the order
 * they sit in the reel. The playhead marks what is loaded. Nothing from
 * YouTube loads until a clip is actually played.
 */
export default function Showreel() {
  const [active, setActive] = useState(FIRST);
  const [playing, setPlaying] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const inView = useInView(stage);
  const thumb = useThumb();

  const video = showreel[active];

  // Keep the loaded clip in view on the timeline, without moving the page.
  useEffect(() => {
    const box = scroller.current;
    const clip = box?.querySelector<HTMLElement>(`[data-clip="${active}"]`);
    if (!box || !clip) return;
    const target = clip.offsetLeft - box.clientWidth / 2 + clip.offsetWidth / 2;
    box.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [active]);

  useEffect(() => {
    const on = (e: Event) => {
      const { tag } = (e as CustomEvent<ReelEvent>).detail;
      const i = showreel.findIndex((v) => v.tag === tag);
      if (i >= 0) {
        setActive(i);
        setPlaying(false);
      }
    };
    window.addEventListener('vp:showreel', on);
    return () => window.removeEventListener('vp:showreel', on);
  }, []);

  const pick = (i: number) => {
    if (drag.current?.moved) return;
    setActive(i);
    setPlaying(true);
  };

  return (
    <section
      id="showreel"
      data-section="Showreel"
      data-index="03"
      className="relative px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 pb-10 scroll-mt-16"
    >
      <Slate index="03" label="Showreel" aside={`${showreel.length} clips`} />
      <div className="grid lg:grid-cols-12 gap-6 mt-8 sm:mt-10 items-end">
        <SectionTitle text="Showreel" className="lg:col-span-8" />
        <Reveal as="p" delay={150} className="lg:col-span-4 text-[#D7E2EA]/65 font-light leading-relaxed text-[1rem] max-w-[420px]">
          {reel.intro}
        </Reveal>
      </div>

      <div ref={stage} className="relative mt-10 sm:mt-14 aspect-video w-full max-w-[1400px] mx-auto bg-[#050505] overflow-hidden">
        {playing ? (
          <iframe
            key={video.id}
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            data-cursor="Play"
            aria-label={`Play ${video.title}`}
            className="group absolute inset-0 w-full h-full"
          >
            <img
              key={video.id}
              src={`/img/video/${video.id}.jpg`}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/40" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="relative grid place-items-center w-20 h-20 sm:w-24 sm:h-24 rounded-full vp-grad-bg shadow-[0_20px_60px_rgba(182,0,168,0.35)] transition-transform duration-500 group-hover:scale-110">
                <span
                  aria-hidden="true"
                  className="ml-1.5 border-solid border-y-[12px] border-y-transparent border-l-[20px] border-l-white"
                />
              </span>
            </span>
            <span className="absolute left-4 sm:left-6 bottom-4 sm:bottom-6 right-4 text-left">
              <span className="vp-label block" style={{ color: TRACK_COLOUR[video.tag] }}>
                {video.tag}
              </span>
              <span className="block text-[#D7E2EA] font-medium uppercase leading-tight mt-1" style={{ fontSize: 'clamp(1.1rem, 2.6vw, 2.2rem)' }}>
                {video.title}
              </span>
            </span>
          </button>
        )}
        <Buckets cols={8} rows={5} active={inView} step={16} />
        <span className="vp-brackets pointer-events-none" style={{ '--l': '22px', inset: '12px' } as CSSProperties} />
        {!playing ? (
          <span className="absolute top-4 sm:top-6 right-4 sm:right-6 vp-label text-[#D7E2EA]/70 tabular-nums">
            {pad(active + 1)} / {pad(showreel.length)}
          </span>
        ) : null}
      </div>

      <Reveal delay={120} className="max-w-[1400px] mx-auto mt-4">
        <div
          ref={scroller}
          data-cursor="Drag"
          className="vp-timeline relative overflow-x-auto overscroll-x-contain select-none [--clip:124px] sm:[--clip:156px] [--label:84px] sm:[--label:128px]"
          onPointerDown={(e) => {
            if (e.pointerType !== 'mouse' || !scroller.current) return;
            drag.current = { x: e.clientX, left: scroller.current.scrollLeft, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d || !scroller.current) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 5) d.moved = true;
            if (d.moved) scroller.current.scrollLeft = d.left - dx;
          }}
          onPointerUp={() => {
            // Let the click that ends a drag see `moved`, then forget the drag.
            window.setTimeout(() => (drag.current = null), 0);
          }}
          onPointerLeave={() => (drag.current = null)}
        >
          <div className="relative pb-3" style={{ width: `calc(var(--label) + var(--clip) * ${showreel.length} + 16px)` }}>
            {/* ruler */}
            <div className="flex h-7 border-b border-[#D7E2EA]/[0.12]" style={{ paddingLeft: 'var(--label)' }}>
              {showreel.map((v, i) => (
                <span key={v.id} className="relative shrink-0 h-full" style={{ width: 'var(--clip)' }}>
                  <span className="absolute left-0 bottom-0 h-2 w-px bg-[#D7E2EA]/25" />
                  <span className={`vp-label !text-[0.56rem] absolute left-1.5 top-1 tabular-nums ${i === active ? 'text-[#ff8a3d]' : 'text-[#D7E2EA]/35'}`}>
                    {pad(i + 1)}
                  </span>
                </span>
              ))}
            </div>

            {reel.tracks.map((track) => (
              <div key={track.tag} className="relative flex items-center h-[88px] sm:h-[104px] border-b border-[#D7E2EA]/[0.08]">
                <div className="sticky left-0 z-10 shrink-0 h-full flex flex-col justify-center bg-black pr-3" style={{ width: 'var(--label)' }}>
                  <span className="vp-label !text-[0.62rem]" style={{ color: TRACK_COLOUR[track.tag] }}>
                    {track.label}
                  </span>
                  <span className="vp-label !text-[0.52rem] text-[#D7E2EA]/35 hidden sm:block">{track.detail}</span>
                </div>
                <div className="relative h-full flex-1 vp-track-line">
                  {showreel.map((v, i) =>
                    v.tag === track.tag ? (
                      <button
                        key={v.id}
                        type="button"
                        data-clip={i}
                        data-cursor="Play"
                        onClick={() => pick(i)}
                        aria-label={`Play ${v.title}`}
                        aria-current={i === active}
                        className="group absolute top-1/2 -translate-y-1/2 p-1"
                        style={{ left: `calc(var(--clip) * ${i})`, width: 'var(--clip)' }}
                      >
                        <span
                          className={`relative block aspect-video overflow-hidden rounded-[3px] border transition-colors duration-300 ${
                            i === active ? 'border-[#D7E2EA]' : 'border-white/10 group-hover:border-[#D7E2EA]/50'
                          }`}
                          style={{ borderTop: `2px solid ${TRACK_COLOUR[v.tag]}` }}
                        >
                          <img
                            src={thumb(`/img/video/${v.id}.jpg`)}
                            alt=""
                            loading="lazy"
                            decoding="async"
                            draggable={false}
                            className={`w-full h-full object-cover transition-all duration-500 ${
                              i === active ? 'opacity-100' : 'opacity-55 grayscale group-hover:opacity-90 group-hover:grayscale-0'
                            }`}
                          />
                        </span>
                        <span className="vp-label !text-[0.52rem] block text-left text-[#D7E2EA]/55 truncate mt-1 normal-case tracking-normal">
                          {v.title}
                        </span>
                      </button>
                    ) : null
                  )}
                </div>
              </div>
            ))}

            {/* playhead */}
            <span
              aria-hidden="true"
              className="absolute top-0 bottom-3 w-px bg-[#ff8a3d] transition-[left] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none"
              style={{ left: `calc(var(--label) + var(--clip) * ${active} + var(--clip) / 2)` }}
            >
              <span className="absolute -left-[5px] top-0 w-[11px] h-[11px] bg-[#ff8a3d]" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
