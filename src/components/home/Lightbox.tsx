import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { critTools } from '../../data/home';
import type { CritTool } from '../../data/home';
import { pad, useThumb } from './ui';

export type ArchiveItem = {
  src: string;
  w: number;
  h: number;
  title?: string;
  kind: 'concept' | '3d' | 'arch';
  /** The original line art, where it exists, drawn on the same canvas. */
  line?: string;
  /** Position in the "Selected" set, when the piece is in it. */
  selected?: number;
};

export const kindLabel: Record<ArchiveItem['kind'], string> = {
  concept: 'Concept art',
  '3d': '3D model',
  arch: 'Architecture',
};

const FILTERS: Partial<Record<CritTool, string>> = {
  values: 'grayscale(1) contrast(1.05)',
  notan: 'grayscale(1) contrast(14) brightness(1.04)',
  squint: 'blur(14px) saturate(1.2)',
};

function useViewport() {
  const [size, setSize] = useState({ w: 1280, h: 800 });
  useEffect(() => {
    const on = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    on();
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return size;
}

/**
 * The full-size viewer, with the checks an art director runs on an image:
 * black and white for values, two tones for composition, a blur for the focal
 * point, the rule of thirds — and the real line art, where there is one. Each
 * is a filter on the actual picture, not a prepared version of it.
 */
export default function Lightbox({
  items,
  index,
  onIndex,
  onClose,
}: {
  items: ArchiveItem[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const [tool, setTool] = useState<CritTool>('colour');
  const [loaded, setLoaded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const thumb = useThumb();
  const vp = useViewport();

  const item = items[index];
  const go = useCallback(
    (step: number) => onIndex((index + step + items.length) % items.length),
    [index, items.length, onIndex]
  );

  // Line art belongs to one picture; moving on returns to colour.
  useEffect(() => {
    setLoaded(false);
    setTool((t) => (t === 'lineart' ? 'colour' : t));
  }, [index]);

  useEffect(() => {
    const before = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = overflow;
      before?.focus?.();
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  if (!item) return null;

  const wide = vp.w >= 768;
  const maxW = vp.w - (wide ? 200 : 24);
  const maxH = vp.h - (wide ? 220 : 250);
  const scale = Math.min(maxW / item.w, maxH / item.h);
  const box = { width: Math.round(item.w * scale), height: Math.round(item.h * scale) };

  const tools = critTools.filter((t) => t.id !== 'lineart' || item.line);
  const note = tools.find((t) => t.id === tool)?.note ?? '';
  const src = tool === 'lineart' && item.line ? item.line : item.src;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.title ?? kindLabel[item.kind]}
      className="vp fixed inset-0 z-[100] flex flex-col bg-black/[0.96] backdrop-blur-sm"
      onPointerDown={(e) => {
        if (e.pointerType !== 'mouse') touch.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const dx = e.clientX - start.x;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - start.y)) go(dx < 0 ? 1 : -1);
      }}
    >
      <header className="flex items-center justify-between gap-4 px-4 sm:px-8 h-16 shrink-0">
        <div className="flex items-baseline gap-4 min-w-0">
          <span className="vp-label text-[#ff8a3d] tabular-nums shrink-0">
            {pad(index + 1)} / {pad(items.length)}
          </span>
          <span className="vp-label text-[#D7E2EA]/45 shrink-0 hidden sm:inline">{kindLabel[item.kind]}</span>
          <span className="text-[#D7E2EA] font-medium uppercase tracking-wide text-[0.86rem] truncate">
            {item.title ?? 'Untitled'}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid place-items-center w-11 h-11 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" strokeWidth={1.6} />
        </button>
      </header>

      <div className="relative flex-1 min-h-0 flex items-center justify-center">
        <div className="relative" style={box}>
          <img
            src={thumb(item.src)}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-contain"
            style={{ filter: FILTERS[tool] ?? 'none', transition: 'filter 0.5s ease' }}
          />
          <img
            key={src}
            src={src}
            alt={item.title ?? `${kindLabel[item.kind]} ${index + 1}`}
            onLoad={() => setLoaded(true)}
            className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500"
            style={{
              opacity: loaded || tool === 'lineart' ? 1 : 0,
              filter: FILTERS[tool] ?? 'none',
              transition: 'filter 0.5s ease, opacity 0.5s ease',
            }}
          />
          {tool === 'thirds' ? (
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
              {[1, 2].map((n) => (
                <span key={`v${n}`} className="absolute top-0 bottom-0 w-px bg-[#ff8a3d]/80" style={{ left: `${(n * 100) / 3}%` }} />
              ))}
              {[1, 2].map((n) => (
                <span key={`h${n}`} className="absolute left-0 right-0 h-px bg-[#ff8a3d]/80" style={{ top: `${(n * 100) / 3}%` }} />
              ))}
              {[1, 2].flatMap((x) =>
                [1, 2].map((y) => (
                  <span
                    key={`${x}${y}`}
                    className="absolute w-2.5 h-2.5 -ml-[5px] -mt-[5px] rounded-full border border-[#ff8a3d] bg-black/40"
                    style={{ left: `${(x * 100) / 3}%`, top: `${(y * 100) / 3}%` }}
                  />
                ))
              )}
            </div>
          ) : null}
          <span className="vp-brackets" style={{ '--l': '18px', inset: '-10px' } as CSSProperties} />
        </div>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 hidden md:grid place-items-center w-12 h-12 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 hidden md:grid place-items-center w-12 h-12 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA] hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" strokeWidth={1.6} />
            </button>
          </>
        ) : null}
      </div>

      <footer className="shrink-0 px-4 sm:px-8 pb-5 pt-4 flex flex-col items-center gap-3">
        <div role="group" aria-label="Look at it as" className="flex flex-wrap justify-center gap-1.5">
          {tools.map((t) => (
            <button
              key={t.id}
              type="button"
              aria-pressed={tool === t.id}
              onClick={() => setTool(t.id)}
              className={`vp-label rounded-full px-3 py-1.5 border transition-colors duration-300 ${
                tool === t.id
                  ? 'bg-[#D7E2EA] text-black border-[#D7E2EA]'
                  : 'border-[#D7E2EA]/20 text-[#D7E2EA]/65 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/50'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-[#D7E2EA]/55 font-light text-[0.84rem] text-center min-h-[1.3em]" aria-live="polite">
          {note}
        </p>
        <div className="flex md:hidden items-center gap-6">
          <button type="button" onClick={() => go(-1)} aria-label="Previous" className="grid place-items-center w-11 h-11 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA]">
            <ChevronLeft className="w-5 h-5" strokeWidth={1.6} />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Next" className="grid place-items-center w-11 h-11 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA]">
            <ChevronRight className="w-5 h-5" strokeWidth={1.6} />
          </button>
        </div>
      </footer>
    </div>,
    document.body
  );
}
