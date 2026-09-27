/**
 * Copy and wiring for the home page, kept apart from portfolio.ts because it
 * only exists for this one composition. The facts it leans on — services,
 * galleries, the showreel, the bio — still come from portfolio.ts, so nothing
 * here can drift from what the rest of the site says.
 *
 * Two readers arrive at the home page: a studio looking for someone to hire,
 * and a client with a project. The visitor can say which one they are, and a
 * few lines change to talk to them directly. Nothing is hidden from either:
 * the work, the showreel and the contact details are the same for everybody.
 * `none` is the copy for anyone who has not chosen.
 */

export type Mode = 'studio' | 'client';
export type Voiced = { none: string; studio: string; client: string };

export const hero = {
  greeting: "Hi, I'm Gianluca",
  role: '3D Environment & Technical Artist',
  lede: {
    none: 'I make 3D worlds for games, film and architecture, from the first pencil line to the final frame.',
    studio:
      'Senior environment and technical artist. Unreal Engine 5, look-dev, lighting and the optimisation that keeps a scene shippable. Open to studio roles and to freelance.',
    client:
      "Characters, 3D models, animation and architectural renders for your game, brand or property. Tell me what you need and I'll tell you how I'd make it.",
  } satisfies Voiced,
  turnHint: { fine: 'Move your cursor. I follow it.', touch: 'Tap left or right. I turn.' },
};

export const chooser = {
  question: "Who's visiting?",
  options: [
    { mode: 'studio' as Mode, label: 'A studio', detail: 'hiring for a team' },
    { mode: 'client' as Mode, label: 'A client', detail: 'with a project' },
  ],
  chosen: {
    studio: 'Showing you the studio cut',
    client: 'Showing you the client cut',
  },
};

/** What each service links to on this page, and a line for each kind of visitor. */
export type DisciplineLink =
  | { kind: 'work'; filter: WorkFilter; label: string }
  | { kind: 'reel'; tag: ReelTag; label: string }
  | { kind: 'contact'; label: string };

export const disciplineExtras: Record<
  string,
  { studio: string; client: string; link: DisciplineLink; previews: string[] }
> = {
  'Concept Art': {
    client:
      'Characters and creatures for your game, book or brand, with line art you approve before any colour goes down.',
    studio: 'Silhouettes, turnarounds and colour keys that hand over cleanly to modelling.',
    link: { kind: 'work', filter: 'concept', label: 'See the concept art' },
    previews: ['/img/concept/xiu-colore.jpg', '/img/jian/jian-key-art.jpg', '/img/concept/opera-senza-titolo-5.jpg'],
  },
  '3D Modeling': {
    client: 'Products, vehicles, props and characters as clean 3D models, ready for stills, animation or a game engine.',
    studio: 'Hard-surface and organic assets built to budget, with sensible topology and textures to spec.',
    link: { kind: 'work', filter: '3d', label: 'See the 3D models' },
    previews: ['/img/3d/eva01.jpg', '/img/3d/fiat-500e.png', '/img/3d/brad.jpg'],
  },
  'Animation & Motion Design': {
    client: 'Product spots, logo animations and short animated explainers, like the ones I made for ApplaudArt and VIBAS.',
    studio: 'Character cycles and motion graphics, animated and rendered in Blender and After Effects.',
    link: { kind: 'reel', tag: 'Animation', label: 'Watch the animation' },
    previews: ['/img/video/dxiVLDJA2RU.jpg', '/img/video/WA-u31Hz1NY.jpg', '/img/video/B_9HouQPV4Y.jpg'],
  },
  'Unreal Engine': {
    client: 'Real-time scenes you can walk through rather than just look at, lit and tuned to run smoothly.',
    studio: 'Environment art and tech art in UE5: lighting, look-dev, optimisation and the tools around them.',
    link: { kind: 'reel', tag: 'Unreal Engine', label: 'Watch the environments' },
    previews: ['/img/video/U9QQZWzm9Ac.jpg', '/img/video/iPoxXBgmunE.jpg', '/img/video/CX4BinF3pSw.jpg'],
  },
  Architecture: {
    client: 'Interiors, exteriors and furnished plans for sales material, listings and presentations.',
    studio: 'Archviz in real time with UE5: residential and luxury interiors, exteriors and plans.',
    link: { kind: 'work', filter: 'arch', label: 'See the architecture' },
    previews: ['/img/arch/image25-2-2.jpg', '/img/arch/soggiorno-1.jpg', '/img/arch/image1-001.jpg'],
  },
  'Graphic Design': {
    client: 'Layouts, brand systems and interfaces in Figma. The page you are reading is one of them.',
    studio: 'Figma components, design tokens and dev-ready handoff.',
    link: { kind: 'contact', label: 'Ask me for samples' },
    previews: [],
  },
};

