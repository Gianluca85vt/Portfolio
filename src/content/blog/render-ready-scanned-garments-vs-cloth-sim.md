---
title: Scanned garments beat cloth sim on hero clothing
date: 2026-08-23
category: 3D
excerpt: Render Ready builds hero garments from physical scans on custom poseable mannequins instead of cloth sim, and it's now feeding the same data to AI motion models. The pitch is ground truth, not convenience.
cover: /img/blog/render-ready-scanned-garments-vs-cloth-sim/cover.svg
---

Saw this on 80.lv this week: Joseph Deese walking through how **Render Ready** builds garments
for games and VFX by scanning real, physical clothing on custom-built poseable mannequins,
instead of starting from a flat pattern and letting a cloth solver figure out how it drapes.
That's the opposite of how most hero-character wardrobe gets made, and it's worth sitting with
why a studio would choose the slower, physical route on purpose.

## Cloth sim is a promise, not a measurement

Every cloth solver I've touched — Marvelous Designer into a game engine, nCloth, Houdini
Vellum — is solving an approximation. You set fabric weight, stretch and bend stiffness, friction,
a wind field maybe, and the solver integrates all of that forward in time and hopes the result
reads as denim, or silk, or a stiff canvas jacket. It usually does, close up, in a turntable.
Where it falls apart is exactly the stuff a hero asset gets scrutinised for: how a collar sits
against a collarbone at a specific neck angle, how a jacket hem catches on a hip during a run
cycle, the way real fabric holds a crease from being folded in a drawer instead of settling into
the mathematically relaxed pose a solver defaults to. That is broadly right. It's just
invented — a plausible answer standing in for a measurement, tuned by an artist's eye rather than
checked against the actual object.

Scanning skips the invention. A poseable mannequin lets Render Ready put a real garment through a
real range of motion and capture how the actual fabric actually deforms at each pose — the sag,
the self-collision, the way two layers bunch against each other — as geometry, not as a solver's
best guess. What comes out is ground truth for a specific garment in a specific pose, which a
simulation can only ever aim at.

## The tradeoff nobody skips past

This isn't free, and it's not a universal upgrade over sim. A scan captures what the garment did
in the poses you shot it in. Sim generalises: give it a new skeleton, a new motion clip, a
different body shape, and it re-solves without you going back to a physical mannequin. That's why
most productions still simulate — a AAA game with hundreds of animation states can't scan a
mannequin for every one of them, and neither can a VFX shot list that changes blocking three
times before delivery. Scanning earns its cost on the assets that get the most scrutiny and the
narrowest range of motion: a hero close-up, a cinematic, a small set of signature poses where
"looks exactly like the reference garment" matters more than "responds correctly to any input."
It's the same calculation as photogrammetry versus procedural texturing — ground truth where the
camera lingers, a generalisable system everywhere else.

## The scans are also becoming training data

The part that made this worth writing about rather than filing away as a cool pipeline video:
Render Ready has [partnered with Protege](https://withprotege.ai/articles/blog/render-ready-case-study-clothing)
to pair its garment captures with motion-capture data for AI model training — closing the gap, as
the announcement puts it, between how clothes look and how they actually move, for machine
learning models rather than for a game engine directly. That's a genuinely different customer
than a game studio licensing a scanned jacket. A generative or physics-prediction model trained
on real garment-and-motion pairs is trying to learn the same thing a cloth solver hand-codes —
how fabric behaves under motion — except from examples instead of from equations. If that works,
the payoff eventually loops back to production: a learned cloth model that's been trained on
actual scanned deformation should, in principle, generalise better than a hand-tuned solver
while staying closer to how real fabric behaves than a purely simulated one ever does. We're not
there yet — this is a data partnership, not a shipping tool — but it's the reason ground-truth
scanning is worth more right now than it was two years ago, beyond any single hero asset.

## What I'd actually watch for

Scanned garments will not replace cloth sim, for the reasons above. What's worth
watching is whether "scan it once, license the data forever" becomes a normal line item next to
"simulate it per-shot," the same way photogrammetry libraries sit next to procedural texturing
tools today rather than replacing them. And separately, whether the AI-training side of this
turns into the bigger business than the direct-to-production side — selling ground truth to model
builders scales in a way that selling bespoke scanned assets to individual productions doesn't.

Sources: [80.lv's interview with Joseph Deese on Render Ready's garment-scanning pipeline](https://80.lv/articles/building-a-hero-garment-from-real-world-data/)
and [Protege's announcement of its clothing-and-motion data partnership with Render Ready](https://withprotege.ai/articles/blog/render-ready-case-study-clothing).
