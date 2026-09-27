import { useEffect } from 'react';
import { services, showreel } from '../data/portfolio';
import Header from './home/Header';
import Hero from './home/Hero';
import type { LatestPost } from './home/Hero';
import Disciplines from './home/Disciplines';
import Work from './home/Work';
import type { ArchiveItem } from './home/Lightbox';
import Showreel from './home/Showreel';
import Lab from './home/Lab';
import About, { Direction } from './home/About';
import Ai from './home/Ai';
import Blog from './home/Blog';
import type { HomePost } from './home/Blog';
import Contact from './home/Contact';
import { CursorLabel, StatusBar, ViewportCorners } from './home/Chrome';
import { ModeProvider, ThumbProvider } from './home/ui';

export type { LatestPost, HomePost, ArchiveItem };

/**
 * The home page, as one island: a viewport onto the work. See
 * src/styles/home.css for the visual language and src/data/home.ts for the
 * copy. Every count shown is computed from the content itself, never typed in.
 */
export default function HomePage({
  latest = [],
  posts = [],
  items = [],
  thumbs = false,
  totalPosts = 0,
}: {
  latest?: LatestPost[];
  posts?: HomePost[];
  items?: ArchiveItem[];
  thumbs?: boolean;
  totalPosts?: number;
}) {
  // Arms the reveals. Until this runs nothing is hidden, so the static HTML
  // reads in full without JavaScript and nothing flashes out before hydration.
  useEffect(() => {
    document.documentElement.classList.add('vp-ready');
    return () => document.documentElement.classList.remove('vp-ready');
  }, []);

  const count = (kind: ArchiveItem['kind']) => items.filter((i) => i.kind === kind).length;
  const clips = (tag: string) => showreel.filter((v) => v.tag === tag).length;

  const concept = count('concept');
  const models = count('3d');
  const arch = count('arch');

  const counts: Record<string, string> = {
    'Concept Art': `${concept} pieces`,
    '3D Modeling': `${models} models`,
    'Animation & Motion Design': `${clips('Animation') + clips('Motion Design')} videos`,
    'Unreal Engine': `${clips('Unreal Engine')} environments`,
    Architecture: `${arch} images`,
  };

  const facts = [
    { label: 'Concept pieces', value: concept },
    { label: '3D models', value: models },
    { label: 'Architecture images', value: arch },
    { label: 'Videos in the reel', value: showreel.length },
    { label: 'Articles on Backdrop', value: totalPosts },
    { label: 'Disciplines', value: services.length },
  ].filter((f) => f.value > 0);

  return (
    <ThumbProvider value={thumbs}>
      <ModeProvider>
        <div className="vp">
          <Header />
          <Hero latest={latest} />
          <Disciplines counts={counts} />
          <Work items={items} />
          <Showreel />
          <Lab />
          <About facts={facts} />
          <Direction />
          <Ai />
          <Blog posts={posts} total={totalPosts} />
          <Contact />
          <StatusBar />
          <ViewportCorners />
          <CursorLabel />
          <div aria-hidden="true" className="vp-grain hidden md:block" />
        </div>
      </ModeProvider>
    </ThumbProvider>
  );
}
