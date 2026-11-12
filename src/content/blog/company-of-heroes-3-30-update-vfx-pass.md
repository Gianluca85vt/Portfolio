---
title: "Company of Heroes 3 3.0: snow on every top face"
date: 2026-11-12
category: 3D
excerpt: Relic's 3.0 update repaints the ground and relights the infantry. The detail that gives the art brief away is snow settling on the tops of crates.
cover: /img/blog/company-of-heroes-3-30-update-vfx-pass/shot-01.jpg
sources:
  - outlet: Rock Paper Shotgun
    url: https://www.rockpapershotgun.com/company-of-heroes-3-developer-admits-it-was-a-lot-to-make-the-30-overhaul-patch-alongside-regular-updates-singleplayer-dlc-and-a-whole-spinoff-game
  - outlet: Inven Global
    url: https://www.invenglobal.com/articles/28224/relic-launches-free-company-of-heroes-3-30-update-on-pc
artistView:
  take: "Read from the patch notes and Relic's own art diary rather than from play: this is a readability pass dressed as a beauty pass. Almost every item on the visual list exists because the camera sits high above the action looking down, which is the hardest brief in games art and the least discussed."
  works:
    - "VFX: letting sand, snow and mud accumulate on upward-facing surfaces is the correct fix for an overhead camera, where the top face of a crate is the face you actually see."
    - "Lighting: reworking soldier lighting at this distance is about value separation against the ground, not about skin shading nobody will ever resolve."
  misses:
    - "Atmospherics: heavier fog and smoke buy mood with silhouette contrast, and silhouette contrast is the information an RTS player cannot afford to lose."
    - "Scope: a visual pass this wide, built next to a DLC and a spinoff, is where a newly independent studio discovers the ceiling on what its art team can absorb."
---

Somewhere in the patch notes for Company of Heroes 3's 3.0 update, between the
artillery rebalancing and the economy rework, is a line saying that sand, snow
and mud can now be painted onto the tops of objects.

That one sat with me. It tells you exactly where the camera is.

Relic shipped 3.0 on 5 November 2026, free, to a game that went out in February
2023. The headline items are an overhauled VFX and audio pass, new autumn and
winter biomes, an updated grand strategy campaign and better unit AI. Rock
Paper Shotgun, who talked to the team before launch, got a developer admitting
it "was a lot" to build alongside the regular update cadence, a singleplayer
DLC and a whole spinoff.

## The top of the crate is the hero surface

Work on a shooter and you detail the sides of things. Eye height, waist height,
the band of the model a player's face ends up level with — that is where the
texture budget goes, and the top of a shipping container can be a flat tiling
pass nobody will ever look at.

Invert the camera and that economy inverts with it. An RTS looks down. The
upward-facing surface of every prop on the map is permanently presented to the
player, at every moment, on every unit of the playfield. Which creates a
specific failure: put a weather system on the terrain only, and the first time
it snows your ground goes white while every crate, wall cap and wrecked chassis
stays summer-brown. The map reads as two different seasons stacked on each
other.

Painting accumulation onto those surfaces is the fix, and it is cheap. You
sample a mask projected down the world Y axis, gate it on how far each surface
normal points at the sky, and blend a snow or mud material over whatever was
there. Shader cost close to nothing, art cost close to nothing, and it repairs
the one discontinuity an overhead camera has no way to hide.

Dynamic terrain wetness, listed alongside it, is the same thought applied to
the ground plane — the surface darkens and goes specular as rain lands, instead
of weather being a particle effect playing in front of a dry world.

## Relighting men who are barely a silhouette

The other item I keep turning over is "better soldier lighting."

At CoH3's camera a rifleman is a small smear of pixels. You are not resolving a
face. You are not resolving a webbing strap. What you need to resolve, in a
quarter of a second, during a firefight, is: how many of them, which way are
they facing, and are they mine. That read comes almost entirely from value —
how far the silhouette separates from the ground underneath it.

So relighting characters in an RTS is not a beauty job. It is a legibility job
with a lighting rig attached. Rim light that would look cheap at head height
becomes load-bearing up there, because it is the thing drawing an edge
between a prone squad and the dirt it is lying in. Get it wrong and you have
not made the game uglier, you have made it harder to play.

Which is where the new atmospheric fog and smoke worry me slightly, from the
outside. Fog is the oldest trick in environment art and it earns its keep three
ways at once — depth cue, draw-distance mask, mood. It also eats contrast, and
contrast is what the previous paragraph was about. Whether the trade lands is
not something a patch note can tell me. Fog tuned on a cinematic angle and fog
tuned on the play camera are two different jobs, and only one of them is the
game.

## A free overhaul from a studio that nearly did not exist

The context around the patch is as interesting as the patch. Relic were sold
out of Sega in 2024 to a UK investment firm, and CEO Justin Dowdeswell told RPS
that keeping the Company of Heroes rights was non-negotiable in that deal —
"Without it we would have been a dead studio." Not just for the ability to make
more of them. For the back catalogue income a series like that keeps throwing
off while you build the next thing.

Seen from there, a free visual overhaul on a nearly four-year-old RTS is not
charity. It is maintenance on the asset that pays the rent. The same logic ran
through [Football Manager 27 spending its release repairing what FM26
broke](/blog/football-manager-27-review/) — a studio returning to shipped work
because the shipped work is the business, not because anyone asked nicely.

It also sits at the better end of a trend this blog keeps bumping into. When
[2,924 games used early access as their launch
in 2026](/blog/early-access-is-the-launch-2924-games/), the ship-then-fix model
mostly means charging money for an unfinished thing. CoH3 charged full price in
2023 and is still doing unpaid work on it in 2026. That is the same model run
honestly, and it is rarer.

<figure>
  <button class="video-embed" data-video="fpDNAQuWf1o" data-title="Company of Heroes 3 — 3.0 Update Developer Diary Part 1 - Art &amp; Audio" type="button">
    <img src="/img/blog/company-of-heroes-3-30-update-vfx-pass/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Relic's Company of Heroes 3 art and audio developer diary" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Relic's own Art &amp; Audio diary for 3.0, posted in mid-October 2026, where the visual and effects work is walked through by the developers who did it. Part 2 covers gameplay.</figcaption>
</figure>

## What the lists disagree about

The new maps being named in coverage are Ancona Railyard, Vire River Valley,
Foggia Winter, Turin Steelworks and Mammut Radar Station. Reports do not agree
on how that breaks down: some count all of them as new, at least one has three
existing maps receiving visual refreshes rather than additions. Industrial sits
alongside autumn and winter in the biome list depending on who is counting.

On audio, weapon fire, impacts, explosions and vehicle destruction were all
reworked, and tracks from the first two Company of Heroes games are in the
soundtrack now because the series is twenty this year.

What I cannot tell you from here is how the fog reads during an actual
four-player match, or what the wetness shader does to the frame budget on a
laptop. Those need hours in it. The patch notes are a statement of intent, and
on the evidence of the intent somebody on that team understands precisely which
surfaces their players are looking at.
