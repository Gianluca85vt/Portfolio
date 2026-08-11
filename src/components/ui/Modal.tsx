import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  link?: { href: string; label: string };
  children: ReactNode;
};

export default function Modal({
  open,
  onClose,
  title,
  eyebrow,
  link,
  children,
}: ModalProps) {
  // There is no document while Astro pre-renders this to HTML, and createPortal
  // needs one. Mount the portal only once we are in the browser.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);

    // hold the page still behind the overlay without letting it jump sideways
    const { overflow, paddingRight } = document.body.style;
    const gap = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (gap > 0) document.body.style.paddingRight = `${gap}px`;

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  // Rendered into <body>: the project cards carry a transform, and a transformed
  // ancestor would make `position: fixed` resolve against the card instead of
  // the viewport.
  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 cursor-default"
            style={{
              background:
                'radial-gradient(120% 90% at 50% 0%, rgba(58,6,72,0.86) 0%, rgba(12,12,12,0.93) 55%, rgba(6,6,6,0.97) 100%)',
              backdropFilter: 'blur(14px)',
              WebkitBackdropFilter: 'blur(14px)',
            }}
          />

          <motion.div
            /* h-full, not max-h-full: the gallery's stage is a flex-1 box with an
               absolutely positioned image, so without a definite height to hand
               down the panel collapsed to just the header and the thumbnails. */
            className="relative z-10 w-full max-w-6xl h-full flex flex-col rounded-[28px] sm:rounded-[40px] border-2 border-[#D7E2EA]/45 bg-[#0C0C0C]/85 overflow-hidden"
            initial={{ opacity: 0, y: 26, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <header className="flex items-start justify-between gap-4 px-5 sm:px-8 pt-5 sm:pt-7 pb-4 shrink-0">
              <div className="flex flex-col gap-1 min-w-0">
                {eyebrow ? (
                  <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs">
                    {eyebrow}
                  </span>
                ) : null}
                <h2
                  className="text-[#D7E2EA] font-medium uppercase leading-tight"
                  style={{ fontSize: 'clamp(1.05rem, 2.4vw, 2rem)' }}
                >
                  {title}
                </h2>
              </div>

              <div className="shrink-0 flex items-center gap-3">
                {link ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden sm:inline-block rounded-full border-2 border-[#D7E2EA]/60 text-[#D7E2EA] font-medium uppercase tracking-widest text-xs px-5 py-2.5 transition-colors duration-300 hover:bg-[#D7E2EA]/10"
                  >
                    {link.label}
                  </a>
                ) : null}

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#D7E2EA]/60 text-[#D7E2EA] transition-colors duration-300 hover:bg-[#D7E2EA]/10"
                >
                  <X className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </header>

            <div className="flex-1 min-h-0 px-3 sm:px-6 pb-5 sm:pb-7">{children}</div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body
  );
}
