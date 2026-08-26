---
title: The Witcher 3 got a next-gen patch in 2022. This one is going after the lighting instead
date: 2026-08-26
category: Games
excerpt: CD Projekt Red announced a second free overhaul of an eleven-year-old game at Gamescom, and buried in the "30-plus upgrades" list is a genuine global illumination rework. That is the part worth caring about.
cover: /img/blog/witcher-3-remastered-2026-lighting-overhaul/shot-01.jpg
---

September 29. That's the date CD Projekt Red gave the Gamescom Opening Night Live crowd for The Witcher 3: Wild Hunt — Remastered, and the number that actually matters isn't the date. It's the count of how many times this specific game has now been rebuilt for current hardware: this is the second free overhaul since the PS5/Series X next-gen update shipped in December 2022. Same base game, same eleven years since launch, and CD Projekt Red is going back in.

Free for existing owners on PC, PS5 and Xbox Series X/S. A native Switch 2 version, also free to anyone upgrading. And, in a move nobody had on their bingo card, a native release on Battle.net — the first Witcher game to sit next to Blizzard's library. Hearts of Stone and Blood and Wine become free additions for everyone who owns the base game, which is either generosity or a way of making sure nobody reviews Songs of the Past, the new 2027 expansion, without the full trilogy of tone sitting behind it.

## The list is long. Most of a remaster list always is

<figure>
  <img src="/img/blog/witcher-3-remastered-2026-lighting-overhaul/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>CD Projekt Red, via the official Witcher 3 Steam page</figcaption>
</figure>

The press materials count more than thirty upgrades: reworked combat, revised movement, a skill tree pass, transmogrification, an expanded photo mode, new Witcher Sign effects, revamped Roach handling. That is a real list and none of it is nothing, but a bullet-point count is a marketing unit, not an engineering one. Swapping an icon and re-authoring a lighting rig both get one line each.

The line that isn't padding: revised global illumination, new GTAO, path tracing support, subsurface scattering, a new tone mapper, updated foliage shading, DLSS 4.5. That is someone going back into scenes that were lit for a rendering pipeline eleven years old — baked lightmaps, a probe-based GI solution built around 2014 hardware ceilings — and re-lighting them for a system that behaves completely differently.

Global illumination doesn't self-correct when you swap the underlying solver. A light rig tuned so torchlight bounced convincingly off a stone wall under the old baked system can go flat, or worse, wrong, under real-time GI that computes bounce differently scene to scene. Somebody had to walk back through Novigrad's alleys and White Orchard's interiors and check that the mood still held. That's the invisible labor a remaster list never itemizes, because there's no bullet for "confirmed six hundred interiors didn't go grey."

Subsurface scattering is the other one I'd watch for. It's cheap to announce and expensive to get right on human skin without everyone starting to look like they're made of wax — the failure mode is well known in the industry, and the first screenshots after launch will tell you fast whether the tuning pass actually happened or whether it's SSS turned on and left at the default.

## What the 2027 expansion inherits, and why that's the actual bet

Songs of the Past takes Geralt to Letten, a new region built around harvest festivals and rural folklore, with a new chain weapon for pulling enemies in. None of that has shipped, so there's nothing to critique yet. What's interesting is the sequencing: the expansion launches on top of the remastered renderer, not the other way around. CD Projekt Red is treating the lighting and shading overhaul as the foundation new content gets built on, which means the September release is really a stress test. If path tracing and the new GI hold up across a region built from scratch for it, the studio knows the pipeline is sound before a single asset in Letten ships.

I don't know what's inside CD Projekt's asset pipeline and I'm not going to pretend I do. But I've re-lit old scenes for a new solver before, on projects an order of magnitude smaller than a full open-world RPG, and the pattern holds regardless of scale: the hard part was never turning the new system on. It was going back through every space someone had carefully faked, and deciding which fakes still worked and which ones the new honesty exposed.
