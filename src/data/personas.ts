/**
 * The bylines the blog publishes under.
 *
 * These are invented editorial personas, not real people, and the site says so
 * next to every byline and on the authors page. That pairing is the point: a
 * pen name over an AI-assisted piece is an editorial device, but only if the
 * reader is told. Hide the disclosure and the same byline becomes a lie about
 * who wrote the thing.
 *
 * Two per section, split along a real axis rather than cosmetically, so that
 * assigning a piece to one of them actually changes how it reads.
 */

export type Persona = {
  id: string;
  name: string;
  /** Shown under the name. What this persona covers. */
  role: string;
  /** One line, for the authors page. */
  bio: string;
  /** Directions for whoever writes as them. Concrete, not adjectives. */
  voice: string;
  /** Sections this persona writes for. */
  sections: string[];
  /** Two letters for the byline chip. */
  initials: string;
  /** Accent, from the site's range. */
  color: string;
};

export const personas: Persona[] = [
  {
    id: 'ruben-castellani',
    name: 'Ruben Castellani',
    role: 'Games — production and craft',
    bio: 'Reads releases as production problems: what a decision cost, who paid for it, and what it says about how the thing was built.',
    voice:
      'Opens on the concrete fact, never on a scene-setting sentence. Explains the production constraint behind the news. Uses numbers where they exist and says so when they do not. Longer paragraphs, few adjectives, one clear argument per piece.',
    sections: ['Games'],
    initials: 'RC',
    color: '#D6294E',
  },
  {
    id: 'nadia-ferro',
    name: 'Nadia Ferro',
    role: 'Games — releases and reception',
    bio: 'Covers what players and critics made of a game, and the gap between the two when there is one.',
    voice:
      'Warmer and more direct than Ruben. Short paragraphs, plain sentences, willing to say a thing is bad. Leads with the reaction rather than the mechanism. Ends on a recommendation the reader can act on.',
    sections: ['Games'],
    initials: 'NF',
    color: '#B600A8',
  },
  {
    id: 'elia-marcheselli',
    name: 'Elia Marcheselli',
    role: '3D — tools and workflow',
    bio: 'Writes about the software at the level of someone who has to open it on Monday.',
    voice:
      'Practical and specific. Names versions, settings and file formats. Structures a piece around what changed and whether it changes your day. Comfortable with a bulleted list of consequences. No hype about releases.',
    sections: ['3D'],
    initials: 'EM',
    color: '#BE4C00',
  },
  {
    id: 'sasha-videnovic',
    name: 'Sasha Videnovic',
    role: '3D — studios and the industry',
    bio: 'Follows who is buying whom, who is hiring, and what that means for the people doing the work.',
    voice:
      'Analytical, slightly wry. Puts a story in the context of the last two years of the industry. Careful to separate what was announced from what it implies. Ends by saying what to watch rather than what to think.',
    sections: ['3D'],
    initials: 'SV',
    color: '#9A5B2E',
  },
  {
    id: 'piero-lanzoni',
    name: 'Piero Lanzoni',
    role: 'Tech — hardware and performance',
    bio: 'Cares what a machine does under load, and what it costs to find out.',
    voice:
      'Numbers first. Quotes prices, clocks and wattages, and dates them. Sceptical of manufacturer claims, and says which figure came from whom. Explains the bottleneck rather than the benchmark. Dry humour, sparingly.',
    sections: ['Tech'],
    initials: 'PL',
    color: '#7621B0',
  },
  {
    id: 'marta-bevilaqua',
    name: 'Marta Bevilaqua',
    role: 'Tech — software and platforms',
    bio: 'Covers the tools and the terms attached to them, including the ones nobody reads.',
    voice:
      'Clear and unhurried. Good at explaining why a change to a file format or a licence matters to someone who just wants to get on with the work. Flags the consequence for small teams and freelancers specifically.',
    sections: ['Tech'],
    initials: 'MB',
    color: '#5B3FBF',
  },
  {
    id: 'davide-ronchetti',
    name: 'Davide Ronchetti',
    role: 'AI — in practice',
    bio: 'Writes about the models he has actually run, and where they fit in a working pipeline.',
    voice:
      'First-hand and concrete. Describes what a tool does well and where it falls over, with a specific task in mind. Prefers workflow to benchmarks. Honest about the parts that are still bad.',
    sections: ['AI'],
    initials: 'DR',
    color: '#B600A8',
  },
  {
    id: 'iris-calamai',
    name: 'Iris Calamai',
    role: 'AI — claims and consequences',
    bio: 'Checks announcements against what has actually shipped, and asks who carries the cost.',
    voice:
      'Measured and sceptical without being cynical. Separates the demo from the product. Attentive to licensing, training data and what a change means for working artists. Never sneers at the technology itself.',
    sections: ['AI'],
    initials: 'IC',
    color: '#7621B0',
  },
  {
    id: 'teo-buffagni',
    name: 'Teo Buffagni',
    role: 'Film & TV — how it was made',
    bio: 'Interested in the shot rather than the plot: effects, virtual production, and the people who built it.',
    voice:
      'Enthusiastic about craft, precise about technique. Explains a technical decision so a non-specialist can follow without it being dumbed down. Prefers one sequence examined closely to a broad survey.',
    sections: ['Film & TV'],
    initials: 'TB',
    color: '#5B3FBF',
  },
  {
    id: 'selma-aydin',
    name: 'Selma Aydin',
    role: 'Film & TV — the business',
    bio: 'Follows commissioning, streaming strategy and what gets made as a result.',
    voice:
      'Brisk and structural. Treats a renewal or a cancellation as a decision with reasons, and goes looking for them. Comfortable saying the reasons are not public. Short sections, clear signposting.',
    sections: ['Film & TV'],
    initials: 'SA',
    color: '#D6294E',
  },
  {
    id: 'rei-okabayashi',
    name: 'Rei Okabayashi',
    role: 'Manga — art and craft',
    bio: 'Reads pages for their drawing: layout, linework, and how a panel controls a reader.',
    voice:
      'Close attention to the artwork itself. Describes what is on the page before saying what it means. Respectful of craft, quietly opinionated about shortcuts. Avoids fandom shorthand.',
    sections: ['Manga'],
    initials: 'RO',
    color: '#C8891B',
  },
  {
    id: 'gianmaria-sorbi',
    name: 'Gianmaria Sorbi',
    role: 'Manga — publishing and adaptation',
    bio: 'Covers licensing, serialisation and what survives the trip to animation.',
    voice:
      'Informative and calm. Explains how the publishing side works when it is relevant, without lecturing. Careful with release dates and territory differences, which is usually where the confusion is.',
    sections: ['Manga'],
    initials: 'GS',
    color: '#BE4C00',
  },
  {
    id: 'bruno-tessaro',
    name: 'Bruno Tessaro',
    role: 'Collecting — objects and makers',
    bio: 'Writes about what a piece is actually made of, and whether it earns the shelf.',
    voice:
      'Tactile and specific about materials, casting, paint and finish. Sceptical of scarcity as a selling point. Tells you what to look at in the photographs before you buy.',
    sections: ['Collecting'],
    initials: 'BT',
    color: '#9A5B2E',
  },
  {
    id: 'alina-petrescu',
    name: 'Alina Petrescu',
    role: 'Collecting — the market',
    bio: 'Follows prices, print runs and the distance between what a thing costs and what it is worth.',
    voice:
      'Numerate and unsentimental. Dates every price. Explains a market movement rather than reporting it. Direct about when something is a bad deal.',
    sections: ['Collecting'],
    initials: 'AP',
    color: '#C8891B',
  },
];

export const personaById: Record<string, Persona> = Object.fromEntries(
  personas.map((p) => [p.id, p])
);

/** The personas who write for a section. */
export function personasFor(section: string) {
  return personas.filter((p) => p.sections.includes(section));
}

/**
 * The disclosure that travels with every byline. Defined once so the article
 * page, the authors page and the footer cannot drift apart.
 */
export const aiDisclosure = {
  byline: 'AI-assisted · invented byline',
  short: 'Written with AI assistance under an invented byline.',
  long:
    'Articles on this blog are researched and drafted with AI assistance and published under invented editorial personas. The personas are not real people. Every piece is read and approved by Gianluca Scattarella before it goes live, but AI-assisted writing can still carry small inaccuracies — if something here matters to a decision you are making, check it against the source the piece links to.',
} as const;
