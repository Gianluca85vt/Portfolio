import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { site } from '../../data/portfolio';
import { chooser } from '../../data/home';
import { useMode } from './ui';

export const homeNav = [
  { label: 'What I do', href: '#skills' },
  { label: 'Work', href: '#work' },
  { label: 'Showreel', href: '#showreel' },
  { label: 'Try it', href: '#lab' },
  { label: 'About', href: '#about' },
  { label: 'AI', href: '#ai' },
  { label: 'Services', href: '/services/' },
  { label: 'Blog', href: '/blog/' },
];

/** Studio / client, switchable from anywhere on the page. */
export function ModeSwitch({ className = '' }: { className?: string }) {
  const { mode, setMode } = useMode();
  return (
    <div
      role="group"
      aria-label={chooser.question}
      className={`inline-flex items-center rounded-full border border-[#D7E2EA]/20 p-0.5 ${className}`}
    >
      {chooser.options.map((option) => {
        const on = mode === option.mode;
        return (
          <button
            key={option.mode}
            type="button"
            aria-pressed={on}
            onClick={() => setMode(on ? null : option.mode)}
            className={`vp-label rounded-full px-3 py-1.5 transition-colors duration-300 ${
              on ? 'bg-[#D7E2EA] text-black' : 'text-[#D7E2EA]/60 hover:text-[#D7E2EA]'
            }`}
          >
            {option.label.replace(/^A /, '')}
          </button>
        );
      })}
    </div>
  );
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 border-b ${
          scrolled
            ? 'bg-black/70 backdrop-blur-md border-[#D7E2EA]/10'
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="flex items-center justify-between gap-6 px-5 sm:px-8 md:px-10 h-16">
          <a href="#top" className="group flex items-center gap-3 min-w-0" aria-label={`${site.name}, back to the top`}>
            <span
              aria-hidden="true"
              className="relative grid place-items-center w-8 h-8 shrink-0 rounded-full vp-grad-bg text-white font-semibold text-[0.72rem] tracking-wide"
            >
              GS
            </span>
            <span className="flex flex-col leading-none min-w-0">
              <span className="text-[#D7E2EA] font-medium uppercase tracking-wider text-[0.8rem] whitespace-nowrap">
                {site.name}
              </span>
              <span className="vp-label text-[#D7E2EA]/45 !text-[0.58rem] mt-1 hidden sm:block whitespace-nowrap">
                {site.role}
              </span>
            </span>
          </a>

          <nav aria-label="Sections" className="hidden xl:flex items-center gap-6">
            {homeNav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="vp-label text-[#D7E2EA]/65 hover:text-[#D7E2EA] transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <ModeSwitch className="hidden md:inline-flex" />
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center rounded-full vp-grad-bg text-white font-medium uppercase tracking-widest text-[0.68rem] px-5 py-2.5 transition-transform duration-300 hover:scale-[1.04]"
            >
              Let's talk
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open the menu"
              aria-expanded={open}
              className="xl:hidden flex items-center gap-2 vp-label text-[#D7E2EA] rounded-full border border-[#D7E2EA]/25 px-3.5 py-2"
            >
              <Menu className="w-4 h-4" strokeWidth={1.6} />
              Menu
            </button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex flex-col px-5 sm:px-8 pt-5 pb-8 overflow-y-auto"
        >
          <div className="flex items-center justify-between">
            <span className="vp-label text-[#D7E2EA]/50">Menu</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close the menu"
              className="grid place-items-center w-11 h-11 rounded-full border border-[#D7E2EA]/25 text-[#D7E2EA]"
            >
              <X className="w-5 h-5" strokeWidth={1.6} />
            </button>
          </div>
          <nav aria-label="Sections" className="flex flex-col mt-8">
            {[...homeNav, { label: 'Contact', href: '#contact' }].map((item, i) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-[#D7E2EA]/10 py-3.5 text-[#D7E2EA] font-black uppercase tracking-tight"
                style={{ fontSize: 'clamp(2rem, 9vw, 3.4rem)', lineHeight: 1 }}
              >
                <span className="vp-label text-[#ff8a3d] !text-[0.66rem]">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-8 flex flex-col gap-3">
            <span className="vp-label text-[#D7E2EA]/45">{chooser.question}</span>
            <ModeSwitch className="self-start" />
          </div>
        </div>
      ) : null}
    </>
  );
}
