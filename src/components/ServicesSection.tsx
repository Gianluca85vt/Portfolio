import FadeIn from './ui/FadeIn';
import GlowText from './ui/GlowText';
import DirectionBlock from './DirectionBlock';
import { services } from '../data/portfolio';

export default function ServicesSection() {
  return (
    <section
      id="skills"
      className="bg-white rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-14 sm:py-16 md:py-20"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="text-[#0C0C0C] font-black uppercase text-center leading-none tracking-tight mb-10 sm:mb-12 md:mb-16"
        style={{ fontSize: 'clamp(2.6rem, 8vw, 100px)' }}
      >
        <GlowText text="Skills" />
      </FadeIn>

      {/* Two rows of three rather than six full-width bands. The old layout
          gave each skill a 140px numeral and the height of a small screen, so
          reading all six meant six scrolls for six short paragraphs. Side by
          side they can also be compared, which is what a skills list is for. */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-10 md:gap-y-12">
        {services.map((service, index) => (
          <FadeIn
            key={service.number}
            delay={(index % 3) * 0.1}
            y={30}
            className="flex flex-col gap-3 pt-5"
            style={{ borderTop: '1px solid rgba(12, 12, 12, 0.15)' }}
          >
            <span
              className="text-[#0C0C0C] font-black leading-none"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', opacity: 0.22 }}
            >
              {service.number}
            </span>

            <h3
              className="text-[#0C0C0C] font-medium uppercase leading-tight"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.35rem)' }}
            >
              {service.name}
            </h3>
            <p
              className="text-[#0C0C0C] font-light leading-relaxed"
              style={{ fontSize: 'clamp(0.85rem, 1.05vw, 1rem)', opacity: 0.6 }}
            >
              {service.description}
            </p>
          </FadeIn>
        ))}
      </div>

      <DirectionBlock />
    </section>
  );
}
