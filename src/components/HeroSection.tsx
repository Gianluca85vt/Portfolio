import FadeIn from './ui/FadeIn';
import AvatarScrub from './ui/AvatarScrub';
import AvatarBubble from './ui/AvatarBubble';
import type { LatestPost } from './ui/AvatarBubble';
import GlowText from './ui/GlowText';
import ContactButton from './ui/ContactButton';
import { nav, site } from '../data/portfolio';

const LINK_CLASS =
  'shrink-0 text-[#D7E2EA] font-medium uppercase tracking-wider whitespace-nowrap text-[0.7rem] sm:text-sm md:text-base lg:text-[1.25rem] transition-opacity duration-200 hover:opacity-70';

export default function HeroSection({ latest = [] }: { latest?: LatestPost[] }) {
  return (
    <section
      className="relative h-screen flex flex-col"
      style={{ overflowX: 'clip' }}
    >
      <FadeIn
        as="nav"
        delay={0}
        y={-20}
        /* six items: scroll sideways rather than crush them on narrow phones */
        className="relative z-20 flex justify-between gap-x-3 sm:gap-x-2 px-6 md:px-10 pt-6 md:pt-8 overflow-x-auto no-scrollbar"
      >
        {nav.map((item) => (
          <a
            key={item.label}
            href={'to' in item ? item.to : item.href}
            className={LINK_CLASS}
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
        {/* Anchored directly to this wrapper, which is already `absolute` and so
            is the containing block. An intermediate div would have zero size and
            left-1/2 would resolve against nothing. The wrapper stays
            pointer-events-none; the bubble re-enables them on itself only. */}
        <AvatarBubble posts={latest} />
        <FadeIn delay={0.6} y={30}>
          {/* No Magnet here any more. It slid the whole portrait toward the
              cursor — measured at 7px one way and 27px the other — and the head
              now passes behind the headline, where drifting sideways makes the
              overlap wander. The cursor already moves the head: it turns it. */}
          <AvatarScrub
            alt="3D stylised portrait of Gianluca Scattarella"
            /* Sized off the viewport height, and anchored to the bottom of the
               hero, so growing it raises the crown of the head rather than
               pushing it down: at 900px tall the top moves from 282 to 200 and
               the head passes behind the headline, which ends at 243. The
               z-order already puts it there — this is what makes them meet. */
            className="h-[50vh] sm:h-[63vh] md:h-[74vh] lg:h-[81vh] w-auto max-w-none select-none"
          />
        </FadeIn>
      </div>
    </section>
  );
}
