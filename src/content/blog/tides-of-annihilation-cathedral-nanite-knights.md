---
title: Tides of Annihilation built a real cathedral for a two-hour demo, and the actual flex is buried further down the press release
date: 2026-08-20
category: Games
author: ruben-castellani
excerpt: Eclipse Glow Games built a full-scale cathedral in Chengdu just to run its first public hands-on. Impressive, but the number worth reading is the one about how they're forcing Nanite to handle giant animated bosses, a job it wasn't built for.
cover: /img/blog/tides-of-annihilation-cathedral-nanite-knights/shot-01.jpg
---

**Tides of Annihilation** got its first wave of hands-on previews on 19
August, from Game Informer, Push Square and Insider Gaming among others, all
filed the same day and all landing somewhere between "stunning" and
"immense production value." Game Informer's framing was the most specific:
spectacle on the level of Final Fantasy XVI. That's a real claim to make
about a studio that's only two years old.

The preview access itself is the story before the story. Eclipse Glow
Games — Tencent-backed, staffed with people who've worked on Assassin's
Creed, Persona, For Honor and Like a Dragon — didn't put this game in front
of press at a booth. It built a full-scale cathedral in the centre of
Chengdu, China, ran a two-hour hands-on inside it, and is now doing it
again at gamescom (26–30 August, Hall 6, booth B-050) as the game's second
public demo. That's two purpose-built venues before most players have seen
a second of uncut gameplay.

## What it actually is

<figure>
  <img src="/img/blog/tides-of-annihilation-cathedral-nanite-knights/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Eclipse Glow Games, via the official Tides of Annihilation Steam page</figcaption>
</figure>

Tides of Annihilation is an Arthurian-flavoured action-adventure: London
in ruins after a cataclysm the game calls the Outworld invasion, a
protagonist named Gwendolyn chasing personal revenge and a missing sister
across two connected settings — a fog-shrouded modern metropolis and the
mythical realm of Avalon. It's coming to PC (Steam and Epic Games Store),
Xbox Series X|S and PS5, with no date attached yet beyond "currently in
development."

None of that is unusual for the genre. What's unusual is how much
engineering detail the studio has already put into public statements about
it, months before release.

## The number that matters more than the cathedral

Back in May, Eclipse Glow Games and Nvidia jointly announced what they
called a deep technical collaboration, built around Unreal Engine 5's
Nanite and Lumen. The headline claim, repeated near-verbatim by every
outlet that covered the May announcement: a custom Nanite-based
**hierarchical setup**, purpose-built to render the game's giant knight
bosses, compressing mesh data by 73% while holding sub-millimetre surface
detail, at a claimed 8.2 million polygons per frame — over seven times
what Eclipse Glow says Horizon Forbidden West renders. Nvidia's side adds
path tracing and DLSS 3.5, plus driver-level optimisation work with Epic
for both PC and current-gen consoles.

**Worth being clear about what's confirmed here and what isn't.** The
polygon count, the compression figure and the Horizon Forbidden West
comparison all come from Eclipse Glow's own May press materials, syndicated
by outlet after outlet without an independent benchmark attached anywhere
I could find. Treat those specific numbers as a marketing claim, not a
measured one, until someone runs a frame capture.

What I'd actually flag as interesting, and what the press releases mostly
skate past: **Nanite was not built for what they're describing.** Its
whole trick is virtualised micro-triangle clusters with LOD chains baked
against a mesh that isn't expected to move relative to itself — it was
designed for static environment geometry, rock faces and building
facades, not skinned, animated hero-scale characters. Getting a giant boss
that has to run an attack pattern and read as a threat at co-op camera
distance into that pipeline means either treating it as a rigid assembly
of Nanite-enabled parts hung off a skeleton rather than true per-vertex
skinning — which is what "hierarchical setup" is doing a lot of quiet work
to describe — or leaning on Unreal 5's still-limited native Nanite support
for skinned meshes and working around its constraints case by case. Either
way, that's a harder and more interesting engineering problem than "giant
knight looks pretty," and it's the part I'd want a technical deep-dive on
before I believed the 8.2 million figure means what it sounds like it
means.

## Why build a cathedral to say all that

Studios have been building physical structures to sell unfinished games
for as long as trade shows have existed — it's the same logic as a world's
fair pavilion. But it's a specific kind of tell when a two-year-old studio
spends real money on a single-use practical build in the same season it's
publishing granular claims about triangle counts: it's buying trust in
production value before anyone's hands are on a controller, because
"sub-millimetre detail on a giant animated boss" is not something a press
release can actually demonstrate. The Chengdu event was stage-managed,
hands-on but guided. Gamescom's showing is the first chance for less
controlled coverage — that's the one to watch for footage that isn't
cut to the studio's own trailer rhythm.

Scores, dates and any of the numbers above are current as of 20 August
2026 and will move as the game gets closer to a release date it hasn't
announced yet.
