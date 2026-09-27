import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { work } from '../../data/home';
import type { WorkFilter } from '../../data/home';
import Lightbox, { kindLabel } from './Lightbox';
import type { ArchiveItem } from './Lightbox';
import { Buckets, Reveal, SectionTitle, Slate, pad, useInView, useThumb, useVoiced } from './ui';
import type { WorkEvent } from './ui';

/** How many pictures a category shows before "Show all". */
const PAGE = 16;

function Card({ item, index, onOpen }: { item: ArchiveItem; index: number; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { rootMargin: '0px 0px -6% 0px' });
  const thumb = useThumb();
  const title = item.title ?? 'Untitled';

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      data-cursor="View"
      aria-label={`${title}, ${kindLabel[item.kind]}: open full size`}
      className="group relative block w-full overflow-hidden rounded-[3px]"
      style={{
        aspectRatio: `${item.w} / ${item.h}`,
        background:
          item.kind === '3d'
            ? 'radial-gradient(circle at 50% 38%, #1c1a22, #060606 75%)'
            : '#0b0b0b',
      }}
    >
      <img
        src={thumb(item.src)}
        alt=""
        width={item.w}
        height={item.h}
        loading="lazy"
        decoding="async"
        data-graded
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        style={{ '--gd': `${(index % 12) * 40}ms` } as CSSProperties}
      />
      <Buckets cols={4} rows={4} active={inView} step={26} />
      <span className="vp-brackets vp-brackets--hover" style={{ '--l': '12px' } as CSSProperties} />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3 pt-10 bg-gradient-to-t from-black/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 [@media(hover:none)]:opacity-100">
        <span className="vp-label text-[#D7E2EA] text-left !text-[0.62rem] truncate">{title}</span>
        <span className="vp-label text-[#D7E2EA]/55 !text-[0.62rem] shrink-0">{pad(index + 1)}</span>
      </span>
      {item.line ? (
        <span className="absolute top-2.5 left-2.5 vp-label !text-[0.55rem] rounded-full bg-black/65 text-[#D7E2EA]/85 px-2 py-0.5">
          + line art
        </span>
      ) : null}
    </button>
  );
}

export default function Work({ items }: { items: ArchiveItem[] }) {
  const [filter, setFilter] = useState<WorkFilter>('selected');
  const [grade, setGrade] = useState('colour');
  const [limit, setLimit] = useState(PAGE);
  const [open, setOpen] = useState<number | null>(null);
  const intro = useVoiced(work.intro);

  useEffect(() => {
    const on = (e: Event) => {
      setFilter((e as CustomEvent<WorkEvent>).detail.filter);
      setLimit(PAGE);
    };
    window.addEventListener('vp:work', on);
    return () => window.removeEventListener('vp:work', on);
  }, []);

  const lists = useMemo(() => {
    const selected = items
      .filter((i) => i.selected !== undefined)
      .sort((a, b) => (a.selected ?? 0) - (b.selected ?? 0));
    return {
      selected,
      concept: items.filter((i) => i.kind === 'concept'),
      '3d': items.filter((i) => i.kind === '3d'),
      arch: items.filter((i) => i.kind === 'arch'),
    } satisfies Record<WorkFilter, ArchiveItem[]>;
  }, [items]);

  const list = lists[filter];
  // The selection is short by design; only the long categories are paged.
  const shown = filter === 'selected' ? list : list.slice(0, limit);
  const gradeNote = work.grades.find((g) => g.id === grade)?.note ?? '';

  return (
    <section
      id="work"
      data-section="Work"
      data-index="02"
      className="relative px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 pb-10 scroll-mt-16"
    >
      <Slate index="02" label="Work" aside={`${items.length} images`} />
      <div className="grid lg:grid-cols-12 gap-6 mt-8 sm:mt-10 items-end">
        <SectionTitle text="Work" className="lg:col-span-7" />
        <Reveal as="p" delay={150} className="lg:col-span-5 text-[#D7E2EA]/65 font-light leading-relaxed text-[1rem] max-w-[460px]">
          {intro}
        </Reveal>
      </div>

      <Reveal
        delay={100}
        className="sticky top-16 z-20 -mx-5 sm:-mx-8 md:-mx-10 px-5 sm:px-8 md:px-10 mt-10 py-3 bg-black/80 backdrop-blur-md border-y border-[#D7E2EA]/10 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
      >
        <div role="tablist" aria-label="Category" className="flex gap-1.5 overflow-x-auto no-scrollbar">
          {work.filters.map((f) => {
            const on = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => {
                  setFilter(f.id);
                  setLimit(PAGE);
                }}
                className={`shrink-0 flex items-center gap-2 rounded-full px-3.5 py-2 border transition-colors duration-300 ${
                  on ? 'bg-[#D7E2EA] border-[#D7E2EA] text-black' : 'border-[#D7E2EA]/20 text-[#D7E2EA]/70 hover:text-[#D7E2EA] hover:border-[#D7E2EA]/50'
                }`}
              >
                <span className="font-medium uppercase tracking-wider text-[0.72rem]">{f.label}</span>
                <span className={`vp-label !text-[0.58rem] ${on ? 'text-black/55' : 'text-[#D7E2EA]/40'}`}>
                  {lists[f.id].length}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 min-w-0">
          <span className="vp-label text-[#D7E2EA]/40 shrink-0 hidden sm:inline">Look at it as</span>
          <div role="group" aria-label="Look at the images as" className="flex gap-1 rounded-full border border-[#D7E2EA]/15 p-0.5 shrink-0">
            {work.grades.map((g) => (
              <button
                key={g.id}
                type="button"
                aria-pressed={grade === g.id}
                onClick={() => setGrade(g.id)}
                className={`vp-label !text-[0.6rem] rounded-full px-2.5 py-1.5 transition-colors duration-300 ${
                  grade === g.id ? 'bg-[#ff8a3d] text-black' : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      <p className="text-[#D7E2EA]/50 font-light text-[0.84rem] mt-4 mb-6 min-h-[1.3em]" aria-live="polite">
        {grade === 'colour' ? '' : gradeNote}
      </p>

      <div key={filter} className="vp-masonry vp-grade" data-grade={grade}>
        {shown.map((item, i) => (
          <Card key={item.src} item={item} index={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      {list.length > shown.length ? (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setLimit(list.length)}
            className="rounded-full border border-[#D7E2EA]/30 px-6 py-3 text-[#D7E2EA] font-medium uppercase tracking-widest text-[0.7rem] transition-colors duration-300 hover:bg-[#D7E2EA] hover:text-black"
          >
            Show all {list.length}
          </button>
        </div>
      ) : null}

      {open !== null ? (
        <Lightbox items={list} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      ) : null}
    </section>
  );
}
