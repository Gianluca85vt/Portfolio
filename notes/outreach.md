# Friday outreach — the rules for the drafts

Every Friday a cloud job writes **three Gmail drafts** to the makers of tools and
games the blog covered that week. Gianluca reads them, edits them and sends the
ones he wants. Nothing is ever sent by the job: it can create drafts and search
his mail, nothing else. This file is what the job follows. The growth plan of
5 October set the goal: vendors finding out the blog exists because it wrote
something specific about their work, before it has to ask them for anything.

## Who to write to

Run `node scripts/outreach-candidates.mjs 7` for the week's published pieces.

- **Good fits:** makers of 3D, VFX and game-dev tools (Foundry, Maxon, CLO,
  SideFX, Adobe Substance, Marvelous Designer, tyFlow, ArmorPaint, add-on
  developers), and indie or small-to-mid studios whose game the blog covered
  for its craft.
- **Skip:** platform holders and the largest publishers (Sony, Microsoft and
  Xbox studios, Nintendo, EA, Ubisoft, Capcom, Disney, Marvel, Warner, NVIDIA,
  AMD, Intel, Apple). Their press desks gate access behind audience size and a
  cold email from a new blog goes nowhere.
- **Skip a piece that is mostly a criticism of the company.** The email links to
  it. A fair piece with a firm point is fine; one whose main point is that the
  product failed is not the opener.
- **Skip anyone contacted in the last 90 days.** Search his mail first, in sent
  and in drafts: the company name, and `to:` the domain. One hit means skip.
- Three at most. Fewer is fine. A week with no good fit gets no drafts.

## Finding the address

- Only an address the company publishes itself: a press, PR or media contact on
  its own site or press kit, or a named partnerships address. Note the page you
  found it on.
- **Never guess an address** from a pattern (press@, pr@). If the only route is a
  contact form, do not create a draft; put the form's URL in your report.
- The cloud sandbox cannot open most company sites, so you will usually see an
  address only in a search result. It counts when the result shows it written
  out on a page of the company's own domain or press kit. **Never search for an
  address you composed** to see whether it exists: a hit on the domain does not
  mean the page carries that address. The first Friday run did exactly that and
  happened to be right twice; luck is not the rule.
- In the report, say for each address whether you saw it written out, and on
  which page.
- An indie developer's own published business email is fine; so is the contact
  on their Steam page or press kit (presskit()).

## The email

English, plain text, from his Gmail. Written as him, first person, in the voice
of `notes/article-voice.md` — no setup-then-reversal, no "I hope this finds you
well", no hype.

1. **First paragraph — the specific thing.** What the blog wrote about their
   product this week, one line from the piece that shows the craft angle, and
   the link exactly as `outreach-candidates.mjs` printed it (it carries the
   tracking tag).
2. **Who he is**, two sentences: a 3D environment and technical artist in Italy
   who writes Backdrop, a blog about games, 3D and the tools behind them, from
   the side of the people who build things.
3. **The ask, one of these:**
   - A tool: a not-for-resale licence for a hands-on review, and a place on
     their press list for future releases.
   - A game: a review key (PC, Steam) for a hands-on review, and a place on
     their press list.
4. **How he covers things**, short: hands-on, the verdict is his own, every
   review ends with "The artist's view" on what works and what does not, the
   licence or key is disclosed in the piece, he sends the link when it is live.
5. Links: `https://www.gianlucascattarella.it/blog/` and
   `https://www.gianlucascattarella.it/blog/#partnerships`.
6. Signature:

```
Gianluca Scattarella
3D Environment & Technical Artist
Backdrop: https://www.gianlucascattarella.it/blog/
Portfolio: https://www.gianlucascattarella.it
```

Subject: specific, under 70 characters, naming their product, e.g.
`Backdrop covered Mari 8's Hex Tile node — review licence?`

**Never:** traffic numbers, follower counts or rankings; a claim that he has
used a product when the piece was written from public material; a promise of a
positive review; attachments; more than about 180 words in the body.

## Report

In Italian: for each draft, the company, the piece it is about, the address and
the page it came from, and why this one over the others. Then the companies you
skipped and why (already contacted, contact form only, piece too critical, too
large). If you created no drafts, say why.
