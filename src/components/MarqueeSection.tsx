import { useEffect, useRef, useState } from 'react';
import { marqueeRowOne, marqueeRowTwo } from '../data/portfolio';

/** Tripled so the strip never runs out of tiles while it slides. */
function triple(list: string[]) {
  return [...list, ...list, ...list];
}

function Row({
  images,
  offset,
  direction,
}: {
  images: string[];
  offset: number;
  direction: 1 | -1;
}) {
  return (
    <div
      className="flex gap-3"
      style={{
        transform: `translateX(${direction * (offset - 200)}px)`,
        willChange: 'transform',
      }}
    >
      {triple(images).map((src, index) => (
        <img
          key={`${src}-${index}`}
          src={src}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="rounded-2xl object-cover shrink-0"
          style={{ width: 420, height: 270 }}
        />
      ))}
    </div>
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const sectionTop = el.offsetTop;
      const next = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(next);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-[#0C0C0C] pt-16 sm:pt-20 md:pt-24 pb-8"
      style={{ overflowX: 'clip' }}
    >
      <div className="flex flex-col gap-3">
        <Row images={marqueeRowOne} offset={offset} direction={1} />
        <Row images={marqueeRowTwo} offset={offset} direction={-1} />
      </div>
    </section>
  );
}
