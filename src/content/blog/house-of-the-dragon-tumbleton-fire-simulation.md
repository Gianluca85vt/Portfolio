---
title: "House of the Dragon: scaling Tumbleton's fire"
date: 2026-10-02
category: Film & TV
excerpt: Rodeo FX's new talk on the season 3 finale is about scaling a fire sim to a whole battlefield. HBO put a real flamethrower behind the gate.
cover: /img/blog/house-of-the-dragon-tumbleton-fire-simulation/shot-01.jpg
sources:
  - outlet: befores & afters
    url: https://beforesandafters.com/2026/10/01/watch-this-sidefx-presentation-on-rodeo-fxs-vfx-for-s3-of-house-of-the-dragon/
  - outlet: Screen Realm
    url: https://screenrealm.com/house-of-the-dragon-season-3-finale-behind-the-scenes/
artistView:
  take: "Read the title of Rodeo FX's talk and the hard part is named for you: workflow. A barrage of dragonfire over an army is won in cache sizes and iteration time, and a fire supervisor choosing to stand up and talk about pipeline says where the season's pain sat."
  works:
    - "FX: the finale treats dragonfire as weather rather than as a weapon — sustained, spread across the field, settling — which is the choice that sells the scale."
    - "Lighting: a real flamethrower firing through the gate buys moving coloured light on faces, armour and smoke, and gives the lighting team a ground truth instead of a comp-side glow to argue about."
    - "Previs: building Tumbleton as a 1/100 model before anything burned fixes the one thing a fire sim cannot guess, which is how big the fire is supposed to be."
  misses:
    - "Credit: eight vendors worked the season and there is still no public breakdown of who solved what. One conference talk and a general featurette is a thin record for a sequence this size."
---

The Battle of Tumbleton closed House of the Dragon's third season on **9
August**, eight episodes after the season opened on 21 June. When the wall of
fire comes through the town gate, a good part of what you are watching is a
real flame. HBO's behind-the-scenes featurette describes a flamethrower set up
on the far side of the gate, firing through the structure, with the dragon
Caraxes digital above it.

A conference talk doing the rounds this week fills in the other half. At Houdini HIVE Equinox
2026 on 22 September, Bahador Mehrpouya, FX supervisor at Rodeo FX, gave a
talk called "Raining Fire: Building the Battle of Tumbleton's Fire Simulation
for House of the Dragon Season 3", and befores & afters pointed at the
recording on 1 October, which is how I came to it.

I should say up front that I have not watched it. The pages hosting it are
closed to me from here, so what follows is read off the session abstract and
off what the production has said publicly about the shoot. The abstract is
unusually specific about where the difficulty sat, which is enough to work
with.

Three things, in its own order: scaling fire simulation to battlefield
proportions, the look-development choices that gave Tumbleton its visual
signature, and the workflow innovations the production developed to get there.

## Fire does not scale

<figure>
  <img src="/img/blog/house-of-the-dragon-tumbleton-fire-simulation/shot-01.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Fire performers, Wikimedia Commons (free licence) — reference for how a large flame behaves, not a still from House of the Dragon. HBO's season 3 stills sit behind a login on press.wbd.com and could not be fetched.</figcaption>
</figure>

A dragon breathing once at a castle gate is a single simulation. You can throw
resolution at it, push it through a few rounds of notes, cache it and hand it
to lighting. Season three asked for something different — per the abstract,
dragonfire as a sustained, sky-wide barrage coming down on whole armies rather
than one dramatic strike.

The reason that is hard is that fire genuinely does not scale. A pyro solve is driven by physical quantities: buoyancy,
cooling rate, the size of the voxels you are sampling turbulence into. Take
the setup that gives you a convincing one-metre flame, scale the whole thing
up until it covers a field, and what you get reads like a tabletop effect shot
in slow motion. Too much fine curl. Dissipation that happens far too quickly
for the mass on screen. Smoke that has lost its argument with the flame
feeding it.

Big fire behaves differently. It moves slower than you expect, holds its gross
shape much longer, and loses its detail at the edges rather than throughout.
Finding that is look-dev the first time. After that it is arithmetic, because
every one of those qualities costs voxels.

And there is never one of them. A barrage means dozens of sources that have to
agree — with each other, with the plate, and with the dragons flying over the
top. Same cooling, so two fires at the same height are the same colour. Same
timing, so the fire lands when the wing beat says it should. Same light
reaching the same armour in the foreground. Holding agreement across dozens of
simulations is a different discipline from making one of them beautiful, and
it is the one that eats schedules.

## Why workflow is the word in the title

Put rough numbers on a sequence like this — mine, not Rodeo FX's — and the shape of the problem shows
up. Volume caches at battlefield scale run into terabytes. Solves run
overnight, sometimes across a weekend. The note that changes the timing of the
barrage arrives after the cache is written, because that is when the sequence
first becomes watchable.

A pipeline that answers a late note by re-simulating everything will lose. So
the interesting work in a sequence like Tumbleton goes into layering: a few
hero solves carrying the look, cheaper elements filling the field, and a
structure that lets you add or retime a layer without touching the ones
already signed off. The blog covered a neat version of that problem earlier this week
in Houdini's own toolset — [adding fracture detail to a rigid-body sim that
has already been
approved](/blog/houdini-layered-rbd-fracture-approved-sim/) rather than
re-running it. Same instinct, different solver. Protect the cache you have
already paid for.

It also rhymes with the season's other big set piece. When I went through the
Battle of the Gullet in August, [the ships turned out to be the hard
part](/blog/house-of-the-dragon-battle-of-the-gullet-vfx/) — an asset and
pipeline story wearing a dragon story's clothes. Two set pieces, two
departments, the same conclusion about where a season of this size is
won.

## The flamethrower earns its place

A show with eight visual effects vendors on it could have made that gate fire
entirely in Houdini. Putting a real flamethrower behind a practical set still
pays, for reasons that have nothing to do with purism.

Interactive light is the big one. Real flame throws moving, uneven, coloured
light onto faces, onto wet stone, onto the inside of smoke, and it does it
with the falloff and the flicker that a comp-side glow only approximates.
Lighting gets a ground truth to match instead of a taste argument. The cast
get something to flinch at.

Then there is the look target. Once a plate carries real fire, every simulation
cut next to it is judged against that reference rather than against the
memory of the last fire the department made. That constraint is what keeps a
long fire sequence from drifting into orange soup by episode's end.

And the small things nobody budgets to model: ash, heat shimmer off the ground,
the way a lens responds when something that bright enters frame.

The 1/100-scale model of Tumbleton the production built before shooting is
part of the same logic. A fire simulation has no opinion about how large the
town is. Somebody has to decide, early, and hold everyone to it.

## What is still not public

Rodeo FX shared the season with Pixomondo, Weta FX, RVX, Zoic Studios, Red
Visual Effects, Digital Domain and Incessant Rain Studios. Beyond the fire
work in this one talk, there is no shot-level account of who delivered what,
which for a season built on two enormous battles is a thin public record.

The recording is out there, and it is the part I want. An abstract will tell
you that scale was the problem. Only the talk will say what they did about it.
