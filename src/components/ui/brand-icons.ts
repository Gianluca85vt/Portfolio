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

export const Instagram = createLucideIcon('Instagram', [
  ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: '2e1cvw' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: '9exkf1' }],
  ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'r4j83e' }],
]);
