import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ArchiveItem } from './Lightbox';
import { kindLabel } from './Lightbox';
import { pad, useThumb } from './ui';

/**
 * The work as a room without gravity.
 *
 * The pictures hang on a ring around the viewer, a little above and below one
 * another, and drift very slightly as if nothing were holding them. The ones
 * across the ring are further away, so they are smaller, darker and out of
 * focus — the way a lens would see them — and turning the ring brings them
 * round to the front. Drag to turn it, use the arrows or the map beneath it,
 * or tab to a picture and it comes to the front on its own.
 *
 * It is plain DOM in CSS 3D: every picture stays a button a screen reader can
 * find and a keyboard can reach. Each frame only transforms move, which the
 * compositor handles; the depth blur and dimming are quantised so they are
 * rewritten only when they actually change.
 */

const TAU = Math.PI * 2;
/** Turning speed while nobody touches it, in radians a second. */
const DRIFT = 0.028;

type Slot = { theta: number; y: number; r: number; w: number; h: number; phase: number };

function jitter(n: number) {
  const x = Math.sin(n * 91.3458 + 17.17) * 47453.5453;
  return x - Math.floor(x);
}

const shortest = (d: number) => ((((d + Math.PI) % TAU) + TAU) % TAU) - Math.PI;

/**
 * Where each picture hangs. One ring for a handful, two or three stacked for
 * more; the ring widens with the count so the pictures never crowd. Neighbours
 * in the list go to different rows, so the first few — the strongest — face
 * the viewer together.
 */
function arrange(items: ArchiveItem[], small: boolean) {
  const n = items.length;
  const rows = n <= 10 ? 1 : n <= 26 ? 2 : 3;
  const perRow = Math.max(1, Math.ceil(n / rows));
  const base = small ? (rows === 3 ? 112 : 132) : rows === 3 ? 200 : rows === 2 ? 250 : 290;
  const R = Math.max(small ? 280 : 560, (perRow * base * 1.55) / TAU);
  const rowGap = base * (small ? 1.3 : 1.18);
  const slots: Slot[] = items.map((it, i) => {
    const row = i % rows;
    const k = Math.floor(i / rows);
    const aspect = it.w / it.h || 1;
    let w = base;
    let h = base / aspect;
    const maxH = base * 1.25;
    if (h > maxH) {
      h = maxH;
      w = h * aspect;
    }
    return {
      theta: (k / perRow) * TAU + (row % 2 ? TAU / perRow / 2 : 0) + (jitter(i) - 0.5) * 0.14,
      y: (row - (rows - 1) / 2) * rowGap + (jitter(i + 7) - 0.5) * base * 0.28,
      r: R * (0.9 + jitter(i + 13) * 0.2),
      w: Math.round(w),
      h: Math.round(h),
      phase: jitter(i + 21) * TAU,
    };
  });
  return { slots, R, step: TAU / perRow };
}

type Pose = { transform: string; filter: string; z: number };

/** One picture's pose at rotation `rot` and time `t`. `still` is 1 while it is hovered. */
function pose(s: Slot, R: number, rot: number, t: number, still: number, maxBlur: number, intro: number): Pose {
  const a = s.theta + rot;
  const x = Math.sin(a) * s.r;
  const z = Math.cos(a) * s.r - R - (1 - intro) * 900;
  const depth = (1 - Math.cos(a)) / 2;
  const f = 1 - still;
  const fy = Math.sin(t * 0.55 + s.phase) * 9 * f;
  const fx = Math.cos(t * 0.41 + s.phase * 1.3) * 6 * f;
  const rz = Math.sin(t * 0.3 + s.phase) * 1.8 * f;
  const ry = Math.cos(t * 0.36 + s.phase) * 6 * f;
  const scale = 1 + still * 0.08;
  const blur = Math.round(depth * maxBlur * (1 - still) * 2) / 2;
  const bright = Math.round((0.28 + (1 - depth) * 0.72 + still * 0.08) * 25) / 25;
  return {
    transform: `translate3d(${(x + fx).toFixed(1)}px, ${(s.y + fy).toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${ry.toFixed(2)}deg) rotateZ(${rz.toFixed(2)}deg) scale(${scale.toFixed(3)})`,
    filter: blur > 0 || bright < 1 ? `blur(${blur}px) brightness(${bright})` : 'none',
    z: Math.round(4000 + z) + (still > 0.5 ? 4000 : 0),
  };
}

