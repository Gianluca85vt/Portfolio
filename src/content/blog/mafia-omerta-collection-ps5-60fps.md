---
title: "Mafia on PS5 hits 60fps: the engine story"
date: 2026-08-15
category: Games
excerpt: The Omertà Collection gave Mafia Definitive Edition a free native 60fps rebuild on PS5 — but left Mafia II and III untouched.
cover: /img/blog/mafia-omerta-collection-ps5-60fps/shot-01.jpg
---

2K shipped **Mafia: The Omertà Collection** on 14th August, bundling all three
Definitive Editions of the original trilogy alongside *Mafia: The Old Country* and
its *Man of Honor* DLC. Buried in the launch was a quieter piece of news: **Mafia:
Definitive Edition** — the 2020 remake of the 2002 original — got a free native
PS5 and Xbox Series X/S patch, unlocking a stable 60fps and picking up unspecified
"technical improvements" along the way, [as reported by Push
Square](https://www.pushsquare.com/news/2026/08/mafia-remake-joins-the-old-country-on-ps5-in-full-series-collection-with-60fps-visual-upgrades).
Anyone who already owned it gets the upgrade for nothing.

**Mafia II** and **Mafia III Definitive Edition**, sitting in the same collection,
did not get the same treatment. They're the same PS4-era builds running in
backward compatibility, same as before. That asymmetry is the more interesting
story here, and it's an engine story before it's a frame-rate one.

## Backward compatible isn't the same as native

<figure>
  <img src="/img/blog/mafia-omerta-collection-ps5-60fps/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>2K / Hangar 13, via the Mafia: Definitive Edition Steam store page</figcaption>
</figure>

Before this patch, Mafia: Definitive Edition on PS5 ran the way most PS4 games
still do on current-gen consoles — through backward compatibility, which mostly
means the console clocks its CPU and GPU higher and lets the original build run
faster, capped wherever the game itself capped it. That's why it sat locked at
30fps despite years of spare GPU headroom sitting on the table: the engine loop,
the streaming system, the systems that decide how much geometry and texture data
to pull in before the next frame, were all still ticking to a budget authored for
PS4 hardware in 2020. Backward compatibility raises the ceiling. It doesn't
retune the room.

A native patch is a different job. It means going back into the build and
re-authoring the systems that were tuned around a 30fps frame budget so they hold
up at half the time per frame. Streaming has to pull geometry and textures in
twice as fast to stay ahead of the camera before pop-in becomes visible. Shadow
cascades and LOD transition distances, both tuned against how much frame time is
available to spend on them, need re-balancing. Dynamic resolution scaling — the
system that trades pixel count for frame time when a scene gets heavy — needs a
wider range to lean on, because there's a lot less time to fall back into. That
is ordinary technical-art work that still eats real weeks. It is the
unglamorous half of what "next-gen patch" means whenever a studio actually does
it properly instead of just relaxing the frame cap and hoping.

## Why only one of the three games got it

Here's the detail that makes this worth a longer look: Mafia: Definitive Edition
does not run on Unreal Engine. It runs on a proprietary Hangar 13 engine, one
built out of the cinematic tech the studio developed for Mafia III. That's the
studio's own, decades-deep in-house technology — not an industry-standard engine
with a scalability system built by someone else. *Mafia: The Old Country*, by
contrast, is the first Hangar 13 game built on Unreal Engine 5, a genuine break
from over twenty years of proprietary tooling, [according to Hangar 13's own
comments to Unreal
Engine](https://www.unrealengine.com/developer-interviews/mafia-the-old-country-making-the-old-feel-new-with-unreal-engine-5).

That means this collection quietly contains two completely different rendering
stacks under one banner. Old Country was scoped for current-gen from day one, on
an engine that ships with mature scalability groups and platform-target profiles
out of the box — hitting a 60fps mode there is largely a tuning exercise inside
tools built for exactly that. Retargeting Definitive Edition's frame rate meant
going back into bespoke, in-house systems with no outside engine team's
scalability work to lean on, on a nearly six-year-old codebase, with whatever
internal team still maintains it. That's a heavier lift for a smaller
studio, and it's a reasonable guess — though 2K hasn't confirmed this directly —
for why Mafia II and III's Definitive Editions, built on still older,
likely different tooling from their 2010 and 2016 originals, didn't get pulled
along for the ride. Full engine parity across a trilogy remaster was apparently
never the goal; getting the flagship of the three onto current hardware properly
was.

## The part worth remembering

The marketing copy skips all of it and says "60FPS, Visual
Upgrades" and moves on. But it's a decent, concrete example of something I keep
running into from the technical-art side: a frame-rate number in a patch note is
never really about the frame rate. It's a proxy for how much of a game's
underlying systems got touched to get there, and whether the team doing it was
working with tools built for the job or fighting a decades-old proprietary stack
to make it happen. Judged on that basis, Mafia's free 60fps patch is a bigger
piece of work than the one line in the changelog suggests — and the fact that
Mafia II and III didn't get the same treatment tells you almost as much as the
patch itself does.

*Sourced from Push Square's coverage of the Omertà Collection launch and Hangar
13's own comments on Mafia: The Old Country's move to Unreal Engine 5, published
via Unreal Engine's developer interview series. 2K has not published detailed
patch notes for the Definitive Edition update beyond confirming 60fps support and
unspecified technical improvements.*
