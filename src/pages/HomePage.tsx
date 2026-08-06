import HeroSection from '../components/HeroSection';
import MarqueeSection from '../components/MarqueeSection';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import AiSection from '../components/AiSection';
import ShowreelSection from '../components/ShowreelSection';
import ProjectsSection from '../components/ProjectsSection';
import MembersTeaser from '../components/MembersTeaser';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <AiSection />
      <ShowreelSection />
      <ProjectsSection />
      <MembersTeaser />
      <ContactSection />
    </>
  );
}
