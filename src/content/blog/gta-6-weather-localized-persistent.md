---
title: "GTA 6 weather is localized now. That costs CPU."
date: 2026-10-01
category: Games
excerpt: Rockstar re-engineered GTA 6's weather to be localized and persistent. Those two words break assumptions an open world of that size is usually built on.
cover: /img/blog/gta-6-weather-localized-persistent/video-thumb.jpg
sources:
  - outlet: Eurogamer
    url: https://www.eurogamer.net/gta6-rockstar-weather-systems-hurricanes-rainbows-rain
  - outlet: GamesRadar+
    url: https://www.gamesradar.com/games/grand-theft-auto/gta-6s-weather-is-completely-re-engineered-from-red-dead-redemption-2-and-it-has-hurricanes-rainbows-proper-cloud-formations-and-more/
artistView:
  take: "A weather system that varies across space and remembers what it did is a different piece of software from one that blends between presets on a timer, and from what Rockstar described on 30 September this is the former. The hurricanes are the marketing; the puddles that outlast the rain are the engineering."
  works:
    - "Lighting: tying the cloudscape to the lighting and rendering department rather than VFX is the right call — clouds that actually occlude the sun are a lighting system wearing a weather costume."
    - "Environment: localized wind that offshore breezes and building geometry both feed into is the detail that sells a coastline, and it is the sort of thing that normally gets cut for being invisible in a trailer."
    - "Rendering: rainbows are a good tell. You only get one cheaply if the sky model already knows the sun angle and where the rain cell is, so their presence suggests the data is real rather than painted."
  misses:
    - "Pipeline: persistent surface wetness means state that has to be saved, streamed and resolved at region boundaries — the stage where this class of system historically produces seams an artist gets asked to hide."
    - "Communication: Rockstar declined to say how often hurricanes occur or whether they touch the story, which leaves open whether this is a simulation or a scripted set piece wearing simulation clothes."
draft: true
---

Owen Shepherd, Rockstar's vice president of art for lighting and rendering,
described *Grand Theft Auto VI*'s weather in detail on 30 September, seven weeks
out from the 19 November release. Hurricanes got the headlines, and they will
photograph well. The two adjectives in his description are where the work is:
Rockstar, he says, "re-engineered our weather system to make everything much
more localized and persistent."

Both of those words cost money.

## One number for the whole world

Weather in an open world of this lineage has historically been a single global
value. The game holds a state — clear, overcast, rain, thunder — and
interpolates between authored presets on a timer. Every system that cares about
weather reads that one value. The sky dome takes its colours from it. The
wet-surface parameter in the road material is driven by it. Ambient audio
crossfades on it. Particle emitters switch on and off against it.

It is cheap, it is trivial to debug, and it has one property that becomes
obvious the moment you look for it: when it rains in Vice City, it is raining on
every square metre of Leonida at the same intensity. *Red Dead Redemption 2* did
beautiful things inside that constraint. Its storms are still some of the best
weather art shipped in a game. They were also, everywhere on the map at once,
the same storm.

Make weather localized and that single value becomes a field — something that
varies across space, which means something has to store it, sample it and
interpolate it. In practice that is a coarse grid over the world, updated on a
slow tick, with a handful of weather cells drifting across it. Low resolution is
fine. The expense is not the grid.

The expense is that every consumer of weather now needs a position before it can
ask a question. The road shader can no longer read a global uniform for how wet
it is; it needs to sample a mask. Audio needs to know whether the rain is on this
block or four blocks east. Traffic and pedestrian density, if they respond to
weather at all, respond differently in different districts. Shepherd's wind
description gives the shape of it — offshore breezes after sunset, warm air
rising, buildings blocking the flow, debris swirling on rooftops. All of that describes a wind
volume with the city's own geometry feeding into it, and anything reading wind
has to read it per-position.

## Persistence is the part I would worry about

Rockstar's own example is wet ground and puddles that mark where rain has
recently fallen. Which means the world carries a memory of weather that has
already finished.

Surface wetness stops being a value derived from the current sky and becomes
accumulated state. It fills while the rain is over a region and drains at some
rate afterwards, and that rate probably varies by material, because asphalt and
grass and sand do not shed water alike. That state has to live somewhere.
Somewhere that survives the player driving two kilometres away and the region
streaming out, and survives a save and a reload, and resolves without a visible
line where one region meets its drier neighbour.

Seams at region boundaries are the failure mode here, and they are the kind of
problem that lands on an environment artist's desk as "can you hide this".

A rainbow, by contrast, is nearly free once the rest exists. You need the sun
angle and the position and extent of a rain cell, and a localized system already
holds both. Rainbows appearing at all is a decent signal that the weather data is
physical rather than authored — nobody hand-places a rainbow in a world this
size.

<figure>
  <button class="video-embed" data-video="wSm9GTUttBs" data-title="GTA 6 (Grand Theft Auto 6) - Official Extended Gameplay" type="button">
    <img src="/img/blog/gta-6-weather-localized-persistent/video-thumb.jpg" loading="lazy" width="1280" height="720" alt="Still from Grand Theft Auto VI: An Extended Look" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>The 27-minute Extended Look from 27 August 2026, via IGN's upload — Rockstar's own copy is age-restricted and will not play outside YouTube. The cloud formations and the wet streets described above are visible in it, which is the only footage any of this can be checked against so far.</figcaption>
</figure>

## What it does to the budget

Volumetric clouds that are advected across the sky and occlude the sun are a
per-frame cost that scales with screen coverage, and they are the one item on
this list I would expect to be measurable on a frame graph. Shepherd's
department owning them — lighting and rendering, not VFX — tells you how they are
being treated. Clouds that cast real shadows across a city are a lighting
system.

That matters for the argument everyone was having in August. When Rockstar put 27
minutes of footage out, nobody at the studio confirmed a frame rate, and
[the reasoning behind the 30fps deduction was always the CPU rather than the
GPU](/blog/gta-6-extended-look-30fps-question/). Localized weather pushes in the
same direction. A global weather value is one float read by everything; a weather
field is spatial queries, per-region state, and simulation ticks that keep
running whether or not the player is looking. Those are CPU costs. The clouds are
the GPU half.

It is worth saying what the opposite choice looks like. Insomniac
[got ray tracing running at 60fps on a base PS5](/blog/marvels-wolverine-ray-tracing-60fps-base-ps5/)
by being ruthless about where the budget went. Rockstar appears to be spending
its on systems that are mostly invisible in any given five seconds and only
legible over hours. Both are defensible. They produce very different games.

And there is a real hole in what we know. Rockstar declined to say how often
hurricanes occur, or whether they affect the story at all. Until somebody plays
it, a hurricane could be an emergent event the weather field occasionally
produces, or it could be a scripted sequence that fires once in act two with a
simulation-shaped announcement attached. The puddles are the thing to watch. If
wetness is still draining off the pavement twenty minutes after a storm has
moved inland, the field is real.
