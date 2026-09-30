import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { work } from '../../data/home';
import type { WorkFilter } from '../../data/home';
import Lightbox, { kindLabel } from './Lightbox';
import WorkSpace from './WorkSpace';
import type { SpaceFocus } from './WorkSpace';
import type { ArchiveItem } from './Lightbox';
import { projectFor, projectsOf, tilesFor, tint } from './projects';
import type { Project, Tile } from './projects';
import { Buckets, Reveal, SectionTitle, Slate, pad, useInView, useThumb, useVoiced } from './ui';
import type { WorkEvent } from './ui';

/** How many pictures a category shows before "Show all", in the grid. */
const PAGE = 16;
/** How many hang in the room at once; the long categories come in sets. */
const ROOM = 40;

function Card({
  item,
  index,
  onOpen,
  project,
}: {
  item: ArchiveItem;
  index: number;
  onOpen: () => void;
  /** Set when the card stands for a whole project: its cover, count and colour. */
  project?: Project;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { rootMargin: '0px 0px -6% 0px' });
  const thumb = useThumb();
  const title = project ? project.name : item.title ?? 'Untitled';

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      data-cursor="View"
      aria-label={
        project
          ? `${title}, ${kindLabel[item.kind]}: open the gallery of ${project.items.length} images`
          : `${title}, ${kindLabel[item.kind]}: open full size`
      }
      className="group relative block w-full overflow-hidden rounded-[3px]"
      style={{
        aspectRatio: `${item.w} / ${item.h}`,
        background:
          item.kind === '3d'
            ? 'radial-gradient(circle at 50% 38%, #1c1a22, #060606 75%)'
            : '#0b0b0b',
        ...(project
          ? { boxShadow: `0 0 0 1px ${tint(project.colour, 0.55)}, 0 0 28px ${tint(project.colour, 0.22)}` }
          : {}),
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
      {project ? (
        <span className="absolute top-2.5 left-2.5 vp-label !text-[0.55rem] rounded-full bg-black/70 text-[#D7E2EA] px-2 py-0.5 inline-flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: project.colour, boxShadow: `0 0 8px ${project.colour}` }}
          />
          {project.name} · {project.items.length}
        </span>
      ) : item.line ? (
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
  // What the viewer shows: a project's gallery, or the loose pictures of the
  // view. `tile` is where it was opened from, so the room can turn back to it.
  const [opened, setOpened] = useState<{
    tile: number;
    items: ArchiveItem[];
    index: number;
    project?: Project;
  } | null>(null);
  const [view, setView] = useState<'space' | 'grid'>('space');
  const [set, setSet] = useState(0);
  const [focus, setFocus] = useState<SpaceFocus>(null);
  const intro = useVoiced(work.intro);

  const choose = (f: WorkFilter) => {
    setFilter(f);
    setLimit(PAGE);
    setSet(0);
    setFocus(null);
  };

  useEffect(() => {
    const on = (e: Event) => {
      choose((e as CustomEvent<WorkEvent>).detail.filter);
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

  const projects = useMemo(() => projectsOf(items), [items]);
  const list = lists[filter];
  // The hand-picked selection keeps every picture separate; the categories
  // gather each project into one tile.
  const tiles = useMemo(() => tilesFor(list, projects, filter !== 'selected'), [list, projects, filter]);
  const loose = useMemo(() => tiles.flatMap((t) => (t.type === 'single' ? [t.item] : [])), [tiles]);
  // The selection is short by design; only the long categories are paged.
  const shown = filter === 'selected' ? tiles : tiles.slice(0, limit);
  const sets = Math.ceil(tiles.length / ROOM);
  const room = tiles.slice(set * ROOM, set * ROOM + ROOM);

  // A project opens as its own gallery, from its sphere or from any one of its
  // pictures. A picture with no project opens among the other loose ones.
  const openTile = (t: number) => {
    const tile: Tile | undefined = tiles[t];
    if (!tile) return;
    if (tile.type === 'group') {
      setOpened({ tile: t, items: tile.project.items, index: 0, project: tile.project });
      return;
    }
    const p = projectFor(tile.item, projects);
    if (p) setOpened({ tile: t, items: p.items, index: Math.max(0, p.items.indexOf(tile.item)), project: p });
    else setOpened({ tile: t, items: loose, index: Math.max(0, loose.indexOf(tile.item)) });
  };

  // Closing the viewer in the room turns it to the picture last seen there —
  // switching to its set first if the arrows went past the ones on show.
  const close = () => {
    if (view === 'space' && opened) {
      // Among loose pictures the arrows move from tile to tile; in a project
      // they stay on its sphere.
      const seen = opened.items[opened.index];
      const at = opened.project ? -1 : tiles.findIndex((t) => t.type === 'single' && t.item === seen);
      const tile = at >= 0 ? at : opened.tile;
      const s = Math.floor(tile / ROOM);
      if (s !== set) setSet(s);
      setFocus({ index: tile % ROOM, n: Date.now() });
    }
    setOpened(null);
  };
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
                onClick={() => choose(f.id)}
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

        <div className="flex items-center gap-3 min-w-0 flex-wrap">
          <div role="group" aria-label="Layout" className="flex gap-1 rounded-full border border-[#D7E2EA]/15 p-0.5 shrink-0">
            {(
              [
                ['space', 'Room'],
                ['grid', 'Grid'],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                aria-pressed={view === id}
                onClick={() => setView(id)}
                className={`vp-label !text-[0.6rem] rounded-full px-2.5 py-1.5 transition-colors duration-300 ${
                  view === id ? 'bg-[#D7E2EA] text-black' : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
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

      {view === 'space' ? (
        <>
          {sets > 1 ? (
            <div role="group" aria-label="Which pictures hang in the room" className="flex justify-end gap-1.5 -mt-2 mb-3">
              {Array.from({ length: sets }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-pressed={set === i}
                  onClick={() => {
                    setSet(i);
                    setFocus(null);
                  }}
                  className={`vp-label !text-[0.6rem] rounded-full border px-3 py-1.5 transition-colors duration-300 ${
                    set === i ? 'border-[#ff8a3d] text-[#ff8a3d]' : 'border-[#D7E2EA]/20 text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
                  }`}
                >
                  {i * ROOM + 1}–{Math.min(tiles.length, (i + 1) * ROOM)}
                </button>
              ))}
            </div>
          ) : null}
          <WorkSpace
            key={`${filter}-${set}`}
            tiles={room}
            grade={grade}
            focus={focus}
            onOpen={(i) => openTile(set * ROOM + i)}
          />
        </>
      ) : (
        <div key={filter} className="vp-masonry vp-grade" data-grade={grade}>
          {shown.map((tile, i) =>
            tile.type === 'group' ? (
              <Card
                key={tile.key}
                item={tile.project.items[0]}
                project={tile.project}
                index={i}
                onOpen={() => openTile(i)}
              />
            ) : (
              <Card key={tile.key} item={tile.item} index={i} onOpen={() => openTile(i)} />
            )
          )}
        </div>
      )}

      {view === 'grid' && tiles.length > shown.length ? (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={() => setLimit(list.length)}
            className="rounded-full border border-[#D7E2EA]/30 px-6 py-3 text-[#D7E2EA] font-medium uppercase tracking-widest text-[0.7rem] transition-colors duration-300 hover:bg-[#D7E2EA] hover:text-black"
          >
            Show all {tiles.length}
          </button>
        </div>
      ) : null}

      {opened ? (
        <Lightbox
          items={opened.items}
          index={opened.index}
          onIndex={(i) => setOpened((o) => (o ? { ...o, index: i } : o))}
          onClose={close}
          project={opened.project ? { name: opened.project.name, colour: opened.project.colour } : undefined}
        />
      ) : null}
    </section>
  );
}
