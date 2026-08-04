/**
 * Single source of truth for every piece of content on the page.
 * Images live in /public/img and were carried over from the previous
 * gianlucascattarella.weebly.com site.
 */

export const site = {
  name: 'Gianluca Scattarella',
  firstName: 'gianluca',
  role: '3D Environment & Technical Artist',
  email: 'gianlucascattarella@gmail.com',
  tagline:
    'senior 3d environment & technical artist crafting high-impact digital worlds',
  // Served from the site root so the URL, the download and the label all read "Resume".
  cv: '/Resume.pdf',
  cvFileName: 'Resume.pdf',
  discord: 'https://discord.gg/st6uM6KWap',
} as const;

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'AI', href: '#ai' },
  { label: 'Showreel', href: '#showreel' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
] as const;

export const about = {
  heading: 'About me',
  body: "I'm a Senior 3D Environment and Technical Artist with an absolute dedication to creating high-impact digital worlds. Trained in illustration at the International School of Comics, i pair that artistic foundation with the technical craft of environment design, workflow optimisation and photorealistic rendering. Computer graphics isn't just about software — it's the ultimate medium for storytelling and for pushing the boundaries of reality. Let's build something incredible together!",
};

/** Maps 1:1 to the old site's sections: Concept, 3D, Animations, Unreal Engine, Architecture. */
export const services = [
  {
    number: '01',
    name: 'Concept Art',
    description:
      'Character and creature design from first thumbnail to finished colour key — line art, silhouettes and turnarounds built to survive the jump into production.',
  },
  {
    number: '02',
    name: '3D Modeling',
    description:
      'Detailed hard-surface and organic assets, props, vehicles and environments, modelled and textured to spec for games, product visuals and film.',
  },
  {
    number: '03',
    name: 'Animation',
    description:
      'Character animation, cycles and motion graphics — animated and rendered in Blender, from mecha walk cycles to short-form product spots.',
  },
  {
    number: '04',
    name: 'Unreal Engine',
    description:
      'Real-time environment art and technical art in Unreal Engine 5: lighting, look-dev, optimisation and the tools that keep a scene shippable.',
  },
  {
    number: '05',
    name: 'Architecture',
    description:
      'Architectural visualization for residential and luxury projects — interiors and exteriors rendered in real time with UE5.',
  },
] as const;

export const ai = {
  heading: 'AI',
  intro:
    "AI isn't a shortcut bolted onto the pipeline — it's part of the craft. I direct models the way i'd direct a render: with intent, taste, and a clear picture of the result before the first prompt. From the opening concept to the final frame, it stays in the loop and i stay in charge of the decisions.",
  roles: [
    {
      icon: 'terminal',
      name: 'Vibe Coder',
      description:
        'I build software by describing it. Agentic tools turn intent into working code while i steer the architecture, read every diff, and keep the taste calls mine.',
    },
    {
      icon: 'wand',
      name: 'AI Designer',
      description:
        'Interfaces, layouts and brand systems shaped through fast iteration — a dozen directions explored in the time a single mockup used to take, then narrowed by eye.',
    },
    {
      icon: 'palette',
      name: 'AI Artist',
      description:
        'Concepts, key art and moodboards generated, curated and retouched. The model proposes, i direct and finish. The result has to survive next to hand-made work.',
    },
  ],
  tools: [
    { name: 'Claude Code', role: 'Agentic coding' },
    { name: 'Google Antigravity', role: 'Agent-first IDE' },
    { name: 'OpenAI Codex', role: 'Code generation' },
    { name: 'LM Studio', role: 'Local models' },
    { name: 'Higgsfield', role: 'AI video' },
    { name: 'Midjourney', role: 'Image generation' },
  ],
} as const;

/** Marquee row 1 — 11 tiles, scrolls right. */
export const marqueeRowOne = [
  '/img/3d/render-01.png',
  '/img/arch/luxury-villa-como.png',
  '/img/concept/jian-03.jpg',
  '/img/3d/mazda-cx60.png',
  '/img/arch/living-room.png',
  '/img/concept/overseer.png',
  '/img/3d/eva01.jpg',
  '/img/arch/villa-01.png',
  '/img/concept/general-jifeng.jpg',
  '/img/3d/fiat-500e.png',
  '/img/arch/kitchen-living.png',
];

/** Marquee row 2 — 10 tiles, scrolls left. */
export const marqueeRowTwo = [
  '/img/concept/xiu.jpg',
  '/img/3d/cute-penguin.png',
  '/img/arch/villa-02.jpg',
  '/img/concept/master-bo-lin.jpg',
  '/img/3d/render-03.png',
  '/img/arch/student-house-01.png',
  '/img/concept/tracy.jpg',
  '/img/3d/umbral-blade.jpg',
  '/img/arch/villa-03.jpg',
  '/img/concept/edward.jpg',
];

/**
 * Old "Animations" + "Unreal Engine" pages — both were video-only.
 * Titles taken from the YouTube oEmbed data, not guessed from the thumbnails.
 */
