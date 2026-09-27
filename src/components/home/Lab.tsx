import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { lab } from '../../data/home';
import { buildRock, drawRock } from './rock';
import type { Look, Mesh } from './rock';
import { Buckets, Reveal, SectionTitle, Slate, fmtCount, pad, useInView, usePrefersReducedMotion, useThumb, useVoiced } from './ui';

type TabId = (typeof lab.tabs)[number]['id'];

/* ------------------------------------------------------ lines to colour */

function LinesStage({ pick }: { pick: number }) {
  const piece = lab.lines[pick];
  const [split, setSplit] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const [dims, setDims] = useState<{ w: number; h: number } | null>(null);

  const setFrom = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setSplit(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  const onKey = (e: ReactKeyboardEvent) => {
    if (e.key === 'ArrowLeft') setSplit((s) => Math.max(0, s - 5));
    if (e.key === 'ArrowRight') setSplit((s) => Math.min(100, s + 5));
    if (e.key === 'Home') setSplit(0);
    if (e.key === 'End') setSplit(100);
  };

  // A new character starts from the middle again.
  useEffect(() => {
    setSplit(50);
  }, [pick]);

  return (
    <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
      <div
        ref={box}
        data-cursor="Drag"
        className="relative h-full max-w-full select-none touch-none"
        style={{ aspectRatio: dims ? `${dims.w} / ${dims.h}` : '7 / 10' }}
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          setFrom(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFrom(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img
          src={piece.colour}
          alt={`${piece.name}, finished colour`}
          draggable={false}
          onLoad={(e) => setDims({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
          className="absolute inset-0 w-full h-full object-contain bg-white"
        />
        <img
          src={piece.line}
          alt={`${piece.name}, line art`}
          draggable={false}
          className="absolute inset-0 w-full h-full object-contain bg-white"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        />
        <span className="absolute top-3 left-3 vp-label !text-[0.58rem] rounded-full bg-black/70 text-[#D7E2EA] px-2 py-0.5">Line art</span>
        <span className="absolute top-3 right-3 vp-label !text-[0.58rem] rounded-full bg-black/70 text-[#D7E2EA] px-2 py-0.5">Colour</span>
        <div
          role="slider"
          tabIndex={0}
          aria-label="Line art to colour"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(split)}
          onKeyDown={onKey}
          className="absolute top-0 bottom-0 w-px bg-[#ff8a3d] outline-none"
          style={{ left: `${split}%` }}
        >
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-11 h-11 rounded-full bg-[#ff8a3d] text-black shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
            <span className="vp-label !text-[0.7rem] !tracking-normal">‹ ›</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------------------------------- detail budget */

function RockStage({ level, sun, look }: { level: number; sun: number; look: Look }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const visible = useInView(wrap, { once: false, rootMargin: '0px' });
  const still = usePrefersReducedMotion();
  const meshes = useRef<Map<number, Mesh>>(new Map());
  const state = useRef({ yaw: 0.6, pitch: 0.38, vy: 0, dragging: false, lastX: 0, lastY: 0 });
  const props = useRef({ level, sun, look });
  props.current = { level, sun, look };

  const mesh = useCallback((l: number) => {
    let m = meshes.current.get(l);
    if (!m) {
      m = buildRock(l);
      meshes.current.set(l, m);
    }
    return m;
  }, []);

  const draw = useCallback(() => {
    const c = canvas.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const w = c.clientWidth;
    const h = c.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const { level: l, sun: s, look: k } = props.current;
    drawRock(ctx, mesh(l), w, h, { yaw: state.current.yaw, pitch: state.current.pitch, sun: s, look: k });
  }, [mesh]);

  // Redraw on any control change, even when nothing is animating.
  useEffect(() => {
    draw();
  }, [level, sun, look, draw]);

  useEffect(() => {
    const on = () => draw();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, [draw]);

  // Turn slowly while on screen; stop the moment it is not.
  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const s = state.current;
      if (!s.dragging) {
        s.vy *= 0.94;
        s.yaw += s.vy + (still ? 0 : dt * 0.35);
      }
      draw();
      if (!still || s.dragging || Math.abs(s.vy) > 0.0005) frame = requestAnimationFrame(tick);
      else frame = 0;
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, still, draw]);

  return (
    <div ref={wrap} className="absolute inset-0">
      <canvas
        ref={canvas}
        data-cursor="Drag"
        aria-label="A 3D rock you can turn by dragging"
        role="img"
        className="w-full h-full touch-pan-y cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          const s = state.current;
          s.dragging = true;
          s.lastX = e.clientX;
          s.lastY = e.clientY;
          s.vy = 0;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const s = state.current;
          if (!s.dragging) return;
          const dx = e.clientX - s.lastX;
          const dy = e.clientY - s.lastY;
          s.lastX = e.clientX;
          s.lastY = e.clientY;
          s.yaw += dx * 0.01;
          s.vy = dx * 0.01;
          s.pitch = Math.min(0.95, Math.max(-0.1, s.pitch + dy * 0.006));
          if (still) draw();
        }}
        onPointerUp={() => (state.current.dragging = false)}
        onPointerCancel={() => (state.current.dragging = false)}
      />
    </div>
  );
}

/* ---------------------------------------------------------- plan to room */

function PlanStage({ pick, inside }: { pick: number; inside: boolean }) {
  const room = lab.rooms[pick];
  const thumb = useThumb();
  return (
    <div className="absolute inset-0 overflow-hidden" style={{ perspective: '1100px' }}>
      <img
        key={room.plan}
        src={thumb(room.plan)}
        alt={`${room.name}, furnished floor plan`}
        className="absolute inset-0 m-auto h-[88%] w-auto max-w-[92%] object-contain"
        style={{
          transformOrigin: '50% 60%',
          transform: inside ? 'rotateX(62deg) scale(2.2) translateY(8%)' : 'none',
          opacity: inside ? 0 : 1,
          transition: 'transform 1.3s cubic-bezier(0.7,0,0.2,1), opacity 0.9s ease 0.35s',
        }}
      />
      <img
        key={room.room}
        src={room.room}
        alt={`${room.name}, eye-level render`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          transform: inside ? 'scale(1)' : 'scale(1.18)',
          opacity: inside ? 1 : 0,
          transition: inside
            ? 'transform 1.6s cubic-bezier(0.16,1,0.3,1) 0.45s, opacity 0.8s ease 0.5s'
            : 'transform 0.8s ease, opacity 0.5s ease',
        }}
      />
      <span className="absolute top-3 left-3 vp-label !text-[0.58rem] rounded-full bg-black/70 text-[#D7E2EA] px-2 py-0.5">
        {inside ? 'Eye level' : 'Plan, from above'}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------- lab */

function Picker({
  items,
  pick,
  onPick,
  label,
}: {
  items: { name: string; src: string }[];
  pick: number;
  onPick: (i: number) => void;
  label: string;
}) {
  const thumb = useThumb();
  return (
    <div role="group" aria-label={label} className="flex gap-2 flex-wrap">
      {items.map((it, i) => (
        <button
          key={it.src}
          type="button"
          aria-pressed={pick === i}
          aria-label={it.name}
          title={it.name}
          onClick={() => onPick(i)}
          className={`w-12 h-12 rounded-md overflow-hidden border-2 transition-all duration-300 ${
            pick === i ? 'border-[#ff8a3d]' : 'border-transparent opacity-50 hover:opacity-100'
          }`}
        >
          <img src={thumb(it.src)} alt="" loading="lazy" className="w-full h-full object-cover bg-white" />
        </button>
      ))}
    </div>
  );
}

const LOOKS: { id: Look; label: string; note: string }[] = [
  { id: 'wire', label: 'Wireframe', note: 'the faces' },
  { id: 'clay', label: 'Clay', note: 'the shape' },
  { id: 'colour', label: 'Colour', note: 'the finish' },
];

export default function Lab() {
  const [tab, setTab] = useState<TabId>('lines');
  const [linePick, setLinePick] = useState(0);
  const [roomPick, setRoomPick] = useState(0);
  const [inside, setInside] = useState(false);
  const [level, setLevel] = useState(2);
  const [sun, setSun] = useState(40);
  const [look, setLook] = useState<Look>('colour');
  const stage = useRef<HTMLDivElement>(null);
  const stageIn = useInView(stage);

  const current = lab.tabs.find((t) => t.id === tab) ?? lab.tabs[0];
  const body = useVoiced(current.body);
  const detail = lab.detail[level];

  const lineItems = useMemo(() => lab.lines.map((l) => ({ name: l.name, src: l.colour })), []);
  const roomItems = useMemo(() => lab.rooms.map((r) => ({ name: r.name, src: r.room })), []);

  return (
    <section
      id="lab"
      data-section="Try the job"
      data-index="04"
      className="relative px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 pb-10 scroll-mt-16"
    >
      <Slate index="04" label="Try the job" aside="3 experiments" />
      <div className="grid lg:grid-cols-12 gap-6 mt-8 sm:mt-10 items-end">
        <SectionTitle text="Try the job" className="lg:col-span-8" />
        <Reveal as="p" delay={150} className="lg:col-span-4 text-[#D7E2EA]/65 font-light leading-relaxed text-[1rem] max-w-[420px]">
          {lab.intro}
        </Reveal>
      </div>

      <Reveal delay={100} className="mt-10 sm:mt-14">
        <div role="tablist" aria-label="Experiments" className="grid grid-cols-3 border-y border-[#D7E2EA]/[0.12]">
          {lab.tabs.map((t, i) => {
            const on = tab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                role="tab"
                id={`lab-tab-${t.id}`}
                aria-selected={on}
                aria-controls="lab-panel"
                onClick={() => setTab(t.id)}
                className={`relative text-left px-2 sm:px-5 py-4 sm:py-5 transition-colors duration-300 ${
                  i > 0 ? 'border-l border-[#D7E2EA]/[0.12]' : ''
                } ${on ? 'bg-white/[0.04]' : 'hover:bg-white/[0.02]'}`}
              >
                <span className={`vp-label block ${on ? 'text-[#ff8a3d]' : 'text-[#D7E2EA]/40'}`}>{pad(i + 1)}</span>
                <span
                  className={`block font-semibold uppercase tracking-wide mt-1 leading-tight ${on ? 'text-[#D7E2EA]' : 'text-[#D7E2EA]/50'}`}
                  style={{ fontSize: 'clamp(0.78rem, 1.6vw, 1.25rem)' }}
                >
                  {t.label}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 bottom-0 h-[2px] vp-grad-bg origin-left transition-transform duration-500"
                  style={{ transform: on ? 'scaleX(1)' : 'scaleX(0)' }}
                />
              </button>
            );
          })}
        </div>

        <div id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${tab}`} className="grid lg:grid-cols-12 gap-6 lg:gap-10 mt-6">
          <div
            ref={stage}
            className="lg:col-span-8 relative h-[min(68vh,700px)] min-h-[420px] overflow-hidden bg-[#070707] border border-[#D7E2EA]/10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(215,226,234,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(215,226,234,0.045) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          >
            {tab === 'lines' ? <LinesStage pick={linePick} /> : null}
            {tab === 'detail' ? <RockStage level={level} sun={(sun * Math.PI) / 180} look={look} /> : null}
            {tab === 'plan' ? <PlanStage pick={roomPick} inside={inside} /> : null}

            {tab === 'detail' ? (
              <div className="absolute left-4 top-4 flex flex-col gap-1 pointer-events-none">
                <span className="vp-label text-[#D7E2EA]/45">Triangles</span>
                <span className="vp-mono text-[#D7E2EA] text-[1.6rem] leading-none tabular-nums">{fmtCount(detail.faces)}</span>
              </div>
            ) : null}
            {tab === 'detail' ? (
              <div className="absolute left-4 bottom-4 pointer-events-none">
                <span className="vp-label text-[#D7E2EA]/45 block">Where it belongs</span>
                <span className="text-[#ff8a3d] font-medium uppercase tracking-wide text-[0.95rem]">{detail.fits}</span>
              </div>
            ) : null}
            <Buckets cols={8} rows={5} active={stageIn} step={18} />
            <span className="vp-brackets pointer-events-none" style={{ '--l': '18px', inset: '10px' } as CSSProperties} />
          </div>

          <div className="lg:col-span-4 flex flex-col gap-6">
            <div>
              <h3 className="text-[#D7E2EA] font-black uppercase leading-[0.95] tracking-tight" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}>
                {current.title}
              </h3>
              <p className="text-[#D7E2EA]/70 font-light leading-relaxed mt-4 text-[1rem]">{body}</p>
            </div>

            {tab === 'lines' ? (
              <div className="flex flex-col gap-3">
                <span className="vp-label text-[#D7E2EA]/45">{current.hint} · pick a character</span>
                <Picker items={lineItems} pick={linePick} onPick={setLinePick} label="Character" />
              </div>
            ) : null}

            {tab === 'detail' ? (
              <div className="flex flex-col gap-5">
                <label className="flex flex-col gap-2">
                  <span className="flex justify-between vp-label text-[#D7E2EA]/55">
                    <span>Detail</span>
                    <span className="text-[#D7E2EA] tabular-nums">{fmtCount(detail.faces)} triangles</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={lab.detail.length - 1}
                    step={1}
                    value={level}
                    onChange={(e) => setLevel(Number(e.target.value))}
                    className="vp-range"
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="flex justify-between vp-label text-[#D7E2EA]/55">
                    <span>Light direction</span>
                    <span className="text-[#D7E2EA] tabular-nums">{sun}°</span>
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={1}
                    value={sun}
                    onChange={(e) => setSun(Number(e.target.value))}
                    className="vp-range"
                  />
                </label>
                <div className="flex flex-col gap-2">
                  <span className="vp-label text-[#D7E2EA]/55">View</span>
                  <div role="group" aria-label="View" className="grid grid-cols-3 gap-1.5">
                    {LOOKS.map((l) => (
                      <button
                        key={l.id}
                        type="button"
                        aria-pressed={look === l.id}
                        onClick={() => setLook(l.id)}
                        className={`rounded-lg border px-2 py-2 text-left transition-colors duration-300 ${
                          look === l.id ? 'border-[#ff8a3d] bg-[#ff8a3d]/10' : 'border-[#D7E2EA]/15 hover:border-[#D7E2EA]/40'
                        }`}
                      >
                        <span className="block text-[#D7E2EA] font-medium uppercase text-[0.72rem] tracking-wide">{l.label}</span>
                        <span className="vp-label block !text-[0.55rem] text-[#D7E2EA]/40">{l.note}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <span className="vp-label text-[#D7E2EA]/40">{current.hint}</span>
              </div>
            ) : null}

            {tab === 'plan' ? (
              <div className="flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setInside((v) => !v)}
                  className="self-start rounded-full vp-grad-bg text-white font-medium uppercase tracking-widest text-[0.7rem] px-6 py-3 transition-transform duration-300 hover:scale-[1.03]"
                >
                  {inside ? 'Back to the plan' : 'Step inside'}
                </button>
                <span className="vp-label text-[#D7E2EA]/45">Pick a room</span>
                <Picker
                  items={roomItems}
                  pick={roomPick}
                  onPick={(i) => {
                    setRoomPick(i);
                    setInside(false);
                  }}
                  label="Room"
                />
              </div>
            ) : null}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
