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
 * Cycle: three seconds after load the first one fades in over a second, holds
 * for three, fades out over a second, and the next headline takes its place.
 * It rotates through the posts until dismissed, and stays dismissed for the
 * rest of the session. It never covers the hero copy or blocks a click — only
 * the bubble itself is interactive.
 */
const FIRST_DELAY = 3000;
const VISIBLE_FOR = 3000;
const FADE_SECONDS = 1;
// the three seconds are reading time, so the fade-in does not eat into them
const HOLD_MS = FADE_SECONDS * 1000 + VISIBLE_FOR;

export default function AvatarBubble({ posts }: { posts: LatestPost[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // first appearance
  useEffect(() => {
    if (dismissed || posts.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const t = window.setTimeout(() => {
      // start somewhere random so a repeat visit does not open on the same post
      setIndex(Math.floor(Math.random() * posts.length));
      setOpen(true);
    }, FIRST_DELAY);
    return () => window.clearTimeout(t);
  }, [dismissed, posts.length]);

  // hold, then start fading out
  useEffect(() => {
    if (!open || dismissed) return;
    const t = window.setTimeout(() => setOpen(false), HOLD_MS);
    return () => window.clearTimeout(t);
  }, [open, dismissed]);

  // Advancing on exit complete rather than on a timer keeps the fades from
  // overlapping: the next headline only starts once the previous has gone.
  const nextPost = () => {
    if (dismissed) return;
    setIndex((i) => (i + 1) % posts.length);
    setOpen(true);
  };

  if (posts.length === 0) return null;
  const post = posts[index];

  return (
    <AnimatePresence mode="wait" onExitComplete={nextPost}>
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
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: FADE_SECONDS, ease: [0.25, 0.1, 0.25, 1] }}
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
