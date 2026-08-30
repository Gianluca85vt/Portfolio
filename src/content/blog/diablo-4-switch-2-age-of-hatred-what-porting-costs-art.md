---
title: What porting Diablo 4 to Switch 2 costs the art team
date: 2026-08-18
category: Games
excerpt: A leaked Age of Hatred Collection would put Diablo 4 and both its expansions on Switch 2 next month.
cover: /img/blog/diablo-4-switch-2-age-of-hatred-what-porting-costs-art/shot-01.jpg
---

[Eurogamer reported this week](https://www.eurogamer.net/diablo-4-switch-2-release-date-rumour-expansions)
that Diablo 4 is headed to Switch 2, bundled with both expansions —
Vessel of Hatred and Lord of Hatred — as an "Age of Hatred Collection,"
reportedly landing 15th September, days after BlizzCon. It's not just one
outlet's sourcing — VGC, Nintendo Life, Nintendo Wire and several others
have converged on the same leak, traced back to Dealabs leaker
billbil-kun and backed up by age-rating listings in Indonesia and Taiwan
that already list Switch 2 as a platform. But it's still a leak, not an
announcement: when Eurogamer asked Blizzard directly, the studio said it
had "nothing to comment on." The closest thing to an official word is
Diablo's series head telling TechRadar there's "opportunity" for Diablo 4
on Switch 2, while adding that live-service games have historically been
"a little bit challenging" on Switch hardware — which is commentary, not
a confirmation. I'm flagging the sourcing up front because I'd rather say
plainly that this rests on unconfirmed leaks than let it read like news.

But assume for a second it's true, because the premise is the interesting
bit regardless of the exact date. Diablo 4 has never shipped on a Nintendo
platform. The original Switch was never going to run it — this is a game
that puts a boss, forty adds, three players' worth of skill-effect
particles and a screen-filling blizzard of damage numbers in the same frame
and expects it to hold up. That's the actual engineering problem a Switch 2
version has to solve, and it's worth walking through, because it's the same
problem every "surprise" hybrid-console port of a dense AAA game runs into.

## The thing that makes Diablo 4 hard to port isn't the world, it's the noise

<figure>
  <img src="/img/blog/diablo-4-switch-2-age-of-hatred-what-porting-costs-art/shot-01.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Blizzard Entertainment, via the official Diablo IV Steam page</figcaption>
</figure>

Open-world ports usually get discussed in terms of draw distance and
texture resolution — how far you can see, how sharp the ground looks up
close. Those matter here too, but Diablo 4's real budget killer is
mid-combat overdraw: dozens of enemies, each with their own particle and
shader effects, stacked in the same screen space during a pack fight. On
PC and current-gen consoles that's handled with a GPU that can afford to
brute-force a lot of overlapping transparency. Switch 2's chip is a custom
Nvidia Ampere-based part (codenamed T239) with an 8-core ARM CPU, 12GB of
RAM — about 9GB of it usable by a game — and a GPU rated around 1.7
teraflops in handheld mode, roughly 3 in docked mode. That's a genuine step
up from the original Switch, and DLSS support is a big part of why a port
like this is even on the table, but it's still a fraction of a PS5's or a
gaming PC's silicon. It cannot brute-force Diablo 4's overdraw and hold a
stable frame rate, docked or handheld.

So the studio doing this port (Blizzard hasn't said who, if anyone, is
doing the work) is looking at the same short list every team hits when a
particle-heavy game goes to a hybrid console:

- **Cap and cull effect density before it hits the GPU**, not after —
  fewer simultaneous particle emitters per enemy, aggressive distance and
  screen-space culling on secondary effects, so a forty-monster pull reads
  as chaotic without every monster's death nova actually rendering at
  once.
- **Dynamic resolution scaling, probably paired with DLSS**, since that's
  the entire reason Switch 2's Nvidia chip is a meaningfully different
  proposition than the original Switch's — it can reconstruct a
  lower-rendered frame back up to something presentable, which is often
  the difference between "portable Diablo 4" and "no Diablo 4 at all."
- **Simplified skill-effect shaders for high-population fights specifically**,
  not globally — keep the game looking like Diablo 4 during exploration
  and boss one-on-ones, where the budget exists, and spend the savings on
  the pack-fight moments where it doesn't.

I haven't seen this build and I'm not claiming inside knowledge of
Blizzard's pipeline — this is the standard playbook, the same one every
particle-dense game reaches for on this class of hardware, not a confirmed
account of what's shipping. But the other Switch 2 ports out this year give
a real sense of the range of outcomes. Cyberpunk 2077 landed around
1080p/30fps docked and 720p handheld, with a higher-framerate performance
mode; Hogwarts Legacy runs 4K/30fps docked via DLSS upscaling and 1080p
handheld, clearly cut back versus its PS5 build. Elden Ring's "Tarnished
Edition" is the cautionary tale worth knowing: its Gamescom 2025 demo ran
at an infamous 15fps, and it took FromSoftware fixing a CPU bottleneck to
get it to a stable-ish 30fps docked and 30-40fps handheld in time for its
August 2026 launch. That's the actual range a Diablo 4 port would be
gambling inside — from "convincingly holds up" to "needs a public course
correction before launch" — and nothing reported so far says which end
this one lands on.

## Bundling both expansions changes the shape of the problem too

Shipping Vessel of Hatred and Lord of Hatred in the same collection means
the Switch 2 version has to hold this budget across three campaigns' worth
of biomes and boss encounters, not one. That's more content that needs the
same treatment, which is usually why a port like this trails the original
release by a year or more rather than launching day-and-date — there's no
shortcut that lets you tune the effect budget once and have it hold for
every fight in the game. Every dense encounter gets checked by hand against
whatever the target frame time is.

## Why I'm watching this instead of shrugging at "another port"

Because if it's real, it's a decent read on where the ceiling actually
sits for what a hybrid-console chip can carry from a game that was never
designed with one in mind. Switch 2 has already taken swings at demanding
ports this year, and each one is a data point on the same question: how
much of "current-gen AAA" survives the trip, and what gets cut first to
get it there. For a loot-and-particle game like Diablo 4, the honest
answer is probably "the noise" — and if Blizzard ships this well, the
version of the port worth studying isn't the resolution number on the box,
it's which pack-fight moments still feel like Diablo 4 once the effect
budget gets cut down to size.

*Release date, bundle contents and the BlizzCon-adjacent timing are from
Eurogamer's report, corroborated by VGC, Nintendo Life and others tracing
back to the same leak — none of it confirmed by Blizzard, which has
declined to comment. Switch 2's hardware specs and the Cyberpunk 2077,
Hogwarts Legacy and Elden Ring Tarnished Edition comparisons are drawn
from public reporting on those ports. The technical breakdown of what a
Diablo 4 port specifically would need to cut is my own reasoning about the
standard approach to porting a particle-dense game to this hardware, not a
description of a confirmed build.*
