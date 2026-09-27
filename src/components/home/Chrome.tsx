import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowUp } from 'lucide-react';

/**
 * The frame around the page: viewfinder corners at the edges of the window,
 * a status line along the bottom that says where you are, and a label that
 * follows the pointer over anything it can open, play or drag.
 */

export function ViewportCorners() {
  return (
    <div aria-hidden="true" className="hidden md:block fixed inset-3 z-40 pointer-events-none">
      <div className="vp-brackets" style={{ '--c': 'rgba(215,226,234,0.28)', '--l': '22px' } as CSSProperties} />
    </div>
  );
}

/**
 * Which section is on screen, and how far down the page you are. Reads the
 * sections' positions on scroll rather than keeping an observer per section:
 * there are ten of them, and one rect read each is nothing.
 */
export function StatusBar() {
  const [section, setSection] = useState<{ index: string; name: string } | null>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const pct = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>('[data-section]')];
    let frame = 0;

    const read = () => {
      frame = 0;
      const line = window.innerHeight * 0.45;
      let current: HTMLElement | null = null;
      for (const s of sections) if (s.getBoundingClientRect().top <= line) current = s;
      setSection(
        current ? { index: current.dataset.index ?? '', name: current.dataset.section ?? '' } : null
      );

      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (pct.current) pct.current.textContent = `${String(Math.round(p * 100)).padStart(3, '0')}%`;
    };

    const on = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener('scroll', on, { passive: true });
    window.addEventListener('resize', on);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', on);
      window.removeEventListener('resize', on);
    };
  }, []);

  return (
    <div className="hidden md:flex fixed bottom-0 inset-x-0 z-40 items-center justify-between gap-6 px-10 h-9 pointer-events-none">
      <span className="vp-label !text-[0.6rem] text-[#D7E2EA]/45 flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-[#ff8a3d] vp-pulse" aria-hidden="true" />
        {section ? (
          <>
            <span className="text-[#D7E2EA]/70">{section.index}</span> {section.name}
          </>
        ) : (
          'Portfolio'
        )}
      </span>

      <span className="flex items-center gap-3 pointer-events-auto">
        <span aria-hidden="true" className="relative block w-28 h-px bg-[#D7E2EA]/15 overflow-hidden">
          <span ref={bar} className="absolute inset-0 origin-left vp-grad-bg" style={{ transform: 'scaleX(0)' }} />
        </span>
        <span ref={pct} aria-hidden="true" className="vp-label !text-[0.6rem] text-[#D7E2EA]/45 tabular-nums w-9">
          000%
        </span>
        <a
          href="#top"
          aria-label="Back to the top"
          className="grid place-items-center w-6 h-6 rounded-full border border-[#D7E2EA]/20 text-[#D7E2EA]/60 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/50 transition-colors"
        >
          <ArrowUp className="w-3 h-3" strokeWidth={1.8} />
        </a>
      </span>
    </div>
  );
}

/**
 * A label beside the pointer — "View", "Play", "Drag" — over anything marked
 * with data-cursor. The system pointer stays where it is: this adds a word to
 * it rather than replacing it, so nobody loses track of where they are
 * clicking. Mouse and trackpad only, and never with reduced motion.
 */
export function CursorLabel() {
  const el = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || still) return;
    setEnabled(true);

    let x = -200;
    let y = -200;
    let cx = x;
    let cy = y;
    let frame = 0;

    const tick = () => {
      cx += (x - cx) * 0.25;
      cy += (y - cy) * 0.25;
      if (el.current) el.current.style.transform = `translate3d(${cx + 18}px, ${cy + 18}px, 0)`;
      frame = Math.abs(x - cx) + Math.abs(y - cy) > 0.3 ? requestAnimationFrame(tick) : 0;
    };

    const move = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      x = e.clientX;
      y = e.clientY;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const over = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest?.('[data-cursor]');
      setLabel(target ? target.getAttribute('data-cursor') : null);
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerover', over, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div ref={el} aria-hidden="true" className="fixed left-0 top-0 z-[120] pointer-events-none">
      <span
        className={`vp-label block whitespace-nowrap rounded-full bg-[#D7E2EA] text-black !text-[0.6rem] px-2.5 py-1 transition-[opacity,transform] duration-200 ${
          label ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
        }`}
      >
        {label ?? ''}
      </span>
    </div>
  );
}