export type SpaceFocus = { index: number; n: number } | null;

export default function WorkSpace({
  items,
  grade,
  onOpen,
  focus,
}: {
  items: ArchiveItem[];
  grade: string;
  onOpen: (index: number) => void;
  /** Bring this picture round to the front, e.g. the last one seen full size. */
  focus: SpaceFocus;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const els = useRef<(HTMLButtonElement | null)[]>([]);
  const dots = useRef<(SVGCircleElement | null)[]>([]);
  const thumb = useThumb();
  const [small, setSmall] = useState(false);
  const [front, setFront] = useState(0);

  const { slots, R, step } = useMemo(() => arrange(items, small), [items, small]);

  // Everything the frame loop reads, in one mutable place.
  const live = useRef({
    rot: 0,
    vel: 0,
    target: null as number | null,
    dragging: false,
    moved: false,
    lastX: 0,
    hover: -1,
    still: [] as number[],
    last: [] as { transform: string; filter: string; z: number }[],
    t: 0,
    introAt: -1,
    visible: false,
    reduced: false,
    front: 0,
    frame: 0,
    kick: () => {},
  });

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 639px)');
    const on = () => setSmall(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  const rotateTo = useCallback(
    (i: number) => {
      const L = live.current;
      const s = slots[i];
      if (!s) return;
      L.target = L.rot + shortest(-s.theta - L.rot);
      L.vel = 0;
      L.kick();
    },
    [slots]
  );

  const turn = (by: number) => {
    const L = live.current;
    L.target = (L.target ?? L.rot) + by;
    L.vel = 0;
    L.kick();
  };

  // The frame loop: runs while the ring is on screen, and with reduced motion
  // only while something is actually turning.
  useEffect(() => {
    const L = live.current;
    L.reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    L.still = items.map(() => 0);
    L.last = items.map(() => ({ transform: '', filter: '', z: 0 }));
    const maxBlur = small ? 2.5 : 5;
    let prev = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000);
      prev = now;
      L.t += L.reduced ? 0 : dt;

      if (!L.dragging) {
        if (L.target !== null) {
          const d = L.target - L.rot;
          L.rot += d * (L.reduced ? 1 : 0.085);
          if (Math.abs(d) < 0.0008) {
            L.rot = L.target;
            L.target = null;
          }
        } else if (Math.abs(L.vel) > 0.00005) {
          L.rot += L.vel;
          L.vel *= 0.93;
        } else if (!L.reduced && L.hover < 0) {
          L.rot += DRIFT * dt;
        }
      }

      let best = -2;
      let bestI = 0;
      for (let i = 0; i < slots.length; i++) {
        const el = els.current[i];
        if (!el) continue;
        const target = L.hover === i ? 1 : 0;
        L.still[i] += (target - L.still[i]) * (L.reduced ? 1 : 0.12);
        const intro = L.introAt < 0 || L.reduced ? 1 : Math.min(1, Math.max(0, (now - L.introAt - i * 35) / 900));
        const e = 1 - Math.pow(1 - intro, 3);
        const p = pose(slots[i], R, L.rot, L.t, L.still[i], maxBlur, e);
        const was = L.last[i];
        el.style.transform = p.transform;
        if (p.filter !== was.filter) el.style.filter = p.filter;
        if (p.z !== was.z) el.style.zIndex = String(p.z);
        el.style.opacity = e < 1 ? e.toFixed(3) : '';
        L.last[i] = p;

        const c = Math.cos(slots[i].theta + L.rot);
        if (c > best) {
          best = c;
          bestI = i;
        }
        const dot = dots.current[i];
        if (dot) {
          const a = slots[i].theta + L.rot;
          dot.setAttribute('cx', (50 + Math.sin(a) * 38).toFixed(2));
          dot.setAttribute('cy', (50 + Math.cos(a) * 38).toFixed(2));
        }
      }
      if (bestI !== L.front) {
        L.front = bestI;
        setFront(bestI);
      }

      const busy =
        L.dragging ||
        L.target !== null ||
        Math.abs(L.vel) > 0.00005 ||
        (L.introAt > 0 && now - L.introAt < 900 + slots.length * 35);
      L.frame = L.visible && (!L.reduced || busy) ? requestAnimationFrame(tick) : 0;
    };

    L.kick = () => {
      if (!L.frame) {
        prev = performance.now();
        L.frame = requestAnimationFrame(tick);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        L.visible = entry.isIntersecting;
        if (L.visible) {
          // The first time the ring comes into view, the pictures drift in
          // out of the dark.
          if (L.introAt === -1) L.introAt = performance.now();
          L.kick();
        }
      },
      { rootMargin: '120px 0px' }
    );
    if (stage.current) io.observe(stage.current);

    return () => {
      io.disconnect();
      cancelAnimationFrame(L.frame);
      L.frame = 0;
    };
  }, [items, slots, R, small]);

  // Back from the full-size viewer: turn to the picture last seen, and mark it.
  useEffect(() => {
    if (!focus) return;
    const L = live.current;
    const s = slots[focus.index];
    if (!s) return;
    L.target = L.rot + shortest(-s.theta - L.rot);
    L.kick();
    const el = els.current[focus.index];
    if (!el) return;
    // Keyboard focus goes to it too, which also holds it still and lit; the
    // viewer would otherwise hand focus back to the picture first clicked.
    el.focus({ preventScroll: true });
    el.classList.remove('is-found');
    void el.offsetWidth;
    el.classList.add('is-found');
    const t = window.setTimeout(() => el.classList.remove('is-found'), 1600);
    return () => window.clearTimeout(t);
  }, [focus, slots]);

  const setHover = (i: number) => {
    const L = live.current;
    const prevEl = L.hover >= 0 ? els.current[L.hover] : null;
    prevEl?.classList.remove('is-hover');
    L.hover = i;
    if (i >= 0) els.current[i]?.classList.add('is-hover');
    L.kick();
  };

  // SSR and the first paint: the resting poses, so the ring reads without
  // JavaScript and nothing jumps when the loop takes over.
  const initial = useMemo(() => slots.map((s) => pose(s, R, 0, 0, 0, small ? 2.5 : 5, 1)), [slots, R, small]);

  const current = items[front];

  return (
    <div>
      <div
        ref={stage}
        data-cursor="Drag"
        className="vp-space vp-grade relative overflow-hidden h-[72svh] sm:h-[78vh] min-h-[480px] max-h-[860px] -mx-5 sm:-mx-8 md:-mx-10 select-none touch-pan-y"
        data-grade={grade}
        onPointerDown={(e) => {
          const L = live.current;
          L.dragging = true;
          L.moved = false;
          L.lastX = e.clientX;
          L.vel = 0;
          L.target = null;
          L.kick();
        }}
        onPointerMove={(e) => {
          const L = live.current;
          if (!L.dragging) return;
          // A press that ended outside the ring never sent its pointerup here.
          if (e.buttons === 0) {
            L.dragging = false;
            return;
          }
          const dx = e.clientX - L.lastX;
          if (!L.moved && Math.abs(dx) < 6) return;
          if (!L.moved) {
            L.moved = true;
            (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          }
          L.lastX = e.clientX;
          const d = (dx / R) * 1.1;
          L.rot += d;
          L.vel = d;
        }}
        onPointerUp={() => {
          const L = live.current;
          L.dragging = false;
          // Let the click that may follow see whether this was a drag.
          window.setTimeout(() => (L.moved = false), 0);
        }}
        onPointerCancel={() => (live.current.dragging = false)}
        onPointerLeave={() => {
          const L = live.current;
          if (!L.moved) L.dragging = false;
        }}
        onWheel={(e) => {
          // Sideways wheels and trackpads turn the ring; up and down still scroll the page.
          if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
          const L = live.current;
          L.target = null;
          L.rot -= e.deltaX / R;
          L.kick();
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') turn(-step);
          else if (e.key === 'ArrowLeft') turn(step);
          else return;
          e.preventDefault();
        }}
      >
        <div aria-hidden="true" className="vp-space-dust" />
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(55% 50% at 50% 50%, rgba(118,33,176,0.16), transparent 70%)' }}
        />

        {items.map((item, i) => {
          const s = slots[i];
          const p = initial[i];
          const title = item.title ?? 'Untitled';
          return (
            <button
              key={item.src}
              ref={(el) => {
                els.current[i] = el;
              }}
              type="button"
              className="vp-float absolute left-1/2 top-1/2"
              style={
                {
                  width: s.w,
                  height: s.h,
                  marginLeft: -s.w / 2,
                  marginTop: -s.h / 2,
                  transform: p.transform,
                  filter: p.filter,
                  zIndex: p.z,
                } as CSSProperties
              }
              aria-label={`${title}, ${kindLabel[item.kind]}: open full size`}
              data-cursor="View"
              onPointerEnter={(e) => e.pointerType === 'mouse' && setHover(i)}
              onPointerLeave={() => live.current.hover === i && setHover(-1)}
              onFocus={() => {
                rotateTo(i);
                setHover(i);
              }}
              onBlur={() => setHover(-1)}
              onClick={() => {
                if (live.current.moved) return;
                onOpen(i);
              }}
            >
              <img
                src={thumb(item.src)}
                alt=""
                width={item.w}
                height={item.h}
                decoding="async"
                draggable={false}
                data-graded
                className="w-full h-full object-cover rounded-[3px]"
                style={item.kind === '3d' ? { background: 'radial-gradient(circle at 50% 38%, #1c1a22, #060606 75%)' } : undefined}
              />
              <span className="vp-brackets vp-float-brackets" style={{ '--l': '12px', inset: '-7px' } as CSSProperties} />
              <span className="vp-float-label">
                <span className="text-[#D7E2EA]">{title}</span>
                <span className="text-[#D7E2EA]/50">{pad(i + 1)}</span>
              </span>
              {item.line ? <span className="vp-float-tag">+ line art</span> : null}
            </button>
          );
        })}
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <p className="vp-label text-[#D7E2EA]/45 text-center sm:text-left order-2 sm:order-1">
          Drag to turn the room · hover to stop a picture · click to open it
        </p>

        <div className="flex items-center gap-3 order-1 sm:order-2">
          <button
            type="button"
            onClick={() => turn(step)}
            aria-label="Turn left"
            className="grid place-items-center w-11 h-11 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.6} />
          </button>

          {/* The ring seen from above: every picture a dot, the viewer at the bottom. */}
          <svg
            viewBox="0 0 100 100"
            className="w-16 h-16 cursor-pointer"
            role="img"
            aria-label="Map of the room, seen from above"
            onClick={(e) => {
              const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
              const ang = Math.atan2(e.clientX - r.left - r.width / 2, e.clientY - r.top - r.height / 2);
              // Nearest picture to where the map was pressed comes to the front.
              const L = live.current;
              let bestI = 0;
              let best = Infinity;
              slots.forEach((s, i) => {
                const d = Math.abs(shortest(s.theta + L.rot - ang));
                if (d < best) {
                  best = d;
                  bestI = i;
                }
              });
              rotateTo(bestI);
            }}
          >
            <circle cx="50" cy="50" r="38" fill="none" stroke="rgba(215,226,234,0.18)" strokeDasharray="2 3" />
            <path d="M50 50 L38 96 L62 96 Z" fill="rgba(255,138,61,0.14)" />
            {slots.map((s, i) => (
              <circle
                key={i}
                ref={(el) => {
                  dots.current[i] = el;
                }}
                // Rounded: the server and the browser disagree in the last digits.
                cx={(50 + Math.sin(s.theta) * 38).toFixed(2)}
                cy={(50 + Math.cos(s.theta) * 38).toFixed(2)}
                r={i === front ? 3.6 : 2.2}
                fill={i === front ? '#ff8a3d' : 'rgba(215,226,234,0.55)'}
              />
            ))}
          </svg>

          <button
            type="button"
            onClick={() => turn(-step)}
            aria-label="Turn right"
            className="grid place-items-center w-11 h-11 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.6} />
          </button>
        </div>

        <p className="vp-label text-[#D7E2EA]/60 order-3 min-w-0 truncate max-w-full sm:max-w-[320px]" aria-live="polite">
          <span className="text-[#ff8a3d]">{pad(front + 1)}</span>
          <span className="text-[#D7E2EA]/30"> / {pad(items.length)} · </span>
          {current?.title ?? 'Untitled'}
        </p>
      </div>
    </div>
  );
}
