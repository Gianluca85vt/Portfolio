import type { ArchiveItem } from './Lightbox';

/**
 * Pictures of one project travel together.
 *
 * A project is the part of a title before " — ": "EVA-01" and "EVA-01 — close-up"
 * are one project, and a title with no dash is a project of its own name. Two or
 * more pictures sharing a project in the same category make a group: the room
 * shows it as one sphere, the grid as one card, and opening it shows only that
 * project's pictures, as its own gallery. Untitled pictures never group, since
 * nothing says they belong together.
 */

/** Glow colours, handed out in order so neighbouring projects never match. */
const COLOURS = ['#B600A8', '#35C3D4', '#FF8A3D', '#8B6CFF', '#3DDC97', '#FF5C7A', '#F2C14E', '#4DA3FF'];

export type Project = { key: string; name: string; items: ArchiveItem[]; colour: string };

export type Tile =
  | { type: 'single'; key: string; item: ArchiveItem }
  | { type: 'group'; key: string; project: Project };

export function projectName(item: ArchiveItem): string | null {
  const t = item.title?.trim();
  if (!t) return null;
  return t.split(' — ')[0].trim() || null;
}

const keyOf = (item: ArchiveItem) => {
  const name = projectName(item);
  return name ? `${item.kind}:${name}` : null;
};

/** Every project with at least two pictures, keyed by kind and name, in first-seen order. */
export function projectsOf(items: ArchiveItem[]): Map<string, Project> {
  const all = new Map<string, ArchiveItem[]>();
  for (const it of items) {
    const k = keyOf(it);
    if (!k) continue;
    const list = all.get(k);
    if (list) list.push(it);
    else all.set(k, [it]);
  }
  const out = new Map<string, Project>();
  let n = 0;
  for (const [key, list] of all) {
    if (list.length < 2) continue;
    out.set(key, { key, name: projectName(list[0]) ?? '', items: list, colour: COLOURS[n++ % COLOURS.length] });
  }
  return out;
}

/** The project a picture belongs to, when it has company. */
export const projectFor = (item: ArchiveItem, projects: Map<string, Project>) => {
  const k = keyOf(item);
  return k ? projects.get(k) ?? null : null;
};

/**
 * What a category shows: one tile per project, at the place of its first
 * picture, and every picture without a project on its own. `group: false` keeps
 * every picture separate, for the hand-picked selection.
 */
export function tilesFor(list: ArchiveItem[], projects: Map<string, Project>, group = true): Tile[] {
  const seen = new Set<string>();
  const tiles: Tile[] = [];
  for (const item of list) {
    const p = group ? projectFor(item, projects) : null;
    if (!p) {
      tiles.push({ type: 'single', key: item.src, item });
      continue;
    }
    if (seen.has(p.key)) continue;
    seen.add(p.key);
    tiles.push({ type: 'group', key: `project:${p.key}`, project: p });
  }
  return tiles;
}

/** "#B600A8" at alpha 0.4 as rgba(), for glows that need no colour-mix(). */
export function tint(hex: string, alpha: number) {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}
