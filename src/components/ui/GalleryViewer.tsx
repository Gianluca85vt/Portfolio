import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { GalleryItem } from '../../data/portfolio';

type GalleryViewerProps = {
  items: GalleryItem[];
};

export default function GalleryViewer({ items }: GalleryViewerProps) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const stripRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (step: number) => {
      setDirection(step);
      setIndex((i) => (i + step + items.length) % items.length);
    },
    [items.length]
  );

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') go(1);
      if (event.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  // keep the active thumbnail in view as you page through
  useEffect(() => {
    const strip = stripRef.current;
    const active = strip?.children[index] as HTMLElement | undefined;
    active?.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
  }, [index]);

  const current = items[index];

  return (
    <div className="h-full flex flex-col gap-3 sm:gap-4 min-h-0">
      <div className="relative flex-1 min-h-0 rounded-[20px] sm:rounded-[28px] overflow-hidden bg-black/40">
        <AnimatePresence initial={false} mode="popLayout" custom={direction}>
          <motion.img
            key={current.src}
            src={current.src}
            alt={current.title ?? `Artwork ${index + 1} of ${items.length}`}
            className="absolute inset-0 w-full h-full object-contain"
            custom={direction}
            initial={{ opacity: 0, x: direction * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -40 }}
            transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
          />
        </AnimatePresence>

        {items.length > 1 ? (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous"
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-[#D7E2EA]/60 bg-black/45 text-[#D7E2EA] backdrop-blur-sm transition-colors duration-300 hover:bg-[#D7E2EA]/15"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next"
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-[#D7E2EA]/60 bg-black/45 text-[#D7E2EA] backdrop-blur-sm transition-colors duration-300 hover:bg-[#D7E2EA]/15"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </>
        ) : null}

        <div className="absolute left-0 right-0 bottom-0 flex items-end justify-between gap-4 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-t from-black/75 to-transparent pointer-events-none">
          <span className="text-[#D7E2EA] font-medium uppercase tracking-wide text-xs sm:text-sm">
            {current.title ?? ''}
          </span>
          <span className="shrink-0 text-[#D7E2EA]/60 font-light tracking-widest text-xs sm:text-sm tabular-nums">
            {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      <div
        ref={stripRef}
        className="shrink-0 flex gap-2 sm:gap-3 overflow-x-auto pb-1"
        style={{ scrollbarWidth: 'thin' }}
      >
        {items.map((item, i) => (
          <button
            key={item.src}
            type="button"
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            aria-label={`Show ${item.title ?? `artwork ${i + 1}`}`}
            aria-current={i === index}
            className={`shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
              i === index
                ? 'border-[#D7E2EA] opacity-100'
                : 'border-transparent opacity-45 hover:opacity-80'
            }`}
          >
            <img
              src={item.src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-14 w-20 sm:h-16 sm:w-24 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
