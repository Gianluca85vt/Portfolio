---
title: "Hot Wheels Infinite Rush review: 7.5, from 6 to 9"
date: 2026-09-06
category: Games
cover: /img/blog/hot-wheels-infinite-rush-review/shot-01.jpg
excerpt: Six verdicts run from a 6 to a 9 and average 7.5. The disagreement sits over one decision — the playset became four open-world islands.
reviewOf: "Hot Wheels Infinite Rush"
score: 7.5
scoreSources:
  - outlet: Hardcore Gamer
    score: 9
  - outlet: DualShockers
    score: 8
  - outlet: Cubed3
    score: 7
  - outlet: MonsterVine
    score: 7
  - outlet: Console Creatures
    score: 7
  - outlet: Push Square
    score: 6
draft: true
---

In *Hot Wheels Unleashed* the track ran across a garage floor, and what sold it
was the workbench overhead. A die-cast Twin Mill at 1:64 tells you nothing about
its own size until you park it beside a coffee mug, at which point the mug is a
grain silo, the car is seven centimetres of painted metal, and the fantasy
switches on.

*Infinite Rush* trades the garage for four islands.

Reviews went up on 6 September, four days ahead of the 10 September release.
Across the six scored verdicts I could verify outlet-side the average is
**7.5** on a ten-point scale, running from Push Square's 6 to Hardcore Gamer's
4.5 out of 5. Metacritic reads 74 and OpenCritic 70 as of 6 September 2026.
Both aggregates sit near the mean and neither shows the argument underneath it.

## Three points of daylight, over one decision

<figure>
  <img src="/img/blog/hot-wheels-infinite-rush-review/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Milestone S.r.l., via the official Steam page. Hot Wheels used under licence from Mattel.</figcaption>
</figure>

Read the high scores and the low scores side by side and you find both camps
weighing the same trade, and landing on opposite sides of it.

The people at 8 and 9 are counting what got bigger: more than 150 vehicles, four
islands with their own weather and palette, an event list long enough that
DualShockers called the fantasy fulfilled. The people at 6 and 7 keep circling
one loss. Push Square's headline calls it an open world the game doesn't need.
Press Start, while praising Milestone's reverence for 1:64 die-cast as
unmatched, wrote that a certain dash of magic was sacrificed at the open-world
altar. Gamereactor lands on smaller maps and occasionally awkward driving.
Cubed3, reviewing on Switch 2, gave it a 7 and called it well made with
frustrating choices around unlocking.

Every one of those complaints has the same shape. The world got bigger and the
scale gag got quieter.

## Toy scale needs a human-scale object in the frame

This is an environment art problem before it is a design one, and it is worth
being precise about why.

Sand, water, grass, tarmac, palm trees — none of it has an inherent size. A palm
tree rendered for a toy car and a palm tree rendered for a real car are the same
asset with a different transform, and nothing in the shot tells you which one
you are looking at. Landscapes are scale-free by default. That is normally a
convenience. Here it is the entire problem, because the only thing that ever
made a Hot Wheels game feel like Hot Wheels was a *manufactured object*, built
for a human hand, photographed from underneath.

*Unleashed* was set indoors and the constraint did the work. A garage, a
skyscraper under construction, a college campus. Skirting boards, plug sockets,
tool handles, the underside of a desk. Every frame had at least one object whose
real size you already knew in your body, and the car was measured against it
whether you thought about it or not.

An island has none of that furniture. Milestone can drop giant props into it —
and from the footage they clearly have — but a prop placed deliberately for
scale reads as decoration, where a skirting board reads as the world. The
difference is legibility, and reviewers felt it without necessarily naming it.

The inverse case is instructive. When No Brakes Games put the player at
doll's-house scale over interactive dioramas, the reference object was the
player's own hands in the frame; I wrote about
[what scale costs when the player is the giant](/blog/tiny-flock-vr-diorama-scale-environment-art/)
back in August. One studio is looking down at a world it can hold, the other is
driving through a world that should dwarf it. Both live or die on whether there
is something in shot with a known size.

## What toy scale actually costs a renderer

Put the camera two centimetres off a floor and a lot of ordinary assumptions
stop holding.

Texel density is the first bill. A plank of wood is now a landscape feature. The
grain in it fills a quarter of the screen at 200km/h, so it needs texture
resolution that an open-world budget would never spend on a plank. Multiply that
across every surface within a few metres of a low camera — which, at this scale,
is every surface the player ever sees — and you get a world that is physically
tiny and enormously expensive per cubic metre.

That is a streaming problem rather than a rendering one, and I suspect it is
what But Why Tho ran into: they liked the game a great deal and still flagged
long loading times on Switch 2. Dense texture in a small volume is a lot of
bytes to pull before anything can be drawn.

Then there is the cue Milestone cannot use. The strongest miniature tell in
photography is a shallow focal plane — macro shots of die-cast have millimetres
of focus, and everything past the front wheel goes to mush. That is exactly what
your eye reads as "small object, close lens". At arcade racing speed it is
unusable. Blur anything past the bonnet and the player cannot see the corner. So
the one free signal of miniature is off the table from the first design meeting,
and the job falls back onto props, and the props are what an island does not
have.

The orange track carries more weight than it gets credit for, incidentally. In
most *Unleashed* frames it is the only strongly saturated warm object, which is
what lets you pick the racing line out of a cluttered domestic background at
speed. Against sand and sun that contrast is harder to hold.

## Reviewing four days early is fine here

Worth flagging, because the blog took the opposite position last week. When
Halloween: The Game's scores landed ahead of launch I argued that
[a score published before launch is a score of the build](/blog/halloween-the-game-metacritic-opencritic-split/) —
a 1v4 asymmetric horror game does not assemble itself until a few thousand
people are in the queue at once.

*Infinite Rush* has no such gap. A single-player open world with a car list and
an event board is finished at review time; whatever the critics drove on 6
September is what arrives on the 10th. Six verdicts is still a thin pool, and it
will thicken over the weekend. The mean will move. The shape of the
disagreement, I would guess, will not.

<figure>
  <button class="video-embed" data-video="sEzLOGztuNs" data-title="Hot Wheels: Infinite Rush - Official Challenges Overview Trailer - IGN Live 2026" type="button">
    <img src="/img/blog/hot-wheels-infinite-rush-review/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the Hot Wheels Infinite Rush challenges overview trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Milestone's Challenges Overview trailer, via IGN. A publisher trailer rather than a video review — no outlet in the score list above had posted one when this went up, so nothing here is cut footage of a verdict.</figcaption>
</figure>

The thing I keep turning over is that Milestone plainly know all of this. The
die-cast models are lovingly done, the toy-plastic shaders are right, the track
still snaps together the way the real orange track does. They built the world
that shows all of it off least well. There will have been a reason — an open
world is what a racing game is expected to be in 2026, and four islands is a
better line on a store page than one garage. It just costs the mug.

---

*Six outlet scores converted to a ten-point scale and averaged as they read on 6
September 2026; aggregate figures the same morning, and all of them move as more
verdicts land. Release date of 10 September 2026 with advance access from 7
September, four islands and a roster above 150 vehicles per Milestone's
announcement as reported; developed and published by Milestone S.r.l. under
licence from Mattel, on PS5, Xbox Series X|S, Switch 2 and PC. Steam listing:
app 2821390. I could not confirm a launch price from a primary source, so none
is quoted here.*
