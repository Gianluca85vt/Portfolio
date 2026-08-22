---
title: Foundation's season 3 VFX breakdowns are out, and the real flex is a station built as a working vehicle
date: 2026-08-22
category: Film & TV
excerpt: Framestore and Rodeo FX have published their breakdown reels for Foundation season 3, between them covering nearly a thousand shots. The plot is the Mule's rise. The production story is a 5km space station rigged to actually rotate, and a pipeline built to survive it.
cover: /img/blog/foundation-s3-vfx-clarion-station-instancing/shot-01.jpg
draft: true
---

**CGChannel** rounded up the breakdown reels for Foundation season 3 this
week, and between the two lead vendors — **Framestore** and **Rodeo FX** — you
get a decent map of where the season's budget actually went. Framestore
covered roughly **500 shots**, Rodeo FX **494**, and across all nine vendors
working the season (BOT VFX, Crafty Apes, Accenture Song, Outpost VFX, Otomo
FX, PFX, SSVFX among them) the total comes to something close to **4,000
shots** — about a thousand more than either of the first two seasons, mostly
because this year leans so much harder on environment extensions.

<figure>
  <button class="video-embed" data-video="1nQIpw23rcY" data-title="Foundation Season 3 | VFX Breakdown | Framestore" type="button">
    <img src="/img/blog/foundation-s3-vfx-clarion-station-instancing/video-thumb.jpg" loading="lazy" width="1440" height="810" alt="Still from Framestore's Foundation season 3 VFX breakdown reel" />
    <span class="play" aria-hidden="true"></span>
  </button>
  <figcaption>Framestore's own breakdown reel for the work, from the studio's official channel.</figcaption>
</figure>

## What each studio actually built

Framestore's headline piece, and the one that earned them a VES nomination,
is **Clarion Station** — a station roughly **5km wide** that isn't dressed as
a static backdrop but built and rigged as an actual vehicle, with three
separate habitat panels rotating independently, each running its own
day/night cycle. Inside that shell they built a "brutalist cyberpunk city"
and the mycelium-choked **Secretorium**, plus the **Novacula**, a weaponized
station built around a captured black hole.

Rodeo FX's work centers on **Kalgan**: the plateau confrontation between the
Mule and Bellarion, the villa where Toran and Bayta are introduced, and a
run of digital set extensions stitched onto physical locations rather than
built from nothing. They also handled the season's opening traveling shot —
mountains, waterfalls, buildings, one continuous move — and the fleet and
armada simulation work for the Mule's telepathic battle sequence.

None of that is unusual for a show this size. What's worth stopping on is
how they kept it buildable.

## The part that's actually hard: a station big enough to break your tools

A single static space station is a modeling and texturing problem. A station
that has to **rotate on camera, believably, across three independently
timed habitat rings, at a scale where individual buildings need to read as
buildings** is a completely different problem, and it's the one that
actually determines whether a shot like that is deliverable on a TV
schedule.

Framestore's answer was a **USD-based pipeline leaning hard on instancing** —
scattering hundreds of thousands of structures across the station's surface
as instanced geometry rather than unique authored assets, so the scene stays
light enough to move, light, and render at all. This is the same problem
every open-world game environment artist knows from the other direction:
you cannot hand-place a city, so you build a system that can multiply a
small kit into something that reads as a full one, and you spend your actual
craft time on making the kit and the placement rules good enough that
nobody notices the repetition. USD's whole reason to exist as a pipeline
format is exactly this — letting a scene of that size stay composed of
references and variants instead of baked-down unique geometry, so a
supervisor can still turn a dial three weeks before delivery.

Rodeo FX solved a smaller but stricter version of the same problem on
Kalgan: build to camera. Camera moves for the plateau and villa work were
locked from rough greyscale previs **before** the final environments were
built, referencing Lake Como for what the team called a "Techno Niagara
Falls" look. That ordering — lock the shot, then spend the environment
budget only where the lens will actually land — is standard practice, but
it's the difference between an environment team building a real place and
an environment team building the twelve square meters of it that will ever
appear in the frame.

<figure>
  <img src="/img/blog/foundation-s3-vfx-clarion-station-instancing/shot-01.jpg" loading="lazy" width="1440" height="810" alt="A vast rotating space station habitat interior with a curved horizon, illustrative of the Foundation season 3 Clarion Station environment" />
  <figcaption>Reference imagery for the kind of large rotating-habitat environment described in the breakdown. Foundation's own Clarion Station sequence is not pictured here.</figcaption>
</figure>

## Where virtual production lost to the older method, on purpose

The other detail worth flagging, reported separately by VFX Voice and Art of
VFX in interviews with production VFX supervisor Chris MacLean: Framestore's
London previz unit used **Unreal Engine** for early blocking on several
sequences, including the Flitter Bike chase — the standard playbook this
year for any big genre show. But the season's speeder-bike race, originally
planned as an on-set virtual-production sequence, got pulled back to a
**practical-and-CG hybrid** shot on greyscreen with hydraulic rigs instead.

That's the more interesting decision of the two, because it's a studio
choosing to walk back the trendier tool. Virtual production earns its keep
when a director needs to see the final environment lighting the actors'
faces and eyes in real time, on the day. It costs you when the sequence is
built around unpredictable physical performance — actors reacting to a rig
throwing them around — because a real hydraulic rig and a real greyscreen
give the actors and the camera operator something honest to react to, and
you composite the CG environment in after, once you're not fighting a
stage's on-set render budget for a shot that needed thirty takes anyway.
Nobody puts that decision in a press release. You only see it by noticing
which tool a studio picked for which shot type, and asking why.

Foundation season 3 finished airing in July. The breakdown reels are the
part that gets watched by maybe a tenth of the audience the finale did, and
they are the only part of the release that tells you anything about how the
next season's budget should actually be spent.
