import HeroSection from './HeroSection';
import MarqueeSection from './MarqueeSection';
import AboutSection from './AboutSection';
import ServicesSection from './ServicesSection';
import AiSection from './AiSection';
import ShowreelSection from './ShowreelSection';
import ProjectsSection from './ProjectsSection';
import BlogSection from './BlogSection';
import ContactSection from './ContactSection';
import BackToTop from './ui/BackToTop';
import type { LatestPost } from './ui/AvatarBubble';
import type { HomePost } from './BlogSection';

export default function HomePage({
  latest = [],
  posts = [],
}: {
  latest?: LatestPost[];
  posts?: HomePost[];
}) {
  return (
    <>
      <HeroSection latest={latest} />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <AiSection />
      <ShowreelSection />
      <ProjectsSection />
      <BlogSection posts={posts} />
      <ContactSection />
      <BackToTop />
    </>
  );
}
