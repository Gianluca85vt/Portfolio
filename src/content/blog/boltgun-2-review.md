---
title: "Boltgun 2 review: bigger, sharper, and repetitive"
date: 2026-11-24
category: Games
excerpt: Thirteen verdicts average 8 and run from 5 to 9.5. The pixel art is 3D models shot from eight angles, and the repetition complaint traces back to that.
cover: /img/blog/boltgun-2-review/shot-01.jpg
reviewOf: "Warhammer 40,000: Boltgun 2"
score: 8
verdict: "Auroch Digital's sequel is a faster, denser boomer shooter with a branching campaign and a second playable character. The guns blur into each other and the enemies are not clever."
scoreSources:
  - outlet: TechRaptor
    score: 9.5
  - outlet: PlayStation Universe
    score: 9
  - outlet: Impulse Gamer
    score: 9
  - outlet: DualShockers
    score: 8.5
  - outlet: Lords of Gaming
    score: 8.4
  - outlet: COGconnected
    score: 8.2
  - outlet: GamingBolt
    score: 8
  - outlet: GameSpew
    score: 8
  - outlet: The Wand Report
    score: 8
  - outlet: The Games Machine
    score: 8
  - outlet: CGMagazine
    score: 8
  - outlet: Checkpoint Gaming
    score: 7
  - outlet: ComicBook
    score: 5
sources:
  - outlet: Creative Bloq
    url: https://www.creativebloq.com/3d/video-game-design/warhammer-40-000-boltgun-2s-lead-artist-reveals-how-they-made-pixel-art-feel-authentically-retro
  - outlet: ComicBook
    url: https://comicbook.com/gaming/review/warhammer-40k-boltgun-2-review/
artistView:
  take: "The pixels are a render farm's output, not a pixel artist's. Auroch builds characters in 3D, photographs them from eight angles, packs the frames into sheets and billboards them at the player — which buys a 1996 silhouette at 2026 asset counts, and sets the ceiling on how many distinct enemies the game can afford."
  works:
    - "Art direction: the dithering and the clamped palette hold together at speed, which is where most retro pastiches fall apart — reviewers consistently single out the look over the shooting."
    - "Pipeline: capturing from eight directions and dropping the in-between frames is the correct trade for a game viewed down a gun barrel, where nobody studies an enemy in profile."
  misses:
    - "Enemy design: a sprite roster costs per enemy type rather than per instance, and the thin variety reviewers describe is what that bill looks like from the player's side."
    - "Encounter design: reviewers describe enemies snagging on geometry and ambushes that telegraph, which points at arenas built to a template."
draft: true
---

Every cultist you shoot in Boltgun 2 is a 3D model that was photographed to
death.

Auroch Digital's lead artist, Mark Chambers, walked Creative Bloq through it.
The team models the character in 3D first. Then comes a pixelisation step: a
custom rig captures the asset from eight camera directions, a script packs the
output into a compressed sprite sheet, and the finished frames get projected
onto a billboarding plane that swivels to face the player. You are firing at a flat photograph of something that was never flat.

The game has been out since 14 October 2026 on PC, PS5 and Xbox Series X|S,
with a Switch 2 version following on 19 November. That second date is why the
verdicts are being read again this week, and a good moment to look at where
they disagree.

## Eight directions, and the frames nobody sees

Eight is the number worth sitting with. A sprite that rotates to face you only
needs to be correct from the angles a player will ever hold it at, and Chambers
says the team deliberately reduced the frame count to the most important
angles. Down a gun barrel, in a corridor, at speed, nobody is studying a Chaos
marine in three-quarter profile.

That restraint is a labour decision before it is an aesthetic one. Every angle
of every animation of every enemy is a frame somebody has to look at and sign
off, and the count multiplies in a way polygon budgets do not — which is the
same arithmetic that made [GTA 6's 600,000 NPC animations a headcount
problem](/blog/gta-6-600000-npc-animations/) rather than a disk-space one. Drop
the diagonals and the bill halves. Keep them and you are paying for frames that
exist for a sixth of a second each.

