import { Check, FolderDown, Library, MessageCircle, Play } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import GlowText from './ui/GlowText';
import { members } from '../data/portfolio';

const ICONS: Record<string, LucideIcon> = {
  play: Play,
  folder: FolderDown,
  library: Library,
  message: MessageCircle,
};

const GRADIENT =
  'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)';

function JoinButton({ className = '' }: { className?: string }) {
  return (
    <a
      href={members.kofi}
      target="_blank"
      rel="noreferrer"
      className={`inline-block rounded-full text-white font-medium uppercase tracking-widest whitespace-nowrap px-8 py-3.5 sm:px-12 sm:py-4 text-xs sm:text-sm md:text-base transition-transform duration-300 hover:scale-[1.03] ${className}`}
      style={{
        background: GRADIENT,
        boxShadow:
          '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
        outline: '2px solid #FFFFFF',
        outlineOffset: '-3px',
      }}
    >
      Join for {members.currency}
      {members.price}
    </a>
  );
}

export default function MembersPage() {
  return (
    <>
      <section className="px-5 sm:px-8 md:px-10 pt-14 sm:pt-20 md:pt-24 pb-16">
        <FadeIn
          as="h1"
          delay={0}
          y={40}
          className="font-black uppercase text-center leading-none tracking-tight"
          style={{ fontSize: 'clamp(3rem, 13vw, 170px)' }}
        >
          <GlowText text={members.heading} charClassName="hero-heading" />
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.1}
          y={20}
          className="text-[#D7E2EA] font-light uppercase tracking-wide text-center mt-6 sm:mt-8"
          style={{ fontSize: 'clamp(0.8rem, 1.6vw, 1.1rem)' }}
        >
          {members.tagline}
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.2}
          y={20}
          className="text-[#D7E2EA]/70 font-light text-center leading-relaxed max-w-[620px] mx-auto mt-8 sm:mt-10"
          style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
        >
          {members.intro}
        </FadeIn>

        {/* price + CTA */}
        <FadeIn delay={0.3} y={30} className="flex justify-center mt-12 sm:mt-16">
          <div className="w-full max-w-md rounded-[32px] border-2 border-[#D7E2EA]/40 bg-[#000000] p-8 sm:p-10 text-center">
            <span className="block text-[#D7E2EA]/50 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs">
              One membership, everything included
            </span>

            <div className="flex items-baseline justify-center gap-1 mt-5">
              <span
                className="hero-heading font-black leading-none"
                style={{ fontSize: 'clamp(3.5rem, 11vw, 5.5rem)' }}
              >
                {members.currency}
                {members.price}
              </span>
              <span className="text-[#D7E2EA]/50 font-light text-sm sm:text-base">
                /{members.period}
              </span>
            </div>

            <p className="text-[#D7E2EA]/50 font-light text-xs sm:text-sm mt-4 leading-relaxed">
              No tiers, no upsells. Cancel whenever you like — it takes one click
              and you keep access until the period runs out.
            </p>

            <JoinButton className="mt-8" />

            <p className="text-[#D7E2EA]/35 font-light text-[0.65rem] sm:text-xs mt-5">
              Billing and access are handled by Ko-fi.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* what you get */}
      <section className="px-5 sm:px-8 md:px-10 pb-16 sm:pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {members.perks.map((perk, index) => {
            const Icon = ICONS[perk.icon];
            return (
              <FadeIn
                key={perk.title}
                delay={index * 0.08}
                y={30}
                className="flex flex-col gap-4 rounded-[24px] sm:rounded-[28px] border border-[#D7E2EA]/20 p-6 sm:p-8 transition-colors duration-300 hover:border-[#D7E2EA]/40"
              >
                <span
                  className="flex items-center justify-center w-12 h-12 rounded-full shrink-0"
                  style={{ background: GRADIENT }}
                >
                  <Icon className="w-5 h-5 text-white" strokeWidth={1.75} />
                </span>

                <h2
                  className="text-[#D7E2EA] font-medium uppercase leading-tight tracking-wide"
                  style={{ fontSize: 'clamp(1rem, 1.9vw, 1.4rem)' }}
                >
                  <GlowText text={perk.title} />
                </h2>

                <p
                  className="text-[#D7E2EA]/60 font-light leading-relaxed"
                  style={{ fontSize: 'clamp(0.85rem, 1.5vw, 1rem)' }}
                >
                  {perk.body}
                </p>
              </FadeIn>
            );
          })}
        </div>
      </section>

      {/* youtube vs here */}
      <section className="px-5 sm:px-8 md:px-10 pb-20 sm:pb-24">
        <FadeIn delay={0} y={30} className="max-w-5xl mx-auto">
          <h2 className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs text-center mb-8 sm:mb-10">
            What changes
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="rounded-[24px] border border-[#D7E2EA]/15 p-6 sm:p-8">
              <span className="text-[#D7E2EA]/40 font-light uppercase tracking-widest text-[0.65rem]">
                On YouTube — free
              </span>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  'Timelapses at 3x, 4x and faster',
                  'The finished result, not the reasoning',
                  'No project files',
                ].map((line) => (
                  <li
                    key={line}
                    className="text-[#D7E2EA]/45 font-light text-sm leading-relaxed"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="rounded-[24px] border-2 p-6 sm:p-8"
              style={{ borderColor: 'rgba(182,0,168,0.55)' }}
            >
              <span className="text-[#D7E2EA] font-light uppercase tracking-widest text-[0.65rem]">
                Here — {members.currency}
                {members.price}/{members.period}
              </span>
              <ul className="mt-5 flex flex-col gap-3">
                {[
                  'The same work, uncut at 1x',
                  'Every decision explained as it happens',
                  'Scene files, HDRIs, textures and presets',
                  'The full back catalogue from day one',
                ].map((line) => (
                  <li key={line} className="flex items-start gap-3">
                    <Check
                      className="w-4 h-4 mt-0.5 shrink-0 text-[#D7E2EA]"
                      strokeWidth={2.5}
                    />
                    <span className="text-[#D7E2EA] font-light text-sm leading-relaxed">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex justify-center mt-12 sm:mt-14">
            <JoinButton />
          </div>
        </FadeIn>
      </section>
    </>
  );
}
