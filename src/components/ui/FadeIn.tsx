import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ElementType, ReactNode } from 'react';
import { motion, useInView } from 'framer-motion';

type FadeInProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  id?: string;
};

/** how long to wait before checking that on-screen content actually revealed */
const SAFETY_MS = 1200;

export default function FadeIn({
  children,
  as = 'div',
  className,
  style,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  id,
}: FadeInProps) {
  const MotionTag = useMemo(() => motion.create(as as 'div'), [as]);
  // MotionTag is typed as a div because `as` is dynamic; the ref matches that,
  // and useInView only ever reads getBoundingClientRect off it.
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 'some' });
  const [forced, setForced] = useState(false);

  // The animation is decoration; the content is not. If the observer has not
  // fired shortly after mount and the element is sitting in the viewport
  // anyway, reveal it regardless — otherwise a missed callback leaves the text
  // invisible until something forces a reflow, which is what a phone rotation
  // was doing. Elements genuinely off-screen are left alone, so scroll-reveal
  // still works.
  useEffect(() => {
    if (inView) return;
    const t = window.setTimeout(() => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const onScreen =
        r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
      if (onScreen) setForced(true);
    }, SAFETY_MS);
    return () => window.clearTimeout(t);
  }, [inView]);

  const shown = inView || forced;

  return (
    <MotionTag
      ref={ref}
      id={id}
      className={className}
      style={style}
      initial={{ opacity: 0, x, y }}
      animate={shown ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </MotionTag>
  );
}
