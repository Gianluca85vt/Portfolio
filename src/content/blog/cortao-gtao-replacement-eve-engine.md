---
title: "CORTAO: EVE's GTAO replacement, MIT licensed"
date: 2026-11-13
category: 3D
excerpt: EVE's maker open-sourced CORTAO on 12 November. It drops horizon angles for traced rays, and quality presets stop changing how a scene reads.
cover: /img/blog/cortao-gtao-replacement-eve-engine/shot-01.jpg
sources:
  - outlet: GamesIndustry.biz
    url: https://www.gamesindustry.biz/eve-online-maker-fenris-creations-is-adding-a-rendering-technique-to-its-open-source-carbon-engine-that-promises-more-accurate-shading-and-greater-depth
  - outlet: CGMagazine
    url: https://www.cgmagonline.com/news/fenris-creations-brings-cortao
artistView:
  take: "The comparison shots in the repository are doing something unusual for a rendering release: they show the low-quality preset, not just the showcase one. That is the pitch, and it is aimed at the person who lights a level rather than the person who benchmarks it."
  works:
    - "Lighting: contact occlusion on slanted ground holds its shape in the reference comparisons, which is exactly where GTAO's grounding goes soft and starts drifting with the camera."
    - "Pipeline: bent normals at roughly half GTAO's overhead means the cheap indirect-light cheat most of us rely on gets cheaper, not more expensive."
    - "Art direction: an occlusion level that does not shift between quality presets removes a real class of bug, the kind where a scene lit on Ultra reads flat on Medium."
  misses:
    - "Integration: the technique hands denoising to a temporal pass it does not ship, so anyone without TAA or an upscaler in the frame inherits the noise."
    - "Tooling: a compile-time sample count means one shader permutation per quality level, and that bill lands on build times rather than frame times."
draft: true
---

Ambient occlusion has a slanted-surface problem, and it has had one for a
decade.

Here is the shape of it. GTAO — Jimenez et al., 2016, the technique that put
physically based ambient occlusion into real-time rendering and has sat in more
or less every engine since — works by measuring horizon angles. It slices the
hemisphere above a pixel and asks how high the surrounding geometry rises in
each slice. Lovely idea. The slices skew when the surface is not facing the
camera, though, and a ground plane running away from you under a tree is about
as not-facing-the-camera as a surface gets. The result is grounding that looks
confident and is wrong, plus shadows that shift as you turn your head.

Daniel Isheden hit this on vegetation and went looking for the reason. On 12
November, Fenris Creations — the studio that was CCP Games, the one that makes
EVE Online — put his answer on GitHub under the MIT licence. It is called
CORTAO, for Circular Occluder Ray-Traced Ambient Occlusion, and it keeps the
screen-space budget while throwing out the horizon-angle idea entirely.

## What it does instead

<figure>
  <img src="/img/blog/cortao-gtao-replacement-eve-engine/shot-02.jpg" loading="lazy" width="1440" height="810" alt="" />
  <figcaption>Daniel Isheden / Fenris Creations, via the CORTAO reference repository (MIT licence)</figcaption>
</figure>

It samples the depth buffer, builds a crude stand-in for the neighbourhood
around each pixel out of circular occluders, and then traces rays against that
proxy geometry. Up to 32 of them per pixel. Tracing 32 rays per pixel in screen
space is normally the kind of thing you cost out and then quietly abandon, so
the load-bearing part is a precomputed lookup table that resolves ray-occluder
intersections in bulk instead of one at a time. Without the table the technique
runs, but the repository says plainly that it is there for debugging and not
for shipping.

Three compute passes. A prepass that builds a mipmapped buffer packing linear
depth with a low-precision spheremap-encoded normal, the main pass that does
the tracing and spits out occlusion plus optional bent normals, and an optional
spatial filter.

The numbers Fenris published are for simple and complex scenes separately,
which is honest of them, because the gap between the two is where the
interesting part sits. In a simple scene CORTAO reaches GTAO's quality in under
half the GPU time, or, held to the same time budget, lands up to four times
lower on average squared error. In spatially complex scenes — the ones full of
depth discontinuities, which is to say foliage, fences, grates, anything thin —
GTAO struggles and CORTAO converges to a much lower error outright. Those are
the vendor's own benchmarks. They are also the only ones that exist on day one.

