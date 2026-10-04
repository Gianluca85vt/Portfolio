---
title: "Galactic Racer locks physics to 60fps on every box"
date: 2026-10-04
category: Games
excerpt: Fuse Games fixed the vehicle tick rate at 60 and made 60fps the floor on every box. Reviewers still lose the track at top speed.
cover: /img/blog/galactic-racer-60fps-physics-tick-rate/shot-01.jpg
sources:
  - outlet: TechRadar
    url: https://www.techradar.com/gaming/star-wars-galactic-racer-review
  - outlet: GamesRadar
    url: https://www.gamesradar.com/games/racing/star-wars-galactic-racer-review/
  - outlet: Traxion
    url: https://traxion.gg/how-the-team-behind-burnout-landed-a-dream-star-wars-racing-game/
artistView:
  take: "A fixed 60Hz physics tick and a 60fps floor on every machine solve the input half of racing at this speed. The other half is environment art, where the reviews land their hits: at full throttle the canyon walls stop telling you where the next turn is."
  works:
    - "Performance: a 60fps minimum on Series S in an Unreal project is a scoping decision made early and defended for three years. Nothing about a podracer forgives a dropped frame, and holding the floor on the weakest box means the art budget was written around it rather than trimmed to fit at the end."
    - "Vehicle feel: Webster's team built the Battlefront speeder bike levels and the X-Wing VR Mission at Criterion, and the thing those share is weight on a vehicle with no wheels touching anything. Reviewers describe distinct handling per craft, which is a tuning result that only survives a locked tick rate."
  misses:
    - "Environment readability: reviewers report the sets blending together at speed until the racing line is unclear. Landmark spacing, value separation between the drivable surface and the walls, silhouette priority — those are art-side fixes, and a canyon is the hardest place to make them, because the geometry wants to look continuous."
    - "Set reuse: a run-based campaign sends you down the same handful of planets dozens of times. Coverage keeps calling that repetitive, which points at a track count costed for a championship structure and then asked to carry a roguelike one."
draft: true
---

Star Wars: Galactic Racer arrives on 6 October on PC, PS5 and Xbox Series X|S,
at €59.99 on Steam. It is the first game from Fuse Games, the Guildford studio
Matt Webster set up in 2023 with senior staff out of Criterion, now around
seventy-five people, published by Secret Mode with Lucasfilm Games. Reviews
went up earlier this week and they are good: as of 4 October, Metacritic sits
at 88 from fifty reviews and OpenCritic at 87 from sixty-six critics, with 97
per cent recommending it. The best-reviewed Star Wars game since Knights of the
Old Republic took 94 in 2003.

The number I keep coming back to is a smaller one. Sixty.

## The tick rate is the design

Fuse made 60fps the minimum target on every platform the game ships on,
including Series S, and set the internal tick rate for vehicle physics and
handling at 60 as well — reported as a decision taken mainly to keep network
behaviour consistent between players. Webster has talked about the goal as a
4K 60 Star Wars spectacle in Unreal.

Pin that down and a lot follows.

A fixed physics tick means the handling model does the same amount of work per
step regardless of what the renderer is doing. Collision response, the way a
pod settles after you clip a wall, the exact window in which a correction
counts as a save rather than a wreck — all of it resolves identically on a
Series S and on a 4090. Racers that let physics float with the frame rate end
up with a game that handles differently on better hardware, usually in ways
nobody intended and nobody can patch cleanly afterwards.

It also costs you. A 60Hz tick is a ceiling on how fine the simulation can be.
At two hundred-odd miles an hour a pod covers real distance between steps, and
the usual fix is sub-stepping or continuous collision detection, both of which
are CPU you now have to find twice a frame. Fuse chose the stability.

And the floor on Series S tells you when the decision was made. A 60fps
minimum on the weakest machine comes out of the first blockout — polygon
counts, draw distances, how many lights get to move, how much of the canyon is
geometry and how much is painted. That is a three-year
commitment to a number, which is a different kind of discipline from shipping
a performance mode. We looked at the opposite end of the same problem when
[Metro 2039 got ray tracing and 60fps onto a base PS5](/blog/metro-2039-ray-tracing-60fps-base-ps5/):
there the frame rate was the thing being defended against a feature. Here it
was the premise.

<figure>
  <button class="video-embed" data-video="KRpHsI2lzlA" data-title="Star Wars: Galactic Racer Review" type="button">
    <img src="/img/blog/galactic-racer-60fps-physics-tick-rate/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from IGN's Galactic Racer video review" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>IGN's video review, by Luke Reilly, which scored the game 8 out of 10. Theirs is the lowest of the big verdicts and the one that spends most time on the structure.</figcaption>
</figure>

## Where the art has to catch up

So the input side is handled. Then you read the reviews and find the same
complaint turning up in different words: at high speed the environments blend
together and it stops being obvious where the track goes.

That is an environment-art problem, and it is the one I would have been
worried about from the first concept pass.

Making a route readable at speed is a small set of levers, and a Star Wars
canyon fights most of them:

- **Value separation** between the surface you can drive and the surface that
  kills you. Easy on tarmac with a kerb. Hard in a slot canyon where the floor
  and the walls are the same rock, lit by the same sun, at the same roughness.
- **Landmark spacing.** You need something distinct enough to register at a
  glance, far enough apart that you are not reading three at once, and
  consistent enough that it means the same thing every lap.
- **Silhouette priority.** The hazard has to win against the background. A
  gnarly beautiful rock face is a wall of competing silhouettes.
- **Where the eye is.** At that velocity a player is looking at a small box in
  the middle of the screen. Detail outside it is decoration, and detail inside
  it that is not information is noise.

Criterion knew this. Burnout's roads were wide, its hazards were traffic —
coloured, lit, moving against the world — and its tracks were urban, which
gives you kerbs, lane markings, signage, a horizon. Every one of those is
free legibility, and a podracing canyon on the Outer Rim hands you none of
them.

The blog's own review on 2 October, pulling eight verdicts to an average of
9.0, read legibility as the thing Fuse got most right, and
[flagged repeat legibility as the risk instead](/blog/star-wars-galactic-racer-review/).
With the fuller set in — fifty reviews rather than eight — the complaint has
shifted onto the first pass as well. Both can be true. A track that reads
beautifully when you know it is a track that has taught you its landmarks, and
a run-based campaign teaches you fast. The reviewers describing lost racing
lines are mostly describing the first few hours.

Which makes it a tutorial-pacing failure as much as an art one — cheaper to
fix than re-lighting six planets.

## The structure argument

The other recurring criticism is the roguelike layer: stat points spent before
a run, RNG, difficulty spikes, and the same slim set of planets visited over
and over. Scores spread accordingly. Eurogamer gave it five out of five, PC
Gamer 76 out of 100 — a two-and-a-half point gap on a ten scale, between two
outlets reviewing the same build.

A spread like that on a racer usually means people are rating different games.
One cohort is rating the driving, which by every account is excellent. The
other is rating the campaign wrapped around it, which asks you to accept a
wrecked run as progress. Fuse's old studio shipped a game whose entire
identity was that crashing was the best part. Asking players to lose on purpose
is a Criterion instinct. Asking them to lose two hours is not.

Nobody has published a technical breakdown yet. Base PS5 holds its 60 without
strain according to TechRadar, which is the claim I would most want checked
against a frame-time graph, since a locked tick rate makes the traversal
stutter you do get much easier to see. If the Series S build holds too, that is
the more impressive number by a distance.
