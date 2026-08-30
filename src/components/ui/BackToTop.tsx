import { ArrowUp } from 'lucide-react';

/**
 * A way back to the top, on screen the whole way down.
 *
 * There is no scroll threshold and no listener. A button that reveals itself
 * past some scroll position is the usual pattern and reads better at the top
 * of the page, but it also has a failure mode where it never appears at all —
 * and "always there" is what was asked for. This cannot not be there.
 *
 * Bottom right, clear of the content column at every width, and it jumps
 * rather than glides for anyone who asked for less motion.
 */
export default function BackToTop() {
  const toTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Back to top"
      title="Back to top"
      className="group fixed z-50 bottom-5 right-5 sm:bottom-7 sm:right-7 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border border-[#D7E2EA]/30 text-[#D7E2EA] backdrop-blur-md transition-colors duration-300 hover:text-white hover:border-transparent"
      style={{ background: 'rgba(24, 1, 31, 0.72)' }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        }}
      />
      <ArrowUp className="relative w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2} />
    </button>
  );
}
