/**
 * The services page, in English and Italian.
 *
 * Written for the searches Gianluca wants to be found on: "3D artist",
 * "environment artist", "graphic designer", "art director", and in Italian
 * "modellatore 3D" and "renderista", in Viterbo, in Rome and in general. The
 * rest of the site is English, so a search typed in Italian had nothing to
 * land on; /it/servizi/ is that page.
 *
 * Every claim here comes from the portfolio itself (services, direction,
 * contact in portfolio.ts and home.ts): no invented clients, prices or
 * turnaround promises.
 */

export type Lang = 'en' | 'it';

export const servicePaths: Record<Lang, string> = {
  en: '/services/',
  it: '/it/servizi/',
};

export type Service = {
  name: string;
  /** The search phrase a person would type for this, shown as the card's eyebrow. */
  role: string;
  body: string;
  forWhom: string;
  link: { href: string; label: string };
};

type Copy = {
  title: string;
  description: string;
  kicker: string;
  heading: string;
  lede: string;
  switchLabel: string;
  forLabel: string;
  services: Service[];
  where: { heading: string; body: string };
  process: { heading: string; steps: { title: string; body: string }[] };
  cta: { heading: string; body: string; email: string; portfolio: string };
};

export const servicesCopy: Record<Lang, Copy> = {
  en: {
    title: 'Services — 3D Artist, Environment Artist & Art Director in Viterbo and Rome',
    description:
      'Gianluca Scattarella: 3D artist, 3D modeler, environment artist, 3D renderer, graphic designer and art director, working in Viterbo, Rome and remotely.',
    kicker: '3D Artist · Environment Artist · Art Director',
    heading: 'Services',
    lede: "I'm Gianluca Scattarella, a 3D artist and environment artist working between Viterbo and Rome, and remotely for studios and clients anywhere. I take a project from the first sketch to the final frame: concept, 3D models, renders, real-time scenes, animation and the graphic design around them.",
    switchLabel: 'Italiano',
    forLabel: 'For',
    services: [
      {
        name: '3D Modeling',
        role: '3D modeler',
        body: 'Products, vehicles, props, characters and environments as clean 3D models, ready for stills, animation or a game engine. Hard-surface and organic, with sensible topology and textures to spec.',
        forWhom: 'brands, product companies and game studios',
        link: { href: '/#work', label: 'See the 3D models' },
      },
      {
        name: '3D Rendering & Architectural Visualization',
        role: '3D renderer',
        body: 'Interiors, exteriors and products rendered for sales material, listings and presentations, in real time with Unreal Engine 5, plus furnished plans that read at a glance.',
        forWhom: 'architects, developers, estate agents and product brands',
        link: { href: '/#work', label: 'See the architecture' },
      },
      {
        name: 'Environment Art & Unreal Engine',
        role: 'Environment artist',
        body: 'Real-time environments you can walk through, lit, look-developed and optimised to run smoothly, with the technical art that keeps a scene shippable.',
        forWhom: 'game and virtual production studios',
        link: { href: '/#showreel', label: 'Watch the environments' },
      },
      {
        name: 'Concept Art',
        role: 'Concept artist',
        body: 'Characters and creatures from first thumbnail to colour key: line art you approve before any colour goes down, and silhouettes and turnarounds that hand over cleanly to 3D.',
        forWhom: 'games, books and brands',
        link: { href: '/#work', label: 'See the concept art' },
      },
      {
        name: 'Animation & Motion Design',
        role: '3D animator',
        body: 'Product spots, logo animations, short explainers and character cycles, animated and rendered in Blender and After Effects, like the work I made for ApplaudArt and VIBAS.',
        forWhom: 'brands and agencies',
        link: { href: '/#showreel', label: 'Watch the animation' },
      },
      {
        name: 'Graphic Design',
        role: 'Graphic designer',
        body: 'Layouts, brand systems and interfaces in Figma, with components and design tokens for a clean handoff to development. This site is one of them.',
        forWhom: 'companies and startups',
        link: { href: '/#contact', label: 'Ask me for samples' },
      },
      {
        name: 'Art Direction',
        role: 'Art director',
        body: 'Setting the visual target and holding it across a team: references, style guides, colour and lighting keys, and reviews artists can act on. Briefs, milestones and a pipeline that moves work from concept to 3D to engine.',
        forWhom: 'studios and projects with several artists',
        link: { href: '/#about', label: 'How I direct' },
      },
    ],
    where: {
      heading: 'Where I work',
      body: 'A 3D artist, 3D modeler and renderer for projects in Viterbo and Rome, and remotely anywhere in Italy and abroad. I write and work in Italian and English.',
    },
    process: {
      heading: 'How a project runs',
      steps: [
        { title: 'You tell me what you need', body: 'A few lines are enough: what it is for, where it will be used and when you need it.' },
        { title: 'I tell you how I would make it', body: 'An approach, a timeline and a quote, before any work starts.' },
        { title: 'We review it as it takes shape', body: 'Checkpoints agreed up front, so changes happen while they are still cheap.' },
        { title: 'You get the files you need', body: 'Delivered in the formats your project actually uses.' },
      ],
    },
    cta: {
      heading: 'Tell me about your project',
      body: 'Freelance work, a seat in the right team, or a question about how something was made. I read everything that arrives, and I answer.',
      email: 'Write to me',
      portfolio: 'See the portfolio',
    },
  },

  it: {
    title: 'Servizi — 3D Artist, Modellatore 3D e Renderista a Viterbo e Roma',
    description:
      'Gianluca Scattarella: 3D artist, modellatore 3D, renderista, environment artist, graphic designer e art director a Viterbo, Roma e da remoto.',
    kicker: '3D Artist · Modellatore 3D · Renderista · Art Director',
    heading: 'Servizi',
    lede: "Sono Gianluca Scattarella, 3D artist ed environment artist. Lavoro tra Viterbo e Roma, e da remoto per studi e clienti ovunque. Seguo un progetto dal primo schizzo al fotogramma finale: concept, modelli 3D, render, scene in tempo reale, animazione e la grafica che ci gira intorno.",
    switchLabel: 'English',
    forLabel: 'Per',
    services: [
      {
        name: 'Modellazione 3D',
        role: 'Modellatore 3D',
        body: 'Prodotti, veicoli, oggetti, personaggi e ambienti come modelli 3D puliti, pronti per immagini, animazioni o un motore di gioco. Hard-surface e organico, con topologia ordinata e texture su specifica.',
        forWhom: 'aziende, brand e studi di videogiochi',
        link: { href: '/#work', label: 'Guarda i modelli 3D' },
      },
      {
        name: 'Rendering 3D e visualizzazione architettonica',
        role: 'Renderista',
        body: 'Render di interni, esterni e prodotti per materiale di vendita, annunci e presentazioni, realizzati in tempo reale con Unreal Engine 5, e planimetrie arredate che si leggono a colpo d’occhio.',
        forWhom: 'architetti, costruttori, agenzie immobiliari e aziende di prodotto',
        link: { href: '/#work', label: 'Guarda l’architettura' },
      },
      {
        name: 'Environment art e Unreal Engine',
        role: 'Environment artist',
        body: 'Ambienti in tempo reale da esplorare, con illuminazione, look-dev e ottimizzazione perché la scena giri fluida, e il lavoro di technical art che la rende pronta da consegnare.',
        forWhom: 'studi di videogiochi e di virtual production',
        link: { href: '/#showreel', label: 'Guarda gli ambienti' },
      },
      {
        name: 'Concept art',
        role: 'Concept artist',
        body: 'Personaggi e creature dalla prima bozza alla colour key: line art da approvare prima del colore, silhouette e turnaround che passano puliti alla modellazione 3D.',
        forWhom: 'videogiochi, libri e brand',
        link: { href: '/#work', label: 'Guarda il concept art' },
      },
      {
        name: 'Animazione e motion design',
        role: 'Animatore 3D',
        body: 'Spot di prodotto, animazioni di logo, brevi video esplicativi e cicli di animazione dei personaggi, animati e renderizzati in Blender e After Effects, come i lavori per ApplaudArt e VIBAS.',
        forWhom: 'brand e agenzie',
        link: { href: '/#showreel', label: 'Guarda le animazioni' },
      },
      {
        name: 'Graphic design',
        role: 'Graphic designer',
        body: 'Impaginazioni, identità visive e interfacce in Figma, con componenti e design token per un passaggio pulito allo sviluppo. Questo sito è uno di questi lavori.',
        forWhom: 'aziende e startup',
        link: { href: '/#contact', label: 'Chiedimi degli esempi' },
      },
      {
        name: 'Art direction',
        role: 'Art director',
        body: 'Fissare l’obiettivo visivo e tenerlo per tutto il team: reference, style guide, chiavi di colore e di luce, e revisioni su cui gli artisti possono lavorare. Brief, milestone e una pipeline che porta il lavoro dal concept al 3D al motore.',
        forWhom: 'studi e progetti con più artisti',
        link: { href: '/#about', label: 'Come dirigo' },
      },
    ],
    where: {
      heading: 'Dove lavoro',
      body: '3D artist, modellatore 3D e renderista per progetti a Viterbo e a Roma, e da remoto in tutta Italia e all’estero. Scrivo e lavoro in italiano e in inglese.',
    },
    process: {
      heading: 'Come funziona un progetto',
      steps: [
        { title: 'Mi dici cosa ti serve', body: 'Bastano poche righe: a cosa serve, dove verrà usato e per quando.' },
        { title: 'Ti dico come lo farei', body: 'Un approccio, i tempi e un preventivo, prima di iniziare.' },
        { title: 'Rivediamo il lavoro mentre prende forma', body: 'Revisioni concordate all’inizio, così le modifiche arrivano quando costano ancora poco.' },
        { title: 'Ricevi i file che ti servono', body: 'Consegnati nei formati che il tuo progetto usa davvero.' },
      ],
    },
    cta: {
      heading: 'Raccontami il tuo progetto',
      body: 'Un lavoro da freelance, un posto nel team giusto, o una domanda su come è fatto qualcosa. Leggo tutto quello che arriva, e rispondo.',
      email: 'Scrivimi',
      portfolio: 'Guarda il portfolio',
    },
  },
};
