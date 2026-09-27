import { createContext, createElement, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode, RefObject } from 'react';
import type { Mode, Voiced } from '../../data/home';
import { useLetterGlow } from '../ui/useLetterGlow';

/* ------------------------------------------------------------------ mode */

type ModeState = { mode: Mode | null; setMode: (mode: Mode | null) => void };

const ModeContext = createContext<ModeState>({ mode: null, setMode: () => {} });

const MODE_KEY = 'gs-mode';

/**
 * Whether the visitor said they are a studio or a client. Remembered in this
 * browser only, and only once they choose; until then everyone reads the same
 * page. Storage can be blocked, in which case the choice lasts the visit.
 */
export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<Mode | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(MODE_KEY);
      if (saved === 'studio' || saved === 'client') setModeState(saved);
    } catch {
      /* storage blocked */
    }
  }, []);

  const value = useMemo<ModeState>(
    () => ({
      mode,
      setMode: (next) => {
        setModeState(next);
        try {
          if (next) localStorage.setItem(MODE_KEY, next);
          else localStorage.removeItem(MODE_KEY);
        } catch {
          /* storage blocked */
        }
      },
    }),
    [mode]
  );

  return <ModeContext.Provider value={value}>{children}</ModeContext.Provider>;
}

export const useMode = () => useContext(ModeContext);

/** The line written for this visitor. */
export function useVoiced(copy: Voiced): string {
  const { mode } = useMode();
  return copy[mode ?? 'none'];
}

/* --------------------------------------------------------------- in view */

/**
 * True once the element has come into view. One observer per element is
 * cheap — the browser batches them — and `once` disconnects it straight away.
 */
export function useInView<T extends Element>(
  ref: RefObject<T>,
  { rootMargin = '0px 0px -12% 0px', once = true }: { rootMargin?: string; once?: boolean } = {}
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) io.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin, once]);

  return inView;
}

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

/* --------------------------------------------------------------- buckets */

