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
  url: 'https://www.gianlucascattarella.it',
} as const;

/**
 * Profile links shown in the footer.
 * `icon` maps to a component in ui/SocialLinks.tsx — lucide ships Linkedin,
 * Facebook and Instagram but has no TikTok or WhatsApp glyph, so those two are
 * drawn inline there.
 */
export const socials = [
  {
    icon: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/scattarelladesigner/',
  },
  {
    icon: 'facebook',
    label: 'Facebook',
    href: 'https://www.facebook.com/gatsu.the.dark.knight',
  },
  {
    icon: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/monk3y_85/',
  },
  {
    icon: 'tiktok',
    label: 'TikTok',
    href: 'https://www.tiktok.com/@gianlucascattarella85',
  },
  {
    // wa.me wants the number with country code and no spaces or plus sign
    icon: 'whatsapp',
    label: 'WhatsApp',
    href: 'https://wa.me/393884546992',
  },
] as const;

/** `to` means a router route; `href` means an anchor on the home page. */
export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'AI', href: '#ai' },
  { label: 'Work', href: '#work' },
  { label: 'Members', to: '/members' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', href: '#contact' },
] as const;

/**
 * Membership. Payments, member accounts and gated delivery all live on Ko-fi:
 * selling digital subscriptions directly would make Gianluca the seller of
 * record and pull in EU VAT/OSS obligations. Ko-fi absorbs that, and its fees
 * are the lowest of the platforms at this price point.
 */
export const members = {
  price: '4.90',
  currency: '€',
  period: 'month',
  kofi: 'https://ko-fi.com/gianlucascattarella',
  heading: 'Members',
  tagline: 'the full-length versions, and everything i use to make them',
  intro:
    "On YouTube i post timelapses — 3x, 4x, sometimes faster. They look good, but you can't learn from them. Here the same work runs at 1x: every decision, every mistake, every fix, in real time. And the files come with it.",
  perks: [
    {
      icon: 'play',
      title: 'Full videos at 1x',
      body: 'The same builds you see sped up on YouTube, uncut and in real time. Modelling, lookdev, lighting and the technical passes, narrated as they happen.',
    },
    {
      icon: 'folder',
      title: 'The resources i actually use',
      body: 'Scene files, HDRIs, textures, node groups and presets from the projects — the working versions, not a cleaned-up demo.',
    },
    {
      icon: 'library',
      title: 'The whole back catalogue',
      body: 'Everything published so far, available the moment you join. It keeps growing and nothing gets taken down.',
    },
    {
      icon: 'message',
      title: 'Ask me things',
      body: 'Questions on the work, on a technique, or on a problem you are stuck with. I read and answer them.',
    },
  ],
} as const;

export const blogCategories = [
  '3D',
  'AI',
  'Games',
  'Manga',
  'Film & TV',
  'Collecting',
] as const;

export type BlogCategory = (typeof blogCategories)[number];

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
  '/img/arch/lotto-465-gv24c0019-frontale-1.jpg',
  '/img/concept/jian-colore-2.jpg',
  '/img/3d/mazda-cx60.png',
  '/img/arch/soggiorno-1.jpg',
  '/img/concept/overseerer-color-corpo-def-1.png',
  '/img/3d/eva01.jpg',
  '/img/arch/1-3.jpg',
  '/img/concept/opera-senza-titolo-5.jpg',
  '/img/3d/fiat-500e.png',
  '/img/arch/image1-000-copia.jpg',
];