export const showreel = [
  { id: 'dxiVLDJA2RU', title: 'EVA-01 — Blender Animation Trailer', tag: 'Animation' },
  { id: 'U9QQZWzm9Ac', title: 'Castle Lake Environment', tag: 'Unreal Engine' },
  { id: 'iPoxXBgmunE', title: 'Ocean Cliff Environment', tag: 'Unreal Engine' },
  { id: 'B_9HouQPV4Y', title: 'EVA-01 — Walking Cycle', tag: 'Animation' },
  { id: 'CX4BinF3pSw', title: 'Alleyway', tag: 'Unreal Engine' },
  { id: 'I79KargrzlE', title: 'Old Village Environment', tag: 'Unreal Engine' },
  { id: 'A9t5FJlRI38', title: 'EVA-01 — Run Cycle', tag: 'Animation' },
  { id: 'TlUYfIVFeeo', title: 'The Container City Environment', tag: 'Unreal Engine' },
  { id: '3p3rGYd2THU', title: 'Environment — UE 5.2', tag: 'Unreal Engine' },
  { id: 'PpM0d6EvGPU', title: 'VIBAS iVoice Chef — Kitchen Scale', tag: 'Animation' },
  { id: '8b-4h2lNpcM', title: 'VIBAS iVoice Body — Weighing Scale', tag: 'Animation' },
  { id: 'g-VhAQCOR3g', title: "What's This?", tag: 'Animation' },
] as const;

export type GalleryItem = { src: string; title?: string };

/**
 * What a project card opens in the overlay.
 * Titles are only filled in where they are actually known — the rest show a
 * counter rather than an invented name. Add titles here as you like.
 */
export type ProjectModal =
  | { kind: 'gallery'; items: GalleryItem[] }
  | { kind: 'videos'; ids: string[] };

export type Project = {
  number: string;
  name: string;
  category: string;
  href: string;
  images: { colOneTop: string; colOneBottom: string; colTwo: string };
  modal: ProjectModal;
};

/** Old "Concept" page. */
export const conceptGallery: GalleryItem[] = [
  { src: '/img/jian/jian-key-art.jpg', title: 'Jian — Key Art' },
  { src: '/img/concept/jian-low-angle.jpg', title: 'Jian — Line Art' },
  { src: '/img/concept/jian-03.jpg', title: 'Jian — Colour' },
  { src: '/img/jian/jian-hero.jpg', title: 'Jian — Action Pose' },
  { src: '/img/concept/xiu.jpg' },
  { src: '/img/concept/overseer.png' },
  { src: '/img/concept/general-jifeng.jpg' },
  { src: '/img/concept/master-bo-lin.jpg' },
  { src: '/img/concept/boy-concept.jpg' },
  { src: '/img/concept/edward.jpg' },
  { src: '/img/concept/tracy.jpg' },
];

/** Old "Architecture" page. */
export const architectureGallery: GalleryItem[] = [
  { src: '/img/arch/luxury-villa-como.png', title: 'Luxury Villa — Como Lake' },
  { src: '/img/arch/living-room.png', title: 'Living Room' },
  { src: '/img/arch/kitchen-living.png', title: 'Kitchen / Living' },
  { src: '/img/arch/student-house-01.png', title: 'Student House' },
  { src: '/img/arch/student-house-02.png', title: 'Student House' },
  { src: '/img/arch/villa-01.png', title: 'Villa 1' },
  { src: '/img/arch/villa-02.jpg', title: 'Villa 2' },
  { src: '/img/arch/villa-03.jpg', title: 'Villa 3' },
];

export const projects: Project[] = [
  {
    number: '01',
    name: 'Jian: Claws of Destiny',
    category: 'Original IP',
    href: site.discord,
    images: {
      colOneTop: '/img/concept/jian-low-angle.jpg',
      colOneBottom: '/img/concept/jian-03.jpg',
      colTwo: '/img/jian/jian-hero.jpg',
    },
    modal: { kind: 'gallery', items: conceptGallery },
  },
  {
    number: '02',
    name: 'Real-Time Environments',
    category: 'Unreal Engine 5',
    href: 'https://www.youtube.com/watch?v=U9QQZWzm9Ac',
    // Frames from the Unreal Engine videos -- Alleyway, Ocean Cliff, Castle Lake.
    images: {
      colOneTop: '/img/video/CX4BinF3pSw.jpg',
      colOneBottom: '/img/video/iPoxXBgmunE.jpg',
      colTwo: '/img/video/U9QQZWzm9Ac.jpg',
    },
    modal: {
      kind: 'videos',
      ids: showreel.filter((v) => v.tag === 'Unreal Engine').map((v) => v.id),
    },
  },
  {
    number: '03',
    name: 'Architectural Visualization',
    category: 'Client Work',
    href: 'https://www.youtube.com/watch?v=EGMtN1-zBcc',
    images: {
      colOneTop: '/img/arch/kitchen-living.png',
      colOneBottom: '/img/arch/student-house-02.png',
      colTwo: '/img/arch/luxury-villa-como.png',
    },
    modal: { kind: 'gallery', items: architectureGallery },
  },
];

export const jian = {
  title: 'Jian: Claws of Destiny',
  body: 'A high-fidelity Action-RPG that blends fluid, fast-paced combat with a deep, atmospheric narrative, powered by Unreal Engine 5. The vertical slice demonstrating the core gameplay mechanics and visual style is complete, and a Kickstarter campaign is in preparation to fund full development.',
};
