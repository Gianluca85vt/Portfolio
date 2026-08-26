---
title: One artist, hundreds of houses — the case for building a generator instead of a building
date: 2026-08-25
category: 3D
excerpt: A breakdown of Ezequiel Grand's commercial VFX career, published on 80.lv, traces how a Paul McCartney tour deadline pushed him into procedural Houdini work. The underlying lesson holds for anyone stuck modeling the fortieth near-identical building by hand.
cover: /img/blog/houdini-procedural-house-generator/cover.svg
---

80.lv published a breakdown of Ezequiel Grand's career this week — an Argentinian 3D
artist based in Los Angeles who has done commercial and concert-visual work for
brands including Apple, Nike, Adidas and FIFA, and toured visuals for acts like Paul
McCartney and Black Eyed Peas. The interesting part, for anyone who spends their day
in a DCC rather than reading about one, is not the client list. It is the specific
deadline that pushed him from modeling buildings by hand to building a tool that
generates them.

## The problem that actually forces the switch

<figure>
  <img src="/img/blog/houdini-procedural-house-generator/shot-01.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>SideFX, Houdini wordmark, via Wikimedia Commons (public domain text logo)</figcaption>
</figure>

Around 2018, Grand worked on visuals for Paul McCartney's Freshen Up Tour, a job that
needed several distinct environments — desert, underwater, more — built fast enough
to hit a touring production's schedule. Underwater meant FLIP simulations for the
waterfalls and grain sims for sediment; desert meant terrain generation. And
somewhere in the brief was a large number of buildings that all needed to look
plausible, vary enough not to read as copy-pasted, and exist well before the
schedule would tolerate modeling them one at a time.

That is the moment every environment artist eventually hits, on a smaller scale:
the fortieth building on a block, the twentieth crate variant, the tenth near-
identical rock formation. Model it by hand and the schedule eats you. Grand's answer
was to build a procedural house generator in Houdini instead — a network that
exposes parameters for footprint dimensions, height, window count, roof design and
other architectural features, so that variation becomes a matter of turning dials
rather than opening a new file.

## Why "expose the parameters" is the actual craft

It's worth being precise about what separates a procedural generator from a pile of
Houdini nodes that happen to make a house shape once. The difference is packaging:
wrapping a network of SOPs into a proper digital asset (an HDA) with named,
meaningful parameters on the outside, rather than leaving every control buried
three subnetworks deep where only the person who built it can safely touch it.

Done that way, a generator earns its cost back three times over on a job like a
touring visual package:

- **Iteration speed.** Changing "make it taller" or "give it a pitched roof" is a
  slider, not a remodel. On a schedule as tight as a concert tour's, that difference
  is the whole reason the tool exists.
- **Consistency across shots.** Every building comes out of the same underlying
  logic, so a client note like "the roofs read too uniform" can be fixed once, in
  the generator, instead of hunted down across forty individual meshes.
- **Reuse past the one job.** A generator built to hit one deadline keeps paying
  rent afterward — the same network, or pieces of it, showing up in the next
  environment brief that needs plausible-but-varied buildings fast.

None of that is exotic to anyone who already works procedurally. What the breakdown
is actually useful for is the reminder of where the decision gets made: not at the
concept stage, and not after the schedule has already slipped, but at the moment
you notice you are about to model the same kind of thing more than a handful of
times. That is the tell. Miss it and you spend the deadline modeling; catch it and
you spend a fraction of the deadline building a tool, then generate your way through
the rest.

## Where this doesn't apply

It's not a universal argument for proceduralism over hand-modeling — a one-off hero
asset that needs a specific silhouette is still better served by a modeler's eye
than a parameter set, and a generator built for a job it will only run once is
wasted setup time. The judgment call is entirely about repetition: how many times,
and how varied. Grand's tour brief needed dozens of buildings that had to look
different enough to sell a skyline, not one building that had to look exactly right.
That's the condition a generator is built for.

The breakdown also lists six of Grand's own tips for building efficient procedural
setups; rather than paraphrase them secondhand, I'd point anyone who works this way
to the source below for the specifics straight from him. The shape of the lesson
holds regardless of the exact list: procedural work pays for itself on repetition,
not on principle, and the trick is noticing the repetition early enough to act on
it.

Source: [80.lv, "Breakdown: How Houdini Is Reshaping Commercial Animation"](https://80.lv/articles/breakdown-how-houdini-is-reshaping-commercial-animation)
