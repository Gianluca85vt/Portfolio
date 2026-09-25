/**
 * HTML-escape text that goes into markup the server writes by hand — comment
 * bodies, draft titles, anything a stranger or the writer typed.
 */
export function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