## The part that matters if you light things

Forget the error numbers for a second.

GTAO tracks the maximum horizon angle it finds. Drop the sample count and you
reduce the chance of finding the true maximum, so a lower quality preset
loses occlusion outright. The scene gets brighter and flatter as the setting
goes down. Anyone who has lit a level on a
workstation at maximum quality and then watched it on a mid-range card knows
that feeling: the contact shadows that were holding objects onto the floor have
thinned out, and everything floats.

CORTAO's error behaves differently. Reducing samples makes the circular proxies
coarser, which pushes the result over and under the true value rather than
consistently under it. Filtered spatially or temporally, that error largely
cancels. The overall level of occlusion stays put across quality settings.

Which means the artistic look survives the settings menu. For a team shipping
to a wide hardware spread that is worth more than a benchmark win, and it is
the reason this release reads like it was written by someone who has sat next
to a lighting artist.

## What it costs you

No temporal filter. CORTAO assumes you have one — TAA, DLSS, FSR, XeSS,
whatever is already in your frame — and its spatial pass is deliberately a
sparse 5-tap prefilter designed to make the noise more palatable to that
downstream pass rather than to remove it. Reasonable in 2026, when almost
everything ships with temporal reconstruction. Less reasonable if you are one
of the holdouts, and worth remembering that those temporal passes are not free
either: [DLSS 5's neural pass cost around half a frame before Nvidia moved it to
a second GPU](/blog/dlss-5-neural-rendering-second-gpu-offload/), and an AO
technique that leans on reconstruction is leaning on something with its own
bill.

The sample count has to be a compile-time constant so the loop unrolls, so
supporting four quality levels means four shader permutations. HLSL compilation
wants Shader Model 6.7, for integer texture format sampling. And the mipmap
chain does not need all eight levels — down to 64x64 is usually enough, which
is the sort of note that only turns up when someone has already shipped the
thing.

## Why it came out of a space game

Carbon, the engine under EVE Online and EVE Frontier, was open-sourced earlier
this year. The live game logic, the art, the server binaries and the database
layer all stayed shut, which is the normal shape of these things. The renderer
did not.

There is a Carbon-specific build of CORTAO alongside the reference one,
streamlined and tuned for the depth ranges a space scene produces. Those ranges
are extreme in a way a corridor shooter never has to deal with — a cockpit rail
at half a metre and a station hull at forty kilometres in the same frame, which
is precisely the condition under which screen-space techniques fall apart.
Having to solve that first is probably why the general version handles depth
discontinuities as carefully as it does.

The claim in the README that stands out is that CORTAO reaches a correctness and
stability "previously only possible with expensive hardware raytracing". That
deserves scepticism, and it also deserves context: hardware ray tracing on
console-class silicon is affordable right now mostly where the geometry
cooperates, which is why [4A Games could promise ray tracing and 60fps on a base
PS5](/blog/metro-2039-ray-tracing-60fps-base-ps5/) for a game built out of
corridors. A screen-space technique that closes part of that gap for free, in
open foliage, is aimed squarely at everyone who does not have corridors.

## Go and look at the pictures

The reference repository carries the comparison footage — GTAO against CORTAO
against a brute-force ray-traced ground truth, plus a bent-normals clip and the
filtering comparison. They are the evidence for everything above and they are
hosted as video rather than on YouTube, so there is nothing to embed here. If
you work in this area, the ground-truth comparison is ten seconds well spent.

Isheden says other extensions are being tested. Given that the bent-normal path
already exists and already costs about half what GTAO's does, the obvious one
is feeding it into a wider global-illumination approximation, and the repository
hints in that direction without committing.

---

*Technique description, benchmark figures, pass structure, licence and
integration requirements read from the CORTAO reference repository's own README
and LICENSE. Release date and studio framing from GamesIndustry.biz and
CGMagazine, 12 November 2026. Carbon's open-sourcing date is reported as earlier
in 2026 by the coverage and is not restated here from a primary source.*
