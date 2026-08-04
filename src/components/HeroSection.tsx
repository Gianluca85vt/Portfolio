import FadeIn from './ui/FadeIn';
import Magnet from './ui/Magnet';
import AvatarEyes from './ui/AvatarEyes';
import GlowText from './ui/GlowText';
import ContactButton from './ui/ContactButton';
import { nav, site } from '../data/portfolio';

export default function HeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        className="relative z-20 flex justify-between px-6 md:px-10 pt-6 md:pt-8"
      >
        {nav.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] transition-opacity duration-200 hover:opacity-70"
          >
            {item.label}
          </a>
        ))}
      </FadeIn>

      <div className="relative z-20 overflow-hidden px-6 md:px-10">
        <FadeIn
          as="h1"
          delay={0.15}
          y={40}
          className="font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-center mt-6 sm:mt-4 md:-mt-5 text-[10.6vw] sm:text-[11vw] md:text-[11.3vw] lg:text-[11.6vw]"
        >
          <GlowText text={`Hi, i'm ${site.firstName}`} charClassName="hero-heading" />
        </FadeIn>
      </div>

      <div className="relative z-20 mt-auto flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10">
        <FadeIn
          as="p"
          delay={0.35}
          y={20}
          className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]"
          style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
        >
          {site.tagline}
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>

      {/* The positioning translates live on this plain div: Framer Motion writes
          an inline `transform` on the elements it animates, which would silently
          drop Tailwind's -translate-x-1/2 and leave the figure off-centre. */}
      <div className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-none">
        <FadeIn delay={0.6} y={30}>
          <Magnet
            padding={150}
            strength={3}
            activeTransition="transform 0.3s ease-out"
            inactiveTransition="transform 0.6s ease-in-out"
          >
            <AvatarEyes
              alt="3D stylised portrait of Gianluca Scattarella"
              /* sized off the viewport height so the portrait always clears the
                 headline above it and the caption bar below */
              className="h-[44vh] sm:h-[56vh] md:h-[66vh] lg:h-[72vh] w-auto max-w-none select-none"
            />
          </Magnet>
        </FadeIn>
      </div>
    </section>
  );
}