The first game hit the wall earlier than you would expect. Auroch has said that
Unreal Engine 4's own sprite tooling could not draw the sheer number of objects
and enemies fast enough, so they wrote their own renderer, able to run on either
the GPU or the CPU. A studio writing a bespoke renderer to make flat squares
appear is a funny sentence until you count the squares. Boltgun 2 is listed as
running on Unreal Engine 5, and Auroch has not made much noise about the jump —
which tracks, since a version bump tends to bill you somewhere specific rather
than everywhere, the way [Phasmophobia's move to Unity 6 sent the cost straight
into lighting](/blog/phasmophobia-unity-6-resonance-update/).

<figure>
  <img src="/img/blog/boltgun-2-review/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Auroch Digital, via the official Warhammer 40,000: Boltgun 2 Steam page</figcaption>
</figure>

## The number

**8**, from thirteen scored verdicts I could verify, running from 5 to 9.5.

That is a plain mean of what was published, converted to a ten-point scale and
rounded to the nearest half. The aggregates agree with it and disagree with each
other about the detail: as of 24 November 2026 Metacritic sits in the low 80s
depending on which platform page you open, and OpenCritic's figure moves between
81 across all critics and the low 80s for top critics alone. All of which is a
long way of saying low eights.

A four-and-a-half point spread is the interesting part. TechRaptor's 9.5 and
ComicBook's 2.5 out of 5 — "a mediocre boomer shooter doomed by repetition" —
weight the same two facts differently. Both name those facts in their opening
paragraphs: the look is terrific, the fighting runs out of ideas.

<figure>
  <a class="video-embed" data-external href="https://www.youtube.com/watch?v=jfrPcxz1svk" target="_blank" rel="noreferrer">
    <img src="/img/blog/boltgun-2-review/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from a Warhammer 40,000: Boltgun 2 video review" />
    <span class="play" aria-hidden="true"></span>
  </a>
  <figcaption>An independent video review, "Warhammer 40,000: Boltgun 2 Review — The Final Verdict", whose score is not counted in the average above. It opens on YouTube: Boltgun 2 is an 18-rated game and its footage is routinely age-restricted, which an embedded player refuses to play.</figcaption>
</figure>

## Why the repetition is a pipeline problem

Read the complaints together and they land almost entirely on variety: three
bolters that feel like one,
four heat weapons that feel like two, enemies that snag on geometry, ambushes
that start to telegraph, and two playable characters who — ComicBook's words —
feel too similar.

Now put that next to the sprite pipeline. A polygonal enemy is cheap to vary:
reskin it, swap a head, scale it, give it a different animation set, and the
engine renders the difference for free. A sprite enemy costs its own full
capture — model, pixelise, eight directions, every frame of every animation,
packed and hand-checked. Variety stops being a modelling task and becomes a
multiplication table. The cheapest way to fill an arena is therefore more of
what you already captured, and more of what you already captured is the exact
sensation reviewers are describing when they say level six feels like level
three.

That excuses nothing. A player who paid for the game is entitled to find
the fifth identical ambush boring, and the technique that produced it is not
their problem. But it does explain why the complaint survived a sequel that
otherwise improved nearly everything — the branching campaign, the second
character, the level geometry, Mick Gordon on part of the soundtrack. Auroch
fixed what was fixable without touching the constraint underneath, because the
constraint underneath is the reason the game looks the way it does, and the way
it looks is the reason anybody wanted a sequel.

Which is a fair trade, and a real ceiling. Boltgun 3, if it happens, runs into
the same wall on the same day it starts.

---

*Scores collected on 24 November 2026 from the outlets' own pages and published
round-ups, converted to a 1-10 scale and averaged. Aggregate figures are the
aggregators' own.*
