import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { nav, site } from '../data/portfolio';

/**
 * Header for the routed sub-pages. The home page keeps its own nav inside the
 * hero, where it is part of the composition.
 */
export default function SiteHeader({ current }: { current: '/members' | '/blog' }) {
  return (
    <header className="relative z-20 flex items-center justify-between gap-4 px-5 sm:px-8 md:px-10 pt-6 md:pt-8">
      <Link
        to="/"
        className="flex items-center gap-2 text-[#D7E2EA] font-medium uppercase tracking-wider text-[0.7rem] sm:text-sm transition-opacity duration-200 hover:opacity-70"
      >
        <ArrowLeft className="w-4 h-4" strokeWidth={2} />
        <span className="hidden sm:inline">{site.name}</span>
        <span className="sm:hidden">Home</span>
      </Link>

      <nav className="flex items-center gap-x-4 sm:gap-x-6">
        {nav
          .filter((item) => 'to' in item)
          .map((item) => {
            const to = (item as { to: string }).to;
            const active = to === current;
            return (
              <Link
                key={item.label}
                to={to}
                aria-current={active ? 'page' : undefined}
                className={`font-medium uppercase tracking-wider text-[0.7rem] sm:text-sm transition-opacity duration-200 hover:opacity-70 ${
                  active ? 'text-white' : 'text-[#D7E2EA]/60'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        <Link
          to="/#contact"
          className="text-[#D7E2EA]/60 font-medium uppercase tracking-wider text-[0.7rem] sm:text-sm transition-opacity duration-200 hover:opacity-70"
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}
