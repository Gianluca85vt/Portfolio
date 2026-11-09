---
title: "Pool of Radiance remaster: no source code"
date: 2026-11-09
category: Tech
excerpt: SNEG put the 2001 D&D RPG on Steam on 6 November with 4K, a new interface and FSR, all grafted onto a binary it had to reverse-engineer off retail discs.
cover: /img/blog/pool-of-radiance-remaster-no-source-code/shot-01.jpg
sources:
  - outlet: 80.lv
    url: https://80.lv/articles/this-forgotten-classic-d-d-rpg-was-revived-without-source-code-or-tools/
  - outlet: RPG Site
    url: https://www.rpgsite.net/news/21698-pool-radiance-ruins-myth-drannor-now-available-on-steam-gog
  - outlet: PC Gamer
    url: https://www.pcgamer.com/games/rpg/a-forgotten-dungeon-crawler-from-the-baldurs-gate-era-is-coming-to-steam-and-gog-for-the-first-time-ever/
artistView:
  take: "This is a presentation layer bolted onto a 2001 executable nobody can recompile, and the restraint is the interesting part: the original frames are upscaled rather than repainted, and the art is left exactly as Stormfront authored it."
  works:
    - "Upscaling: FSR 1.0 over the rendered frame is the honest call on assets built for a 1024x768 screen — it sharpens the presentation without inventing detail the texture never had."
    - "UI: Dear ImGui on top of a legacy binary is the right trade for a very small team. It draws from the game's own state at runtime, so the interface can be rebuilt without touching the systems underneath it."
    - "Scope: a stated rule of no changes to core systems unless something is plainly broken is what keeps a restoration from drifting into a remake it cannot afford to finish."
  misses:
    - "Upscaling: FSR 1.0 is spatial only, with no motion vectors and no temporal history, so thin geometry and distant detail will still crawl under camera movement in a way a modern upscaler would settle."
    - "Camera: reworking the camera inside an engine built around fixed party views can only go as far as the original culling and level geometry allow. Widescreen on a 2001 dungeon tends to show you the edges of rooms the designers assumed you would never see."
draft: true
---

A 2001 Dungeons & Dragons RPG went up on Steam and GOG on 6 November, priced
at 19.99 dollars. That part is ordinary. The way it got there is not: SNEG,
which holds the rights to a long shelf of lapsed PC catalogue, had no source
code for it. No build tools. No documentation. What it had was the retail
discs.

The game is **Pool of Radiance: Ruins of Myth Drannor**, built by Stormfront
Studios and published by Ubi Soft in 2001 — the first D&D game written to 3rd
Edition rules, and a famously rough one. It has never been sold digitally
before. Not on Steam, not on GOG, not anywhere.

<figure>
  <button class="video-embed" data-video="gZgYOEjmn9Q" data-title="Pool of Radiance: Ruins of Myth Drannor" type="button">
    <img src="/img/blog/pool-of-radiance-remaster-no-source-code/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from the official Pool of Radiance: Ruins of Myth Drannor trailer" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The official trailer, credited to Stormfront Studios and SNEG. It is a trailer rather than a technical breakdown, but it is the clearest look at what the restored presentation layer does to a 2001 render.</figcaption>
</figure>

## Starting from the shipped product

Co-founder Artem Shchuiko has described SNEG's working position before, and it
is the position most of this catalogue is in: in the majority of cases the
original source is simply gone, so parts of the game have to be
reverse-engineered before it will run on a current operating system at all.

For Myth Drannor the team began with the international retail editions and
whatever survived on those discs, and worked back from the binary until it knew
enough to change the original engine from the inside.

Then came the decision that shapes everything you see in the trailer. Having
done the reverse-engineering, they stayed on the 2001 engine — made the changes
inside the legacy build instead of porting the game onto something modern.
Shchuiko gives two reasons: speed, and keeping the look and feel of the thing
intact.

Anyone who has inherited an undocumented asset pipeline will recognise the
calculation. Porting means re-authoring every format you do not understand. The
legacy build already understands all of them.

## The hard part was getting at the data

Per 80.lv's write-up, the single worst problem was not rendering or resolution.
It was building an internal API to expose data buried deep in the original code.

That is worth sitting with, because it is the same wall you hit on any old
project where the tools are missing. The data is all there — stats, inventory,
party state, map information — but it is reachable only by the code that was
compiled to reach it. Every structure is at an offset somebody chose in 1999
and wrote down nowhere. Before you can draw a new inventory panel you have to
establish, by inspection, where an inventory lives in memory and what shape it
is in, then wrap that in something stable enough that the rest of your work can
depend on it.

Get that layer right and the modern features become tractable. Get it wrong and
every new panel is a separate archaeology project.

On top of that API they put a new interface built with **Dear ImGui** — the
immediate-mode library that gamedev uses for tool UI precisely because it draws
whatever state you hand it, frame by frame, with no retained widget tree to
synchronise against the game. For a team of roughly two people working inside
someone else's executable, that property is the whole appeal.

## 4K without repainting anything

The visual side is where the restraint shows. Widescreen resolutions up to 4K,
a reworked camera, controller support, a faster interface, a long list of bug
fixes, and an optional Legacy mode for people who want the 2001 behaviour. For
sharpening, **AMD FSR 1.0** applied over the output — and, deliberately, no
changes to the original artwork.

FSR 1.0 is the spatial one. No motion vectors, no temporal accumulation, no
machine learning: it takes a single rendered frame and reconstructs edges from
it. By 2026 standards that is the oldest tool in the box, and it is also the
only one of them that can be dropped into a renderer you did not write and do
not fully understand. The modern upscalers need per-frame data from inside the
engine — depth, velocity, jitter — which is exactly the kind of thing you
cannot get out of a binary without the source.

So the choice follows from the constraint. And the result is more honest than a
texture pass would have been. A 2001 D&D game authored for a 1024x768 monitor
has a specific density of detail in it; upscale the frame and you get the
original intent, larger. Repaint the assets and you get somebody in 2026
guessing what a Stormfront artist meant.

The team also set itself a rule: no changes to core game systems unless they
were fixing a clear bug. Myth Drannor's systems are the reason the game reviewed
badly in 2001 — bugs, pacing, an interface that fought you. Leaving them
standing is a defensible call for a restoration, and it does mean the thing on
Steam this week is the 2001 game with its edges filed down, not a rescued
classic.

## Why this keeps happening

The missing source is not an accident of one studio. It is what the industry's
first three decades of asset management look like from here. When EA rebuilt
Command & Conquer's live-action cutscenes in 2020 it could not find the masters
and worked from compressed archival copies; Wing Commander III was luckier, and
[its source tapes surfaced in EA's own video
archive](/blog/wing-commander-3-fmv-source-tapes/) years later. The GoldenEye
007 project [reconstructed an N64 game out of its own
binary](/blog/goldeneye-007-decompiled-what-it-reveals/) because that binary was
the only copy of the logic left. Shipped builds survive. The projects that made them
do not, because nothing in a 1999 studio's workflow treated a project directory
as something to keep.

There is a rights layer under all of this too, and it is the part that stops
most of these games coming back. SNEG has said it needed clearance from Wizards
of the Coast for the licence, from Stormfront as the original developer, and
from Ubisoft as the original publisher — three parties, for a game that sold
badly 25 years ago. The engineering problem is solvable by two people with a
debugger. The other one is not.
