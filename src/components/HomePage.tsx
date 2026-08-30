import HeroSection from './HeroSection';
import MarqueeSection from './MarqueeSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import AiSection from './AiSection';
import ShowreelSection from './ShowreelSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';
import BackToTop from './ui/BackToTop';
import type { LatestPost } from './ui/AvatarBubble';

export default function HomePage({ latest = [] }: { latest?: LatestPost[] }) {
  return (
    <>
      <HeroSection latest={latest} />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <AiSection />
      <ShowreelSection />
      <ProjectsSection />
      <ContactSection />
      <BackToTop />
    </>
  );
}
