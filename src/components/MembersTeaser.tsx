import { ArrowRight } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import GlowText from './ui/GlowText';
import { members } from '../data/portfolio';

/** Home-page block that points at the membership page. */
export default function MembersTeaser() {
  return (
    <section className="relative z-10 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-16 sm:pt-20 md:pt-24 pb-4">
      <div className="max-w-5xl mx-auto rounded-[32px] sm:rounded-[44px] border-2 border-[#D7E2EA]/35 p-8 sm:p-12 md:p-16 text-center">
        <FadeIn
          as="h2"
          delay={0}
          y={40}
          className="font-black uppercase leading-none tracking-tight"
          style={{ fontSize: 'clamp(2.5rem, 9vw, 110px)' }}
        >
          <GlowText text={members.heading} charClassName="hero-heading" />
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.1}
          y={20}
          className="text-[#D7E2EA] font-light uppercase tracking-wide mt-5 sm:mt-6"
          style={{ fontSize: 'clamp(0.78rem, 1.5vw, 1.05rem)' }}
        >
          {members.tagline}
        </FadeIn>

        <FadeIn
          as="p"
          delay={0.2}
          y={20}
          className="text-[#D7E2EA]/60 font-light leading-relaxed max-w-[540px] mx-auto mt-6 sm:mt-8"
          style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)' }}
        >
          YouTube gets the timelapses. Members get the same work at 1x, with the
          scene files, the HDRIs and the presets that made it.
        </FadeIn>

        <FadeIn delay={0.3} y={20} className="mt-9 sm:mt-11">
          <a
            href="/members"
            className="group inline-flex items-center gap-3 rounded-full text-white font-medium uppercase tracking-widest whitespace-nowrap px-8 py-3.5 sm:px-12 sm:py-4 text-xs sm:text-sm md:text-base transition-transform duration-300 hover:scale-[1.03]"
            style={{
              background:
                'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
              boxShadow:
                '0px 4px 4px rgba(181, 1, 167, 0.25), 4px 4px 12px #7721B1 inset',
              outline: '2px solid #FFFFFF',
              outlineOffset: '-3px',
            }}
          >
            {members.currency}
            {members.price} / {members.period}
            <ArrowRight
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
