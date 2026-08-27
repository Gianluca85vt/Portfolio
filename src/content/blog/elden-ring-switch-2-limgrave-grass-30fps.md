---
title: Elden Ring's Switch 2 port took grass out of Limgrave to hold 30fps
date: 2026-08-27
category: Games
excerpt: Tarnished Edition arrives on Switch 2 on 28 August, a year after a Gamescom demo reportedly ran at around 15fps. Reviewers are noticing thinner foliage in Limgrave and the Altus Plateau, which is where an open world usually gives ground first.
cover: /img/blog/elden-ring-switch-2-limgrave-grass-30fps/shot-01.jpg
---

The grass is thinner.

That is the detail surfacing in the first Switch 2 reviews of Elden Ring:
Tarnished Edition, out 28 August, and it is the one an environment artist will
notice before anything else. Less grass across Limgrave. Less across the Altus
Plateau. Reviewers describe it as barely visible in motion, which is probably
true, and which is also the entire point of doing it.

Grass is where an open world gives ground first. It has been that way since
before Elden Ring existed and it will be that way on whatever handheld comes
next.

<figure>
  <button class="video-embed" data-video="r5i9FJuV8u4" data-title="ELDEN RING Tarnished Edition – Gameplay Showcase – Nintendo Switch 2" type="button">
    <img src="/img/blog/elden-ring-switch-2-limgrave-grass-30fps/video-thumb.jpg" loading="lazy" width="1280" height="720" alt="Still from Bandai Namco's Switch 2 gameplay showcase for Elden Ring: Tarnished Edition" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Bandai Namco's own Switch 2 gameplay showcase, released ahead of launch. Publisher footage, so read it as best case rather than average case. Nothing loads from YouTube until you press play.</figcaption>
</figure>

## Fifteen is a different kind of number

Back up a year. FromSoftware showed Tarnished Edition running on Switch 2 at
Gamescom 2025 and the reaction was brutal, because onlookers clocked it at
somewhere around 15 frames per second. The game was subsequently delayed into
2026.

Most bad demo framerates are recoverable. A build with debug rendering left on,
an unoptimised shader variant, a memory leak that only bites after forty
minutes on a show floor — those are embarrassing, and they are also a
fortnight of work.

Fifteen against a target of thirty is a different category. Halving a frame
time is not a bug hunt. It means the frame you have designed does not fit in
the box, and every millisecond has to be found somewhere in the content
itself: fewer things drawn, fewer things simulated, fewer things lit, or all
three.

A year is roughly how long that takes on a world this size.

## DLSS buys you pixels and nothing else

The shipping numbers are 30fps in both modes, upscaled to 4K docked and 1080p
in handheld, with DLSS doing the reconstruction. Which is genuinely a lot of
image for the silicon.

But upscaling only ever solves one axis of the problem. It lets you render
fewer pixels and present more of them, so it helps enormously when you are
fill-rate bound — heavy post, big transparent surfaces, expensive per-pixel
shading. It does nothing for the cost of deciding what to draw in the first
place.

Elden Ring's expensive moments have never really been about pixels. They are
about traversal: riding Torrent across an open field streams new cells in,
spawns and despawns entities, updates AI that was asleep, resolves collision
against terrain you have not touched yet, and issues draw calls for a
silhouette that changes every few metres. That is the part of the frame that
DLSS cannot reach. It is also the part that has generated Elden Ring's
best-known technical complaint on PC since 2022, where the stutter shows up
while moving through the world rather than while standing in a boss arena.

So a port team facing a hard 33ms budget on a handheld has one honest lever,
and it is the content.

## Why the grass goes before the castle

Grass looks like the cheapest thing in a scene. It is frequently the most
expensive per square metre of screen.

The reasons stack. Grass is usually authored as a density field rather than
placed by hand, so its cost scales with how much of the ground you can see —
which, on a plateau, is all of it. Each clump is a handful of alpha-tested
cards, and alpha testing defeats early depth rejection, so the hardware ends
up shading fragments that a later blade covers up anyway. Overdraw on a full
screen of grass can run several layers deep. Then the wind animation runs in
the vertex shader on every one of those cards, every frame. Then, if the
grass casts and receives shadows, you pay for a good portion of it again in
the shadow pass.

Halve the density and you get a saving in fill, in vertex work, in shadow
cost and in instance count simultaneously. Almost nothing else in the scene
pays out across that many budgets at once.

Compare that with Stormveil. A castle is opaque geometry with a fixed
silhouette that players use to navigate and remember. Take detail out of it
and people notice immediately and describe the game as looking wrong. Take a
third of the grass out of Limgrave and, at riding speed, most players read the
field as a field.

It is a good trade. It is also a trade with a floor: thin the field far enough
and the ground plane starts to read as bald in the middle distance, the
transition between grass and terrain texture becomes visible as a ring around
the camera, and the world starts to feel like it is being drawn just ahead of
you. Where FromSoftware landed on that curve is the thing worth looking at
closely once people have the game on their own hardware.

## Handheld holding better than docked

One inversion in the reviews I want to flag, because it reads as counterintuitive
and is not: at least one reviewer found performance felt more consistent in
handheld than docked.

If that holds up, the likely explanation is unglamorous. Docked mode is asking
for a substantially larger output image, so the internal resolution DLSS
reconstructs from is higher too, and a dynamic resolution system has less
headroom to drop into before the result looks soft. Handheld runs a smaller
target, which means more slack in exactly the moments — a field of enemies, a
weather transition, a large boss — where the frame is about to blow past its
budget.

You end up with the smaller screen delivering the steadier picture. Anyone who
has profiled a game across two output modes has seen this before.

Worth saying plainly: I have not played it, and everything above is drawn from
published reviews and the publisher's own footage. Take it as a reading of the
tradeoffs rather than a measurement.

## The exclusivity that lasts one day

The package is $79.99 and includes the base game, Shadow of the Erdtree, two
new starting classes and new customisation for Torrent.

The classes and the customisation also land on PlayStation, Xbox and PC on 28
August, as a separate Tarnished Pack. So the content that makes this edition
distinct stops being distinct on the day it arrives.

Which leaves the port itself as the product. A 2022 open world, built for a
console that plugged into a wall, thinned out until it fits in a frame budget
you can hold in your hands — and a field in Limgrave with fewer blades in it
than the one everybody remembers.

---

*Release date, price and contents confirmed against Bandai Namco's own product
pages for Tarnished Edition. Performance figures and foliage observations are
from reviews published 26 August 2026; the roughly 15fps figure from Gamescom
2025 was widely reported at the time from hands-off viewing and was never
published by FromSoftware.*
