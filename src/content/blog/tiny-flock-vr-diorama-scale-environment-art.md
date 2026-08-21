---
title: Tiny Flock is a VR game about being a giant, and that's an environment art problem
date: 2026-08-21
category: 3D
excerpt: No Brakes Games' new sheep-herding puzzler puts the player at doll's-house scale over 21 fully interactive dioramas. Building a world that has to survive being smashed and stacked by the player is a different job than dressing a set that only has to look right from one camera path.
cover: /img/blog/tiny-flock-vr-diorama-scale-environment-art/shot-01.jpg
draft: true
---

Saw this cross 80.lv this week: **No Brakes Games**, the studio behind *Human: Fall Flat*,
announced **Tiny Flock**, a VR-exclusive puzzle game where you play a giant shepherd nudging a
flock of sheep through 21 hand-crafted diorama worlds. It's launching on PCVR and Meta Quest
later in 2026, and it's been picked up by UploadVR, COGconnected, GamesPress and a handful of
other outlets over the last couple of days. Nobody's got hands-on time yet, so everything here is
from the announcement materials and the studio's own site, not a preview build — worth saying up
front since there's no independent verification of how the final thing actually plays.

What made me stop scrolling wasn't the sheep. It's the scale.

## Doll's-house scale is a genuinely different design problem

<figure>
  <img src="/img/blog/tiny-flock-vr-diorama-scale-environment-art/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>No Brakes Games, via the official Tiny Flock Steam page</figcaption>
</figure>

Most environment art, VR or not, is built to be walked through at human scale. You block out
rooms and streets and corridors the way a person moving through them would experience them, and
the whole toolkit — LOD distances, prop density, sightline blocking — assumes the camera is
roughly eye height and roughly ground-level.

Tiny Flock inverts that. The player is a giant looking down on diorama-sized worlds, according to
No Brakes' own description — think a model railway table rather than a level. That's closer to
the design language of *Tiny Glade* or a tabletop wargame board than to *Human: Fall Flat*'s
first-person physics playgrounds, and it changes what "environment art" even means for the
project. You're not dressing a corridor the player walks down once. You're building an object the
player looks at, entirely, from above, for the whole session — which means there's nowhere to
hide a bad silhouette or a texture that only reads at a distance. Everything is the hero shot.

## "If you can see it, you can interact with it" is the actual headline

The line from No Brakes' own materials is that the world is fully interactive: build bridges,
stack objects, pull levers and ropes, and — this is the part that matters for a set builder —
directly destroy obstacles to clear a path for the flock. There's reportedly no fixed, scripted
solution to a level; players are meant to improvise with whatever the physics sim lets them do to
the geometry in front of them.

That's a much harder brief than it sounds. A destructible prop in most games is a specific,
pre-authored asset: a barrel that's rigged to break into three chunks, built and tested for that
one interaction. A world where "if you can see it, you can interact with it" is the actual design
pillar means every diorama has to be built as a physics object first and a piece of set dressing
second — collision, mass, and fracture behaviour baked into essentially everything on the table,
not bolted onto a handful of hero props. No Brakes says the physics engine was written from the
ground up specifically for this, rather than adapted from *Human: Fall Flat*'s ragdoll system,
which tracks: a world you're meant to smash apart on purpose needs a much more general simulation
layer than a world built to survive a player merely stumbling through it.

## Why this is a harder sell in VR specifically than it would be on a flat screen

Diorama-scale, fully destructible sets aren't a new idea on a monitor — sandbox and physics
puzzle games have leaned on breakable geometry for years. What's different in VR is that the
player's head is the camera, at a fixed real-world scale, looking down at a miniature world with
stereo depth. That's unforgiving in a way a flat screen isn't: get the scale, the material
readability or the prop density even slightly wrong and it stops reading as "a doll's house" and
starts reading as "a blurry mess of tiny geometry," because there's no cinematic framing or depth
of field doing the work of hiding it. No Brakes' own framing for the project is that they wanted
to build something that specifically couldn't exist outside VR — interactions that don't translate
to a flat screen — and diorama-scale, hands-in-the-world physics puzzling is a reasonable bet on
what that actually looks like, if the execution holds up.

## The honest caveat

Everything above is reading the announcement, not the game. Trailers and press materials show the
best five minutes cut together; whether 21 levels' worth of destructible dioramas hold together
under real physics stress, at VR framerates, on Quest hardware that's a lot less powerful than a
PCVR rig, is exactly the kind of thing that only shows up once people are actually playing it.
Worth revisiting once it's out.

Sources: [UploadVR's coverage of the announcement](https://www.uploadvr.com/the-studio-behind-human-fall-flat-announces-new-vr-puzzle-game-tiny-flock/),
[COGconnected's write-up](https://cogconnected.com/2026/08/tiny-flock-brings-adorable-sheep-and-physics-based-puzzles-to-vr-in-2026/),
and [No Brakes Games' own Tiny Flock page](https://nobrakesgames.com/games/tinyflock/).
