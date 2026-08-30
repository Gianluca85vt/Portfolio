import { useRef, useState } from 'react';
import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion';
import type { MotionValue } from 'framer-motion';
import FadeIn from './ui/FadeIn';
import GlowText from './ui/GlowText';
import Modal from './ui/Modal';
import GalleryViewer from './ui/GalleryViewer';
import VideoListViewer from './ui/VideoListViewer';
import { projects } from '../data/portfolio';
import type { Project } from '../data/portfolio';

function ctaLabel(project: Project) {
  return project.modal.kind === 'videos' ? 'Watch Videos' : 'View Gallery';
}

function externalLink(project: Project) {
  return project.href.includes('discord')
    ? { href: project.href, label: 'Join the Discord' }
    : { href: project.href, label: 'Watch on YouTube' };
}

function ProjectCard({
  project,
  index,
  total,
  progress,
  onOpen,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  onOpen: () => void;
}) {
  // Driven by the progress of the whole stack, not of this card alone: the card
  // holds full size while it is the front one, then recedes as the next ones
  // slide over it.
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const range: [number, number] = [index / total, 1];

  const scale = useTransform(progress, range, [1, targetScale]);
  const rotateX = useTransform(progress, range, [0, 7]);
  const dim = useTransform(progress, range, [1, 0.5]);
  const filter = useMotionTemplate`brightness(${dim})`;

  return (
    // Every wrapper is sticky against the same parent, so each one pins to the
    // top and stays pinned for the rest of the section while later siblings --
    // which paint above it -- scroll over the top of it.
    <div className="h-screen min-h-[640px] sticky top-0 flex items-center justify-center">
      <motion.div
        className="w-full origin-top rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C]"
        style={{
          scale,
          rotateX,
          filter,
          transformPerspective: 1500,
          top: `${index * 28}px`,
          position: 'relative',
        }}
      >
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${project.name} — ${ctaLabel(project)}`}
          className="group block w-full text-left p-4 sm:p-6 md:p-8 rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
            <div className="flex items-center gap-4 sm:gap-6 md:gap-8 min-w-0">
              <span
                className="hero-heading font-black leading-none shrink-0"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 110px)' }}
              >
                {project.number}
              </span>
              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-[#D7E2EA]/50 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs">
                  {project.category}
                </span>
                <h3
                  className="text-[#D7E2EA] font-medium uppercase leading-tight"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  <GlowText text={project.name} />
                </h3>
              </div>
            </div>

            <span className="inline-block rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest whitespace-nowrap px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-300 group-hover:bg-[#D7E2EA]/10">
              {ctaLabel(project)}
            </span>
          </div>

          <div className="flex gap-3 sm:gap-4">
            <div className="w-[40%] flex flex-col gap-3 sm:gap-4">
              <img
                src={project.images.colOneTop}
                alt={`${project.name} still`}
                loading="lazy"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                // vh cap keeps the whole card inside the viewport on short screens
                style={{ height: 'min(clamp(130px, 16vw, 230px), 20vh)' }}
              />
              <img
                src={project.images.colOneBottom}
                alt={`${project.name} still`}
                loading="lazy"
                className="w-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
                style={{ height: 'min(clamp(160px, 22vw, 340px), 30vh)' }}
              />
            </div>

            {/* Absolute so the tall image can't drive the row height -- the left
                column sets it, and this one stretches to match. */}
            <div className="w-[60%] relative">
              <img
                src={project.images.colTwo}
                alt={`${project.name} key visual`}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              />
            </div>
          </div>
        </button>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  const stackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ['start start', 'end end'],
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const active = openIndex === null ? null : projects[openIndex];

  return (
    <section
      id="work"
      className="relative z-10 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-12 sm:pt-14 md:pt-16 pb-8"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="font-black uppercase text-center leading-none tracking-tight mb-10 sm:mb-12 md:mb-14"
        style={{ fontSize: 'clamp(2.6rem, 8vw, 100px)' }}
      >
        <GlowText text="Project" charClassName="hero-heading" />
      </FadeIn>

      <div ref={stackRef} className="max-w-6xl mx-auto">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.number}
            project={project}
            index={index}
            total={projects.length}
            progress={scrollYProgress}
            onOpen={() => setOpenIndex(index)}
          />
        ))}
      </div>

      <Modal
        open={active !== null}
        onClose={() => setOpenIndex(null)}
        title={active?.name ?? ''}
        eyebrow={active?.category}
        link={active ? externalLink(active) : undefined}
      >
        {active?.modal.kind === 'gallery' ? (
          <GalleryViewer items={active.modal.items} />
        ) : null}
        {active?.modal.kind === 'videos' ? (
          <VideoListViewer ids={active.modal.ids} />
        ) : null}
      </Modal>
    </section>
  );
}
