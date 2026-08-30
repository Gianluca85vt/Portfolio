import { useState } from 'react';
import { Play, ChevronDown } from 'lucide-react';
import FadeIn from './ui/FadeIn';
import GlowText from './ui/GlowText';
import { showreel } from '../data/portfolio';

/**
 * The old site's "Animations" and "Unreal Engine" pages were both video-only.
 * Thumbnails are served locally and the iframe is only mounted once a tile is
 * clicked, so the page never loads a dozen YouTube players up front.
 *
 * Two rows on arrival. Fourteen tiles is four screens of scrolling before the
 * next section starts, and nobody watches fourteen — the rest are one click
 * away for anyone who wants them.
 */
const VISIBLE = 6;

export default function ShowreelSection() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const shown = expanded ? showreel : showreel.slice(0, VISIBLE);
  const hidden = showreel.length - VISIBLE;

  return (
    <section
      id="showreel"
      /* the AI section above already carries the rounded lift off the white
         Skills block, so this one just continues the dark run */
      className="relative z-10 bg-[#0C0C0C] px-5 sm:px-8 md:px-10 pt-12 sm:pt-14 md:pt-16 pb-8"
    >
      <FadeIn
        as="h2"
        delay={0}
        y={40}
        className="font-black uppercase text-center leading-none tracking-tight mb-10 sm:mb-12 md:mb-14"
        style={{ fontSize: 'clamp(2.6rem, 8vw, 100px)' }}
      >
        <GlowText text="Showreel" charClassName="hero-heading" />
      </FadeIn>

      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {shown.map((video, index) => (
          <FadeIn key={video.id} delay={(index % 3) * 0.1} y={30}>
            <div className="group rounded-[24px] sm:rounded-[28px] overflow-hidden border border-[#D7E2EA]/20 bg-black">
              <div className="relative aspect-video">
                {playing === video.id ? (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setPlaying(video.id)}
                    className="absolute inset-0 w-full h-full"
                    aria-label={`Play ${video.title}`}
                  >
                    <img
                      src={`/img/video/${video.id}.jpg`}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/10" />
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-[#D7E2EA] bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                        <Play
                          className="w-5 h-5 sm:w-6 sm:h-6 text-[#D7E2EA] translate-x-[2px]"
                          fill="currentColor"
                        />
                      </span>
                    </span>
                  </button>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 px-5 py-4">
                <h3 className="text-[#D7E2EA] font-medium uppercase tracking-wide text-sm sm:text-base leading-tight">
                  {video.title}
                </h3>
                <span className="shrink-0 text-[#D7E2EA]/50 font-light uppercase tracking-widest text-[0.65rem] sm:text-xs">
                  {video.tag}
                </span>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>

      {hidden > 0 && !expanded && (
        <div className="flex justify-center mt-10">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#D7E2EA]/50 text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3.5 text-xs sm:text-sm transition-colors duration-300 hover:bg-[#D7E2EA]/10"
          >
            Show all {showreel.length} videos
            <ChevronDown className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>
      )}
    </section>
  );
}
