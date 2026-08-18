---
title: Ikkis spent eight months building tanks that actually drive, and VFX still had a job
date: 2026-08-18
category: 3D
excerpt: CGChannel ran ReDefine's breakdown for the tank battle in Ikkis, a film about the 1971 Battle of Basantar. The production built functional Centurion and Patton replicas from scratch — the more interesting decision is what they left for the VFX team to do.
cover: /img/blog/ikkis-tanks-practical-build-vfx-breakdown/shot-01.jpg
---

CGChannel posted a short piece today on **ReDefine's** VFX breakdown for
**Ikkis**, Sriram Raghavan's film about Second Lieutenant Arun Khetarpal —
India's youngest Param Vir Chakra recipient, killed at 21 defending a
bridgehead during the **Battle of Basantar** in December 1971. The title
means "twenty-one" in Hindi. The write-up calls the tank combat sequences
visceral, which tracks with everything else reported about the shoot: the
production built **functional replica tanks** — Centurion and Patton, the
two types that actually fought at Basantar — from scratch, over roughly
eight months, specifically so the actors could be filmed driving and firing
from real machines instead of a greenscreen stage.

<figure>
  <img src="/img/blog/ikkis-tanks-practical-build-vfx-breakdown/shot-01.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>A Centurion Mk.7, the same tank type the Ikkis production built working replicas of. Photo via Wikimedia Commons.</figcaption>
</figure>

That order of operations is the part worth sitting with. Most coverage of a
VFX breakdown treats CG as the thing that made the sequence possible. Here
it's the opposite: the practical build is what made the sequence *readable*,
and the VFX exists to do the things eight months of fabrication couldn't.

## Why you build the tank before you render it

A tracked vehicle is one of the hardest objects to fake convincingly at full
scale, and not for the reasons a hard-surface artist usually worries about.
It's not the model — a Centurion's hull and turret are straightforward
geometry by tank standards. It's what the vehicle *does* to everything
around it. Forty-plus tonnes of steel on tracks displaces ground in a way
that's specific and hard to fake: dust doesn't billow, it gets punched out
sideways in short bursts timed to the track's contact with the earth. The
hull doesn't glide, it pitches and yaws over uneven terrain with a mass that
reads in how slowly it settles. And a real tank interior gives you real bounce,
real engine vibration, and real light bouncing off gun-metal at angles a
lighting rig would otherwise have to invent frame by frame. An actor braced
against an actual hull, lit by an actual sky, is a reference no simulation
fully replaces — it's why practical vehicle builds still win out over CG
ones on almost any war film with a budget to support them.

What a practical build can't give you is scale. Basantar was fought by
armoured regiments, not two tanks in a field — the historical engagement
involved dozens of vehicles across a wide front. You don't build sixty
functional replicas; you build a handful of hero units the camera gets close
to, and VFX does the rest: multiplying the tank count for wide shots, adding
the muzzle flashes and impact debris that are safer simulated than staged
live around a working vehicle, extending the terrain past what the location
could offer, and matching digital-tank material response — the gun-metal
specularity, the dust caking into the tracks, the same battle damage
progressing consistently — to whatever the practical units were built and
lit to look like. That last one is the actual hand-off point between the
art department and the VFX team: the CG tanks aren't a separate design,
they're a texture and shading match-target against physical reference that
already exists on set, which is a much narrower and more disciplined brief
than building a hero asset from a concept sheet.

## The tell is in what doesn't get automated

It's a good discipline to notice which decisions get made with a fabrication
shop and which get made with a render farm, because the split usually maps
to which qualities the human eye actually catches. Weight, contact and
occlusion under strong sunlight are things audiences clock instinctively
even if they can't name what's wrong — they're exactly what a physical
object gives you for free and a simulation has to earn. Scale, quantity and
anything genuinely too dangerous to stage live are the opposite: things an
audience accepts as CG without penalty, because there's no equally strong
physical intuition to violate. Ikkis apparently drew that line the way most
serious war productions do — real hardware for what the camera and the actor
touch, digital hardware for what the story needs more of than a production
could safely or affordably build.

*Everything above comes from CGChannel's brief coverage of ReDefine's
breakdown and separately reported details on the production's tank-building
process — I haven't seen the full breakdown video or the film itself, so
treat the specifics of ReDefine's actual VFX pipeline as unconfirmed beyond
what's been reported.*
