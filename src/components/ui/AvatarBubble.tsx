import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

export type LatestPost = {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
};

/**
 * A speech bubble beside the avatar that occasionally surfaces a recent article.
 *
 * Deliberately restrained: it waits before the first appearance, shows one post
 * at a time, retires itself after a while, and stays dismissed for the rest of
 * the session once closed. It never covers the hero copy or blocks a click —
 * only the bubble itself is interactive.
 */
const FIRST_DELAY = 6000;
const VISIBLE_FOR = 11000;
const GAP_BETWEEN = 9000;

export default function AvatarBubble({ posts }: { posts: LatestPost[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (dismissed || posts.length === 0) return;
    // a couple of nudges per visit, not a nag
    if (shown >= Math.min(posts.length, 3)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let hide = 0;
    const show = window.setTimeout(() => {
      // start on a random post so a repeat visit is not the same one
      if (shown === 0) setIndex(Math.floor(Math.random() * posts.length));
      setOpen(true);

      hide = window.setTimeout(() => {
        setOpen(false);
        setShown((n) => n + 1);
        setIndex((i) => (i + 1) % posts.length);
      }, VISIBLE_FOR);
    }, shown === 0 ? FIRST_DELAY : GAP_BETWEEN);

    // both timers have to be cleared here: returning a cleanup from inside the
    // setTimeout callback does nothing
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [dismissed, posts.length, shown]);

  if (posts.length === 0) return null;
  const post = posts[index];

  return (
    <AnimatePresence>
      {open && !dismissed ? (
        // Positioning lives on this plain div. Framer Motion writes an inline
        // `transform` on anything it animates, which would silently drop
        // Tailwind's -translate-x-1/2 and push the bubble off screen.
        //
        // Narrow screens have no room beside the head, so it sits above the
        // portrait and only moves to the side from sm up. Width is capped
        // against the viewport so it can never overflow.
        <div
          key={post.slug}
          className="pointer-events-auto absolute z-30 w-[min(240px,74vw)]
            left-1/2 -translate-x-1/2 -top-6
            sm:left-full sm:translate-x-0 sm:-ml-6 sm:top-[24%] sm:w-[248px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
          <div className="relative rounded-2xl sm:rounded-bl-sm border border-[#D7E2EA]/25 bg-[#141018]/95 backdrop-blur-sm p-4 pr-9 shadow-[0_18px_40px_rgba(0,0,0,0.55)]">
            {/* tail pointing back at the avatar, only where it makes sense */}
            <span
              aria-hidden="true"
              className="hidden sm:block absolute -left-[7px] bottom-3 w-3 h-3 rotate-45 border-l border-b border-[#D7E2EA]/25 bg-[#141018]"
            />

            <button
              type="button"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
              className="absolute top-2.5 right-2.5 text-[#D7E2EA]/35 transition-colors duration-200 hover:text-[#D7E2EA]"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2} />
            </button>

            <a href={`/blog/${post.slug}/`} className="block group">
              <span className="text-[0.58rem] uppercase tracking-widest text-[#B600A8]">
                New on the blog · {post.category}
              </span>

              <p className="text-[#D7E2EA] font-medium text-[0.82rem] leading-snug mt-1.5 transition-colors duration-200 group-hover:text-white">
                {post.title}
              </p>

              {post.excerpt ? (
                <p className="text-[#D7E2EA]/45 font-light text-[0.72rem] leading-relaxed mt-1.5 line-clamp-2">
                  {post.excerpt}
                </p>
              ) : null}
            </a>
          </div>
        </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
