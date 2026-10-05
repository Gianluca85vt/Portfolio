import { createLucideIcon } from 'lucide-react';

/**
 * Facebook and Instagram, drawn from the same paths lucide-react ships.
 *
 * lucide has deprecated its brand icons and will drop them in a later release,
 * so relying on its exports would turn an upgrade into missing glyphs.
 * createLucideIcon is the library's own way to define an icon, so these take
 * the same props and render exactly what the deprecated exports did.
 */
export const Facebook = createLucideIcon('Facebook', [
  ['path', { d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z', key: '1jg4f8' }],
]);

export const Linkedin = createLucideIcon('Linkedin', [
  ['path', { d: 'M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z', key: 'c2jq9f' }],
  ['rect', { width: '4', height: '12', x: '2', y: '9', key: 'mk3on5' }],
  ['circle', { cx: '4', cy: '4', r: '2', key: 'bt5ra8' }],
]);

/** The X mark, as two strokes: lucide has never shipped one. */
export const XMark = createLucideIcon('XMark', [
  ['path', { d: 'M4 4l16 16', key: 'x1' }],
  ['path', { d: 'M20 4 4 20', key: 'x2' }],
]);

/** Bluesky's butterfly, outlined to sit with the other stroked icons. */
export const Bluesky = createLucideIcon('Bluesky', [
  [
    'path',
    {
      d: 'M12 11C10.5 8 7 4.5 4.5 4.5c-1.5 0-1.5 2-1 4 .5 2 2 3.5 4.5 3.5-2.5.5-4 2-2.5 4s4.5 1 6.5-3c2 4 5 5 6.5 3s0-3.5-2.5-4c2.5 0 4-1.5 4.5-3.5.5-2 .5-4-1-4C17 4.5 13.5 8 12 11z',
      key: 'bsky',
    },
  ],
]);

export const Instagram = createLucideIcon('Instagram', [
  ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: '2e1cvw' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: '9exkf1' }],
  ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'r4j83e' }],
]);
