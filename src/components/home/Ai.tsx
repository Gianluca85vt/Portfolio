import { Palette, Terminal, Wand2 } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ai } from '../../data/portfolio';
import { aiPipeline } from '../../data/home';
import { Reveal, SectionTitle, Slate, pad } from './ui';

const ROLE_ICONS: Record<string, LucideIcon> = { terminal: Terminal, wand: Wand2, palette: Palette };

/**
 * Where AI sits in the work, drawn as the pipeline it is: five steps, a pulse
 * running through them, and each step marked with who does it. The steps the
 * model touches are shaded in the gradient; the ones that stay with a person
 * are left plain. Readable without knowing any of the tools by name.
 */
function Pipeline() {
  return (
    <Reveal delay={120} className="mt-12 sm:mt-16">
      <ol className="relative grid md:grid-cols-5 gap-4 md:gap-0">
        {/* the wire the pulse runs along */}
        <span aria-hidden="true" className="hidden md:block absolute left-[10%] right-[10%] top-[34px] h-px bg-[#D7E2EA]/15 overflow-hidden">
          <span className="vp-flow" />
        </span>
        <span aria-hidden="true" className="md:hidden absolute top-4 bottom-4 left-[33px] w-px bg-[#D7E2EA]/15 overflow-hidden">
          <span className="vp-flow vp-flow--v" />
        </span>

        {aiPipeline.steps.map((step, i) => {
          const both = step.who === 'both';
          return (
            <li key={step.name} className="relative flex md:flex-col items-start md:items-center gap-4 md:gap-3 md:text-center md:px-3">
              <span
                className={`relative z-10 grid place-items-center shrink-0 w-[68px] h-[68px] rounded-full ${
                  both ? 'vp-grad-bg p-[1.5px]' : 'border border-[#D7E2EA]/35 bg-black'
                }`}
              >
                <span className="grid place-items-center w-full h-full rounded-full bg-black">
                  <span className="vp-label text-[#D7E2EA]">{pad(i + 1)}</span>
                </span>
              </span>
              <span className="flex flex-col md:items-center gap-1 pt-1 md:pt-0">
                <span className="text-[#D7E2EA] font-black uppercase tracking-tight text-[1.35rem] leading-none">{step.name}</span>
                <span
                  className={`vp-label !text-[0.58rem] rounded-full px-2 py-0.5 self-start md:self-center ${
                    both ? 'bg-[#B600A8]/20 text-[#f0a3e8]' : 'bg-[#D7E2EA]/10 text-[#D7E2EA]/70'
                  }`}
                >
                  {both ? 'AI + me' : 'Me'}
                </span>
                <span className="text-[#D7E2EA]/55 font-light text-[0.9rem] leading-snug mt-1 max-w-[220px]">{step.note}</span>
              </span>
            </li>
          );
        })}
      </ol>
      <p className="vp-label text-[#D7E2EA]/45 mt-8 md:text-center">{aiPipeline.caption}</p>
    </Reveal>
  );
}

export default function Ai() {
  return (
    <section
      id="ai"
      data-section="AI"
      data-index="07"
      className="relative px-5 sm:px-8 md:px-10 pt-24 sm:pt-32 pb-10 scroll-mt-16"
    >
      <Slate index="07" label="AI" aside={`${ai.roles.length} roles · ${ai.tools.length} tools`} />
      <div className="grid lg:grid-cols-12 gap-6 mt-8 sm:mt-10 items-end">
        <SectionTitle text="AI, directed" className="lg:col-span-12" />
        <Reveal as="p" delay={150} className="lg:col-start-7 lg:col-span-6 text-[#D7E2EA]/65 font-light leading-relaxed text-[1rem] max-w-[560px]">
          {ai.intro}
        </Reveal>
      </div>

      <Pipeline />

      <div className="grid md:grid-cols-3 gap-4 mt-16 sm:mt-20">
        {ai.roles.map((role, i) => {
          const Icon = ROLE_ICONS[role.icon] ?? Wand2;
          return (
            <Reveal
              key={role.name}
              delay={i * 110}
              className="group relative rounded-[4px] border border-[#D7E2EA]/[0.12] p-6 sm:p-7 flex flex-col gap-4 overflow-hidden transition-colors duration-500 hover:border-[#D7E2EA]/30"
            >
              <span
                aria-hidden="true"
                className="absolute -right-16 -top-16 w-48 h-48 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-40 vp-grad-bg"
              />
              <Icon className="relative w-7 h-7 text-[#ff8a3d]" strokeWidth={1.3} />
              <h3 className="relative text-[#D7E2EA] font-black uppercase tracking-tight text-[1.6rem] leading-none">{role.name}</h3>
              <p className="relative text-[#D7E2EA]/65 font-light leading-relaxed text-[0.95rem]">{role.description}</p>
            </Reveal>
          );
        })}
      </div>

      <Reveal delay={100} className="mt-10 flex flex-wrap gap-2">
        {ai.tools.map((tool) => (
          <span key={tool.name} className="inline-flex items-baseline gap-2 rounded-full border border-[#D7E2EA]/15 px-3.5 py-2">
            <span className="text-[#D7E2EA] font-medium text-[0.84rem]">{tool.name}</span>
            <span className="vp-label !text-[0.56rem] text-[#D7E2EA]/40">{tool.role}</span>
          </span>
        ))}
      </Reveal>
    </section>
  );
}