export type WorkFilter = 'selected' | 'concept' | '3d' | 'arch';
export type ReelTag = 'Unreal Engine' | 'Animation' | 'Motion Design';

export const work = {
  intro: {
    none: 'Concept art, 3D models and architecture. Pick a category, or look at the images the way an art director does.',
    studio: 'Concept art, 3D models and architecture. Every image opens full size, with the checks I run on my own work.',
    client: 'Concept art, 3D models and architecture. Open any image to see it full size.',
  } satisfies Voiced,
  filters: [
    { id: 'selected' as WorkFilter, label: 'Selected' },
    { id: 'concept' as WorkFilter, label: 'Concept art' },
    { id: '3d' as WorkFilter, label: '3D models' },
    { id: 'arch' as WorkFilter, label: 'Architecture' },
  ],
  grades: [
    { id: 'colour', label: 'Colour', note: 'The finished image.' },
    {
      id: 'values',
      label: 'Values',
      note: 'Black and white shows whether the light and shadow work. An image that reads here only gets better with colour.',
    },
    {
      id: 'notan',
      label: 'Two tones',
      note: 'Only dark and light are left. A strong composition still reads.',
    },
  ],
};

/** The checks in the full-size viewer. `lineart` only appears where the real line art exists. */
export const critTools = [
  { id: 'colour', label: 'Colour', note: 'The finished image.' },
  { id: 'values', label: 'Values', note: 'Black and white: does the light still tell you where to look?' },
  { id: 'notan', label: 'Two tones', note: 'Dark against light and nothing else. The shapes have to carry it.' },
  { id: 'squint', label: 'Squint', note: 'Blur it. Whatever you still notice is where the eye goes first.' },
  { id: 'thirds', label: 'Thirds', note: 'The grid painters and photographers use to place a subject.' },
  { id: 'lineart', label: 'Line art', note: 'My original line art, before any colour.' },
] as const;
export type CritTool = (typeof critTools)[number]['id'];

export const reel = {
  intro: 'Real-time environments built in Unreal Engine, character animation and motion design for clients. Pick a clip on the timeline.',
  tracks: [
    { tag: 'Unreal Engine' as ReelTag, label: 'Real-time', detail: 'Unreal Engine 5' },
    { tag: 'Animation' as ReelTag, label: 'Animation', detail: 'Blender' },
    { tag: 'Motion Design' as ReelTag, label: 'Motion design', detail: 'Client work' },
  ],
};

