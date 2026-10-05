/**
 * What the blog offers a brand or a tool vendor, and the rules it keeps. Shared
 * by the "Work with the blog" box at the foot of the blog and by /media-kit/,
 * so the two can never promise different things.
 *
 * It deliberately quotes no audience number: the media kit states the real
 * ones, refreshed weekly, and a made-up figure is the kind of thing that ends a
 * relationship the first time somebody asks for analytics access.
 */
export const offers = [
  {
    title: 'Review units and hands-on',
    body: 'Hardware, software licences and early builds. GPUs, workstations, displays, capture and scanning kit, DCC and render tooling. I cover what I can put through real production work rather than a spec sheet.',
  },
  {
    title: 'Tool and pipeline coverage',
    body: 'If you build something artists use — a renderer, a plugin, an asset pipeline, a scanning workflow — I am interested in what it changes about the job, not the feature list. That tends to make a more useful piece than a launch post.',
  },
  {
    title: 'Sponsorship and placement',
    body: 'Section sponsorship and banner placement on the blog. I will tell you which pieces perform and which do not, because the alternative is you finding out on your own and not coming back.',
  },
];

/** Placements that open as the newsletter grows; the media kit lists them. */
export const newsletterOffers = [
  {
    title: 'The Thursday newsletter',
    body: 'One sponsor slot per issue, labelled as sponsored, written in the same voice as the rest. Offered once the list is large enough to be worth the money; until then you get the honest count, not a slot.',
  },
  {
    title: 'The release tracker',
    body: 'A "presented by" line on the page working artists check before they upgrade. It never touches what an entry says about your release or anyone else’s.',
  },
];

export const rules = [
  'Anything gifted, loaned or paid for is disclosed in the piece itself.',
  'Sponsored and affiliate links carry rel="sponsored". I do not sell link insertions into existing articles, and I do not publish guest posts written to place a link — that is against Google’s policies and it would damage the site faster than it would pay for itself.',
  'Editorial control stays with me. You get the coverage, not the verdict, and I will say so up front if the answer is going to be unflattering.',
  'Review units get returned or disclosed as kept, whichever you prefer.',
];