// A stable pseudo-random number per tile, so the render order is the same on
// the server and in the browser and hydration has nothing to disagree about.
function jitter(n: number) {
  const x = Math.sin(n * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * The bucket render: a grid of black tiles over a picture that clear from the
 * centre outwards, each flashing its outline as it goes — how a 3D renderer
 * fills in a frame. Pure CSS once it is triggered; see home.css.
 */
export function Buckets({
  cols = 4,
  rows = 3,
  active,
  step = 22,
  delay = 0,
}: {
  cols?: number;
  rows?: number;
  active: boolean;
  step?: number;
  delay?: number;
}) {
  const order = useMemo(() => {
    const cx = (cols - 1) / 2;
    const cy = (rows - 1) / 2;
    const tiles = Array.from({ length: cols * rows }, (_, i) => {
      const x = i % cols;
      const y = Math.floor(i / cols);
      return { i, d: Math.hypot((x - cx) / cols, (y - cy) / rows) + jitter(i) * 0.12 };
    });
    const ranked = [...tiles].sort((a, b) => a.d - b.d);
    const rank = new Array<number>(tiles.length);
    ranked.forEach((t, r) => (rank[t.i] = r));
    return rank;
  }, [cols, rows]);

  return (
    <div
      aria-hidden="true"
      className={`vp-buckets ${active ? 'is-in' : ''}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
    >
      {order.map((r, i) => (
        <span key={i} className="vp-bucket" style={{ '--d': `${delay + r * step}ms` } as CSSProperties} />
      ))}
    </div>
  );
}

/* --------------------------------------------------------------- reveals */

export function Reveal({
  as = 'div',
  className = '',
  delay = 0,
  children,
  style,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  delay?: number;
  children?: ReactNode;
  style?: CSSProperties;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  return createElement(
    as,
    {
      ref,
      className: `vp-fade ${inView ? 'is-in' : ''} ${className}`,
      style: { ...style, '--delay': `${delay}ms` } as CSSProperties,
      ...rest,
    },
    children
  );
}

/** A heading whose words rise out of their own masks, one after another. */
const LETTER: CSSProperties = { display: 'inline-block', transformOrigin: 'center bottom' };

/**
 * A word as separate letters the pointer can light (see ui/useLetterGlow).
 * Any gradient class goes on each letter, for the reason given there.
 */
export function Letters({ text, className = '' }: { text: string; className?: string }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} data-glow="" className={className} style={LETTER}>
          {ch}
        </span>
      ))}
    </>
  );
}

/**
 * A heading whose words rise out of their own masks, one after another, and
 * whose letters then light up under the pointer. The masks are lifted once the
 * words have landed: they would otherwise clip the glow and the lift.
 */
export function SplitTitle({
  text,
  as = 'h2',
  className = '',
  style,
  letterClassName = '',
}: {
  text: string;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  letterClassName?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const [settled, setSettled] = useState(false);
  const words = text.split(' ');
  useLetterGlow(ref, settled);

  useEffect(() => {
    if (!inView) return;
    const t = window.setTimeout(() => setSettled(true), 1100 + words.length * 70 + 150);
    return () => window.clearTimeout(t);
  }, [inView, words.length]);

  return createElement(
    as,
    {
      ref,
      className: `vp-reveal ${inView ? 'is-in' : ''} ${settled ? 'vp-settled' : ''} ${className}`,
      style,
      'aria-label': text,
    },
    words.map((word, i) => (
      <span key={i} aria-hidden="true" className="vp-line" style={{ display: 'inline-block' }}>
        <span style={{ '--i': i } as CSSProperties}>
          <Letters text={word} className={letterClassName} />
        </span>
        {i < words.length - 1 ? '\u00a0' : null}
      </span>
    ))
  );
}

/**
 * The strip that opens every section: its number, its name and one aside,
 * over a hairline — a slate, the board held up before a take.
 */
export function Slate({ index, label, aside }: { index: string; label: string; aside?: ReactNode }) {
  return (
    <Reveal className="flex items-end justify-between gap-6 border-b border-[#D7E2EA]/15 pb-3">
      <span className="vp-label text-[#D7E2EA]/60">
        <span className="text-[#ff8a3d]">{index}</span>
        <span className="mx-2 text-[#D7E2EA]/25">/</span>
        {label}
      </span>
      {aside ? <span className="vp-label text-[#D7E2EA]/40 text-right">{aside}</span> : null}
    </Reveal>
  );
}

export function SectionTitle({ text, className = '' }: { text: string; className?: string }) {
  return (
    <SplitTitle
      text={text}
      className={`font-black uppercase leading-[0.9] tracking-tight ${className}`}
      style={{ fontSize: 'clamp(3rem, 10.5vw, 10rem)' }}
      letterClassName="hero-heading"
    />
  );
}

/** A thumbnail when the build made one, the original otherwise. See lib/card-image.ts. */
export type Pic = { src: string; thumb: string; w: number; h: number };

export const fmtCount = (n: number) => n.toLocaleString('en-GB');

export const pad = (n: number) => String(n).padStart(2, '0');

/* ---------------------------------------------------------------- thumbs */

const ThumbContext = createContext(false);

/** Set once by the page: whether the build made the small WebP copies. */
export const ThumbProvider = ThumbContext.Provider;

/** Mirrors thumbPath() in scripts/card-thumbs.mjs. */
export function useThumb() {
  const enabled = useContext(ThumbContext);
  return (src: string) =>
    enabled && src.startsWith('/img/') ? src.replace(/^\/img\//, '/img/cards/').replace(/\.(jpe?g|png|webp)$/i, '.webp') : src;
}

/* ------------------------------------------------------------ page links */

export type WorkEvent = { filter: import('../../data/home').WorkFilter };
export type ReelEvent = { tag: import('../../data/home').ReelTag };

/** Jump to a section and tell it what to show, e.g. the work grid on "Architecture". */
export function goTo(id: 'work' | 'showreel' | 'contact', detail?: WorkEvent | ReelEvent) {
  if (detail) window.dispatchEvent(new CustomEvent(`vp:${id}`, { detail }));
  const el = document.getElementById(id);
  if (!el) return;
  const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' });
  history.replaceState(null, '', `#${id}`);
}
