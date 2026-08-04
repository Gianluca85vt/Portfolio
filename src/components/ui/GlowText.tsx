import { useEffect, useMemo, useRef } from 'react';

/**
 * Per-letter backlight that follows the cursor.
 *
 * Each character reacts on its own, by distance from the pointer, so the effect
 * is a moving pool of light rather than the whole heading switching on. There is
 * deliberately no :hover on any wrapper — hovering the heading's empty box does
 * nothing, only proximity to an actual glyph does.
 *
 * The gradient class goes on every character rather than the wrapper: a `filter`
 * on a child of a `background-clip: text` element renders into its own layer and
 * would lose the parent's clipped background, leaving the letter invisible.
 */
const MAX_SCALE = 0.18;
const MAX_LIFT = 5; // px

/**
 * Falloff scales with the type size, so a 160px heading and a 20px card title
 * both light up roughly the pointed letter plus one neighbour either side.
 */
function radiusFor(el: HTMLElement) {
  const size = parseFloat(getComputedStyle(el).fontSize) || 16;
  return Math.max(46, size * 1.15);
}

type GlowTextProps = {
  text: string;
  /** applied to each character — put the gradient class here */
  charClassName?: string;
};

export default function GlowText({ text, charClassName = '' }: GlowTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const words = useMemo(() => text.split(' '), [text]);
  const charCount = useMemo(() => text.replace(/ /g, '').length, [text]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let centers: { x: number; y: number }[] = [];
    let bounds = { left: 0, top: 0, right: 0, bottom: 0 };
    let radius = radiusFor(root);
    const current = new Array(charCount).fill(0);
    let pointer = { x: -99999, y: -99999 };
    let raf = 0;
    let measureQueued = false;

    // Positions are cached and refreshed on scroll/resize, so the per-frame work
    // is pure arithmetic with no layout reads.
    const measure = () => {
      measureQueued = false;
      radius = radiusFor(root);
      const r = root.getBoundingClientRect();
      bounds = { left: r.left, top: r.top, right: r.right, bottom: r.bottom };
      centers = charRefs.current.map((c) => {
        if (!c) return { x: -99999, y: -99999 };
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
      for (let i = 0; i < charCount; i++) {
        const el = charRefs.current[i];
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
          }
          continue;
        }

        const eased = v * v * (3 - 2 * v);
        el.style.transform = `translateY(${-eased * MAX_LIFT}px) scale(${1 + eased * MAX_SCALE})`;
        el.style.filter =
          `drop-shadow(0 0 ${6 + 16 * eased}px rgba(214,0,175,${(0.7 * eased).toFixed(3)}))` +
          ` drop-shadow(0 0 ${18 + 34 * eased}px rgba(124,40,190,${(0.6 * eased).toFixed(3)}))`;
      }

      raf = settling ? requestAnimationFrame(render) : 0;
    };

    const onMove = (event: MouseEvent) => {
      const near =
        event.clientX > bounds.left - radius &&
        event.clientX < bounds.right + radius &&
        event.clientY > bounds.top - radius &&
        event.clientY < bounds.bottom + radius;

      pointer = near
        ? { x: event.clientX, y: event.clientY }
        : { x: -99999, y: -99999 };

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
  }, [charCount]);

  let cursor = 0;

  return (
    <span ref={rootRef}>
      {words.map((word, wordIndex) => {
        const start = cursor;
        cursor += word.length;

        return (
          <span key={`${word}-${wordIndex}`}>
            <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
              {word.split('').map((char, charIndex) => {
                const i = start + charIndex;
                return (
                  <span
                    key={`${char}-${charIndex}`}
                    ref={(el) => {
                      charRefs.current[i] = el;
                    }}
                    className={charClassName}
                    style={{
                      display: 'inline-block',
                      willChange: 'transform, filter',
                      transformOrigin: 'center bottom',
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 ? ' ' : null}
          </span>
        );
      })}
    </span>
  );
}
