import { useEffect } from 'react';
import type { RefObject } from 'react';

/**
 * Per-letter backlight that follows the cursor, for every element marked
 * `data-glow` inside `root`.
 *
 * Each character reacts on its own, by distance from the pointer, so the effect
 * is a moving pool of light rather than the whole heading switching on. There is
 * deliberately no :hover on any wrapper — hovering the heading's empty box does
 * nothing, only proximity to an actual glyph does.
 *
 * Put any gradient class on the letters themselves rather than on a wrapper: a
 * `filter` on a child of a `background-clip: text` element renders into its own
 * layer and would lose the parent's clipped background, leaving the letter
 * invisible. And the letters must not be the element a CSS animation moves —
 * a finished animation's fill wins over the inline transform written here.
 */
const MAX_SCALE = 0.18;
const MAX_LIFT = 5; // px
/** Positions older than this are re-read on the next pointer move. */
const STALE_MS = 500;

/**
 * Falloff scales with the type size, so a 160px heading and a 20px card title
 * both light up roughly the pointed letter plus one neighbour either side.
 */
function radiusFor(el: HTMLElement) {
  const size = parseFloat(getComputedStyle(el).fontSize) || 16;
  return Math.max(46, size * 1.15);
}

export function useLetterGlow(rootRef: RefObject<HTMLElement>, key: unknown = null) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let letters: HTMLElement[] = [];
    let centers: { x: number; y: number }[] = [];
    let bounds = { left: 0, top: 0, right: 0, bottom: 0 };
    let radius = radiusFor(root);
    let current: number[] = [];
    let pointer = { x: -99999, y: -99999 };
    let raf = 0;
    let measureQueued = false;
    let measuredAt = 0;

    // Positions are cached and refreshed on scroll/resize, so the per-frame work
    // is pure arithmetic with no layout reads. They are also re-read when they
    // are old, because a heading that was still rising into place when they were
    // taken would otherwise light up the wrong letters.
    const measure = () => {
      measureQueued = false;
      measuredAt = performance.now();
      letters = [...root.querySelectorAll<HTMLElement>('[data-glow]')];
      if (current.length !== letters.length) current = new Array(letters.length).fill(0);
      radius = radiusFor(letters[0] ?? root);
      const r = root.getBoundingClientRect();
      bounds = { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
      centers = letters.map((c) => {
        const cr = c.getBoundingClientRect();
        return { x: cr.left + cr.width / 2, y: cr.top + cr.height / 2 };
      });
    };

    const queueMeasure = () => {
      if (measureQueued) return;
      measureQueued = true;
      requestAnimationFrame(measure);
    };

    const render = () => {
      let settling = false;
      for (let i = 0; i < letters.length; i++) {
        const el = letters[i];
        const c = centers[i];
        if (!el || !c) continue;

        const dx = pointer.x - c.x;
        const dy = pointer.y - c.y;
        const target = Math.max(0, 1 - Math.hypot(dx, dy) / radius);

        current[i] += (target - current[i]) * 0.2;
        if (Math.abs(target - current[i]) > 0.003) settling = true;

        const v = current[i];
        if (v < 0.004) {
          if (el.style.transform) {
            el.style.transform = '';
            el.style.filter = '';
            // dropping the hint releases the compositing layer again
            el.style.willChange = '';
          }
          continue;
        }

        const eased = v * v * (3 - 2 * v);
        // hinted only for the moment the letter is actually moving
        if (!el.style.willChange) el.style.willChange = 'transform, filter';
        el.style.transform = `translateY(${-eased * MAX_LIFT}px) scale(${1 + eased * MAX_SCALE})`;
        el.style.filter =
          `drop-shadow(0 0 ${6 + 16 * eased}px rgba(214,0,175,${(0.7 * eased).toFixed(3)}))` +
          ` drop-shadow(0 0 ${18 + 34 * eased}px rgba(124,40,190,${(0.6 * eased).toFixed(3)}))`;
      }

      raf = settling ? requestAnimationFrame(render) : 0;
    };

    const onMove = (event: MouseEvent) => {
      if (performance.now() - measuredAt > STALE_MS) measure();
      const near =
        event.clientX > bounds.left - radius &&
        event.clientX < bounds.right + radius &&
        event.clientY > bounds.top - radius &&
        event.clientY < bounds.bottom + radius;

      pointer = near ? { x: event.clientX, y: event.clientY } : { x: -99999, y: -99999 };

      if (!raf) raf = requestAnimationFrame(render);
    };

    measure();
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('scroll', queueMeasure, { passive: true });
    window.addEventListener('resize', queueMeasure);
    const fonts = (document as Document & { fonts?: FontFaceSet }).fonts;
    fonts?.ready.then(measure);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('scroll', queueMeasure);
      window.removeEventListener('resize', queueMeasure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [rootRef, key]);
}
