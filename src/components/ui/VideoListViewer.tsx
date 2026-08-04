import { useState } from 'react';
import { Play } from 'lucide-react';
import { showreel } from '../../data/portfolio';

type VideoListViewerProps = {
  ids: readonly string[];
};

export default function VideoListViewer({ ids }: VideoListViewerProps) {
  const videos = ids
    .map((id) => showreel.find((v) => v.id === id))
    .filter((v): v is (typeof showreel)[number] => Boolean(v));

  const [playing, setPlaying] = useState<string | null>(null);

  return (
    <div className="h-full overflow-y-auto pr-1">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {videos.map((video) => (
          <div
            key={video.id}
            className="group rounded-[18px] sm:rounded-[24px] overflow-hidden border border-[#D7E2EA]/20 bg-black"
          >
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
                    <span className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#D7E2EA] bg-black/40 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                      <Play
                        className="w-5 h-5 text-[#D7E2EA] translate-x-[2px]"
                        fill="currentColor"
                      />
                    </span>
                  </span>
                </button>
              )}
            </div>

            <h3 className="px-4 py-3 text-[#D7E2EA] font-medium uppercase tracking-wide text-xs sm:text-sm leading-tight">
              {video.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
}
