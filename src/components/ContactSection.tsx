import { Mail, FileText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import GlowText from './ui/GlowText';
import ContactButton from './ui/ContactButton';
import SocialLinks from './ui/SocialLinks';
import { site, contact } from '../data/portfolio';

type ContactLink = {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  download?: string;
};

const links: ContactLink[] = [
  { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
  {
    icon: FileText,
    label: 'Resume',
    value: site.cvFileName,
    href: site.cv,
    // saves as "Resume.pdf" rather than the original file name
    download: site.cvFileName,
  },
];

export default function ContactSection() {
  return (
    <footer
      id="contact"
      className="bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 md:pt-28 pb-10"
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="font-black uppercase text-center leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
        >
          <GlowText text="Contact" charClassName="hero-heading" />
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.1}
          y={20}
          className="text-[#D7E2EA] font-light text-center leading-relaxed max-w-[620px]"
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)' }}
        >
          {contact.body}
        </FadeIn>

        <FadeIn delay={0.2} y={20}>
          <ContactButton href={`mailto:${site.email}`} />
        </FadeIn>

        <FadeIn
          delay={0.25}
          y={20}
          className="w-full grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {links.map(({ icon: Icon, label, value, href, download }) => (
            <a
              key={label}
              href={href}
              download={download}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="flex items-center gap-3 sm:gap-4 rounded-2xl border border-[#D7E2EA]/20 px-4 sm:px-5 py-4 transition-colors duration-300 hover:bg-[#D7E2EA]/5"
            >
              <Icon className="w-5 h-5 text-[#D7E2EA]/60 shrink-0" strokeWidth={1.5} />
              <span className="flex flex-col min-w-0">
                <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-[0.65rem]">
                  {label}
                </span>
                {/* the email must never be clipped, so it wraps rather than
                    truncating if a column ever gets too narrow */}
                <span
                  className="text-[#D7E2EA] font-medium text-[0.8rem] lg:text-sm"
                  style={{ overflowWrap: 'anywhere' }}
                >
                  {value}
                </span>
              </span>
            </a>
          ))}
        </FadeIn>

        <FadeIn delay={0.3} y={20} className="flex flex-col items-center gap-5 sm:gap-6">
          <h3 className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs">
            Find me
          </h3>
          <SocialLinks />
        </FadeIn>

        <p className="text-[#D7E2EA]/35 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs text-center pt-4">
          © {new Date().getFullYear()} {site.name} — {site.role}
        </p>
      </div>
    </footer>
  );
}
