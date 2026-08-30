import { Palette, Terminal, Wand2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import GlowText from './ui/GlowText';
import { ai } from '../data/portfolio';

const ICONS: Record<string, LucideIcon> = {
  terminal: Terminal,
  wand: Wand2,
  palette: Palette,
};

export default function AiSection() {
  return (
    <section
      id="ai"
      className="relative z-10 bg-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 px-5 sm:px-8 md:px-10 pt-14 sm:pt-16 md:pt-20 pb-10 sm:pb-12"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="font-black uppercase text-center leading-none tracking-tight"
        style={{ fontSize: 'clamp(2.6rem, 8vw, 100px)' }}
      >
        <GlowText text={ai.heading} charClassName="hero-heading" />
      </FadeIn>

      <FadeIn
        as="p"
        delay={0.1}
        y={20}
        className="text-[#D7E2EA] font-light text-center leading-relaxed max-w-[640px] mx-auto mt-8 sm:mt-10 md:mt-12"
        style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)' }}
      >
        {ai.intro}
      </FadeIn>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mt-14 sm:mt-16 md:mt-20">
        {ai.roles.map((role, index) => {
          const Icon = ICONS[role.icon];
          return (
            <FadeIn
              key={role.name}
              delay={index * 0.1}
              y={30}
              className="flex flex-col gap-4 rounded-[24px] sm:rounded-[28px] border border-[#D7E2EA]/20 p-6 sm:p-7 transition-colors duration-300 hover:border-[#D7E2EA]/40"
            >
              <span
                className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              >
                <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
              </span>

              <h3
                className="text-[#D7E2EA] font-medium uppercase leading-tight tracking-wide"
                style={{ fontSize: 'clamp(1rem, 1.8vw, 1.4rem)' }}
              >
                <GlowText text={role.name} />
              </h3>

              <p
                className="text-[#D7E2EA]/60 font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
              >
                {role.description}
              </p>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={0.2} y={20} className="max-w-5xl mx-auto mt-12 sm:mt-14 md:mt-16">
        <h3 className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs text-center mb-6 sm:mb-8">
          Daily toolkit
        </h3>

        <ul className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {ai.tools.map((tool) => (
            <li
              key={tool.name}
              className="flex items-baseline gap-2.5 rounded-full border border-[#D7E2EA]/20 px-5 py-2.5 sm:px-6 sm:py-3 transition-colors duration-300 hover:bg-[#D7E2EA]/5"
            >
              <span className="text-[#D7E2EA] font-medium text-xs sm:text-sm whitespace-nowrap">
                {tool.name}
              </span>
              <span className="text-[#D7E2EA]/40 font-light uppercase tracking-widest text-[0.6rem] whitespace-nowrap">
                {tool.role}
              </span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