/** Marquee row 2 — 10 tiles, scrolls left. */
export const marqueeRowTwo = [
  '/img/concept/xiu-colore.jpg',
  '/img/3d/cute-penguin.png',
  '/img/arch/2-1rid_1.jpg',
  '/img/concept/opera-senza-titolo-7.jpg',
  '/img/3d/render-03.png',
  '/img/arch/nomentana-3-copertina-sotheby-s_1.jpg',
  '/img/concept/tracy-rendering2.jpg',
  '/img/3d/umbral-blade.jpg',
  '/img/arch/3-1-4k-res.jpg',
  '/img/concept/edward-price-def.jpg',
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

/**
 * Old "Concept" page — the full set, 55 pieces.
 * Titles come from Gianluca's own filenames, which name the characters; the
 * untitled ones stay untitled rather than getting an invented name.
 */
export const conceptGallery: GalleryItem[] = [
  { src: '/img/concept/jian-colore-2.jpg', title: 'Jian' },
  { src: '/img/jian/jian-key-art.jpg', title: 'Jian — key art' },
  { src: '/img/concept/jian3.jpg', title: 'Jian' },
  { src: '/img/concept/jian-posa-colore-2-1.jpg', title: 'Jian' },
  { src: '/img/concept/jian-da-sotto.jpg', title: 'Jian' },
  { src: '/img/jian/jian-hero.jpg', title: 'Jian — action pose' },
  { src: '/img/concept/jian-perplesso.jpeg', title: 'Jian' },
  { src: '/img/concept/jian-posa-1.jpg', title: 'Jian' },
  { src: '/img/concept/jian-tre-quarti.jpg', title: 'Jian' },
  { src: '/img/concept/xiu-colore.jpg', title: 'Xiu — colour' },
  { src: '/img/concept/xiu-lineart.jpg', title: 'Xiu — line art' },
  { src: '/img/concept/overseerer-color-corpo-def-1.png', title: 'Overseer' },
  { src: '/img/concept/overseerer-lineart-corpo.jpg', title: 'Overseer — line art' },
  { src: '/img/concept/edward-price-def.jpg', title: 'Edward Price' },
  { src: '/img/concept/edward-price-flat.jpg', title: 'Edward Price — flats' },
  { src: '/img/concept/edward-price-talk.png', title: 'Edward Price — expression' },
  { src: '/img/concept/edward-price-talk-def.jpg', title: 'Edward Price — expression' },
  { src: '/img/concept/bozza-edward-price.jpg', title: 'Edward Price — sketch' },
  { src: '/img/concept/tracy-rendering2.jpg', title: 'Tracy — render' },
  { src: '/img/concept/tracy-primo-rendering.jpg', title: 'Tracy — first render' },
  { src: '/img/concept/tracy-flat.jpg', title: 'Tracy — flats' },
  { src: '/img/concept/lineart-tracy.jpg', title: 'Tracy — line art' },
  { src: '/img/concept/tracy-n31-copia.jpg', title: 'Tracy' },
  { src: '/img/concept/the-falcon.jpg', title: 'The Falcon' },
  { src: '/img/concept/the-falcon1.png', title: 'The Falcon' },
  { src: '/img/concept/the-falcon-2.jpg', title: 'The Falcon' },
  { src: '/img/concept/the-falcon-2.png', title: 'The Falcon' },
  { src: '/img/concept/the-falcon-bullo.jpg', title: 'The Falcon' },
  { src: '/img/concept/falcon-espressioni.jpg', title: 'The Falcon — expressions' },
  { src: '/img/concept/padre-2.jpg', title: 'The Father' },
  { src: '/img/concept/padre-2.png', title: 'The Father' },
  { src: '/img/concept/padre-ritratto.jpg', title: 'The Father — portrait' },
  { src: '/img/concept/padre-ritratto-1.png', title: 'The Father — portrait' },
  { src: '/img/concept/padre-ritratto-lineart.jpg', title: 'The Father — line art' },
  { src: '/img/concept/padre-solid.jpg', title: 'The Father — solid' },
  { src: '/img/concept/padre-bozza-ritratto-1.jpg', title: 'The Father — sketch' },
  { src: '/img/concept/bozza-padre.jpg', title: 'The Father — sketch' },
  { src: '/img/concept/protagonista.jpg', title: 'Protagonist' },
  { src: '/img/concept/protagonista-espressioni.jpg', title: 'Protagonist — expressions' },
  { src: '/img/concept/protagonista-arrabbiato.jpg', title: 'Protagonist — angry' },
  { src: '/img/concept/protagonista-arrabbiato2.jpg', title: 'Protagonist — angry' },
  { src: '/img/concept/protagonista-stupito.jpg', title: 'Protagonist — surprised' },
  { src: '/img/concept/protagonista-stupito-2.jpg', title: 'Protagonist — surprised' },
  { src: '/img/concept/protagonista-ragazzo-bozza.jpg', title: 'Protagonist as a boy' },
  { src: '/img/concept/protagonista-ragazzo-bozza2.jpg', title: 'Protagonist as a boy' },
  { src: '/img/concept/protagonista-ragazzo-bozza3.jpg', title: 'Protagonist as a boy' },
  { src: '/img/concept/protagonista-ragazzo-bozza4.jpg', title: 'Protagonist as a boy' },
  { src: '/img/concept/protagonista-bambino-bozza.jpg', title: 'Protagonist as a child' },
  { src: '/img/concept/protagonista-bambino-bozza1.jpg', title: 'Protagonist as a child' },
  { src: '/img/concept/hacker-teste.jpg', title: 'Hacker — head studies' },
  { src: '/img/concept/opera-senza-titolo.jpg' },
  { src: '/img/concept/opera-senza-titolo-2.jpg' },
  { src: '/img/concept/opera-senza-titolo-3.jpg' },
  { src: '/img/concept/opera-senza-titolo-5.jpg' },
  { src: '/img/concept/opera-senza-titolo-7.jpg' },
];

/** Old "Architecture" page — the full set, 74 renders and plans. */
export const architectureGallery: GalleryItem[] = [
  { src: '/img/arch/lotto-465-gv24c0019-frontale-1.jpg', title: 'Villa — front elevation' },
  { src: '/img/arch/lotto-465-gv24c0019-laterale.jpg', title: 'Villa — side elevation' },
  { src: '/img/arch/nomentana-3-copertina-sotheby-s_1.jpg', title: 'Nomentana — cover render' },
  { src: '/img/arch/soggiorno-1.jpg', title: 'Living room' },
  { src: '/img/arch/camera-1-copia.jpg', title: 'Bedroom' },
  { src: '/img/arch/camera-2-copia.jpg', title: 'Bedroom' },
  { src: '/img/arch/tetto-def-copia.jpg', title: 'Roof terrace' },
  { src: '/img/arch/1.jpg' },
  { src: '/img/arch/1-2.jpg' },
  { src: '/img/arch/1-3.jpg' },
  { src: '/img/arch/2-1rid_1.jpg' },
  { src: '/img/arch/2-2_1.jpg' },
  { src: '/img/arch/2-3-rid_1.jpg' },
  { src: '/img/arch/3-1-4k-res.jpg' },
  { src: '/img/arch/3-2-4k-res.jpg' },
  { src: '/img/arch/3-4-4k-res.jpg' },
  { src: '/img/arch/nostra-1.jpg', title: 'Apartment' },
  { src: '/img/arch/nostra-2.jpg', title: 'Apartment' },
  { src: '/img/arch/nostra-2-2.jpg', title: 'Apartment' },
  { src: '/img/arch/nostra-2-copy-0.jpg', title: 'Apartment' },
  { src: '/img/arch/nostra-pianta.jpg', title: 'Apartment — plan' },
  { src: '/img/arch/nostra-2-pianta.jpg', title: 'Apartment — plan' },
  { src: '/img/arch/stanza-singola-cucina.png', title: 'Studio with kitchen' },
  { src: '/img/arch/stanza-singola-cucina-1.jpg', title: 'Studio with kitchen' },
  { src: '/img/arch/stanza-singola-cucina-pianta.png', title: 'Studio with kitchen — plan' },
  { src: '/img/arch/stanza-premium-def-1.jpg', title: 'Premium room' },
  { src: '/img/arch/stanza-premium-def-2.png', title: 'Premium room' },
  { src: '/img/arch/stanza-premium-pianta.png', title: 'Premium room — plan' },
  { src: '/img/arch/stanza-twin-1.png', title: 'Twin room' },
  { src: '/img/arch/stanza-twin-2.jpg', title: 'Twin room' },
  { src: '/img/arch/stanza-twin-pianta.png', title: 'Twin room — plan' },
  { src: '/img/arch/seconda-stanza-twin.jpg', title: 'Second twin room' },
  { src: '/img/arch/seconda-stanza-twin-2.png', title: 'Second twin room' },
  { src: '/img/arch/seconda-stanza-twin-pianta.png', title: 'Second twin room — plan' },
  { src: '/img/arch/twin-3-e-mezzo-1.png', title: 'Twin room' },
  { src: '/img/arch/twin-3-e-mezzo-2.jpg', title: 'Twin room' },
  { src: '/img/arch/twin-3-e-mezzo-pianta.png', title: 'Twin room — plan' },
  { src: '/img/arch/stanza-piccola.jpg', title: 'Small room' },
  { src: '/img/arch/stanza-piccola-2.jpg', title: 'Small room' },
  { src: '/img/arch/stanza-piccola-pianta.png', title: 'Small room — plan' },
  { src: '/img/arch/image1-000-copia.jpg' },
  { src: '/img/arch/image1-001.jpg' },
  { src: '/img/arch/image1-001-copia.jpg' },
  { src: '/img/arch/image1-002.jpg' },
  { src: '/img/arch/image1-003.jpg' },
  { src: '/img/arch/image1-004-copia.jpg' },
  { src: '/img/arch/image1-014.jpg' },
  { src: '/img/arch/image1-015.jpg' },
  { src: '/img/arch/image1-016.jpg' },
  { src: '/img/arch/image1-017.jpg' },
  { src: '/img/arch/image1-018.jpg' },
  { src: '/img/arch/image1-019.jpg' },
  { src: '/img/arch/image1-020.jpg' },
  { src: '/img/arch/image1-copia.jpg' },
  { src: '/img/arch/image25.jpg' },
  { src: '/img/arch/image25-000.jpg' },
  { src: '/img/arch/image25-001.jpg' },
  { src: '/img/arch/image25-2-2.jpg' },
  { src: '/img/arch/image3-000.jpg' },
  { src: '/img/arch/image3-000-1-1_1.jpg' },
  { src: '/img/arch/image3-001.jpg' },
  { src: '/img/arch/image3-001-1.jpg' },
  { src: '/img/arch/image3-001-1-1_1.jpg' },
  { src: '/img/arch/image3-002-1-1.jpg' },
  { src: '/img/arch/image3-002-2-1_1.jpg' },
  { src: '/img/arch/image3-003-1_1.jpg' },
  { src: '/img/arch/image3-006.jpg' },
  { src: '/img/arch/image3-009.jpg' },
  { src: '/img/arch/image3-1.jpg' },
  { src: '/img/arch/image3-1_1.jpg' },
  { src: '/img/arch/image3-copia.jpg' },
  { src: '/img/arch/image32.png' },
  { src: '/img/arch/image38.jpg' },
  { src: '/img/arch/image48.jpg' },
];

export const projects: Project[] = [
  {
    number: '01',
    name: 'Concept and 2D Art',
    category: 'Illustration',
    href: site.discord,
    images: {
      colOneTop: '/img/concept/xiu-colore.jpg',
      colOneBottom: '/img/concept/edward-price-def.jpg',
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
      colOneTop: '/img/arch/soggiorno-1.jpg',
      colOneBottom: '/img/arch/camera-1-copia.jpg',
      colTwo: '/img/arch/lotto-465-gv24c0019-frontale-1.jpg',
    },
    modal: { kind: 'gallery', items: architectureGallery },
  },
];

export const jian = {
  title: 'Jian: Claws of Destiny',
  body: 'A high-fidelity Action-RPG that blends fluid, fast-paced combat with a deep, atmospheric narrative, powered by Unreal Engine 5. The vertical slice demonstrating the core gameplay mechanics and visual style is complete, and a Kickstarter campaign is in preparation to fund full development.',
};
