import { Compass, Users, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import GlowText from './ui/GlowText';
import { direction } from '../data/portfolio';

const ICONS: Record<string, LucideIcon> = {
  compass: Compass,
  users: Users,
  workflow: Workflow,
};

/**
 * Subsection of Skills, so it inherits the white block. Styled dark-on-light
 * to match the numbered list above it rather than the dark sections either
 * side.
 */
export default function DirectionBlock() {
  return (
    <div id="direction" className="max-w-5xl mx-auto mt-24 sm:mt-28 md:mt-36">
      <FadeIn
        delay={0}
        y={30}
        className="flex flex-col items-center gap-4 pt-14 sm:pt-16"
        style={{ borderTop: '1px solid rgba(12, 12, 12, 0.15)' }}
      >
        <span className="text-[#0C0C0C]/45 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs">
          And when the work is not mine alone
        </span>

        <h3
          className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight"
          style={{ fontSize: 'clamp(2rem, 7vw, 5rem)' }}
        >
          <GlowText text={direction.heading} />
        </h3>

        <p
          className="text-[#0C0C0C]/60 font-light text-center leading-relaxed max-w-[620px] mt-3"
          style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.1rem)' }}
        >
          {direction.intro}
        </p>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mt-12 sm:mt-14">
        {direction.pillars.map((pillar, index) => {
          const Icon = ICONS[pillar.icon];
          return (
            <FadeIn
              key={pillar.name}
              delay={index * 0.1}
              y={30}
              className="flex flex-col gap-4 rounded-[24px] border border-[#0C0C0C]/15 p-6 sm:p-7 transition-colors duration-300 hover:border-[#0C0C0C]/35"
            >
              <span
                className="flex items-center justify-center w-11 h-11 rounded-full shrink-0"
                style={{
                  background:
                    'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                }}
              >
                <Icon className="w-4 h-4 text-white" strokeWidth={1.75} />
              </span>

              <h4
                className="text-[#0C0C0C] font-medium uppercase leading-tight tracking-wide"
                style={{ fontSize: 'clamp(0.95rem, 1.7vw, 1.25rem)' }}
              >
                {pillar.name}
              </h4>

              <p
                className="text-[#0C0C0C]/60 font-light leading-relaxed"
                style={{ fontSize: 'clamp(0.82rem, 1.4vw, 0.95rem)' }}
              >
                {pillar.description}
              </p>
            </FadeIn>
          );
        })}
      </div>

      <FadeIn delay={0.2} y={20} className="mt-12 sm:mt-14">
        <h4 className="text-[#0C0C0C]/45 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs text-center mb-6">
          How the work gets tracked
        </h4>

        <ul className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {direction.tools.map((tool) => (
            <li
              key={tool.name}
              className="flex items-baseline gap-2.5 rounded-full border border-[#0C0C0C]/15 px-5 py-2.5 transition-colors duration-300 hover:bg-[#0C0C0C]/5"
            >
              <span className="text-[#0C0C0C] font-medium text-xs sm:text-sm whitespace-nowrap">
                {tool.name}
              </span>
              <span className="text-[#0C0C0C]/40 font-light uppercase tracking-widest text-[0.6rem] whitespace-nowrap">
                {tool.role}
              </span>
            </li>
          ))}
        </ul>
      </FadeIn>
    </div>
  );
}
