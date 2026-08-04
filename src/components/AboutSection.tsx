import FadeIn from './ui/FadeIn';
import AnimatedText from './ui/AnimatedText';
import GlowText from './ui/GlowText';
import ContactButton from './ui/ContactButton';
import { about } from '../data/portfolio';

/** Decorative artwork anchored in the four corners. */
const corners = [
  {
    src: '/img/concept/xiu.jpg',
    alt: 'Xiu character concept',
    position: 'top-[4%] left-[1%] sm:left-[2%] md:left-[4%]',
    size: 'w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.1,
    x: -80,
  },
  {
    src: '/img/3d/cute-penguin.png',
    alt: 'Stylised penguin 3D render',
    position: 'bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]',
    size: 'w-[100px] sm:w-[140px] md:w-[180px]',
    delay: 0.25,
    x: -80,
  },
  {
    src: '/img/concept/overseer.png',
    alt: 'Overseer character concept',
    position: 'top-[4%] right-[1%] sm:right-[2%] md:right-[4%]',
    size: 'w-[120px] sm:w-[160px] md:w-[210px]',
    delay: 0.15,
    x: 80,
  },
  {
    src: '/img/3d/mazda-cx60.png',
    alt: 'Mazda CX-60 3D render',
    position: 'bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]',
    size: 'w-[130px] sm:w-[170px] md:w-[220px]',
    delay: 0.3,
    x: 80,
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col items-center justify-center px-5 sm:px-8 md:px-10 py-20"
      style={{ overflowX: 'clip' }}
    >
      {corners.map((corner) => (
        <FadeIn
          key={corner.src}
          delay={corner.delay}
          duration={0.9}
          x={corner.x}
          y={0}
          className={`absolute ${corner.position} ${corner.size} pointer-events-none`}
        >
          <img
            src={corner.src}
            alt={corner.alt}
            loading="lazy"
            className="w-full h-auto rounded-2xl opacity-90"
          />
        </FadeIn>
      ))}

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn
            as="h2"
            delay={0}
            y={40}
            className="font-black uppercase leading-none tracking-tight text-center"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            <GlowText text={about.heading} charClassName="hero-heading" />
          </FadeIn>

          <AnimatedText
            text={about.body}
            className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
          />
        </div>

        <FadeIn delay={0.1} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
