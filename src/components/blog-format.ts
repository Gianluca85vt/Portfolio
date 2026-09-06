import { categoryColors } from '../data/portfolio';
import type { BlogCategory } from '../data/portfolio';

/**
 * The two formatting decisions the index and the search results have to agree
 * on. They lived in BlogList until the search box needed them too, and the
 * search box is rendered by BlogList — so importing them back out of it would
 * have been a cycle.
 */

export function formatDate(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function colorFor(category: string) {
  return categoryColors[category as BlogCategory] ?? '#7621B0';
}
