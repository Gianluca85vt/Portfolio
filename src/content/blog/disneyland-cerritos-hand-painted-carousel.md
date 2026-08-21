---
title: Disneyland repaints its carousel horses entirely by hand, and that's the whole trick
date: 2026-08-21
category: Film & TV
excerpt: A Variety look inside Disneyland's off-site fabrication warehouse turned up one detail worth sitting with — a sign painter who repaints the King Arthur Carrousel horses with no computer terminal in sight, at around 40 hours a horse.
cover: /img/blog/disneyland-cerritos-hand-painted-carousel/shot-01.jpg
draft: true
---

Variety got a rare look this week inside the building where Disneyland's
holidays actually get made: a **400,000-square-foot warehouse in Cerritos**,
about twenty miles from the park, that most guests will never know exists.
It's got machine shops, fabrication shops, a sewing team, a paint shop, and
rows of labeled bins for every prop and floral arrangement the resort owns.
Cast members there were finishing Halloween — including a batch of
Mickey-shaped pumpkins for the Main Street pumpkin festival — while already
starting on winter. Phil Rahn, the resort's director of enhancement and
horticulture, put it plainly: *"Storytelling is a centerpiece to everything
we do at the company."*

That's a nice pull quote. The detail that actually stopped me was smaller.

## One horse, forty hours, zero screens

<figure>
  <img src="/img/blog/disneyland-cerritos-hand-painted-carousel/cover.svg" loading="lazy" width="1200" height="900" alt="" />
  <figcaption>The Cerritos warehouse handles fabrication, paint and repairs for the entire Disneyland Resort — via Disneyland's own reporting to Variety</figcaption>
</figure>

Sign painter Devin Sweet's job, among other things, is repainting the
original wooden horses on the **King Arthur Carrousel** — carved in 1875,
running at Disneyland since 1955. According to Variety's reporting, Sweet
does it entirely by hand. No computer terminal, no printed reference sheet
taped to a monitor, no digital color-matching. Just the horse, the paint,
and decades of built-up technique for reading exactly how much the last
coat has faded. At roughly 40 hours per horse, a full pass over the fleet
takes years, and then it's time to start again.

I build digital versions of exactly this problem for a living, so I want to
be honest about what that number means, because it's easy to romanticize
and easy to misread.

It doesn't mean hand-painting is "better" than a texture pipeline. A
real-time environment has to survive a camera moving through it from every
angle, at a frame budget, multiplied across however many assets are in the
scene — a hand-painted one-off doesn't have to solve any of that, and
comparing the two on quality is a category error. What that 40-hour figure
actually tells you is something else: it's the real cost of the wear-and-history
read that every trim sheet, decal pass and procedural weathering shader is
trying to approximate and ship for a fraction of the price. Substance
generators, curvature-based dirt masks, hand-painted grunge maps — all of
it exists because nobody can spend 40 hours per hero asset in a game with
a few hundred of them. Sweet can, because Disneyland only has one King
Arthur Carrousel and it isn't going anywhere.

That's the actual trade a technical artist makes on every project: how much
of that 40-hour read can a shader fake, and where does faking it start
looking cheaper than it is. The honest answer is that a good procedural
weathering pass gets you most of the way on a background asset and none of
the way on a hero prop a camera holds on. Disneyland can afford to put a
human on the hero case because the "asset count" is one horse, repainted
once every few years, forever. A live-service game reshoots that decision
across thousands of props every ship cycle, which is exactly why the
tooling around procedural wear exists at all — not because it's better,
because the math doesn't work any other way.

## The other tell: prep starts on a schedule nobody sees

The bigger structural point, which the Variety piece makes almost in
passing, is that Halloween and Christmas dressing at Cerritos overlap by
design — themes and colors are worked out with Walt Disney Imagineering's
enhancement team well before any of it reaches the paint shop, so one
season's fabrication is already running while the previous one is still on
the park floor. That's not a scheduling curiosity, it's the same lesson
every studio relearns the hard way: the thing guests or players experience
as "seasonal magic showing up on time" is actually a fixed pipeline
cadence, decided months out, that has to survive contact with whatever else
is on fire that week. A holiday event in a live game and a holiday overlay
at a theme park are solving the identical production problem — content
that has to land on a date nobody is allowed to move, made by people who
are also still maintaining everything from last season.

## Why this is worth noticing at all

None of this is flashy. There's no new tech in it, no acquisition, no
tool announcement — just one warehouse, one sign painter, and a fleet of
horses that get repainted the same way they did in 1955. But that's
precisely why it's a useful thing to sit with if you make environments for
a living: it's a clean look at what "cost" actually buys, stripped of any
argument about whether digital or practical is the *better* approach. Forty
hours says what a specific, irreplaceable read is actually worth in labor.
Everything downstream of that number — every procedural texture tool, every
trim sheet, every "good enough" weathering pass — is an argument about how
much of it you can afford to fake.

---

*Reporting and quotes are from Variety's "How Disneyland's Cast Members Work
Behind the Scenes to Create Magic for the Holidays," published 21 August
2026. I wasn't able to fetch the article directly through my usual channels
and I couldn't find independent corroboration of the specific 40-hour
per-horse figure from a second outlet, so treat that number as
single-sourced to Variety's reporting rather than independently verified.
The craft reading connecting it to procedural texturing is my own.*
