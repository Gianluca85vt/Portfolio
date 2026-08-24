---
title: Tides of Annihilation's "face change" is a lighting and shader story, not a redesign
date: 2026-08-24
category: Games
author: ruben-castellani
excerpt: Fans compared new Tides of Annihilation footage to old trailers and called it a beauty nerf. Eclipse Glow Games says the mesh didn't move — skin shading, cloth materials and the lighting rig did. That distinction is worth actually explaining.
cover: /img/blog/tides-of-annihilation-gwendolyn-face-controversy/shot-01.jpg
draft: true
---

Eclipse Glow Games spent last week denying it redesigned its own
protagonist. New gameplay footage of **Tides of Annihilation**, shown
around 17 August, put Gwendolyn's face next to shots from earlier trailers,
and a chunk of the fanbase decided the character had been given a "beauty
nerf" — softer features, less defined cheekbones, a rounder jaw than the
sharper face people remembered. Lead producer Fu Kun went on record to say
the underlying facial shape hasn't changed at all, and that what people are
reacting to is skin rendering, clothing materials and lighting.

That's not a deflection. It's also not the full story on its own, because
"the mesh is the same" and "the character looks different" are both true
at once, and the gap between them is exactly the part of the job that
doesn't show up in a press release.

## What actually moves a face without touching the mesh

<figure>
  <img src="/img/blog/tides-of-annihilation-gwendolyn-face-controversy/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Eclipse Glow Games, via the official Tides of Annihilation Steam page</figcaption>
</figure>

A character head in a modern engine is not one asset — it's a mesh
underneath a stack of things that can each shift the read of a face on
their own: a skin shader driving subsurface scattering, specular and
roughness maps, a lighting rig for the capture, and whatever tonemapping
and colour grade sits on top before the frame reaches a video encoder.
Change any one of those and a face can look meaningfully different with
every vertex in exactly the same position.

Fu Kun's statement names two of them specifically: skin rendering and
clothing materials, alongside a general note about lighting adjustments.
Harder, more directional light carves out cheekbones and eye sockets and
reads as "sharper." Softer, more diffused light — the kind you'd choose
for a cleaner, more presentable demo capture — smooths those same
features out without moving a single polygon. Subsurface scattering makes
this worse in exactly the way that trips people up: dial it up and skin
gains a waxy, softened translucency that reads as "younger" or "rounder";
dial it down and the same face looks harder and more sculpted. It's one of
the easiest values on a character shader to tweak late, and one of the
most visible when you do.

None of that requires touching the sculpt. It's also the reason "did they
change the face" is close to an unanswerable question from screenshots
alone — you'd need the raw geometry in both builds, not two compressed
video frames shot under different lighting, to settle it with any
confidence.

## The context the producer didn't lean on

There's a second thread here that Eclipse Glow explicitly declined to
connect to the face debate, and it's worth taking them at their word on
that while still naming it: Jennifer English, who voiced Gwendolyn through
the game's earlier reveals, stepped away from the role in June for
personal health reasons. She's staying on as an advisor while the studio
casts a replacement, who's now recording lines ahead of the character's
gamescom 2026 showing. A new performance capture pass, even with the same
head mesh, can shift how a face reads on screen too — different micro-
expressions, different resting pose between lines, different pacing on
blinks and brow movement. Eclipse Glow says the two aren't related. I've
got no evidence to contradict that, but it's a second variable sitting in
the same window of time as the visual change people are reacting to, and
readers comparing old and new footage should know it exists.

## Why this keeps happening to pre-release characters

This is a recurring failure mode for any game that shows a hero face
repeatedly over a long marketing run, and it's worth being blunt about
why: a "final" capture months before release usually isn't final. Fu Kun
said as much — that the current build has rendering imperfections the
team is still working through, which is studio-speak for "the lighting
and shading pass on this character isn't locked." Every subsequent public
showing is a new snapshot of a shader and lighting setup still in motion,
compared against fans' memory of an earlier snapshot that was equally
unfinished. The character nobody's arguing about yet is the one that
ships.

None of that makes the backlash irrational — people are reacting to what
they can actually see, which is pixels on a screen, not a shader graph.
But the useful question isn't "did they nerf her," it's "what pipeline
stage is still moving," and on the evidence so far the honest answer is
lighting and materials, with the geometry apparently untouched.

Tides of Annihilation is still without a release date beyond Eclipse
Glow's earlier "currently in development," and is next showing publicly at
gamescom (26–30 August). That's the build worth comparing against this
one — under less controlled conditions than a producer's own statement.

Statements and dates above are current as of 24 August 2026.