export const lab = {
  intro:
    'Three small experiments, each one a real part of the job cut down to something you can try in ten seconds.',
  tabs: [
    {
      id: 'lines',
      label: 'Lines to colour',
      title: 'First the lines, then the colour',
      body: {
        none: 'Every character here started as clean line art. It gets approved before any colour goes down, because moving a line takes minutes and repainting takes days.',
        studio:
          'Line, flats, then rendering. The line pass is where the design gets locked, so nobody downstream is guessing at a shape.',
        client:
          'You see and approve the line art first. Changes are cheap at that stage, and the colour goes onto a design you already like.',
      } satisfies Voiced,
      hint: 'Drag the handle',
    },
    {
      id: 'detail',
      label: 'Detail budget',
      title: 'Detail has a cost',
      body: {
        none: 'A 3D model is made of small flat faces. More faces, more detail, and more work for whatever has to draw it. Part of my job is finding the fewest faces that still look right.',
        studio:
          'Triangle budgets, LODs and silhouette first: density goes where the camera looks and nowhere else. The light pass is what sells the form.',
        client:
          'A model that looks great but stutters on a phone is a bad model. I build to where it will be seen: a far-off rock needs a handful of faces, a close-up needs thousands.',
      } satisfies Voiced,
      hint: 'Drag the rock to turn it',
    },
    {
      id: 'plan',
      label: 'Plan to room',
      title: 'From the plan to the room',
      body: {
        none: 'A floor plan tells you where things go. A render tells you what it feels like to stand there. I make both from the same 3D scene.',
        studio:
          'Top-down plans and eye-level shots come out of one scene, so layout and mood are checked against each other rather than drawn twice.',
        client:
          'You get furnished plans for the layout and eye-level renders for the feeling, from one model, so they always agree.',
      } satisfies Voiced,
      hint: 'Step inside',
    },
  ],
  /** Real line art and its finished colour, drawn on the same canvas. */
  lines: [
    { name: 'Xiu', line: '/img/concept/xiu-lineart.jpg', colour: '/img/concept/xiu-colore.jpg' },
    { name: 'Jian', line: '/img/concept/jian-posa-1.jpg', colour: '/img/concept/jian-posa-colore-2-1.jpg' },
    { name: 'Overseer', line: '/img/concept/overseerer-lineart-corpo.jpg', colour: '/img/concept/overseerer-color-corpo-def-1.png' },
    { name: 'Panda warrior', line: '/img/concept/panda-lineart.jpg', colour: '/img/concept/panda-colore.jpg' },
    { name: 'Untitled', line: '/img/concept/opera-senza-titolo-3.jpg', colour: '/img/concept/opera-senza-titolo-5.jpg' },
  ],
  /** Rooms that have both a furnished plan and an eye-level render. */
  rooms: [
    { name: 'Twin room', plan: '/img/arch/stanza-twin-pianta.png', room: '/img/arch/stanza-twin-1.png' },
    { name: 'Premium room', plan: '/img/arch/stanza-premium-pianta.png', room: '/img/arch/stanza-premium-def-1.jpg' },
    { name: 'Studio with kitchen', plan: '/img/arch/stanza-singola-cucina-pianta.png', room: '/img/arch/stanza-singola-cucina.png' },
    { name: 'Small room', plan: '/img/arch/stanza-piccola-pianta.png', room: '/img/arch/stanza-piccola.jpg' },
  ],
  /** How far away a rock this dense belongs. Distances, not platforms: they hold for any project. */
  detail: [
    { faces: 20, fits: 'Seen from far away' },
    { faces: 80, fits: 'In the background' },
    { faces: 320, fits: 'In the middle distance' },
    { faces: 1280, fits: 'Close to the camera' },
    { faces: 5120, fits: 'A full-screen close-up' },
  ],
};

export const aboutLead = {
  // Each chip is a small inline picture of the thing the sentence names.
  parts: [
    { text: "I'm Gianluca. I draw" },
    { chip: '/img/concept/xiu-colore.jpg', alt: 'Xiu, a character design' },
    { text: 'characters, model' },
    { chip: '/img/3d/eva01.jpg', alt: 'EVA-01 3D model' },
    { text: 'machines, build' },
    { chip: '/img/video/U9QQZWzm9Ac.jpg', alt: 'Castle Lake, an Unreal Engine environment' },
    { text: 'worlds in Unreal Engine and render' },
    { chip: '/img/arch/soggiorno-1.jpg', alt: 'A living room render' },
    { text: 'homes.' },
  ],
};

export const aiPipeline = {
  caption: 'Where a model helps, and where the decisions stay with me.',
  steps: [
    { name: 'Brief', who: 'me', note: 'What are we making, and for whom?' },
    { name: 'Explore', who: 'both', note: 'Dozens of directions, quickly.' },
    { name: 'Choose', who: 'me', note: 'Taste decides what survives.' },
    { name: 'Build', who: 'both', note: 'Code, images and video, generated and steered.' },
    { name: 'Finish', who: 'me', note: 'Checked, fixed and signed off by hand.' },
  ] as { name: string; who: 'me' | 'both'; note: string }[],
};

export const contactCopy = {
  project: {
    tab: 'I have a project',
    needs: 'What do you need?',
    when: 'When?',
    whenOptions: ['As soon as possible', 'In the next few months', 'Just exploring'],
    extra: 'Anything else? (optional)',
    placeholder: 'A line about the project, a link, a deadline…',
    preview: 'Your email, ready to send',
    send: 'Open it in my email app',
    copy: 'Copy the address',
    copied: 'Copied',
  },
  hiring: {
    tab: "I'm hiring",
    body: 'The short version: senior 3D environment and technical artist, Unreal Engine 5, concept to final frame, with art direction and team coordination behind it. Open to studio roles and to freelance.',
  },
};
